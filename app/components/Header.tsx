'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-gray-100">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="28" height="28" rx="6" fill="#2563eb"/>
            <path d="M7 8h14M7 12h10M7 16h12M7 20h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-blue-600">Swiftbill</span>
        </Link>
        <nav className="flex items-center gap-3">
          {status === 'loading' ? null : session ? (
            <>
              <Link href="/clients" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hidden sm:inline">
                Clients
              </Link>
              <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
                Signed in as {session.user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/auth/signup">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
