'use client';
import { motion } from 'framer-motion';

const glowAnim = {
  animate: { opacity: [0.65, 1, 0.65] },
  transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
};

export default function HeroIllustration() {
  return (
    <motion.svg
      viewBox="0 0 520 520"
      className="w-[92%] h-[92%] select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="colBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="100%" stopColor="rgba(200,200,200,0.85)" />
        </linearGradient>
        <linearGradient id="colCyan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(230,230,230,0.95)" />
          <stop offset="100%" stopColor="rgba(150,150,150,0.85)" />
        </linearGradient>
        <linearGradient id="colOrange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(210,210,210,0.95)" />
          <stop offset="100%" stopColor="rgba(130,130,130,0.85)" />
        </linearGradient>
        <linearGradient id="colPurple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(180,180,180,0.95)" />
          <stop offset="100%" stopColor="rgba(100,100,100,0.85)" />
        </linearGradient>

        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.65 0"
            result="colored"
          />
          <feMerge>
            <feMergeNode in="colored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="hardGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* subtle floor/grid fade */}
      <g opacity="0.25">
        <path
          d="M40 350 C 140 310, 250 300, 480 330 L480 480 L40 480 Z"
          fill="rgba(255,255,255,0.02)"
        />
        {[...Array(8)].map((_, i) => (
          <path
            key={`grid-${i}`}
            d={`M ${70 + i * 55} 360 L ${40 + i * 60} 480`}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <path
            key={`grid2-${i}`}
            d={`M 40 ${372 + i * 18} L 480 ${360 + i * 22}`}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* columns */}
      <g filter="url(#softGlow)">
        <rect x="145" y="300" width="62" height="170" rx="14" fill="url(#colBlue)" opacity="0.95" />
        <rect x="240" y="235" width="66" height="235" rx="14" fill="url(#colCyan)" opacity="0.95" />
        <rect x="330" y="325" width="62" height="145" rx="14" fill="url(#colOrange)" opacity="0.95" />
        <rect x="412" y="265" width="66" height="205" rx="14" fill="url(#colPurple)" opacity="0.95" />
      </g>

      {/* spheres */}
      <g filter="url(#hardGlow)">
        <circle cx="176" cy="275" r="42" fill="rgba(255,255,255,0.1)" />
        <circle cx="458" cy="245" r="42" fill="rgba(255,255,255,0.08)" />
      </g>

      {/* brain glows */}
      <motion.g {...glowAnim} filter="url(#hardGlow)">
        <path
          d="M260 205c-34 0-62-20-62-48 0-22 16-40 38-46 6-20 26-34 50-34 18 0 34 8 44 20 4-1 9-2 13-2 30 0 54 20 54 46 0 19-12 36-30 43-1 28-31 49-67 49h-40z"
          fill="rgba(255,255,255,0.15)"
        />
        <path
          d="M398 210c-34 0-62-20-62-48 0-22 16-40 38-46 6-20 26-34 50-34 18 0 34 8 44 20 4-1 9-2 13-2 30 0 54 20 54 46 0 19-12 36-30 43-1 28-31 49-67 49h-40z"
          fill="rgba(200,200,200,0.12)"
        />
        <path
          d="M334 270c-30 0-54-18-54-42 0-19 14-34 33-39 5-18 22-30 43-30 15 0 29 7 37 17 3-1 7-2 10-2 26 0 46 17 46 39 0 16-10 30-26 36-1 25-27 43-59 43h-30z"
          fill="rgba(150,150,150,0.10)"
        />
      </motion.g>

      {/* brain outlines */}
      <g filter="url(#softGlow)" opacity="0.95">
        <path
          d="M262 210c-31 0-56-18-56-43 0-19 14-35 34-40 6-18 23-31 45-31 16 0 30 7 39 17 4-1 7-2 11-2 27 0 49 18 49 40 0 16-10 30-25 36-2 25-27 43-58 43h-39z"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="3"
        />
        <path
          d="M400 215c-31 0-56-18-56-43 0-19 14-35 34-40 6-18 23-31 45-31 16 0 30 7 39 17 4-1 7-2 11-2 27 0 49 18 49 40 0 16-10 30-25 36-2 25-27 43-58 43h-39z"
          fill="none"
          stroke="rgba(200,200,200,0.7)"
          strokeWidth="3"
        />
        <path
          d="M336 275c-27 0-48-16-48-37 0-16 12-29 29-33 5-15 20-26 38-26 13 0 24 6 31 14 3-1 6-1 9-1 23 0 41 15 41 34 0 13-8 25-21 30-2 22-23 38-50 38h-29z"
          fill="none"
          stroke="rgba(150,150,150,0.7)"
          strokeWidth="3"
        />
      </g>

      {/* tiny connection nodes around top brains */}
      <g opacity="0.55">
        {[
          [305, 96],
          [340, 112],
          [368, 90],
          [425, 102],
          [468, 86],
          [455, 128],
          [278, 122],
          [246, 104],
        ].map(([x, y], i) => (
          <circle
            key={`n-${i}`}
            cx={x}
            cy={y}
            r="3"
            fill={i % 3 === 0 ? 'rgba(255,255,255,0.9)' : i % 3 === 1 ? 'rgba(200,200,200,0.9)' : 'rgba(150,150,150,0.9)'}
            filter="url(#softGlow)"
          />
        ))}
        {[
          [305, 96, 340, 112],
          [340, 112, 368, 90],
          [368, 90, 425, 102],
          [425, 102, 468, 86],
          [468, 86, 455, 128],
          [278, 122, 246, 104],
          [246, 104, 305, 96],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={`l-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
        ))}
      </g>
    </motion.svg>
  );
}

