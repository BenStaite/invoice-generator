import { NextRequest, NextResponse } from 'next/server'
import { saveEmailLead } from '@/lib/db'

export async function POST(req: NextRequest) {
  let body: { email?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  try {
    await saveEmailLead(email)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('UNIQUE') || msg.includes('unique')) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }
    console.error('email-capture error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
