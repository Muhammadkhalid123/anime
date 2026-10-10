'use client';

import React from 'react';

const STEPS = [
  {
    number: '01',
    phase: 'DISCOVER',
    subtitle: 'Brand & Market Research',
    description: 'We deconstruct your brand positioning, target audience, aesthetic goals, and operational bottlenecks to build an uncompromising strategic foundation.',
  },
  {
    number: '02',
    phase: 'DEFINE',
    subtitle: 'Architecture & System Design',
    description: 'We design the complete UI/UX system, full-stack tech architecture, custom AI automation logic, and SEO/GEO/AEO search blueprint.',
  },
  {
    number: '03',
    phase: 'BUILD',
    subtitle: 'Engineering, Graphics & AI',
    description: 'We develop high-speed dynamic web apps, craft bespoke graphic suites, implement custom AI agents, and write clean, maintainable code.',
  },
  {
    number: '04',
    phase: 'DOMINATE',
    subtitle: 'Launch, SEO & 360° Growth',
    description: 'We deploy globally on edge CDNs, execute organic Google SEO, dominate AI answer engines (ChatGPT & Perplexity), and scale revenue.',
  },
];

export default function ProcessTimeline() {
  return (
    <section className="relative z-20 w-full bg-black text-white py-28 sm:py-36 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/[0.08] overflow-hidden select-none">
      {/* Subtle purple background ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[650px] h-[450px] bg-radial from-[#8b5cf6]/07 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-medium text-[#ff5500] tracking-wider">
                03
              </span>
              <span className="h-[1px] w-8 bg-white/20" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                HOW WE WORK
              </span>
            </div>
            <h2 className="font-serif font-normal text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[0.98] text-white">
              The Synthesis{' '}
              <span className="italic bg-gradient-to-r from-[#ff6a1a] via-[#ff5500] to-[#b79cff] bg-clip-text text-transparent">
                Process
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-white/50 font-normal max-w-sm text-left md:text-right font-sans leading-relaxed">
            From initial creative brief to deployment-ready assets, every step is engineered for precision, speed, and artistic distinction.
          </p>
        </div>

        {/* 4-Step Grid with Huge Numbers and 3D Liquid Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="group flex flex-col justify-between text-left p-7 sm:p-8 rounded-[32px] liquid-glass-card overflow-hidden min-h-[320px]"
            >
              {/* Liquid Specular Diagonal Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.07] pointer-events-none rounded-[32px]" />

              {/* Ambient micro glow */}
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-radial from-[#ff5500]/15 to-transparent blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              {/* Top Step Number */}
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                  <span className="font-serif text-4xl sm:text-5xl font-normal text-white/25 group-hover:text-[#ff5500] transition-colors duration-300">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest liquid-glass-pill px-2.5 py-0.5 rounded-full">
                    Step 0{idx + 1}
                  </span>
                </div>

                {/* Phase Title & Subtitle */}
                <div className="mt-6 mb-3">
                  <h3 className="font-sans font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#E6DDF5] transition-colors">
                    {step.phase}
                  </h3>
                  <div className="text-xs font-mono text-[#ff6a1a] mt-1 font-semibold">
                    {step.subtitle}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="relative z-10 text-xs sm:text-[13px] text-white/60 font-sans leading-relaxed mt-4">
                {step.description}
              </p>

              {/* Bottom Minimalist Accent Bar */}
              <div className="relative z-10 w-full h-[1.5px] bg-white/10 mt-6 rounded-full overflow-hidden">
                <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-[#ff5500] via-[#ff6a1a] to-[#b79cff] transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
