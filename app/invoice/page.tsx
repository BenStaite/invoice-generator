import type { Metadata } from 'next'
import InvoiceGenerator from '../components/InvoiceGenerator'

export const metadata: Metadata = {
  title: 'Create Invoice - Free Invoice Generator',
  description: 'Fill in your details, add line items, and download a professional PDF invoice instantly. Free, no signup required.',
  alternates: { canonical: '/invoice' },
}

export default function InvoicePage() {
  return <InvoiceGenerator />
}
