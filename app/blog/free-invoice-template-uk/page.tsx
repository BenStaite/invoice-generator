import type { Metadata } from 'next'

const BASE_URL = 'https://invoice.hermes-cecil.uk'
const PAGE_URL = `${BASE_URL}/blog/free-invoice-template-uk`

export const metadata: Metadata = {
  title: 'Free Invoice Template UK – VAT & Contractor Invoices | Billdrop',
  description:
    'Download or create a free invoice template for UK businesses and contractors. Covers VAT invoice requirements, payment terms, and HMRC-compliant invoicing — no sign-up needed.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Free Invoice Template UK – VAT & Contractor Invoices | Billdrop',
    description:
      'Create a free UK-compliant invoice in minutes. Supports VAT invoices, contractor invoicing, and HMRC requirements.',
    url: PAGE_URL,
    siteName: 'Billdrop',
    type: 'article',
  },
}

const faqItems = [
  {
    question: 'What must a UK invoice legally include?',
    answer:
      'A UK invoice must include: your full legal name (or trading name) and address, the customer\'s name and address, a unique invoice number, the invoice date, a description of the goods or services supplied, the total amount due, and your payment terms. If you are VAT-registered you must also include your VAT registration number, the VAT rate applied, and the VAT amount charged.',
  },
  {
    question: 'Do I need to charge VAT on my invoices?',
    answer:
      'You only need to charge VAT if you are registered for VAT with HMRC. Registration is compulsory once your taxable turnover exceeds the current VAT threshold (£90,000 for 2024/25). Below that threshold, VAT registration is optional. If you are registered, you must issue a VAT invoice for every taxable supply to a VAT-registered customer.',
  },
  {
    question: 'What is the standard payment term in the UK?',
    answer:
      'There is no single legal standard, but 30 days is the most common payment term for UK businesses. Under the Late Payment of Commercial Debts (Interest) Act 1998, if no payment term is agreed the statutory default is 30 days for business-to-business transactions. Many freelancers and contractors use 14 or 30 days.',
  },
  {
    question: 'Can I use a free invoice template as a contractor?',
    answer:
      'Yes. As a sole trader, limited company director, or freelance contractor you can use any invoice template that captures the required information. Billdrop\'s free invoice template for UK contractors is ready to use immediately — no account required.',
  },
  {
    question: 'What is a VAT invoice and how is it different from a standard invoice?',
    answer:
      'A VAT invoice is a special type of invoice required when a VAT-registered business charges VAT on a supply. It must show the supplier\'s VAT number, the VAT rate for each line item, the net amount, the VAT amount, and the gross total. A standard invoice (for non-VAT-registered businesses) does not need any VAT details.',
  },
  {
    question: 'How do I send recurring invoices to clients?',
    answer:
      'Recurring invoices can be set up automatically with Billdrop Pro. Upgrade at billdrop.co.uk/upgrade and enable automatic monthly or weekly billing for any client — saving you time every billing cycle.',
  },
]

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Free Invoice Template UK – VAT & Contractor Invoices',
  description:
    'Everything UK businesses, freelancers, and contractors need to know about creating a legally compliant free invoice template, including VAT invoice requirements and HMRC rules.',
  url: PAGE_URL,
  author: { '@type': 'Organization', name: 'Billdrop' },
  publisher: {
    '@type': 'Organization',
    name: 'Billdrop',
    logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
  },
  datePublished: '2025-03-29',
  dateModified: '2025-03-29',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function FreeInvoiceTemplateUKPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="mx-auto max-w-3xl px-4 py-12 text-gray-800">
        {/* Hero */}
        <header className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Billdrop Guide
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900">
            Free Invoice Template UK: VAT, Contractor &amp; HMRC-Compliant Invoicing
          </h1>
          <p className="text-lg text-gray-600">
            Whether you are a freelancer, sole trader, or limited company, having a reliable{' '}
            <strong>free invoice template for UK</strong> businesses can save you hours every month
            and keep you on the right side of HMRC. This guide covers everything you need to know —
            from the legal requirements to VAT rules and contractor-specific tips.
          </p>
          <div className="mt-6">
            <a
              href="/invoice"
              className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create Your Free UK Invoice Now →
            </a>
          </div>
        </header>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            What Makes a UK Invoice Legally Valid?
          </h2>
          <p className="mb-4">
            UK law does not prescribe a single invoice format, but HMRC sets out the minimum
            information that a valid invoice must contain. Getting these details right matters — not
            just for compliance, but because a client can legitimately withhold payment if an invoice
            is incomplete.
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Your full legal name or trading name</strong> — sole traders must use their own
              name or a registered trading name; limited companies must include the registered company
              name.
            </li>
            <li>
              <strong>Your business address</strong> — this is your registered office address for a
              limited company, or your principal place of business for sole traders.
            </li>
            <li>
              <strong>Client name and address</strong> — the legal name and correspondence address of
              the person or organisation you are invoicing.
            </li>
            <li>
              <strong>A unique invoice number</strong> — must be sequential and non-repeating so that
              every invoice can be individually identified for accounting purposes.
            </li>
            <li>
              <strong>Invoice date</strong> — the date the invoice is issued (not necessarily the
              date the work was completed).
            </li>
            <li>
              <strong>Description of goods or services</strong> — clear enough for both parties to
              understand exactly what is being charged.
            </li>
            <li>
              <strong>Total amount due</strong> — in GBP (or the agreed currency) with any applicable
              VAT shown separately.
            </li>
            <li>
              <strong>Payment terms and due date</strong> — e.g. "Payment due within 30 days of
              invoice date".
            </li>
          </ul>
          <p>
            Billdrop&apos;s{' '}
            <a href="/invoice" className="text-indigo-600 underline hover:text-indigo-800">
              free invoice generator
            </a>{' '}
            pre-fills all of these fields and validates them before you download, so you never
            accidentally send an incomplete invoice.
          </p>
        </section>

        {/* Section 2 – VAT */}
        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            VAT Invoice Template UK: What You Need to Add
          </h2>
          <p className="mb-4">
            If you are VAT-registered, your invoices must satisfy additional HMRC requirements to
            constitute a <strong>VAT invoice</strong>. Your customers who are also VAT-registered
            need a valid VAT invoice in order to reclaim the input tax — so getting this right is
            essential.
          </p>
          <p className="mb-4">A valid full VAT invoice must include:</p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>Your VAT registration number (format: GB followed by 9 digits)</li>
            <li>The VAT rate charged on each item (e.g. 20% standard rate, 5% reduced, 0% zero-rated)</li>
            <li>The net (ex-VAT) amount for each line</li>
            <li>The total VAT amount charged</li>
            <li>The gross (inc-VAT) total</li>
            <li>The tax point (time of supply) if different from the invoice date</li>
          </ul>
          <p className="mb-4">
            For supplies under £250 (including VAT), you can issue a <em>simplified VAT invoice</em>{' '}
            which does not need to show the customer&apos;s details — useful for small retail
            transactions.
          </p>
          <p>
            Billdrop automatically generates a fully compliant <strong>VAT invoice template UK</strong>{' '}
            format when you tick the &quot;VAT registered&quot; option in the invoice builder. The
            VAT calculations update in real time as you add line items.
          </p>
        </section>

        {/* Section 3 – Contractors */}
        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Invoice Template for UK Contractors and Freelancers
          </h2>
          <p className="mb-4">
            As a contractor — whether you operate through your own limited company (PSC), an umbrella
            company, or as a sole trader — your invoicing needs differ slightly from a regular
            business.
          </p>
          <h3 className="mb-2 text-xl font-semibold text-gray-800">Limited Company Contractors</h3>
          <p className="mb-4">
            Your invoice must be raised in the name of your limited company (not your personal name).
            Include your Companies House registration number, registered office address, and VAT
            number if applicable. You should also confirm whether the engagement falls inside or
            outside IR35, as this affects how payments are processed by the end client.
          </p>
          <h3 className="mb-2 text-xl font-semibold text-gray-800">Sole Trader Freelancers</h3>
          <p className="mb-4">
            Sole traders invoice under their own name (or trading name). There is no requirement to
            include a company registration number, but if you have registered a trademark or brand
            name you may use that. Many freelancers include their bank details (sort code, account
            number) directly on the invoice to speed up payment.
          </p>
          <h3 className="mb-2 text-xl font-semibold text-gray-800">Payment Terms for Contractors</h3>
          <p className="mb-4">
            Standard UK contractor payment terms range from 14 to 30 days. If you work through a
            recruitment agency, check your contract — many agencies operate on 30-day terms from
            receipt of a signed timesheet, not from the invoice date. Always align your invoice date
            with your contractual payment trigger.
          </p>
          <p>
            Use the{' '}
            <a href="/invoice" className="text-indigo-600 underline hover:text-indigo-800">
              Billdrop invoice builder
            </a>{' '}
            to create a professional <strong>invoice template for contractors UK</strong>-ready in
            under two minutes — PDF download included, free of charge.
          </p>
        </section>

        {/* Section 4 – Recurring */}
        <section className="mb-10 rounded-xl border border-indigo-100 bg-indigo-50 p-6">
          <h2 className="mb-2 text-xl font-bold text-indigo-900">
            🔁 Automate Recurring Invoices with Billdrop Pro
          </h2>
          <p className="mb-4 text-indigo-800">
            Do you invoice the same client every month? Stop copying and pasting. Billdrop Pro lets
            you set up <strong>recurring invoices</strong> that are generated and sent automatically
            on your chosen schedule — weekly, monthly, or custom intervals. Perfect for retainer
            clients, subscription services, or ongoing contracts.
          </p>
          <a
            href="/upgrade"
            className="inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Upgrade to Pro →
          </a>
        </section>

        {/* Section 5 – Best practices */}
        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Best Practices for UK Invoice Management
          </h2>
          <p className="mb-4">
            Beyond the legal requirements, good invoicing habits protect your cash flow and reduce
            the risk of disputes.
          </p>
          <ol className="mb-4 list-decimal space-y-3 pl-6">
            <li>
              <strong>Send invoices promptly.</strong> Issue your invoice as soon as the work is
              complete (or at the agreed billing milestone). Every day of delay is a day added to
              your payment wait.
            </li>
            <li>
              <strong>Keep sequential invoice numbers.</strong> HMRC expects your invoice numbers to
              be sequential and unique. Gaps in your numbering sequence can raise red flags during an
              inspection.
            </li>
            <li>
              <strong>State your bank details clearly.</strong> Include your bank name, sort code,
              and account number. If you accept international payments, add your IBAN and BIC/SWIFT
              code.
            </li>
            <li>
              <strong>Specify a late payment charge.</strong> Under the Late Payment of Commercial
              Debts (Interest) Act 1998, you are entitled to charge statutory interest (currently
              8% above the Bank of England base rate) on overdue invoices. State this on your
              invoice to discourage late payment.
            </li>
            <li>
              <strong>Keep records for at least 6 years.</strong> HMRC requires businesses to retain
              invoices and supporting records for a minimum of 6 years (or 10 years if you use the
              VAT MOSS scheme). Billdrop stores your invoice history securely in your account.
            </li>
          </ol>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-gray-200 bg-white px-5 py-4 open:shadow-sm"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-gray-800 marker:hidden group-open:text-indigo-700">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gray-900 px-8 py-10 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">
            Ready to create your free UK invoice?
          </h2>
          <p className="mb-6 text-gray-300">
            No account required. Build, customise, and download a professional PDF invoice in
            minutes — completely free with Billdrop.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/invoice"
              className="rounded-lg bg-indigo-500 px-7 py-3 font-semibold text-white hover:bg-indigo-600"
            >
              Create Free Invoice
            </a>
            <a
              href="/upgrade"
              className="rounded-lg border border-white px-7 py-3 font-semibold text-white hover:bg-white hover:text-gray-900"
            >
              Explore Pro Features
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
