import React from "react";

interface IllustrationProps {
  className?: string;
}

/**
 * 404 / Shelf Not Found Illustration
 * Architectural drafting board with missing blueprint node, grid lines, and coordinate markers.
 */
export const NotFoundIllustration: React.FC<IllustrationProps> = ({ className = "w-64 h-64" }) => (
  <svg
    className={`select-none ${className}`}
    viewBox="0 0 320 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Grid Pattern */}
    <defs>
      <pattern id="notFoundGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e4e4e7" strokeWidth="0.8" strokeDasharray="2 2" />
      </pattern>
    </defs>
    <rect width="320" height="240" fill="url(#notFoundGrid)" rx="8" />

    {/* Technical Blueprint Frame */}
    <rect x="20" y="20" width="280" height="200" rx="4" fill="white" stroke="#d4d4d8" strokeWidth="1.5" />
    <rect x="28" y="28" width="264" height="184" fill="none" stroke="#f4f4f5" strokeWidth="1" />

    {/* Corner Measurement Crosshairs */}
    <path d="M 15 28 H 35 M 28 15 V 35" stroke="#a1a1aa" strokeWidth="1" />
    <path d="M 285 28 H 305 M 292 15 V 35" stroke="#a1a1aa" strokeWidth="1" />
    <path d="M 15 212 H 35 M 28 199 V 219" stroke="#a1a1aa" strokeWidth="1" />
    <path d="M 285 212 H 305 M 292 199 V 219" stroke="#a1a1aa" strokeWidth="1" />

    {/* Floating Missing Shelf Card (Dashed outline) */}
    <rect
      x="70"
      y="55"
      width="180"
      height="115"
      rx="4"
      fill="#fafafa"
      stroke="#71717a"
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />

    {/* 404 Large Technical Typography */}
    <text x="160" y="112" textAnchor="middle" fill="#18181b" fontSize="42" fontWeight="900" fontFamily="sans-serif" letterSpacing="-1">
      404
    </text>

    <text x="160" y="132" textAnchor="middle" fill="#71717a" fontSize="10" fontWeight="700" fontFamily="sans-serif" letterSpacing="2" className="uppercase">
      SHELF_NOT_LOCATED
    </text>

    {/* Drafting Compass / Ruler Elements */}
    <circle cx="160" cy="100" r="65" fill="none" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 3" />

    {/* Angle Arc Line */}
    <path d="M 95 100 A 65 65 0 0 1 225 100" fill="none" stroke="#27272a" strokeWidth="1.5" />
    
    {/* Geometric Node Markers */}
    <circle cx="95" cy="100" r="3.5" fill="#18181b" />
    <circle cx="225" cy="100" r="3.5" fill="#18181b" />
    <circle cx="160" cy="35" r="3.5" fill="#10b981" />

    {/* Measuring Dimension Arrow Line */}
    <path d="M 70 185 H 250" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M 70 181 V 189 M 250 181 V 189" stroke="#71717a" strokeWidth="1.5" />
    <text x="160" y="198" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontWeight="800" fontFamily="sans-serif">
      DIMENSION: UNKNOWN_HANDLE
    </text>
  </svg>
);

/**
 * Empty Shelf Illustration
 * Architectural empty bookcase grid with blueprint outlines.
 */
