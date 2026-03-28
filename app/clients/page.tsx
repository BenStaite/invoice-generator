import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { listClients } from '@/lib/clients-db'
import { ClientsList } from './ClientsList'
import UpgradeBanner from '@/components/UpgradeBanner'

export const metadata = { title: 'Clients' }

export default async function ClientsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const clients = await listClients(session.user.id)

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <UpgradeBanner isPro={session.user.isPro ?? false} />
      <ClientsList initialClients={clients} />
    </main>
  )
}
