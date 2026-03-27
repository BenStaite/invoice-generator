import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createInvoice, listInvoices } from '@/lib/invoices-db'
import type { InvoiceData } from '@/app/components/InvoiceGenerator'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const invoices = listInvoices(session.user.id)
  return NextResponse.json(invoices)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body: InvoiceData = await request.json()
  const invoice = createInvoice(session.user.id, body)
  return NextResponse.json(invoice, { status: 201 })
}
