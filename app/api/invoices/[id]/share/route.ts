import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { generateShareToken } from '@/lib/invoices-db'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const token = await generateShareToken(id, session.user.id)

  if (!token) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
  }

  const baseUrl = req.nextUrl.origin
  const shareUrl = `${baseUrl}/share/${token}`

  return NextResponse.json({ token, shareUrl })
}
