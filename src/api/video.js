// api/video.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    const KEY = process.env.YOUTUBE_API_KEY;
    if (!KEY) return res.status(500).json({ error: "Missing YOUTUBE_API_KEY" });

    // Video details (snippet + statistics)
    const videoResp = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: { part: "snippet,statistics,contentDetails", id, key: KEY }
    });

    const video = videoResp.data.items?.[0];
    if (!video) return res.status(404).json({ error: "Video not found" });

    // Comments (top-level)
    let comments = [];
    try {
      const commentsResp = await axios.get("https://www.googleapis.com/youtube/v3/commentThreads", {
        params: { part: "snippet", videoId: id, maxResults: 10, key: KEY }
      });
      comments = (commentsResp.data.items || []).map(c => ({
        id: c.id,
        author: c.snippet.topLevelComment.snippet.authorDisplayName,
        text: c.snippet.topLevelComment.snippet.textDisplay,
        likeCount: c.snippet.topLevelComment.snippet.likeCount,
        publishedAt: c.snippet.topLevelComment.snippet.publishedAt
      }));
    } catch (e) {
      // comments may be disabled / quota; ignore
      console.warn("comments fetch failed", e?.message || e);
    }

    res.status(200).json({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      channel: video.snippet.channelTitle,
      channelId: video.snippet.channelId,
      thumbnails: video.snippet.thumbnails,
      stats: video.statistics,
      contentDetails: video.contentDetails,
      comments
    });
  } catch (err) {
    console.error("api/video error:", err?.message || err);
    res.status(500).json({ error: "Video fetch failed" });
  }
}
