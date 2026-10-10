'use client';

import React from 'react';
import Image from 'next/image';

const PROJECTS = [
  {
    id: '01',
    title: 'AETHERIA — LUXURY SPATIAL COMMERCE & WEB APP',
    category: 'DYNAMIC WEB APP & 3D WEBGL',
    year: '2026',
    resolution: 'NEXT.JS 15 • 3D WEBGL • STRIPE',
    description: 'Dynamic web application with interactive 3D spatial configurator, real-time cart checkout, and generative design visualizer.',
    imageSrc: '/services/web_apps.jpg',
    featured: true,
  },
  {
    id: '02',
    title: 'NEXUS PRO — AUTONOMOUS AI WORKFLOW SUITE',
    category: 'AI SOLUTIONS & SAAS',
    year: '2026',
    resolution: 'CUSTOM LLM AGENTS • FASTAPI',
    description: 'Autonomous multi-agent platform automating enterprise content generation, workflow orchestration, and customer intelligence.',
    imageSrc: '/services/ai_automations.jpg',
    featured: false,
  },
  {
    id: '03',
    title: 'CHROMA STUDIO — BRAND IDENTITY & AEO GROWTH',
    category: 'BRAND DESIGN & SEARCH DOMINANCE',
    year: '2026',
    resolution: '#1 GOOGLE SEO • PERPLEXITY AEO',
    description: 'Complete visual branding, 3D motion graphics, and organic search optimization dominating both Google and generative AI engines.',
    imageSrc: '/services/design_graphics.jpg',
    featured: false,
  },
];

export default function SelectedWork() {
  return (
    <section className="relative z-20 w-full bg-[#050508] text-white py-28 sm:py-36 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/[0.08] overflow-hidden select-none">
      {/* Ambient background aura */}
      <div className="absolute top-1/4 left-1/4 w-[750px] h-[550px] bg-radial from-[#d946ef]/06 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[650px] h-[450px] bg-radial from-[#ff5500]/06 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-medium text-[#ff5500] tracking-wider">
                04
              </span>
              <span className="h-[1px] w-8 bg-white/20" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                SELECTED WORK
              </span>
            </div>
            <h2 className="font-serif font-normal text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[0.98] text-white">
              Curated{' '}
              <span className="italic bg-gradient-to-r from-[#E6DDF5] via-[#D9CCF2] to-[#B79CFF] bg-clip-text text-transparent">
                Productions
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-white/50 font-normal max-w-sm text-left md:text-right font-sans leading-relaxed">
            Curated portfolio of dynamic web applications, bespoke brand graphics, custom AI architectures, and top-tier SEO, GEO, and AEO search successes.
          </p>
        </div>

        {/* FEATURED HERO WORK (Large Single Masterpiece Showcase with 3D Liquid Glassmorphism) */}
        <div className="group mb-12 sm:mb-16">
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[32px] overflow-hidden liquid-glass-card p-2 sm:p-3 shadow-[0_30px_90px_rgba(0,0,0,0.9)] border border-white/15">
            {/* Liquid Specular Diagonal Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-[32px]" />

            <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-black/50">
              <Image
                src={PROJECTS[0].imageSrc}
                alt={PROJECTS[0].title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
              {/* Ambient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8 liquid-glass-pill px-4 py-1.5 rounded-full backdrop-blur-xl">
                <span className="text-[11px] font-mono font-medium text-[#ff6a1a] uppercase tracking-wider">
                  {PROJECTS[0].category}
                </span>
              </div>

              {/* Bottom Inset Caption */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal">
                    {PROJECTS[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 font-sans max-w-xl mt-1.5">
                    {PROJECTS[0].description}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 font-mono text-xs text-white/60 liquid-glass-pill px-4 py-2 rounded-full">
                  <span>{PROJECTS[0].year}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{PROJECTS[0].resolution}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN ASYMMETRIC GRID (Projects 02 and 03) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS.slice(1).map((proj) => (
            <div key={proj.id} className="group flex flex-col text-left">
              <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden liquid-glass-card p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15 mb-5">
                {/* Liquid Specular Diagonal Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-[32px]" />

                <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-black/50">
                  <Image
                    src={proj.imageSrc}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-5 left-5 liquid-glass-pill px-3.5 py-1 rounded-full backdrop-blur-md">
                    <span className="text-[10px] font-mono font-medium text-white/90 uppercase tracking-wider">
                      {proj.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <h4 className="font-serif text-lg sm:text-xl text-white font-normal group-hover:text-[#E6DDF5] transition-colors">
                  {proj.title}
                </h4>
                <span className="text-xs font-mono text-white/40">{proj.year}</span>
              </div>

              <p className="text-xs text-white/60 font-sans mt-2 leading-relaxed px-1">
                {proj.description}
              </p>

              <div className="mt-3 text-[11px] font-mono text-[#ff6a1a] px-1 font-medium">
                {proj.resolution}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
