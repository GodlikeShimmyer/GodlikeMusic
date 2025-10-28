import axios from "axios";
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const apiKey = process.env.YOUTUBE_API_KEY;

export async function searchYouTube(query, maxResults = 12) {
  const res = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: "snippet",
      q: query,
      maxResults,
      type: "video",
      videoCategoryId: "10", // Music category
      key: apiKey,
    },
  });
  return formatItems(res.data.items);
}

export async function getTrendingMusic(maxResults = 12) {
  const res = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet",
      chart: "mostPopular",
      videoCategoryId: "10",
      maxResults,
      regionCode: "US",
      key: apiKey,
    },
  });
  return formatItems(res.data.items);
}

export async function getChannelVideos(channelId, maxResults = 12) {
  const res = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: "snippet",
      channelId,
      maxResults,
      type: "video",
      key: apiKey,
    },
  });
  return formatItems(res.data.items);
}

function formatItems(items) {
  return items.map((item) => ({
    id: item.id.videoId || item.id,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.medium?.url,
    channel: item.snippet.channelTitle,
    channelId: item.snippet.channelId,
  }));
}
