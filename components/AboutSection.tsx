import { company } from '@/lib/content';
import { Award, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Reveal from './ui/Reveal';

export default function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-cream-50">
      <div className="grid lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative min-h-[540px] overflow-hidden lg:min-h-[760px]">
          <Image
            src="/brand-assets/projects/portfolio-p33-01-Image181.webp"
            alt="Landscape maintenance and garden project"
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 rounded-[1.75rem] border border-cream-100/20 bg-forest-950/50 p-6 text-cream-50 shadow-botanical backdrop-blur-xl sm:left-10 sm:right-auto sm:max-w-md">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-earth-300">Business domains</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {company.domains.map((domain) => (
                <span key={domain} className="rounded-full border border-cream-100/15 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-cream-100/75">
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative bg-[linear-gradient(135deg,#fbf8ee,#efe4cf)] px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
          <div className="absolute right-8 top-10 h-28 w-28 rounded-full border border-earth-500/20" />
          <Reveal>
            <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.42em] text-earth-700">About</p>
            <h2 className="font-serif text-[clamp(3.1rem,6vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.055em] text-forest-950 text-balance">
              {company.name}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="mt-9 space-y-6 text-base leading-8 text-forest-900/100 sm:text-lg">
            <p>
              Established in {company.established}, we work from Hyderabad across landscaping, irrigation, and vertical gardening.
            </p>
            <p>
              We shape every site around nature-centric design, sustainability, eco-friendly landscaping, long-term maintenance, and spaces that feel both functional and aesthetic.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="mt-10">
            <div className="relative overflow-hidden rounded-lg border border-earth-500/35 bg-forest-950 px-5 py-7 text-cream-50 shadow-botanical sm:px-7">
              <div className="absolute inset-x-0 top-0 h-1 bg-earth-300" />
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-earth-300">Client confidence</p>
              <h3 className="mt-3 max-w-2xl font-serif text-[clamp(2.1rem,3.7vw,3.7rem)] font-medium leading-none text-cream-50">
                <span className="box-decoration-clone bg-earth-300 px-2 text-forest-950">
                  Why Clients Trust Vruksha Kuteeram
                </span>
              </h3>
              <ul className="mt-7 grid gap-3">
                {company.trustReasons.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-center gap-3 rounded-lg border border-earth-300/40 bg-cream-50 px-4 py-3 text-base font-bold leading-snug text-forest-950 shadow-[0_10px_24px_rgba(7,19,13,.18)] sm:text-lg"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-earth-300 text-forest-950">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <AwardsBand />
    </section>
  );
}

function AwardsBand() {
  return (
    <div className="relative overflow-hidden bg-forest-950 px-5 py-20 text-cream-50 sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,133,79,.20),transparent_24rem)]" />
      <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <Reveal>
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border border-earth-300/40 bg-cream-50/10 text-earth-300 shadow-gold backdrop-blur-md">
            <Award className="h-10 w-10" />
          </div>
          <h2 className="mt-8 max-w-xl font-serif text-[clamp(3rem,5.6vw,6rem)] font-medium leading-[0.9] tracking-[-0.055em]">
            {company.award}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-cream-100/100">
            Awarded to Mr. {company.founder} ({company.founderRole}) at {company.awardEvent}.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-5 sm:grid-cols-2">
          <div className="group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-earth-300/20 bg-cream-50/5 shadow-botanical">
            <Image
              src="/brand-assets/projects/portfolio-p36-01-Image192.webp"
              alt="Indian Leadership Award certificate"
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
          <div className="group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-earth-300/20 bg-cream-50/5 shadow-botanical sm:translate-y-10">
            <Image
              src="/brand-assets/projects/portfolio-p38-01-Image198.webp"
              alt="Indian Leadership Summit award event"
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
