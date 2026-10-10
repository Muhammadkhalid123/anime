'use client';

import React from 'react';

interface SiteFooterProps {
  onOpenStudio: () => void;
}

export default function SiteFooter({ onOpenStudio }: SiteFooterProps) {
  return (
    <footer className="relative z-20 w-full bg-black text-white pt-20 pb-12 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/[0.08] select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/[0.08] text-left">
          
          {/* Brand Info (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border border-[#ff5500] p-[1.5px] flex items-center justify-center shadow-[0_0_8px_rgba(255,85,0,0.35)]">
                <div className="w-full h-full rounded-full flex items-center justify-center gap-[1.5px]">
                  <span className="w-[1.5px] h-3 bg-[#ff5500] rounded-full" />
                  <span className="w-[1.5px] h-3.5 bg-[#ff6a1a] rounded-full" />
                  <span className="w-[1.5px] h-3 bg-[#ff5500] rounded-full" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-sans">
                DreamFrame
              </span>
            </div>

            <p className="text-xs text-white/50 font-sans leading-relaxed max-w-sm">
              Full-spectrum creative agency, dynamic web engineering studio, AI solutions architect, and search dominance powerhouse (SEO • GEO • AEO).
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Full Agency Pipeline Active • Ready for New Engagements</span>
            </div>
          </div>

          {/* Links Column 1: Capabilities (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-white/40">
              Capabilities & Solutions
            </div>
            <ul className="space-y-2 text-xs font-sans text-white/70">
              <li>
                <button
                  onClick={onOpenStudio}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Start Project Consultation
                </button>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Web Apps & Dynamic Sites
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Design Agency & All Graphics
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  AI Solutions & Autonomous Workflows
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  SEO, GEO & AEO Search Engine Domination
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Full 360° Growth Marketing
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Resources (2 Cols) */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-white/40">
              Resources
            </div>
            <ul className="space-y-2 text-xs font-sans text-white/70">
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Our 4-Stage Process
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">
                  Technology Stack
                </a>
              </li>
              <li>
                <a href="#principles" className="hover:text-white transition-colors">
                  Core Principles
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Enterprise & Trust (2 Cols) */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-white/40">
              Enterprise & Locations
            </div>
            <ul className="space-y-2 text-xs font-sans text-white/70">
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Enterprise Security & SLA
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Commercial Master Terms
                </a>
              </li>
              <li>
                <span className="text-[11px] text-white/40 font-mono block pt-1">
                  New York • London • Tokyo
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/40">
          <div>
            © 2026 DREAMFRAME INC. FULL-SPECTRUM BRAND & DIGITAL SOLUTIONS.
          </div>
          <div className="flex items-center gap-6">
            <span>INDEXING: 100% SEO/GEO</span>
            <span>•</span>
            <span>STACK: NEXT.JS 15</span>
            <span>•</span>
            <span className="text-white/60">STATUS: ACCEPTING CLIENTS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
