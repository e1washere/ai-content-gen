import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoContent AI - Generator treści AI dla produktów ekologicznych",
  description: "Pierwszy w Polsce generator treści AI specjalnie zaprojektowany dla firm ekologicznych. Twórz opisy produktów, posty na social media i artykuły blogowe w sekundach.",
  keywords: "AI, generator treści, produkty ekologiczne, marketing, e-commerce, Polska",
  authors: [{ name: "EcoContent AI Team" }],
  openGraph: {
    title: "EcoContent AI - Generator treści AI dla produktów ekologicznych",
    description: "Pierwszy w Polsce generator treści AI specjalnie zaprojektowany dla firm ekologicznych.",
    type: "website",
    locale: "pl_PL",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoContent AI - Generator treści AI dla produktów ekologicznych",
    description: "Pierwszy w Polsce generator treści AI specjalnie zaprojektowany dla firm ekologicznych.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
