// src/api/fetchYouTube.js

export async function fetchYouTubeData(query) {
  // Read key ONLY from server-side environment
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("Missing YouTube API key in environment!");
  }

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${apiKey}`
  );

  if (!res.ok) {
    throw new Error(`YouTube API failed: ${res.statusText}`);
  }

  const data = await res.json();
  return data.items || [];
}
