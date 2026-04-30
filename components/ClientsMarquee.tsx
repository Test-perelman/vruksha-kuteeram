import { clientLogos } from '@/lib/content';
import Image from 'next/image';
import Reveal from './ui/Reveal';

export default function ClientsMarquee() {
  const logos = [...clientLogos, ...clientLogos];

  return (
    <section id="clients" className="relative scroll-mt-24 overflow-hidden border-y border-forest-950/10 bg-cream-50 py-16">
      <div className="mx-auto mb-9 flex max-w-[1500px] items-end justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.42em] text-earth-700">Clients</p>
        </Reveal>
      </div>
      <div className="marquee-mask relative flex overflow-hidden">
        <div className="flex min-w-max animate-marquee items-center gap-5 pr-5 hover:[animation-play-state:paused]">
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="group grid h-28 w-56 place-items-center rounded-[1.5rem] border border-forest-950/10 bg-white/100 px-6 shadow-[0_18px_50px_rgba(7,19,13,.06)] transition-all duration-500 hover:-translate-y-1 hover:border-earth-500/30 hover:shadow-gold"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={180}
                height={84}
                loading="eager"
                className="max-h-16 w-auto object-contain opacity-100 transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
