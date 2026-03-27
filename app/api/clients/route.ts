import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { listClients, createClient } from '@/lib/clients-db'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const clients = listClients(session.user.id)
  return NextResponse.json(clients)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { name, email = '', address = '' } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  const client = createClient(session.user.id, name.trim(), email.trim(), address.trim())
  return NextResponse.json(client, { status: 201 })
}
