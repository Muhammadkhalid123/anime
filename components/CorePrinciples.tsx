'use client';

import React from 'react';

interface Principle {
  statement: string;
  support: string;
}

const PRINCIPLES: Principle[] = [
  {
    statement: 'Start from the problem, not a template.',
    support:
      'Every system is designed from first principles to match your exact technical constraints and business goals.',
  },
  {
    statement: 'Design and engineering in one team.',
    support:
      'Zero handoff friction between visual concepts and production code. We architect and build what we design.',
  },
  {
    statement: 'Ship fast, then keep improving.',
    support:
      'Get robust software into real users’ hands quickly, collect telemetry feedback, and iterate relentlessly.',
  },
];

export default function CorePrinciples() {
  return (
    <section className="relative w-full bg-[#0C1D19] text-[#E3E6E1] py-28 sm:py-36 border-b border-[rgba(227,230,225,0.08)]">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 items-baseline">
          <div className="md:col-span-3">
            <span className="font-meta text-[#8FA39B] text-xs uppercase tracking-wider block">
              Principles
            </span>
          </div>
          <div className="md:col-span-9">
            <p className="font-serif text-2xl sm:text-3xl text-[#8FA39B] font-light">
              How we think and build.
            </p>
          </div>
        </div>

        {/* 3 Plain Rows with hairline dividers */}
        <div className="w-full divide-y divide-[rgba(227,230,225,0.14)] border-y border-[rgba(227,230,225,0.14)]">
          {PRINCIPLES.map((item, idx) => (
            <div
              key={idx}
              className="py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-baseline"
            >
              <div className="md:col-span-6">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-[#E3E6E1] leading-snug">
                  {item.statement}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="font-body text-[#8FA39B] text-base sm:text-lg leading-relaxed max-w-[50ch]">
                  {item.support}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
