export default function DomeLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      {/* clay base */}
      <rect x="6" y="16" width="20" height="13" fill="#E8B98A" stroke="#9A4427" strokeWidth="1.4" />
      {/* turquoise dome */}
      <path d="M8 16 Q8 5 16 3 Q24 5 24 16 Z" fill="#3AA89F" stroke="#9A4427" strokeWidth="1.4" />
      {/* finial */}
      <path d="M16 3 V1" stroke="#E2A12C" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="16" cy="0.8" r="1" fill="#E2A12C" />
      {/* arched doorway */}
      <path d="M12 29 V21 Q16 16 20 21 V29" fill="#FBF3E2" stroke="#9A4427" strokeWidth="1.2" />
      <rect x="4" y="29" width="24" height="2.4" rx="0.6" fill="#C2542F" />
    </svg>
  );
}
