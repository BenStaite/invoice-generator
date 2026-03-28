import { createClient } from '@libsql/client'

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url) {
  throw new Error('TURSO_DATABASE_URL environment variable is required')
}

export const db = createClient({
  url,
  authToken: authToken || undefined,
})

let _initialized = false
let _initPromise: Promise<void> | null = null

export async function ensureDb(): Promise<void> {
  if (_initialized) return
  if (_initPromise) return _initPromise
  _initPromise = initDb().then(() => { _initialized = true })
  return _initPromise
}

// Auto-initialize on module load
;(async () => {
  try {
    await initDb()
    _initialized = true
  } catch (e) {
    console.error('DB init failed', e)
  }
})()

// Run schema migrations at startup
export async function initDb() {
  await db.batch([
    // Users table
    {
      sql: `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        is_pro INTEGER DEFAULT 0
      )`,
      args: [],
    },
    // Invoices table
    {
      sql: `CREATE TABLE IF NOT EXISTS invoices (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        invoice_number TEXT,
        client_name TEXT,
        total REAL,
        status TEXT DEFAULT 'draft',
        payment_status TEXT NOT NULL DEFAULT 'outstanding',
        share_token TEXT,
        data TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )`,
      args: [],
    },
    // Unique index for share_token
    {
      sql: `CREATE UNIQUE INDEX IF NOT EXISTS idx_invoices_share_token ON invoices(share_token) WHERE share_token IS NOT NULL`,
      args: [],
    },
    // Clients table
    {
      sql: `CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL DEFAULT '',
        address TEXT NOT NULL DEFAULT '',
        created_at TEXT DEFAULT (datetime('now'))
      )`,
      args: [],
    },
    // Recurring invoices table
    {
      sql: `CREATE TABLE IF NOT EXISTS recurring_invoices (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        template_invoice_id TEXT NOT NULL,
        frequency TEXT NOT NULL,
        next_due_date TEXT NOT NULL,
        active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now'))
      )`,
      args: [],
    },
  ], 'deferred')
}
