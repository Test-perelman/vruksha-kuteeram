import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Script from 'next/script';
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
    description: "We don't just create gardens. We build living landscapes that last."
  }
};

const chunkRecoveryScript = `
(() => {
  const marker = 'vk_chunk_retry';
  const isChunkProblem = (value) => {
    const text = String((value && (value.message || value.reason || value.error)) || value || '');
    return /ChunkLoadError|Failed to load chunk|Loading chunk|CSS_CHUNK_LOAD_FAILED|Importing a module script failed|dynamically imported module/i.test(text);
  };
  const removeMarker = () => {
    try {
      const url = new URL(window.location.href);
      if (!url.searchParams.has(marker)) return;
      url.searchParams.delete(marker);
      window.history.replaceState(null, document.title, url.pathname + url.search + url.hash);
    } catch {}
  };
  const recover = () => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has(marker)) return;
      url.searchParams.set(marker, Date.now().toString());
      window.location.replace(url.toString());
    } catch {
      window.location.reload();
    }
  };
  try {
    if (new URL(window.location.href).searchParams.has(marker)) {
      window.addEventListener('load', () => setTimeout(removeMarker, 250), { once: true });
    }
  } catch {}
  window.addEventListener(
    'error',
    (event) => {
      const target = event.target;
      const asset = target && (target.src || target.href);
      if ((asset && String(asset).includes('/_next/static/')) || isChunkProblem(event.error || event.message)) {
        recover();
      }
    },
    true
  );
  window.addEventListener('unhandledrejection', (event) => {
    if (isChunkProblem(event.reason)) recover();
  });
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Script id="vk-chunk-recovery" strategy="beforeInteractive">
          {chunkRecoveryScript}
        </Script>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
