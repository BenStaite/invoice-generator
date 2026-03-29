import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Blog – Swiftbill | Invoicing Tips for UK Freelancers",
  description:
    "Invoicing advice, tips, and guides for UK freelancers and small businesses. Learn how to get paid faster and manage your invoicing efficiently.",
  openGraph: {
    title: "Blog – Swiftbill | Invoicing Tips for UK Freelancers",
    description:
      "Invoicing advice, tips, and guides for UK freelancers and small businesses.",
    type: "website",
    url: "https://swiftbill.app/blog",
    siteName: "Swiftbill",
  },
};

const posts = [
  {
    slug: "free-invoice-generator-uk",
    title: "The Best Free Invoice Generator for UK Freelancers in 2026",
    description:
      "A complete guide to free invoice generators in the UK — what to look for, how Swiftbill compares, and tips to get paid faster.",
    date: "2026-01-15",
    readingTime: "5 min read",
  },
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Swiftbill Blog
          </h1>
          <p className="text-gray-500 text-lg">
            Invoicing tips, guides, and advice for UK freelancers and small businesses.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-500 text-sm mb-4">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline"
              >
                Read article <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
