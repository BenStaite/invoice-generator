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
  title: "Free Invoice Generator - Instant PDF, No Signup",
  description:
    "Create professional invoices in seconds. Fill in your details, add line items, and download a PDF instantly. Free, no signup required.",
  openGraph: {
    title: "Free Invoice Generator - Instant PDF, No Signup",
    description:
      "Create professional invoices in seconds. Fill in your details, add line items, and download a PDF instantly. Free, no signup required.",
    type: "website",
    url: "https://invoicegenerator.app",
    siteName: "Free Invoice Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator - Instant PDF, No Signup",
    description:
      "Create professional invoices in seconds. Free, no signup required.",
  },
};

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Invoice Generator",
    url: "https://invoicegenerator.app",
    description:
      "Create professional invoices in seconds. Fill in your details, add line items, and download a PDF instantly. Free, no signup required.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Instant PDF download",
      "No signup required",
      "Professional invoice templates",
      "Line item management",
      "Automatic totals",
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
              Free &amp; No Signup Required
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-5 leading-tight">
              Create Professional Invoices Instantly
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
              Fill in your details, add line items, and download a polished PDF
              invoice in seconds.
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
                    No account needed. Just fill in your details and download.
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
          Free Invoice Generator — No signup required
        </footer>
      </main>
    </>
  );
}
