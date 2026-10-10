import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const questions = [
  {
    question: 'What kinds of websites do you build?',
    answer:
      'I create responsive websites for businesses and personal brands, including landing pages, portfolios, and e-commerce stores.',
  },
  {
    question: 'Which platforms and technologies do you work with?',
    answer:
      'I work with React and modern front-end tools, as well as WordPress, Shopify, and Wix. We can choose the right platform for your goals and how you want to manage the site.',
  },
  {
    question: 'How does a project get started?',
    answer:
      'We start by discussing your goals, audience, content, and references. From there I define the project direction, design and build the site, then share it with you for feedback before launch.',
  },
  {
    question: 'How long does a website take to complete?',
    answer:
      'Timing depends on the size of the site, its features, and how quickly content and feedback are ready. Once we discuss your scope, I can provide a realistic timeline.',
  },
  {
    question: 'Can you help after the site launches?',
    answer:
      'Yes. I can help with ongoing updates, maintenance, performance improvements, and support after launch.',
  },
];

export default function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="faq-heading"
      className="relative z-[60] isolate overflow-hidden bg-[#1b1022] px-6 py-20 text-white sm:px-12 sm:py-24 md:px-16 lg:px-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(198,84,195,0.28),transparent_42%),linear-gradient(180deg,#21132a_0%,#1a0d22_100%)]"
      />
      <div aria-hidden="true" className="section-pattern-overlay section-pattern-faq" />
      <div className="relative mx-auto grid w-full max-w-[1200px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-highlight)]">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl"
          >
            A few things you might be wondering.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            Have another question?{' '}
            <a
              href="mailto:ahmezzhadi@gmail.com"
              className="font-medium text-[var(--brand-soft)] underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
            >
              Send me a message.
            </a>
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {questions.map(({ question, answer }, index) => {
            const isOpen = openQuestion === index;
            const buttonId = `faq-question-${index + 1}`;
            const panelId = `faq-answer-${index + 1}`;

            return (
              <article key={question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenQuestion(isOpen ? null : index)}
                    className="group flex w-full items-center justify-between gap-5 py-5 text-left text-base font-semibold text-white transition-colors hover:text-[var(--brand-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-highlight)] sm:py-6 sm:text-lg"
                  >
                    <span>{question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[var(--brand-soft)] transition-colors group-hover:border-[var(--brand-highlight)]/50 group-hover:bg-[var(--brand-primary)]/20">
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-white/60 sm:text-base">
                    {answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
