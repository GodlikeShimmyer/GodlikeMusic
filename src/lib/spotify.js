import axios from "axios";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

export async function getSpotifyToken() {
  const tokenResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
    }
  );
  return tokenResponse.data.access_token;
}

export async function getAlbum(albumId) {
  const token = await getSpotifyToken();
  const res = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
