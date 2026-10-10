import type { ReactNode } from 'react';
import { GlassEffect } from './components/ui/liquid-glass';

const coreServices = [
  {
    category: 'Front-End',
    title: <>Fast, fluid <span className="text-[var(--brand-highlight)]">front-ends</span></>,
    description:
      'Everything the user sees and interacts with — responsive, mobile-optimized builds in HTML5, CSS3, JavaScript, React, Next.js & Vue.js.',
  },
  {
    category: 'Back-End',
    title: <>The engine behind the screen</>,
    description:
      'Server-side logic, data storage & integrations — databases like MySQL, PostgreSQL & MongoDB, powered by Node.js, Laravel, Django or Python.',
  },
  {
    category: 'Full-Stack',
    title: <>End-to-end, fully handled</>,
    description:
      'Complete management of both client-side interfaces and server-side infrastructure — one pair of hands for the whole stack.',
  },
];

const specializedServices = [
  {
    category: 'E-Commerce',
    title: <>Stores you can <span className="text-[var(--brand-highlight)]">actually manage</span></>,
    description:
      'Easy-to-manage web portals built on the platforms you know — WordPress, Shopify, Webflow & WooCommerce.',
  },
  {
    category: 'SEO Tuning',
    title: <>Faster sites, higher ranks</>,
    description:
      'Core Web Vitals, database queries & speed metrics optimized so search engines rank your website highly.',
  },
  {
    category: 'Care Plans',
    title: <>Always on, <span className="text-[var(--brand-highlight)]">always secure</span></>,
    description:
      'Continuous support — malware removal, third-party API updates & cloud hosting management on AWS & Vercel.',
  },
];

function ServiceGroup({
  title,
  services,
  startIndex,
}: {
  title: string;
  services: typeof coreServices;
  startIndex: number;
}) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="flex items-center gap-4">
        <h3 className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 sm:text-sm">
          {title}
        </h3>
        <div aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-[var(--brand-secondary)]/50 to-transparent" />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6">
        {services.map((service, index) => (
          <GlassEffect
            key={service.category}
            className="group min-h-[250px] p-6 transition duration-300 hover:-translate-y-1 sm:p-7 lg:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 z-0 h-56 w-56 rounded-full bg-[var(--brand-primary)]/25 blur-[90px] transition-colors duration-500 group-hover:bg-[var(--brand-secondary)]/35"
            />
            <div className="relative z-10 flex h-full flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex rounded-full border border-[var(--brand-highlight)]/30 bg-[var(--brand-primary)]/20 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--brand-soft)]">
                  {service.category}
                </span>
                <span aria-hidden="true" className="font-mono text-xs text-white/35">
                  {String(startIndex + index).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
                  {service.title}
                </h4>
                <p className="text-sm leading-relaxed text-white/70">
                  {service.description}
                </p>
              </div>
            </div>
          </GlassEffect>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span
      data-scroll-reveal
      className="relative isolate inline-flex overflow-hidden rounded-full border border-white/30 bg-gradient-to-b from-white/20 via-[var(--brand-primary)]/60 to-[var(--brand-primary)]/85 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_4px_16px_rgba(142,30,162,0.3),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_4px_rgba(0,0,0,0.28)] ring-1 ring-inset ring-white/20 backdrop-blur-xl"
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-px rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent" />
      <span className="relative">{children}</span>
    </span>
  );
}

export default function ServicesSection() {
  return (
    <div className="services-section-background relative z-20 min-h-[100svh] bg-[#100817]">
    <section id="services" className="services-section-background relative isolate min-h-[100svh] overflow-hidden border border-white/10 bg-[#0b0710]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-24 h-[34rem] w-[34rem] rounded-full bg-[var(--brand-primary)]/30 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-[42rem] h-[34rem] w-[34rem] rounded-full bg-[var(--brand-secondary)]/25 blur-[140px]"
      />
      <div aria-hidden="true" className="section-pattern-overlay section-pattern-services" />

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col px-6 py-24 sm:px-12 sm:py-32 md:px-16 lg:px-20" style={{ rowGap: '3.5rem' }}>
        <div className="max-w-3xl">
          <SectionLabel>Services</SectionLabel>
          <h2 data-scroll-reveal className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
            Made to work.
            <span className="block text-[var(--brand-soft)]">Built to grow.</span>
          </h2>
          <p data-scroll-reveal className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Thoughtful design and dependable development, from the first idea to the details that keep a site running.
          </p>
        </div>

        <div className="flex flex-col" style={{ rowGap: '3.5rem' }}>
          <ServiceGroup title="Core technical services" services={coreServices} startIndex={1} />
          <ServiceGroup title="Specialized & platform-based solutions" services={specializedServices} startIndex={4} />
        </div>
      </div>
    </section>
    </div>
  );
}
