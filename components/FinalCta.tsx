'use client';

import React from 'react';

interface FinalCtaProps {
  onOpenStudio: () => void;
}

export default function FinalCta({ onOpenStudio }: FinalCtaProps) {
  return (
    <section className="relative z-20 w-full bg-gradient-to-b from-[#050508] via-[#0f0f1c] to-[#180d28] text-white py-32 sm:py-44 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/[0.08] overflow-hidden select-none">
      {/* Massive electric gradient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-radial from-[#ff5500]/20 via-[#8b5cf6]/18 to-transparent blur-3xl pointer-events-none" />

      {/* Subtle perspective grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.6) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Top Micro-badge */}
        <div className="inline-flex items-center gap-2.5 bg-[#141422]/90 border border-white/15 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#ff5500] shadow-[0_0_8px_#ff5500] animate-pulse" />
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/80">
            07 / INITIATE YOUR PROJECT
          </span>
        </div>

        {/* Dramatic Headline in Times New Roman Editorial Serif */}
        <h2 className="font-serif font-normal text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.94] tracking-[-0.03em] text-white">
          Ready to build{' '}
          <span className="italic block bg-gradient-to-r from-[#E6DDF5] via-[#D9CCF2] to-[#B79CFF] bg-clip-text text-transparent font-normal">
            what&apos;s next?
          </span>
        </h2>

        {/* Supporting Punchline */}
        <p className="mt-6 text-base sm:text-xl text-white/70 font-sans max-w-xl mx-auto leading-relaxed font-light">
          Let&apos;s engineer something extraordinary. From high-speed web apps and brand graphics to autonomous AI systems and search dominance.
        </p>

        {/* High-Impact CTA Button */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenStudio}
            className="group h-14 px-8 inline-flex items-center justify-center gap-3.5 bg-gradient-to-r from-[#ff5500] via-[#ff6a1a] to-[#ff5500] hover:from-[#ff6a1a] hover:to-[#ff5500] text-white rounded-full transition-all duration-300 cursor-pointer shadow-[0_6px_30px_rgba(255,85,0,0.45)] hover:shadow-[0_8px_40px_rgba(255,85,0,0.65)] hover:scale-102 active:scale-98"
          >
            <span className="font-semibold text-[15px] sm:text-[16px] tracking-wide text-white">
              Start a Project Consultation
            </span>
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shrink-0 transition-transform duration-200 group-hover:translate-x-1 shadow-sm">
              <svg
                className="w-4 h-4 text-black stroke-[2.5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </button>
        </div>

        {/* Micro status note */}
        <div className="mt-8 flex items-center justify-center gap-3 text-xs font-mono text-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Agency Online • Booking Q1/Q2 Projects • End-to-End Solutions</span>
        </div>

      </div>
    </section>
  );
}
