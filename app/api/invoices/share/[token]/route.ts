import { NextRequest, NextResponse } from 'next/server'
import { getInvoiceByShareToken } from '@/lib/invoices-db'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const invoice = await getInvoiceByShareToken(token)

  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
  }

  // Parse invoice data and strip sensitive fields
  let invoiceData
  try {
    invoiceData = JSON.parse(invoice.data)
  } catch {
    return NextResponse.json({ error: 'Invalid invoice data' }, { status: 500 })
  }

  // Remove internal notes from the shared view
  const { notes: _notes, ...publicData } = invoiceData

  return NextResponse.json({
    id: invoice.id,
    invoice_number: invoice.invoice_number,
    client_name: invoice.client_name,
    total: invoice.total,
    created_at: invoice.created_at,
    updated_at: invoice.updated_at,
    invoiceData: publicData,
  })
}
