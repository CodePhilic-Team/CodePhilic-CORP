'use client';

import React from 'react';

// Generates a decorative tech QR code with CodePhilic center badge
interface QrCodeProps {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
}

export default function QrCodeSvg({
  value,
  size = 100,
  fgColor = '#0f172a',
  bgColor = '#ffffff',
}: QrCodeProps) {
  // Generate deterministic matrix based on value string
  const gridSize = 21;
  const hash = Array.from(value).reduce((acc, char) => acc * 31 + char.charCodeAt(0), 7);

  // Pre-fill corners (standard QR position markers)
  const isCorner = (r: number, c: number) => {
    // Top-left 7x7
    if (r < 7 && c < 7) {
      if (r === 0 || r === 6 || c === 0 || c === 6) return true;
      if (r >= 2 && r <= 4 && c >= 2 && c <= 4) return true;
      return false;
    }
    // Top-right 7x7
    if (r < 7 && c >= gridSize - 7) {
      const cc = c - (gridSize - 7);
      if (r === 0 || r === 6 || cc === 0 || cc === 6) return true;
      if (r >= 2 && r <= 4 && cc >= 2 && cc <= 4) return true;
      return false;
    }
    // Bottom-left 7x7
    if (r >= gridSize - 7 && c < 7) {
      const rr = r - (gridSize - 7);
      if (rr === 0 || rr === 6 || c === 0 || c === 6) return true;
      if (rr >= 2 && rr <= 4 && c >= 2 && c <= 4) return true;
      return false;
    }
    // Center logo cutout 5x5
    if (r >= 8 && r <= 12 && c >= 8 && c <= 12) {
      return false;
    }
    return null;
  };

  const cells: boolean[][] = [];
  for (let r = 0; r < gridSize; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < gridSize; c++) {
      const cornerVal = isCorner(r, c);
      if (cornerVal !== null) {
        row.push(cornerVal);
      } else {
        // pseudo-random deterministic fill
        const bit = ((hash * (r + 1) * (c + 1) + (r * 17) + (c * 23)) % 10) > 4;
        row.push(bit);
      }
    }
    cells.push(row);
  }

  const cellSize = size / gridSize;

  return (
    <div
      className="relative flex items-center justify-center rounded-lg p-1.5 shadow-sm border border-slate-200/60 dark:border-slate-800"
      style={{ backgroundColor: bgColor, width: size + 12, height: size + 12 }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {cells.map((row, r) =>
          row.map((active, c) =>
            active ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize - 0.2}
                height={cellSize - 0.2}
                rx={cellSize * 0.2}
                fill={fgColor}
              />
            ) : null
          )
        )}
      </svg>
      {/* CodePhilic Center Hexagon Shield */}
      <div
        className="absolute inset-0 m-auto flex items-center justify-center rounded bg-white shadow-sm border border-cyan-500/30"
        style={{ width: size * 0.26, height: size * 0.26 }}
      >
        <div className="w-3.5 h-3.5 rounded bg-slate-900 flex items-center justify-center text-[7px] font-bold text-white">
          CP
        </div>
      </div>
    </div>
  );
}
