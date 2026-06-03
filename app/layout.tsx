import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "IndiaTools — Free Online Calculators & Utility Tools for India",
    template: "%s | IndiaTools",
  },
  description:
    "Free online tools for India: EMI calculator, income tax calculator, SIP calculator, word counter, TDEE calculator, and more. No signup required.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://indiatools.in"),
  openGraph: {
    siteName: "IndiaTools",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
