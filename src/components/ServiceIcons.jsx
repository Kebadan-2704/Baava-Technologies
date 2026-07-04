import React from 'react';

// Engineering Icon — Gear + Circuit Traces + Nut/Bolt
export function EngineeringIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      
      {/* Main Gear */}
      <g transform="translate(32,28)">
        {/* Gear teeth */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <rect
            key={i}
            x="-2.5" y="-14"
            width="5" height="6"
            rx="1"
            fill="#26a7e0"
            opacity="0.85"
            transform={`rotate(${angle})`}
          />
        ))}
        {/* Gear body */}
        <circle r="10" fill="#26a7e0" opacity="0.15" />
        <circle r="10" stroke="#26a7e0" strokeWidth="1.5" fill="none" />
        <circle r="4" fill="white" stroke="#26a7e0" strokeWidth="1.5" />
      </g>

      {/* Small bolt/nut — bottom-right */}
      <g transform="translate(48,46)">
        <polygon points="0,-6 5.2,-3 5.2,3 0,6 -5.2,3 -5.2,-3" fill="#1a8fbf" opacity="0.25" />
        <polygon points="0,-6 5.2,-3 5.2,3 0,6 -5.2,3 -5.2,-3" stroke="#1a8fbf" strokeWidth="1.2" fill="none" />
        <circle r="2.5" fill="white" stroke="#1a8fbf" strokeWidth="1" />
      </g>

      {/* Circuit trace lines */}
      <path d="M14 48 H22 V42 H28" stroke="#26a7e0" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M14 52 H18 V56 H26" stroke="#26a7e0" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      <circle cx="28" cy="42" r="1.5" fill="#26a7e0" opacity="0.6" />
      <circle cx="26" cy="56" r="1.5" fill="#26a7e0" opacity="0.4" />

      {/* Small resistor symbol */}
      <g transform="translate(14,20)" opacity="0.5">
        <line x1="0" y1="4" x2="3" y2="4" stroke="#26a7e0" strokeWidth="1" />
        <polyline points="3,4 4,1 6,7 8,1 10,7 12,1 13,4" stroke="#26a7e0" strokeWidth="1" fill="none" />
        <line x1="13" y1="4" x2="16" y2="4" stroke="#26a7e0" strokeWidth="1" />
      </g>

      {/* LED symbol */}
      <g transform="translate(46,14)" opacity="0.45">
        <polygon points="0,0 6,3 0,6" fill="none" stroke="#26a7e0" strokeWidth="1" />
        <line x1="6" y1="0" x2="6" y2="6" stroke="#26a7e0" strokeWidth="1" />
        <line x1="7" y1="1" x2="9" y2="-1" stroke="#26a7e0" strokeWidth="0.8" />
        <polygon points="8.5,-1.5 9,-1 8,-0.5" fill="#26a7e0" />
      </g>
    </svg>
  );
}

// Bookkeeping & Invoices Icon — Currency Symbols with flow
export function BookkeepingIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Receipt/Invoice background shape */}
      <rect x="14" y="8" width="36" height="48" rx="4" fill="#10b981" opacity="0.08" stroke="#10b981" strokeWidth="1.2" />
      <rect x="14" y="8" width="36" height="10" rx="4" fill="#10b981" opacity="0.15" />

      {/* Dollar sign — prominent */}
      <g transform="translate(24,26)">
        <text x="0" y="14" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="18" fill="#10b981" opacity="0.9">$</text>
      </g>

      {/* Rupee sign */}
      <g transform="translate(36,22)">
        <text x="0" y="10" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="12" fill="#059669" opacity="0.6">₹</text>
      </g>

      {/* Euro sign */}
      <g transform="translate(18,38)">
        <text x="0" y="10" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="11" fill="#059669" opacity="0.55">€</text>
      </g>

      {/* Yen sign */}
      <g transform="translate(38,36)">
        <text x="0" y="10" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" fill="#10b981" opacity="0.45">¥</text>
      </g>

      {/* Pound sign */}
      <g transform="translate(28,44)">
        <text x="0" y="10" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="9" fill="#059669" opacity="0.4">£</text>
      </g>

      {/* Flow lines — indicating money movement */}
      <path d="M20 14 H44" stroke="#10b981" strokeWidth="0.8" opacity="0.3" />
      <path d="M20 17 H38" stroke="#10b981" strokeWidth="0.8" opacity="0.2" />

      {/* Small dots for decoration */}
      <circle cx="44" cy="14" r="1" fill="#10b981" opacity="0.4" />
      <circle cx="38" cy="17" r="1" fill="#10b981" opacity="0.3" />
    </svg>
  );
}

