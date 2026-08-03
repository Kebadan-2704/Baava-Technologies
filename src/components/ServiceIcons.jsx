import React from 'react';

/* ═══════════════════════════════════════════════
   SERVICE ICONS — Engineering & Automation
   7 core service icons matching the updated offerings
   ═══════════════════════════════════════════════ */

// 1. Digital Transformation & ERP Integration
export function ERPIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Central hub */}
      <rect x="20" y="18" width="24" height="28" rx="4" fill="#1e78ec" opacity="0.08" stroke="#1e78ec" strokeWidth="1.2" />
      <rect x="20" y="18" width="24" height="7" rx="4" fill="#1e78ec" opacity="0.18" />
      <rect x="20" y="22" width="24" height="3" fill="#1e78ec" opacity="0.18" />
      {/* ERP text */}
      <text x="32" y="24" textAnchor="middle" fontSize="5" fontWeight="800" fill="white" fontFamily="Inter, sans-serif" letterSpacing="0.1em">ERP</text>
      {/* Integration nodes */}
      <circle cx="32" cy="36" r="5" fill="#1e78ec" opacity="0.12" stroke="#1e78ec" strokeWidth="1" />
      <path d="M30 36 L32 34 L34 36 L32 38Z" fill="#1e78ec" opacity="0.6" />
      {/* Connection lines */}
      <path d="M14 24 H20" stroke="#1e78ec" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
      <path d="M44 24 H50" stroke="#1e78ec" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
      <path d="M14 36 H20" stroke="#1e78ec" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
      <path d="M44 36 H50" stroke="#1e78ec" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
      {/* Outer nodes */}
      <rect x="8" y="21" width="6" height="6" rx="1.5" fill="#1e78ec" opacity="0.15" stroke="#1e78ec" strokeWidth="0.8" />
      <rect x="50" y="21" width="6" height="6" rx="1.5" fill="#1e78ec" opacity="0.15" stroke="#1e78ec" strokeWidth="0.8" />
      <circle cx="11" cy="36" r="3" fill="#1e78ec" opacity="0.1" stroke="#1e78ec" strokeWidth="0.8" />
      <circle cx="53" cy="36" r="3" fill="#1e78ec" opacity="0.1" stroke="#1e78ec" strokeWidth="0.8" />
      {/* Data flow arrows */}
      <path d="M32 46 V52" stroke="#1e78ec" strokeWidth="1" opacity="0.3" />
      <path d="M30 50 L32 53 L34 50" stroke="#1e78ec" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M32 18 V12" stroke="#1e78ec" strokeWidth="1" opacity="0.3" />
      <path d="M30 14 L32 11 L34 14" stroke="#1e78ec" strokeWidth="0.8" fill="none" opacity="0.4" />
    </svg>
  );
}

