'use client';

import React, { useState, useRef } from 'react';
import ScrollCanvasSequence from '@/components/ScrollCanvasSequence';
import LogoMarquee from '@/components/LogoMarquee';
import EditorialAbout from '@/components/EditorialAbout';
import InteractiveServices from '@/components/InteractiveServices';
import SelectedWork from '@/components/SelectedWork';
import ProcessTimeline from '@/components/ProcessTimeline';
import CorePrinciples from '@/components/CorePrinciples';
import FinalCta from '@/components/FinalCta';
import SiteFooter from '@/components/SiteFooter';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  const [selectedService, setSelectedService] = useState('Web & software');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Scroll container ref for 450vh scroll sequence
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    setIsSubmitting(true);
    setSubmitSuccess(false);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsGeneratorOpen(false);
        setPromptInput('');
      }, 2500);
    }, 1200);
  };

  return (
    <main className="relative w-full bg-[#0C1D19] text-[#E3E6E1] selection:bg-[#F0B43A] selection:text-[#0A1411] overflow-x-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION (450vh Cinematic Scroll Sequence)
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={scrollContainerRef}
        className="relative w-full h-[450vh] bg-[#0C1D19] text-[#E3E6E1]"
      >
        {/* Pinned Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0C1D19]">
          
          {/* Canvas Sequence Animation */}
          <ScrollCanvasSequence
            containerRef={scrollContainerRef}
            totalFrames={100}
          />

          {/* TOP HEADER */}
          <header className="relative z-30 w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 pt-6 flex items-center justify-between">
            {/* Nav Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="group h-10 px-4 flex items-center gap-3 bg-[#14302A]/80 hover:bg-[#14302A] border border-[rgba(227,230,225,0.14)] rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {/* Minimal studio symbol */}
                <div className="w-4 h-4 rounded-full border border-[#E3E6E1]/40 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E3E6E1]" />
                </div>

                <span className="font-sans text-sm font-medium text-[#E3E6E1]">
                  DreamFrame
                </span>

                <div className="flex flex-col gap-[3px] text-[#8FA39B] group-hover:text-white transition-colors">
                  <span
                    className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                      isMenuOpen ? 'w-3 rotate-45 translate-y-[2px]' : 'w-3'
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                      isMenuOpen ? 'w-3 -rotate-45 -translate-y-[2.5px]' : 'w-2'
                    }`}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute top-12 left-0 z-40 w-64 bg-[#14302A] border border-[rgba(227,230,225,0.14)] rounded-xl p-3 shadow-2xl backdrop-blur-xl">
                  <div className="font-meta text-[11px] text-[#8FA39B] uppercase tracking-wider mb-2 px-3 pt-1">
                    Studio Index
                  </div>
                  <div className="space-y-1">
                    {[
                      {
                        label: 'About',
                        action: () =>
                          window.scrollTo({
                            top: window.innerHeight * 4.6,
                            behavior: 'smooth',
                          }),
                      },
                      {
                        label: 'Services',
                        action: () =>
                          window.scrollTo({
                            top: window.innerHeight * 5.8,
                            behavior: 'smooth',
                          }),
                      },
                      {
                        label: 'Selected Work',
                        action: () =>
                          window.scrollTo({
                            top: window.innerHeight * 7.2,
                            behavior: 'smooth',
                          }),
                      },
                      {
                        label: 'Process',
                        action: () =>
                          window.scrollTo({
                            top: window.innerHeight * 9.5,
                            behavior: 'smooth',
                          }),
                      },
                      {
                        label: 'Contact',
                        action: () => setIsGeneratorOpen(true),
                      },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (item.action) item.action();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#E3E6E1]/90 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <span className="font-meta text-[#8FA39B] text-xs">
                          0{idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Top Right Action */}
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-block font-meta text-[#8FA39B] text-xs">
                Taking Q1/Q2 projects
              </span>
              <button
                onClick={() => setIsGeneratorOpen(true)}
                className="h-9 px-4 inline-flex items-center font-sans text-xs font-medium uppercase tracking-wider bg-[#E3E6E1] hover:bg-white text-[#0A1411] rounded-full transition-colors cursor-pointer"
              >
                Inquire
              </button>
            </div>
          </header>

          {/* HERO MAIN BODY */}
          <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 flex-1 flex flex-col justify-center py-8">
            
            {/* Left Headline */}
            <div className="max-w-3xl pt-2 sm:pt-6">
              <span className="font-meta text-[#8FA39B] text-xs uppercase tracking-wider mb-4 block">
                Digital studio & engineering
              </span>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.6rem] font-light leading-[1.08] tracking-[-0.02em] text-[#E3E6E1] max-w-[22ch]">
                We build web, AI and search systems.{' '}
                <span className="text-[#8FA39B]">Quietly, and properly.</span>
              </h1>
            </div>

          </section>

          {/* Over-scaled Brand Typography Bottom Wordmark */}
          <footer
            aria-hidden="true"
            className="relative z-10 w-full select-none pointer-events-none pb-2 flex justify-center items-end overflow-hidden"
          >
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 flex justify-center text-center overflow-visible relative">
              <span className="font-serif font-light text-[clamp(3.5rem,14vw,14rem)] leading-none text-[#E3E6E1]/10 tracking-tight select-none">
                DreamFrame
              </span>
            </div>
          </footer>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 0: RESTYLED LOGO MARQUEE (1 Row, Newsreader, Saffron)
      ───────────────────────────────────────────────────────────── */}
      <LogoMarquee />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: STATEMENT (Pine background, 12-col layout)
      ───────────────────────────────────────────────────────────── */}
      <EditorialAbout />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: SERVICES INDEX (Pine background, cursor preview, accordion)
      ───────────────────────────────────────────────────────────── */}
      <InteractiveServices onInquire={() => setIsGeneratorOpen(true)} />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: SELECTED WORK (Fog background, SIGNATURE MOTION #1 reel)
      ───────────────────────────────────────────────────────────── */}
      <SelectedWork />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: PROCESS (Pine background, SIGNATURE MOTION #2 pinned stepping)
      ───────────────────────────────────────────────────────────── */}
      <ProcessTimeline />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: PRINCIPLES (Pine background, 3 plain hairline rows)
      ───────────────────────────────────────────────────────────── */}
      <CorePrinciples />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: CONTACT (Fog background, large headline + email)
      ───────────────────────────────────────────────────────────── */}
      <FinalCta onOpenStudio={() => setIsGeneratorOpen(true)} />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: SITE FOOTER (Pine background, minimal 3-col)
      ───────────────────────────────────────────────────────────── */}
      <SiteFooter onOpenStudio={() => setIsGeneratorOpen(true)} />

      {/* ─────────────────────────────────────────────────────────────
          PROJECT INQUIRY MODAL
      ───────────────────────────────────────────────────────────── */}
      {isGeneratorOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsGeneratorOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#0C1D19] border border-[rgba(227,230,225,0.15)] rounded-none p-8 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-baseline justify-between pb-6 border-b border-[rgba(227,230,225,0.12)]">
              <div>
                <span className="font-meta text-[#8FA39B] text-xs uppercase tracking-wider block">
                  Studio Inquiry
                </span>
                <h3 className="font-serif text-2xl font-light text-[#E3E6E1] mt-1">
                  Start a project
                </h3>
              </div>
              <button
                onClick={() => setIsGeneratorOpen(false)}
                className="font-meta text-xs text-[#8FA39B] hover:text-white px-2 py-1 transition-colors cursor-pointer"
              >
                Close [ESC]
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitInquiry} className="mt-6 space-y-6">
              <div>
                <label className="font-meta text-xs text-[#8FA39B] uppercase tracking-wider block mb-2">
                  Project Scope & Goals
                </label>
                <textarea
                  rows={3}
                  required
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Tell us what you want to build, target timeline, and any key requirements..."
                  className="w-full bg-[#14302A] border border-[rgba(227,230,225,0.15)] focus:border-[#F0B43A] rounded-none p-3.5 text-sm text-[#E3E6E1] placeholder-[#8FA39B]/60 focus:outline-none transition-colors resize-none font-sans"
                />
              </div>

              <div>
                <label className="font-meta text-xs text-[#8FA39B] uppercase tracking-wider block mb-2">
                  Primary Capability
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Web & software',
                    'AI & automation',
                    'Brand & design',
                    'Search & growth',
                  ].map((service) => (
                    <button
                      type="button"
                      key={service}
                      onClick={() => setSelectedService(service)}
                      className={`py-2.5 px-3 rounded-none text-xs font-sans transition-colors text-left ${
                        selectedService === service
                          ? 'bg-[#14302A] border border-[#F0B43A] text-white font-medium'
                          : 'bg-[#14302A]/50 border border-transparent text-[#8FA39B] hover:text-white'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-saffron disabled:opacity-50 mt-4"
              >
                {isSubmitting ? 'Sending brief...' : 'Send project inquiry'}
              </button>
            </form>

            {submitSuccess && (
              <div className="mt-4 p-3 bg-[#14302A] border border-[#F0B43A]/40 text-[#E3E6E1] text-xs font-meta text-center animate-in fade-in">
                Inquiry received · We will respond within 24 hours.
              </div>
            )}
          </div>
        </div>
      )}

    </main>
  );
}
