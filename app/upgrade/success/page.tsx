import Link from 'next/link'

export default function UpgradeSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-3">
          You&apos;re now a Pro member!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Thank you for subscribing to Billdrop Pro. All features are now unlocked.
        </p>
        <Link
          href="/invoices"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 transition-colors shadow"
        >
          Go to Invoices →
        </Link>
      </div>
    </main>
  )
}
