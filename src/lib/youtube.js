import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function searchYouTube(query, maxResults = 12) {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("Missing YOUTUBE_API_KEY environment variable");
  }

  const res = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: "snippet",
      q: query,
      maxResults,
      type: "video",
      videoCategoryId: "10", // 10 = Music
      key: apiKey,
    },
  });

  return res.data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.medium.url,
    channel: item.snippet.channelTitle,
  }));
}