export const EmptyShelfIllustration: React.FC<IllustrationProps> = ({ className = "w-48 h-48" }) => (
  <svg
    className={`select-none ${className}`}
    viewBox="0 0 240 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background card frame */}
    <rect x="10" y="10" width="220" height="180" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="1.5" />
    
    {/* Grid Lines */}
    <line x1="10" y1="70" x2="230" y2="70" stroke="#e4e4e7" strokeWidth="1.5" />
    <line x1="10" y1="130" x2="230" y2="130" stroke="#e4e4e7" strokeWidth="1.5" />
    <line x1="120" y1="10" x2="120" y2="190" stroke="#f4f4f5" strokeWidth="1.5" strokeDasharray="3 3" />

    {/* Ghost Outline Books & Media Cards */}
    {/* Book spine 1 */}
    <rect x="30" y="25" width="24" height="36" rx="2" fill="white" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="36" y1="33" x2="48" y2="33" stroke="#d4d4d8" strokeWidth="1.5" />

    {/* Book spine 2 */}
    <rect x="60" y="20" width="20" height="41" rx="2" fill="#f4f4f5" stroke="#71717a" strokeWidth="1.5" />
    
    {/* Video Card outline */}
    <rect x="140" y="25" width="60" height="36" rx="2" fill="white" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="3 3" />
    <polygon points="166,38 176,43 166,48" fill="#d4d4d8" />

    {/* Ghost Podcast card */}
    <rect x="30" y="85" width="70" height="36" rx="2" fill="white" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="3 3" />
    <circle cx="48" cy="103" r="8" fill="#f4f4f5" stroke="#d4d4d8" strokeWidth="1.5" />

    {/* Empty shelf center callout */}
    <circle cx="165" cy="103" r="16" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="1.5" />
    <path d="M 160 103 H 170 M 165 98 V 108" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />

    {/* Bottom shelf baseline */}
    <rect x="30" y="145" width="180" height="30" rx="2" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4 4" />
    <text x="120" y="164" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontWeight="700" fontStyle="italic">
      No items curated on this shelf yet
    </text>
  </svg>
);

/**
 * Empty Analytics Graph Illustration
 * Node network and radar signal vector diagram.
 */
export const EmptyAnalyticsIllustration: React.FC<IllustrationProps> = ({ className = "w-44 h-44" }) => (
  <svg
    className={`select-none ${className}`}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Concentric Radar Rings */}
    <circle cx="100" cy="100" r="80" fill="none" stroke="#f4f4f5" strokeWidth="1.5" />
    <circle cx="100" cy="100" r="55" fill="none" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 3" />
    <circle cx="100" cy="100" r="30" fill="none" stroke="#e4e4e7" strokeWidth="1" />

    {/* Axes */}
    <line x1="10" y1="100" x2="190" y2="100" stroke="#f4f4f5" strokeWidth="1" />
    <line x1="100" y1="10" x2="100" y2="190" stroke="#f4f4f5" strokeWidth="1" />

    {/* Connecting Node Graph Lines */}
    <polyline points="45,120 75,70 125,110 155,55" fill="none" stroke="#18181b" strokeWidth="2" strokeDasharray="4 4" />

    {/* Active & Ghost Nodes */}
    <circle cx="45" cy="120" r="5" fill="white" stroke="#18181b" strokeWidth="2" />
    <circle cx="75" cy="70" r="6" fill="#18181b" />
    <circle cx="125" cy="110" r="5" fill="white" stroke="#10b981" strokeWidth="2" />
    <circle cx="155" cy="55" r="7" fill="#10b981" />

    {/* Pulse ring around main node */}
    <circle cx="155" cy="55" r="13" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />

    {/* Graph baseline shadow */}
    <path d="M 45 120 L 75 70 L 125 110 L 155 55 V 150 H 45 Z" fill="url(#graphGradient)" opacity="0.1" />
    <defs>
      <linearGradient id="graphGradient" x1="100" y1="55" x2="100" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#18181b" />
        <stop offset="1" stopColor="#18181b" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Hero Blueprint Matrix Illustration
 * Interconnected nodes representing Books, Videos, Podcasts, Essays.
 */
