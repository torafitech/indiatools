import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "UtilSpot — Free Online Calculators & Utility Tools",
    template: "%s | UtilSpot",
  },
  description:
    "Free online tools: EMI calculator, income tax calculator, SIP calculator, TDEE calculator, word counter, QR generator, and more. No signup required.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.utilspot.app"),
  openGraph: {
    siteName: "UtilSpot",
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
    <html lang="en" className={jakarta.variable}>
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen bg-[#FFFCF8] text-[#1C1209] antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9CFW2QSZB0"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-9CFW2QSZB0');`}
        </Script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
