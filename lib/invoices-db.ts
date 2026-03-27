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

// ── Recurring invoices ──────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS recurring_invoices (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    template_invoice_id TEXT NOT NULL,
    frequency TEXT NOT NULL,
    next_due_date TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  )
`)

export type RecurringFrequency = 'weekly' | 'monthly' | 'quarterly'

export interface RecurringInvoiceRow {
  id: string
  user_id: string
  template_invoice_id: string
  frequency: RecurringFrequency
  next_due_date: string
  active: number
  created_at: string
}

export function createRecurring(
  userId: string,
  templateInvoiceId: string,
  frequency: RecurringFrequency,
  nextDueDate: string
): RecurringInvoiceRow {
  const id = randomUUID()
  db.prepare(
    `INSERT INTO recurring_invoices (id, user_id, template_invoice_id, frequency, next_due_date, active)
     VALUES (?, ?, ?, ?, ?, 1)`
  ).run(id, userId, templateInvoiceId, frequency, nextDueDate)
  return db.prepare('SELECT * FROM recurring_invoices WHERE id = ?').get(id) as RecurringInvoiceRow
}

export function getRecurringByUser(userId: string): RecurringInvoiceRow[] {
  return db.prepare('SELECT * FROM recurring_invoices WHERE user_id = ? ORDER BY created_at DESC').all(userId) as RecurringInvoiceRow[]
}

export function updateRecurring(
  id: string,
  userId: string,
  fields: Partial<Pick<RecurringInvoiceRow, 'frequency' | 'next_due_date' | 'active'>>
): RecurringInvoiceRow | undefined {
  const sets: string[] = []
  const values: unknown[] = []
  if (fields.frequency !== undefined) { sets.push('frequency = ?'); values.push(fields.frequency) }
  if (fields.next_due_date !== undefined) { sets.push('next_due_date = ?'); values.push(fields.next_due_date) }
  if (fields.active !== undefined) { sets.push('active = ?'); values.push(fields.active) }
  if (sets.length === 0) return undefined
  values.push(id, userId)
  db.prepare(`UPDATE recurring_invoices SET ${sets.join(', ')} WHERE id = ? AND user_id = ?`).run(...values)
  return db.prepare('SELECT * FROM recurring_invoices WHERE id = ?').get(id) as RecurringInvoiceRow | undefined
}

export function deleteRecurring(id: string, userId: string): boolean {
  const result = db.prepare('DELETE FROM recurring_invoices WHERE id = ? AND user_id = ?').run(id, userId)
  return result.changes > 0
}

function advanceDate(dateStr: string, frequency: RecurringFrequency): string {
  const d = new Date(dateStr)
  if (frequency === 'weekly') {
    d.setDate(d.getDate() + 7)
  } else if (frequency === 'monthly') {
    d.setMonth(d.getMonth() + 1)
  } else {
    d.setMonth(d.getMonth() + 3)
  }
  return d.toISOString().slice(0, 10)
}

export function processRecurring(userId: string): void {
  const today = new Date().toISOString().slice(0, 10)
  const due = db.prepare(
    `SELECT * FROM recurring_invoices WHERE user_id = ? AND active = 1 AND next_due_date <= ?`
  ).all(userId, today) as RecurringInvoiceRow[]

  // Get max invoice number for user to auto-increment
  const invoiceRows = db.prepare('SELECT invoice_number FROM invoices WHERE user_id = ?').all(userId) as { invoice_number: string | null }[]
  let maxNum = 0
  for (const row of invoiceRows) {
    if (row.invoice_number) {
      const n = parseInt(row.invoice_number.replace(/\D/g, ''), 10)
      if (!isNaN(n) && n > maxNum) maxNum = n
    }
  }

  const processLoop = db.transaction(() => {
    for (const rec of due) {
      const template = db.prepare('SELECT * FROM invoices WHERE id = ? AND user_id = ?').get(rec.template_invoice_id, userId) as InvoiceRow | undefined
      if (!template) continue

      const parsed = JSON.parse(template.data) as InvoiceData
      maxNum++
      const newInvoiceNumber = String(maxNum).padStart(4, '0')
      parsed.invoiceNumber = newInvoiceNumber

      const newId = randomUUID()
      const total = extractTotal(parsed)
      db.prepare(
        `INSERT INTO invoices (id, user_id, invoice_number, client_name, total, status, data)
         VALUES (?, ?, ?, ?, ?, 'draft', ?)`
      ).run(newId, userId, newInvoiceNumber, parsed.clientName || null, total, JSON.stringify(parsed))

      // Advance next_due_date
      const newDate = advanceDate(rec.next_due_date, rec.frequency)
      db.prepare('UPDATE recurring_invoices SET next_due_date = ? WHERE id = ?').run(newDate, rec.id)
    }
  })

  processLoop()
}
