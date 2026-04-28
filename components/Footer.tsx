import { company, navigation } from '@/lib/content';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-forest-950 px-5 py-10 text-cream-50 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <a href="#home" className="focus-ring flex items-center gap-3 rounded-full">
          <span className="inline-flex rounded-[1.15rem] bg-cream-50 px-3 py-2">
            <Image
              src={company.logo}
              alt={company.name}
              width={190}
              height={89}
              className="h-auto w-40 object-contain"
            />
          </span>
          <span>
            <span className="block font-serif text-xl">{company.name}</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-cream-100/50">Established {company.established}</span>
          </span>
        </a>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-[0.2em] text-cream-100/50">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="focus-ring rounded-full transition-colors hover:text-earth-300">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
