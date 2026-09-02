import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/components/i18n-provider";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mauricio Gomes Freire Filho | Portfolio",
  description:
    "Computer Engineering student at Ibmec seeking an internship across software, electronics, and prototyping.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Mauricio Gomes Freire Filho",
    title: "Mauricio Gomes Freire Filho | Portfolio",
    description:
      "Computer Engineering student at Ibmec seeking an internship across software, electronics, and prototyping.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mauricio Gomes Freire Filho — Computer Engineering, Software & Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mauricio Gomes Freire Filho | Portfolio",
    description:
      "Computer Engineering student at Ibmec seeking an internship across software, electronics, and prototyping.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "16x16 32x32 48x48",
      },
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="font-sans">
        <I18nProvider>
          {children}
          <Analytics />
        </I18nProvider>
      </body>
    </html>
  );
}
