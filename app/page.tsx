import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Invoice Generator - Instant PDF, No Signup",
  description: "Create professional invoices in seconds. Fill in your details, add line items, and download a PDF instantly. Free, no signup required.",
  openGraph: {
    title: "Free Invoice Generator - Instant PDF, No Signup",
    description: "Create professional invoices in seconds. Fill in your details, add line items, and download a PDF instantly. Free, no signup required.",
    type: "website",
    url: "https://invoicegenerator.app",
    siteName: "Free Invoice Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator - Instant PDF, No Signup",
    description: "Create professional invoices in seconds. Free, no signup required.",
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
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Free Invoice Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
              Create professional invoices in seconds. Download as PDF instantly.
              No signup, no fuss.
            </p>
            <Link
              href="/invoice"
              className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
            >
              Create Invoice — Free
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
              Everything you need, nothing you don&apos;t
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant PDF</h3>
                <p className="text-gray-500 text-sm">
                  Generate a professional PDF invoice in one click. No waiting, no email.
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-3">🔓</div>
                <h3 className="font-semibold text-gray-900 mb-2">No Signup</h3>
                <p className="text-gray-500 text-sm">
                  No account needed. Just fill in your details and download.
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-3">💼</div>
                <h3 className="font-semibold text-gray-900 mb-2">Professional</h3>
                <p className="text-gray-500 text-sm">
                  Clean, professional templates trusted by freelancers and small businesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to send your first invoice?
            </h2>
            <Link
              href="/invoice"
              className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
            >
              Get Started Free
            </Link>
          </div>
        </section>

        <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-100">
          Free Invoice Generator — No signup required
        </footer>
      </main>
    </>
  );
}
