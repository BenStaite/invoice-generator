'use client'

import InvoicePreview from '@/app/components/InvoicePreview'
import type { InvoiceData } from '@/app/components/InvoiceGenerator'

export default function SharedInvoiceView({ data }: { data: InvoiceData }) {
  return <InvoicePreview data={data} />
}
