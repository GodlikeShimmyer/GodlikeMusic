import { searchYouTube } from "../lib/youtube.js";

export default async function handler(req, res) {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ error: "Missing query parameter ?q=" });
    }

    const results = await searchYouTube(q);
    res.status(200).json(results);
  } catch (err) {
    console.error("YouTube API error:", err);
    res.status(500).json({ error: "Failed to fetch from YouTube API" });
  }
}
