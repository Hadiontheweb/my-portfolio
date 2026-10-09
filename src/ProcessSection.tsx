import { useState } from 'react';
import { GlassEffect } from './components/ui/liquid-glass';

const processSteps = [
  {
    title: 'Discovery',
    description: 'Understanding your vision, audience, and goals.',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=640&q=75',
    imageAlt: 'Creative direction taking shape',
  },
  {
    title: 'Strategy',
    description: 'Defining your unique positioning and messaging.',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=640&q=75',
    imageAlt: 'Visual references informing a brand strategy',
  },
  {
    title: 'Design',
    description: 'Creating your visual identity system and touchpoints.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=640&q=75',
    imageAlt: 'Polished visual identity and art direction',
  },
  {
    title: 'Delivery',
    description: 'Providing all assets, brand guidelines, and support.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=640&q=75',
    imageAlt: 'Finished creative work ready to launch',
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const visibleStep = hoveredStep ?? activeStep;

  return (
    <section
      id="process"
      aria-label="Our process"
      className="process-section-background relative z-30 isolate min-h-[100svh] overflow-hidden border border-white/10 bg-[#0b0710] px-4 py-8 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(122,33,134,0.16)] sm:px-8 sm:py-12 md:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--brand-secondary)]/20 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-8 h-64 w-64 rounded-full bg-[var(--brand-primary)]/18 blur-[90px]"
      />
      <div className="relative z-10 mb-10 flex justify-center sm:mb-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[-1.25rem] left-1/2 w-64 -translate-x-1/2 rounded-full bg-[linear-gradient(100deg,rgba(142,30,162,0.28),rgba(255,255,255,0.72),rgba(198,84,195,0.3))] blur-2xl"
        />
        <GlassEffect className="rounded-full border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.58),rgba(236,213,244,0.3)_48%,rgba(255,255,255,0.44))] px-5 py-2 shadow-[0_12px_30px_rgba(104,35,124,0.16),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-[var(--brand-primary)]/10 backdrop-blur-xl sm:px-6">
          <h2 className="text-sm font-semibold tracking-[0.12em] text-[var(--brand-primary)] sm:text-base">
            Working Process
          </h2>
        </GlassEffect>
      </div>
      <ol
        aria-label="Project process"
        onMouseLeave={() => setHoveredStep(null)}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-2"
      >
        {processSteps.map((step, index) => {
          const isActive = visibleStep === index;
          const previewId = `process-step-preview-${index + 1}`;

          return (
            <li key={step.title}>
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={previewId}
                onClick={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                onMouseEnter={() => setHoveredStep(index)}
                className={`process-step group relative grid w-full items-center gap-x-3 overflow-hidden rounded-2xl border py-4 pl-5 pr-3 text-left backdrop-blur-xl transition-[grid-template-columns,min-height,color,background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-primary)] sm:gap-x-4 sm:py-5 sm:pl-8 sm:pr-5 ${
                  isActive
                    ? 'border-white/20 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shadow-[0_20px_44px_rgba(80,19,92,0.3)]'
                    : 'border-white/10 bg-[rgba(255,255,255,0.06)] text-white shadow-[0_12px_30px_rgba(6,3,10,0.18)] hover:border-white/15 hover:bg-[rgba(255,255,255,0.09)]'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute bottom-[22%] left-4 top-[22%] w-[3px] rounded-full bg-[var(--brand-primary)] transition-[top,bottom,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:left-6 ${
                    isActive ? 'bottom-[18%] top-[18%] bg-[var(--brand-highlight)]' : ''
                  }`}
                />

                <span
                  aria-hidden="true"
                  className={`font-sans text-3xl font-bold tracking-[-0.05em] transition-colors duration-300 motion-reduce:transition-none sm:text-4xl lg:text-5xl ${
                    isActive ? 'row-span-1' : 'row-span-2 sm:row-span-1'
                  } ${
                    isActive ? 'text-white' : 'text-white/80'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span
                  className={`min-w-0 text-lg font-semibold tracking-tight transition-[color,opacity] duration-300 motion-reduce:transition-none sm:text-xl lg:text-2xl ${
                    isActive ? 'text-white' : 'text-white'
                  }`}
                >
                  {step.title}
                </span>

                <span
                  className={`col-start-2 col-end-3 row-start-2 mt-1 min-w-0 break-words text-xs leading-relaxed transition-[opacity,color] duration-300 motion-reduce:transition-none sm:col-start-3 sm:col-end-4 sm:row-start-1 sm:mt-0 sm:whitespace-nowrap sm:text-right sm:text-sm ${
                    isActive ? 'hidden' : 'text-white/60'
                  }`}
                >
                  {step.description}
                </span>

                <span
                  id={previewId}
                  className={`process-step-preview col-start-3 flex min-w-0 self-center overflow-hidden rounded-xl transition-[height,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:col-start-4 ${
                    isActive ? 'row-span-1' : 'row-span-2 sm:row-span-1'
                  } ${
                    isActive ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
                  }`}
                >
                  {isActive && (
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
