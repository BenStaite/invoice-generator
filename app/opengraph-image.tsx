import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Swiftbill – Professional Invoicing'
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
        <div style={{ fontSize: 80, fontWeight: 700, color: '#2563eb', marginBottom: 24 }}>
          Swiftbill
        </div>
        <div style={{ fontSize: 36, color: '#64748b' }}>
          Professional Invoicing · Free PDF · Pro from £4.99/mo
        </div>
      </div>
    ),
    { ...size }
  )
}
