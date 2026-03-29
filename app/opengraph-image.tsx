import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Invoxa - Professional Invoicing for Freelancers & Small Businesses'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 700, color: '#1e293b', marginBottom: 24 }}>
          📄 Invoxa
        </div>
        <div style={{ fontSize: 36, color: '#64748b' }}>
          Instant PDF · No Signup Required · 100% Free
        </div>
      </div>
    ),
    { ...size }
  )
}
