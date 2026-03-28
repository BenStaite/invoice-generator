import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { listInvoices, getRecurringByUser, processRecurring } from '@/lib/invoices-db'
import { Button } from '@/components/ui/button'
import InvoicesList from './InvoicesList'
import RecurringSeriesPanel from './RecurringSeriesPanel'
import UpgradeBanner from '@/components/UpgradeBanner'

export default async function InvoicesPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/invoices')
  }

  // Auto-generate recurring invoices that are due
  await processRecurring(session.user.id)

  const invoices = await listInvoices(session.user.id)
  const recurringSeries = await getRecurringByUser(session.user.id)

  // Build a map of template invoice id -> invoice_number for display
  const templateNumbers: Record<string, string | null> = {}
  for (const rec of recurringSeries) {
    const inv = invoices.find(i => i.id === rec.template_invoice_id)
    templateNumbers[rec.template_invoice_id] = inv?.invoice_number ?? null
  }

  const recurringTemplateIds = recurringSeries.map(r => r.template_invoice_id)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Saved Invoices</h1>
          <Link href="/invoice">
            <Button>+ New Invoice</Button>
          </Link>
        </div>

        <UpgradeBanner isPro={session.user.isPro ?? false} />

        {recurringSeries.length > 0 && (
          <RecurringSeriesPanel series={recurringSeries} templateNumbers={templateNumbers} />
        )}

        {invoices.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-4">No saved invoices yet.</p>
            <Link href="/invoice">
              <Button variant="outline">Create your first invoice</Button>
            </Link>
          </div>
        ) : (
          <InvoicesList invoices={invoices} recurringTemplateIds={recurringTemplateIds} />
        )}
      </div>
    </div>
  )
}
