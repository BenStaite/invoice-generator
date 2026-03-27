import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { listInvoices } from '@/lib/invoices-db'
import { Button } from '@/components/ui/button'
import InvoicesList from './InvoicesList'

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
          <InvoicesList invoices={invoices} />
        )}
      </div>
    </div>
  )
}
