'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this invoice?')) return
    setLoading(true)
    try {
      await fetch(`/api/invoices/${id}`, { method: 'DELETE' })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDelete} disabled={loading}
      className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-950">
      {loading ? 'Deleting…' : 'Delete'}
    </Button>
  )
}
