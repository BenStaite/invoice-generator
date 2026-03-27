import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { updateRecurring, deleteRecurring } from '@/lib/invoices-db'
import type { RecurringFrequency } from '@/lib/invoices-db'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const body = await request.json() as { frequency?: RecurringFrequency; next_due_date?: string; active?: number }
  const updated = updateRecurring(id, session.user.id, body)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const deleted = deleteRecurring(id, session.user.id)
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
