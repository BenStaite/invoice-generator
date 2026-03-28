import { db } from './db'
import { randomUUID } from 'crypto'

export interface ClientRow {
  id: string
  user_id: string
  name: string
  email: string
  address: string
  created_at: string
}

export async function listClients(userId: string): Promise<ClientRow[]> {
  const result = await db.execute({
    sql: 'SELECT * FROM clients WHERE user_id = ? ORDER BY name ASC',
    args: [userId],
  })
  return result.rows as unknown as ClientRow[]
}

export async function createClient(userId: string, name: string, email: string, address: string): Promise<ClientRow> {
  const id = randomUUID()
  await db.execute({
    sql: 'INSERT INTO clients (id, user_id, name, email, address) VALUES (?, ?, ?, ?, ?)',
    args: [id, userId, name, email, address],
  })
  const result = await db.execute({
    sql: 'SELECT * FROM clients WHERE id = ?',
    args: [id],
  })
  return result.rows[0] as unknown as ClientRow
}

export async function updateClient(
  id: string,
  userId: string,
  fields: Partial<Pick<ClientRow, 'name' | 'email' | 'address'>>
): Promise<ClientRow | undefined> {
  const sets: string[] = []
  const values: unknown[] = []
  if (fields.name !== undefined) { sets.push('name = ?'); values.push(fields.name) }
  if (fields.email !== undefined) { sets.push('email = ?'); values.push(fields.email) }
  if (fields.address !== undefined) { sets.push('address = ?'); values.push(fields.address) }
  if (sets.length === 0) return undefined
  values.push(id, userId)
  const result = await db.execute({
    sql: `UPDATE clients SET ${sets.join(', ')} WHERE id = ? AND user_id = ?`,
    args: values as (string | number | null)[],
  })
  if (result.rowsAffected === 0) return undefined
  const row = await db.execute({
    sql: 'SELECT * FROM clients WHERE id = ?',
    args: [id],
  })
  return row.rows[0] as unknown as ClientRow
}

export async function deleteClient(id: string, userId: string): Promise<boolean> {
  const result = await db.execute({
    sql: 'DELETE FROM clients WHERE id = ? AND user_id = ?',
    args: [id, userId],
  })
  return result.rowsAffected > 0
}
