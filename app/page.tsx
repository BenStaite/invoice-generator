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
  ClockIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Swiftbill – Free Invoice Generator for Freelancers & Small Businesses UK",
  description:
    "Create professional invoices in seconds with Swiftbill. Free invoice generator for UK freelancers and small businesses. No sign-up required for basic use.",
  openGraph: {
    title: "Swiftbill – Free Invoice Generator for Freelancers & Small Businesses UK",
    description:
      "Create professional invoices in seconds with Swiftbill. Free invoice generator for UK freelancers and small businesses. No sign-up required for basic use.",
    type: "website",
    url: "https://swiftbill.app",
    siteName: "Swiftbill",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiftbill – Free Invoice Generator for Freelancers & Small Businesses UK",
    description:
      "Create professional invoices in seconds with Swiftbill. Free invoice generator for UK freelancers and small businesses. No sign-up required for basic use.",
  },
};

const faqs = [
  {
    question: "Is Swiftbill free to use?",
    answer:
      "Yes — Swiftbill is completely free to use for generating and downloading professional PDF invoices. No account or credit card is required. Our free tier lets you create unlimited invoices and download them instantly as PDFs. For extra features like saving invoices, client management, and recurring billing, you can upgrade to Pro for just £4.99/month.",
  },
  {
    question: "How do I create a free invoice online?",
    answer:
      "Creating a free invoice with Swiftbill takes less than a minute. Just click 'Create Invoice — Free', fill in your business details, your client's information, and your line items. Swiftbill will automatically calculate totals and VAT. When you're done, click 'Download PDF' to save a professional invoice — no sign-up needed.",
  },
  {
    question: "Can I create professional invoices for free in the UK?",
    answer:
      "Absolutely. Swiftbill is designed specifically with UK freelancers and small businesses in mind. You can generate clean, professional invoices with GBP currency, VAT fields, and UK-standard formatting — all for free. Download your invoice as a PDF and email it directly to your client.",
  },
  {
    question: "What is the best free invoice generator for freelancers?",
    answer:
      "Swiftbill is one of the top-rated free invoice generators for UK freelancers. Unlike many tools that require a sign-up or hide key features behind a paywall, Swiftbill lets you create and download professional invoices instantly, for free. With a clean interface, automatic calculations, and instant PDF export, it's built for busy freelancers who need to invoice quickly and get paid faster.",
  },
  {
    question: "How do I send an invoice to a client online?",
    answer:
      "With Swiftbill, you can create your invoice and download it as a PDF in seconds. You can then email the PDF directly to your client as an attachment. Swiftbill Pro users can also send invoices directly by email from within the app, set up automatic payment reminders, and track when invoices are viewed.",
  },
];

export default function LandingPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Swiftbill",
    url: "https://swiftbill.app",
    description:
      "Free invoice generator for UK freelancers and small businesses. Create professional invoices in seconds — no sign-up required.",
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
      "VAT support",
      "Save invoices",
      "Manage clients",
      "Recurring invoices",
      "Email reminders",
      "Revenue dashboard",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <CheckIcon className="w-4 h-4" />
              Free invoice generator — no sign-up needed
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-5 leading-tight">
              The Free Invoice Generator for UK Freelancers &amp; Small Businesses
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
              Create professional invoices in seconds with Swiftbill — the best free invoice generator for UK freelancers. Download as PDF instantly, no account required. Upgrade to Pro for £4.99/month to unlock client management, recurring invoices, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="text-base px-8 py-6 rounded-xl shadow-md">
                <Link href="/invoice" className="inline-flex items-center gap-2">
                  Create Free Invoice Now
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl">
                <Link href="/blog/free-invoice-generator-uk">
                  Learn more
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-400">No credit card. No account. 100% free to start.</p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">
              Why UK Freelancers Choose Swiftbill
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
              A free invoice generator built for the way UK freelancers and small businesses actually work.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                    <DownloadIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Instant PDF Invoice</h3>
                  <p className="text-gray-500 text-sm">
                    Generate a polished, professional PDF invoice in one click — ready to send to clients in seconds.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                    <LockOpen1Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">No Sign-Up Required</h3>
                  <p className="text-gray-500 text-sm">
                    No account needed on the free tier. Fill in your details, add line items, and download your invoice — completely free.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                    <FileTextIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">UK-Ready Templates</h3>
                  <p className="text-gray-500 text-sm">
                    Professional invoice templates with GBP currency, VAT support, and UK-standard formatting. Perfect for sole traders and limited companies.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                    <ClockIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Get Paid Faster</h3>
                  <p className="text-gray-500 text-sm">
                    Clear payment terms, due dates, and bank details on every invoice — so clients know exactly when and how to pay you.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                    <PersonIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Built for Freelancers</h3>
                  <p className="text-gray-500 text-sm">
                    Whether you&apos;re a freelance designer, developer, consultant, or tradesperson — Swiftbill adapts to your invoicing needs.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                    <CheckIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Automatic Calculations</h3>
                  <p className="text-gray-500 text-sm">
                    Add line items and Swiftbill automatically calculates subtotals, VAT, and totals — no spreadsheet required.
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
                    {["Instant PDF download", "No signup required", "Professional UK templates", "GBP & VAT support"].map((feature) => (
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

        {/* FAQ */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-center mb-12">
              Everything you need to know about using Swiftbill as your free invoice generator.
            </p>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{faq.question}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Capture */}
        <EmailCapture />

        {/* CTA */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Ready to create your first free invoice?
            </h2>
            <p className="text-gray-500 mb-8">
              Join thousands of UK freelancers and small businesses using Swiftbill to invoice clients quickly and professionally.
            </p>
            <Button asChild size="lg" className="text-base px-8 py-6 rounded-xl shadow-md">
              <Link href="/invoice" className="inline-flex items-center gap-2">
                Create Free Invoice Now
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>

        <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-100 dark:border-gray-700">
          <p>Swiftbill — Free invoice generator for UK freelancers &amp; small businesses</p>
          <p className="mt-2">
            <Link href="/blog" className="hover:text-gray-600 underline">Blog</Link>
            {" · "}
            <Link href="/invoice" className="hover:text-gray-600 underline">Create Invoice</Link>
          </p>
        </footer>
      </main>
    </>
  );
}
