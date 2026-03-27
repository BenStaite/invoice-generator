import { getInvoiceByShareToken } from '@/lib/invoices-db'
import type { InvoiceData } from '@/app/components/InvoiceGenerator'
import InvoicePreview from '@/app/components/InvoicePreview'
import PrintButton from './PrintButton'

export default async function SharePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const invoice = getInvoiceByShareToken(token)

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Invoice Not Found</h1>
          <p className="text-gray-500">This link may be invalid or the invoice has been deleted.</p>
        </div>
      </div>
    )
  }

  let invoiceData: InvoiceData
  try {
    const parsed = JSON.parse(invoice.data)
    // Strip internal notes for the shared view
    const { notes: _notes, ...rest } = parsed
    invoiceData = { ...rest, notes: '' }
  } catch {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Invoice</h1>
          <p className="text-gray-500">There was a problem loading this invoice.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Header bar */}
      <div className="max-w-[700px] mx-auto mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-700">Invoice</h1>
          {invoice.invoice_number && (
            <p className="text-sm text-gray-500">#{invoice.invoice_number}</p>
          )}
        </div>
        <PrintButton />
      </div>

      {/* Invoice preview */}
      <div className="print:bg-white print:shadow-none">
        <InvoicePreview data={invoiceData} />
      </div>

      <div className="max-w-[700px] mx-auto mt-6 text-center text-xs text-gray-400 print:hidden">
        This invoice was shared with you via a secure link.
      </div>
    </div>
  )
}
