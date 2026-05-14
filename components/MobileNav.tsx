'use client';

import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

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
        className="md:hidden inline-flex h-10 w-10 items-center justify-center"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} strokeWidth={1.5} />
      </button>

      <button
        type="button"
        aria-label="Search"
        className="hidden md:inline-flex h-10 w-10 items-center justify-center hover:opacity-60 transition-opacity"
      >
        <Search size={17} strokeWidth={1.5} />
      </button>

      <div className={`mobile-nav-overlay ${open ? 'visible-nav' : 'hidden-nav'}`}>
        <button
          type="button"
          aria-label="Close menu"
          className="absolute right-6 top-6 text-white"
          onClick={() => setOpen(false)}
        >
          <X size={28} strokeWidth={1.5} />
        </button>

        <p className="font-display text-5xl tracking-wide text-white">THE FOOD AUDIT</p>
        <nav className="flex flex-col items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-6xl tracking-wide text-white transition-opacity hover:opacity-70"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
