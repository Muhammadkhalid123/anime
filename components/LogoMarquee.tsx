'use client';

import React from 'react';

const TOOLS = [
  'Next.js',
  'TypeScript',
  'React',
  'Three.js',
  'WebGL',
  'Tailwind CSS',
  'GSAP',
  'Node.js',
  'Python',
  'FastAPI',
  'LangChain',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Vercel',
  'Figma',
];

export default function LogoMarquee() {
  // Duplicate for seamless infinite loop
  const marqueeItems = [...TOOLS, ...TOOLS, ...TOOLS];

  return (
    <section className="relative w-full bg-[#0C1D19] py-16 border-y border-[rgba(227,230,225,0.08)] overflow-hidden">
      {/* Editorial caption */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 mb-8">
        <p className="font-meta text-[#8FA39B] text-xs uppercase tracking-wider">
          Tools we build with
        </p>
      </div>

      {/* Marquee Row with edge mask */}
      <div className="relative w-full overflow-hidden marquee-mask group">
        <div className="flex w-max animate-marquee-slow group-hover:[animation-play-state:paused]">
          {marqueeItems.map((tool, index) => (
            <div
              key={index}
              className="flex items-center gap-10 px-8 select-none transition-colors duration-300"
            >
              <span className="font-serif text-2xl sm:text-3xl text-[#8FA39B]/70 group-hover:text-[#8FA39B] hover:!text-[#E3E6E1] hover:underline hover:decoration-[#F0B43A] hover:underline-offset-8 transition-all duration-300 cursor-default">
                {tool}
              </span>
              <span className="w-[1px] h-4 bg-[rgba(227,230,225,0.15)] inline-block" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeSlow {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee-slow {
          animation: marqueeSlow 50s linear infinite;
        }
      `}</style>
    </section>
  );
}
