import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Billdrop Pricing — Free & Pro Plans',
  description: 'Compare Billdrop Free and Pro plans. Start for free with PDF invoices and up to 3 clients, or upgrade to Pro for unlimited clients, recurring invoices, custom branding and more — just £4.99/month.',
}

const features = [
  { name: 'Create & download PDF invoices', free: true, pro: true },
  { name: 'Up to 3 clients', free: true, pro: true },
  { name: 'Unlimited clients', free: false, pro: true },
  { name: 'Invoice history', free: '10 most recent', pro: 'Unlimited' },
  { name: 'Recurring invoices', free: false, pro: true },
  { name: 'Custom branding / logo', free: false, pro: true },
  { name: 'Priority support', free: false, pro: true },
]

function Check() {
  return (
    <svg className="mx-auto h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function Cross() {
  return (
    <svg className="mx-auto h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check />
  if (value === false) return <Cross />
  return <span className="text-sm text-gray-300">{value}</span>
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0d1b2e] text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Start for free. Upgrade when you need more.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {/* Free */}
          <div className="rounded-2xl border border-gray-700 bg-[#1a2d45] p-8 flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Free</h2>
              <div className="text-4xl font-bold">£0<span className="text-lg font-normal text-gray-400">/month</span></div>
              <p className="text-sm text-gray-400 mt-2">Everything you need to get started.</p>
            </div>
            <Link
              href="/invoice"
              className="mt-auto block text-center rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors py-2.5 px-4 font-medium text-sm"
            >
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-blue-500 bg-[#1a2d45] p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">PRO</span>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Pro</h2>
              <div className="text-4xl font-bold">£4.99<span className="text-lg font-normal text-gray-400">/month</span></div>
              <p className="text-sm text-gray-400 mt-2">Unlimited power for growing businesses.</p>
            </div>
            <Link
              href="/upgrade"
              className="mt-auto block text-center rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-white py-2.5 px-4 font-medium text-sm"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>

        {/* Feature comparison table */}
        <div className="rounded-2xl border border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 bg-[#0d1b2e]">
                <th className="text-left py-4 px-6 font-semibold text-gray-300 w-1/2">Feature</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-300 w-1/4">Free</th>
                <th className="text-center py-4 px-4 font-semibold text-blue-400 w-1/4">Pro</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr
                  key={feature.name}
                  className={`border-b border-gray-700 last:border-b-0 ${i % 2 === 0 ? 'bg-[#1a2d45]' : 'bg-[#162540]'}`}
                >
                  <td className="py-4 px-6 text-gray-200">{feature.name}</td>
                  <td className="py-4 px-4 text-center">
                    <CellValue value={feature.free} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <CellValue value={feature.pro} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-gray-400 mb-4">Ready to unlock everything?</p>
          <Link
            href="/upgrade"
            className="inline-block rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-white py-3 px-8 font-semibold text-sm"
          >
            Upgrade to Pro — £4.99/month
          </Link>
        </div>
      </div>
    </main>
  )
}