export const HeroBlueprintIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-auto" }) => (
  <svg
    className={`select-none ${className}`}
    viewBox="0 0 480 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Frame Grid */}
    <rect x="20" y="20" width="440" height="280" rx="4" fill="white" stroke="#e4e4e7" strokeWidth="1.5" />
    
    {/* Blueprint Background Grid */}
    <path d="M 20 80 H 460 M 20 140 H 460 M 20 200 H 460 M 20 260 H 460" stroke="#f4f4f5" strokeWidth="1" />
    <path d="M 100 20 V 300 M 180 20 V 300 M 260 20 V 300 M 340 20 V 300 M 400 20 V 300" stroke="#f4f4f5" strokeWidth="1" />

    {/* Connection Network Lines */}
    <path d="M 110 90 L 220 130 M 220 130 L 370 80 M 220 130 L 170 230 M 220 130 L 350 220" stroke="#27272a" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M 170 230 L 350 220" stroke="#a1a1aa" strokeWidth="1.5" />

    {/* Node 1: Book Card */}
    <g transform="translate(60, 60)">
      <rect width="100" height="60" rx="2" fill="white" stroke="#18181b" strokeWidth="1.5" />
      <rect x="8" y="10" width="24" height="40" rx="1" fill="#f4f4f5" stroke="#71717a" strokeWidth="1" />
      <line x1="40" y1="18" x2="88" y2="18" stroke="#18181b" strokeWidth="2" />
      <line x1="40" y1="28" x2="80" y2="28" stroke="#a1a1aa" strokeWidth="1.5" />
      <rect x="40" y="38" width="28" height="10" rx="1" fill="#f4f4f5" />
    </g>

    {/* Central Core Node: Curator Matrix */}
    <g transform="translate(180, 100)">
      <rect width="120" height="70" rx="2" fill="#18181b" />
      <text x="60" y="28" textAnchor="middle" fill="white" fontSize="10" fontWeight="900" letterSpacing="1">
        MIND_SHELF
      </text>
      <line x1="20" y1="36" x2="100" y2="36" stroke="#3f3f46" strokeWidth="1" />
      <text x="60" y="52" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="800">
        48 CURATIONS
      </text>
      <circle cx="6" cy="6" r="3" fill="#10b981" />
    </g>

    {/* Node 2: Video Card */}
    <g transform="translate(320, 50)">
      <rect width="110" height="65" rx="2" fill="white" stroke="#18181b" strokeWidth="1.5" />
      <rect x="10" y="10" width="90" height="28" rx="1" fill="#18181b" />
      <polygon points="50,20 58,24 50,28" fill="white" />
      <line x1="10" y1="48" x2="80" y2="48" stroke="#18181b" strokeWidth="1.5" />
    </g>

    {/* Node 3: Podcast Card */}
    <g transform="translate(110, 200)">
      <rect width="110" height="60" rx="2" fill="white" stroke="#18181b" strokeWidth="1.5" />
      <circle cx="28" cy="30" r="14" fill="#f4f4f5" stroke="#27272a" strokeWidth="1" />
      <path d="M 28 22 V 32 M 24 32 H 32" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="22" x2="98" y2="22" stroke="#18181b" strokeWidth="2" />
      <line x1="50" y1="32" x2="85" y2="32" stroke="#a1a1aa" strokeWidth="1.5" />
    </g>

    {/* Node 4: Essay Card */}
    <g transform="translate(300, 190)">
      <rect width="120" height="65" rx="2" fill="white" stroke="#18181b" strokeWidth="1.5" />
      <line x1="12" y1="18" x2="108" y2="18" stroke="#18181b" strokeWidth="2" />
      <line x1="12" y1="28" x2="95" y2="28" stroke="#71717a" strokeWidth="1.5" />
      <line x1="12" y1="36" x2="102" y2="36" stroke="#a1a1aa" strokeWidth="1" />
      <line x1="12" y1="44" x2="70" y2="44" stroke="#a1a1aa" strokeWidth="1" />
    </g>

    {/* Technical Annotations & Coordinates */}
    <text x="30" y="31" fill="#a1a1aa" fontSize="7" fontWeight="800" fontFamily="sans-serif">
      GRID: 0x8F9 // ARCHITECTURE
    </text>
    <text x="450" y="31" textAnchor="end" fill="#10b981" fontSize="7" fontWeight="800" fontFamily="sans-serif">
      STATUS: VERIFIED
    </text>
  </svg>
);
