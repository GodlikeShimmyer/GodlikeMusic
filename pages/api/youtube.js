// pages/api/youtube.js
import { fetchYouTubeData } from "@/api/fetchYouTube";

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  try {
    const videos = await fetchYouTubeData(q);
    res.status(200).json(videos);
  } catch (err) {
    console.error("YouTube API error:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
