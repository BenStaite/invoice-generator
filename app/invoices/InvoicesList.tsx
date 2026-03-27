'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import DeleteButton from './DeleteButton'
import SetRecurringModal from './SetRecurringModal'
import type { InvoiceRow, PaymentStatus } from '@/lib/invoices-db'

type FilterType = 'all' | PaymentStatus

const STATUS_LABELS: Record<PaymentStatus, string> = {
  outstanding: 'Outstanding',
  paid: 'Paid',
  overdue: 'Overdue',
}

function PaymentBadge({ status }: { status: PaymentStatus }) {
  if (status === 'paid') {
    return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-100">Paid</Badge>
  }
  if (status === 'overdue') {
    return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-100">Overdue</Badge>
  }
  return <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100">Outstanding</Badge>
}

export default function InvoicesList({ invoices: initialInvoices, recurringTemplateIds = [] }: { invoices: InvoiceRow[]; recurringTemplateIds?: string[] }) {
  const router = useRouter()
  const [invoices, setInvoices] = useState(initialInvoices)
  const [filter, setFilter] = useState<FilterType>('all')
  const [updating, setUpdating] = useState<string | null>(null)

  const filtered = filter === 'all' ? invoices : invoices.filter(inv => inv.payment_status === filter)

  async function handleStatusChange(id: string, newStatus: PaymentStatus) {
    setUpdating(id)
    try {
      const res = await fetch(`/api/invoices/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_status: newStatus }),
      })
      if (res.ok) {
        const updated = await res.json()
        setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, payment_status: updated.payment_status } : inv))
      }
    } finally {
      setUpdating(null)
    }
  }

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'outstanding', label: 'Outstanding' },
    { key: 'paid', label: 'Paid' },
    { key: 'overdue', label: 'Overdue' },
  ]

  return (
    <>
      {/* Filter bar */}
      <div className="flex gap-2 mb-4">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === f.key
                ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {f.label}
            {f.key !== 'all' && (
              <span className="ml-1.5 text-xs opacity-60">
                {invoices.filter(inv => inv.payment_status === f.key).length}
              </span>
            )}
            {f.key === 'all' && (
              <span className="ml-1.5 text-xs opacity-60">{invoices.length}</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>No invoices match this filter.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Invoice #</th>
                <th className="text-left px-4 py-3">Client</th>
                <th className="text-left px-4 py-3">Total</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Payment Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                    <div className="flex items-center gap-2">
                      {inv.invoice_number || '—'}
                      {recurringTemplateIds.includes(inv.id) && (
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 hover:bg-purple-100 text-xs">🔁 Recurring</Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {inv.client_name || '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {inv.total != null ? `$${inv.total.toFixed(2)}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                    {inv.updated_at.slice(0, 10)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <PaymentBadge status={inv.payment_status} />
                      <select
                        value={inv.payment_status}
                        disabled={updating === inv.id}
                        onChange={(e) => handleStatusChange(inv.id, e.target.value as PaymentStatus)}
                        className="text-xs border border-gray-200 dark:border-gray-600 rounded px-1.5 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 cursor-pointer"
                      >
                        <option value="outstanding">Outstanding</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link href={`/invoice?savedId=${inv.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <DeleteButton id={inv.id} />
                      {!recurringTemplateIds.includes(inv.id) && (
                        <SetRecurringModal invoiceId={inv.id} invoiceNumber={inv.invoice_number} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
