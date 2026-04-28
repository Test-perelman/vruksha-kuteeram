'use client';

import { company } from '@/lib/content';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';
import MagneticButton from './ui/MagneticButton';

const titleWords = ['We, the', 'nature', 'lovers'];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 22, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 22, mass: 0.5 });
  const leafX = useTransform(springX, [-0.5, 0.5], [-28, 28]);
  const leafY = useTransform(springY, [-0.5, 0.5], [-18, 18]);
  const cardX = useTransform(springX, [-0.5, 0.5], [18, -18]);
  const cardY = useTransform(springY, [-0.5, 0.5], [12, -12]);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        left: `${8 + ((index * 13) % 84)}%`,
        top: `${14 + ((index * 17) % 68)}%`,
        delay: `${(index % 7) * 0.35}s`,
        duration: `${5.6 + (index % 5) * 0.9}s`
      })),
    []
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let context: { revert: () => void } | undefined;
    let cancelled = false;

    const timer = window.setTimeout(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      // A lightweight scroll transform gives the hero a cinematic compression
      // without tying React state to scroll position.
      context = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.65
          }
        })
          .to('.hero-copy', { yPercent: 18, opacity: 0.08, scale: 0.96, ease: 'none' }, 0)
          .to('.hero-media', { yPercent: 14, scale: 1.08, rotate: 0, ease: 'none' }, 0)
          .to('.hero-vignette', { opacity: 0.9, ease: 'none' }, 0);
      }, root);
    }, 900);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      context?.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      className="garden-noise relative isolate flex min-h-[100svh] items-center overflow-hidden bg-forest-depth text-cream-50"
    >
      <Image
        src="/brand-assets/generated/hero-landscape-irrigation-vertical-garden-bg.png"
        alt="Landscape courtyard with irrigation and vertical garden"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover opacity-50 saturate-110"
      />
      <div className="hero-vignette absolute inset-0 -z-10 bg-[radial-gradient(circle_at_62%_45%,rgba(245,239,223,.22),transparent_24rem),linear-gradient(90deg,rgba(7,19,13,.94),rgba(7,19,13,.58)_46%,rgba(7,19,13,.82))]" />
      <motion.div style={{ x: leafX, y: leafY }} className="pointer-events-none absolute -left-20 bottom-[-8rem] z-10 hidden h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(99,122,79,.38),transparent_62%)] blur-2xl lg:block" />
      <motion.div style={{ x: leafX, y: leafY }} className="pointer-events-none absolute -right-28 top-24 z-10 hidden h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(168,133,79,.16),transparent_66%)] blur-xl lg:block" />

      {particles.map((particle, index) => (
        <span
          key={index}
          className="pointer-events-none absolute z-10 h-1 w-1 rounded-full bg-earth-300/100 shadow-[0_0_22px_rgba(215,194,154,.72)]"
          style={{
            left: particle.left,
            top: particle.top,
            animation: `floatLeaf ${particle.duration} ease-in-out ${particle.delay} infinite`
          }}
        />
      ))}

      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:pb-24 lg:pt-32">
        <div className="hero-copy relative z-20 max-w-4xl">
          <h1 aria-label={company.positioning} className="font-serif text-[clamp(4.2rem,11vw,10.8rem)] font-medium leading-[0.82] tracking-[-0.075em] text-balance">
            {titleWords.map((word, index) => (
              <span
                key={word}
                aria-hidden="true"
                className={index === 1 ? 'hero-word block text-earth-300' : 'hero-word block'}
                style={{ animationDelay: `${index * 45}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p
            className="hero-subcopy mt-8 max-w-2xl text-base leading-8 text-cream-100/75 sm:text-lg"
            style={{ animationDelay: '120ms' }}
          >
            {company.tagline}
          </p>
          <div
            className="hero-actions mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '180ms' }}
          >
            <MagneticButton href="#projects">Explore Projects</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">Contact Us</MagneticButton>
          </div>
        </div>

        <motion.div style={{ x: cardX, y: cardY }} className="hero-media relative z-20 hidden min-h-[560px] preserve-3d lg:block">
          <div className="absolute right-4 top-3 h-[520px] w-[78%] rotate-[2deg] overflow-hidden rounded-[2.25rem] border border-cream-100/20 bg-cream-50/10 shadow-botanical backdrop-blur-xl">
            <Image
              src="/brand-assets/generated/hero-feature-landscape-irrigation-vertical-garden.png"
              alt="A completed landscape, irrigation, and vertical garden project"
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/100 via-forest-950/10 to-transparent" />
          </div>
          <div className="absolute bottom-14 left-0 w-[58%] rounded-[2rem] border border-cream-100/20 bg-cream-50/10 p-5 shadow-botanical backdrop-blur-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/brand-assets/services/service-vertical-gardening.png"
                alt="Vertical garden installation"
                fill
                sizes="26vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-cream-100/75">
              <span>Vertical Gardening</span>
              <span className="h-px flex-1 bg-cream-100/20" />
            </div>
          </div>
          <div className="absolute right-10 top-24 rounded-full border border-earth-300/40 bg-forest-950/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-earth-300 backdrop-blur-xl">
            Established {company.established}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 text-cream-100/50 lg:flex">
        <span className="h-12 w-px overflow-hidden rounded-full bg-cream-100/20">
          <span className="block h-5 w-px animate-[shimmer_2.2s_ease-in-out_infinite] bg-earth-300" />
        </span>
        <span className="text-[0.6rem] uppercase tracking-[0.32em]">Scroll</span>
      </div>
    </section>
  );
}
