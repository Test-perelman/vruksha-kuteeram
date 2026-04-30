'use client';

import { company, services } from '@/lib/content';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PanelsTopLeft, Sprout, Trees } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';

const titleLines = ['We don\'t just', 'create gardens -', 'we build living', 'landscapes that last.'];
const categoryIcons = [Trees, Sprout, PanelsTopLeft];
const cardOffsets = ['', 'lg:ml-8', 'lg:ml-16'];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 22, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 22, mass: 0.5 });
  const leafX = useTransform(springX, [-0.5, 0.5], [-28, 28]);
  const leafY = useTransform(springY, [-0.5, 0.5], [-18, 18]);
  const cardX = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const cardY = useTransform(springY, [-0.5, 0.5], [8, -8]);

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
        src="/brand-assets/generated/hero-landscape-irrigation-vertical-garden-bg-20260429.png"
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

      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-10 px-5 pb-16 pt-24 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:px-12 lg:pb-24 lg:pt-32">
        <div className="hero-copy relative z-20 max-w-4xl">
          <h1 aria-label={company.positioning} className="font-serif text-[clamp(3.1rem,6.7vw,6.9rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-balance lg:leading-[0.86]">
            {titleLines.map((line, index) => (
              <span
                key={line}
                aria-hidden="true"
                className={index >= 2 ? 'hero-word block text-earth-300' : 'hero-word block'}
                style={{ animationDelay: `${index * 45}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>
          <p
            className="hero-subcopy mt-7 max-w-2xl text-sm font-medium leading-7 text-cream-100/85 sm:text-base sm:leading-8"
            style={{ animationDelay: '120ms' }}
          >
            {company.supportingTagline}
          </p>
        </div>

        <motion.div style={{ x: cardX, y: cardY }} className="hero-media relative z-20 grid gap-2 preserve-3d md:grid-cols-3 md:gap-3 lg:grid-cols-1 lg:gap-5">
          {services.map((service, index) => {
            const Icon = categoryIcons[index];

            return (
              <article
                key={service.title}
                className={`group relative grid grid-cols-[7rem_minmax(0,1fr)] items-stretch gap-3 overflow-hidden rounded-[1.25rem] border border-cream-100/20 bg-cream-50/10 p-3 shadow-botanical backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-earth-300/50 md:block md:rounded-[1.5rem] lg:grid lg:max-w-[32rem] lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-4 xl:grid-cols-[11rem_minmax(0,1fr)] ${cardOffsets[index]}`}
              >
                <div className="relative min-h-20 overflow-hidden rounded-[0.9rem] md:aspect-[4/3] md:min-h-0 md:rounded-[1.05rem] lg:aspect-auto lg:min-h-36">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 30vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
                </div>
                <div className="flex items-center gap-3 px-0 pb-0 md:mt-4 md:items-start md:px-1 md:pb-1 lg:mt-0 lg:items-center lg:px-0">
                  <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-earth-300/40 bg-forest-950/70 text-earth-300 sm:grid">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-cream-50">{service.title}</h2>
                    <p className="mt-2 hidden text-xs font-medium leading-5 text-cream-100/75 sm:line-clamp-2">{service.summary}</p>
                  </div>
                </div>
              </article>
            );
          })}
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
