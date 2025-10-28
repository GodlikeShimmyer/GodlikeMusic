import { useEffect, useState } from "react";
import { getAlbum } from "../lib/spotify";
import { useSearchParams } from "react-router-dom";

export default function Album() {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams()[0];
  const albumId = searchParams.get("id");

  useEffect(() => {
    async function fetchAlbum() {
      if (!albumId) return;
      try {
        const data = await getAlbum(albumId);
        setAlbum(data);
      } catch (err) {
        console.error("Error fetching album:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAlbum();
  }, [albumId]);

  if (loading) return <p>Loading album...</p>;
  if (!album) return <p>Album not found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>{album.name}</h1>
      <p style={{ fontSize: 18, marginBottom: 10 }}>
        By {album.artists.map(a => a.name).join(", ")}
      </p>
      <img
        src={album.images[0]?.url}
        alt={album.name}
        style={{ width: 300, marginBottom: 20 }}
      />
      <ul>
        {album.tracks.items.map(track => (
          <li key={track.id} style={{ marginBottom: 10 }}>
            {track.name}{" "}
            {track.preview_url ? (
              <audio controls src={track.preview_url}></audio>
            ) : (
              <span style={{ color: "gray" }}>No preview available</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
