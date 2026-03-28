import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getInvoice } from '@/lib/invoices-db'
import { sendReminderEmail, isSmtpConfigured } from '@/lib/email'

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isSmtpConfigured()) {
    return NextResponse.json({ error: 'SMTP is not configured' }, { status: 503 })
  }

  const { id } = await params
  const invoice = await getInvoice(id, session.user.id)
  if (!invoice) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  if (invoice.payment_status !== 'overdue') {
    return NextResponse.json({ error: 'Invoice is not overdue' }, { status: 400 })
  }

  const body = await request.json()
  const { to, subject, message } = body

  if (!to || !subject) {
    return NextResponse.json({ error: 'Missing required fields: to, subject' }, { status: 400 })
  }

  try {
    await sendReminderEmail(to, subject, message || '')
    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to send reminder'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
