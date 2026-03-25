import { type InvoiceData, calculateTotals } from './InvoiceGenerator'

interface InvoicePreviewProps {
  data: InvoiceData
}

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  const [year, month, day] = dateStr.split('-')
  return `${month}/${day}/${year}`
}

function formatCurrency(amount: number) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })
}

function MultilineText({ text }: { text: string }) {
  if (!text) return <span className="text-gray-300 italic">—</span>
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      ))}
    </>
  )
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const { subtotal, discount, tax, total } = calculateTotals(data)
  const hasDiscount = data.discountValue > 0

  return (
    <div className="bg-white shadow-lg rounded-sm p-8 sm:p-10 max-w-[640px] mx-auto text-gray-900 text-sm leading-relaxed font-[system-ui]">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {data.senderName || <span className="text-gray-300">Your Name</span>}
          </h2>
          <p className="text-gray-500 mt-1 text-xs whitespace-pre-line">
            <MultilineText text={data.senderAddress} />
          </p>
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-extrabold text-gray-800 uppercase tracking-wider">
            Invoice
          </h1>
        </div>
      </div>

      {/* Invoice meta + Bill To */}
      <div className="flex justify-between mb-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Bill To
          </p>
          <p className="font-semibold">
            {data.clientName || <span className="text-gray-300">Client Name</span>}
          </p>
          <p className="text-gray-500 text-xs whitespace-pre-line mt-0.5">
            <MultilineText text={data.clientAddress} />
          </p>
        </div>
        <div className="text-right text-xs space-y-1">
          <p>
            <span className="text-gray-400 font-semibold uppercase tracking-wider">
              Invoice #
            </span>
            <br />
            <span className="font-medium">{data.invoiceNumber || '—'}</span>
          </p>
          <p>
            <span className="text-gray-400 font-semibold uppercase tracking-wider">
              Date
            </span>
            <br />
            <span className="font-medium">{formatDate(data.invoiceDate)}</span>
          </p>
          <p>
            <span className="text-gray-400 font-semibold uppercase tracking-wider">
              Due Date
            </span>
            <br />
            <span className="font-medium">{formatDate(data.dueDate)}</span>
          </p>
        </div>
      </div>

      {/* Line items table */}
      <table className="w-full mb-6">
        <thead>
          <tr className="border-b-2 border-gray-800 text-xs uppercase tracking-wider text-gray-500">
            <th className="text-left py-2 font-semibold">Description</th>
            <th className="text-right py-2 font-semibold w-16">Qty</th>
            <th className="text-right py-2 font-semibold w-24">Unit Price</th>
            <th className="text-right py-2 font-semibold w-24">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.lineItems.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="py-2.5">
                {item.description || (
                  <span className="text-gray-300 italic">No description</span>
                )}
              </td>
              <td className="py-2.5 text-right font-mono text-xs">{item.quantity}</td>
              <td className="py-2.5 text-right font-mono text-xs">
                {formatCurrency(item.unitPrice)}
              </td>
              <td className="py-2.5 text-right font-mono text-xs">
                {formatCurrency(item.quantity * item.unitPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-56 space-y-1 text-xs">
          <div className="flex justify-between py-1">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-mono">{formatCurrency(subtotal)}</span>
          </div>
          {hasDiscount && (
            <div className="flex justify-between py-1 text-red-600">
              <span>
                Discount
                {data.discountType === 'percentage'
                  ? ` (${data.discountValue}%)`
                  : ''}
              </span>
              <span className="font-mono">-{formatCurrency(discount)}</span>
            </div>
          )}
          {data.taxRate > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Tax ({data.taxRate}%)</span>
              <span className="font-mono">{formatCurrency(tax)}</span>
            </div>
          )}
          <div className="flex justify-between py-2 border-t-2 border-gray-800 text-base font-bold">
            <span>Total</span>
            <span className="font-mono">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Payment terms & Notes */}
      {(data.paymentTerms || data.notes) && (
        <div className="mt-8 pt-6 border-t border-gray-200 space-y-3 text-xs text-gray-500">
          {data.paymentTerms && (
            <div>
              <p className="font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                Payment Terms
              </p>
              <p>{data.paymentTerms}</p>
            </div>
          )}
          {data.notes && (
            <div>
              <p className="font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                Notes
              </p>
              <p className="whitespace-pre-line">{data.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
