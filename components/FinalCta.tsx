'use client';

import React from 'react';

export default function FinalCta({
  onOpenStudio,
}: {
  onOpenStudio?: () => void;
}) {
  return (
    <section className="relative w-full bg-[#E3E6E1] text-[#0A1411] py-32 sm:py-44 border-b border-[rgba(10,20,17,0.14)]">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        
        {/* Section Marker */}
        <div className="mb-8">
          <span className="font-meta text-[#0A1411]/60 text-xs uppercase tracking-wider block">
            Contact
          </span>
        </div>

        {/* Big Statement */}
        <div className="space-y-8 max-w-5xl">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.02] tracking-[-0.02em] text-[#0A1411]">
            Have a project in mind?
          </h2>

          <p className="font-body text-[#0A1411]/80 text-lg sm:text-2xl font-normal leading-relaxed max-w-[50ch]">
            Tell us what you need. We review scopes promptly and return with an
            honest architectural assessment and timeline.
          </p>

          {/* Email Link with Saffron Underline */}
          <div className="pt-4">
            <a
              href="mailto:studio@dreamframe.agency"
              className="link-editorial font-serif text-2xl sm:text-4xl text-[#0A1411] hover:text-[#0C1D19] transition-colors"
            >
              studio@dreamframe.agency
            </a>
          </div>

          {/* Actions & Note */}
          <div className="pt-8 flex flex-col sm:flex-row sm:items-center gap-6">
            {onOpenStudio && (
              <button onClick={onOpenStudio} className="btn-saffron">
                Start a project
              </button>
            )}
            <span className="font-meta text-[#0A1411]/60 text-xs sm:text-sm">
              Taking projects for upcoming quarters.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
