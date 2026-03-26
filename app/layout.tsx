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
  title: "Free Invoice Generator - Instant PDF, No Signup",
  description: "Create professional invoices in seconds. Fill in your details, add line items, and download a PDF instantly. Free, no signup required.",
  metadataBase: new URL("https://invoicegenerator.tools"), // TODO: confirm final production domain
  alternates: { canonical: '/' },
  openGraph: {
    title: "Free Invoice Generator - Instant PDF, No Signup",
    description: "Create professional invoices in seconds. Fill in your details, add line items, and download a PDF instantly. Free, no signup required.",
    type: "website",
    url: "https://invoicegenerator.tools",
    siteName: "Free Invoice Generator",
    images: ['/opengraph-image'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator - Instant PDF, No Signup",
    description: "Create professional invoices in seconds. Free, no signup required.",
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
