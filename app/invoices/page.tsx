import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { listInvoices } from '@/lib/invoices-db'
import { Button } from '@/components/ui/button'
import DeleteButton from './DeleteButton'

export default async function InvoicesPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/invoices')
  }

  const invoices = listInvoices(session.user.id)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Saved Invoices</h1>
          <Link href="/invoice">
            <Button>+ New Invoice</Button>
          </Link>
        </div>

        {invoices.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-4">No saved invoices yet.</p>
            <Link href="/invoice">
              <Button variant="outline">Create your first invoice</Button>
            </Link>
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
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                      {inv.invoice_number || '—'}
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
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <Link href={`/invoice?savedId=${inv.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <DeleteButton id={inv.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
