'use client';

import React from 'react';

export default function EditorialAbout() {
  return (
    <section className="relative z-20 w-full bg-black text-white py-28 sm:py-40 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/[0.08] overflow-hidden select-none">
      {/* Subtle ambient gradient aura */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-[#8b5cf6]/08 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Index & Micro-label */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="text-xs font-mono font-medium text-[#ff5500] tracking-wider">
            01
          </span>
          <span className="h-[1px] w-8 bg-white/20" />
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
            ABOUT THE AGENCY
          </span>
        </div>

        {/* Big Editorial Statement + Offset Paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          
          {/* Left Column: Massive Editorial Serif Statement */}
          <div className="lg:col-span-8 text-left">
            <h2 className="font-serif font-normal text-[clamp(2.4rem,5.5vw,5.2rem)] leading-[1.02] tracking-[-0.025em] text-[#F3EDFD]">
              We build{' '}
              <span className="italic text-white">intelligent</span> digital experiences and AI solutions for brands ready to{' '}
              <span className="bg-gradient-to-r from-[#ff6a1a] via-[#ff5500] to-[#b79cff] bg-clip-text text-transparent italic font-normal">
                move differently.
              </span>
            </h2>
          </div>

          {/* Right Column: Supporting Small Editorial Paragraph */}
          <div className="lg:col-span-4 text-left lg:pb-3 space-y-6">
            <p className="text-sm sm:text-[15px] font-normal text-white/70 leading-[1.65] font-sans">
              DREAMFRAME is a modern creative agency, engineering partner, and AI solutions studio. We build dynamic web apps, high-performance static websites, all graphics suites, custom automations, and next-gen SEO, GEO, and AEO engines that guarantee market authority.
            </p>

            {/* Minimalist Micro-Metrics */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-normal text-white">
                  360<span className="text-sm font-sans font-medium text-[#ff5500] ml-0.5">°</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-white/40 font-mono mt-1">
                  End-to-End Solutions
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-normal text-white">
                  #1<span className="text-sm font-sans font-medium text-[#b79cff] ml-0.5">Rank</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-white/40 font-mono mt-1">
                  SEO & GEO Authority
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
