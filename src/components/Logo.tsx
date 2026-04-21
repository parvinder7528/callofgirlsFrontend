export function Logo({ size = 40 }: { size?: number }) {
  return (
    <div
      className="rounded-full gradient-primary flex items-center justify-center shadow-glow"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-1/2 h-1/2">
        <path d="M12 21s-7-4.5-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.5-7 10-7 10z" />
      </svg>
    </div>
  );
}
