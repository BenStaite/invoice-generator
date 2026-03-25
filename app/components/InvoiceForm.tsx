import { type InvoiceData, type LineItem, generateId, calculateTotals, CURRENCIES, getCurrencySymbol } from './InvoiceGenerator'

interface InvoiceFormProps {
  data: InvoiceData
  onChange: (data: InvoiceData) => void
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none'
const textareaClass =
  'rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y'

const TEMPLATES = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimal' },
]

export default function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  const sym = getCurrencySymbol(data.currency)

  function update(patch: Partial<InvoiceData>) {
    onChange({ ...data, ...patch })
  }

  function updateLineItem(id: string, patch: Partial<LineItem>) {
    onChange({
      ...data,
      lineItems: data.lineItems.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    })
  }

  function addLineItem() {
    onChange({
      ...data,
      lineItems: [
        ...data.lineItems,
        { id: generateId(), description: '', quantity: 1, unitPrice: 0 },
      ],
    })
  }

  function removeLineItem(id: string) {
    if (data.lineItems.length <= 1) return
    onChange({
      ...data,
      lineItems: data.lineItems.filter((item) => item.id !== id),
    })
  }

  const { subtotal, total } = calculateTotals(data)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Invoice Generator</h1>

      {/* Template & Currency */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Template">
          <select
            className={inputClass}
            value={data.template}
            onChange={(e) => update({ template: e.target.value as InvoiceData['template'] })}
          >
            {TEMPLATES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Currency">
          <select
            className={inputClass}
            value={data.currency}
            onChange={(e) => update({ currency: e.target.value })}
          >
            {Object.entries(CURRENCIES).map(([code, { label }]) => (
              <option key={code} value={code}>{label}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Sender & Client */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-gray-800 mb-1">From</legend>
          <Field label="Name / Company">
            <input
              className={inputClass}
              value={data.senderName}
              onChange={(e) => update({ senderName: e.target.value })}
              placeholder="Your name or company"
            />
          </Field>
          <Field label="Address">
            <textarea
              className={textareaClass}
              rows={3}
              value={data.senderAddress}
              onChange={(e) => update({ senderAddress: e.target.value })}
              placeholder="Street, City, State, ZIP"
            />
          </Field>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-gray-800 mb-1">Bill To</legend>
          <Field label="Client Name">
            <input
              className={inputClass}
              value={data.clientName}
              onChange={(e) => update({ clientName: e.target.value })}
              placeholder="Client name"
            />
          </Field>
          <Field label="Client Address">
            <textarea
              className={textareaClass}
              rows={3}
              value={data.clientAddress}
              onChange={(e) => update({ clientAddress: e.target.value })}
              placeholder="Street, City, State, ZIP"
            />
          </Field>
        </fieldset>
      </div>

      {/* Invoice details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Invoice Number">
          <input
            className={inputClass}
            value={data.invoiceNumber}
            onChange={(e) => update({ invoiceNumber: e.target.value })}
          />
        </Field>
        <Field label="Invoice Date">
          <input
            className={inputClass}
            type="date"
            value={data.invoiceDate}
            onChange={(e) => update({ invoiceDate: e.target.value })}
          />
        </Field>
        <Field label="Due Date">
          <input
            className={inputClass}
            type="date"
            value={data.dueDate}
            onChange={(e) => update({ dueDate: e.target.value })}
          />
        </Field>
      </div>

      {/* Line items */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-gray-800">Line Items</legend>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="pb-2 pr-2 font-medium">Description</th>
                <th className="pb-2 pr-2 font-medium w-20">Qty</th>
                <th className="pb-2 pr-2 font-medium w-28">Unit Price ({sym})</th>
                <th className="pb-2 pr-2 font-medium w-24 text-right">Subtotal</th>
                <th className="pb-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {data.lineItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-2 pr-2">
                    <input
                      className={inputClass + ' w-full'}
                      value={item.description}
                      onChange={(e) =>
                        updateLineItem(item.id, { description: e.target.value })
                      }
                      placeholder="Item description"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      className={inputClass + ' w-full text-right'}
                      type="number"
                      min={0}
                      step={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateLineItem(item.id, {
                          quantity: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      className={inputClass + ' w-full text-right'}
                      type="number"
                      min={0}
                      step={0.01}
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateLineItem(item.id, {
                          unitPrice: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </td>
                  <td className="py-2 pr-2 text-right font-mono text-gray-700">
                    {sym}{(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => removeLineItem(item.id)}
                      disabled={data.lineItems.length <= 1}
                      className="text-red-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed p-1"
                      title="Remove row"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          onClick={addLineItem}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          + Add Line Item
        </button>
      </fieldset>

      {/* Tax, Discount, Totals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Tax Rate (%)">
          <input
            className={inputClass}
            type="number"
            min={0}
            step={0.01}
            value={data.taxRate}
            onChange={(e) => update({ taxRate: parseFloat(e.target.value) || 0 })}
          />
        </Field>
        <div className="space-y-2">
          <Field label="Discount">
            <div className="flex gap-2">
              <input
                className={inputClass + ' flex-1'}
                type="number"
                min={0}
                step={0.01}
                value={data.discountValue}
                onChange={(e) =>
                  update({ discountValue: parseFloat(e.target.value) || 0 })
                }
              />
              <select
                className={inputClass}
                value={data.discountType}
                onChange={(e) =>
                  update({ discountType: e.target.value as 'flat' | 'percentage' })
                }
              >
                <option value="flat">{sym} (flat)</option>
                <option value="percentage">%</option>
              </select>
            </div>
          </Field>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-right space-y-1 border-t pt-3 text-gray-700">
        <p>Subtotal: <span className="font-mono">{sym}{subtotal.toFixed(2)}</span></p>
        <p className="font-semibold text-base text-gray-900">
          Total: <span className="font-mono">{sym}{total.toFixed(2)}</span>
        </p>
      </div>

      {/* Payment terms & Notes */}
      <Field label="Payment Terms">
        <input
          className={inputClass}
          value={data.paymentTerms}
          onChange={(e) => update({ paymentTerms: e.target.value })}
          placeholder="e.g. Net 30"
        />
      </Field>
      <Field label="Notes / Memo">
        <textarea
          className={textareaClass}
          rows={3}
          value={data.notes}
          onChange={(e) => update({ notes: e.target.value })}
          placeholder="Additional notes..."
        />
      </Field>
    </div>
  )
}