// Students Icon — Student profile/biodata card
export function StudentIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Card background */}
      <rect x="10" y="10" width="44" height="44" rx="6" fill="#8b5cf6" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.2" />
      
      {/* ID Card header bar */}
      <rect x="10" y="10" width="44" height="8" rx="6" fill="#8b5cf6" opacity="0.2" />
      <rect x="10" y="14" width="44" height="4" fill="#8b5cf6" opacity="0.2" />

      {/* Student avatar silhouette */}
      <circle cx="26" cy="30" r="6" fill="#8b5cf6" opacity="0.2" stroke="#8b5cf6" strokeWidth="1" />
      <circle cx="26" cy="28" r="2.5" fill="#8b5cf6" opacity="0.35" />
      <path d="M21 35 C21 31 31 31 31 35" fill="#8b5cf6" opacity="0.25" />

      {/* Text lines representing biodata */}
      <rect x="36" y="26" width="14" height="2" rx="1" fill="#8b5cf6" opacity="0.3" />
      <rect x="36" y="31" width="11" height="2" rx="1" fill="#8b5cf6" opacity="0.2" />
      <rect x="36" y="36" width="13" height="2" rx="1" fill="#8b5cf6" opacity="0.15" />

      {/* Bottom info lines */}
      <rect x="16" y="42" width="32" height="1.5" rx="0.75" fill="#8b5cf6" opacity="0.12" />
      <rect x="16" y="46" width="24" height="1.5" rx="0.75" fill="#8b5cf6" opacity="0.08" />

      {/* Graduation cap mini icon */}
      <g transform="translate(42,12)" opacity="0.6">
        <polygon points="0,3 5,-0.5 10,3 5,5" fill="#8b5cf6" opacity="0.5" />
        <line x1="5" y1="3" x2="5" y2="7" stroke="#8b5cf6" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

// Inventory Icon — Electronic Components (resistor, capacitor, IC chip)
export function InventoryIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Storage shelf/grid background */}
      <rect x="8" y="8" width="48" height="48" rx="5" fill="#84cc16" opacity="0.06" stroke="#84cc16" strokeWidth="1" />
      
      {/* Grid lines — like storage compartments */}
      <line x1="8" y1="28" x2="56" y2="28" stroke="#84cc16" strokeWidth="0.6" opacity="0.2" />
      <line x1="8" y1="44" x2="56" y2="44" stroke="#84cc16" strokeWidth="0.6" opacity="0.2" />
      <line x1="32" y1="8" x2="32" y2="56" stroke="#84cc16" strokeWidth="0.6" opacity="0.15" />

      {/* IC Chip — top left compartment */}
      <g transform="translate(13,13)">
        <rect x="2" y="2" width="12" height="10" rx="1.5" fill="#84cc16" opacity="0.2" stroke="#84cc16" strokeWidth="1" />
        {/* Pins */}
        <line x1="4" y1="0" x2="4" y2="2" stroke="#84cc16" strokeWidth="1" />
        <line x1="8" y1="0" x2="8" y2="2" stroke="#84cc16" strokeWidth="1" />
        <line x1="12" y1="0" x2="12" y2="2" stroke="#84cc16" strokeWidth="1" />
        <line x1="4" y1="12" x2="4" y2="14" stroke="#84cc16" strokeWidth="1" />
        <line x1="8" y1="12" x2="8" y2="14" stroke="#84cc16" strokeWidth="1" />
        <line x1="12" y1="12" x2="12" y2="14" stroke="#84cc16" strokeWidth="1" />
        {/* Dot on chip */}
        <circle cx="5" cy="5" r="1" fill="#84cc16" opacity="0.5" />
      </g>

      {/* Resistor — top right compartment */}
      <g transform="translate(36,18)">
        <line x1="0" y1="4" x2="3" y2="4" stroke="#84cc16" strokeWidth="1.2" />
        <polyline points="3,4 4.5,0.5 7,7.5 9.5,0.5 12,7.5 14.5,0.5 16,4" stroke="#84cc16" strokeWidth="1.2" fill="none" />
        <line x1="16" y1="4" x2="19" y2="4" stroke="#84cc16" strokeWidth="1.2" />
      </g>

      {/* Capacitor — bottom left compartment */}
      <g transform="translate(16,33)">
        <line x1="0" y1="5" x2="6" y2="5" stroke="#84cc16" strokeWidth="1.2" />
        <line x1="6" y1="0" x2="6" y2="10" stroke="#84cc16" strokeWidth="1.5" />
        <path d="M9,0 Q11,5 9,10" stroke="#84cc16" strokeWidth="1.5" fill="none" />
        <line x1="9" y1="5" x2="15" y2="5" stroke="#84cc16" strokeWidth="1.2" />
      </g>

      {/* LED — bottom right compartment */}
      <g transform="translate(38,34)">
        <polygon points="0,0 8,4 0,8" fill="#84cc16" opacity="0.2" stroke="#84cc16" strokeWidth="1" />
        <line x1="8" y1="0" x2="8" y2="8" stroke="#84cc16" strokeWidth="1.2" />
        {/* Light rays */}
        <line x1="10" y1="1" x2="13" y2="-1" stroke="#84cc16" strokeWidth="0.8" opacity="0.6" />
        <line x1="10" y1="4" x2="14" y2="4" stroke="#84cc16" strokeWidth="0.8" opacity="0.5" />
        <polygon points="12.5,-1.5 13,-1 12,-0.5" fill="#84cc16" opacity="0.6" />
        <polygon points="13.5,3.5 14,4 13.5,4.5" fill="#84cc16" opacity="0.5" />
      </g>

      {/* Quantity badges */}
      <g transform="translate(44,10)">
        <rect x="0" y="0" width="10" height="6" rx="3" fill="#84cc16" opacity="0.3" />
        <text x="5" y="4.5" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="4" fill="white" textAnchor="middle">42</text>
      </g>
      <g transform="translate(10,46)">
        <rect x="0" y="0" width="10" height="6" rx="3" fill="#84cc16" opacity="0.25" />
        <text x="5" y="4.5" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="4" fill="white" textAnchor="middle">18</text>
      </g>
    </svg>
  );
}