// 2. Automation (RPA & AI)
export function AutomationIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Robot body */}
      <rect x="22" y="24" width="20" height="22" rx="4" fill="#0e8d6d" opacity="0.08" stroke="#0e8d6d" strokeWidth="1.2" />
      {/* Robot head */}
      <rect x="24" y="14" width="16" height="12" rx="3" fill="#0e8d6d" opacity="0.15" stroke="#0e8d6d" strokeWidth="1" />
      {/* Eyes */}
      <circle cx="29" cy="20" r="2" fill="#0e8d6d" opacity="0.5" />
      <circle cx="35" cy="20" r="2" fill="#0e8d6d" opacity="0.5" />
      <circle cx="29" cy="19.5" r="0.8" fill="white" />
      <circle cx="35" cy="19.5" r="0.8" fill="white" />
      {/* Antenna */}
      <line x1="32" y1="14" x2="32" y2="10" stroke="#0e8d6d" strokeWidth="1" opacity="0.4" />
      <circle cx="32" cy="9" r="2" fill="#0e8d6d" opacity="0.2" stroke="#0e8d6d" strokeWidth="0.8" />
      {/* Neural network lines */}
      <path d="M12 20 L22 28" stroke="#0e8d6d" strokeWidth="0.8" opacity="0.3" />
      <path d="M12 40 L22 36" stroke="#0e8d6d" strokeWidth="0.8" opacity="0.3" />
      <path d="M52 20 L42 28" stroke="#0e8d6d" strokeWidth="0.8" opacity="0.3" />
      <path d="M52 40 L42 36" stroke="#0e8d6d" strokeWidth="0.8" opacity="0.3" />
      {/* Neural dots */}
      <circle cx="10" cy="20" r="2" fill="#0e8d6d" opacity="0.15" stroke="#0e8d6d" strokeWidth="0.8" />
      <circle cx="10" cy="40" r="2" fill="#0e8d6d" opacity="0.15" stroke="#0e8d6d" strokeWidth="0.8" />
      <circle cx="54" cy="20" r="2" fill="#0e8d6d" opacity="0.15" stroke="#0e8d6d" strokeWidth="0.8" />
      <circle cx="54" cy="40" r="2" fill="#0e8d6d" opacity="0.15" stroke="#0e8d6d" strokeWidth="0.8" />
      {/* Gear on body */}
      <g transform="translate(32,35)">
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <rect key={i} x="-1.5" y="-6" width="3" height="3" rx="0.5" fill="#0e8d6d" opacity="0.4" transform={`rotate(${a})`} />
        ))}
        <circle r="3.5" fill="#0e8d6d" opacity="0.1" stroke="#0e8d6d" strokeWidth="0.8" />
      </g>
      {/* Arms */}
      <path d="M22 30 H16 V38 H22" stroke="#0e8d6d" strokeWidth="1" opacity="0.25" fill="none" strokeLinecap="round" />
      <path d="M42 30 H48 V38 H42" stroke="#0e8d6d" strokeWidth="1" opacity="0.25" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 3. Technical Data Entry
export function DataEntryIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Keyboard */}
      <rect x="10" y="38" width="44" height="16" rx="3" fill="#515e7b" opacity="0.08" stroke="#515e7b" strokeWidth="1.2" />
      {/* Keys */}
      {[0,1,2,3,4,5,6,7,8].map((i) => (
        <rect key={`k1-${i}`} x={14 + i*4} y="41" width="3" height="3" rx="0.5" fill="#515e7b" opacity="0.2" />
      ))}
      {[0,1,2,3,4,5,6,7].map((i) => (
        <rect key={`k2-${i}`} x={16 + i*4} y="46" width="3" height="3" rx="0.5" fill="#515e7b" opacity="0.15" />
      ))}
      <rect x="20" y="51" width="24" height="2" rx="1" fill="#515e7b" opacity="0.12" />
      {/* Screen / Data display */}
      <rect x="14" y="10" width="36" height="24" rx="3" fill="#515e7b" opacity="0.06" stroke="#515e7b" strokeWidth="1" />
      {/* Data streams */}
      <rect x="18" y="15" width="18" height="2" rx="1" fill="#1e78ec" opacity="0.3" />
      <rect x="18" y="19" width="28" height="2" rx="1" fill="#1e78ec" opacity="0.2" />
      <rect x="18" y="23" width="14" height="2" rx="1" fill="#1e78ec" opacity="0.25" />
      <rect x="18" y="27" width="22" height="2" rx="1" fill="#1e78ec" opacity="0.15" />
      {/* Cursor blink */}
      <rect x="40" y="15" width="1.5" height="2" rx="0.5" fill="#1e78ec" opacity="0.6" />
      {/* Check marks */}
      <circle cx="46" cy="24" r="3" fill="#0e8d6d" opacity="0.15" />
      <path d="M44.5 24 L45.5 25 L47.5 23" stroke="#0e8d6d" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 4. Baseline Customer Technical Support
