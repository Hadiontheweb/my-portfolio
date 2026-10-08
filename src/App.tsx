import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MorphBackground from './MorphBackground';
import ServicesSection from './ServicesSection';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Cold Front',
    description: 'An expressive outerwear campaign built around bold, seasonal imagery.',
    category: 'Fashion campaign',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=85',
    alt: 'Model wearing a dark winter jacket outdoors',
  },
  {
    title: 'Off Hours',
    description: 'A streetwear concept with a confident visual identity and editorial direction.',
    category: 'Brand identity',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1000&q=85',
    alt: 'Contemporary streetwear editorial photography',
  },
  {
    title: 'Afterglow',
    description: 'A fashion story pairing striking portraiture with a modern digital presence.',
    category: 'Digital editorial',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    alt: 'High-fashion editorial portrait',
  },
  {
    title: 'Sundown',
    description: 'Warm, atmospheric campaign art direction for a hospitality brand.',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Cocktail styled for a hospitality campaign',
  },
  {
    title: 'Soft Form',
    description: 'A clean apparel collection presentation with a calm, tactile feel.',
    category: 'Product styling',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
    alt: 'Curated apparel collection flat lay',
  },
  {
    title: 'Good Energy',
    description: 'A refreshing packaging direction designed to stand out on the shelf.',
    category: 'Packaging concept',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1000&q=85',
    alt: 'Colorful beverage prepared for product photography',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '1990',
    description: 'Perfect for early-stage startups.',
    features: ['Logo', 'Color palette', 'Basic brand guide'],
  },
  {
    name: 'Pro plan',
    price: '2990',
    description: 'Ideal for businesses ready to scale.',
    features: ['Full visual identity', 'Brand strategy', 'Brand guide'],
    popular: true,
  },
  {
    name: 'Enterprise plan',
    price: '4990',
    description: 'Complete branding solution.',
    features: ['Brand strategy', 'Brand identity', 'Packaging and website'],
  },
];

