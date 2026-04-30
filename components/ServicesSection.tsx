'use client';

import { services } from '@/lib/content';
import { PanelsTopLeft, Sprout, Trees } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Reveal from './ui/Reveal';

const icons = [Trees, Sprout, PanelsTopLeft];

export default function ServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden bg-grain px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="pointer-events-none absolute left-0 top-16 h-[34rem] w-[22rem] rounded-full border border-earth-300/20 opacity-50 blur-[1px]" />
      <div className="mx-auto max-w-[1500px]">
        <Reveal className="mb-14 grid gap-8 lg:grid-cols-[0.74fr_1fr] lg:items-end">
          <div>
            <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.42em] text-earth-700">Services</p>
            <h2 className="max-w-2xl font-serif text-[clamp(3rem,6vw,6.8rem)] font-medium leading-[0.9] tracking-[-0.055em] text-forest-950 text-balance">
              Landscaping. Indoor Garden. Vertical Gardening.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-forest-900/100 sm:text-lg">
            Nature-focused outdoor spaces, indoor gardens, and vertical greenery designed for homes, campuses, and commercial environments.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} Icon={icons[index]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  Icon
}: {
  service: (typeof services)[number];
  index: number;
  Icon: (typeof icons)[number];
}) {
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)');

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setTransform(`perspective(1000px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-8px)`);
      }}
      onMouseLeave={() => setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)')}
      style={{ transform }}
      className="group relative min-h-[410px] overflow-hidden rounded-[2rem] border border-forest-950/10 bg-forest-950 text-cream-50 shadow-botanical transition-transform duration-300 ease-silk xl:min-h-[500px]"
    >
      <Image
        src={service.image}
        alt={service.title}
        fill
        sizes="(min-width: 1024px) 31vw, (min-width: 768px) 45vw, 100vw"
        className="object-cover opacity-70 transition duration-700 group-hover:scale-[1.08] group-hover:opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-forest-950/10" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-full border border-earth-300/40 bg-forest-950/50 text-earth-300 backdrop-blur-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-serif text-2xl font-semibold leading-tight tracking-[-0.02em]">{service.title}</h3>
        <p className="mt-3 text-sm leading-7 text-cream-100/100">{service.summary}</p>
        <div className="grid max-h-0 gap-2 overflow-hidden pt-0 opacity-0 transition-all duration-500 ease-silk group-hover:max-h-56 group-hover:pt-5 group-hover:opacity-100">
          {service.points.map((point) => (
            <div key={point} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cream-100/100">
              <span className="h-1.5 w-1.5 rounded-full bg-earth-300" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
