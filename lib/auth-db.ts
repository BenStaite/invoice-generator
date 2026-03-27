import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const db = new Database(path.join(dataDir, 'users.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )
`)

// Add is_pro column if it doesn't exist (migration)
try {
  db.exec(`ALTER TABLE users ADD COLUMN is_pro INTEGER DEFAULT 0`)
} catch {
  // Column already exists, ignore
}

export interface User {
  id: string
  email: string
  password_hash: string
  created_at: number
  is_pro: number
}

export function getUserByEmail(email: string): User | undefined {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined
}

export function getUserById(id: string): User | undefined {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined
}

export function isUserPro(userId: string): boolean {
  const user = db.prepare('SELECT is_pro FROM users WHERE id = ?').get(userId) as { is_pro: number } | undefined
  return user?.is_pro === 1
}

export function createUser(id: string, email: string, passwordHash: string): void {
  db.prepare(
    'INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)'
  ).run(id, email, passwordHash, Date.now())
}
