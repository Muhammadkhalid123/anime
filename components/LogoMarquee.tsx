'use client';

import React from 'react';

const ROW_ONE_LOGOS = [
  { name: 'NEXT.JS', category: 'WEB APPS' },
  { name: 'FIGMA', category: 'DESIGN SYSTEMS' },
  { name: 'OPENAI', category: 'AI & LLMS' },
  { name: 'THREE.JS', category: '3D WEB EXPERIENCES' },
  { name: 'VERCEL', category: 'EDGE DEPLOYMENT' },
  { name: 'ANTHROPIC', category: 'AI AGENTS' },
  { name: 'TYPESCRIPT', category: 'ENGINEERING' },
  { name: 'TAILWIND CSS', category: 'UI ARCHITECTURE' },
];

const ROW_TWO_LOGOS = [
  { name: 'GOOGLE SEO', category: 'ORGANIC GROWTH' },
  { name: 'PERPLEXITY AEO', category: 'ANSWER ENGINE' },
  { name: 'CHATGPT GEO', category: 'GENERATIVE SEARCH' },
  { name: 'ADOBE SUITE', category: 'ALL GRAPHICS' },
  { name: 'PYTHON', category: 'AUTOMATIONS' },
  { name: 'STRIPE', category: 'COMMERCE' },
  { name: 'BLENDER', category: '3D & MOTION' },
  { name: 'SUPABASE', category: 'DATABASE' },
];

export default function LogoMarquee() {
  return (
    <section className="relative z-20 w-full bg-[#07070a] py-16 sm:py-20 border-t border-b border-white/[0.06] overflow-hidden">
      {/* Subtle background ambient purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[250px] bg-radial from-[#8b5cf6]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-10 text-center relative z-10">
        <p className="text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.2em] text-white/50">
          POWERING BESPOKE SOLUTIONS ACROSS DESIGN, ENGINEERING, AI & SEARCH
        </p>
      </div>

      {/* Marquee Wrapper with edge fade mask */}
      <div
        className="w-full space-y-4 pause-on-hover select-none"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        {/* ROW 1: Moves Right to Left */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee-left flex items-center gap-4 sm:gap-6 shrink-0">
            {[...ROW_ONE_LOGOS, ...ROW_ONE_LOGOS].map((logo, idx) => (
              <div
                key={`r1-${idx}`}
                className="group flex items-center gap-3 bg-[#111116]/70 hover:bg-[#181822] border border-white/[0.08] hover:border-[#b79cff]/30 rounded-2xl px-5 py-3 backdrop-blur-md transition-all duration-300 shrink-0"
              >
                {/* Brand icon orb */}
                <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[#b79cff] group-hover:border-[#b79cff]/40 transition-colors">
                  <span className="text-[10px] font-mono font-bold">
                    {logo.name.slice(0, 2)}
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.04em] text-white/85 group-hover:text-white transition-colors">
                    {logo.name}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 group-hover:text-[#b79cff]/70 transition-colors">
                    {logo.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Moves Left to Right */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee-right flex items-center gap-4 sm:gap-6 shrink-0">
            {[...ROW_TWO_LOGOS, ...ROW_TWO_LOGOS].map((logo, idx) => (
              <div
                key={`r2-${idx}`}
                className="group flex items-center gap-3 bg-[#111116]/70 hover:bg-[#181822] border border-white/[0.08] hover:border-[#ff5500]/30 rounded-2xl px-5 py-3 backdrop-blur-md transition-all duration-300 shrink-0"
              >
                {/* Brand icon orb */}
                <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[#ff7b2b] group-hover:border-[#ff5500]/40 transition-colors">
                  <span className="text-[10px] font-mono font-bold">
                    {logo.name.slice(0, 2)}
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.04em] text-white/85 group-hover:text-white transition-colors">
                    {logo.name}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 group-hover:text-[#ff7b2b]/70 transition-colors">
                    {logo.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
