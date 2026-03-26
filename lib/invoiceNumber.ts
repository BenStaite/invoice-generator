const LAST_INVOICE_KEY = 'ig:last-invoice-number'

/**
 * Returns the last used invoice number from localStorage, or null if none stored.
 */
export function getLastInvoiceNumber(): string | null {
  try {
    return localStorage.getItem(LAST_INVOICE_KEY)
  } catch {
    return null
  }
}

/**
 * Saves the given invoice number as the last used value.
 */
export function setLastInvoiceNumber(invoiceNumber: string): void {
  try {
    localStorage.setItem(LAST_INVOICE_KEY, invoiceNumber)
  } catch {
    // Silent fail (private browsing, storage quota)
  }
}

/**
 * Given the last used invoice number, returns the next one.
 *
 * Rules:
 * - If the string ends in digits, increment those digits (zero-padded to min 3 chars).
 *   e.g. "INV-001" → "INV-002", "2024-009" → "2024-010", "INV-099" → "INV-100"
 * - If it does NOT end in digits, fall back to "INV-001".
 */
export function nextInvoiceNumber(last: string): string {
  const match = last.match(/^(.*?)(\d+)$/)
  if (!match) return 'INV-001'

  const prefix = match[1]
  const numStr = match[2]
  const nextNum = parseInt(numStr, 10) + 1
  const padLength = Math.max(3, numStr.length)
  const padded = String(nextNum).padStart(padLength, '0')

  return prefix + padded
}

/**
 * Returns the default invoice number for a new invoice:
 * - If a last-used number is stored, returns next sequential number.
 * - Otherwise returns "INV-001".
 */
export function getDefaultInvoiceNumber(): string {
  const last = getLastInvoiceNumber()
  if (!last) return 'INV-001'
  return nextInvoiceNumber(last)
}
