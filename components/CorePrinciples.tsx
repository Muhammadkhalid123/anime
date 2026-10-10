'use client';

import React from 'react';

const PRINCIPLES = [
  {
    number: '01',
    title: 'THINK DEEPLY',
    subtitle: 'Problem-First Engineering',
    statement: 'We start with the core business and brand objective, not cookie-cutter templates. Every website, app, and AI pipeline is purpose-built to create unfair market advantage.',
  },
  {
    number: '02',
    title: 'BUILD BOLDLY',
    subtitle: 'Full-Stack Digital Mastery',
    statement: 'We fuse high-end visual design with bulletproof web engineering, autonomous AI workflows, and advanced SEO/GEO/AEO engines that dominate search.',
  },
  {
    number: '03',
    title: 'MOVE FAST',
    subtitle: 'Zero-Friction Execution',
    statement: 'We prototype, engineer, and deploy production-ready digital solutions with intense velocity — taking your brand from concept to exponential scale.',
  },
];

export default function CorePrinciples() {
  return (
    <section className="relative z-20 w-full bg-[#050508] text-white py-28 sm:py-36 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/[0.08] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="text-xs font-mono font-medium text-[#ff5500] tracking-wider">
            06
          </span>
          <span className="h-[1px] w-8 bg-white/20" />
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
            WHY US / CORE PRINCIPLES
          </span>
        </div>

        {/* 3 Core Principles — Editorial Layout with 3D Liquid Glassmorphism */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 text-left">
          {PRINCIPLES.map((item) => (
            <div
              key={item.number}
              className="group flex flex-col justify-between p-8 sm:p-9 rounded-[32px] liquid-glass-card transition-all duration-300 relative overflow-hidden min-h-[340px]"
            >
              {/* Liquid Specular Diagonal Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-[32px]" />

              {/* Ambient purple liquid orb */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-radial from-[#8b5cf6]/18 via-transparent to-transparent blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-serif text-3xl sm:text-4xl text-white/25 group-hover:text-[#ff5500] transition-colors font-normal">
                    {item.number}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff6a1a] liquid-glass-pill px-3 py-1 rounded-full font-semibold">
                    {item.subtitle}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-4 group-hover:text-[#E6DDF5] transition-colors">
                  {item.title}
                </h3>
              </div>

              <p className="relative z-10 text-sm text-white/65 font-sans leading-relaxed mt-4">
                {item.statement}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
