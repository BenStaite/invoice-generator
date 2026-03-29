import type { Metadata } from 'next'
import { Suspense } from 'react'
import InvoiceGenerator from '../components/InvoiceGenerator'

export const metadata: Metadata = {
  title: 'Create Invoice - Invoxa',
  description: 'Fill in your details, add line items, and download a professional PDF invoice instantly. Free, no signup required.',
  alternates: { canonical: '/invoice' },
}

export default function InvoicePage() {
  return (
    <Suspense>
      <InvoiceGenerator />
    </Suspense>
  )
}
