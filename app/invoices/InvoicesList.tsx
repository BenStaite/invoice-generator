'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DeleteButton from './DeleteButton'
import SetRecurringModal from './SetRecurringModal'
import EmailInvoiceModal from '@/app/components/EmailInvoiceModal'
import ReminderEmailModal from './ReminderEmailModal'
import type { InvoiceRow, PaymentStatus } from '@/lib/invoices-db'

// Inline SVG icons (Radix-style)
function TotalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 2.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H8.5v9h1a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1h1v-9H3.5a.5.5 0 0 1-.5-.5Z" fill="currentColor"/>
    </svg>
  )
}
function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.5 1C3.91 1 1 3.91 1 7.5S3.91 14 7.5 14 14 11.09 14 7.5 11.09 1 7.5 1Zm3.35 5.15a.5.5 0 0 0-.7-.7L6.5 9.79 4.85 8.15a.5.5 0 1 0-.7.7l2 2a.5.5 0 0 0 .7 0l4-4Z" fill="currentColor"/>
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.5 1C3.91 1 1 3.91 1 7.5S3.91 14 7.5 14 14 11.09 14 7.5 11.09 1 7.5 1ZM7 4.5a.5.5 0 0 1 1 0V8a.5.5 0 0 1-.146.354l-2 2a.5.5 0 0 1-.708-.708L7 7.293V4.5Z" fill="currentColor"/>
    </svg>
  )
}
function WarningIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.5 1.5a.5.5 0 0 1 .433.25l6 10.5A.5.5 0 0 1 13.5 13h-12a.5.5 0 0 1-.433-.75l6-10.5A.5.5 0 0 1 7.5 1.5ZM7 6v3.5a.5.5 0 0 0 1 0V6a.5.5 0 0 0-1 0Zm.5 5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" fill="currentColor"/>
    </svg>
  )
}

function fmt(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

function RevenueSummary({ invoices }: { invoices: InvoiceRow[] }) {
  const stats = useMemo(() => {
    let totalInvoiced = 0, totalPaid = 0, totalOutstanding = 0, totalOverdue = 0
    for (const inv of invoices) {
      const amt = inv.total ?? 0
      totalInvoiced += amt
      if (inv.payment_status === 'paid') totalPaid += amt
      else if (inv.payment_status === 'outstanding') totalOutstanding += amt
      else if (inv.payment_status === 'overdue') totalOverdue += amt
    }
    return { totalInvoiced, totalPaid, totalOutstanding, totalOverdue }
  }, [invoices])

  const cards = [
    {
      label: 'Total Invoiced',
      value: stats.totalInvoiced,
      icon: <TotalIcon />,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      ariaLabel: `Total invoiced: ${fmt(stats.totalInvoiced)}`,
    },
    {
      label: 'Total Paid',
      value: stats.totalPaid,
      icon: <CheckCircleIcon />,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/30',
      ariaLabel: `Total paid: ${fmt(stats.totalPaid)}`,
    },
    {
      label: 'Total Outstanding',
      value: stats.totalOutstanding,
      icon: <ClockIcon />,
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-900/30',
      ariaLabel: `Total outstanding: ${fmt(stats.totalOutstanding)}`,
    },
    {
      label: 'Total Overdue',
      value: stats.totalOverdue,
      icon: <WarningIcon />,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/30',
      ariaLabel: `Total overdue: ${fmt(stats.totalOverdue)}`,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" role="region" aria-label="Revenue summary">
      {cards.map(card => (
        <Card key={card.label} aria-label={card.ariaLabel} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-1 space-y-0">
            <CardTitle className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {card.label}
            </CardTitle>
            <span className={`${card.color} ${card.bg} p-1.5 rounded-md`}>
              {card.icon}
            </span>
          </CardHeader>
          <CardContent>
            <p className={`text-xl font-bold ${card.color}`} aria-hidden="true">
              {fmt(card.value)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

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
  const [sharing, setSharing] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [emailingInvoice, setEmailingInvoice] = useState<InvoiceRow | null>(null)
  const [reminderInvoice, setReminderInvoice] = useState<InvoiceRow | null>(null)
  const [smtpConfigured, setSmtpConfigured] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/smtp-status').then(r => r.json()).then(d => setSmtpConfigured(d.configured)).catch(() => setSmtpConfigured(false))
  }, [])

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

  async function handleShare(id: string) {
    setSharing(id)
    try {
      const res = await fetch(`/api/invoices/${id}/share`, { method: 'POST' })
      if (res.ok) {
        const { shareUrl } = await res.json()
        await navigator.clipboard.writeText(shareUrl)
        setCopied(id)
        setTimeout(() => setCopied(prev => prev === id ? null : prev), 2500)
      }
    } finally {
      setSharing(null)
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
      {/* Revenue Summary Cards */}
      <RevenueSummary invoices={invoices} />

      {/* Filter bar */}
      <div className="flex gap-2 mb-4">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === f.key
                ? 'bg-foreground text-background'
                : 'bg-background text-muted-foreground border border-border hover:bg-muted'
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
        <div className="bg-card rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground uppercase text-xs tracking-wide">
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
                        className="text-xs border border-border rounded px-1.5 py-1 bg-background text-foreground disabled:opacity-50 cursor-pointer"
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
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={sharing === inv.id}
                        onClick={() => handleShare(inv.id)}
                        className={copied === inv.id ? 'border-green-500 text-green-600' : ''}
                      >
                        {copied === inv.id ? '✓ Link Copied!' : sharing === inv.id ? 'Sharing…' : '🔗 Share'}
                      </Button>
                      <DeleteButton id={inv.id} />
                      {smtpConfigured && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEmailingInvoice(inv)}
                          title="Email invoice to client"
                        >
                          ✉ Email
                        </Button>
                      )}
                      {smtpConfigured === false && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          title="SMTP not configured"
                          className="opacity-50 cursor-not-allowed"
                        >
                          ✉ Email
                        </Button>
                      )}
                      {smtpConfigured && inv.payment_status === 'overdue' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setReminderInvoice(inv)}
                          title="Send payment reminder"
                          className="border-orange-300 text-orange-600 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400 dark:hover:bg-orange-950"
                        >
                          🔔 Remind
                        </Button>
                      )}
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
      {emailingInvoice && (
        <EmailInvoiceModal
          invoiceId={emailingInvoice.id}
          clientEmail={(() => { try { return JSON.parse(emailingInvoice.data).clientEmail || '' } catch { return '' } })()}
          clientName={emailingInvoice.client_name || ''}
          invoiceNumber={emailingInvoice.invoice_number || ''}
          isOpen={!!emailingInvoice}
          onClose={() => setEmailingInvoice(null)}
        />
      )}
      {reminderInvoice && (
        <ReminderEmailModal
          invoiceId={reminderInvoice.id}
          clientEmail={(() => { try { return JSON.parse(reminderInvoice.data).clientEmail || '' } catch { return '' } })()}
          clientName={reminderInvoice.client_name || ''}
          invoiceNumber={reminderInvoice.invoice_number || ''}
          invoiceTotal={reminderInvoice.total ?? undefined}
          dueDate={(() => { try { return JSON.parse(reminderInvoice.data).dueDate || '' } catch { return '' } })()}
          isOpen={!!reminderInvoice}
          onClose={() => setReminderInvoice(null)}
        />
      )}
    </>
  )
}
