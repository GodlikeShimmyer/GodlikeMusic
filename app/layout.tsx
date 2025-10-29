import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GodlikeMusic - Your Ultimate Music Streaming Experience',
  description: 'Stream millions of songs, create playlists, and discover new music with GodlikeMusic - a modern, feature-rich music streaming platform powered by YouTube.',
  keywords: 'music, streaming, playlists, youtube music, godlikemusic, songs, albums, artists',
  authors: [{ name: 'GodlikeMusic Team' }],
  openGraph: {
    title: 'GodlikeMusic',
    description: 'Your Ultimate Music Streaming Experience',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
