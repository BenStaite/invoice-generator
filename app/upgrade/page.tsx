'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const features = [
  'Support ongoing development',
  'Priority access to new features',
  'Help us keep Billdrop free for everyone',
]

export default function UpgradePage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubscribe() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        router.push(data.url)
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">Upgrade to Pro</h1>
        <p className="text-indigo-600 dark:text-indigo-300 text-lg font-semibold mb-6">£4.99 / month</p>
        <ul className="text-left mb-8 space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold px-6 py-3 transition-colors shadow text-lg"
        >
          {loading ? 'Redirecting…' : 'Subscribe Now'}
        </button>
      </div>
    </main>
  )
}
