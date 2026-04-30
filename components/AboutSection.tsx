import { company } from '@/lib/content';
import { Award, CheckCircle2, Droplets, Leaf, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Reveal from './ui/Reveal';

const aboutIcons = [Sparkles, Droplets, Leaf];

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

          <Reveal delay={0.08} className="mt-9">
            <div className="relative overflow-hidden rounded-lg border border-earth-500/35 bg-forest-950 px-5 py-7 text-cream-50 shadow-botanical sm:px-7 lg:px-8">
              <div className="absolute inset-x-0 top-0 h-1 bg-earth-300" />
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-earth-300/25" />
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-earth-300">About Us</p>
              <p className="mt-4 max-w-3xl text-xl font-extrabold leading-9 text-cream-50 sm:text-2xl sm:leading-10">
                {company.aboutIntro}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14} className="mt-5 grid gap-4">
            {company.aboutHighlights.map((highlight, index) => {
              const Icon = aboutIcons[index];

              return (
                <article
                  key={highlight.title}
                  className="rounded-lg border border-forest-950/10 bg-white/65 p-5 shadow-[0_16px_45px_rgba(7,19,13,.08)] backdrop-blur-md sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-950 text-earth-300 shadow-[0_12px_30px_rgba(7,19,13,.18)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-earth-700">{highlight.label}</p>
                      <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-forest-950 sm:text-3xl">
                        {highlight.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-base font-medium leading-8 text-forest-900/80">{highlight.text}</p>
                </article>
              );
            })}
          </Reveal>

          <Reveal delay={0.2} className="mt-5">
            <div className="rounded-lg border border-earth-500/25 bg-cream-50/85 p-5 shadow-[0_18px_50px_rgba(117,88,49,.14)] sm:p-6">
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-earth-300 text-forest-950">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <p className="font-serif text-[clamp(1.85rem,3vw,3rem)] font-medium leading-tight text-forest-950">
                  {company.aboutPromise}
                </p>
              </div>
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
