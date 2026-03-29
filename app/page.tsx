import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DownloadIcon,
  LockOpen1Icon,
  FileTextIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Swiftbill – Create Professional Invoices",
  description:
    "Create and send professional invoices with Swiftbill. Free PDF invoicing with Pro tier for £4.99/month.",
  openGraph: {
    title: "Swiftbill – Create Professional Invoices",
    description:
      "Create and send professional invoices with Swiftbill. Free PDF invoicing with Pro tier for £4.99/month.",
    type: "website",
    url: "https://swiftbill.app",
    siteName: "Swiftbill",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiftbill – Create Professional Invoices",
    description:
      "Create and send professional invoices with Swiftbill. Free PDF invoicing with Pro tier for £4.99/month.",
  },
};

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Swiftbill",
    url: "https://swiftbill.app",
    description:
      "Create and send professional invoices with Swiftbill. Free PDF invoicing with Pro tier for £4.99/month.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
        name: "Free",
      },
      {
        "@type": "Offer",
        price: "4.99",
        priceCurrency: "GBP",
        name: "Pro",
      },
    ],
    featureList: [
      "Instant PDF download",
      "No signup required",
      "Professional invoice templates",
      "Line item management",
      "Automatic totals",
      "Save invoices",
      "Manage clients",
      "Recurring invoices",
      "Email reminders",
      "Revenue dashboard",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <CheckIcon className="w-4 h-4" />
              Free PDF invoicing — no signup needed
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-5 leading-tight">
              Create invoices in seconds with Swiftbill
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
              Free PDF invoicing for everyone. Upgrade to Pro for £4.99/month and unlock client management, recurring invoices, and more.
            </p>
            <Button asChild size="lg" className="text-base px-8 py-6 rounded-xl shadow-md">
              <Link href="/invoice" className="inline-flex items-center gap-2">
                Create Invoice — Free
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
              Everything you need, nothing you don&apos;t
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                    <DownloadIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Instant PDF</h3>
                  <p className="text-gray-500 text-sm">
                    Generate a professional PDF invoice in one click.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                    <LockOpen1Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">No Signup</h3>
                  <p className="text-gray-500 text-sm">
                    No account needed for free tier. Just fill in your details and download.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                    <FileTextIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Professional</h3>
                  <p className="text-gray-500 text-sm">
                    Clean, professional templates trusted by freelancers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-500 text-center mb-12">
              Start free — upgrade when you need more.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Free */}
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardContent className="pt-8 pb-8 flex flex-col h-full">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">Free</h3>
                    <p className="text-gray-500 text-sm mb-4">No account needed</p>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">£0</span>
                      <span className="text-gray-500 mb-1">/ mo</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {["Instant PDF download", "No signup required", "Professional templates"].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="w-full rounded-xl">
                    <Link href="/invoice">Get Started Free</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Pro */}
              <Card className="border-2 border-blue-500 shadow-md">
                <CardContent className="pt-8 pb-8 flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Pro</h3>
                      <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Popular</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">For freelancers &amp; small businesses</p>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">£4.99</span>
                      <span className="text-gray-500 mb-1">/ month</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {["Everything in Free", "Save invoices", "Manage clients", "Recurring invoices", "Email reminders", "Revenue dashboard"].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full rounded-xl shadow-md">
                    <Link href="/auth/signup">Get Pro</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Ready to send your first invoice?
            </h2>
            <Button asChild size="lg" className="text-base px-8 py-6 rounded-xl shadow-md">
              <Link href="/invoice" className="inline-flex items-center gap-2">
                Get Started Free
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>

        <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-100 dark:border-gray-700">
          Swiftbill — Professional invoicing, free to start
        </footer>
      </main>
    </>
  );
}