export function SupportIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Headset */}
      <path d="M16 32 C16 22 24 14 32 14 C40 14 48 22 48 32" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.3" />
      <rect x="12" y="30" width="8" height="14" rx="4" fill="#8b5cf6" opacity="0.12" stroke="#8b5cf6" strokeWidth="1" />
      <rect x="44" y="30" width="8" height="14" rx="4" fill="#8b5cf6" opacity="0.12" stroke="#8b5cf6" strokeWidth="1" />
      {/* Mic */}
      <path d="M48 42 C48 48 40 52 36 52" stroke="#8b5cf6" strokeWidth="1.2" fill="none" opacity="0.3" />
      <circle cx="36" cy="52" r="2" fill="#8b5cf6" opacity="0.2" stroke="#8b5cf6" strokeWidth="0.8" />
      {/* Shield badge */}
      <g transform="translate(26,26)">
        <path d="M6 0 L12 3 L12 8 C12 12 6 15 6 15 C6 15 0 12 0 8 L0 3 Z" fill="#8b5cf6" opacity="0.1" stroke="#8b5cf6" strokeWidth="0.8" />
        <path d="M4 8 L5.5 9.5 L8 7" stroke="#8b5cf6" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
      </g>
      {/* Signal waves */}
      <path d="M52 24 C54 26 54 30 52 32" stroke="#8b5cf6" strokeWidth="0.8" fill="none" opacity="0.2" />
      <path d="M55 22 C58 26 58 32 55 34" stroke="#8b5cf6" strokeWidth="0.8" fill="none" opacity="0.12" />
    </svg>
  );
}

// 5. Supply Chain & Procurement Support
export function SupplyChainIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Chain links */}
      <rect x="8" y="24" width="14" height="16" rx="3" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="1" />
      <rect x="25" y="24" width="14" height="16" rx="3" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="1" />
      <rect x="42" y="24" width="14" height="16" rx="3" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="1" />
      {/* Link connectors */}
      <path d="M22 32 H25" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" />
      <path d="M39 32 H42" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" />
      {/* Icons in chain */}
      <text x="15" y="35" textAnchor="middle" fontSize="10" opacity="0.5">📦</text>
      <text x="32" y="35" textAnchor="middle" fontSize="10" opacity="0.5">🔄</text>
      <text x="49" y="35" textAnchor="middle" fontSize="10" opacity="0.5">✓</text>
      {/* Flow arrows */}
      <path d="M15 44 V50 H32 V44" stroke="#f59e0b" strokeWidth="0.8" opacity="0.25" fill="none" strokeDasharray="3 2" />
      <path d="M32 44 V48 H49 V44" stroke="#f59e0b" strokeWidth="0.8" opacity="0.2" fill="none" strokeDasharray="3 2" />
      {/* Top arrows */}
      <path d="M15 24 V18" stroke="#f59e0b" strokeWidth="0.8" opacity="0.3" />
      <path d="M13 20 L15 17 L17 20" stroke="#f59e0b" strokeWidth="0.8" fill="none" opacity="0.3" />
    </svg>
  );
}

