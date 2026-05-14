import type { Metadata } from 'next';
import Link from 'next/link';
import MobileNav from '@/components/MobileNav';
import './globals.css';

export const metadata: Metadata = {
  title: "SWATI'S FOOD REVIEW",
  description: 'THE FOOD AUDIT — Quality engineering meets food culture.',
};

const MARQUEE_TEXT = "THE FOOD AUDIT · QUALITY ENGINEERING MEETS FOOD CULTURE · LONDON & BEYOND · ";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const marqueeContent = MARQUEE_TEXT.repeat(8);

  return (
    <html lang="en">
      <body className="min-h-screen bg-cream">
        <header
          className="sticky top-0 z-50 border-b backdrop-blur-md"
          style={{ backgroundColor: 'rgba(243,239,230,0.94)', borderColor: 'var(--color-border)' }}
        >
          <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <nav className="hidden items-center gap-6 md:flex">
              <Link className="font-ui text-xs uppercase tracking-widest transition-opacity hover:opacity-60" href="/reviews">REVIEWS</Link>
              <Link className="font-ui text-xs uppercase tracking-widest transition-opacity hover:opacity-60" href="/about">ABOUT</Link>
            </nav>

            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[1.7rem] uppercase tracking-[0.06em] leading-none text-dark sm:text-3xl"
            >
              SWATI&apos;S FOOD REVIEW
            </Link>

            <div className="ml-auto flex items-center gap-4 text-dark">
              <Link className="hidden font-ui text-xs uppercase tracking-widest transition-opacity hover:opacity-60 md:inline-flex" href="/admin">PUBLISH</Link>
              <MobileNav />
            </div>
          </div>
        </header>

        <div className="overflow-x-hidden py-2.5" style={{ backgroundColor: 'var(--color-primary)' }}>
          <div className="marquee-track">
            {[0, 1].map((i) => (
              <span
                key={i}
                aria-hidden={i === 1}
                className="pr-8 font-display text-[0.8rem] uppercase tracking-[0.18em] text-white"
              >
                {marqueeContent}
              </span>
            ))}
          </div>
        </div>

        {children}

        <footer>
          <div className="section-green px-5 py-20 text-center sm:px-8 md:py-24">
            <div className="footer-brand-float mb-6 font-display text-[4.6rem] leading-[0.9] tracking-wide text-white sm:text-8xl md:text-9xl lg:text-[10rem]">
              SWATI&apos;S<br />FOOD REVIEW
            </div>
            <p className="font-serif text-lg tracking-widest text-cream opacity-80 md:text-xl">THE FOOD AUDIT</p>
            <p className="mx-auto mt-3 max-w-sm font-serif text-sm text-cream opacity-65">Quality engineering meets food culture.</p>
          </div>

          <div
            className="section-cream flex flex-col items-center justify-between gap-5 border-t px-5 py-8 text-center md:flex-row md:px-8"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <span className="font-serif text-xs text-text-muted opacity-70">
              THE FOOD AUDIT &copy; {new Date().getFullYear()} &middot; Quality engineering meets food culture.
            </span>

            <nav className="flex flex-wrap items-center justify-center gap-6">
              {[
                ['REVIEWS', '/reviews'],
                ['ABOUT', '/about'],
                ['PUBLISH', '/admin'],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="font-ui text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
