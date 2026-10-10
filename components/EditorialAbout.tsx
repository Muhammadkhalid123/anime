'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function EditorialAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const lines = headlineRef.current?.querySelectorAll('.reveal-line-inner');
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0C1D19] text-[#E3E6E1] py-28 sm:py-36 md:py-44 border-b border-[rgba(227,230,225,0.08)]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          
          {/* Cols 1-3: Section Marker & Editorial Note */}
          <div className="md:col-span-3">
            <span className="font-meta text-[#8FA39B] text-xs uppercase tracking-wider block">
              About
            </span>
          </div>

          {/* Cols 4-12: Large Statement & Supporting Content */}
          <div className="md:col-span-9 flex flex-col space-y-12">
            
            {/* Display Statement */}
            <h2
              ref={headlineRef}
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-light leading-[1.08] tracking-[-0.02em] text-[#E3E6E1]"
            >
              <span className="block overflow-hidden pb-1">
                <span className="reveal-line-inner block">
                  We design and build websites, AI tools
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="reveal-line-inner block">
                  and search visibility for brands that want to be{' '}
                  <span className="text-[#8FA39B]">found and remembered.</span>
                </span>
              </span>
            </h2>

            {/* Lead paragraph */}
            <p className="font-body text-[#E3E6E1]/85 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-[58ch]">
              Our studio operates as a compact, integrated unit of designers and
              engineers. We build digital products from scratch, automate backend
              operations, and ensure your presence is directly discoverable by
              people and generative AI search models.
            </p>

            {/* True facts only in DM Mono */}
            <div className="pt-6 border-t border-[rgba(227,230,225,0.12)]">
              <p className="font-meta text-[#8FA39B] text-xs sm:text-sm">
                Founded 2024 · Dedicated core studio · Working with partners worldwide
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
