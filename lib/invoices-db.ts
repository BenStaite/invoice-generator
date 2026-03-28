import { db } from './db'
import { randomUUID } from 'crypto'
import type { InvoiceData } from '@/app/components/InvoiceGenerator'

export type PaymentStatus = 'outstanding' | 'paid' | 'overdue'

export interface InvoiceRow {
  id: string
  user_id: string
  invoice_number: string | null
  client_name: string | null
  total: number | null
  status: string
  payment_status: PaymentStatus
  share_token: string | null
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

export async function createInvoice(userId: string, invoiceData: InvoiceData): Promise<InvoiceRow> {
  const id = randomUUID()
  const total = extractTotal(invoiceData)
  await db.execute({
    sql: `INSERT INTO invoices (id, user_id, invoice_number, client_name, total, status, data)
          VALUES (?, ?, ?, ?, ?, 'draft', ?)`,
    args: [id, userId, invoiceData.invoiceNumber || null, invoiceData.clientName || null, total, JSON.stringify(invoiceData)],
  })
  const result = await db.execute({
    sql: 'SELECT * FROM invoices WHERE id = ?',
    args: [id],
  })
  return result.rows[0] as unknown as InvoiceRow
}

export async function listInvoices(userId: string): Promise<InvoiceRow[]> {
  const result = await db.execute({
    sql: 'SELECT * FROM invoices WHERE user_id = ? ORDER BY updated_at DESC',
    args: [userId],
  })
  return result.rows as unknown as InvoiceRow[]
}

export async function getInvoice(id: string, userId: string): Promise<InvoiceRow | undefined> {
  const result = await db.execute({
    sql: 'SELECT * FROM invoices WHERE id = ? AND user_id = ?',
    args: [id, userId],
  })
  return result.rows[0] as unknown as InvoiceRow | undefined
}

export async function updateInvoice(id: string, userId: string, invoiceData: InvoiceData): Promise<InvoiceRow | undefined> {
  const total = extractTotal(invoiceData)
  const result = await db.execute({
    sql: `UPDATE invoices SET invoice_number = ?, client_name = ?, total = ?, data = ?, updated_at = datetime('now')
          WHERE id = ? AND user_id = ?`,
    args: [invoiceData.invoiceNumber || null, invoiceData.clientName || null, total, JSON.stringify(invoiceData), id, userId],
  })
  if (result.rowsAffected === 0) return undefined
  const row = await db.execute({
    sql: 'SELECT * FROM invoices WHERE id = ?',
    args: [id],
  })
  return row.rows[0] as unknown as InvoiceRow
}

export async function updatePaymentStatus(id: string, userId: string, paymentStatus: PaymentStatus): Promise<InvoiceRow | undefined> {
  const result = await db.execute({
    sql: `UPDATE invoices SET payment_status = ?, updated_at = datetime('now') WHERE id = ? AND user_id = ?`,
    args: [paymentStatus, id, userId],
  })
  if (result.rowsAffected === 0) return undefined
  const row = await db.execute({
    sql: 'SELECT * FROM invoices WHERE id = ?',
    args: [id],
  })
  return row.rows[0] as unknown as InvoiceRow
}

export async function deleteInvoice(id: string, userId: string): Promise<boolean> {
  const result = await db.execute({
    sql: 'DELETE FROM invoices WHERE id = ? AND user_id = ?',
    args: [id, userId],
  })
  return result.rowsAffected > 0
}

export async function generateShareToken(invoiceId: string, userId: string): Promise<string | null> {
  const existing = await db.execute({
    sql: 'SELECT share_token FROM invoices WHERE id = ? AND user_id = ?',
    args: [invoiceId, userId],
  })
  if (!existing.rows[0]) return null
  const row = existing.rows[0] as unknown as { share_token: string | null }
  if (row.share_token) return row.share_token
  const token = randomUUID()
  await db.execute({
    sql: 'UPDATE invoices SET share_token = ? WHERE id = ? AND user_id = ?',
    args: [token, invoiceId, userId],
  })
  return token
}

export interface SharedInvoiceData {
  id: string
  invoice_number: string | null
  client_name: string | null
  total: number | null
  created_at: string
  updated_at: string
  data: string
}

export async function getInvoiceByShareToken(token: string): Promise<SharedInvoiceData | undefined> {
  const result = await db.execute({
    sql: 'SELECT id, invoice_number, client_name, total, created_at, updated_at, data FROM invoices WHERE share_token = ?',
    args: [token],
  })
  return result.rows[0] as unknown as SharedInvoiceData | undefined
}

// ── Recurring invoices ──────────────────────────────────────────────────────

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

export async function createRecurring(
  userId: string,
  templateInvoiceId: string,
  frequency: RecurringFrequency,
  nextDueDate: string
): Promise<RecurringInvoiceRow> {
  const id = randomUUID()
  await db.execute({
    sql: `INSERT INTO recurring_invoices (id, user_id, template_invoice_id, frequency, next_due_date, active)
          VALUES (?, ?, ?, ?, ?, 1)`,
    args: [id, userId, templateInvoiceId, frequency, nextDueDate],
  })
  const result = await db.execute({
    sql: 'SELECT * FROM recurring_invoices WHERE id = ?',
    args: [id],
  })
  return result.rows[0] as unknown as RecurringInvoiceRow
}

export async function getRecurringByUser(userId: string): Promise<RecurringInvoiceRow[]> {
  const result = await db.execute({
    sql: 'SELECT * FROM recurring_invoices WHERE user_id = ? ORDER BY created_at DESC',
    args: [userId],
  })
  return result.rows as unknown as RecurringInvoiceRow[]
}

export async function updateRecurring(
  id: string,
  userId: string,
  fields: Partial<Pick<RecurringInvoiceRow, 'frequency' | 'next_due_date' | 'active'>>
): Promise<RecurringInvoiceRow | undefined> {
  const sets: string[] = []
  const values: unknown[] = []
  if (fields.frequency !== undefined) { sets.push('frequency = ?'); values.push(fields.frequency) }
  if (fields.next_due_date !== undefined) { sets.push('next_due_date = ?'); values.push(fields.next_due_date) }
  if (fields.active !== undefined) { sets.push('active = ?'); values.push(fields.active) }
  if (sets.length === 0) return undefined
  values.push(id, userId)
  const result = await db.execute({
    sql: `UPDATE recurring_invoices SET ${sets.join(', ')} WHERE id = ? AND user_id = ?`,
    args: values as (string | number | null)[],
  })
  if (result.rowsAffected === 0) return undefined
  const row = await db.execute({
    sql: 'SELECT * FROM recurring_invoices WHERE id = ?',
    args: [id],
  })
  return row.rows[0] as unknown as RecurringInvoiceRow | undefined
}

export async function deleteRecurring(id: string, userId: string): Promise<boolean> {
  const result = await db.execute({
    sql: 'DELETE FROM recurring_invoices WHERE id = ? AND user_id = ?',
    args: [id, userId],
  })
  return result.rowsAffected > 0
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

export async function processRecurring(userId: string): Promise<void> {
  const today = new Date().toISOString().slice(0, 10)
  const dueResult = await db.execute({
    sql: `SELECT * FROM recurring_invoices WHERE user_id = ? AND active = 1 AND next_due_date <= ?`,
    args: [userId, today],
  })
  const due = dueResult.rows as unknown as RecurringInvoiceRow[]

  // Get max invoice number for user
  const invoiceRows = await db.execute({
    sql: 'SELECT invoice_number FROM invoices WHERE user_id = ?',
    args: [userId],
  })
  let maxNum = 0
  for (const row of invoiceRows.rows as unknown as { invoice_number: string | null }[]) {
    if (row.invoice_number) {
      const n = parseInt(row.invoice_number.replace(/\D/g, ''), 10)
      if (!isNaN(n) && n > maxNum) maxNum = n
    }
  }

  for (const rec of due) {
    const templateResult = await db.execute({
      sql: 'SELECT * FROM invoices WHERE id = ? AND user_id = ?',
      args: [rec.template_invoice_id, userId],
    })
    const template = templateResult.rows[0] as unknown as InvoiceRow | undefined
    if (!template) continue

    const parsed = JSON.parse(template.data) as InvoiceData
    maxNum++
    const newInvoiceNumber = String(maxNum).padStart(4, '0')
    parsed.invoiceNumber = newInvoiceNumber

    const newId = randomUUID()
    const total = extractTotal(parsed)

    await db.batch([
      {
        sql: `INSERT INTO invoices (id, user_id, invoice_number, client_name, total, status, data)
              VALUES (?, ?, ?, ?, ?, 'draft', ?)`,
        args: [newId, userId, newInvoiceNumber, parsed.clientName || null, total, JSON.stringify(parsed)],
      },
      {
        sql: 'UPDATE recurring_invoices SET next_due_date = ? WHERE id = ?',
        args: [advanceDate(rec.next_due_date, rec.frequency), rec.id],
      },
    ], 'write')
  }
}
