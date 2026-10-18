/**
 * Platform marks drawn as simple SVG in their official colours, used for nominative reference only
 * (to name the channels Madvert Labs runs campaigns on). No endorsement or partnership implied.
 * Each mark keeps its own aspect ratio: size with a height or width class, never both.
 * Pass a unique `uid` (useId) wherever a mark uses gradients.
 */

type Props = { className?: string; uid?: string };

/** Meta: the looped ribbon mark, Meta blue gradient. */
export function MetaLogo({ className, uid = "mt" }: Props) {
  const g = `${uid}-meta-g`;
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={g} x1="0" x2="1" y1="0.6" y2="0.4">
          <stop offset="0" stopColor="#0064E1" />
          <stop offset="0.5" stopColor="#0073EE" />
          <stop offset="1" stopColor="#0082FB" />
        </linearGradient>
      </defs>
      <path
        d="M32 20.5C28.6 14.4 24.4 7.5 17.6 7.5 11.2 7.5 6.5 14.3 6.5 22c0 5.9 3 10.5 8.3 10.5 6.6 0 10.9-6.6 17.2-17C36.6 8 40.2 7.5 46.2 7.5c6.8 0 11.3 7 11.3 14.8 0 6.1-2.9 10.2-8.2 10.2-6.7 0-11.6-7.5-17.3-12Z"
        fill="none"
        stroke={`url(#${g})`}
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Facebook: white f on the Facebook blue circle. */
export function FacebookLogo({ className, uid = "fb" }: Props) {
  const c = `${uid}-fb-c`;
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={c}>
          <circle cx="24" cy="24" r="24" />
        </clipPath>
      </defs>
      <circle cx="24" cy="24" r="24" fill="#0866FF" />
      <path
        clipPath={`url(#${c})`}
        fill="#fff"
        d="M33.3 30.9 34.4 24H27.7v-4.5c0-1.9.9-3.7 3.9-3.7h3V9.9s-2.8-.5-5.4-.5c-5.5 0-9.1 3.3-9.1 9.3V24h-6.1v6.9h6.1V49h7.5V30.9h5.7Z"
      />
    </svg>
  );
}

/** Instagram: camera glyph on the warm gradient square. */
export function InstagramLogo({ className, uid = "ig" }: Props) {
  const r = `${uid}-ig-r`;
  const l = `${uid}-ig-l`;
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={r} cx="0.28" cy="1.08" r="1.25">
          <stop offset="0" stopColor="#FFDD55" />
          <stop offset="0.1" stopColor="#FFDD55" />
          <stop offset="0.5" stopColor="#FF543E" />
          <stop offset="1" stopColor="#C837AB" />
        </radialGradient>
        <radialGradient id={l} cx="-0.1" cy="0.05" r="0.6">
          <stop offset="0" stopColor="#3771C8" />
          <stop offset="0.13" stopColor="#3771C8" />
          <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill={`url(#${r})`} />
      <rect width="48" height="48" rx="12" fill={`url(#${l})`} />
      <rect x="10" y="10" width="28" height="28" rx="8.5" fill="none" stroke="#fff" strokeWidth="3.4" />
      <circle cx="24" cy="24" r="6.6" fill="none" stroke="#fff" strokeWidth="3.4" />
      <circle cx="32.3" cy="15.7" r="2.1" fill="#fff" />
    </svg>
  );
}

/** Google: four colour G. */
export function GoogleLogo({ className }: Props) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

/** YouTube: white play triangle on the red rounded rectangle. */
export function YouTubeLogo({ className }: Props) {
  return (
    <svg viewBox="0 0 68 48" className={className} aria-hidden="true" focusable="false">
      <path
        fill="#FF0000"
        d="M66.5 7.5c-.8-2.9-3.1-5.2-6-6C55.2 0 34 0 34 0S12.8 0 7.5 1.5c-2.9.8-5.2 3.1-6 6C0 12.8 0 24 0 24s0 11.2 1.5 16.5c.8 2.9 3.1 5.2 6 6C12.8 48 34 48 34 48s21.2 0 26.5-1.5c2.9-.8 5.2-3.1 6-6C68 35.2 68 24 68 24s0-11.2-1.5-16.5Z"
      />
      <path fill="#fff" d="M27 34.3 45 24 27 13.7Z" />
    </svg>
  );
}

/** Maps: the four colour location pin. */
export function MapsPinLogo({ className, uid = "mp" }: Props) {
  const c = `${uid}-mp-c`;
  return (
    <svg viewBox="0 0 36 48" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={c}>
          <path d="M18 1C8.6 1 1 8.6 1 18c0 4.6 1.8 8.4 4.6 12.2C10 36.1 15.4 40.7 18 47c2.6-6.3 8-10.9 12.4-16.8C33.2 26.4 35 22.6 35 18 35 8.6 27.4 1 18 1Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${c})`}>
        <rect width="36" height="48" fill="#34A853" />
        <path d="M0 0h13l5 18-8 30H0Z" fill="#FBBC04" />
        <path d="M0 0h13l5 18L0 27Z" fill="#4285F4" />
        <path d="M13 0h23v14l-18 4Z" fill="#EA4335" />
      </g>
      <circle cx="18" cy="18" r="6.2" fill="#fff" />
    </svg>
  );
}

/** Search: a neutral search signal (bar + magnifier), not a brand mark. */
export function SearchSignal({ className }: Props) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="21" cy="21" r="12.5" fill="none" stroke="#4285F4" strokeWidth="4.4" />
      <path d="m30.4 30.4 9.6 9.6" stroke="#4285F4" strokeWidth="5.2" strokeLinecap="round" />
      <path d="M15 21h12M15 16.4h8" stroke="#34A853" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <path d="M15 25.6h9" stroke="#FBBC04" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

export type ChannelKey = "meta" | "facebook" | "instagram" | "google" | "youtube" | "maps" | "search";

export function ChannelLogo({ channel, className, uid }: Props & { channel: ChannelKey }) {
  switch (channel) {
    case "meta":
      return <MetaLogo className={className} uid={uid} />;
    case "facebook":
      return <FacebookLogo className={className} uid={uid} />;
    case "instagram":
      return <InstagramLogo className={className} uid={uid} />;
    case "google":
      return <GoogleLogo className={className} />;
    case "youtube":
      return <YouTubeLogo className={className} />;
    case "maps":
      return <MapsPinLogo className={className} uid={uid} />;
    case "search":
      return <SearchSignal className={className} />;
  }
}
