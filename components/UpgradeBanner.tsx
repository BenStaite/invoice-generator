'use client'

import Link from 'next/link'

interface UpgradeBannerProps {
  isPro: boolean
}

export default function UpgradeBanner({ isPro }: UpgradeBannerProps) {
  if (isPro) return null

  return (
    <div className="mb-6 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 dark:border-indigo-800 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">Upgrade to Pro</h2>
            <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white">£4.99/month</span>
          </div>
          <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-3">Unlock the full suite of features:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-indigo-800 dark:text-indigo-200">
            {[
              'Save invoices',
              'Manage clients',
              'Set up recurring invoices',
              'Email reminders',
              'Revenue dashboard',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-shrink-0">
          <Link
            href="/upgrade"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 transition-colors shadow"
          >
            Upgrade to Pro →
          </Link>
        </div>
      </div>
    </div>
  )
}
