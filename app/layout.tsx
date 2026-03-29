import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { Header } from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invoxa - Professional Invoicing for Freelancers & Small Businesses",
  description: "Create professional invoices in seconds with Invoxa. Free PDF download, no signup required. Upgrade for client management, recurring invoices, and more.",
  metadataBase: new URL("https://invoxa.app"),
  alternates: { canonical: '/' },
  openGraph: {
    title: "Invoxa - Professional Invoicing for Freelancers & Small Businesses",
    description: "Create professional invoices in seconds with Invoxa. Free PDF download, no signup required.",
    type: "website",
    url: "https://invoxa.app",
    siteName: "Invoxa",
    images: ['/opengraph-image'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoxa - Professional Invoicing for Freelancers & Small Businesses",
    description: "Create professional invoices in seconds with Invoxa. Free, no signup required.",
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
