import Link from "next/link";
import type { Metadata } from "next";
import EmailCapture from "@/components/EmailCapture";
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
  title: "Billdrop – Free Invoice Generator UK | Create Professional Invoices",
  description:
    "The best free invoice generator for UK freelancers and small businesses. Create professional PDF invoices instantly — no signup needed. Pro plan from £4.99/month.",
  openGraph: {
    title: "Billdrop – Free Invoice Generator UK | Create Professional Invoices",
    description:
      "The best free invoice generator for UK freelancers and small businesses. Create professional PDF invoices instantly — no signup needed. Pro plan from £4.99/month.",
    type: "website",
    url: "https://billdrop.app",
    siteName: "Billdrop",
  },
  twitter: {
    card: "summary_large_image",
    title: "Billdrop – Free Invoice Generator UK | Create Professional Invoices",
    description:
      "The best free invoice generator for UK freelancers and small businesses. Create professional PDF invoices instantly — no signup needed. Pro plan from £4.99/month.",
  },
};

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Billdrop",
    url: "https://billdrop.app",
    description:
      "Create and send professional invoices with Billdrop. Free PDF invoicing with Pro tier for £4.99/month.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Billdrop really free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes — Billdrop is free to use with no signup required. You can create and download professional PDF invoices instantly. Our Pro plan (£4.99/month) unlocks client management, invoice history, recurring invoices, and email reminders."
              }
            },
            {
              "@type": "Question",
              "name": "Can I use Billdrop as a free invoice generator in the UK?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Billdrop is designed with UK freelancers and small businesses in mind. Invoices include GBP currency support, VAT fields, and a professional layout that meets UK invoicing standards."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need to create an account to make an invoice?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No account is needed for the free tier. Just open the invoice form, fill in your details, and download your PDF."
              }
            },
            {
              "@type": "Question",
              "name": "What information does a UK invoice need to include?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A valid UK invoice should include: your name or business name, your address, the client's name and address, a unique invoice number, the invoice date, a description of goods or services, the amount charged (and VAT if applicable), and payment terms."
              }
            },
            {
              "@type": "Question",
              "name": "How is Billdrop different from other invoice generators?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Billdrop is fast, clean, and built for freelancers who just want to send an invoice — not manage a full accounting system. It's free for basic use, works without an account, and generates professional PDFs instantly."
              }
            }
          ]
        }) }}
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
              Free Invoice Generator for UK Freelancers
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
              Create professional PDF invoices in seconds. No account needed — just fill in your details and download. Used by hundreds of UK freelancers and small businesses.
            </p>
            <Button asChild size="lg" className="text-base px-8 py-6 rounded-xl shadow-md">
              <Link href="/invoice" className="inline-flex items-center gap-2">
                Create Invoice — Free
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-gray-400">No credit card required</p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
              Built for UK freelancers and small businesses
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

        {/* Email Capture */}
        <EmailCapture />

        {/* FAQ */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Is Billdrop really free?",
                  a: "Yes — Billdrop is free to use with no signup required. You can create and download professional PDF invoices instantly. Our Pro plan (£4.99/month) unlocks client management, invoice history, recurring invoices, and email reminders."
                },
                {
                  q: "Can I use Billdrop as a free invoice generator in the UK?",
                  a: "Absolutely. Billdrop is designed with UK freelancers and small businesses in mind. Invoices include GBP currency support, VAT fields, and a professional layout that meets UK invoicing standards."
                },
                {
                  q: "Do I need to create an account to make an invoice?",
                  a: "No account is needed for the free tier. Just open the invoice form, fill in your details, and download your PDF. If you want to save invoices and manage clients, you can sign up for a free account or upgrade to Pro."
                },
                {
                  q: "What information does a UK invoice need to include?",
                  a: "A valid UK invoice should include: your name or business name, your address, the client's name and address, a unique invoice number, the invoice date, a description of goods or services, the amount charged (and VAT if applicable), and payment terms. Billdrop's template includes all of these fields."
                },
                {
                  q: "How is Billdrop different from other invoice generators?",
                  a: "Billdrop is fast, clean, and built for freelancers who just want to send an invoice — not manage a full accounting system. It's free for basic use, works without an account, and generates professional PDFs instantly. No bloated dashboards, no unnecessary features."
                },
                {
                  q: "Can I use Billdrop for VAT invoices?",
                  a: "Yes. Billdrop includes a VAT number field and line-item tax settings so you can create fully compliant VAT invoices for your UK clients."
                }
              ].map(({ q, a }, i) => (
                <details key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm cursor-pointer">
                  <summary className="font-semibold text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
                    {q}
                    <span className="text-gray-400 ml-4">+</span>
                  </summary>
                  <p className="mt-4 text-gray-500 text-sm leading-relaxed">{a}</p>
                </details>
              ))}
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
          Billdrop — Professional invoicing, free to start
        </footer>
      </main>
    </>
  );
}
