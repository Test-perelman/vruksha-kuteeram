'use client';

import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function MagneticButton({
  children,
  href,
  variant = 'primary',
  className
}: {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'ghost' | 'dark';
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={clsx(
        'focus-ring group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-all duration-500 ease-silk',
        variant === 'primary' && 'bg-earth-500 text-forest-950 shadow-gold hover:bg-earth-300',
        variant === 'ghost' && 'border border-cream-100/30 bg-cream-50/5 text-cream-50 backdrop-blur-md hover:border-earth-300/100 hover:bg-cream-50/10',
        variant === 'dark' && 'bg-forest-950 text-cream-50 hover:bg-forest-800',
        className
      )}
    >
      <span className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-white/30 opacity-0 transition-opacity duration-300 group-hover:animate-shimmer group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
      <ArrowUpRight className="relative z-10 ml-3 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </motion.a>
  );
}