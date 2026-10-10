import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, ExternalLink, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServicesSection from './ServicesSection';
import ProcessSection from './ProcessSection';
import FAQSection from './FAQSection';
import GradientWaves from './GradientWaves';
import { GlassEffect, GlassFilter } from './components/ui/liquid-glass';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Cold Front',
    description: 'An expressive outerwear campaign built around bold, seasonal imagery.',
    category: 'Fashion campaign',
    href: '#projects',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=75',
    alt: 'Model wearing a dark winter jacket outdoors',
  },
  {
    title: 'Off Hours',
    description: 'A streetwear concept with a confident visual identity and editorial direction.',
    category: 'Brand identity',
    href: '#projects',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=800&q=75',
    alt: 'Contemporary streetwear editorial photography',
  },
  {
    title: 'Afterglow',
    description: 'A fashion story pairing striking portraiture with a modern digital presence.',
    category: 'Digital editorial',
    href: '#projects',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=75',
    alt: 'High-fashion editorial portrait',
  },
  {
    title: 'Sundown',
    description: 'Warm, atmospheric campaign art direction for a hospitality brand.',
    category: 'Hospitality',
    href: '#projects',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=75',
    alt: 'Cocktail styled for a hospitality campaign',
  },
  {
    title: 'Soft Form',
    description: 'A clean apparel collection presentation with a calm, tactile feel.',
    category: 'Product styling',
    href: '#projects',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=75',
    alt: 'Curated apparel collection flat lay',
  },
  {
    title: 'Good Energy',
    description: 'A refreshing packaging direction designed to stand out on the shelf.',
    category: 'Packaging concept',
    href: '#projects',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=75',
    alt: 'Colorful beverage prepared for product photography',
  },
];

