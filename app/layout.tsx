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
  title: "Billdrop",
  description: "Create and send professional invoices with Billdrop",
  metadataBase: new URL("https://billdrop.app"),
  alternates: { canonical: '/' },
  openGraph: {
    title: "Billdrop – Professional Invoicing",
    description: "Create and send professional invoices with Billdrop. Free PDF invoicing, Pro tier for £4.99/month.",
    type: "website",
    url: "https://billdrop.app",
    siteName: "Billdrop",
    images: ['/opengraph-image'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Billdrop – Professional Invoicing",
    description: "Create and send professional invoices with Billdrop. Free PDF invoicing, Pro tier for £4.99/month.",
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
