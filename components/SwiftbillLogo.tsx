import React from 'react'

interface SwiftbillLogoProps {
  className?: string
  width?: number
  height?: number
}

export function SwiftbillLogo({ className, width = 120, height = 28 }: SwiftbillLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Swiftbill"
    >
      {/* Icon mark */}
      <rect width="28" height="28" rx="6" fill="#2563eb" />
      <path d="M7 8h14M7 12h10M7 16h12M7 20h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Wordmark */}
      <text x="34" y="20" fontFamily="sans-serif" fontWeight="700" fontSize="16" fill="#2563eb">
        Swiftbill
      </text>
    </svg>
  )
}

export default SwiftbillLogo
