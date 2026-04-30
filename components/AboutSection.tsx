import { associationItems, company, founderSection, trustCards } from '@/lib/content';
import { Award, BadgeCheck, CheckCircle2, Droplets, Leaf, ShieldCheck, Sparkles, Sprout, Wallet } from 'lucide-react';
import Image from 'next/image';
import Reveal from './ui/Reveal';

const aboutIcons = [Sparkles, Droplets, Leaf];
const trustIcons = [Sprout, ShieldCheck, Wallet];

export default function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-cream-50">
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#fbf8ee,#efe4cf)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full border border-earth-500/15" />
        <div className="absolute bottom-16 left-0 h-52 w-52 rounded-full border border-moss-500/15" />

        <div className="relative mx-auto max-w-[1500px]">
          <Reveal>
            <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.42em] text-earth-700">About</p>
            <h2 className="max-w-5xl font-serif text-[clamp(3.1rem,7vw,7.4rem)] font-medium leading-[0.86] tracking-[-0.055em] text-forest-950 text-balance">
              {company.name}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <div className="relative overflow-hidden rounded-lg border border-earth-500/35 bg-forest-950 px-5 py-7 text-cream-50 shadow-botanical sm:px-7 lg:px-10 lg:py-10">
              <div className="absolute inset-x-0 top-0 h-1 bg-earth-300" />
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-earth-300/25" />
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-earth-300">About Us</p>
              <p className="mt-5 max-w-5xl text-xl font-extrabold leading-9 text-cream-50 sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[1.45]">
                {company.aboutIntro}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14} className="mt-7">
            <div className="grid divide-y divide-forest-950/10 overflow-hidden rounded-lg border border-forest-950/10 bg-white/70 shadow-[0_18px_55px_rgba(7,19,13,.08)] backdrop-blur-md md:grid-cols-3 md:divide-x md:divide-y-0">
              {company.aboutHighlights.map((highlight, index) => {
                const Icon = aboutIcons[index] ?? Leaf;

                return (
                  <article key={highlight.title} className="relative p-5 sm:p-6 lg:p-8">
                    <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-forest-950 text-earth-300 shadow-[0_12px_30px_rgba(7,19,13,.18)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-earth-700">{highlight.label}</p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-forest-950 sm:text-3xl">{highlight.title}</h3>
                    <p className="mt-4 text-sm font-medium leading-7 text-forest-900/80 sm:text-base sm:leading-8">{highlight.text}</p>
                  </article>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-12">
            <blockquote className="border-t border-earth-500/30 pt-8">
              <div className="flex items-start gap-4">
                <span className="mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-earth-300 text-forest-950">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <p className="max-w-5xl font-serif text-[clamp(2.2rem,4.8vw,5.4rem)] italic leading-[0.98] tracking-[-0.04em] text-forest-950 text-balance">
                  {company.aboutPromise}
                </p>
              </div>
            </blockquote>
          </Reveal>
        </div>
      </div>

      <TrustBand />
      <FounderBand />
      <AssociationsBand />
      <AwardsOfRecognition />
    </section>
  );
}

function TrustBand() {
  return (
    <div className="relative overflow-hidden bg-forest-950 px-5 py-20 text-cream-50 sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(168,133,79,.22),transparent_26rem),radial-gradient(circle_at_88%_36%,rgba(99,122,79,.2),transparent_30rem)]" />
      <div className="relative mx-auto max-w-[1500px]">
        <Reveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.42em] text-earth-300">Why clients trust us</p>
            <h2 className="max-w-2xl font-serif text-[clamp(3rem,5.7vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.055em] text-balance">
              Built for the years after handover.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-cream-100/78 sm:text-lg sm:leading-9">
            The design has to look good. The plants also have to live well, the maintenance has to stay simple, and the client should know what is happening at every stage.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="grid divide-y divide-cream-100/12 overflow-hidden rounded-lg border border-cream-100/12 bg-cream-50/[0.06] shadow-botanical backdrop-blur-md lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {trustCards.map((card, index) => {
              const Icon = trustIcons[index] ?? BadgeCheck;

              return (
                <article key={card.title} className="p-6 sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-earth-300 text-forest-950">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-serif text-3xl font-medium leading-none tracking-[-0.035em] text-cream-50">{card.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-cream-100/78 sm:text-base sm:leading-8">{card.text}</p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function FounderBand() {
  return (
    <div className="relative overflow-hidden bg-cream-50 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(168,133,79,.12),transparent_34%,transparent_65%,rgba(99,122,79,.10))]" />
      <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.42em] text-earth-700">Founder</p>
          <h2 className="max-w-2xl font-serif text-[clamp(3.1rem,6vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.055em] text-forest-950 text-balance">
            A note from {company.founder}.
          </h2>
          <div className="mt-8 max-w-2xl border-l border-earth-500/40 pl-6">
            <p className="text-xl font-semibold leading-9 text-forest-950 sm:text-2xl sm:leading-10">{founderSection.intro}</p>
            <p className="mt-6 text-base leading-8 text-forest-900/78 sm:text-lg sm:leading-9">{founderSection.note}</p>
            <div className="mt-8">
              <p className="font-serif text-4xl italic leading-none tracking-[-0.04em] text-forest-950">{founderSection.signature}</p>
              <p className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-earth-700">{company.founderRole}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-5 sm:grid-cols-[.82fr_1fr] sm:items-end">
          {founderSection.images.map((item, index) => (
            <article
              key={item.title}
              className={`group relative overflow-hidden rounded-lg border border-forest-950/10 bg-white shadow-[0_24px_70px_rgba(7,19,13,.14)] ${
                index === 0 ? 'min-h-[520px]' : 'min-h-[390px] sm:translate-y-10'
              }`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes={index === 0 ? '(min-width: 1024px) 28vw, 100vw' : '(min-width: 1024px) 36vw, 100vw'}
                className="object-cover transition duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/86 via-forest-950/42 to-transparent p-5 text-cream-50 sm:p-6">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-earth-300">{item.title}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </div>
  );
}

function AssociationsBand() {
  return (
    <div className="relative overflow-hidden border-y border-forest-950/10 bg-[linear-gradient(180deg,#f7f0df,#fbf8ee)] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <Reveal className="grid gap-7 lg:grid-cols-[.76fr_1.24fr] lg:items-end">
          <div>
            <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.42em] text-earth-700">Membership & Associations</p>
            <h2 className="font-serif text-[clamp(2.8rem,5.2vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.055em] text-forest-950 text-balance">
              Relevant. Verified. Ready to refine.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-forest-900/78 sm:text-lg sm:leading-9">
            Formal membership details can be added after confirmation. For now, this section uses verified project and client associations already present in the brochure and current website assets.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {associationItems.map((item) => (
              <article key={item.name} className="rounded-lg border border-forest-950/10 bg-white/78 p-5 shadow-[0_16px_44px_rgba(7,19,13,.07)] backdrop-blur-md">
                <div className={`grid h-28 place-items-center rounded-md px-4 ${item.darkBackground ? 'bg-forest-950' : 'bg-cream-50'}`}>
                  <Image src={item.image} alt={item.name} width={220} height={110} className="max-h-20 w-full object-contain" />
                </div>
                <p className="mt-5 text-[0.63rem] font-bold uppercase tracking-[0.2em] text-earth-700">{item.label}</p>
                <h3 className="mt-2 text-sm font-extrabold leading-6 text-forest-950">{item.name}</h3>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function AwardsOfRecognition() {
  return (
    <div className="relative overflow-hidden bg-forest-950 px-5 py-20 text-cream-50 sm:px-8 lg:px-12 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,133,79,.20),transparent_24rem)]" />
      <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <Reveal>
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border border-earth-300/40 bg-cream-50/10 text-earth-300 shadow-gold backdrop-blur-md">
            <Award className="h-10 w-10" />
          </div>
          <h2 className="mt-8 max-w-xl font-serif text-[clamp(3rem,5.6vw,6rem)] font-medium leading-[0.9] tracking-[-0.055em]">
            Awards of Recognition
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-cream-100/100">
            {company.award} was awarded to Mr. {company.founder} ({company.founderRole}) at {company.awardEvent}.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-5 sm:grid-cols-2">
          <div className="group relative min-h-[420px] overflow-hidden rounded-lg border border-earth-300/20 bg-cream-50 shadow-botanical">
            <Image
              src="/brand-assets/projects/portfolio-p36-01-Image192.webp"
              alt="Indian Leadership Award 2019 certificate"
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-contain transition duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="group relative min-h-[420px] overflow-hidden rounded-lg border border-earth-300/20 bg-cream-50/5 shadow-botanical sm:translate-y-10">
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
