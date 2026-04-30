import { clientLogos } from '@/lib/content';
import Image from 'next/image';
import Reveal from './ui/Reveal';

export default function ClientsMarquee() {
  const logos = [...clientLogos, ...clientLogos];

  return (
    <section id="clients" className="relative scroll-mt-24 overflow-hidden border-y border-forest-950/10 bg-cream-50 py-14 sm:py-16">
      <div className="mx-auto mb-8 flex max-w-[1500px] items-end justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.42em] text-earth-700">Clients</p>
        </Reveal>
      </div>
      <div className="marquee-mask relative flex overflow-hidden">
        <div className="flex min-w-max animate-marquee items-center gap-9 pr-9 hover:[animation-play-state:paused] sm:gap-12 sm:pr-12">
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="group grid h-32 w-64 place-items-center px-4 transition duration-500 hover:-translate-y-1 sm:h-36 sm:w-80"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={300}
                height={150}
                loading="eager"
                className="h-24 w-full max-w-[16rem] object-contain opacity-100 drop-shadow-[0_10px_18px_rgba(7,19,13,.08)] transition duration-500 group-hover:scale-[1.04] sm:h-28 sm:max-w-[19rem]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
