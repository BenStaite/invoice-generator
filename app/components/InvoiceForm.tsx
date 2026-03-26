'use client'

import { useEffect, useRef, useState } from 'react'
import { type InvoiceData, type LineItem, generateId, calculateTotals, CURRENCIES, getCurrencySymbol } from './InvoiceGenerator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PlusIcon, MinusCircledIcon, BookmarkIcon } from '@radix-ui/react-icons'

// ── localStorage helpers ─────────────────────────────────────────────────────

const LS_SENDER = 'ig:sender-details'
const LS_CLIENTS = 'ig:client-details'

interface SavedClient {
  name: string
  address: string
}

interface SenderDetails {
  senderName: string
  senderAddress: string
}

function lsGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function lsSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // fail silently (e.g. private browsing, storage full)
  }
}

// ── Component ────────────────────────────────────────────────────────────────

interface InvoiceFormProps {
  data: InvoiceData
  onChange: (data: InvoiceData) => void
}

const TEMPLATES = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimal' },
]

export default function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  const sym = getCurrencySymbol(data.currency)
  const senderRestored = useRef(false)

  // Saved clients list (drives datalist)
  const [savedClients, setSavedClients] = useState<SavedClient[]>([])

  // Restore saved clients list on mount
  useEffect(() => {
    const clients = lsGet<SavedClient[]>(LS_CLIENTS)
    if (clients) setSavedClients(clients)
  }, [])

  // Restore sender details once on mount
  useEffect(() => {
    if (senderRestored.current) return
    senderRestored.current = true
    const sender = lsGet<SenderDetails>(LS_SENDER)
    if (sender) {
      onChange({
        ...data,
        senderName: sender.senderName || data.senderName,
        senderAddress: sender.senderAddress || data.senderAddress,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function update(patch: Partial<InvoiceData>) {
    const next = { ...data, ...patch }
    onChange(next)

    // Auto-save sender details whenever they change
    if ('senderName' in patch || 'senderAddress' in patch) {
      lsSet(LS_SENDER, {
        senderName: next.senderName,
        senderAddress: next.senderAddress,
      })
    }
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

  function saveClient() {
    const name = data.clientName.trim()
    const address = data.clientAddress.trim()
    if (!name) return

    const existing = lsGet<SavedClient[]>(LS_CLIENTS) ?? []
    // Update if already saved, otherwise prepend
    const filtered = existing.filter((c) => c.name !== name)
    const updated = [{ name, address }, ...filtered]
    lsSet(LS_CLIENTS, updated)
    setSavedClients(updated)
  }

  function onClientNameChange(value: string) {
    update({ clientName: value })
    // Auto-fill address if this matches a saved client exactly
    const match = savedClients.find((c) => c.name === value)
    if (match) {
      onChange({ ...data, clientName: value, clientAddress: match.address })
    }
  }

  const { subtotal, total } = calculateTotals(data)

  const datalistId = 'ig-saved-clients'

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Invoice Generator</h1>

      {/* Template & Currency */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Template</Label>
          <Select
            value={data.template}
            onValueChange={(val) => update({ template: val as InvoiceData['template'] })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TEMPLATES.map((t) => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Currency</Label>
          <Select
            value={data.currency}
            onValueChange={(val) => update({ currency: val })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CURRENCIES).map(([code, { label }]) => (
                <SelectItem key={code} value={code}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Sender & Client */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">From</legend>
          <div className="space-y-1.5">
            <Label>Name / Company</Label>
            <Input
              value={data.senderName}
              onChange={(e) => update({ senderName: e.target.value })}
              placeholder="Your name or company"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Address</Label>
            <Textarea
              rows={3}
              value={data.senderAddress}
              onChange={(e) => update({ senderAddress: e.target.value })}
              placeholder="Street, City, State, ZIP"
            />
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <legend className="text-sm font-semibold text-gray-800 dark:text-gray-200">Bill To</legend>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={saveClient}
              className="h-7 px-2 text-xs gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              title="Save this client for future invoices"
            >
              <BookmarkIcon className="w-3.5 h-3.5" />
              Save client
            </Button>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="client-name-input">Client Name</Label>
            {/* datalist for browser-native autocomplete */}
            <datalist id={datalistId}>
              {savedClients.map((c) => (
                <option key={c.name} value={c.name} />
              ))}
            </datalist>
            <Input
              id="client-name-input"
              list={datalistId}
              value={data.clientName}
              onChange={(e) => onClientNameChange(e.target.value)}
              placeholder="Client name"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Client Address</Label>
            <Textarea
              rows={3}
              value={data.clientAddress}
              onChange={(e) => update({ clientAddress: e.target.value })}
              placeholder="Street, City, State, ZIP"
            />
          </div>
        </fieldset>
      </div>

      {/* Invoice details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label>Invoice Number</Label>
          <Input
            value={data.invoiceNumber}
            onChange={(e) => update({ invoiceNumber: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Invoice Date</Label>
          <Input
            type="date"
            value={data.invoiceDate}
            onChange={(e) => update({ invoiceDate: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Due Date</Label>
          <Input
            type="date"
            value={data.dueDate}
            onChange={(e) => update({ dueDate: e.target.value })}
          />
        </div>
      </div>

      {/* Line items */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-gray-800 dark:text-gray-200">Line Items</legend>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 dark:text-gray-400 border-b dark:border-gray-700">
                <th className="pb-2 pr-2 font-medium">Description</th>
                <th className="pb-2 pr-2 font-medium w-20">Qty</th>
                <th className="pb-2 pr-2 font-medium w-28">Unit Price ({sym})</th>
                <th className="pb-2 pr-2 font-medium w-24 text-right">Subtotal</th>
                <th className="pb-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {data.lineItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 pr-2">
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        updateLineItem(item.id, { description: e.target.value })
                      }
                      placeholder="Item description"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <Input
                      className="text-right"
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
                    <Input
                      className="text-right"
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
                  <td className="py-2 pr-2 text-right font-mono text-gray-700 dark:text-gray-300">
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
                      <MinusCircledIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addLineItem}
          className="gap-1.5"
        >
          <PlusIcon className="w-4 h-4" />
          Add Line Item
        </Button>
      </fieldset>

      {/* Tax, Discount, Totals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Tax Rate (%)</Label>
          <Input
            type="number"
            min={0}
            step={0.01}
            value={data.taxRate}
            onChange={(e) => update({ taxRate: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Discount</Label>
          <div className="flex gap-2">
            <Input
              className="flex-1"
              type="number"
              min={0}
              step={0.01}
              value={data.discountValue}
              onChange={(e) =>
                update({ discountValue: parseFloat(e.target.value) || 0 })
              }
            />
            <Select
              value={data.discountType}
              onValueChange={(val) =>
                update({ discountType: val as 'flat' | 'percentage' })
              }
            >
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">{sym} (flat)</SelectItem>
                <SelectItem value="percentage">%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-right space-y-1 border-t dark:border-gray-700 pt-3 text-gray-700 dark:text-gray-300">
        <p>Subtotal: <span className="font-mono">{sym}{subtotal.toFixed(2)}</span></p>
        <p className="font-semibold text-base text-gray-900 dark:text-gray-100">
          Total: <span className="font-mono">{sym}{total.toFixed(2)}</span>
        </p>
      </div>

      {/* Payment terms & Notes */}
      <div className="space-y-1.5">
        <Label>Payment Terms</Label>
        <Input
          value={data.paymentTerms}
          onChange={(e) => update({ paymentTerms: e.target.value })}
          placeholder="e.g. Net 30"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Notes / Memo</Label>
        <Textarea
          rows={3}
          value={data.notes}
          onChange={(e) => update({ notes: e.target.value })}
          placeholder="Additional notes..."
        />
      </div>
    </div>
  )
}
