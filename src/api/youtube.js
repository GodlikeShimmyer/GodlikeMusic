// api/youtube.js
import { searchYouTube } from "../lib/youtube.js";

export default async function handler(req, res) {
  try {
    const q = req.query.q || req.body?.q;
    if (!q) return res.status(400).json({ error: "Missing q parameter" });

    const results = await searchYouTube(q, 12);
    res.status(200).json(results);
  } catch (err) {
    console.error("api/youtube error:", err?.message || err);
    res.status(500).json({ error: "YouTube proxy error" });
  }
}
