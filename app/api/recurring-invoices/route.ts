import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createRecurring, getRecurringByUser } from '@/lib/invoices-db'
import type { RecurringFrequency } from '@/lib/invoices-db'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const recurring = getRecurringByUser(session.user.id)
  return NextResponse.json(recurring)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json() as { template_invoice_id: string; frequency: RecurringFrequency; next_due_date: string }
  if (!body.template_invoice_id || !body.frequency || !body.next_due_date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const rec = createRecurring(session.user.id, body.template_invoice_id, body.frequency, body.next_due_date)
  return NextResponse.json(rec, { status: 201 })
}
