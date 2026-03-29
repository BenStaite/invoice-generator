import React from "react";

interface InvoxaLogoProps {
  className?: string;
  size?: number;
}

export function InvoxaLogo({ className, size = 32 }: InvoxaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Invoice page shape */}
      <rect x="5" y="2" width="18" height="24" rx="2" fill="#2563EB" />
      {/* Folded corner */}
      <path d="M19 2 L23 6 L19 6 Z" fill="#1D4ED8" />
      {/* Lines representing invoice text */}
      <rect x="8" y="10" width="10" height="1.5" rx="0.75" fill="white" opacity="0.9" />
      <rect x="8" y="13.5" width="8" height="1.5" rx="0.75" fill="white" opacity="0.7" />
      <rect x="8" y="17" width="10" height="1.5" rx="0.75" fill="white" opacity="0.7" />
      <rect x="8" y="20.5" width="6" height="1.5" rx="0.75" fill="white" opacity="0.9" />
      {/* Accent tick */}
      <circle cx="24" cy="24" r="6" fill="#10B981" />
      <path d="M21.5 24 L23.5 26 L26.5 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InvoxaWordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <InvoxaLogo size={28} />
      <span
        className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
        style={{ letterSpacing: "-0.02em" }}
      >
        Invoxa
      </span>
    </span>
  );
}
