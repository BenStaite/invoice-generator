import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getInvoice } from '@/lib/invoices-db'
import { sendInvoiceEmail, isSmtpConfigured } from '@/lib/email'

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

  const body = await request.json()
  const { to, subject, message, pdfBase64 } = body

  if (!to || !subject) {
    return NextResponse.json({ error: 'Missing required fields: to, subject' }, { status: 400 })
  }

  let pdfBuffer: Buffer
  let filename: string

  if (pdfBase64) {
    pdfBuffer = Buffer.from(pdfBase64, 'base64')
    const invoiceNum = (invoice.invoice_number || 'invoice').replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const clientName = (invoice.client_name || 'client').replace(/[^a-z0-9]/gi, '-').toLowerCase()
    filename = `invoice-${invoiceNum}-${clientName}.pdf`
  } else {
    // Fallback: generate a simple text-based HTML receipt
    const invoiceData = JSON.parse(invoice.data || '{}')
    const html = `Invoice #${invoice.invoice_number || ''} for ${invoice.client_name || ''}\nTotal: $${invoice.total?.toFixed(2) || '0.00'}`
    pdfBuffer = Buffer.from(html, 'utf-8')
    filename = `invoice-${invoice.invoice_number || 'invoice'}.txt`
  }

  try {
    await sendInvoiceEmail(to, subject, message || '', pdfBuffer, filename)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send email'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
