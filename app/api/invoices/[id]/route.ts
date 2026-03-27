import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getInvoice, updateInvoice, updatePaymentStatus, deleteInvoice } from '@/lib/invoices-db'
import type { InvoiceData } from '@/app/components/InvoiceGenerator'
import type { PaymentStatus } from '@/lib/invoices-db'

const VALID_PAYMENT_STATUSES: PaymentStatus[] = ['outstanding', 'paid', 'overdue']

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const invoice = getInvoice(id, session.user.id)
  if (!invoice) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(invoice)
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const body = await request.json()

  // If only payment_status is provided, update just that field
  if ('payment_status' in body && Object.keys(body).length === 1) {
    const ps = body.payment_status
    if (!VALID_PAYMENT_STATUSES.includes(ps)) {
      return NextResponse.json({ error: 'Invalid payment_status' }, { status: 400 })
    }
    const invoice = updatePaymentStatus(id, session.user.id, ps as PaymentStatus)
    if (!invoice) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(invoice)
  }

  // Otherwise update invoice data (may also include payment_status)
  if ('payment_status' in body && !VALID_PAYMENT_STATUSES.includes(body.payment_status)) {
    return NextResponse.json({ error: 'Invalid payment_status' }, { status: 400 })
  }

  const invoice = updateInvoice(id, session.user.id, body as InvoiceData)
  if (!invoice) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(invoice)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const ok = deleteInvoice(id, session.user.id)
  if (!ok) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return new Response(null, { status: 204 })
}
