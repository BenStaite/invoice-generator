import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { randomUUID } from 'crypto'
import type { InvoiceData } from '@/app/components/InvoiceGenerator'

const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const db = new Database(path.join(dataDir, 'invoices.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    invoice_number TEXT,
    client_name TEXT,
    total REAL,
    status TEXT DEFAULT 'draft',
    payment_status TEXT NOT NULL DEFAULT 'outstanding',
    data TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  )
`)

// Migration: add payment_status column if it doesn't exist
try {
  db.exec(`ALTER TABLE invoices ADD COLUMN payment_status TEXT NOT NULL DEFAULT 'outstanding'`)
} catch {
  // Column already exists, ignore
}

export type PaymentStatus = 'outstanding' | 'paid' | 'overdue'

export interface InvoiceRow {
  id: string
  user_id: string
  invoice_number: string | null
  client_name: string | null
  total: number | null
  status: string
  payment_status: PaymentStatus
  data: string
  created_at: string
  updated_at: string
}

function extractTotal(invoiceData: InvoiceData): number {
  const subtotal = invoiceData.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  )
  const discount =
    invoiceData.discountType === 'percentage'
      ? subtotal * (invoiceData.discountValue / 100)
      : invoiceData.discountValue
  const afterDiscount = Math.max(0, subtotal - discount)
  const tax = afterDiscount * (invoiceData.taxRate / 100)
  return afterDiscount + tax
}

export function createInvoice(userId: string, invoiceData: InvoiceData): InvoiceRow {
  const id = randomUUID()
  const total = extractTotal(invoiceData)
  db.prepare(
    `INSERT INTO invoices (id, user_id, invoice_number, client_name, total, status, data)
     VALUES (?, ?, ?, ?, ?, 'draft', ?)`
  ).run(id, userId, invoiceData.invoiceNumber || null, invoiceData.clientName || null, total, JSON.stringify(invoiceData))
  return db.prepare('SELECT * FROM invoices WHERE id = ?').get(id) as InvoiceRow
}

export function listInvoices(userId: string): InvoiceRow[] {
  return db.prepare('SELECT * FROM invoices WHERE user_id = ? ORDER BY updated_at DESC').all(userId) as InvoiceRow[]
}

export function getInvoice(id: string, userId: string): InvoiceRow | undefined {
  return db.prepare('SELECT * FROM invoices WHERE id = ? AND user_id = ?').get(id, userId) as InvoiceRow | undefined
}

export function updateInvoice(id: string, userId: string, invoiceData: InvoiceData): InvoiceRow | undefined {
  const total = extractTotal(invoiceData)
  const result = db.prepare(
    `UPDATE invoices SET invoice_number = ?, client_name = ?, total = ?, data = ?, updated_at = datetime('now')
     WHERE id = ? AND user_id = ?`
  ).run(invoiceData.invoiceNumber || null, invoiceData.clientName || null, total, JSON.stringify(invoiceData), id, userId)
  if (result.changes === 0) return undefined
  return db.prepare('SELECT * FROM invoices WHERE id = ?').get(id) as InvoiceRow
}

export function updatePaymentStatus(id: string, userId: string, paymentStatus: PaymentStatus): InvoiceRow | undefined {
  const result = db.prepare(
    `UPDATE invoices SET payment_status = ?, updated_at = datetime('now') WHERE id = ? AND user_id = ?`
  ).run(paymentStatus, id, userId)
  if (result.changes === 0) return undefined
  return db.prepare('SELECT * FROM invoices WHERE id = ?').get(id) as InvoiceRow
}

export function deleteInvoice(id: string, userId: string): boolean {
  const result = db.prepare('DELETE FROM invoices WHERE id = ? AND user_id = ?').run(id, userId)
  return result.changes > 0
}
