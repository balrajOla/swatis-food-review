import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: "SWATI'S FOOD REVIEW",
  description: "THE FOOD AUDIT — Quality engineering meets food culture.",
};

const MARQUEE_TEXT =
  "THE FOOD AUDIT \u00b7 QUALITY ENGINEERING MEETS FOOD CULTURE \u00b7 LONDON & BEYOND \u00b7 ";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const marqueeContent = MARQUEE_TEXT.repeat(8);

  return (
    <html lang="en">
      <body className="bg-cream min-h-screen">

        {/* ===== FIXED LEFT SIDEBAR (desktop only) ===== */}
        <aside
          className="hidden lg:flex fixed left-0 top-0 h-full w-10 z-40 flex-col items-center justify-center border-r border-border-muted bg-white"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <span className="sidebar-brand tracking-widest text-xs" style={{ color: 'var(--color-dark)' }}>
            SWATI&apos;S FOOD REVIEW
          </span>
        </aside>

        {/* ===== STICKY HEADER ===== */}
        <header
          className="sticky top-0 z-50 backdrop-blur-md border-b"
          style={{
            backgroundColor: 'rgba(243,239,230,0.92)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="lg:ml-10">
            <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

              {/* Left nav */}
              <nav className="flex items-center gap-6">
                <Link
                  href="/reviews"
                  className="font-ui text-xs uppercase tracking-widest hover:text-primary transition-colors"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--color-dark)' }}
                >
                  REVIEWS
                </Link>
                <Link
                  href="/about"
                  className="font-ui text-xs uppercase tracking-widest hover:text-primary transition-colors"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--color-dark)' }}
                >
                  ABOUT
                </Link>
              </nav>

              {/* Center brand */}
              <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2 text-3xl tracking-wide uppercase"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: 'var(--color-dark)',
                  letterSpacing: '0.06em',
                  lineHeight: 1,
                }}
              >
                SWATI&apos;S FOOD REVIEW
              </Link>

              {/* Right actions */}
              <div className="flex items-center gap-5 ml-auto">
                <Link
                  href="/reviews"
                  className="font-ui text-xs uppercase tracking-widest hover:text-primary transition-colors"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--color-dark)' }}
                >
                  PUBLISH
                </Link>
                <button
                  aria-label="Search"
                  className="p-1 hover:opacity-60 transition-opacity"
                  style={{ color: 'var(--color-dark)' }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </header>

        {/* ===== MARQUEE STRIP ===== */}
        <div
          className="overflow-hidden py-2.5"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <div className="marquee-track">
            <span
              className="text-xs uppercase pr-8"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: 'var(--color-white)',
                letterSpacing: '0.18em',
                fontSize: '0.8rem',
              }}
            >
              {marqueeContent}
            </span>
            <span
              className="text-xs uppercase pr-8"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: 'var(--color-white)',
                letterSpacing: '0.18em',
                fontSize: '0.8rem',
              }}
              aria-hidden="true"
            >
              {marqueeContent}
            </span>
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <main className="lg:ml-10">
          {children}
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="lg:ml-10">

          {/* Large green block */}
          <div
            className="section-green px-8 py-24 text-center"
          >
            <div
              className="text-8xl md:text-9xl lg:text-[10rem] leading-none tracking-wide mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--color-white)' }}
            >
              SWATI&apos;S<br />FOOD REVIEW
            </div>
            <p
              className="text-lg md:text-xl tracking-widest opacity-80"
              style={{ fontFamily: "'Special Elite', Georgia, serif", color: 'var(--color-cream)' }}
            >
              THE FOOD AUDIT
            </p>
            <p
              className="mt-3 text-sm opacity-60 max-w-sm mx-auto"
              style={{ fontFamily: "'Special Elite', Georgia, serif", color: 'var(--color-cream)' }}
            >
              Quality engineering meets food culture.
            </p>
          </div>

          {/* Cream footer bar */}
          <div
            className="section-cream px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <span
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--color-dark)' }}
            >
              SWATI&apos;S FOOD REVIEW
            </span>

            <span
              className="text-xs text-center opacity-60"
              style={{ fontFamily: "'Special Elite', Georgia, serif", color: 'var(--color-text)' }}
            >
              THE FOOD AUDIT &copy; {new Date().getFullYear()} &middot; Quality engineering meets food culture.
            </span>

            <nav className="flex items-center gap-6">
              {['REVIEWS', 'ABOUT', 'PUBLISH'].map((link) => (
                <Link
                  key={link}
                  href={link === 'REVIEWS' ? '/reviews' : link === 'ABOUT' ? '/about' : '/reviews'}
                  className="text-xs uppercase tracking-widest hover:opacity-60 transition-opacity"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--color-dark)' }}
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

        </footer>

      </body>
    </html>
  );
}
