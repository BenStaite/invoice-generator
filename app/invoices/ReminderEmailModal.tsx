'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ReminderEmailModalProps {
  invoiceId: string
  clientEmail?: string
  clientName?: string
  invoiceNumber?: string
  invoiceTotal?: number
  dueDate?: string
  isOpen: boolean
  onClose: () => void
}

export default function ReminderEmailModal({
  invoiceId,
  clientEmail = '',
  clientName = '',
  invoiceNumber = '',
  invoiceTotal,
  dueDate = '',
  isOpen,
  onClose,
}: ReminderEmailModalProps) {
  const totalStr = invoiceTotal != null ? `$${invoiceTotal.toFixed(2)}` : ''
  const defaultBody = [
    `Dear ${clientName || 'Client'},`,
    '',
    `This is a friendly reminder that Invoice #${invoiceNumber}${totalStr ? ` for ${totalStr}` : ''} is overdue${dueDate ? ` (due date: ${dueDate})` : ''}.`,
    '',
    'Please arrange payment at your earliest convenience. If you have already made payment, please disregard this message.',
    '',
    'Thank you for your business.',
  ].join('\n')

  const [to, setTo] = useState(clientEmail)
  const [subject, setSubject] = useState(`Payment Reminder: Invoice #${invoiceNumber}`)
  const [message, setMessage] = useState(defaultBody)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (isOpen) {
      setTo(clientEmail)
      setSubject(`Payment Reminder: Invoice #${invoiceNumber}`)
      setMessage(defaultBody)
      setStatus('idle')
      setErrorMsg('')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, clientEmail, invoiceNumber, clientName, invoiceTotal, dueDate])

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(`/api/invoices/${invoiceId}/reminder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, message }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Failed to send reminder')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Send Payment Reminder</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="text-green-500 text-4xl mb-3">✓</div>
            <p className="text-green-700 dark:text-green-400 font-medium text-lg">Reminder sent!</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Payment reminder sent to {to}
            </p>
            <Button className="mt-4" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="reminder-to">To</Label>
              <Input
                id="reminder-to"
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="client@example.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="reminder-subject">Subject</Label>
              <Input
                id="reminder-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="reminder-message">Message</Label>
              <Textarea
                id="reminder-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="mt-1"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-600 dark:text-red-400 text-sm">{errorMsg}</p>
            )}

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={onClose} disabled={status === 'loading'}>
                Cancel
              </Button>
              <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : '🔔 Send Reminder'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
