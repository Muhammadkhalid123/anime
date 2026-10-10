'use client';

import React from 'react';

export default function BentoGrid() {
  return (
    <section className="relative z-20 w-full bg-[#07070a] py-24 sm:py-32 px-6 sm:px-12 md:px-16 overflow-hidden">
      {/* Background Cosmic Atmosphere & Ambient Violet/Pink Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-radial from-[#8b5cf6]/14 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[750px] h-[750px] bg-radial from-[#d946ef]/10 via-[#8b5cf6]/08 to-transparent blur-3xl" />
        <div className="absolute top-2/3 left-1/4 w-[550px] h-[550px] bg-radial from-[#ff5500]/06 via-transparent to-transparent blur-3xl" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-left max-w-2xl">
          {/* Micro-badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#121218]/90 border border-white/12 px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-xl shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b79cff] shadow-[0_0_8px_#b79cff]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/80">
              CORE AGENCY CAPABILITIES
            </span>
          </div>

          {/* Editorial Headline (Times New Roman Serif) */}
          <h2 className="font-serif font-normal tracking-[-0.02em] leading-[0.96] text-[clamp(2.3rem,4.6vw,4.3rem)] text-white select-none">
            <span className="text-[#E6DDF5]">ENGINEERED FOR </span>
            <span className="bg-gradient-to-r from-[#E6DDF5] via-[#D9CCF2] to-[#B79CFF] bg-clip-text text-transparent italic font-normal">
              DIGITAL DOMINANCE
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base font-normal text-white/70 leading-relaxed max-w-xl font-sans">
            A cohesive full-stack agency ecosystem uniting bespoke web apps, brand design systems, autonomous AI automations, and modern SEO/GEO/AEO growth engines.
          </p>
        </div>

        {/* 3D Liquid Glassmorphism Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7">
          
          {/* TOP ROW - CARD 1 (Top Left, 6 Columns): Web Apps & Digital Platforms */}
          <div className="md:col-span-6 liquid-glass-card rounded-[32px] p-7 sm:p-9 flex flex-col justify-between overflow-hidden group min-h-[400px]">
            {/* Liquid Specular Diagonal Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-[32px]" />
            
            {/* Ambient purple liquid orb */}
            <div className="absolute -top-16 -right-16 w-72 h-72 bg-radial from-[#8b5cf6]/25 via-[#a855f7]/10 to-transparent blur-2xl pointer-events-none group-hover:scale-115 transition-transform duration-700" />

            {/* Top Visual Mockup: 3D Floating Glass Browser Window */}
            <div className="w-full mb-8 relative">
              <div className="w-full bg-[#151522]/85 border border-white/15 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-2xl">
                {/* Browser bar with beveled glass dots */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/40 border border-red-400/60 shadow-sm" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/40 border border-amber-400/60 shadow-sm" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/40 border border-emerald-400/60 shadow-sm" />
                  </div>
                  <div className="bg-black/40 border border-white/10 rounded-full px-3.5 py-0.5 text-[10px] font-mono text-white/60 shadow-inner">
                    dreamframe.agency/web-apps
                  </div>
                  <div className="w-4" />
                </div>

                {/* 3D Acrylic Canvas Wireframe Preview */}
                <div className="mt-3.5 bg-gradient-to-b from-[#0b0b12] to-[#12121e] border border-white/10 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden shadow-inner">
                  <div className="flex items-center justify-between">
                    <div className="w-3/5 h-2.5 bg-white/25 rounded-full" />
                    <span className="w-2 h-2 rounded-full bg-[#ff5500] shadow-[0_0_6px_#ff5500]" />
                  </div>
                  <div className="w-2/5 h-2 bg-white/15 rounded-full" />
                  <div className="w-4/5 h-2 bg-white/15 rounded-full" />

                  {/* Liquid Glowing Prism Orb */}
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-tr from-[#b79cff]/30 via-[#d946ef]/20 to-[#ff5500]/25 rounded-full blur-xl animate-pulse" />
                </div>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2.5 font-sans">
                Dynamic Web Apps & High-Speed Websites
              </h3>
              <p className="text-xs sm:text-[13.5px] text-white/70 font-normal leading-relaxed mb-5 max-w-lg font-sans">
                Full-stack Next.js platforms, dynamic database architectures, custom CMS solutions, and lightning-fast static websites with interactive 3D WebGL experiences.
              </p>
              <button className="liquid-glass-pill h-8 px-4 rounded-full text-xs font-medium text-white/90 hover:text-white flex items-center gap-2">
                <span>Explore Web Solutions</span>
                <span className="text-[10px] text-white/50">→</span>
              </button>
            </div>
          </div>

          {/* TOP ROW - CARD 2 (Top Right, 6 Columns): AI Solutions & Automations */}
          <div className="md:col-span-6 liquid-glass-card rounded-[32px] p-7 sm:p-9 flex flex-col justify-between overflow-hidden group min-h-[400px]">
            {/* Liquid Specular Diagonal Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-[32px]" />

            {/* Ambient pink liquid orb */}
            <div className="absolute -top-16 -left-16 w-72 h-72 bg-radial from-[#d946ef]/20 via-[#8b5cf6]/10 to-transparent blur-2xl pointer-events-none group-hover:scale-115 transition-transform duration-700" />

            {/* Top Visual Mockup: 3D Beveled Acrylic Keycaps & Glass Control Card */}
            <div className="w-full mb-8 relative flex items-center justify-center py-4">
              {/* 3D Acrylic Keycap AI */}
              <div className="glass-keycap absolute left-3 top-1 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-white/90 shadow-2xl backdrop-blur-md group-hover:-translate-y-1.5 transition-transform duration-300">
                AI
              </div>
              {/* 3D Acrylic Keycap Auto */}
              <div className="glass-keycap absolute right-3 bottom-0 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-white/90 shadow-2xl backdrop-blur-md group-hover:translate-y-1.5 transition-transform duration-300">
                AUTO
              </div>

              {/* Center 3D Glass Widget Pill with Glowing Liquid Core */}
              <div className="relative w-60 bg-[#161624]/90 border border-white/18 rounded-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-2xl">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff5500] shadow-[0_0_6px_#ff5500]" />
                    <span className="text-[11px] font-semibold text-white/90">Agent Status</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#b79cff] font-semibold">Autonomous</span>
                </div>
                
                {/* 3D Liquid Bar */}
                <div className="h-2 w-full bg-black/50 border border-white/10 rounded-full overflow-hidden p-[1px] shadow-inner">
                  <div className="h-full w-4/5 bg-gradient-to-r from-[#8b5cf6] via-[#d946ef] to-[#ff5500] rounded-full shadow-[0_0_10px_rgba(217,70,239,0.7)]" />
                </div>

                {/* Floating 3D acrylic chip */}
                <div className="mt-3.5 bg-gradient-to-r from-[#222234] to-[#181826] border border-white/20 rounded-xl p-2.5 flex items-center gap-2.5 shadow-xl">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#8b5cf6] to-[#d946ef] flex items-center justify-center text-[11px] text-white shadow-md">
                    ⚡
                  </div>
                  <span className="text-[11px] font-semibold text-white">
                    Custom AI Pipeline Active
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2.5 font-sans">
                AI Solutions & Autonomous Workflows
              </h3>
              <p className="text-xs sm:text-[13.5px] text-white/70 font-normal leading-relaxed mb-5 max-w-lg font-sans">
                Proprietary LLM agents, intelligent business process automation, generative vision pipelines, and custom AI tools that save thousands of operational hours.
              </p>
              <button className="liquid-glass-pill h-8 px-4 rounded-full text-xs font-medium text-white/90 hover:text-white flex items-center gap-2">
                <span>Explore AI Systems</span>
                <span className="text-[10px] text-white/50">→</span>
              </button>
            </div>
          </div>

          {/* BOTTOM ROW - COLUMN 1 (Bottom Left, 4 Columns): Brand & Graphics Design */}
          <div className="md:col-span-4 liquid-glass-card rounded-[32px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden group min-h-[470px]">
            {/* Liquid Specular Diagonal Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-[32px]" />

            {/* Top Content */}
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-2 font-sans">
                Design Agency & All Graphics
              </h3>
              <p className="text-xs sm:text-[13px] text-white/70 font-normal leading-relaxed mb-4 font-sans">
                Comprehensive brand identity, 3D motion graphics, pitch decks, marketing assets, and tactile UI/UX systems crafted for instant distinction.
              </p>
              <button className="liquid-glass-pill h-7 px-3.5 rounded-full text-[11px] font-medium text-white/90">
                View Design Suite
              </button>
            </div>

            {/* Bottom Graphic: 3D Beveled Concentric Glass Tunnel */}
            <div className="relative mt-8 w-full flex items-center justify-center py-6">
              {/* Outer purple atmospheric glow */}
              <div className="absolute w-44 h-44 bg-radial from-[#8b5cf6]/35 to-transparent blur-2xl pointer-events-none" />

              {/* 3D Concentric Frame 1 */}
              <div className="w-56 h-36 border border-white/10 bg-white/[0.01] rounded-2xl flex items-center justify-center p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-sm">
                {/* 3D Concentric Frame 2 */}
                <div className="w-44 h-28 border border-white/15 bg-white/[0.02] rounded-xl flex items-center justify-center p-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-md">
                  {/* 3D Concentric Frame 3 */}
                  <div className="w-32 h-20 border border-white/25 bg-gradient-to-b from-[#1c1c2e]/95 to-[#12121c]/95 rounded-lg flex items-center justify-center shadow-[0_0_25px_rgba(183,156,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.5)] backdrop-blur-xl">
                    <span className="text-2xl">✨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW - COLUMN 2 (Center, 4 Columns): Search Dominance: SEO, GEO & AEO */}
          <div className="md:col-span-4 flex flex-col gap-6 sm:gap-7">
            
            {/* Top Middle Card: 3D Glossy Emblem */}
            <div className="liquid-glass-card rounded-[32px] p-6 flex items-center justify-center overflow-hidden group min-h-[195px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.09] pointer-events-none rounded-[32px]" />
              <div className="absolute inset-0 bg-radial from-[#9333ea]/25 via-transparent to-transparent blur-xl pointer-events-none" />
              
              {/* Double Petal */}
              <div className="relative flex items-center justify-center gap-3.5">
                <div className="w-16 h-22 rounded-2xl bg-gradient-to-tr from-[#6d28d9] via-[#9333ea] to-[#f472b6] -rotate-12 shadow-[0_15px_40px_rgba(147,51,234,0.6),inset_0_2px_2px_rgba(255,255,255,0.6)] border border-white/30 transform group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-t from-black/25 via-transparent to-white/40" />
                </div>
                <div className="w-13 h-16 rounded-xl bg-gradient-to-tr from-[#9333ea] via-[#c084fc] to-[#fb7185] -rotate-12 shadow-[0_12px_35px_rgba(217,70,239,0.5),inset_0_2px_2px_rgba(255,255,255,0.6)] border border-white/30 transform group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 flex items-center justify-center overflow-hidden translate-y-3">
                  <div className="w-full h-full bg-gradient-to-t from-black/25 via-transparent to-white/40" />
                </div>
              </div>
            </div>

            {/* Bottom Middle Card: SEO, GEO & AEO Search Radar */}
            <div className="liquid-glass-card rounded-[32px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden group min-h-[255px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-[32px]" />

              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1.5 font-sans">
                  SEO, GEO & AEO Dominance
                </h3>
                <p className="text-xs text-white/70 font-normal leading-relaxed font-sans">
                  Google Organic SEO + Generative Engine (ChatGPT) & Answer Engine (Perplexity) optimization.
                </p>
              </div>

              {/* Radar Scanner */}
              <div className="relative w-full h-28 flex items-end justify-center overflow-hidden mt-3">
                <div className="absolute bottom-0 w-48 h-48 rounded-full border border-white/12" />
                <div className="absolute bottom-0 w-36 h-36 rounded-full border border-white/18" />
                <div className="absolute bottom-0 w-22 h-22 rounded-full border border-white/25" />
                <div className="absolute bottom-0 w-px h-26 bg-white/15" />
                <div className="absolute bottom-0 h-px w-48 bg-white/15" />

                <div
                  className="absolute bottom-0 w-40 h-40 origin-bottom-center animate-radar-sweep pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 0deg at 50% 100%, rgba(192, 132, 252, 0.55) 0deg, rgba(217, 70, 239, 0.2) 40deg, transparent 90deg)',
                  }}
                />

                <div className="absolute bottom-9 left-11 w-2.5 h-2.5 rounded-full bg-[#ff5500] shadow-[0_0_10px_#ff5500] animate-blip" />
                <div className="absolute bottom-18 right-12 w-2 h-2 rounded-full bg-[#b79cff] shadow-[0_0_8px_#b79cff] animate-blip" style={{ animationDelay: '0.8s' }} />
                <div className="absolute bottom-6 right-7 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-blip" style={{ animationDelay: '1.4s' }} />
                <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_14px_#ffffff] border border-white/80" />
              </div>
            </div>

          </div>

          {/* BOTTOM ROW - COLUMN 3 (Bottom Right, 4 Columns): Marketing Agency & Scale */}
          <div className="md:col-span-4 liquid-glass-card rounded-[32px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden group min-h-[470px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-[32px]" />

            {/* Code Snippet */}
            <div className="w-full bg-[#131320]/90 border border-white/16 rounded-2xl p-4 shadow-[0_20px_45px_rgba(0,0,0,0.8)] backdrop-blur-2xl mb-6">
              <div className="flex items-center gap-1.5 pb-3 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/40 border border-red-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/40 border border-amber-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/40 border border-emerald-400/60" />
                <span className="ml-auto text-[9px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded">growth.config.ts</span>
              </div>
              <pre className="mt-3 font-mono text-[11px] leading-relaxed text-zinc-400 overflow-x-auto select-none">
                <code>
                  <span className="text-[#c084fc]">export const</span> <span className="text-[#34d399]">growthStack</span> = &#123;{'\n'}
                  {'  '}<span className="text-[#f472b6]">seo</span>: <span className="text-[#34d399]">&quot;Rank #1 Organic&quot;</span>,{'\n'}
                  {'  '}<span className="text-[#f472b6]">geo</span>: <span className="text-[#34d399]">&quot;LLM Cited Authority&quot;</span>,{'\n'}
                  {'  '}<span className="text-[#f472b6]">aeo</span>: <span className="text-[#34d399]">&quot;Direct Answer Dominance&quot;</span>,{'\n'}
                  {'  '}<span className="text-[#f472b6]">funnel</span>: <span className="text-[#fb923c]">&quot;High-Conversion&quot;</span>{'\n'}
                  &#125;;
                </code>
              </pre>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-2 font-sans">
                Marketing Agency & Growth
              </h3>
              <p className="text-xs sm:text-[13px] text-white/70 font-normal leading-relaxed mb-4 font-sans">
                Full-funnel digital marketing, data analytics, automated retention campaigns, and performance scaling engineered for market leadership.
              </p>
              <button className="liquid-glass-pill h-7 px-3.5 rounded-full text-[11px] font-medium text-white/90">
                Learn more
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
