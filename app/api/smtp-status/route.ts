import { NextResponse } from 'next/server'
import { isSmtpConfigured } from '@/lib/email'

export async function GET() {
  return NextResponse.json({ configured: isSmtpConfigured() })
}
