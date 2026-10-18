/** The neutral placeholder brand used across the branding visuals ("Your Brand"). Pure CSS, no ids. */
export function BrandMark({ size = 16, className = "" }: { size?: number; className?: string }) {
  return <span className={`bm-mark ${className}`} style={{ width: size, height: size }} />;
}

export function BrandLockup({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`bm-lockup ${className}`} style={{ fontSize: size }}>
      <BrandMark size={Math.round(size * 1.25)} />
      Your Brand
    </span>
  );
}
