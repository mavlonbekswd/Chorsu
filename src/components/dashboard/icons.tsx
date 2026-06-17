// Small, consistent line icons for the dashboard shell.
type P = { className?: string };
const base = "h-[18px] w-[18px]";

export function BagIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}
export function BookmarkIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 4h10v16l-5-3.2L7 20V4z" />
    </svg>
  );
}
export function FolderIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}
export function GearIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6" />
    </svg>
  );
}
export function ChevronIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
export function MenuIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
export function SearchIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}
export function DomeMark({ className = "" }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <rect x="6" y="16" width="20" height="13" fill="#E8B98A" stroke="#9A4427" strokeWidth="1.4" />
      <path d="M8 16 Q8 5 16 3 Q24 5 24 16 Z" fill="#3AA89F" stroke="#9A4427" strokeWidth="1.4" />
      <path d="M16 3 V1" stroke="#E2A12C" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="16" cy="0.8" r="1" fill="#E2A12C" />
      <path d="M12 29 V21 Q16 16 20 21 V29" fill="#FBF3E2" stroke="#9A4427" strokeWidth="1.2" />
      <rect x="4" y="29" width="24" height="2.4" rx="0.6" fill="#C2542F" />
    </svg>
  );
}
