import { type InvoiceData, calculateTotals, getCurrencySymbol } from './InvoiceGenerator'

interface InvoicePreviewProps {
  data: InvoiceData
}

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  const [year, month, day] = dateStr.split('-')
  return `${month}/${day}/${year}`
}

function formatCurrency(amount: number, symbol: string) {
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function MultilineText({ text }: { text: string }) {
  if (!text) return <span className="text-gray-500 italic">—</span>
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

// ─── Classic Template ────────────────────────────────────────────────────────
function ClassicTemplate({ data }: InvoicePreviewProps) {
  const { subtotal, discount, tax, total } = calculateTotals(data)
  const hasDiscount = data.discountValue > 0
  const sym = getCurrencySymbol(data.currency)

  return (
    <div className="bg-white shadow-lg rounded-sm p-8 sm:p-10 max-w-[640px] mx-auto text-gray-900 text-sm leading-relaxed font-[system-ui]">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          {data.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logo} alt="Logo" className="max-h-14 max-w-[160px] object-contain mb-2" />
          )}
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {data.senderName || <span className="text-gray-500">Your Name</span>}
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
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
            Bill To
          </p>
          <p className="font-semibold">
            {data.clientName || <span className="text-gray-500">Client Name</span>}
          </p>
          <p className="text-gray-500 text-xs whitespace-pre-line mt-0.5">
            <MultilineText text={data.clientAddress} />
          </p>
        </div>
        <div className="text-right text-xs space-y-1">
          <p>
            <span className="text-gray-600 font-semibold uppercase tracking-wider">
              Invoice #
            </span>
            <br />
            <span className="font-medium">{data.invoiceNumber || '—'}</span>
          </p>
          <p>
            <span className="text-gray-600 font-semibold uppercase tracking-wider">
              Date
            </span>
            <br />
            <span className="font-medium">{formatDate(data.invoiceDate)}</span>
          </p>
          <p>
            <span className="text-gray-600 font-semibold uppercase tracking-wider">
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
                  <span className="text-gray-500 italic">No description</span>
                )}
              </td>
              <td className="py-2.5 text-right font-mono text-xs">{item.quantity}</td>
              <td className="py-2.5 text-right font-mono text-xs">
                {formatCurrency(item.unitPrice, sym)}
              </td>
              <td className="py-2.5 text-right font-mono text-xs">
                {formatCurrency(item.quantity * item.unitPrice, sym)}
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
            <span className="font-mono">{formatCurrency(subtotal, sym)}</span>
          </div>
          {hasDiscount && (
            <div className="flex justify-between py-1 text-red-600">
              <span>
                Discount
                {data.discountType === 'percentage'
                  ? ` (${data.discountValue}%)`
                  : ''}
              </span>
              <span className="font-mono">-{formatCurrency(discount, sym)}</span>
            </div>
          )}
          {data.taxRate > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Tax ({data.taxRate}%)</span>
              <span className="font-mono">{formatCurrency(tax, sym)}</span>
            </div>
          )}
          <div className="flex justify-between py-2 border-t-2 border-gray-800 text-base font-bold">
            <span>Total</span>
            <span className="font-mono">{formatCurrency(total, sym)}</span>
          </div>
        </div>
      </div>

      {/* Payment terms & Notes */}
      {(data.paymentTerms || data.notes) && (
        <div className="mt-8 pt-6 border-t border-gray-200 space-y-3 text-xs text-gray-500">
          {data.paymentTerms && (
            <div>
              <p className="font-semibold text-gray-600 uppercase tracking-wider mb-0.5">
                Payment Terms
              </p>
              <p>{data.paymentTerms}</p>
            </div>
          )}
          {data.notes && (
            <div>
              <p className="font-semibold text-gray-600 uppercase tracking-wider mb-0.5">
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

// ─── Modern Template ─────────────────────────────────────────────────────────
function ModernTemplate({ data }: InvoicePreviewProps) {
  const { subtotal, discount, tax, total } = calculateTotals(data)
  const hasDiscount = data.discountValue > 0
  const sym = getCurrencySymbol(data.currency)
  const accent = '#2563eb' // blue-600

  return (
    <div className="bg-white shadow-lg rounded-sm max-w-[640px] mx-auto text-gray-900 text-sm leading-relaxed font-[system-ui] overflow-hidden">
      {/* Colored header bar */}
      <div style={{ backgroundColor: accent }} className="px-8 py-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            {data.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logo} alt="Logo" className="max-h-12 max-w-[140px] object-contain mb-2 brightness-0 invert" />
            )}
            <p className="text-2xl font-extrabold tracking-tight">
              {data.senderName || <span className="opacity-50">Your Name</span>}
            </p>
            <p className="text-xs opacity-75 mt-1 whitespace-pre-line">
              {data.senderAddress || ''}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black uppercase tracking-widest opacity-90">Invoice</p>
            <p className="text-xs opacity-70 mt-1">#{data.invoiceNumber || '—'}</p>
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex justify-between px-8 py-5 bg-blue-50">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">Bill To</p>
          <p className="font-semibold text-gray-800">
            {data.clientName || <span className="text-gray-500">Client Name</span>}
          </p>
          <p className="text-gray-500 text-xs mt-0.5 whitespace-pre-line">
            <MultilineText text={data.clientAddress} />
          </p>
        </div>
        <div className="text-right text-xs space-y-2">
          <div>
            <p className="text-blue-400 font-bold uppercase tracking-wider">Date</p>
            <p className="font-medium text-gray-700">{formatDate(data.invoiceDate)}</p>
          </div>
          <div>
            <p className="text-blue-400 font-bold uppercase tracking-wider">Due</p>
            <p className="font-medium text-gray-700">{formatDate(data.dueDate)}</p>
          </div>
        </div>
      </div>

      {/* Line items */}
      <div className="px-8 py-6">
        <table className="w-full mb-6">
          <thead>
            <tr style={{ borderBottom: `2px solid ${accent}` }} className="text-xs uppercase tracking-wider">
              <th className="text-left py-2 font-bold text-gray-600">Description</th>
              <th className="text-right py-2 font-bold text-gray-600 w-16">Qty</th>
              <th className="text-right py-2 font-bold text-gray-600 w-24">Unit Price</th>
              <th className="text-right py-2 font-bold text-gray-600 w-24">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item, i) => (
              <tr key={item.id} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2.5 px-1">
                  {item.description || <span className="text-gray-500 italic">No description</span>}
                </td>
                <td className="py-2.5 text-right font-mono text-xs px-1">{item.quantity}</td>
                <td className="py-2.5 text-right font-mono text-xs px-1">{formatCurrency(item.unitPrice, sym)}</td>
                <td className="py-2.5 text-right font-mono text-xs font-semibold px-1">{formatCurrency(item.quantity * item.unitPrice, sym)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-60 space-y-1 text-xs">
            <div className="flex justify-between py-1 text-gray-500">
              <span>Subtotal</span>
              <span className="font-mono">{formatCurrency(subtotal, sym)}</span>
            </div>
            {hasDiscount && (
              <div className="flex justify-between py-1 text-red-500">
                <span>Discount{data.discountType === 'percentage' ? ` (${data.discountValue}%)` : ''}</span>
                <span className="font-mono">-{formatCurrency(discount, sym)}</span>
              </div>
            )}
            {data.taxRate > 0 && (
              <div className="flex justify-between py-1 text-gray-500">
                <span>Tax ({data.taxRate}%)</span>
                <span className="font-mono">{formatCurrency(tax, sym)}</span>
              </div>
            )}
            <div
              style={{ backgroundColor: accent }}
              className="flex justify-between px-3 py-2 rounded text-white text-sm font-bold mt-2"
            >
              <span>Total</span>
              <span className="font-mono">{formatCurrency(total, sym)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        {(data.paymentTerms || data.notes) && (
          <div className="mt-6 pt-4 border-t border-gray-200 space-y-3 text-xs text-gray-500">
            {data.paymentTerms && (
              <p><span className="font-bold text-gray-600 uppercase tracking-wider">Terms: </span>{data.paymentTerms}</p>
            )}
            {data.notes && (
              <p className="whitespace-pre-line"><span className="font-bold text-gray-600 uppercase tracking-wider">Notes: </span>{data.notes}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Minimal Template ────────────────────────────────────────────────────────
function MinimalTemplate({ data }: InvoicePreviewProps) {
  const { subtotal, discount, tax, total } = calculateTotals(data)
  const hasDiscount = data.discountValue > 0
  const sym = getCurrencySymbol(data.currency)

  return (
    <div className="bg-white shadow-lg max-w-[640px] mx-auto text-gray-800 text-sm leading-relaxed" style={{ fontFamily: 'Georgia, serif', padding: '3rem' }}>
      {/* Top row */}
      <div className="flex justify-between items-start mb-12">
        <div>
          {data.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logo} alt="Logo" className="max-h-12 max-w-[140px] object-contain mb-2" />
          )}
          <p className="text-lg font-bold tracking-tight">
            {data.senderName || <span className="text-gray-500">Your Name</span>}
          </p>
        </div>
        <p className="text-4xl font-light tracking-[0.2em] uppercase text-gray-600">Invoice</p>
      </div>

      {/* Two column: bill-to + meta */}
      <div className="flex justify-between mb-10 text-xs">
        <div>
          <p className="font-semibold mb-1">{data.clientName || <span className="text-gray-500">Client Name</span>}</p>
          <p className="text-gray-500 whitespace-pre-line"><MultilineText text={data.clientAddress} /></p>
          {data.senderAddress && (
            <p className="text-gray-600 mt-2 whitespace-pre-line"><MultilineText text={data.senderAddress} /></p>
          )}
        </div>
        <div className="text-right space-y-1 text-gray-500">
          <p><span className="font-semibold">No.</span> {data.invoiceNumber || '—'}</p>
          <p><span className="font-semibold">Date</span> {formatDate(data.invoiceDate)}</p>
          <p><span className="font-semibold">Due</span> {formatDate(data.dueDate)}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mb-6" />

      {/* Line items */}
      <table className="w-full mb-8 text-xs">
        <thead>
          <tr className="text-gray-600 uppercase tracking-widest border-b border-gray-200">
            <th className="text-left pb-2 font-normal">Description</th>
            <th className="text-right pb-2 font-normal w-12">Qty</th>
            <th className="text-right pb-2 font-normal w-24">Rate</th>
            <th className="text-right pb-2 font-normal w-24">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.lineItems.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="py-2">
                {item.description || <span className="text-gray-500 italic">—</span>}
              </td>
              <td className="py-2 text-right text-gray-500">{item.quantity}</td>
              <td className="py-2 text-right text-gray-500 font-mono">{formatCurrency(item.unitPrice, sym)}</td>
              <td className="py-2 text-right font-mono">{formatCurrency(item.quantity * item.unitPrice, sym)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-48 text-xs space-y-1">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span className="font-mono">{formatCurrency(subtotal, sym)}</span>
          </div>
          {hasDiscount && (
            <div className="flex justify-between text-red-500">
              <span>Discount</span>
              <span className="font-mono">-{formatCurrency(discount, sym)}</span>
            </div>
          )}
          {data.taxRate > 0 && (
            <div className="flex justify-between text-gray-500">
              <span>Tax ({data.taxRate}%)</span>
              <span className="font-mono">{formatCurrency(tax, sym)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-400 pt-2 text-base font-bold text-gray-900">
            <span>Total</span>
            <span className="font-mono">{formatCurrency(total, sym)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {(data.paymentTerms || data.notes) && (
        <div className="border-t border-gray-200 pt-4 text-xs text-gray-600 space-y-1">
          {data.paymentTerms && <p>{data.paymentTerms}</p>}
          {data.notes && <p className="whitespace-pre-line">{data.notes}</p>}
        </div>
      )}
    </div>
  )
}

// ─── Router ──────────────────────────────────────────────────────────────────
export default function InvoicePreview({ data }: InvoicePreviewProps) {
  if (data.template === 'modern') return <ModernTemplate data={data} />
  if (data.template === 'minimal') return <MinimalTemplate data={data} />
  return <ClassicTemplate data={data} />
}