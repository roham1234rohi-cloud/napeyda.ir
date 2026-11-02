export function LogoMark({ size = 32, title = "NAPEYDA" }: { size?: number; title?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={title} fill="currentColor">
      <path fillRule="evenodd" d="M14 92V50C14 28 30 17 50 17s36 11 36 33v42H68V52c0-12-8-18-18-18s-18 6-18 18v40Z" />
      <path d="M50 1l6 6-6 6-6-6ZM50 50l8 8-8 8-8-8Z" />
    </svg>
  );
}
export function Wordmark() {
  return <span className="wordmark"><LogoMark size={28} /><span>NAPEYDA</span></span>;
}
