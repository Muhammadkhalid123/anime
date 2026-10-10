'use client';

import React, { useState } from 'react';

const TECH_CAPABILITIES = [
  {
    title: 'DYNAMIC WEB ENGINES',
    badge: 'Full-Stack',
    metric: 'Next.js 15 + Edge',
    description: 'Bespoke web applications, dynamic database architectures, and lightning-fast static websites built for high conversion and scale.',
  },
  {
    title: 'AUTONOMOUS AI AGENTS',
    badge: 'Intelligence',
    metric: 'Zero-Touch Workflows',
    description: 'Custom AI agent networks automating customer acquisition, intelligent lead qualification, content creation, and operations.',
  },
  {
    title: 'GENERATIVE ENGINE OPT (GEO)',
    badge: 'AI Search',
    metric: 'ChatGPT & Claude',
    description: 'Advanced semantic modeling and knowledge-graph calibration ensuring your brand is the primary cited authority in LLMs.',
  },
  {
    title: 'ANSWER ENGINE OPT (AEO)',
    badge: 'Perplexity & Search',
    metric: '#1 Direct Answer',
    description: 'Direct answer indexing and schema engineering securing the highest visibility across Perplexity AI, Google SGE, and modern answer engines.',
  },
  {
    title: 'ALL GRAPHICS & 3D MOTION',
    badge: 'Brand & Creative',
    metric: 'Figma + WebGL',
    description: 'Complete brand toolkits, high-impact pitch decks, interactive 3D WebGL experiences, and tailored graphic suites for multi-channel dominance.',
  },
  {
    title: 'FULL-STACK AUTOMATIONS',
    badge: 'Integrations',
    metric: '99.9% Automated',
    description: 'Unified CRM, payment, database, and marketing automations that eliminate manual overhead and multiply your team’s output.',
  },
];

export default function AiPhilosophy() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative z-20 w-full bg-black text-white py-28 sm:py-36 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/[0.08] overflow-hidden select-none">
      {/* Background dramatic electric aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-radial from-[#ff5500]/10 via-[#8b5cf6]/06 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-xs font-mono font-medium text-[#ff5500] tracking-wider">
            05
          </span>
          <span className="h-[1px] w-8 bg-white/20" />
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
            TECHNOLOGY & PHILOSOPHY
          </span>
        </div>

        {/* Big Editorial Statement */}
        <div className="text-left mb-16 sm:mb-20 max-w-4xl">
          <h2 className="font-serif font-normal text-[clamp(2.4rem,5.2vw,5rem)] leading-[1.0] text-white">
            AI isn&apos;t an add-on feature.{' '}
            <span className="italic block bg-gradient-to-r from-[#ff6a1a] via-[#ff5500] to-[#b79cff] bg-clip-text text-transparent font-normal">
              It&apos;s fundamental infrastructure.
            </span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-white/60 font-sans max-w-xl leading-relaxed">
            We architect generative AI, dynamic software engineering, and multi-channel search as primary competitive advantages — transforming how modern brands capture attention, automate operations, and scale.
          </p>
        </div>

        {/* 6-Card Interactive Capability Matrix with 3D Liquid Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {TECH_CAPABILITIES.map((tech, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={tech.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group text-left p-7 sm:p-8 rounded-[32px] liquid-glass-card transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[270px] cursor-pointer ${
                  isHovered
                    ? 'border-[#ff5500]/40 shadow-[0_20px_50px_rgba(255,85,0,0.18)] scale-[1.015]'
                    : ''
                }`}
              >
                {/* Liquid Specular Diagonal Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.07] pointer-events-none rounded-[32px]" />

                {/* Ambient dynamic glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-radial from-[#ff5500]/15 via-[#8b5cf6]/08 to-transparent blur-xl pointer-events-none group-hover:scale-130 transition-transform duration-500" />

                {/* Top Badge & Metric */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-white/60 liquid-glass-pill px-3 py-1 rounded-full">
                      {tech.badge}
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#ff6a1a] liquid-glass-pill px-2.5 py-0.5 rounded-full">
                      {tech.metric}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight group-hover:text-[#E6DDF5] transition-colors">
                    {tech.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="relative z-10 text-xs sm:text-[13px] text-white/60 font-sans leading-relaxed mt-4">
                  {tech.description}
                </p>

                {/* Bottom Micro-indicator */}
                <div className="relative z-10 pt-4 mt-2 flex items-center justify-between border-t border-white/10 text-[10px] font-mono text-white/40 group-hover:text-white/70 transition-colors">
                  <span>Engine Module 0{idx + 1}</span>
                  <span className="text-[#ff5500] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse" />
                    ACTIVE
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
