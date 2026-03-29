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
  title: "Swiftbill – Free Invoice Generator for Freelancers & Small Businesses UK",
  description: "Create professional invoices in seconds with Swiftbill. Free invoice generator for UK freelancers and small businesses. No sign-up required for basic use.",
  metadataBase: new URL("https://swiftbill.app"),
  alternates: { canonical: '/' },
  openGraph: {
    title: "Swiftbill – Free Invoice Generator for Freelancers & Small Businesses UK",
    description: "Create professional invoices in seconds with Swiftbill. Free invoice generator for UK freelancers and small businesses. No sign-up required for basic use.",
    type: "website",
    url: "https://swiftbill.app",
    siteName: "Swiftbill",
    images: ['/opengraph-image'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiftbill – Free Invoice Generator for Freelancers & Small Businesses UK",
    description: "Create professional invoices in seconds with Swiftbill. Free invoice generator for UK freelancers and small businesses. No sign-up required for basic use.",
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
