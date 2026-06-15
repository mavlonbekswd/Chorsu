"use client";

/**
 * The bazaar, by daylight — a flat, hand-crafted folk-art illustration.
 * A turquoise majolica-tiled dome over a clay-brick iwan, flanked by
 * arched stalls with striped awnings and hanging saffron lanterns.
 * Ornament (girih tilework + islimi curls) is drawn, not decorative noise.
 * Built entirely from SVG — no stock photo, no glow, no neon.
 */
export default function BazaarScene() {
  const outline = "#9A4427"; // warm clay outline, like a glaze line

  return (
    <div className="relative w-full" aria-hidden="true">
      <svg viewBox="0 0 600 560" className="bazaar-illustration h-auto w-full">
        <defs>
          {/* girih star band — two overlapping squares, the classic Rub-el-Hizb tile */}
          <pattern id="girihBand" width="44" height="44" patternUnits="userSpaceOnUse">
            <rect width="44" height="44" fill="#FBF3E2" />
            <rect x="9" y="9" width="26" height="26" fill="#EBC88B" stroke={outline} strokeWidth="1.4" />
            <rect
              x="22"
              y="3.6"
              width="26"
              height="26"
              transform="rotate(45 22 22)"
              fill="none"
              stroke="#2E9D95"
              strokeWidth="1.4"
            />
            <circle cx="22" cy="22" r="3" fill="#C2542F" />
          </pattern>

          {/* fish-scale tile for the dome */}
          <pattern id="scale" width="26" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 20 A13 13 0 0 1 26 20" fill="none" stroke="#1C7E77" strokeWidth="1.3" opacity="0.55" />
            <path d="M-13 20 A13 13 0 0 1 13 20" fill="none" stroke="#1C7E77" strokeWidth="1.3" opacity="0.55" />
          </pattern>

          {/* brick coursing for the base */}
          <pattern id="brick" width="40" height="20" patternUnits="userSpaceOnUse">
            <rect width="40" height="20" fill="#D98A55" />
            <path d="M0 20 H40 M0 10 H40 M20 0 V10 M0 10 V20 M40 10 V20" stroke="#B5683B" strokeWidth="1" />
          </pattern>
        </defs>

        {/* daylight sun */}
        <circle cx="500" cy="110" r="56" fill="#F2C868" />
        <circle cx="500" cy="110" r="56" fill="none" stroke="#E2A12C" strokeWidth="2" strokeDasharray="3 7" />

        {/* a couple of birds, for daylight life */}
        <path d="M120 90 q8 -7 16 0 q8 -7 16 0" fill="none" stroke={outline} strokeWidth="2" strokeLinecap="round" />
        <path d="M165 120 q6 -5 12 0 q6 -5 12 0" fill="none" stroke={outline} strokeWidth="1.8" strokeLinecap="round" />

        {/* ===== left stall ===== */}
        <g className="stall-left">
          <rect x="46" y="330" width="150" height="190" fill="#E8B98A" stroke={outline} strokeWidth="2.5" />
          {/* small turquoise dome */}
          <path d="M70 330 q51 -64 102 0 Z" fill="#3AA89F" stroke={outline} strokeWidth="2.5" />
          <circle cx="121" cy="262" r="4" fill="#E2A12C" stroke={outline} strokeWidth="1.4" />
          {/* striped awning (suzani stripes) */}
          <path d="M40 360 H202 l-12 22 H52 Z" fill="#C2542F" stroke={outline} strokeWidth="2" />
          <g stroke="#F6EEE0" strokeWidth="6">
            <path d="M70 360 l-6 22 M100 360 l-5 22 M130 360 l-5 22 M160 360 l-5 22" />
          </g>
          {/* arched opening */}
          <path d="M86 520 V430 q35 -42 70 0 V520 Z" fill="#FBF3E2" stroke={outline} strokeWidth="2.5" />
          <path d="M121 430 v90" stroke="#E4D6BC" strokeWidth="2" />
        </g>

        {/* ===== right stall ===== */}
        <g className="stall-right">
          <rect x="404" y="330" width="150" height="190" fill="#E8B98A" stroke={outline} strokeWidth="2.5" />
          <path d="M428 330 q51 -64 102 0 Z" fill="#3AA89F" stroke={outline} strokeWidth="2.5" />
          <circle cx="479" cy="262" r="4" fill="#E2A12C" stroke={outline} strokeWidth="1.4" />
          <path d="M398 360 H560 l-12 22 H410 Z" fill="#C2542F" stroke={outline} strokeWidth="2" />
          <g stroke="#F6EEE0" strokeWidth="6">
            <path d="M428 360 l-6 22 M458 360 l-5 22 M488 360 l-5 22 M518 360 l-5 22" />
          </g>
          <path d="M444 520 V430 q35 -42 70 0 V520 Z" fill="#FBF3E2" stroke={outline} strokeWidth="2.5" />
          <path d="M479 430 v90" stroke="#E4D6BC" strokeWidth="2" />
        </g>

        {/* ===== central domed building ===== */}
        {/* clay-brick base */}
        <rect x="200" y="360" width="200" height="160" fill="url(#brick)" stroke={outline} strokeWidth="3" />

        {/* big pointed iwan arch */}
        <path d="M232 520 V250 Q300 150 368 250 V520 Z" fill="#FBF3E2" stroke={outline} strokeWidth="3" />
        {/* turquoise tiled frame around the iwan */}
        <path
          d="M232 520 V250 Q300 150 368 250 V520"
          fill="none"
          stroke="#2E9D95"
          strokeWidth="9"
          strokeLinejoin="round"
        />
        <path
          d="M232 520 V250 Q300 150 368 250 V520"
          fill="none"
          stroke={outline}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* recessed inner arch + doorway */}
        <path d="M256 520 V270 Q300 196 344 270 V520 Z" fill="#EAD7B6" stroke={outline} strokeWidth="2" />
        <path d="M286 520 V330 q14 -22 28 0 V520 Z" fill="#9A6B3F" stroke={outline} strokeWidth="2" />

        {/* islimi (floral) spandrel curls in the arch corners */}
        <g fill="none" stroke="#C2542F" strokeWidth="2.4" strokeLinecap="round">
          <path d="M240 250 q22 6 24 30 q2 -20 20 -24" />
          <path d="M360 250 q-22 6 -24 30 q-2 -20 -20 -24" />
        </g>
        <g fill="#2E9D95">
          <circle cx="265" cy="262" r="3.2" />
          <circle cx="335" cy="262" r="3.2" />
        </g>

        {/* hanging saffron lanterns under the arch */}
        {[270, 330].map((x, i) => (
          <g key={i} className="lantern" style={{ ["--ld" as string]: `${i * 0.6}s` }}>
            <line x1={x} y1="230" x2={x} y2="262" stroke={outline} strokeWidth="1.6" />
            <path
              d={`M${x - 9} 270 q9 -12 18 0 q3 14 -9 22 q-12 -8 -9 -22 Z`}
              fill="#E2A12C"
              stroke={outline}
              strokeWidth="1.6"
            />
            <circle cx={x} cy="276" r="3" fill="#FBF3E2" />
          </g>
        ))}

        {/* drum with girih tile band */}
        <rect x="234" y="206" width="132" height="46" fill="url(#girihBand)" stroke={outline} strokeWidth="2.5" />

        {/* ribbed turquoise majolica dome */}
        <path d="M232 208 C206 168 254 112 300 92 C346 112 394 168 368 208 Z" fill="#3AA89F" stroke={outline} strokeWidth="3" />
        <path d="M232 208 C206 168 254 112 300 92 C346 112 394 168 368 208 Z" fill="url(#scale)" />
        {/* ribs */}
        <g stroke="#1C7E77" strokeWidth="1.8" opacity="0.7">
          <path d="M300 92 V208 M270 100 C258 150 262 180 266 208 M330 100 C342 150 338 180 334 208 M246 130 C236 165 240 188 244 208 M354 130 C364 165 360 188 356 208" fill="none" />
        </g>
        {/* gold finial */}
        <path d="M300 92 V64" stroke={outline} strokeWidth="2.5" />
        <circle cx="300" cy="58" r="7" fill="#E2A12C" stroke={outline} strokeWidth="2" />
        <path d="M300 51 q5 -10 0 -16 q-5 6 0 16" fill="#E2A12C" stroke={outline} strokeWidth="1.6" />

        {/* ground + decorative tiled base band */}
        <rect x="20" y="520" width="560" height="26" fill="#EFE3CC" stroke={outline} strokeWidth="2" />
        <g>
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M${34 + i * 40} 533 l10 -8 l10 8 l-10 8 Z`}
              fill={i % 2 ? "#2E9D95" : "#C2542F"}
              stroke={outline}
              strokeWidth="1.2"
            />
          ))}
        </g>
      </svg>

      <style jsx>{`
        .bazaar-illustration {
          animation: rise 0.9s ease-out both;
        }
        .lantern {
          transform-box: fill-box;
          transform-origin: top center;
          animation: sway 4.5s ease-in-out var(--ld) infinite;
        }
        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes sway {
          0%,
          100% {
            transform: rotate(-2.5deg);
          }
          50% {
            transform: rotate(2.5deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bazaar-illustration,
          .lantern {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
