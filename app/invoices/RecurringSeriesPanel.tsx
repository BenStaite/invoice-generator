'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { RecurringInvoiceRow } from '@/lib/invoices-db'

const FREQ_LABELS: Record<string, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
}

interface Props {
  series: RecurringInvoiceRow[]
  templateNumbers: Record<string, string | null>
}

export default function RecurringSeriesPanel({ series: initialSeries, templateNumbers }: Props) {
  const router = useRouter()
  const [series, setSeries] = useState(initialSeries)
  const [loading, setLoading] = useState<string | null>(null)

  async function toggleActive(rec: RecurringInvoiceRow) {
    setLoading(rec.id)
    try {
      const res = await fetch(`/api/recurring-invoices/${rec.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: rec.active ? 0 : 1 }),
      })
      if (res.ok) {
        const updated = await res.json()
        setSeries(prev => prev.map(r => r.id === rec.id ? updated : r))
      }
    } finally {
      setLoading(null)
    }
  }

  async function deleteSeries(id: string) {
    if (!confirm('Delete this recurring series? Generated invoices will be kept.')) return
    setLoading(id)
    try {
      const res = await fetch(`/api/recurring-invoices/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setSeries(prev => prev.filter(r => r.id !== id))
        router.refresh()
      }
    } finally {
      setLoading(null)
    }
  }

  if (series.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Recurring Series</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wide">
            <tr>
              <th className="text-left px-4 py-3">Template Invoice</th>
              <th className="text-left px-4 py-3">Frequency</th>
              <th className="text-left px-4 py-3">Next Due</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {series.map((rec) => (
              <tr key={rec.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                  {templateNumbers[rec.template_invoice_id] || rec.template_invoice_id.slice(0, 8)}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {FREQ_LABELS[rec.frequency] || rec.frequency}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {rec.next_due_date}
                </td>
                <td className="px-4 py-3">
                  {rec.active ? (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-100">Active</Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-100">Paused</Badge>
                  )}
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={loading === rec.id}
                    onClick={() => toggleActive(rec)}
                  >
                    {rec.active ? 'Pause' : 'Resume'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={loading === rec.id}
                    onClick={() => deleteSeries(rec.id)}
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                  >
                    Delete Series
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
