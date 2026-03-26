'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import InvoiceForm from './InvoiceForm'
import InvoicePreview from './InvoicePreview'
import DownloadPDFButton from './DownloadPDFButton'
import { Button } from '@/components/ui/button'
import { getDefaultInvoiceNumber } from '@/lib/invoiceNumber'

const DRAFT_KEY = 'ig:draft'

function loadDraft(): InvoiceData | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    return JSON.parse(raw) as InvoiceData
  } catch {
    return null
  }
}

function saveDraft(data: InvoiceData) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data))
  } catch {
    // Silent fail (e.g. private browsing, storage quota)
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY)
  } catch {
    // Silent fail
  }
}

export interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

export interface InvoiceData {
  senderName: string
  senderAddress: string
  clientName: string
  clientAddress: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  lineItems: LineItem[]
  taxRate: number
  discountType: 'flat' | 'percentage'
  discountValue: number
  paymentTerms: string
  notes: string
  currency: string
  template: 'classic' | 'modern' | 'minimal'
  logo: string | null
}

export const CURRENCIES: Record<string, { symbol: string; label: string }> = {
  USD: { symbol: '$', label: 'USD – US Dollar' },
  EUR: { symbol: '€', label: 'EUR – Euro' },
  GBP: { symbol: '£', label: 'GBP – British Pound' },
  CAD: { symbol: 'CA$', label: 'CAD – Canadian Dollar' },
  AUD: { symbol: 'A$', label: 'AUD – Australian Dollar' },
}

export function getCurrencySymbol(currency: string): string {
  return CURRENCIES[currency]?.symbol ?? '$'
}

function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

const today = new Date().toISOString().split('T')[0]

const initialData: InvoiceData = {
  senderName: '',
  senderAddress: '',
  clientName: '',
  clientAddress: '',
  invoiceNumber: 'INV-001',
  invoiceDate: today,
  dueDate: '',
  lineItems: [{ id: generateId(), description: '', quantity: 1, unitPrice: 0 }],
  taxRate: 0,
  discountType: 'flat',
  discountValue: 0,
  paymentTerms: 'Net 30',
  notes: '',
  currency: 'USD',
  template: 'classic',
  logo: null,
}

export function calculateTotals(data: InvoiceData) {
  const subtotal = data.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  )
  const discount =
    data.discountType === 'percentage'
      ? subtotal * (data.discountValue / 100)
      : data.discountValue
  const afterDiscount = Math.max(0, subtotal - discount)
  const tax = afterDiscount * (data.taxRate / 100)
  const total = afterDiscount + tax
  return { subtotal, discount, afterDiscount, tax, total }
}

export { generateId }

export interface ValidationErrors {
  invoiceNumber?: string
  invoiceDate?: string
  senderName?: string
  clientName?: string
  lineItemsGeneral?: string
  lineItems?: Record<string, { description?: string; quantity?: string; unitPrice?: string }>
}

export default function InvoiceGenerator() {
  const [data, setData] = useState<InvoiceData>(() => loadDraft() ?? initialData)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const previewRef = useRef<HTMLDivElement>(null)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback((next: InvoiceData) => {
    setData(next)
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => saveDraft(next), 1000)
  }, [])

  const clearError = useCallback((field: string, lineItemId?: string) => {
    setErrors((prev) => {
      if (lineItemId) {
        const liErrors = prev.lineItems ? { ...prev.lineItems } : {}
        if (liErrors[lineItemId]) {
          liErrors[lineItemId] = { ...liErrors[lineItemId], [field]: undefined }
        }
        return { ...prev, lineItems: liErrors }
      }
      return { ...prev, [field]: undefined }
    })
  }, [])

  const validateForm = useCallback((currentData: InvoiceData): boolean => {
    const newErrors: ValidationErrors = {}

    if (!currentData.invoiceNumber.trim()) newErrors.invoiceNumber = 'Invoice number is required.'
    if (!currentData.invoiceDate.trim()) newErrors.invoiceDate = 'Issue date is required.'
    if (!currentData.senderName.trim()) newErrors.senderName = 'Your name or business name is required.'
    if (!currentData.clientName.trim()) newErrors.clientName = 'Client name is required.'

    if (currentData.lineItems.length === 0) {
      newErrors.lineItemsGeneral = 'At least one line item is required.'
    } else {
      const liErrors: ValidationErrors['lineItems'] = {}
      for (const item of currentData.lineItems) {
        const itemErr: { description?: string; quantity?: string; unitPrice?: string } = {}
        if (!item.description.trim()) itemErr.description = 'Description is required.'
        if (!item.quantity || item.quantity <= 0) itemErr.quantity = 'Must be > 0.'
        if (!item.unitPrice || item.unitPrice <= 0) itemErr.unitPrice = 'Must be > 0.'
        if (Object.keys(itemErr).length > 0) liErrors[item.id] = itemErr
      }
      if (Object.keys(liErrors).length > 0) newErrors.lineItems = liErrors
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 && !newErrors.lineItems
  }, [])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [])

  const handleNewInvoice = useCallback(() => {
    clearDraft()
    setErrors({})
    setData({
      ...initialData,
      invoiceDate: new Date().toISOString().split('T')[0],
      invoiceNumber: getDefaultInvoiceNumber(),
    })
  }, [])

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Invoice Details</h2>
          <Button variant="outline" size="sm" onClick={handleNewInvoice}>
            New Invoice
          </Button>
        </div>
        <InvoiceForm data={data} onChange={handleChange} errors={errors} clearError={clearError} />
        <div className="mt-6 flex gap-2">
          <DownloadPDFButton data={data} previewRef={previewRef} onValidate={() => validateForm(data)} />
          <Button variant="outline" onClick={() => window.print()}>
            Print
          </Button>
        </div>
      </div>
      <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-200 dark:bg-gray-800">
        <div className="sticky top-0">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Live Preview
          </p>
          <div ref={previewRef} id="invoice-preview" className="bg-white text-gray-900">
            <InvoicePreview data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
