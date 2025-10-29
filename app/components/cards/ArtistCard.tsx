'use client';

import { Artist } from '@/app/types';
import { useLibraryStore } from '@/app/store/useLibraryStore';
import { formatNumber } from '@/app/lib/utils';
import Image from 'next/image';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const { followArtist, unfollowArtist, isArtistFollowed } = useLibraryStore();
  const isFollowed = isArtistFollowed(artist.id);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFollowed) {
      unfollowArtist(artist.id);
    } else {
      followArtist(artist);
    }
  };

  return (
    <div
      className="group relative rounded-lg bg-dark-surface p-4 transition-all hover:bg-dark-elevated cursor-pointer hover-lift"
      onClick={handleFollow}
    >
      {/* Artist Image */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-full shadow-lg">
        {artist.thumbnail ? (
          <Image
            src={artist.thumbnail}
            alt={artist.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-godlike text-4xl font-bold text-white">
            {artist.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Artist Info */}
      <div className="text-center">
        <h3 className="truncate font-bold text-white mb-1">{artist.name}</h3>
        <p className="text-sm text-dark-subdued mb-3">
          {artist.followers ? `${formatNumber(artist.followers)} followers` : 'Artist'}
        </p>

        {/* Follow Button */}
        <button
          onClick={handleFollow}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            isFollowed
              ? 'bg-transparent border border-dark-subdued text-white hover:border-white'
              : 'bg-white text-black hover:scale-105'
          }`}
        >
          {isFollowed ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
}
