import React from 'react';

export default function ParvatLogo({ className = 'h-14 w-auto' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 480 180" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* 1. Mountains (Green Peaks) */}
      <path 
        d="M 120 65 L 160 30 L 175 42 L 200 15 L 220 35 L 240 10 L 270 45 L 290 35 L 340 65 Z" 
        fill="#138135" 
      />
      {/* Mountain Shading & Clefts to match the logo style */}
      <path 
        d="M 160 30 L 164 45 L 160 55 M 200 15 L 204 35 L 200 50 M 240 10 L 244 32 L 235 48" 
        stroke="#ffffff" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Mountain outline detail */}
      <path 
        d="M 120 65 L 160 30 L 175 42 L 200 15 L 220 35 L 240 10 L 270 45 L 290 35 L 340 65" 
        stroke="#11702e" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Horizontal divider blue line */}
      <line 
        x1="70" 
        y1="66" 
        x2="410" 
        y2="66" 
        stroke="#004b93" 
        strokeWidth="2.5" 
      />

      {/* 2. Stylized "PR" Monogram */}
      {/* Royal Blue "P" Stem and Outer Curve */}
      <path 
        d="M 35,76 H 80 C 100,76 112,88 112,104 C 112,120 100,132 80,132 H 57 V 164 H 35 Z M 57,96 H 76 C 84,96 89,100 89,104 C 89,108 84,112 76,112 H 57 Z" 
        fill="#004b93" 
      />
      {/* Green Accent Box at the top left of "PR" stem */}
      <rect 
        x="35" 
        y="76" 
        width="22" 
        height="15" 
        fill="#138135" 
      />
      {/* Green "R" Leg */}
      <path 
        d="M 72,125 L 108,164 H 132 L 92,125 Z" 
        fill="#138135" 
      />

      {/* 3. Vertical Divider Line */}
      <line 
        x1="144" 
        y1="73" 
        x2="144" 
        y2="167" 
        stroke="#a2a2a2" 
        strokeWidth="3" 
        strokeLinecap="round"
      />

      {/* 4. Brand Texts */}
      {/* "PARVAT" Text */}
      <text 
        x="158" 
        y="122" 
        fontFamily="Georgia, 'Times New Roman', serif" 
        fontSize="52" 
        fontWeight="bold" 
        fill="#004b93" 
        letterSpacing="1.5"
      >
        PARVAT
      </text>

      {/* "REALITY AND DEVELOPERS" Text */}
      <text 
        x="158" 
        y="144" 
        fontFamily="Georgia, 'Times New Roman', serif" 
        fontSize="15.5" 
        fontWeight="bold" 
        fill="#138135" 
        letterSpacing="0.8"
      >
        REALITY AND DEVELOPERS
      </text>

      {/* "THE NEW ADDRESS OF PROGRESS" Blue Banner */}
      <rect 
        x="156" 
        y="152" 
        width="278" 
        height="20" 
        rx="4" 
        fill="#004b93" 
      />
      <text 
        x="295" 
        y="166" 
        textAnchor="middle" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif" 
        fontSize="8.5" 
        fontWeight="800" 
        fill="#ffffff" 
        letterSpacing="0.6"
      >
        THE NEW ADDRESS OF PROGRESS
      </text>
    </svg>
  );
}
