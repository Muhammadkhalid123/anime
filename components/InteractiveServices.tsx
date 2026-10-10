'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ServiceItem {
  number: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  tags: string[];
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'DYNAMIC & STATIC WEB APPS',
    category: 'WEB ENGINEERING',
    description: 'Full-stack Next.js platforms, dynamic database architectures, custom CMS solutions, and lightning-fast static websites with interactive 3D WebGL experiences.',
    imageSrc: '/services/web_apps.jpg',
    tags: ['Next.js 15', 'Full-Stack Web Apps', 'Static & Dynamic', '3D WebGL'],
  },
  {
    number: '02',
    title: 'DESIGN AGENCY & ALL GRAPHICS',
    category: 'BRAND & CREATIVE',
    description: 'Bespoke brand identities, 3D motion graphics, marketing suites, pitch decks, and tactile UI/UX design systems crafted for market distinction.',
    imageSrc: '/services/design_graphics.jpg',
    tags: ['Brand Identity', 'All Graphics', '3D Motion', 'UI/UX Systems'],
  },
  {
    number: '03',
    title: 'CUSTOM AI SOLUTIONS & AUTOMATIONS',
    category: 'INTELLIGENT SYSTEMS',
    description: 'Proprietary LLM agents, intelligent workflow automations, custom AI integrations, and automated operational pipelines that eliminate bottlenecks.',
    imageSrc: '/services/ai_automations.jpg',
    tags: ['Autonomous Agents', 'Custom AI Models', 'Workflow Automation'],
  },
  {
    number: '04',
    title: 'SEO, GEO & AEO DOMINANCE',
    category: 'SEARCH DOMINANCE',
    description: 'End-to-end search supremacy: Google Organic SEO, Generative Engine Optimization (ChatGPT / Claude citations), and Answer Engine Optimization (Perplexity).',
    imageSrc: '/services/search_seo_geo.png',
    tags: ['Google SEO', 'GEO (LLM Citations)', 'AEO (Perplexity Rank)'],
  },
  {
    number: '05',
    title: 'FULL-SERVICE MARKETING AGENCY',
    category: 'GROWTH & MEDIA',
    description: 'Strategic digital marketing, paid performance media, conversion rate optimization (CRO), content engines, and automated retention funnels.',
    imageSrc: '/services/growth_marketing.png',
    tags: ['Performance Media', 'CRO Funnels', 'Content Engine', '360° Scale'],
  },
  {
    number: '06',
    title: 'CUSTOM SOFTWARE & API ARCHITECTURE',
    category: 'ENTERPRISE TECH',
    description: 'Mission-critical software development, high-throughput cloud infrastructure, secure API gateways, and microservices built for limitless scale.',
    imageSrc: '/services/cloud_api.png',
    tags: ['Cloud Microservices', 'High-Throughput APIs', 'Enterprise SLA'],
  },
];

export default function InteractiveServices() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="relative z-20 w-full bg-[#050508] text-white py-28 sm:py-36 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/[0.08] overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-radial from-[#ff5500]/06 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-radial from-[#8b5cf6]/08 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-medium text-[#ff5500] tracking-wider">
                02
              </span>
              <span className="h-[1px] w-8 bg-white/20" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                WHAT WE DO
              </span>
            </div>
            <h2 className="font-serif font-normal text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[0.98] text-white">
              Capabilities &{' '}
              <span className="italic bg-gradient-to-r from-[#E6DDF5] via-[#D9CCF2] to-[#B79CFF] bg-clip-text text-transparent">
                Services
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-white/50 font-normal max-w-sm text-left md:text-right font-sans leading-relaxed">
            Full-spectrum capabilities designed for ambitious brands seeking exponential market leadership through design, web apps, AI, and search dominance.
          </p>
        </div>

        {/* 2-Column Interactive Layout: List on Left, Dynamic Visual on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Numbered List (7 Cols) */}
          <div className="lg:col-span-7 divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
            {SERVICES.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={service.number}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group py-6 sm:py-7 px-3 sm:px-4 transition-all duration-300 cursor-pointer rounded-2xl ${
                    isActive 
                      ? 'liquid-glass-card border-white/20 bg-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.6)]' 
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 sm:gap-6 text-left">
                      <span className={`text-xs sm:text-sm font-mono transition-colors ${
                        isActive ? 'text-[#ff5500] font-semibold' : 'text-white/40 group-hover:text-white/70'
                      }`}>
                        {service.number}
                      </span>
                      <h3 className={`text-base sm:text-lg md:text-xl font-sans tracking-[0.01em] transition-colors ${
                        isActive ? 'text-white font-semibold' : 'text-white/70 group-hover:text-white font-medium'
                      }`}>
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-wider text-white/40 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02]">
                        {service.category}
                      </span>
                      <span className={`text-sm sm:text-base transition-transform duration-300 font-mono ${
                        isActive ? 'text-[#ff5500] translate-x-1' : 'text-white/30 group-hover:text-white/60'
                      }`}>
                        {isActive ? '→' : '+'}
                      </span>
                    </div>
                  </div>

                  {/* Expandable Description and Tags */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out text-left ${
                      isActive ? 'max-h-40 opacity-100 pt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed pl-8 sm:pl-10 pr-4 max-w-xl">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pl-8 sm:pl-10 mt-3.5">
                      {service.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono text-white/80 bg-white/[0.06] border border-white/15 px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Dynamic Visual Display Card (5 Cols) with 3D Liquid Glassmorphism */}
          <div className="lg:col-span-5 sticky top-28 hidden lg:block">
            <div className="w-full liquid-glass-card rounded-[32px] p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-2xl relative overflow-hidden group">
              
              {/* Liquid Specular Diagonal Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-[32px]" />
              
              {/* Ambient colored orb */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-radial from-[#ff5500]/20 via-[#8b5cf6]/10 to-transparent blur-2xl pointer-events-none group-hover:scale-115 transition-transform duration-700" />

              {/* Image Preview Container with Smooth Fade Transition */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.7)]">
                <Image
                  key={SERVICES[activeIndex].imageSrc}
                  src={SERVICES[activeIndex].imageSrc}
                  alt={SERVICES[activeIndex].title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 animate-in fade-in zoom-in-95 duration-300"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Top Corner Badge with 3D Glass Pill */}
                <div className="absolute top-3 left-3 liquid-glass-pill px-3 py-1 rounded-full backdrop-blur-md">
                  <span className="text-[10px] font-mono text-[#ff6a1a] font-semibold tracking-wider">
                    {SERVICES[activeIndex].number} / {SERVICES[activeIndex].category}
                  </span>
                </div>
              </div>

              {/* Bottom Card Meta Details */}
              <div className="mt-5 text-left px-1 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white tracking-wide font-sans">
                    {SERVICES[activeIndex].title}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 liquid-glass-pill px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Q1/Q2
                  </span>
                </div>
                <p className="mt-2.5 text-xs text-white/60 leading-relaxed font-sans">
                  {SERVICES[activeIndex].description}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
