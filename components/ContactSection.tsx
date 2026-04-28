'use client';

import { company } from '@/lib/content';
import { Mail, MapPin } from 'lucide-react';
import { FormEvent, useState } from 'react';
import MagneticButton from './ui/MagneticButton';
import Reveal from './ui/Reveal';

const fields = [
  { id: 'name', label: 'Your Name', type: 'text' },
  { id: 'email', label: 'Your Email', type: 'email' },
  { id: 'interest', label: 'Project Interest', type: 'text' }
];

export default function ContactSection() {
  const [status, setStatus] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent('Vruksha Kuteeram Landscape LLP enquiry');
    const body = encodeURIComponent(
      [
        `Name: ${data.get('name') ?? ''}`,
        `Email: ${data.get('email') ?? ''}`,
        `Project Interest: ${data.get('interest') ?? ''}`,
        `Message: ${data.get('message') ?? ''}`
      ].join('\n')
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setStatus('Email draft opened.');
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-cream-50 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-moss-300/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_25%,rgba(168,133,79,.18),transparent_22rem)]" />

      <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <Reveal>
          <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.42em] text-earth-700">Contact</p>
          <h2 className="max-w-2xl font-serif text-[clamp(3.2rem,6.4vw,7.2rem)] font-medium leading-[0.86] tracking-[-0.06em] text-forest-950 text-balance">
            Contact Vruksha Kuteeram.
          </h2>
          <div className="mt-10 grid gap-4 text-forest-900/100">
            <a href={`mailto:${company.email}`} className="focus-ring group flex items-center gap-4 rounded-[1.25rem] border border-forest-950/10 bg-white/50 p-4 transition-all duration-300 hover:border-earth-500/30 hover:shadow-gold">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-forest-950 text-earth-300 transition-transform duration-500 group-hover:rotate-6">
                <Mail className="h-5 w-5" />
              </span>
              <span className="break-all text-sm font-semibold sm:text-base">{company.email}</span>
            </a>
            <div className="flex items-start gap-4 rounded-[1.25rem] border border-forest-950/10 bg-white/50 p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest-950 text-earth-300">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold leading-7 sm:text-base">{company.address.join(', ')}</span>
            </div>
          </div>
          <div className="mt-8">
            <MagneticButton href={`mailto:${company.email}`} variant="dark">Email Directly</MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="botanical-border relative overflow-hidden rounded-[2rem] bg-white/50 p-4 shadow-botanical backdrop-blur-xl sm:p-7 lg:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-earth-500/50 to-transparent" />
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <label key={field.id} htmlFor={field.id} className={field.id === 'interest' ? 'group relative sm:col-span-2' : 'group relative'}>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required={field.id !== 'interest'}
                    placeholder=" "
                    className="peer h-16 w-full rounded-[1.15rem] border border-forest-950/10 bg-cream-50/50 px-5 pb-2 pt-8 text-sm font-semibold text-forest-950 outline-none transition-all duration-300 focus:border-earth-500 focus:bg-white"
                  />
                  <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-forest-900/50 transition-all duration-300 peer-focus:top-3 peer-focus:text-[0.66rem] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-earth-700 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[0.66rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em]">
                    {field.label}
                  </span>
                </label>
              ))}
              <label htmlFor="message" className="group relative sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder=" "
                  rows={6}
                  className="peer w-full resize-none rounded-[1.15rem] border border-forest-950/10 bg-cream-50/50 px-5 pb-3 pt-11 text-sm font-semibold text-forest-950 outline-none transition-all duration-300 focus:border-earth-500 focus:bg-white"
                />
                <span className="pointer-events-none absolute left-5 top-7 text-sm font-semibold text-forest-900/50 transition-all duration-300 peer-focus:top-4 peer-focus:text-[0.66rem] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-earth-700 peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[0.66rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em]">
                  Your Message
                </span>
              </label>
            </div>
            <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="min-h-6 text-xs font-semibold uppercase tracking-[0.2em] text-earth-700">{status}</p>
              <button className="focus-ring rounded-full bg-forest-950 px-7 py-4 text-[0.76rem] font-bold uppercase tracking-[0.2em] text-cream-50 transition-all duration-300 hover:-translate-y-1 hover:bg-earth-700 hover:shadow-gold" type="submit">
                Send Message
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