const caseStudyDetails: Record<string, { overview: string; direction: string; gallery: { image: string; alt: string }[] }> = {
  'Cold Front': {
    overview: 'A seasonal campaign concept balancing the practical nature of outerwear with expressive fashion imagery.',
    direction: 'Cinematic framing, deep tones, and an outdoor setting give the collection a confident, cold-weather character.',
    gallery: [
      { image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=75', alt: 'Fashion editorial portrait in an urban setting' },
      { image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=75', alt: 'Fashion campaign styling and wardrobe' },
    ],
  },
  'Off Hours': {
    overview: 'A streetwear identity concept shaped for apparel, campaign imagery, and a modern digital presence.',
    direction: 'Candid compositions and confident styling keep the visual language relaxed, youthful, and rooted in everyday culture.',
    gallery: [
      { image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=75', alt: 'Streetwear look in an urban setting' },
      { image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=75', alt: 'Modern apparel collection' },
    ],
  },
  Afterglow: {
    overview: 'A fashion editorial concept where portraiture and a clean digital layout work together to present a collection.',
    direction: 'A restrained palette and image-led pacing let expressive portraits carry the story from first impression to detail.',
    gallery: [
      { image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=75', alt: 'Fashion portrait in soft natural light' },
      { image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=75', alt: 'High-fashion editorial portrait' },
    ],
  },
  Sundown: {
    overview: 'A hospitality campaign concept designed to introduce a venue and make its atmosphere feel inviting.',
    direction: 'Rich color, warm lighting, and close-up details create an intimate sense of place and occasion.',
    gallery: [
      { image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=75', alt: 'Warmly lit restaurant interior' },
      { image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=75', alt: 'Welcoming dining space' },
    ],
  },
  'Soft Form': {
    overview: 'A calm product presentation for an apparel collection, with tactile styling that gives each piece room to breathe.',
    direction: 'Soft neutrals, balanced compositions, and considered details create a cohesive visual rhythm across the range.',
    gallery: [
      { image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=75', alt: 'Apparel styled for a collection' },
      { image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=75', alt: 'Minimal fashion styling and wardrobe' },
    ],
  },
  'Good Energy': {
    overview: 'A bright packaging concept that gives a refreshing drink a playful, shelf-ready personality.',
    direction: 'Vivid color, clean layouts, and simple product-focused compositions make the concept feel fresh and approachable.',
    gallery: [
      { image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=75', alt: 'Colorful refreshing drink served over ice' },
      { image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=75', alt: 'Vibrant beverage product styling' },
    ],
  },
};

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

const socialProfiles = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mohi-uddin-al-hadi-088a35365/',
    logo: (
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 9h3.56v11.45H3.56V9ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/Hadiontheweb',
    logo: (
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.49h2.04L6.49 3.24H4.3l13.31 17.4Z" />
    ),
  },
  {
    name: 'Facebook',
    href: null,
    logo: (
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v1.9h-3v3.1h3v8h3.7Z" />
    ),
  },
  {
    name: 'Instagram',
    href: null,
    logo: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.25" />
      </>
    ),
  },
];

export default function App() {
  const [activeNav, setActiveNav] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const projectTriggerRef = useRef<HTMLButtonElement>(null);
  const caseStudyCloseRef = useRef<HTMLButtonElement>(null);
  const caseStudyDialogRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    caseStudyCloseRef.current?.focus();

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
        return;
      }

      if (event.key !== 'Tab' || !caseStudyDialogRef.current) return;
      const focusableElements = caseStudyDialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleDialogKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleDialogKeyDown);
      projectTriggerRef.current?.focus();
    };
  }, [selectedProject]);

  return (
    <div ref={appRef} className="relative min-h-screen w-full bg-[#100817] text-white font-['DM_Sans',sans-serif] selection:bg-[var(--brand-primary)] selection:text-white flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* HEADER / NAVIGATION                                                       */}
      {/* Logo: Hadi Morph (no 'r')                                                 */}
      {/* Nav: Home, About, Projects (clean standard links)                         */}
      {/* CTA: Orange pill with white circular arrow                               */}
      {/* ========================================================================= */}
      <GlassFilter />
      <header className="fixed left-0 right-0 top-4 z-50 flex w-full justify-center px-4 sm:top-6">
        <GlassEffect className="w-full max-w-[1600px] px-4 py-3 sm:w-fit sm:px-6 sm:py-3.5">
          <div className="flex items-center justify-between gap-3 sm:justify-center sm:gap-6 lg:gap-8">
            <a
              href="#home"
              className="shrink-0 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90 sm:text-2xl"
            >
              Hadi <span className="text-[var(--brand-soft)]">Morph</span>
            </a>

            <div className="hidden items-center gap-6 md:flex lg:gap-8">
              <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm lg:gap-7">
                {(['Home', 'About', 'Services', 'Process', 'Projects'] as const).map((item) => {
                  const href = item === 'Home' ? '#home' : `#${item.toLowerCase()}`;
                  return (
                    <a
                      key={item}
                      href={href}
                      onClick={() => setActiveNav(item)}
                      aria-current={activeNav === item ? 'page' : undefined}
                      className={`relative py-2 transition-colors ${
                        activeNav === item ? 'font-semibold text-white' : 'text-white/75 hover:text-white'
                      }`}
                    >
                      {item}
                      {activeNav === item && (
                        <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[var(--brand-soft)]" />
                      )}
                    </a>
                  );
                })}
              </nav>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] py-1 pl-4 pr-1 text-sm font-semibold text-white shadow-md shadow-[var(--brand-primary)]/30 transition-all hover:bg-[var(--brand-secondary)] active:scale-95"
              >
                <span>Get in touch</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--brand-primary)] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
              </a>
            </div>

            <div className="flex shrink-0 items-center gap-2 md:hidden">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--brand-primary)] py-1 pl-3.5 pr-1 text-xs font-semibold text-white transition-colors hover:bg-[var(--brand-secondary)]"
              >
                <span>Get in touch</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[var(--brand-primary)]">
                  <ArrowRight className="h-3 w-3 stroke-[2.5]" />
                </span>
              </a>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-xl border border-white/20 bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <nav aria-label="Mobile navigation" className="mt-4 grid gap-1 border-t border-white/15 pt-3 md:hidden">
              {(['Home', 'About', 'Services', 'Process', 'Projects'] as const).map((item) => {
                const href = item === 'Home' ? '#home' : `#${item.toLowerCase()}`;
                return (
                  <a
                    key={item}
                    href={href}
                    onClick={() => {
                      setActiveNav(item);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      activeNav === item ? 'bg-white/15 font-semibold text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item}
                  </a>
                );
              })}
            </nav>
          )}
        </GlassEffect>
      </header>

      <div className="relative isolate">
      {/* ========================================================================= */}
      {/* HERO SECTION                                                              */}
      {/* ========================================================================= */}
      <section id="home" className="sticky top-0 z-0 h-dvh">
        <div className="hero-visual relative h-dvh w-full overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 z-0 bg-[#210b26]">
          <GradientWaves
            horizonColor="#8E1EA2"
            waveColor="#C654C3"
            crestColor="#FFC0DE"
            speed={0.4}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1}
            height={5.5}
            fogDepth={15}
            detail="low"
            brightness={1.2}
            opacity={0.95}
            mouseInteraction
            parallaxStrength={0.35}
            grain={false}
            grainIntensity={0}
            dpr={0.65}
          />
        </div>
        <div className="relative z-10 flex h-full w-full items-center px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT COLUMN: Hey, I'm a + Web Designer & Developer */}
          <div className="hero-content relative isolate flex select-none flex-col justify-center lg:col-span-7">
            <div className="relative z-10">
              {/* Orange Greeting */}
              <div className="mb-2 sm:mb-4">
                <span data-scroll-reveal className="hero-greeting text-[var(--brand-highlight)] text-xl sm:text-2xl md:text-[1.75rem] font-medium tracking-tight">
                  YOUR
                </span>
              </div>

              {/* Massive Headline: Web Designer & Developer */}
              <div>
                <h1 data-scroll-reveal className="hero-title text-6xl sm:text-7xl md:text-8xl lg:text-[4.25rem] xl:text-[7rem] 2xl:text-[8.5rem] font-bold text-white tracking-[-0.03em] leading-[0.92]">
                  <span className="block">Web Designer</span>
                  <span className="hero-title-accent block">&amp; Developer</span>
                </h1>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Glassmorphism Card */}
          <div className="flex flex-col justify-center lg:col-span-5 lg:pl-4 xl:pl-8">
            <GlassEffect className="group w-full max-w-lg p-7 transition-all duration-300 sm:p-9 lg:p-10">
              {/* Ambient orange glow */}
              <div className="pointer-events-none absolute -top-24 -left-24 w-48 h-48 bg-[var(--brand-secondary)]/20 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                {/* Secondary Bold Headline */}
                <h2 data-scroll-reveal className="text-2xl sm:text-3xl lg:text-[2.35rem] font-bold text-white tracking-tight leading-[1.18]">
                  A great website doesn't cost money, it <span className="text-[var(--brand-highlight)]">makes money.</span>
                </h2>

                {/* Sub-paragraph */}
                <p data-scroll-reveal className="text-zinc-200 text-base sm:text-lg font-normal leading-relaxed mt-4 sm:mt-5">
                  From layout to launch, I build digital experiences that engage and expand.
                </p>

              </div>
            </GlassEffect>
          </div>

        </div>
        </div>
        </div>
      </section>

      <section id="about" className="section-sticky section-top-rounded relative z-10 isolate overflow-hidden border-t border-white/10 sm:rounded-t-[3.5rem]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0b0710_0%,#13091a_48%,#09070d_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-48 top-24 h-[34rem] w-[34rem] rounded-full bg-[var(--brand-primary)]/25 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 top-[28rem] h-[34rem] w-[34rem] rounded-full bg-[var(--brand-secondary)]/20 blur-[140px]"
        />
        <div aria-hidden="true" className="section-pattern-overlay section-pattern-about" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 py-24 sm:px-12 sm:py-32 md:px-16 lg:px-20">
          <div className="mb-10 grid items-center gap-9 sm:mb-14 md:grid-cols-12 lg:gap-12">
            <div className="order-1 max-w-3xl md:order-2 md:col-span-7 md:col-start-6">
              <span data-scroll-reveal className="relative isolate mb-5 inline-flex overflow-hidden rounded-full border border-white/30 bg-gradient-to-b from-white/20 via-[var(--brand-primary)]/60 to-[var(--brand-primary)]/85 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_4px_16px_rgba(142,30,162,0.3),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_4px_rgba(0,0,0,0.28)] ring-1 ring-inset ring-white/20 backdrop-blur-xl transition duration-300 hover:brightness-110">
                <span aria-hidden="true" className="pointer-events-none absolute inset-px rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent" />
                <span className="relative">A little about me</span>
              </span>
              <h2 data-scroll-reveal className="text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
                Thoughtful design.
                <span className="block text-[var(--brand-soft)]">Built for real life.</span>
              </h2>
            </div>
            <div className="relative order-2 mx-auto w-full max-w-[340px] md:order-1 md:col-span-5 md:col-start-1 md:justify-self-start">
              <div aria-hidden="true" className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-[var(--brand-primary)]/45 via-[var(--brand-secondary)]/15 to-[var(--brand-soft)]/30 blur-2xl" />
              <div className="liquid-glass group relative aspect-[4/5] overflow-hidden rounded-[2rem] p-2">
                <img
                  src="/images/hadi-profile.webp"
                  alt="Portrait of Hadi"
                  className="h-full w-full rounded-[1.55rem] object-cover object-[center_32%] transition-transform duration-700 group-hover:scale-[1.035]"
                  loading="lazy"
                  decoding="async"
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-[1.55rem] bg-gradient-to-t from-[#100713]/90 via-transparent to-[var(--brand-primary)]/10" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xl font-bold tracking-tight text-white">Hadi</p>
                    <p className="text-xs font-medium text-white/75">Designer &amp; Developer</p>
                  </div>
                  <span className="mb-1 h-2.5 w-2.5 rounded-full bg-[var(--brand-highlight)] shadow-[0_0_16px_var(--brand-highlight)]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid items-stretch gap-5 md:grid-cols-12 md:gap-6 lg:gap-8">
            <GlassEffect className="group min-h-[340px] p-7 sm:p-9 md:col-span-7 md:p-10 lg:p-12">
              <div className="pointer-events-none absolute -right-16 -top-20 z-0 h-64 w-64 rounded-full bg-[var(--brand-primary)]/35 blur-[90px] transition-opacity duration-500 group-hover:opacity-80" />
              <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                <div>
                  <span data-scroll-reveal className="mb-5 inline-flex rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">
                    Design with purpose
                  </span>
                  <h3 data-scroll-reveal className="max-w-2xl text-3xl font-bold leading-[1.12] tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                    I shape digital experiences that make your customer&apos;s journey <span className="text-[var(--brand-highlight)]">effortless.</span>
                  </h3>
                </div>
                <div className="border-t border-white/15 pt-5">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Tools I work with</p>
                  <div className="flex flex-wrap gap-2">
                    {['WordPress', 'Shopify', 'Wix', 'React', 'TypeScript', 'Tailwind', 'Next.js'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/85 transition-colors hover:border-[var(--brand-highlight)]/60 hover:bg-[var(--brand-primary)]/25"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassEffect>

            <GlassEffect className="group min-h-[340px] p-7 sm:p-9 md:col-span-5 md:p-10">
              <div className="pointer-events-none absolute -bottom-24 -right-20 z-0 h-64 w-64 rounded-full bg-[var(--brand-secondary)]/30 blur-[90px] transition-opacity duration-500 group-hover:opacity-80" />
              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                <div>
                  <span data-scroll-reveal className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-highlight)]">
                    About me
                  </span>
                  <h3 data-scroll-reveal className="text-2xl font-bold leading-[1.25] tracking-tight text-white sm:text-3xl">
                    I&apos;m a product designer focused on building clean, intuitive interfaces that solve real-world problems.
                  </h3>
                </div>

                <div>
                  <div aria-label="Social profiles" className="mb-6 flex flex-wrap gap-2.5">
                    {socialProfiles.map(({ name, href, logo }) => {
                      const icon = (
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                          {logo}
                        </svg>
                      );
                      const className = 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/[0.06] text-white/90 transition-all hover:border-[var(--brand-highlight)]/70 hover:bg-[var(--brand-primary)]/30 hover:text-white';

                      return href ? (
                        <a
                          key={name}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={name}
                          title={name}
                          className={className}
                        >
                          {icon}
                        </a>
                      ) : (
                        <span key={name} role="img" aria-label={name} title={name} className={className}>
                          {icon}
                        </span>
                      );
                    })}
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center">
                    <span data-scroll-reveal className="max-w-[180px] text-xs font-medium leading-relaxed text-white/70">
                      Let&apos;s build something meaningful together.
                    </span>
                    <a
                      href="#contact"
                      data-scroll-reveal
                      className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--brand-primary)] py-1.5 pl-4 pr-1.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-[var(--brand-secondary)] active:scale-95"
                    >
                      <span>Get in touch</span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[var(--brand-primary)] transition-transform duration-300 group-hover:translate-x-0.5">
                        <ArrowRight className="h-3 w-3 stroke-[2.5]" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </GlassEffect>
          </div>
        </div>
      </section>
      </div>

      {/* ========================================================================= */}
      {/* SERVICES SECTION                                                          */}
      {/* ========================================================================= */}
      <ServicesSection />
      <div className="process-section-background relative z-30 bg-[#120913]">
        <ProcessSection />
      </div>

      <div className="projects-section-background relative z-40 bg-[#100817]">
        <section
          id="projects"
          className="relative isolate min-h-[100svh] w-full overflow-hidden border border-white/10 bg-[#0b0710] px-6 py-24 text-white sm:px-12 sm:py-32 md:px-16 lg:px-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 12% 10%, rgba(142, 30, 162, 0.3), transparent 38%), radial-gradient(ellipse at 92% 56%, rgba(198, 84, 195, 0.2), transparent 40%), linear-gradient(180deg, #100817 0%, #14091a 52%, #0b0710 100%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-48 top-24 h-[34rem] w-[34rem] rounded-full bg-[var(--brand-primary)]/20 blur-[130px]"
          />
          <div aria-hidden="true" className="section-pattern-overlay section-pattern-projects" />

          <div className="relative mx-auto w-full max-w-[1600px]">
            <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <span data-scroll-reveal className="relative isolate mb-5 inline-flex overflow-hidden rounded-full border border-white/30 bg-gradient-to-b from-white/20 via-[var(--brand-primary)]/60 to-[var(--brand-primary)]/85 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_4px_16px_rgba(142,30,162,0.3),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_4px_rgba(0,0,0,0.28)] ring-1 ring-inset ring-white/20 backdrop-blur-xl">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-px rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent" />
                  <span className="relative">Selected projects</span>
                </span>
                <h2 data-scroll-reveal className="text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                  Thoughtful design.
                  <span className="block text-[var(--brand-soft)]">Made to move businesses forward.</span>
                </h2>
              </div>
              <p data-scroll-reveal className="max-w-sm text-sm leading-relaxed text-white/65 sm:text-base md:pb-1">
                A selection of digital experiences and visual identities, made to connect brands with the people they serve.
              </p>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
              {projects.map((project, index) => (
                <article key={project.title} data-scroll-reveal className="group">
                  <GlassEffect className="h-full overflow-hidden transition duration-300 group-hover:-translate-y-1">
                    <button
                      ref={index === 0 ? projectTriggerRef : undefined}
                      type="button"
                      aria-haspopup="dialog"
                      aria-label={`Open ${project.title} case study`}
                      onClick={(event) => {
                        projectTriggerRef.current = event.currentTarget;
                        setSelectedProject(project);
                      }}
                      className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-highlight)]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1020]">
                        <img
                          src={project.image}
                          alt={project.alt}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                          loading="lazy"
                          decoding="async"
                        />
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#100713]/75 via-transparent to-black/10" />
                        <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md sm:left-5 sm:top-5">
                          {project.category}
                        </span>
                        <span className="absolute right-4 top-4 font-mono text-xs text-white/80 sm:right-5 sm:top-5">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="flex flex-col items-start p-5 sm:p-6">
                        <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{project.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">
                          {project.description}
                        </p>
                        <span className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-soft)] transition-colors group-hover:text-white">
                          <span>View case study</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </span>
                      </div>
                    </button>
                  </GlassEffect>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div id="contact-pricing" className="relative z-50 -mt-10 sm:-mt-12">
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
          <div aria-hidden="true" className="section-pattern-overlay section-pattern-contact" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <span data-scroll-reveal className="mb-5 block text-base font-bold text-[var(--brand-soft)] sm:text-xl">
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
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </span>
            </a>
          </div>
        </section>

        <section id="pricing" className="relative z-20 isolate -mt-10 overflow-hidden bg-white px-6 py-20 text-zinc-950 sm:-mt-12 sm:px-12 sm:py-24 md:px-16 lg:px-20">
          <div aria-hidden="true" className="section-pattern-overlay section-pattern-pricing section-pattern-overlay-light" />
          <div className="relative z-10 mx-auto max-w-[1200px]">
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <span data-scroll-reveal className="mb-4 block text-sm font-semibold text-[var(--brand-primary)]">
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
                        <span className="rounded-full bg-[var(--brand-primary)] px-3 py-1 text-[10px] font-bold text-white">
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
                        <Check className="h-3.5 w-3.5 shrink-0 text-[var(--brand-secondary)]" strokeWidth={2.5} />
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
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white">
                      <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <FAQSection />

      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-md sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <div
            ref={caseStudyDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            aria-describedby="case-study-intro"
            tabIndex={-1}
            className="relative my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl overflow-y-auto rounded-[1.5rem] border border-white/20 bg-[#130b19] text-white shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2rem]"
          >
            <div className="section-pattern-overlay section-pattern-projects" />
            <div className="relative z-10">
              <div className="sticky top-0 z-20 flex justify-end p-3 sm:p-5">
                <button
                  ref={caseStudyCloseRef}
                  type="button"
                  aria-label="Close case study"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#130b19]/85 text-white backdrop-blur-xl transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-highlight)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-5 pb-7 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">
                <div className="overflow-hidden rounded-2xl border border-white/10 sm:rounded-3xl">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.alt}
                    className="aspect-[16/10] max-h-[60vh] w-full object-cover sm:aspect-[16/8]"
                  />
                </div>

                <div className="mt-7 sm:mt-10">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-highlight)]">
                    {selectedProject.category}
                  </span>
                  <h2 id="case-study-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    {selectedProject.title}
                  </h2>
                  <p id="case-study-intro" className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
                    {selectedProject.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[selectedProject.category, 'Concept project', 'Art direction'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/75 sm:text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-9 grid gap-7 border-t border-white/10 pt-7 sm:mt-12 sm:grid-cols-2 sm:gap-10 sm:pt-9">
                  <div>
                    <h3 className="text-lg font-semibold sm:text-xl">Project overview</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                      {caseStudyDetails[selectedProject.title].overview}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold sm:text-xl">Creative direction</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                      {caseStudyDetails[selectedProject.title].direction}
                    </p>
                  </div>
                </div>

                <div className="mt-9 sm:mt-12">
                  <h3 className="text-lg font-semibold sm:text-xl">Selected imagery</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-5">
                    {caseStudyDetails[selectedProject.title].gallery.map(({ image, alt }) => (
                      <img
                        key={image}
                        src={image}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover sm:rounded-3xl"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white/85">Deliverables</h3>
                    <p className="mt-2 text-sm text-white/60">{selectedProject.category} · Visual direction · Digital presentation</p>
                  </div>
                  <a
                    href={selectedProject.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    <span>View live project</span>
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-50 isolate overflow-hidden border-t border-white/10 bg-[#100817] px-6 pt-10 text-white sm:px-12 sm:pt-12 md:px-16 lg:px-20">
        <div aria-hidden="true" className="section-pattern-overlay section-pattern-footer" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1600px] gap-8 xl:grid-cols-[1fr_auto_1fr] xl:items-start">
          <div>
            <a
              href="#home"
              className="text-2xl font-bold tracking-tight transition-opacity hover:opacity-80 xl:text-3xl"
            >
              Hadi <span className="text-[var(--brand-soft)]">Morph</span>
            </a>
            <p className="mt-3 text-base text-white/55 xl:text-lg">
              Thoughtful design and dependable development.
            </p>
            <a
              href="mailto:ahmezzhadi@gmail.com"
              className="mt-5 inline-block max-w-full break-words text-2xl font-semibold text-white/90 transition-colors hover:text-[var(--brand-soft)] xl:text-3xl"
            >
              ahmezzhadi@gmail.com
            </a>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col items-start gap-y-4 text-base text-white/70 xl:pt-2 xl:text-lg">
            {[
              ['About', '#about'],
              ['Services', '#services'],
              ['Process', '#process'],
              ['Projects', '#projects'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a key={label} href={href} className="transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </nav>

          <div aria-label="Social profiles" className="flex flex-col gap-3 xl:col-span-1 xl:items-end">
            {socialProfiles.map(({ name, href, logo }) => {
              const icon = (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  {logo}
                </svg>
              );
              const className = 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white/75 transition-all hover:border-[var(--brand-highlight)]/70 hover:bg-[var(--brand-primary)]/30 hover:text-white';

              return href ? (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  title={name}
                  className={className}
                >
                  {icon}
                </a>
              ) : (
                <span key={name} role="img" aria-label={name} title={name} className={className}>
                  {icon}
                </span>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-8 w-full max-w-[1600px] border-t border-white/10 pt-5 text-sm text-white/45 xl:text-base">
          © {new Date().getFullYear()} Hadi Morph. All rights reserved.
        </div>
        <div aria-hidden="true" className="footer-wordmark relative z-10 mx-auto mt-8 h-[clamp(5rem,19vw,16rem)] w-full max-w-[1600px] overflow-hidden">
          <span className="absolute inset-x-0 bottom-[-0.15em] whitespace-nowrap text-center text-[clamp(5rem,19vw,16rem)] font-bold leading-[0.8] tracking-[-0.075em]">
            Hadi Morph
          </span>
        </div>
      </footer>

    </div>
  );
}
