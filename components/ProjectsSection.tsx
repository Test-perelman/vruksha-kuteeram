'use client';

import { projectExperience, projects } from '@/lib/content';
import { VerticalImageStack, type VerticalImageStackItem } from '@/components/ui/vertical-image-stack';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Reveal from './ui/Reveal';

export default function ProjectsSection() {
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);
  const [currentProject, setCurrentProject] = useState<(typeof projects)[number]>(projects[0]);

  const syncCurrentProject = (item: VerticalImageStackItem) => {
    setCurrentProject(item as (typeof projects)[number]);
  };

  const openProject = (item: VerticalImageStackItem) => {
    setActive(item as (typeof projects)[number]);
  };

  return (
    <section id="projects" className="relative scroll-mt-24 overflow-hidden bg-forest-950 py-24 text-cream-50 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(168,133,79,.18),transparent_28rem),radial-gradient(circle_at_76%_48%,rgba(99,122,79,.22),transparent_30rem),linear-gradient(180deg,rgba(7,19,13,.4),rgba(7,19,13,0)_35%,rgba(7,19,13,.34))]" />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-earth-300/35 to-transparent" />

      <div className="relative mx-auto grid max-w-[1500px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,.84fr)_minmax(450px,1fr)] lg:items-center lg:gap-16 lg:px-12">
        <Reveal className="flex flex-col justify-center">
          <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.42em] text-earth-300">Projects</p>
          <h2 className="max-w-3xl font-serif text-[clamp(3rem,6.2vw,7rem)] font-medium leading-[0.88] tracking-[-0.055em] text-balance">
            8+ years of experience.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-cream-100/75 sm:text-lg sm:leading-9">
            Hundreds of completed projects serving clients across Telangana and Andhra Pradesh.
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mt-11 border-l border-earth-300/35 pl-5 sm:pl-7"
            >
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.28em] text-earth-300/90">{currentProject.type}</p>
              <h3 className="mt-4 max-w-xl font-serif text-4xl font-medium leading-[0.96] tracking-[-0.04em] text-cream-50 sm:text-5xl">
                {currentProject.name}
              </h3>
              <p className="mt-5 max-w-lg text-sm leading-7 text-cream-100/70">{currentProject.detail}</p>
              <button
                type="button"
                onClick={() => setActive(currentProject)}
                className="focus-ring mt-8 inline-flex items-center gap-3 rounded-full border border-earth-300/45 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-earth-300 transition-all duration-300 hover:bg-earth-300 hover:text-forest-950"
              >
                View project
                <ArrowUpRight className="size-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        </Reveal>

        <Reveal delay={0.12}>
          <VerticalImageStack items={projects} onActiveChange={syncCurrentProject} onOpen={openProject} className="lg:min-h-[680px]" />
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <Reveal className="border-t border-cream-100/10 pt-8">
          <p className="mb-5 text-[0.68rem] font-bold uppercase tracking-[0.34em] text-earth-300/90">Additional project experience</p>
          <div className="flex flex-wrap gap-2.5">
            {projectExperience.map((item) => (
              <span key={item} className="rounded-full border border-cream-100/10 bg-cream-50/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream-100/100">
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-forest-950/75 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              layoutId={active.name}
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative grid max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-earth-300/25 bg-cream-50 text-forest-950 shadow-botanical lg:grid-cols-[1.1fr_.9fr]"
            >
              <button
                aria-label="Close project modal"
                onClick={() => setActive(null)}
                className="focus-ring absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-forest-950/75 text-cream-50 backdrop-blur-md"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative min-h-[330px] lg:min-h-[620px]">
                <Image src={active.image} alt={active.name} fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.32em] text-earth-700">{active.type}</p>
                <h3 className="font-serif text-5xl font-medium leading-[0.92] tracking-[-0.05em] text-balance">{active.name}</h3>
                <p className="mt-7 text-base leading-8 text-forest-900/100">{active.detail}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
