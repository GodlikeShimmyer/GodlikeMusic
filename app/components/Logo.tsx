'use client';

/**
 * GodlikeMusic Logo Component
 * Original SVG logo with gradient colors
 */
export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C46A" />
            <stop offset="50%" stopColor="#0077FF" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
        </defs>
        
        {/* Music Note Icon */}
        <path
          d="M22 6v13.5c0 2.485-2.015 4.5-4.5 4.5S13 21.985 13 19.5s2.015-4.5 4.5-4.5c.779 0 1.51.198 2.146.548L20 15.732V8.5l-8 2v10c0 2.485-2.015 4.5-4.5 4.5S3 22.985 3 20.5 5.015 16 7.5 16c.779 0 1.51.198 2.146.548L10 16.732V6l12-1.5v1.5z"
          fill="url(#logo-gradient)"
          stroke="url(#logo-gradient)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Equalizer Bars */}
        <rect x="26" y="12" width="2" height="8" rx="1" fill="url(#logo-gradient)" opacity="0.8" />
        <rect x="29" y="8" width="2" height="16" rx="1" fill="url(#logo-gradient)" opacity="0.6" />
      </svg>

      <span className="text-xl font-bold gradient-text">
        GodlikeMusic
      </span>
    </div>
  );
}
