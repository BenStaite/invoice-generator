'use client'

import { useState } from 'react'
import { InvoiceData } from './InvoiceGenerator'
import { Button } from '@/components/ui/button'
import { DownloadIcon, UpdateIcon } from '@radix-ui/react-icons'

interface DownloadPDFButtonProps {
  data: InvoiceData
  previewRef: React.RefObject<HTMLDivElement | null>
}

function sanitizeFilename(s: string): string {
  return s.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
}

export default function DownloadPDFButton({ data, previewRef }: DownloadPDFButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    if (!previewRef.current) return
    setLoading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
        unit: 'mm',
        format: imgHeight <= 297 ? 'a4' : [imgWidth, imgHeight],
      })

      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

      const invoiceNum = sanitizeFilename(data.invoiceNumber || 'invoice')
      const clientName = sanitizeFilename(data.clientName || 'client')
      pdf.save(`invoice-${invoiceNum}-${clientName}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
      alert('PDF generation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      className="w-full gap-2"
      size="lg"
    >
      {loading ? (
        <>
          <UpdateIcon className="w-4 h-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <DownloadIcon className="w-4 h-4" />
          Download PDF
        </>
      )}
    </Button>
  )
}
