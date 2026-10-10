'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface ServiceItem {
  id: string;
  title: string;
  meta: string;
  description: string;
  deliverables: string[];
  image: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'web-software',
    title: 'Web & software',
    meta: 'Next.js · WebGL & 3D · Custom APIs',
    description:
      'Full-stack web applications, headless commerce systems, and fluid interactive platforms built with Next.js, TypeScript, and modern database architectures. Fast, robust, and designed for longevity.',
    deliverables: [
      'Full-stack Next.js applications',
      'Interactive 3D & WebGL experiences',
      'Headless CMS & Custom APIs',
      'Performance & accessibility audits',
    ],
    image: '/services/web_apps.jpg',
  },
  {
    id: 'ai-automation',
    title: 'AI & automation',
    meta: 'Autonomous Agents · Workflow Pipelines',
    description:
      'Custom AI agents and automated pipelines that handle repetitive operational tasks, lead routing, document processing, and client engagement without human intervention.',
    deliverables: [
      'Autonomous agent workflows',
      'Multi-model LLM integrations',
      'Custom backend pipeline tooling',
      'Data synthesis & internal tools',
    ],
    image: '/services/ai_automations.jpg',
  },
  {
    id: 'brand-design',
    title: 'Brand & design',
    meta: 'Identity Systems · Motion · UI/UX',
    description:
      'Comprehensive brand identity systems, custom typography craft, bespoke motion design, and high-conversion editorial layouts tailored for distinctive market positioning.',
    deliverables: [
      'Complete brand identity & design systems',
      'Interaction & bespoke motion design',
      'Editorial typography & art direction',
      'Production-ready Figma component suites',
    ],
    image: '/services/design_graphics.jpg',
  },
  {
    id: 'search-growth',
    title: 'Search & growth',
    meta: 'Technical SEO · GEO & AEO · Performance',
    description:
      'Engineered visibility designed to win organic rankings on traditional search engines while securing direct citations and recommendations inside generative AI engines like ChatGPT and Perplexity.',
    deliverables: [
      'Technical SEO architecture & schema',
      'Generative Engine Optimization (GEO & AEO)',
      'Knowledge graph structuring',
      'Performance analytics & attribution',
    ],
    image: '/services/search_seo_geo.png',
  },
];

export default function InteractiveServices({
  onInquire,
}: {
  onInquire?: () => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || !previewContainerRef.current) return;

    gsap.set(previewContainerRef.current, {
      xPercent: -50,
      yPercent: -50,
      scale: 0.9,
      opacity: 0,
      pointerEvents: 'none',
    });

    xTo.current = gsap.quickTo(previewContainerRef.current, 'x', {
      duration: 0.45,
      ease: 'power3',
    });
    yTo.current = gsap.quickTo(previewContainerRef.current, 'y', {
      duration: 0.45,
      ease: 'power3',
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (xTo.current && yTo.current) {
        xTo.current(e.clientX);
        yTo.current(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMouseEnterRow = (index: number) => {
    setHoveredIndex(index);
    if (previewContainerRef.current) {
      gsap.to(previewContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power3.out',
      });
    }
  };

  const handleMouseLeaveRow = () => {
    setHoveredIndex(null);
    if (previewContainerRef.current) {
      gsap.to(previewContainerRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.25,
        ease: 'power3.in',
      });
    }
  };

  const toggleRow = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0C1D19] text-[#E3E6E1] py-28 sm:py-36 border-b border-[rgba(227,230,225,0.08)]"
    >
      {/* Floating Hover Cursor Preview (Desktop Only) */}
      <div
        ref={previewContainerRef}
        className="fixed top-0 left-0 z-40 hidden md:block w-72 h-44 overflow-hidden rounded-none shadow-2xl border border-[rgba(227,230,225,0.2)] bg-[#14302A] pointer-events-none"
        style={{ willChange: 'transform, opacity' }}
      >
        {SERVICES.map((srv, idx) => (
          <div
            key={srv.id}
            className={`absolute inset-0 transition-opacity duration-300 ${
              hoveredIndex === idx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={srv.image}
              alt={srv.title}
              fill
              className="object-cover"
              sizes="288px"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 items-baseline">
          <div className="md:col-span-3">
            <span className="font-meta text-[#8FA39B] text-xs uppercase tracking-wider block">
              Services
            </span>
          </div>
          <div className="md:col-span-9">
            <p className="font-serif text-2xl sm:text-3xl text-[#8FA39B] font-light">
              Four core capabilities, delivered by one focused team.
            </p>
          </div>
        </div>

        {/* 4 Index Rows */}
        <div className="w-full divide-y divide-[rgba(227,230,225,0.14)] border-y border-[rgba(227,230,225,0.14)]">
          {SERVICES.map((service, idx) => {
            const isOpen = activeId === service.id;
            const isAnyHovered = hoveredIndex !== null;
            const isThisHovered = hoveredIndex === idx;

            return (
              <div
                key={service.id}
                className={`group relative transition-all duration-300 ${
                  isAnyHovered && !isThisHovered ? 'opacity-40' : 'opacity-100'
                }`}
                onMouseEnter={() => handleMouseEnterRow(idx)}
                onMouseLeave={handleMouseLeaveRow}
              >
                {/* Row Summary Button */}
                <button
                  onClick={() => toggleRow(service.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F0B43A] focus-visible:outline-offset-4"
                >
                  {/* Left: Row Title */}
                  <div className="flex items-center gap-6 transition-transform duration-300 group-hover:translate-x-3">
                    <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#E3E6E1] group-hover:text-white transition-colors">
                      {service.title}
                    </span>
                  </div>

                  {/* Right: Meta & Expand indicator */}
                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <span className="font-meta text-[#8FA39B] text-xs sm:text-sm">
                      {service.meta}
                    </span>
                    <span
                      className={`w-6 h-6 flex items-center justify-center text-[#8FA39B] group-hover:text-[#F0B43A] font-light text-xl transition-transform duration-300 ${
                        isOpen ? 'rotate-45 text-[#F0B43A]' : 'rotate-0'
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* Smooth Expandable Drawer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isOpen ? 'max-h-[500px] opacity-100 pb-10' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-[rgba(227,230,225,0.08)]">
                    <div className="md:col-span-6">
                      <p className="font-body text-[#E3E6E1]/90 text-base sm:text-lg leading-relaxed mb-6">
                        {service.description}
                      </p>
                      {onInquire && (
                        <button
                          onClick={onInquire}
                          className="btn-saffron text-sm mt-2"
                        >
                          Start a project
                        </button>
                      )}
                    </div>

                    <div className="md:col-span-6 md:pl-8">
                      <span className="font-meta text-[#8FA39B] text-xs uppercase tracking-wider block mb-3">
                        Key Deliverables
                      </span>
                      <ul className="space-y-2">
                        {service.deliverables.map((item, dIdx) => (
                          <li
                            key={dIdx}
                            className="font-body text-[#E3E6E1]/80 text-sm flex items-start gap-2"
                          >
                            <span className="text-[#F0B43A] mt-1 text-xs">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
