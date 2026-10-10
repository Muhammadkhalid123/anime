'use client';

import React from 'react';

export default function SiteFooter({
  onOpenStudio,
}: {
  onOpenStudio?: () => void;
}) {
  return (
    <footer className="relative w-full bg-[#0C1D19] text-[#E3E6E1] py-20 sm:py-24">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        
        {/* Top 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[rgba(227,230,225,0.1)]">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl font-normal text-[#E3E6E1]">
              DreamFrame
            </span>
            <p className="font-body text-[#8FA39B] text-sm max-w-[32ch]">
              Digital studio for bespoke web systems, autonomous AI tools, and
              search visibility.
            </p>
          </div>

          {/* Services Col */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-meta text-[#8FA39B] text-xs uppercase tracking-wider block mb-2">
              Capabilities
            </span>
            <ul className="space-y-2 text-sm text-[#E3E6E1]/80">
              <li>Web & Software Platforms</li>
              <li>Autonomous AI & Automation</li>
              <li>Brand Identity & Motion</li>
              <li>Generative Search (GEO & SEO)</li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-meta text-[#8FA39B] text-xs uppercase tracking-wider block mb-2">
              Inquiries
            </span>
            <div className="space-y-2 text-sm text-[#E3E6E1]/80">
              <a
                href="mailto:studio@dreamframe.agency"
                className="hover:text-white transition-colors block"
              >
                studio@dreamframe.agency
              </a>
              <p className="text-[#8FA39B] text-xs">
                Operating internationally with remote teams.
              </p>
              {onOpenStudio && (
                <button
                  onClick={onOpenStudio}
                  className="text-xs text-[#F0B43A] hover:underline pt-2 inline-block cursor-pointer"
                >
                  Start a project consultation →
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-meta text-[#8FA39B] text-xs">
            © {new Date().getFullYear()} DreamFrame. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-meta text-[#8FA39B] text-xs">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Index</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
