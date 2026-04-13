'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface Client {
  id: string
  name: string
  email: string
  address: string
  created_at: string
}

export function ClientsList({ initialClients }: { initialClients: Client[] }) {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ name: '', email: '', address: '' })
  const [newForm, setNewForm] = useState({ name: '', email: '', address: '' })
  const [showNew, setShowNew] = useState(false)
  const [error, setError] = useState('')

  async function handleDelete(id: string) {
    if (!confirm('Delete this client?')) return
    const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setClients(c => c.filter(x => x.id !== id))
    }
  }

  function startEdit(client: Client) {
    setEditingId(client.id)
    setEditForm({ name: client.name, email: client.email, address: client.address })
  }

  async function handleSaveEdit(id: string) {
    const res = await fetch(`/api/clients/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
    if (res.ok) {
      const updated: Client = await res.json()
      setClients(c => c.map(x => x.id === id ? updated : x))
      setEditingId(null)
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!newForm.name.trim()) { setError('Name is required'); return }
    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newForm),
    })
    if (res.ok) {
      const created: Client = await res.json()
      setClients(c => [...c, created].sort((a, b) => a.name.localeCompare(b.name)))
      setNewForm({ name: '', email: '', address: '' })
      setShowNew(false)
    } else {
      const j = await res.json()
      setError(j.error || 'Failed to create')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Clients</h1>
        <Button size="sm" onClick={() => setShowNew(v => !v)}>
          {showNew ? 'Cancel' : '+ New Client'}
        </Button>
      </div>

      {showNew && (
        <form onSubmit={handleCreate} className="border border-border rounded-lg p-4 space-y-3 bg-muted">
          <h2 className="font-semibold text-sm text-gray-700 dark:text-gray-300">New Client</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="new-name">Name *</Label>
              <Input id="new-name" value={newForm.name} onChange={e => setNewForm(f => ({ ...f, name: e.target.value }))} placeholder="Client name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new-email">Email</Label>
              <Input id="new-email" type="email" value={newForm.email} onChange={e => setNewForm(f => ({ ...f, email: e.target.value }))} placeholder="client@example.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new-address">Address</Label>
              <Input id="new-address" value={newForm.address} onChange={e => setNewForm(f => ({ ...f, address: e.target.value }))} placeholder="Street, City, State" />
            </div>
          </div>
          <Button type="submit" size="sm">Save Client</Button>
        </form>
      )}

      {clients.length === 0 ? (
        <p className="text-gray-500 text-sm">No clients yet. Create one above.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600 dark:text-gray-400">
                <th className="pb-2 pr-4 font-medium">Name</th>
                <th className="pb-2 pr-4 font-medium">Email</th>
                <th className="pb-2 pr-4 font-medium">Address</th>
                <th className="pb-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id} className="border-b border-gray-100 dark:border-gray-700">
                  {editingId === client.id ? (
                    <>
                      <td className="py-2 pr-2"><Input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} /></td>
                      <td className="py-2 pr-2"><Input value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} /></td>
                      <td className="py-2 pr-2"><Input value={editForm.address} onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))} /></td>
                      <td className="py-2 text-right space-x-2">
                        <Button size="sm" onClick={() => handleSaveEdit(client.id)}>Save</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 pr-4 font-medium">{client.name}</td>
                      <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">{client.email || '—'}</td>
                      <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">{client.address || '—'}</td>
                      <td className="py-2 text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => startEdit(client)}>Edit</Button>
                        <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(client.id)}>Delete</Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
