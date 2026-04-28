'use client';

import { company, navigation } from '@/lib/content';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const backdrop = useTransform(scrollY, [0, 90], ['rgba(7, 19, 13, 0)', 'rgba(7, 19, 13, .72)']);
  const border = useTransform(scrollY, [0, 90], ['rgba(245, 239, 223, 0)', 'rgba(245, 239, 223, .16)']);

  return (
    <motion.header
      style={{ backgroundColor: backdrop, borderColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" className="focus-ring group inline-flex items-center rounded-[1.15rem] bg-cream-50/95 px-3 py-2 shadow-[0_16px_40px_rgba(7,19,13,.18)] ring-1 ring-cream-100/30 backdrop-blur-md transition-transform duration-500 hover:-translate-y-0.5">
          <Image
            src={company.logo}
            alt={company.name}
            width={293}
            height={88}
            priority
            className="h-auto w-36 object-contain sm:w-44"
          />
        </a>

        <nav className="hidden items-center gap-2 rounded-full border border-cream-100/20 bg-forest-950/50 p-1 text-cream-50 backdrop-blur-xl lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-full px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream-50/100 transition-colors duration-300 hover:bg-cream-50/10 hover:text-cream-50"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${company.email}`}
          className="focus-ring hidden rounded-full border border-earth-300/50 px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-earth-300 transition-all duration-300 hover:bg-earth-300 hover:text-forest-950 lg:inline-flex"
        >
          Email
        </a>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-cream-100/20 bg-cream-50/10 text-cream-50 backdrop-blur-md lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={clsx(
          'mx-5 mb-4 overflow-hidden rounded-[1.5rem] border border-cream-100/10 bg-forest-950/90 text-cream-50 shadow-botanical backdrop-blur-xl transition-all duration-500 lg:hidden',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="grid gap-1 p-3">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="focus-ring rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-cream-100/90 hover:bg-cream-50/10"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
