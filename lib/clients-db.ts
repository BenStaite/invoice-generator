import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { randomUUID } from 'crypto'

const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const db = new Database(path.join(dataDir, 'invoices.db'))
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL DEFAULT '',
    address TEXT NOT NULL DEFAULT '',
    created_at TEXT DEFAULT (datetime('now'))
  )
`)

export interface ClientRow {
  id: string
  user_id: string
  name: string
  email: string
  address: string
  created_at: string
}

export function listClients(userId: string): ClientRow[] {
  return db.prepare('SELECT * FROM clients WHERE user_id = ? ORDER BY name ASC').all(userId) as ClientRow[]
}

export function createClient(userId: string, name: string, email: string, address: string): ClientRow {
  const id = randomUUID()
  db.prepare('INSERT INTO clients (id, user_id, name, email, address) VALUES (?, ?, ?, ?, ?)').run(id, userId, name, email, address)
  return db.prepare('SELECT * FROM clients WHERE id = ?').get(id) as ClientRow
}

export function updateClient(id: string, userId: string, fields: Partial<Pick<ClientRow, 'name' | 'email' | 'address'>>): ClientRow | undefined {
  const sets: string[] = []
  const values: unknown[] = []
  if (fields.name !== undefined) { sets.push('name = ?'); values.push(fields.name) }
  if (fields.email !== undefined) { sets.push('email = ?'); values.push(fields.email) }
  if (fields.address !== undefined) { sets.push('address = ?'); values.push(fields.address) }
  if (sets.length === 0) return undefined
  values.push(id, userId)
  const result = db.prepare(`UPDATE clients SET ${sets.join(', ')} WHERE id = ? AND user_id = ?`).run(...values)
  if (result.changes === 0) return undefined
  return db.prepare('SELECT * FROM clients WHERE id = ?').get(id) as ClientRow
}

export function deleteClient(id: string, userId: string): boolean {
  const result = db.prepare('DELETE FROM clients WHERE id = ? AND user_id = ?').run(id, userId)
  return result.changes > 0
}
