import axios from "axios";

const API_BASE = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function searchYouTube(query) {
  const res = await axios.get(`${API_BASE}/search`, {
    params: {
      part: "snippet",
      q: query,
      type: "video",
      maxResults: 20,
      key: API_KEY
    }
  });

  return res.data.items.map((video) => ({
    id: video.id.videoId,
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.medium.url,
    channel: video.snippet.channelTitle
  }));
}
