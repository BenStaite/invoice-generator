'use client'

import { useState } from 'react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/email-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else if (res.status === 409) {
        setStatus('duplicate')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section aria-labelledby="email-capture-heading" className="py-16 px-4 bg-blue-50 dark:bg-blue-950">
      <div className="max-w-xl mx-auto text-center">
        <h2 id="email-capture-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Stay in the loop
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Get notified about new features and updates from Billdrop.
        </p>

        {status === 'success' ? (
          <p role="status" className="text-green-700 dark:text-green-400 font-medium text-lg">
            🎉 You&apos;re on the list! We&apos;ll be in touch.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3 justify-center">
            <div className="flex flex-col flex-1 max-w-sm text-left">
              <label htmlFor="email-capture-input" className="sr-only">
                Email address
              </label>
              <input
                id="email-capture-input"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                aria-describedby={status === 'duplicate' || status === 'error' ? 'email-capture-error' : undefined}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              {(status === 'duplicate' || status === 'error') && (
                <p id="email-capture-error" role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {status === 'duplicate' ? 'That email is already registered.' : 'Something went wrong. Please try again.'}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || !email}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {status === 'loading' ? 'Subscribing…' : 'Notify Me'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
