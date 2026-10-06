'use client';

import React from 'react';

export interface PaidSealProps {
  status?: string;
  companyName?: string;
  date?: string;
  variant?: 'circular' | 'stamp' | 'badge';
  color?: 'emerald' | 'red' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function PaidSeal({
  status = 'PAID',
  companyName = 'CODEPHILIC LIMITED',
  date,
  variant = 'circular',
  color = 'emerald',
  size = 'md',
  className = '',
}: PaidSealProps) {
  const colorMap = {
    emerald: {
      text: 'text-emerald-700',
      border: 'border-emerald-600',
      stroke: '#059669',
      fill: '#f0fdf4',
      accent: '#10b981',
    },
    red: {
      text: 'text-rose-700',
      border: 'border-rose-600',
      stroke: '#e11d48',
      fill: '#fff1f2',
      accent: '#f43f5e',
    },
    blue: {
      text: 'text-blue-700',
      border: 'border-blue-600',
      stroke: '#2563eb',
      fill: '#eff6ff',
      accent: '#3b82f6',
    },
  };

  const currentTheme = colorMap[color] || colorMap.emerald;

  const circularDimensions = {
    sm: { width: 72, height: 72 },
    md: { width: 92, height: 92 },
    lg: { width: 112, height: 112 },
  };

  const stampDimensions = {
    sm: { width: 100, height: 48 },
    md: { width: 130, height: 60 },
    lg: { width: 160, height: 72 },
  };

  // 1. Classic Circular Official Seal
  if (variant === 'circular') {
    const dim = circularDimensions[size] || circularDimensions.md;
    return (
      <div
        className={`inline-block select-none transition-transform hover:scale-105 ${className}`}
        style={{ transformOrigin: 'center center' }}
        title={`${status} - Verified by ${companyName}`}
      >
        <svg
          width={dim.width}
          height={dim.height}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Background ink tint */}
          <circle cx="60" cy="60" r="56" fill={currentTheme.fill} />

          {/* Outer primary ring */}
          <circle
            cx="60"
            cy="60"
            r="56"
            stroke={currentTheme.stroke}
            strokeWidth="2.5"
          />

          {/* Dotted middle decorative ring */}
          <circle
            cx="60"
            cy="60"
            r="51"
            stroke={currentTheme.stroke}
            strokeWidth="1.2"
            strokeDasharray="3 2"
          />

          {/* Inner solid ring */}
          <circle
            cx="60"
            cy="60"
            r="38"
            stroke={currentTheme.stroke}
            strokeWidth="1.2"
          />

          {/* Top company name */}
          <text
            x="60"
            y="22"
            textAnchor="middle"
            fill={currentTheme.stroke}
            fontSize="7"
            fontWeight="800"
            letterSpacing="1.2"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {companyName.length > 20 ? companyName.substring(0, 20) + '..' : companyName}
          </text>

          {/* Left star (SVG polygon) */}
          <polygon
            points="22,57 23.5,60.5 27,60.5 24.2,62.8 25.2,66.5 22,64.2 18.8,66.5 19.8,62.8 17,60.5 20.5,60.5"
            fill={currentTheme.stroke}
          />

          {/* Right star (SVG polygon) */}
          <polygon
            points="98,57 99.5,60.5 103,60.5 100.2,62.8 101.2,66.5 98,64.2 94.8,66.5 95.8,62.8 93,60.5 96.5,60.5"
            fill={currentTheme.stroke}
          />

          {/* Center Banner Box */}
          <g>
            <line
              x1="26"
              y1="46"
              x2="94"
              y2="46"
              stroke={currentTheme.stroke}
              strokeWidth="1.5"
            />
            <text
              x="60"
              y="65"
              textAnchor="middle"
              fill={currentTheme.stroke}
              fontSize="19"
              fontWeight="900"
              letterSpacing="3.5"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {status}
            </text>
            <line
              x1="26"
              y1="71"
              x2="94"
              y2="71"
              stroke={currentTheme.stroke}
              strokeWidth="1.5"
            />
          </g>

          {/* Bottom arc text: OFFICIALLY SETTLED */}
          <text
            x="60"
            y="82"
            textAnchor="middle"
            fill={currentTheme.stroke}
            fontSize="6.5"
            fontWeight="700"
            letterSpacing="0.8"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            OFFICIALLY SETTLED
          </text>

          {/* Subtext: Date or Verification */}
          <text
            x="60"
            y="94"
            textAnchor="middle"
            fill={currentTheme.stroke}
            fontSize="6"
            fontWeight="600"
            letterSpacing="0.4"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {date || 'VERIFIED PAYMENT'}
          </text>
        </svg>
      </div>
    );
  }

  // 2. Rubber Stamp Variant
  if (variant === 'stamp') {
    const dim = stampDimensions[size] || stampDimensions.md;
    return (
      <div
        className={`inline-block select-none transition-transform hover:scale-105 ${className}`}
        style={{ transformOrigin: 'center center' }}
        title={`${status} - ${companyName}`}
      >
        <svg
          width={dim.width}
          height={dim.height}
          viewBox="0 0 140 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <rect
            x="3"
            y="3"
            width="134"
            height="58"
            rx="6"
            fill={currentTheme.fill}
          />
          <rect
            x="3"
            y="3"
            width="134"
            height="58"
            rx="6"
            stroke={currentTheme.stroke}
            strokeWidth="2.5"
          />
          <rect
            x="7"
            y="7"
            width="126"
            height="50"
            rx="4"
            stroke={currentTheme.stroke}
            strokeWidth="1"
            strokeDasharray="4 2"
          />
          <text
            x="70"
            y="19"
            textAnchor="middle"
            fill={currentTheme.stroke}
            fontSize="7"
            fontWeight="800"
            letterSpacing="1.5"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {companyName.length > 20 ? companyName.substring(0, 20) + '..' : companyName}
          </text>
          <text
            x="70"
            y="43"
            textAnchor="middle"
            fill={currentTheme.stroke}
            fontSize="23"
            fontWeight="900"
            letterSpacing="4"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {status}
          </text>
          <text
            x="70"
            y="53"
            textAnchor="middle"
            fill={currentTheme.stroke}
            fontSize="6"
            fontWeight="700"
            letterSpacing="0.8"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {date ? `PAID: ${date}` : 'SETTLED & RECEIVED'}
          </text>
        </svg>
      </div>
    );
  }

  // 3. Compact Seal Badge
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 font-medium text-xs shadow-xs ${className}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-600"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      <span className="font-bold tracking-wider uppercase text-[11px]">{status}</span>
    </div>
  );
}