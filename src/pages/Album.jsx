import { useEffect, useState } from "react";
import { getAlbum } from "../lib/spotify";

export default function AlbumPage({ id }) {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    async function fetchAlbum() {
      if (!id) return;
      const data = await getAlbum(id);
      setAlbum(data);
    }
    fetchAlbum();
  }, [id]);

  if (!album) return <p>Loading album...</p>;

  return (
    <div>
      <h1>{album.name}</h1>
      <p>By {album.artists.map(a => a.name).join(", ")}</p>
      <img src={album.images[0].url} alt={album.name} style={{ width: 300 }} />
      <ul>
        {album.tracks.items.map(track => (
          <li key={track.id}>
            {track.name} –{" "}
            {track.preview_url ? <audio controls src={track.preview_url}></audio> : "No preview"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  return { props: { id: context.query.id || null } };
}
