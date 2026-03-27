'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface EmailInvoiceModalProps {
  invoiceId: string
  clientEmail?: string
  clientName?: string
  invoiceNumber?: string
  senderName?: string
  isOpen: boolean
  onClose: () => void
  previewRef?: React.RefObject<HTMLDivElement | null>
}

export default function EmailInvoiceModal({
  invoiceId,
  clientEmail = '',
  clientName = '',
  invoiceNumber = '',
  senderName = '',
  isOpen,
  onClose,
  previewRef,
}: EmailInvoiceModalProps) {
  const [to, setTo] = useState(clientEmail)
  const [subject, setSubject] = useState(`Invoice #${invoiceNumber} from ${senderName || 'Us'}`)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (isOpen) {
      setTo(clientEmail)
      setSubject(`Invoice #${invoiceNumber} from ${senderName || 'Us'}`)
      setMessage('')
      setStatus('idle')
      setErrorMsg('')
    }
  }, [isOpen, clientEmail, invoiceNumber, senderName])

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    let pdfBase64: string | undefined

    try {
      if (previewRef?.current) {
        const html2canvas = (await import('html2canvas')).default
        const { jsPDF } = await import('jspdf')

        const canvas = await html2canvas(previewRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
        })

        const imgWidth = 210
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        const pdf = new jsPDF({
          orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
          unit: 'mm',
          format: imgHeight <= 297 ? 'a4' : [imgWidth, imgHeight],
        })

        const imgData = canvas.toDataURL('image/png')
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        pdfBase64 = pdf.output('datauristring').split(',')[1]
      }
    } catch {
      // PDF generation failed, proceed without attachment
    }

    try {
      const res = await fetch(`/api/invoices/${invoiceId}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, message, pdfBase64 }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Failed to send email')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card text-card-foreground rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Email Invoice</h2>
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
            <p className="text-green-700 dark:text-green-400 font-medium text-lg">Email sent!</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Invoice sent to {to}
            </p>
            <Button className="mt-4" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email-to">To</Label>
              <Input
                id="email-to"
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="client@example.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email-message">Message (optional)</Label>
              <Textarea
                id="email-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please find your invoice attached."
                rows={3}
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
                {status === 'loading' ? 'Sending…' : '✉ Send Email'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
