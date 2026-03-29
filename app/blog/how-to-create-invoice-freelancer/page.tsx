import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Create a Professional Invoice as a Freelancer | Billdrop",
  description:
    "Step-by-step guide to creating professional invoices as a freelancer. Learn what to include, how to format, and use a free invoice template to get paid faster.",
  openGraph: {
    title: "How to Create a Professional Invoice as a Freelancer | Billdrop",
    description:
      "Step-by-step guide to creating professional invoices as a freelancer. Learn what to include, how to format, and use a free invoice template to get paid faster.",
    type: "article",
    url: "https://invoice-generator-pied-sigma.vercel.app/blog/how-to-create-invoice-freelancer",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Create a Professional Invoice as a Freelancer | Billdrop",
    description:
      "Step-by-step guide to creating professional invoices as a freelancer. Learn what to include, how to format, and use a free invoice template to get paid faster.",
  },
};

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <article className="max-w-3xl mx-auto px-4 py-16">
        <header className="mb-10">
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-3">
            Freelance Invoicing Guide
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            How to Create a Professional Invoice as a Freelancer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Sending a professional invoice is one of the most important skills a freelancer can develop. It&apos;s not just about getting paid — a well-structured invoice reflects your professionalism, sets clear expectations, and can help you get paid faster. This guide walks you through everything you need to know to create invoice documents that look great and comply with UK business requirements.
          </p>
        </header>

        <nav className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 mb-12">
          <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3">In this guide:</p>
          <ol className="space-y-1 text-indigo-600 dark:text-indigo-400 text-sm list-decimal pl-5">
            <li><a href="#what-is-a-freelance-invoice" className="hover:underline">What is a freelance invoice?</a></li>
            <li><a href="#what-to-include" className="hover:underline">What to include on your invoice</a></li>
            <li><a href="#step-by-step" className="hover:underline">Step-by-step: creating your invoice</a></li>
            <li><a href="#free-invoice-template" className="hover:underline">Using a free invoice template</a></li>
            <li><a href="#getting-paid-faster" className="hover:underline">Tips for getting paid faster</a></li>
            <li><a href="#common-mistakes" className="hover:underline">Common invoicing mistakes to avoid</a></li>
            <li><a href="#faq" className="hover:underline">Frequently asked questions</a></li>
          </ol>
        </nav>

        <section id="what-is-a-freelance-invoice" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
            What Is a Freelance Invoice?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            A freelance invoice is a formal document you send to a client requesting payment for services you&apos;ve completed. It serves as a legal record of the work done, the amount owed, and the payment terms agreed upon. Unlike employees who receive payslips, freelancers are responsible for issuing their own invoices to trigger payment.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            For UK freelancers, invoices also play a key role in tax compliance — HMRC requires self-employed individuals to keep accurate records of all income, and your invoices form the backbone of that paper trail.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Whether you&apos;re a graphic designer, web developer, copywriter, consultant, or photographer, the fundamentals of a good freelance invoice are the same: clarity, accuracy, and professionalism.
          </p>
        </section>

        <section id="what-to-include" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
            What to Include on Your Invoice
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            HMRC specifies what a valid invoice must contain. Missing any of these fields can delay payment or cause problems down the line. Here&apos;s what every freelance invoice should include:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-400 mb-6">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Your name and address</strong> — your full name or trading name, plus a contact address. If you&apos;re a limited company, include your registered address.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Client name and address</strong> — who you&apos;re billing. Use the legal name of the business or individual.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">A unique invoice number</strong> — a sequential reference number so both you and your client can track it easily. e.g. INV-001, INV-002.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Invoice date</strong> — the date the invoice was issued. This is not the same as the date you completed the work.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Description of services</strong> — clear line items describing what you did, with quantities and rates where applicable. Avoid vague descriptions like &quot;freelance work&quot;.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Total amount due</strong> — including any applicable VAT. Show subtotal and VAT separately if you&apos;re VAT registered.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Payment terms</strong> — when the invoice is due. Common terms include &quot;payment due within 14 days&quot; or &quot;net 30&quot;.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Payment details</strong> — your bank account sort code and account number, or payment link (PayPal, Stripe, etc.).
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">VAT number</strong> — only required if you&apos;re VAT registered. As of 2024, the UK VAT registration threshold is £90,000 annual turnover.
            </li>
          </ul>
        </section>

        <section id="step-by-step" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
            Step-by-Step: Creating Your Freelance Invoice
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Choose your invoicing method</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  You can create invoices in Microsoft Word, Google Docs, a spreadsheet, or use a dedicated free invoice generator like Billdrop. A dedicated tool saves time, reduces errors, and produces a consistent professional result every time.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Add your business details</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Enter your name or business name, address, email, and phone number. If you have a logo, add it to the top of the invoice for a polished look.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Enter the client&apos;s details</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Add the full legal name of the business or individual you&apos;re billing and their billing address. Getting this right is important for their accounts department.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Set the invoice number and date</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Use a sequential invoice number (start at INV-001 and increment). Set the invoice date to today. Add a due date based on your agreed payment terms.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">List your services as line items</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Break down your work into clear line items. For example: &quot;Website design — 8 hours @ £75/hour = £600&quot;. Be specific — it reduces disputes and helps the client understand what they&apos;re paying for.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">6</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Add payment details</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Include your bank sort code and account number, or a payment link. The easier you make it for the client to pay, the faster you&apos;ll receive payment.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">7</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Download as PDF and send</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Always send invoices as PDFs — they can&apos;t be accidentally edited, they display consistently across devices, and they look professional. Keep a copy for your own records.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="free-invoice-template" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
            Using a Free Invoice Template
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            You don&apos;t need to design an invoice from scratch. A good free invoice template saves you time, ensures you never miss a required field, and gives every invoice a consistent professional appearance.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            <Link href="/invoice" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              Billdrop&apos;s free invoice generator
            </Link>{" "}
            lets you create and download professional invoices in seconds — no account required. Just fill in your details, add your line items, and download as a PDF. It&apos;s completely free for basic invoice creation.
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-5 my-6">
            <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Why use Billdrop?</p>
            <ul className="space-y-2 text-sm text-indigo-700 dark:text-indigo-300">
              <li>✓ Free to create and download invoices — no account needed</li>
              <li>✓ Professional PDF output, ready to send</li>
              <li>✓ All required UK invoice fields included</li>
              <li>✓ Supports VAT, multiple line items, and custom payment terms</li>
              <li>✓ Save clients and invoices with a free account</li>
            </ul>
            <Link
              href="/invoice"
              className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Create your first invoice →
            </Link>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            If you find yourself creating invoices regularly,{" "}
            <Link href="/upgrade" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              upgrading to Billdrop Pro
            </Link>{" "}
            gives you unlimited invoice history, client management, and priority support — all for £4.99/month.
          </p>
        </section>

        <section id="getting-paid-faster" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
            Tips for Getting Paid Faster
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Creating a great invoice is step one — but there are several practices that consistently help freelancers get paid on time:
          </p>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-6">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Invoice promptly.</strong> Send your invoice the same day you complete the work, or on the agreed billing date. The longer you wait, the longer you&apos;ll wait to be paid.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Use short payment terms.</strong> Rather than net-30, try net-14 or even net-7. Many clients will pay within your stated terms if you set them clearly.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Offer multiple payment methods.</strong> The more ways a client can pay (bank transfer, PayPal, card), the fewer excuses they have for delays.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Follow up politely but promptly.</strong> If a payment is overdue by a day, send a friendly reminder. Most late payments are due to oversight, not bad faith.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Consider a deposit for new clients.</strong> A 25–50% upfront deposit protects you from non-payment and signals commitment from the client.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">Reference the project clearly.</strong> Include the project name or PO number if the client has one. This helps their accounts team process payment quickly.
            </li>
          </ul>
        </section>

        <section id="common-mistakes" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
            Common Invoicing Mistakes to Avoid
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Even experienced freelancers make invoicing mistakes. Here are the most common ones — and how to avoid them:
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-red-400 pl-4">
              <p className="font-medium text-gray-800 dark:text-gray-200">Vague descriptions</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &quot;Services rendered&quot; or &quot;freelance work&quot; isn&apos;t good enough. Be specific: &quot;Brand identity design — logo, colour palette, and typography guide&quot;.
              </p>
            </div>
            <div className="border-l-4 border-red-400 pl-4">
              <p className="font-medium text-gray-800 dark:text-gray-200">No invoice number</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sequential invoice numbers are required for proper bookkeeping and make it easy to reference a specific invoice in correspondence.
              </p>
            </div>
            <div className="border-l-4 border-red-400 pl-4">
              <p className="font-medium text-gray-800 dark:text-gray-200">Wrong client details</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Using an informal name instead of the legal entity can cause delays with the client&apos;s finance team who need it to match their records.
              </p>
            </div>
            <div className="border-l-4 border-red-400 pl-4">
              <p className="font-medium text-gray-800 dark:text-gray-200">Forgetting payment instructions</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                An invoice with no bank details or payment link creates friction. Always make it completely clear how to pay you.
              </p>
            </div>
            <div className="border-l-4 border-red-400 pl-4">
              <p className="font-medium text-gray-800 dark:text-gray-200">Not keeping copies</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                HMRC requires you to keep business records for at least 5 years. Store PDFs of all invoices sent and received.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                Do I need to register a business to create invoices?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                No. As a sole trader in the UK, you can invoice clients using your own name. You do need to register as self-employed with HMRC if you earn more than £1,000 in a tax year from freelancing.
              </p>
            </details>
            <details className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                What format should I use — PDF, Word, or something else?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                PDF is strongly recommended. It looks professional, renders consistently on all devices, and can&apos;t be accidentally edited by the recipient. Always send invoices as PDFs.
              </p>
            </details>
            <details className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                How do I create an invoice online for free?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                Use a free invoice generator like{" "}
                <Link href="/invoice" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Billdrop
                </Link>
                . Fill in your details, add your line items, and download a professional PDF invoice instantly — no account or card required.
              </p>
            </details>
            <details className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                How do I number my invoices?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                Use a sequential numbering system: INV-001, INV-002, etc. You can also include the year: INV-2024-001. The important thing is consistency and uniqueness — no two invoices should have the same number.
              </p>
            </details>
            <details className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                What are standard payment terms for freelancers?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                Common terms are net-14 (14 days) or net-30 (30 days). For new clients, shorter terms (net-7 or even payment on receipt) are worth trying. Under the Late Payment of Commercial Debts Act, you&apos;re entitled to charge 8% above the base rate on overdue invoices.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Ready to create your invoice?</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/invoice"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-center"
            >
              Create a free invoice →
            </Link>
            <Link
              href="/upgrade"
              className="inline-block bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors text-center"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
