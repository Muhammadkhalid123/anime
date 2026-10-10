'use client';

import React, { useState, useRef } from 'react';
import ScrollCanvasSequence from '@/components/ScrollCanvasSequence';
import LogoMarquee from '@/components/LogoMarquee';
import BentoGrid from '@/components/BentoGrid';
import EditorialAbout from '@/components/EditorialAbout';
import InteractiveServices from '@/components/InteractiveServices';
import ProcessTimeline from '@/components/ProcessTimeline';
import SelectedWork from '@/components/SelectedWork';
import AiPhilosophy from '@/components/AiPhilosophy';
import CorePrinciples from '@/components/CorePrinciples';
import FinalCta from '@/components/FinalCta';
import SiteFooter from '@/components/SiteFooter';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [promptInput, setPromptInput] = useState(
    'Minimalist architectural structure with soft twilight shadows, cinematic composition, 8k resolution'
  );
  const [selectedRatio, setSelectedRatio] = useState('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState(false);

  // Scroll container ref for tall 450vh scroll animation - UNTOUCHED
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Prompt generation simulation - UNTOUCHED
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    setIsGenerating(true);
    setGenerationSuccess(false);

    setTimeout(() => {
      setIsGenerating(false);
      setGenerationSuccess(true);
      setTimeout(() => setGenerationSuccess(false), 3500);
    }, 1500);
  };

  return (
    <main className="relative w-full bg-black text-white selection:bg-[#ff5500]/30 selection:text-white overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION (UNTOUCHED 450vh STICKY SCROLL ANIMATION)
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={scrollContainerRef}
        className="relative w-full h-[450vh] bg-black text-white"
      >
        {/* Pinned Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-black">
          {/* Cinematic Scroll-Linked Canvas Sequence Animation */}
          <ScrollCanvasSequence
            containerRef={scrollContainerRef}
            totalFrames={100}
          />

          {/* TOP HEADER */}
          <header className="relative z-30 w-full px-6 sm:px-12 md:px-16 pt-5 sm:pt-6 flex items-center justify-between animate-fade-up-1">
            {/* Scaled-down Nav Pill: [ (|||) DreamFrame  ≡ ] */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="group h-11 px-4 flex items-center gap-3 bg-[#121216]/80 hover:bg-[#1a1a22]/90 border border-white/10 hover:border-white/20 rounded-full backdrop-blur-md shadow-lg transition-all duration-300"
                aria-label="Navigation Menu"
              >
                {/* Minimalist Striped Circular Logo */}
                <div className="w-5 h-5 rounded-full border border-[#ff5500] p-[1.5px] flex items-center justify-center shadow-[0_0_8px_rgba(255,85,0,0.35)]">
                  <div className="w-full h-full rounded-full flex items-center justify-center gap-[1.5px]">
                    <span className="w-[1.5px] h-2.5 bg-[#ff5500] rounded-full" />
                    <span className="w-[1.5px] h-3 bg-[#ff6a1a] rounded-full" />
                    <span className="w-[1.5px] h-2.5 bg-[#ff5500] rounded-full" />
                  </div>
                </div>

                {/* Brand Title */}
                <span className="text-[14px] sm:text-[15px] font-medium tracking-[0.02em] text-zinc-100 font-sans">
                  DreamFrame
                </span>

                {/* Minimal Menu Hamburger */}
                <div className="flex flex-col gap-[3px] pl-0.5 text-zinc-400 group-hover:text-white transition-colors">
                  <span
                    className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                      isMenuOpen ? 'w-3.5 rotate-45 translate-y-[2px]' : 'w-3.5'
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                      isMenuOpen ? 'w-3.5 -rotate-45 -translate-y-[2.5px]' : 'w-2.5'
                    }`}
                  />
                </div>
              </button>

              {/* Minimalist Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute top-13 left-0 z-40 w-64 bg-[#101014]/95 border border-white/12 rounded-2xl p-2.5 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-white/50 mb-1.5 px-3 pt-1 font-medium">
                    Capabilities
                  </div>
                  <div className="space-y-0.5">
                    {[
                      { label: 'Web Apps & Static Sites', action: () => setIsGeneratorOpen(true) },
                      { label: 'Brand & Graphic Design' },
                      { label: 'AI Solutions & Automations' },
                      { label: 'SEO, GEO & AEO Marketing' },
                      { label: 'Selected Case Studies' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (item.action) item.action();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-normal text-zinc-300 hover:text-white hover:bg-white/10 transition-colors text-left"
                      >
                        <span>{item.label}</span>
                        <span className="text-zinc-500 text-[10px]">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Top-Right Status & Studio Pills */}
            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex h-8 px-3.5 items-center gap-2 bg-[#121216]/80 border border-white/10 rounded-full backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] font-medium text-white/70">
                  Agency Online
                </span>
              </div>

              <button
                onClick={() => setIsGeneratorOpen(true)}
                className="h-8 px-3.5 flex items-center text-[10px] sm:text-[11px] uppercase tracking-[0.12em] font-medium text-white/80 hover:text-white bg-[#181820]/80 hover:bg-[#22222c] border border-white/10 rounded-full backdrop-blur-md transition-colors"
              >
                Inquire
              </button>
            </div>
          </header>

          {/* HERO MAIN BODY */}
          <section className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex-1 flex flex-col justify-center my-auto py-2">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start">
              
              {/* LEFT CONTENT COLUMN */}
              <div className="md:col-span-7 flex flex-col items-start text-left animate-fade-up-2">
                {/* Micro-label Badge: FULL-SERVICE AGENCY */}
                <div className="h-7 px-3.5 inline-flex items-center gap-2 bg-[#121216]/80 border border-white/10 rounded-full mb-4 backdrop-blur-md">
                  <span className="w-[5px] h-[5px] rounded-full bg-[#ff5500] shadow-[0_0_6px_#ff5500]" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/80">
                    DIGITAL AGENCY • WEB APPS • AI SOLUTIONS
                  </span>
                </div>

                {/* Major Editorial Headline (Times New Roman Serif - Half Size) */}
                <h1
                  className="font-serif font-normal tracking-[-0.015em] leading-[1.08] text-[clamp(1.15rem,2.1vw,2.15rem)] text-left select-none max-w-[26ch]"
                  style={{
                    filter: 'drop-shadow(0 2px 14px rgba(0, 0, 0, 0.45))',
                  }}
                >
                  <span className="text-[#E6DDF5]">
                    WE BUILD INTELLIGENT DIGITAL EXPERIENCES FOR{' '}
                  </span>
                  <span className="bg-gradient-to-r from-[#E6DDF5] via-[#D9CCF2] to-[#B79CFF] bg-clip-text text-transparent italic font-normal inline">
                    BRANDS THAT LEAD
                  </span>
                </h1>

                {/* Plain Inline Capabilities Row */}
                <div
                  className="mt-5 flex flex-wrap items-center gap-3.5 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-white/70"
                  style={{
                    filter: 'drop-shadow(0 2px 12px rgba(0, 0, 0, 0.35))',
                  }}
                >
                  <span>Design & Web Apps</span>
                  <span className="text-white/30">•</span>
                  <span>AI & Automations</span>
                  <span className="text-white/30">•</span>
                  <span>SEO / GEO / AEO</span>
                  <span className="text-white/30">•</span>
                  <span>360° Marketing</span>
                </div>
              </div>

              {/* RIGHT CONTENT COLUMN */}
              <div className="md:col-span-5 flex flex-col items-start text-left md:pl-4 lg:pl-8 animate-fade-up-3 pt-1">
                {/* Supporting Paragraph */}
                <p
                  className="text-[13px] sm:text-[14px] font-normal leading-[1.55] max-w-[34ch] text-white/70"
                  style={{
                    filter: 'drop-shadow(0 2px 12px rgba(0, 0, 0, 0.35))',
                  }}
                >
                  <strong className="font-semibold uppercase tracking-[0.08em] text-white">
                    DREAMFRAME
                  </strong>{' '}
                  delivers end-to-end digital mastery — from dynamic web apps and brand design systems to autonomous AI workflows, graphic suites, and generative search dominance.
                </p>

                {/* Scaled-down CTA Button */}
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => setIsGeneratorOpen(true)}
                    className="group h-11 pl-1.5 pr-5 inline-flex items-center gap-3 bg-gradient-to-r from-[#ff5500] via-[#ff6a1a] to-[#ff5500] hover:from-[#ff6a1a] hover:to-[#ff5500] text-white rounded-full transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(255,85,0,0.35)] hover:shadow-[0_6px_28px_rgba(255,85,0,0.55)] active:scale-[0.99]"
                  >
                    {/* White circle arrow icon */}
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 shadow-sm">
                      <svg
                        className="w-3.5 h-3.5 text-black stroke-[2.5]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </span>

                    {/* Button Text */}
                    <span className="font-semibold text-[14px] tracking-[0.01em] text-white leading-none">
                      Start a Project
                    </span>
                  </button>
                </div>

                {/* Micro-copy note */}
                <div
                  className="mt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white/60"
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.35))',
                  }}
                >
                  Full-stack execution • Concept to exponential scale
                </div>
              </div>

            </div>
          </section>

          {/* BOTTOM OVERSIZED BRAND TYPOGRAPHY: Full-Width SVG Edge-to-Edge Glass Wordmark */}
          <footer
            aria-hidden="true"
            className="relative z-10 w-full select-none pointer-events-none pb-0 -mb-1 sm:-mb-2 flex justify-center items-end overflow-hidden animate-fade-up-4"
          >
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex justify-center text-center overflow-visible relative">
              <svg
                viewBox="-4 0 1208 142"
                className="w-full h-auto max-h-[18vh] sm:max-h-[22vh] overflow-visible block select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Thin crisp outline gradient */}
                  <linearGradient id="glassStrokeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.58)" />
                    <stop offset="50%" stopColor="rgba(255, 255, 255, 0.35)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
                  </linearGradient>

                  {/* Translucent glass fill gradient */}
                  <linearGradient id="glassFillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.10)" />
                    <stop offset="60%" stopColor="rgba(255, 255, 255, 0.04)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.01)" />
                  </linearGradient>

                  {/* Faint ambient glass glow */}
                  <filter id="glassSoftGlow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="rgba(255,255,255,0.08)" />
                  </filter>
                </defs>

                {/* Edge-to-edge SVG text spanning 100% of hero content width */}
                <text
                  x="0"
                  y="120"
                  textLength="1200"
                  lengthAdjust="spacingAndGlyphs"
                  fontSize="140"
                  fill="url(#glassFillGrad)"
                  stroke="url(#glassStrokeGrad)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  filter="url(#glassSoftGlow)"
                  style={{
                    paintOrder: 'fill stroke',
                    fontFamily: 'var(--font-serif), "Times New Roman", Times, serif',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  DREAMFRAME
                </text>
              </svg>
            </div>
          </footer>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: INFINITE DUAL LOGO CAROUSEL (Opposed marquee rows)
      ───────────────────────────────────────────────────────────── */}
      <LogoMarquee />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: ASYMMETRIC BENTO GRID (Exact Structural Reference)
      ───────────────────────────────────────────────────────────── */}
      <BentoGrid />

      {/* ─────────────────────────────────────────────────────────────
          01 — ABOUT / EDITORIAL STATEMENT
      ───────────────────────────────────────────────────────────── */}
      <EditorialAbout />

      {/* ─────────────────────────────────────────────────────────────
          02 — WHAT WE DO / INTERACTIVE CAPABILITIES & SERVICES
      ───────────────────────────────────────────────────────────── */}
      <InteractiveServices />

      {/* ─────────────────────────────────────────────────────────────
          03 — HOW WE WORK / PROCESS TIMELINE
      ───────────────────────────────────────────────────────────── */}
      <ProcessTimeline />

      {/* ─────────────────────────────────────────────────────────────
          04 — SELECTED WORK / VISUAL PRODUCTIONS
      ───────────────────────────────────────────────────────────── */}
      <SelectedWork />

      {/* ─────────────────────────────────────────────────────────────
          05 — TECHNOLOGY / AI INFRASTRUCTURE PHILOSOPHY
      ───────────────────────────────────────────────────────────── */}
      <AiPhilosophy />

      {/* ─────────────────────────────────────────────────────────────
          06 — WHY US / 3 CORE PRINCIPLES
      ───────────────────────────────────────────────────────────── */}
      <CorePrinciples />

      {/* ─────────────────────────────────────────────────────────────
          07 — FINAL DRAMATIC CTA
      ───────────────────────────────────────────────────────────── */}
      <FinalCta onOpenStudio={() => setIsGeneratorOpen(true)} />

      {/* ─────────────────────────────────────────────────────────────
          08 — EDITORIAL FOOTER
      ───────────────────────────────────────────────────────────── */}
      <SiteFooter onOpenStudio={() => setIsGeneratorOpen(true)} />

      {/* ─────────────────────────────────────────────────────────────
          MINIMALIST PROMPT MODAL (UNTOUCHED)
      ───────────────────────────────────────────────────────────── */}
      {isGeneratorOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setIsGeneratorOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#0e0e12] border border-white/15 rounded-2xl p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5500] shadow-[0_0_8px_#ff5500]" />
                <h3 className="text-sm font-semibold text-white">
                  Start a Project • DreamFrame Agency
                </h3>
              </div>
              <button
                onClick={() => setIsGeneratorOpen(false)}
                className="text-zinc-400 hover:text-white text-xs px-2 py-1 rounded transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Minimalist Project Inquiry Form */}
            <form onSubmit={handleGenerate} className="mt-4 space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5">
                  Project Scope & Goals
                </label>
                <textarea
                  rows={3}
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Describe your project, timeline, tech stack, and goals..."
                  className="w-full bg-black border border-white/15 focus:border-[#ff5500] rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors resize-none font-sans font-light"
                />
              </div>

              {/* Service Capability Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5">
                  Primary Capability Needed
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Web Apps & Sites',
                    'Brand & Graphics',
                    'AI & Automations',
                    'SEO / GEO / AEO',
                  ].map((service) => (
                    <button
                      type="button"
                      key={service}
                      onClick={() => setSelectedRatio(service)}
                      className={`py-2 px-3 rounded-lg text-xs transition-colors text-left truncate ${
                        selectedRatio === service
                          ? 'bg-white/15 border border-white/25 text-white font-normal'
                          : 'bg-white/5 border border-transparent text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-[#ff5500] hover:bg-[#ff6a1a] text-white font-medium text-xs py-3 rounded-xl transition-all duration-200 disabled:opacity-50 shadow-[0_2px_16px_rgba(255,85,0,0.4)] cursor-pointer"
              >
                {isGenerating ? 'Transmitting Brief...' : 'Request Project Consultation'}
              </button>
            </form>

            {generationSuccess && (
              <div className="mt-3 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-300 text-xs text-center font-light animate-in fade-in">
                Inquiry received • Our partners will respond within 4 hours
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