// 6. Document Management
export function DocumentIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* File cabinet */}
      <rect x="14" y="10" width="28" height="44" rx="3" fill="#1e78ec" opacity="0.06" stroke="#1e78ec" strokeWidth="1" />
      {/* Drawer dividers */}
      <line x1="14" y1="24" x2="42" y2="24" stroke="#1e78ec" strokeWidth="0.8" opacity="0.2" />
      <line x1="14" y1="38" x2="42" y2="38" stroke="#1e78ec" strokeWidth="0.8" opacity="0.2" />
      {/* Drawer handles */}
      <rect x="26" y="16" width="4" height="2" rx="1" fill="#1e78ec" opacity="0.3" />
      <rect x="26" y="30" width="4" height="2" rx="1" fill="#1e78ec" opacity="0.3" />
      <rect x="26" y="44" width="4" height="2" rx="1" fill="#1e78ec" opacity="0.3" />
      {/* Cloud overlay */}
      <g transform="translate(36,8)">
        <path d="M8 16 C4 16 0 13 0 10 C0 7 3 4 6 4 C6 2 8 0 11 0 C14 0 16 2 16 4 C19 4 22 7 22 10 C22 13 19 16 16 16 Z" fill="#1e78ec" opacity="0.1" stroke="#1e78ec" strokeWidth="0.8" />
        {/* Upload arrow */}
        <path d="M11 13 V8" stroke="#1e78ec" strokeWidth="1" opacity="0.4" />
        <path d="M9 10 L11 7 L13 10" stroke="#1e78ec" strokeWidth="0.8" fill="none" opacity="0.4" />
      </g>
      {/* Document pages */}
      <rect x="18" y="27" width="8" height="3" rx="0.5" fill="#1e78ec" opacity="0.15" />
      <rect x="18" y="32" width="12" height="1.5" rx="0.5" fill="#1e78ec" opacity="0.1" />
      <rect x="18" y="41" width="10" height="3" rx="0.5" fill="#1e78ec" opacity="0.15" />
      <rect x="18" y="46" width="14" height="1.5" rx="0.5" fill="#1e78ec" opacity="0.1" />
    </svg>
  );
}

// 7. BOM Lifecycle Management
export function BOMIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Central component tree */}
      <circle cx="32" cy="14" r="6" fill="#84cc16" opacity="0.1" stroke="#84cc16" strokeWidth="1" />
      <text x="32" y="17" textAnchor="middle" fontSize="6" fontWeight="700" fill="#84cc16" opacity="0.6" fontFamily="Inter, sans-serif">BOM</text>
      {/* Tree branches */}
      <path d="M32 20 V26" stroke="#84cc16" strokeWidth="1" opacity="0.3" />
      <path d="M32 26 H18" stroke="#84cc16" strokeWidth="1" opacity="0.3" />
      <path d="M32 26 H46" stroke="#84cc16" strokeWidth="1" opacity="0.3" />
      {/* Sub-assemblies */}
      <rect x="10" y="28" width="16" height="10" rx="2" fill="#84cc16" opacity="0.08" stroke="#84cc16" strokeWidth="0.8" />
      <rect x="38" y="28" width="16" height="10" rx="2" fill="#84cc16" opacity="0.08" stroke="#84cc16" strokeWidth="0.8" />
      {/* Sub-assembly labels */}
      <rect x="13" y="31" width="10" height="1.5" rx="0.5" fill="#84cc16" opacity="0.2" />
      <rect x="13" y="34" width="7" height="1.5" rx="0.5" fill="#84cc16" opacity="0.12" />
      <rect x="41" y="31" width="10" height="1.5" rx="0.5" fill="#84cc16" opacity="0.2" />
      <rect x="41" y="34" width="7" height="1.5" rx="0.5" fill="#84cc16" opacity="0.12" />
      {/* Lower tier */}
      <path d="M18 38 V42" stroke="#84cc16" strokeWidth="0.8" opacity="0.25" />
      <path d="M46 38 V42" stroke="#84cc16" strokeWidth="0.8" opacity="0.25" />
      <rect x="12" y="42" width="12" height="8" rx="1.5" fill="#84cc16" opacity="0.06" stroke="#84cc16" strokeWidth="0.8" />
      <rect x="40" y="42" width="12" height="8" rx="1.5" fill="#84cc16" opacity="0.06" stroke="#84cc16" strokeWidth="0.8" />
      {/* Lifecycle cycle arrow */}
      <g transform="translate(26,44)" opacity="0.35">
        <path d="M6 0 A6 6 0 1 1 0 6" stroke="#84cc16" strokeWidth="1.2" fill="none" />
        <path d="M-1 4 L0 7 L3 6" stroke="#84cc16" strokeWidth="0.8" fill="none" />
      </g>
      {/* Version badge */}
      <g transform="translate(48,12)">
        <rect x="0" y="0" width="10" height="5" rx="2.5" fill="#84cc16" opacity="0.25" />
        <text x="5" y="3.8" textAnchor="middle" fontSize="3" fontWeight="700" fill="white" fontFamily="Inter, sans-serif">v3.2</text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   LEGACY EXPORTS — Keep backward compatibility
   ═══════════════════════════════════════════════ */

