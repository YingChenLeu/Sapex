/** Recreated Google wordmark + G icon. */

const G_BLUE = "#4285F4";
const G_RED = "#EA4335";
const G_YELLOW = "#FBBC05";
const G_GREEN = "#34A853";

export function GoogleWordmark({ size = 92 }: { size?: number }) {
  const height = size;
  const width = size * 2.72;

  return (
    <svg
      viewBox="0 0 272 92"
      width={width}
      height={height}
      className="select-none"
      aria-hidden
    >
      <defs>
        <filter id="google-wordmark-shadow" x="-8%" y="-8%" width="120%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.4" floodColor="#000000" floodOpacity="0.35" />
        </filter>
        <linearGradient id="google-wordmark-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g filter="url(#google-wordmark-shadow)" fontFamily="Arial, Helvetica, sans-serif" fontWeight="500">
        <text x="4" y="72" fontSize="78" fill={G_BLUE} letterSpacing="-3">
          G
        </text>
        <text x="58" y="72" fontSize="78" fill={G_RED} letterSpacing="-3">
          o
        </text>
        <text x="104" y="72" fontSize="78" fill={G_YELLOW} letterSpacing="-3">
          o
        </text>
        <text x="150" y="72" fontSize="78" fill={G_BLUE} letterSpacing="-3">
          g
        </text>
        <text x="196" y="72" fontSize="78" fill={G_GREEN} letterSpacing="-3">
          l
        </text>
        <text x="222" y="72" fontSize="78" fill={G_RED} letterSpacing="-3">
          e
        </text>
      </g>
      <rect x="8" y="18" width="252" height="28" fill="url(#google-wordmark-shine)" opacity="0.45" rx="12" />
    </svg>
  );
}

export function GoogleG({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <filter id="google-g-icon-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#google-g-icon-shadow)">
        <path
          fill="#FFC107"
          d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l.1.1 6.3 5.3C39.3 36.8 44 31.3 44 24c0-1.3-.1-2.6-.4-3.9z"
        />
      </g>
    </svg>
  );
}
