import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Vruksha Kuteeram Landscape LLP',
  description: 'Landscaping, irrigation, and vertical gardening services in Hyderabad.',
  openGraph: {
    title: 'Vruksha Kuteeram Landscape LLP',
    description: 'Studying nature, to immerse you in the lap of nature'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
