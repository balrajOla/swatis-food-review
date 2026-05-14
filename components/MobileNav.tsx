'use client';

import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/reviews', label: 'REVIEWS' },
  { href: '/about', label: 'ABOUT' },
  { href: '/admin', label: 'PUBLISH' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        className="mobile-menu-button md:hidden inline-flex h-10 w-10 items-center justify-center rounded-[3px] border transition"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} strokeWidth={1.6} />
      </button>

      <button
        type="button"
        aria-label="Search"
        className="hidden md:inline-flex h-10 w-10 items-center justify-center hover:opacity-60 transition-opacity"
      >
        <Search size={17} strokeWidth={1.5} />
      </button>

      <div className={`mobile-nav-overlay ${open ? 'visible-nav' : 'hidden-nav'}`}>
        <div className="mobile-nav-panel">
          <button
            type="button"
            aria-label="Close menu"
            className="mobile-nav-close absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-[3px] border text-white transition hover:bg-white/10 sm:right-6 sm:top-6"
            onClick={() => setOpen(false)}
          >
            <X size={28} strokeWidth={1.6} />
          </button>

          <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
            <ThemeToggle />
          </div>

          <p className="font-ui text-xs uppercase tracking-[0.32em] text-cream/75">MENU</p>
          <p className="font-display text-5xl tracking-wide text-white sm:text-6xl">THE FOOD AUDIT</p>
          <nav className="flex flex-col items-center gap-6 sm:gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-6xl leading-none tracking-wide text-white transition-opacity hover:opacity-70 sm:text-7xl"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