// Original Engineering icon (keep for backward compat)
export function EngineeringIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g transform="translate(32,28)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <rect key={i} x="-2.5" y="-14" width="5" height="6" rx="1" fill="#26a7e0" opacity="0.85" transform={`rotate(${angle})`} />
        ))}
        <circle r="10" fill="#26a7e0" opacity="0.15" />
        <circle r="10" stroke="#26a7e0" strokeWidth="1.5" fill="none" />
        <circle r="4" fill="white" stroke="#26a7e0" strokeWidth="1.5" />
      </g>
      <g transform="translate(48,46)">
        <polygon points="0,-6 5.2,-3 5.2,3 0,6 -5.2,3 -5.2,-3" fill="#1a8fbf" opacity="0.25" />
        <polygon points="0,-6 5.2,-3 5.2,3 0,6 -5.2,3 -5.2,-3" stroke="#1a8fbf" strokeWidth="1.2" fill="none" />
        <circle r="2.5" fill="white" stroke="#1a8fbf" strokeWidth="1" />
      </g>
      <path d="M14 48 H22 V42 H28" stroke="#26a7e0" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <circle cx="28" cy="42" r="1.5" fill="#26a7e0" opacity="0.6" />
    </svg>
  );
}

export function BookkeepingIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="14" y="8" width="36" height="48" rx="4" fill="#10b981" opacity="0.08" stroke="#10b981" strokeWidth="1.2" />
      <rect x="14" y="8" width="36" height="10" rx="4" fill="#10b981" opacity="0.15" />
      <g transform="translate(24,26)">
        <text x="0" y="14" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="18" fill="#10b981" opacity="0.9">$</text>
      </g>
      <g transform="translate(36,22)">
        <text x="0" y="10" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="12" fill="#059669" opacity="0.6">₹</text>
      </g>
    </svg>
  );
}

export function StudentIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="10" width="44" height="44" rx="6" fill="#8b5cf6" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.2" />
      <rect x="10" y="10" width="44" height="8" rx="6" fill="#8b5cf6" opacity="0.2" />
      <circle cx="26" cy="30" r="6" fill="#8b5cf6" opacity="0.2" stroke="#8b5cf6" strokeWidth="1" />
      <circle cx="26" cy="28" r="2.5" fill="#8b5cf6" opacity="0.35" />
      <path d="M21 35 C21 31 31 31 31 35" fill="#8b5cf6" opacity="0.25" />
      <rect x="36" y="26" width="14" height="2" rx="1" fill="#8b5cf6" opacity="0.3" />
      <rect x="36" y="31" width="11" height="2" rx="1" fill="#8b5cf6" opacity="0.2" />
    </svg>
  );
}

export function InventoryIcon({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="8" y="8" width="48" height="48" rx="5" fill="#84cc16" opacity="0.06" stroke="#84cc16" strokeWidth="1" />
      <line x1="8" y1="28" x2="56" y2="28" stroke="#84cc16" strokeWidth="0.6" opacity="0.2" />
      <line x1="32" y1="8" x2="32" y2="56" stroke="#84cc16" strokeWidth="0.6" opacity="0.15" />
      <g transform="translate(13,13)">
        <rect x="2" y="2" width="12" height="10" rx="1.5" fill="#84cc16" opacity="0.2" stroke="#84cc16" strokeWidth="1" />
        <line x1="4" y1="0" x2="4" y2="2" stroke="#84cc16" strokeWidth="1" />
        <line x1="8" y1="0" x2="8" y2="2" stroke="#84cc16" strokeWidth="1" />
        <line x1="12" y1="0" x2="12" y2="2" stroke="#84cc16" strokeWidth="1" />
      </g>
    </svg>
  );
}
