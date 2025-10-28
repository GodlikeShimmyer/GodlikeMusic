// api/youtube.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: "Missing q" });

    const KEY = process.env.YOUTUBE_API_KEY;
    if (!KEY) return res.status(500).json({ error: "Missing YOUTUBE_API_KEY" });

    const r = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q,
        maxResults: 24,
        type: "video",
        videoCategoryId: "10",
        key: KEY
      }
    });

    const items = (r.data.items || []).map(it => ({
      id: it.id.videoId,
      title: it.snippet.title,
      thumbnail: it.snippet.thumbnails?.high?.url || it.snippet.thumbnails?.default?.url,
      channel: it.snippet.channelTitle,
      channelId: it.snippet.channelId,
      description: it.snippet.description
    }));

    res.status(200).json(items);
  } catch (err) {
    console.error("api/youtube error:", err?.message || err);
    res.status(500).json({ error: "YouTube search failed" });
  }
}
