// pages/api/fetchYouTube.js
import fetch from 'node-fetch'; // only needed if using Node <18

const API_KEY = process.env.YOUTUBE_API_KEY; // make sure you have this in .env

export default async function fetchYouTube(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=10`;
  
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`YouTube API error: ${res.status}`);
  }
  
  const data = await res.json();
  return data.items;
}
