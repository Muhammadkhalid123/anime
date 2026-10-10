'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
  title: string;
  year: string;
  tagline: string;
  stack: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Aetheria',
    year: '2026',
    tagline: 'Spatial commerce platform with a realtime 3D configurator.',
    stack: 'Next.js · WebGL · Three.js · Stripe',
    image: '/hero-techwear.jpg',
  },
  {
    title: 'Kinetix Systems',
    year: '2025',
    tagline: 'Autonomous operations and generative synthesis pipelines.',
    stack: 'Python · LangChain · FastAPI · PostgreSQL',
    image: '/services/ai_automations.jpg',
  },
  {
    title: 'Lumina Studios',
    year: '2025',
    tagline: 'Editorial brand identity system and AI search authority.',
    stack: 'Design Systems · GEO / AEO · Next.js',
    image: '/services/design_graphics.jpg',
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile || !sectionRef.current || !trackRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const scrollDistance = () => track.scrollWidth - window.innerWidth;

      const reelTween = gsap.to(track, {
        x: () => -scrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.6,
          start: 'top top',
          end: () => `+=${scrollDistance() + 200}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // Clip path image reveals for each slide
      const cards = track.querySelectorAll('.project-card');
      cards.forEach((card) => {
        const img = card.querySelector('.project-image-wrap');
        if (img) {
          gsap.fromTo(
            img,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              ease: 'power2.out',
              duration: 1,
              scrollTrigger: {
                trigger: card,
                containerAnimation: reelTween,
                start: 'left 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#E3E6E1] text-[#0A1411] overflow-hidden select-none border-b border-[rgba(10,20,17,0.14)]"
    >
      {/* Top Header inside Fog Section */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 pt-24 sm:pt-28 pb-12 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div>
          <span className="font-meta text-[#0A1411]/60 text-xs uppercase tracking-wider block mb-2">
            Selected Work
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#0A1411] tracking-[-0.02em]">
            Recent studio productions
          </h2>
        </div>
        <p className="font-meta text-[#0A1411]/60 text-xs sm:text-sm">
          Scroll to explore projects
        </p>
      </div>

      {/* Horizontal Reel Track (Desktop) / Vertical Stack (Mobile) */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:w-max px-6 sm:px-12 md:px-16 pb-24 md:pb-32 gap-12 md:gap-16 items-start"
      >
        {PROJECTS.map((proj, idx) => (
          <div
            key={idx}
            className="project-card w-full md:w-[75vw] max-w-[960px] flex-shrink-0 flex flex-col group"
          >
            {/* Project Header Row */}
            <div className="flex items-baseline justify-between border-b border-[rgba(10,20,17,0.14)] pb-4 mb-6">
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#0A1411]">
                {proj.title}
              </h3>
              <span className="font-meta text-[#0A1411]/70 text-sm">
                {proj.year}
              </span>
            </div>

            {/* 16:9 Project Image Frame */}
            <div className="project-image-wrap relative w-full aspect-[16/9] bg-[#14302A] overflow-hidden mb-6 transition-all duration-500">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 75vw"
                priority={idx === 0}
              />
            </div>

            {/* Project Description & Meta Footer */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <p className="font-body text-[#0A1411]/85 text-base sm:text-lg font-normal max-w-[45ch]">
                {proj.tagline}
              </p>
              <span className="font-meta text-[#0A1411]/60 text-xs sm:text-sm whitespace-nowrap">
                {proj.stack}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Saffron Progress Bar Indicator along bottom (Desktop) */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-[2px] bg-[rgba(10,20,17,0.1)]">
        <div
          ref={progressBarRef}
          className="h-full bg-[#F0B43A] origin-left transition-transform duration-75"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </section>
  );
}
