'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Step {
  num: string;
  word: string;
  description: string;
  deliverables: string[];
}

const STEPS: Step[] = [
  {
    num: '01',
    word: 'Discover',
    description:
      'Understanding your problem, technical constraints, and target audience before writing a single line of code.',
    deliverables: [
      'Stakeholder alignment & goals',
      'Technical architecture audit',
      'Clear scope & milestone definition',
    ],
  },
  {
    num: '02',
    word: 'Define',
    description:
      'Architecting user journeys, data contracts, bespoke design tokens, and modular components.',
    deliverables: [
      'Information architecture & wireframes',
      'Design token system in Figma',
      'API specification & database schemas',
    ],
  },
  {
    num: '03',
    word: 'Build',
    description:
      'Engineered in rapid, iterative cycles with live staging previews and zero bloated dependencies.',
    deliverables: [
      'Full-stack Next.js & backend implementation',
      'Interactive WebGL & motion choreography',
      'End-to-end testing & performance audits',
    ],
  },
  {
    num: '04',
    word: 'Launch & grow',
    description:
      'Production deployment, generative search engine indexing, and continuous telemetry monitoring.',
    deliverables: [
      'Zero-downtime Vercel production deploy',
      'GEO / SEO knowledge graph indexing',
      'Speed optimization & ongoing support',
    ],
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const stepCount = STEPS.length;
          const index = Math.min(
            stepCount - 1,
            Math.floor(self.progress * stepCount)
          );
          setActiveStepIndex(index);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0C1D19] text-[#E3E6E1] border-b border-[rgba(227,230,225,0.08)]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 py-28 sm:py-36">
        
        {/* Section Marker */}
        <div className="mb-16">
          <span className="font-meta text-[#8FA39B] text-xs uppercase tracking-wider block">
            Process
          </span>
        </div>

        {/* 2-Column Pinned Stepping Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Left Column (Sticky Word Transition on Desktop) */}
          <div className="md:col-span-5 md:sticky md:top-36 self-start">
            <div className="overflow-hidden h-24 sm:h-32 flex items-center">
              <h2
                key={activeStepIndex}
                className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-[#E3E6E1] tracking-[-0.02em] animate-step-swap"
              >
                {STEPS[activeStepIndex].word}
              </h2>
            </div>
            <p className="font-meta text-[#8FA39B] text-xs sm:text-sm mt-4">
              Step {STEPS[activeStepIndex].num} of 04
            </p>
          </div>

          {/* Right Column: Steps Sequence */}
          <div className="md:col-span-7 space-y-16 md:space-y-24">
            {STEPS.map((step, idx) => {
              const isCurrent = activeStepIndex === idx;

              return (
                <div
                  key={step.num}
                  className={`pt-8 border-t border-[rgba(227,230,225,0.14)] transition-opacity duration-300 ${
                    isCurrent ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-meta text-[#F0B43A] text-xs sm:text-sm font-medium">
                      Step {step.num}
                    </span>
                    <span className="font-serif text-2xl text-[#E3E6E1] md:hidden">
                      {step.word}
                    </span>
                  </div>

                  <p className="font-body text-[#E3E6E1]/90 text-lg sm:text-xl font-normal leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <div className="space-y-2">
                    <span className="font-meta text-[#8FA39B] text-xs uppercase tracking-wider block mb-2">
                      Key Deliverables
                    </span>
                    <ul className="space-y-1.5">
                      {step.deliverables.map((d, dIdx) => (
                        <li
                          key={dIdx}
                          className="font-body text-[#8FA39B] text-sm flex items-start gap-2"
                        >
                          <span className="text-[#F0B43A] mt-1 text-xs">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      <style jsx>{`
        @keyframes stepSwap {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-step-swap {
          animation: stepSwap 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </section>
  );
}
