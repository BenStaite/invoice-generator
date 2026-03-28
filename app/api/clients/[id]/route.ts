import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { updateClient, deleteClient } from '@/lib/clients-db'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const fields: Record<string, string> = {}
  if (body.name !== undefined) fields.name = body.name.trim()
  if (body.email !== undefined) fields.email = body.email.trim()
  if (body.address !== undefined) fields.address = body.address.trim()
  const updated = await updateClient(id, session.user.id, fields)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const ok = await deleteClient(id, session.user.id)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
