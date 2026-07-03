export function SwirlCircle({ size = 200, className = '' }) {
  return (
    <div
      className={`rounded-full ${className}`}
      style={{
        width:  size,
        height: size,
        background: `conic-gradient(
          from 0deg,
          #FF6F91 0deg 60deg,
          #FFA63D 60deg 120deg,
          #C17F3E 120deg 180deg,
          #FFC93C 180deg 240deg,
          #FF6F91 240deg 300deg,
          #6B4226 300deg 360deg
        )`,
      }}
    />
  );
}