export default function App() {
  const [activeNav, setActiveNav] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = appRef.current;
    if (!root) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-scroll-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });

      const contactSection = root.querySelector<HTMLElement>('#contact');
      const pricingSection = root.querySelector<HTMLElement>('#pricing');
      const contactBackground = root.querySelector<HTMLElement>('[data-contact-background]');
      if (contactSection && contactBackground) {
        gsap.fromTo(
          contactBackground,
          { scale: 1 },
          {
            scale: 1.3,
            ease: 'none',
            scrollTrigger: {
              trigger: pricingSection ?? contactSection,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      }
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={appRef} className="relative min-h-screen w-full bg-black text-white font-['DM_Sans',sans-serif] selection:bg-[#ff5500] selection:text-white flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* HEADER / NAVIGATION                                                       */}
      {/* Logo: Hadi Morph (no 'r')                                                 */}
      {/* Nav: Home, About, Projects (clean standard links)                         */}
      {/* CTA: Orange pill with white circular arrow                               */}
      {/* ========================================================================= */}
      <header className="absolute top-0 left-0 right-0 z-30 w-full pt-8 sm:pt-10 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between">
          
          {/* LOGO: Hadi Morph */}
          <div className="flex items-center">
            <a 
              href="#home"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
            >
              Hadi <span className="text-[#ff5500]">Morph</span>
            </a>
          </div>

          {/* DESKTOP NAV & CTA */}
          <div className="hidden md:flex items-center gap-10">
            {/* Nav links: Home, About, Projects */}
            <nav className="flex items-center gap-8 text-base">
              <a
                href="#home"
                onClick={() => setActiveNav('Home')}
                className={`relative py-1 transition-colors ${
                  activeNav === 'Home' 
                    ? 'text-white font-medium' 
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <span>Home</span>
                {activeNav === 'Home' && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#ff5500]" />
                )}
              </a>

              <a
                href="#about"
                onClick={() => setActiveNav('About')}
                className={`relative py-1 transition-colors ${
                  activeNav === 'About' 
                    ? 'text-white font-medium' 
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <span>About</span>
                {activeNav === 'About' && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#ff5500]" />
                )}
              </a>

              <a
                href="#services"
                onClick={() => setActiveNav('Services')}
                className={`relative py-1 transition-colors ${
                  activeNav === 'Services' 
                    ? 'text-white font-medium' 
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <span>Services</span>
                {activeNav === 'Services' && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#ff5500]" />
                )}
              </a>

              <a
                href="#projects"
                onClick={() => setActiveNav('Projects')}
                className={`relative py-1 transition-colors ${
                  activeNav === 'Projects' 
                    ? 'text-white font-medium' 
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <span>Projects</span>
                {activeNav === 'Projects' && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#ff5500]" />
                )}
              </a>
            </nav>

            {/* CTA BUTTON: Orange pill with white circular arrow icon */}
            <a
              href="#contact"
              className="group flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-[#ff5500] text-white font-semibold text-sm shadow-md shadow-[#ff5500]/20 hover:bg-[#ff6519] hover:shadow-lg hover:shadow-[#ff5500]/30 transition-all cursor-pointer active:scale-95"
            >
              <span>Get in touch</span>
              <span className="w-7 h-7 rounded-full bg-white text-[#ff5500] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </a>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="#contact"
              className="flex items-center gap-2 pl-3.5 pr-1 py-1 rounded-full bg-[#ff5500] text-white font-semibold text-xs shadow-md shadow-[#ff5500]/20 hover:bg-[#ff6519] transition-colors"
            >
              <span>Touch</span>
              <span className="w-6 h-6 rounded-full bg-white text-[#ff5500] flex items-center justify-center">
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </span>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col gap-3 text-base">
              <a
                href="#home"
                onClick={() => {
                  setActiveNav('Home');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-white font-medium py-1"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => {
                  setActiveNav('About');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-white/75 hover:text-white py-1"
              >
                About
              </a>
              <a
                href="#services"
                onClick={() => {
                  setActiveNav('Services');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-white/75 hover:text-white py-1"
              >
                Services
              </a>
              <a
                href="#projects"
                onClick={() => {
                  setActiveNav('Projects');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-white/75 hover:text-white py-1"
              >
                Projects
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* FIXED MORPH BACKGROUND                                                    */}
      {/* One continuous 180-frame timeline, fixed in place for the whole page —    */}
      {/* the hero and about content scroll over it; the background never moves.    */}
      {/* ========================================================================= */}
      <MorphBackground />

      {/* ========================================================================= */}
      {/* HERO SECTION — pinned content scrolling over the fixed morph background   */}
      {/* ========================================================================= */}
      <section id="home" className="relative z-10 h-[145vh] md:h-[165vh]">
        <div className="hero-visual sticky top-0 h-dvh w-full overflow-hidden">
        <div className="relative z-10 flex h-full w-full items-center px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid w-full grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end min-h-[50vh] sm:min-h-[54vh] lg:min-h-[58vh]">
          
          {/* LEFT COLUMN: Hey, I'm a + Web Designer & Developer */}
          <div className="hero-content relative isolate lg:col-span-7 flex flex-col justify-center select-none translate-y-5 lg:translate-y-8">
            <div className="relative z-10">
              {/* Orange Greeting */}
              <div className="mb-2 sm:mb-4">
                <span data-scroll-reveal className="hero-greeting text-[#FF5A00] text-xl sm:text-2xl md:text-[1.75rem] font-medium tracking-tight">
                  YOUR
                </span>
              </div>

              {/* Massive Headline: Web Designer & Developer */}
              <div>
                <h1 data-scroll-reveal className="hero-title text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.5rem] font-bold text-white tracking-[-0.03em] leading-[0.92]">
                  <span className="block">Web Designer</span>
                  <span className="hero-title-accent block">&amp; Developer</span>
                </h1>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Glassmorphism Card */}
          <div className="lg:col-span-5 flex flex-col justify-end lg:pb-4 xl:pb-6 lg:pl-4 xl:pl-8">
            <div className="liquid-glass relative w-full max-w-lg rounded-3xl p-7 sm:p-9 lg:p-10 overflow-hidden transition-all duration-300 group">
              {/* Ambient orange glow */}
              <div className="pointer-events-none absolute -top-24 -left-24 w-48 h-48 bg-[#ff5500]/10 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                {/* Secondary Bold Headline */}
                <h2 data-scroll-reveal className="text-2xl sm:text-3xl lg:text-[2.35rem] font-bold text-white tracking-tight leading-[1.18]">
                  A great website doesn't cost money, it <span className="text-[#ff5500]">makes money.</span>
                </h2>

                {/* Sub-paragraph */}
                <p data-scroll-reveal className="text-zinc-200 text-base sm:text-lg font-normal leading-relaxed mt-4 sm:mt-5">
                  From layout to launch, I build digital experiences that engage and expand.
                </p>

              </div>
            </div>
          </div>

        </div>
        </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECOND SECTION: TWO GLASSMORPHISM CARDS (LEFT & RIGHT)                   */}
      {/* - Scrolls over the FIXED morph background — one continuous timeline      */}
      {/* - Falling entrance animation triggered on scroll (non-looping)           */}
      {/* - Card sizes & text decreased for a more refined proportion              */}
      {/* - Center space kept completely blank on desktop                           */}
      {/* - Extraneous sector & count text removed                                 */}
      {/* ========================================================================= */}
      <section id="about" className="relative z-10 h-[155vh] md:h-[175vh]">
        <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <div
          className="relative z-10 flex h-full w-full items-center px-6 sm:px-8 md:px-10 lg:px-20"
        >
          <div className="grid w-full max-w-[1600px] mx-auto grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 lg:gap-8 items-center">
          
          {/* --------------------------------------------------------------------- */}
          {/* CARD 1 (LEFT): Behind the Designs / Shaping Experiences               */}
          {/* Horizontal on tablet & desktop with staggered vertical offset        */}
          {/* --------------------------------------------------------------------- */}
          <div className="md:col-span-5 flex justify-center md:justify-start md:translate-y-8 lg:translate-y-10">
            <div className="liquid-glass relative w-full max-w-[440px] rounded-3xl p-5 sm:p-7 md:p-6 lg:p-8 overflow-hidden group">

              <div className="relative z-10 space-y-4 sm:space-y-5">
               

                {/* Main Headline */}
                <h3 data-scroll-reveal className="text-xl sm:text-2xl lg:text-[2.2rem] font-bold text-white tracking-tight leading-[1.2]">
                  I shape the digital experiences that make your customer's journey effortless.
                </h3>

                {/* Platforms & Programming Languages Tags */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {['WordPress', 'Shopify', 'Wix', 'React', 'TypeScript', 'Tailwind', 'Next.js'].map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-zinc-200 bg-white/[0.04] border border-white/10 rounded-lg hover:border-[#ff5500]/50 hover:text-white transition-colors select-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* CENTER SPACE: Kept completely blank on tablet & desktop              */}
          {/* --------------------------------------------------------------------- */}
          <div className="hidden md:block md:col-span-2" aria-hidden="true" />

          {/* --------------------------------------------------------------------- */}
          {/* CARD 2 (RIGHT): Statement + Bottom Bar                                */}
          {/* Horizontal on tablet & desktop with staggered vertical offset        */}
          {/* --------------------------------------------------------------------- */}
          <div className="md:col-span-5 flex justify-center md:justify-end md:-translate-y-8 lg:-translate-y-10">
            <div className="liquid-glass relative w-full max-w-[440px] rounded-3xl p-5 sm:p-7 md:p-6 lg:p-8 overflow-hidden group">

              <div className="relative z-10 flex flex-col justify-between space-y-5 sm:space-y-6">
                
                {/* Main Statement */}
                <div>
                <span data-scroll-reveal className="mb-2 inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#ff9b73]">
                  About me
                </span>
                  <h3 data-scroll-reveal className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight leading-[1.3]">
                    I'm a product designer focused on building clean, intuitive interfaces that solve real-world problems.
                  </h3>
                </div>

                <div aria-label="Social profiles" className="flex flex-wrap gap-2">
                  {[
                    {
                      name: 'LinkedIn',
                      logo: (
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 9h3.56v11.45H3.56V9ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                      ),
                    },
                    {
                      name: 'Twitter',
                      logo: (
                        <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.49h2.04L6.49 3.24H4.3l13.31 17.4Z" />
                      ),
                    },
                    {
                      name: 'Facebook',
                      logo: (
                        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v1.9h-3v3.1h3v8h3.7Z" />
                      ),
                    },
                    {
                      name: 'Instagram',
                      logo: (
                        <>
                          <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                          <circle cx="17.5" cy="6.5" r="1.25" />
                        </>
                      ),
                    },
                  ].map(({ name, logo }) => (
                    <span
                      key={name}
                      role="img"
                      aria-label={name}
                      title={name}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all hover:border-[#ff9b73] hover:bg-[#ff9b73]/20 hover:text-[#ffb08e]"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                        {logo}
                      </svg>
                    </span>
                  ))}
                </div>

                {/* Bottom Bar: Action & Message */}
                <div className="pt-4 sm:pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span data-scroll-reveal className="text-[11px] sm:text-xs text-zinc-200 font-medium">
                    Let's Build Something Meaningful Together
                  </span>

                  <a
                    href="#contact"
                    data-scroll-reveal
                    className="group inline-flex items-center gap-2 pl-3.5 sm:pl-4 pr-1.5 py-1.5 rounded-full bg-[#ff5500] text-white font-semibold text-xs shadow-md hover:bg-[#ff6519] transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    <span>Get in touch</span>
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-[#ff5500] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                      <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                    </span>
                  </a>
                </div>

              </div>
            </div>
          </div>

          </div>
        </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SERVICES SECTION — normal-flow content scrolling over the fixed morph     */}
      {/* ========================================================================= */}
      <ServicesSection />

      <section
        id="projects"
        className="relative z-20 w-full rounded-t-[2.5rem] rounded-b-[2.5rem] bg-white px-6 py-20 text-zinc-950 sm:rounded-t-[3rem] sm:rounded-b-[3rem] sm:px-12 sm:py-28 md:px-16 lg:px-20"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="mb-10 max-w-3xl sm:mb-14">
            <span data-scroll-reveal className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#ff5a00]">
              Selected projects
            </span>
            <h2 data-scroll-reveal className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Thoughtful design.
              <span className="block text-zinc-500">Made to move businesses forward.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 items-end gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            {projects.map((project, index) => (
              <article key={project.title} data-scroll-reveal className="group flex h-full w-full flex-col">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="mt-5 flex flex-1 items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff5a00]">
                      {project.category}
                    </p>
                    <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{project.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-600 sm:text-base">
                      {project.description}
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 text-sm font-medium text-zinc-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="contact-pricing" className="relative z-10 -mt-10 sm:-mt-12">
        <div aria-hidden="true" className="pointer-events-none sticky top-0 -mb-[100svh] h-svh overflow-hidden">
          <img
            src="/images/cta-background.png"
            alt=""
            data-contact-background
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
          />
        </div>

        <section
          id="contact"
          className="relative z-10 flex min-h-[560px] w-full items-center justify-center overflow-hidden px-6 py-24 text-center text-white sm:min-h-[620px] sm:px-12 md:min-h-[70vh]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative z-10 mx-auto max-w-3xl">
            <span data-scroll-reveal className="mb-5 block text-base font-bold text-[#ff6a1a] sm:text-xl">
              Start your brand
            </span>
            <h2 data-scroll-reveal className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Let’s bring your
              <span className="block">brand to life</span>
            </h2>
            <p data-scroll-reveal className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-lg">
              Ready to make something amazing together? Whether you’re starting fresh or evolving your brand, I’m here to help.
            </p>
            <a
              href="mailto:ahmezzhadi@gmail.com?subject=Let%27s%20bring%20your%20brand%20to%20life"
              data-scroll-reveal
              className="group mx-auto mt-8 inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-sm font-semibold text-zinc-950 transition-transform hover:scale-[1.03] active:scale-95"
            >
              <span>Get in touch</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff5a00] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </span>
            </a>
          </div>
        </section>

        <section id="pricing" className="relative z-20 -mt-10 rounded-t-[2.5rem] bg-white px-6 py-20 text-zinc-950 sm:-mt-12 sm:rounded-t-[3rem] sm:px-12 sm:py-24 md:px-16 lg:px-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <span data-scroll-reveal className="mb-4 block text-sm font-semibold text-[#ff5a00]">
                Pricing
              </span>
              <h2 data-scroll-reveal className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                Simple Packages for Every Stage
              </h2>
              <p data-scroll-reveal className="mt-4 text-sm text-zinc-600 sm:text-base">
                Clear, flexible packages built to fit your brand’s stage.
              </p>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <article
                  key={plan.name}
                  data-scroll-reveal
                  className={`flex flex-col rounded-3xl p-1.5 ${
                    plan.popular ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-950'
                  }`}
                >
                  <div className={`rounded-2xl px-5 py-5 sm:px-6 ${plan.popular ? 'bg-zinc-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold">{plan.name}</h3>
                      {plan.popular && (
                        <span className="rounded-full bg-[#ff5a00] px-3 py-1 text-[10px] font-bold text-white">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-4xl font-bold tracking-tight sm:text-5xl">${plan.price}</span>
                      <span className={`text-xs ${plan.popular ? 'text-white/55' : 'text-zinc-500'}`}>/month</span>
                    </div>
                    <p className={`mt-3 text-xs ${plan.popular ? 'text-white/60' : 'text-zinc-500'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <ul className="flex-1 space-y-3 px-5 py-5 text-xs sm:px-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <Check className="h-3.5 w-3.5 shrink-0 text-[#ff5a00]" strokeWidth={2.5} />
                        <span className={plan.popular ? 'text-white/90' : 'text-zinc-600'}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`mailto:ahmezzhadi@gmail.com?subject=${encodeURIComponent(`Interested in the ${plan.name}`)}`}
                    className={`group mx-3 mb-3 inline-flex items-center justify-between rounded-full py-1.5 pl-5 pr-1.5 text-xs font-semibold transition-transform hover:scale-[1.02] active:scale-95 ${
                      plan.popular ? 'bg-white text-zinc-950' : 'bg-zinc-950 text-white'
                    }`}
                  >
                    <span>Get in touch</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff5a00] text-white">
                      <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
