'use client'

import { useState } from 'react'
import InvoiceForm from './InvoiceForm'
import InvoicePreview from './InvoicePreview'

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

export default function InvoiceGenerator() {
  const [data, setData] = useState<InvoiceData>(initialData)

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50">
        <InvoiceForm data={data} onChange={setData} />
      </div>
      <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-200">
        <div className="sticky top-0">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Live Preview
          </h2>
          <InvoicePreview data={data} />
        </div>
      </div>
    </div>
  )
}
