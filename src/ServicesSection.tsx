import type { ReactNode } from 'react';

// Rounded liquid-glass pill used for the two group headings
function GlassPill({ children }: { children: ReactNode }) {
  return (
    <span data-scroll-reveal className="liquid-glass inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide text-white sm:text-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff5500]" />
      {children}
    </span>
  );
}

// Shared glass card surface
const cardBase =
  'liquid-glass relative flex w-full flex-col justify-start overflow-hidden rounded-3xl p-6 text-white sm:p-7';
const pillBase =
  'inline-flex w-fit items-center rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-wide';

export default function ServicesSection() {
  return (
    <section id="services" className="relative z-10">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 sm:px-12 sm:py-32 md:px-16 lg:px-20">

        {/* ----------------------------------------------------------------- */}
        {/* GROUP 1: CORE TECHNICAL SERVICES                                  */}
        {/* ----------------------------------------------------------------- */}
        <div className="space-y-10 sm:space-y-14">
          <div className="flex justify-center">
            <GlassPill>Core Technical Services</GlassPill>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">

            {/* CARD 1 — Front-End Development */}
            <div>
              <div className={cardBase}>
                <span data-scroll-reveal className={`${pillBase} relative z-10 border-white/30 text-white/80`}>Front-End</span>
                <div className="relative z-10 space-y-2.5 pt-8">
                  <h3 data-scroll-reveal className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                    Fast, fluid <span className="text-[#ff5500]">front-ends</span>
                  </h3>
                  <p data-scroll-reveal className="text-xs leading-relaxed text-white/75 sm:text-sm">
                    Everything the user sees and interacts with — responsive, mobile-optimized builds in HTML5, CSS3, JavaScript, React, Next.js &amp; Vue.js.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2 — Back-End Development */}
            <div className="md:translate-y-10">
              <div className={cardBase}>
                <span data-scroll-reveal className={`${pillBase} relative z-10 border-white/30 text-white/80`}>Back-End</span>
                <div className="relative z-10 space-y-2.5 pt-8">
                  <h3 data-scroll-reveal className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                    The engine behind the screen
                  </h3>
                  <p data-scroll-reveal className="text-xs leading-relaxed text-white/75 sm:text-sm">
                    Server-side logic, data storage &amp; integrations — databases like MySQL, PostgreSQL &amp; MongoDB, powered by Node.js, Laravel, Django or Python.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3 — Full-Stack Development */}
            <div>
              <div className={cardBase}>
                <span data-scroll-reveal className={`${pillBase} relative z-10 border-white/30 text-white/80`}>Full-Stack</span>
                <div className="relative z-10 space-y-2.5 pt-8">
                  <h3 data-scroll-reveal className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                    End-to-end, fully handled
                  </h3>
                  <p data-scroll-reveal className="text-xs leading-relaxed text-white/75 sm:text-sm">
                    Complete management of both client-side interfaces and server-side infrastructure — one pair of hands for the whole stack.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* GROUP 2: SPECIALIZED & PLATFORM-BASED SOLUTIONS                      */}
        {/* ------------------------------------------------------------------- */}
        <div className="mt-24 space-y-10 sm:mt-32 sm:space-y-14">
          <div className="flex justify-center">
            <GlassPill>Specialized &amp; Platform-Based Solutions</GlassPill>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">

            {/* CARD 4 — E-Commerce Buildouts */}
            <div className="md:translate-y-10">
              <div className={cardBase}>
                <span data-scroll-reveal className={`${pillBase} relative z-10 border-white/30 text-white/80`}>E-Commerce</span>
                <div className="relative z-10 space-y-2.5 pt-8">
                  <h3 data-scroll-reveal className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                    Stores you can <span className="text-[#ff8a3d]">actually manage</span>
                  </h3>
                  <p data-scroll-reveal className="text-xs leading-relaxed text-white/75 sm:text-sm">
                    Easy-to-manage web portals built on the platforms you know — WordPress, Shopify, Webflow &amp; WooCommerce.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 5 — SEO Tuning */}
            <div>
              <div className={cardBase}>
                <span data-scroll-reveal className={`${pillBase} relative z-10 border-white/30 text-white/80`}>SEO Tuning</span>
                <div className="relative z-10 space-y-2.5 pt-8">
                  <h3 data-scroll-reveal className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                    Faster sites, higher ranks
                  </h3>
                  <p data-scroll-reveal className="text-xs leading-relaxed text-white/75 sm:text-sm">
                    Core Web Vitals, database queries &amp; speed metrics optimized so search engines rank your website highly.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 6 — Care Plans */}
            <div className="md:translate-y-10">
              <div className={cardBase}>
                <span data-scroll-reveal className={`${pillBase} relative z-10 border-white/30 text-white/80`}>Care Plans</span>
                <div className="relative z-10 space-y-2.5 pt-8">
                  <h3 data-scroll-reveal className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                    Always on, <span className="text-[#ff8a3d]">always secure</span>
                  </h3>
                  <p data-scroll-reveal className="text-xs leading-relaxed text-white/75 sm:text-sm">
                    Continuous support — malware removal, third-party API updates &amp; cloud hosting management on AWS &amp; Vercel.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-lg leading-none text-[#ff5500]">✳</span>
                    <span className="text-sm font-bold tracking-tight text-white">Hadi Morph</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
