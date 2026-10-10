'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';

// Shading & Visualization Modes
export type ShadingMode = 'pbr' | 'wireframe' | 'clay' | 'depth' | 'botanical';
export type LightingPreset = 'sunset' | 'studio' | 'cyberpunk' | 'overcast';

// Preset 3D Assets for timeline switcher
interface Asset3D {
  id: string;
  name: string;
  category: string;
  polyCount: string;
  vertCount: string;
  sizeMb: string;
  prompt: string;
  imageSrc: string;
  lighting: LightingPreset;
  dimensions: { w: string; l: string; h: string };
}

const PRESET_ASSETS: Asset3D[] = [
  {
    id: 'bed-cloud',
    name: 'Sunset Cloud Bed',
    category: 'Surreal Architecture',
    polyCount: '124,850',
    vertCount: '62,425',
    sizeMb: '24.8 MB',
    prompt: 'Floating luxury minimalist bed suspended inside voluminous sunset cumulus cloud, warm volumetric peach glow, hyper-detailed textile weave',
    imageSrc: '/bed-cloud.png',
    lighting: 'sunset',
    dimensions: { w: '240 cm', l: '210 cm', h: '185 cm' },
  },
  {
    id: 'hero-main',
    name: 'Cyberpunk Exosuit',
    category: 'Character / Mech',
    polyCount: '186,400',
    vertCount: '94,200',
    sizeMb: '38.2 MB',
    prompt: 'Tactical futuristic streetwear exosuit with carbon-fiber reinforced plating, high-vis orange harness details, studio cinematic render',
    imageSrc: '/hero-main.jpg',
    lighting: 'cyberpunk',
    dimensions: { w: '95 cm', l: '70 cm', h: '190 cm' },
  },
  {
    id: 'hero-techwear',
    name: 'Modular Techwear Rig',
    category: 'Apparel & Hard-Surface',
    polyCount: '98,300',
    vertCount: '49,150',
    sizeMb: '19.4 MB',
    prompt: 'Modular ergonomic chest rig with matte black polycarbonate buckles, weather-sealed nylon ballistic texture, industrial aesthetic',
    imageSrc: '/hero-techwear.jpg',
    lighting: 'studio',
    dimensions: { w: '48 cm', l: '35 cm', h: '62 cm' },
  },
  {
    id: 'hero-female',
    name: 'Neural Android Bust',
    category: 'Biomechanical',
    polyCount: '142,600',
    vertCount: '71,300',
    sizeMb: '29.1 MB',
    prompt: 'Bioluminescent synthetic humanoid portrait with sub-dermal fiber-optic illumination, polished porcelain ceramic skin, soft studio rim lighting',
    imageSrc: '/hero-female.jpg',
    lighting: 'overcast',
    dimensions: { w: '42 cm', l: '38 cm', h: '58 cm' },
  },
];

export default function ModelCreator3D() {
  // State management
  const [selectedAsset, setSelectedAsset] = useState<Asset3D>(PRESET_ASSETS[0]);
  const [shadingMode, setShadingMode] = useState<ShadingMode>('pbr');
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('sunset');
  const [promptText, setPromptText] = useState(PRESET_ASSETS[0].prompt);
  const [meshResolution, setMeshResolution] = useState<'standard' | 'high' | 'ultra'>('high');
  const [polyTarget, setPolyTarget] = useState<number>(125);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [showWireOverlay, setShowWireOverlay] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // 3D Viewport Interaction State (Tilt & Manual Rotation)
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 8, y: -12 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number }>({
    x: 0,
    y: 0,
    rotX: 8,
    rotY: -12,
  });

  // Auto-turntable animation loop
  useEffect(() => {
    if (!isAutoRotate || isDragging) return;
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setRotation((prev) => ({
        x: prev.x,
        y: (prev.y + delta * 12) % 360,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoRotate, isDragging]);

  // Handle asset switch
  const handleSelectAsset = (asset: Asset3D) => {
    setSelectedAsset(asset);
    setPromptText(asset.prompt);
    setLightingPreset(asset.lighting);
  };

  // Handle generation trigger simulation
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setExportNotice('3D Neural Reconstruction Complete (1.3s)');
      setTimeout(() => setExportNotice(null), 3500);
    }, 1400);
  };

  // Export 3D Model trigger
  const handleExport = (format: string) => {
    setExportNotice(`Preparing ${selectedAsset.name} (.${format.toLowerCase()}) package...`);
    setTimeout(() => {
      setExportNotice(`Exported ${selectedAsset.name}.${format.toLowerCase()} (${selectedAsset.sizeMb})`);
      setTimeout(() => setExportNotice(null), 3000);
    }, 1000);
  };

  // Mouse drag to orbit 3D model
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setRotation({
      x: Math.max(-45, Math.min(45, dragStartRef.current.rotX - dy * 0.4)),
      y: dragStartRef.current.rotY + dx * 0.5,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Lighting styling helper
  const lightingGlow = useMemo(() => {
    switch (lightingPreset) {
      case 'sunset':
        return 'radial-gradient(ellipse at 70% 30%, rgba(255, 140, 66, 0.22) 0%, rgba(255, 180, 120, 0.1) 45%, transparent 70%)';
      case 'cyberpunk':
        return 'radial-gradient(ellipse at 70% 30%, rgba(168, 85, 247, 0.25) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 75%)';
      case 'studio':
        return 'radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.35) 0%, rgba(200, 210, 230, 0.12) 60%, transparent 80%)';
      case 'overcast':
        return 'radial-gradient(ellipse at 50% 30%, rgba(220, 230, 242, 0.25) 0%, transparent 70%)';
    }
  }, [lightingPreset]);

  return (
    <section className="relative z-20 w-full bg-[#F4F5F8] text-slate-900 py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-slate-300/80 overflow-hidden font-sans select-none">
      {/* Background Architectural Studio Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Fine coordinate dot matrix */}
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.12) 1.2px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Soft studio ambient light cones */}
        <div className="absolute -top-32 left-1/4 w-[800px] h-[500px] bg-gradient-to-b from-white/90 via-white/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-t from-slate-200/60 to-transparent blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ─────────────────────────────────────────────────────────────
            SECTION HEADER
        ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-8">
          <div className="max-w-2xl text-left">
            {/* Micro Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/90 border border-slate-300/80 px-4 py-1.5 rounded-full mb-4.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#ff5500] shadow-[0_0_8px_rgba(255,85,0,0.6)] animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                3D MODEL CREATOR & SPATIAL ENGINE
              </span>
            </div>

            {/* Section Headline */}
            <h2 className="font-display font-bold uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(2.1rem,4.2vw,3.8rem)] text-slate-900">
              <span>IMAGE & TEXT TO </span>
              <span className="bg-gradient-to-r from-[#ff5500] via-[#ff7722] to-[#8b5cf6] bg-clip-text text-transparent">
                PRODUCTION 3D
              </span>
            </h2>

            <p className="mt-3.5 text-sm sm:text-base font-normal text-slate-600 leading-relaxed max-w-xl">
              Reconstruct high-fidelity 3D meshes with quad-dominant topology, 4K baked PBR material channels, and volumetric lighting from natural prompts or 2D image inputs.
            </p>
          </div>

          {/* Top Engine Mode Pills & Live Stats */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/90 border border-slate-300/80 rounded-2xl p-2 sm:p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] backdrop-blur-md flex items-center gap-1.5">
              {[
                { label: 'Image to 3D', active: true },
                { label: 'Text to 3D', active: false },
                { label: 'Multi-View', active: false },
                { label: 'Auto-Rig', active: false },
              ].map((mode, i) => (
                <button
                  key={i}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    mode.active
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Mesh stats badge */}
            <div className="bg-white/90 border border-slate-300/80 rounded-2xl px-4 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] backdrop-blur-md flex items-center gap-4">
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-mono">Polycount</span>
                <span className="text-xs font-bold text-slate-900 font-mono">{selectedAsset.polyCount}</span>
              </div>
              <div className="h-6 w-[1px] bg-slate-200" />
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-mono">Format</span>
                <span className="text-xs font-bold text-[#ff5500] font-mono">glTF / USDZ</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MAIN 3D CREATOR STUDIO CONTAINER (3-COLUMN PROPORTIONAL LAYOUT)
        ───────────────────────────────────────────────────────────── */}
        <div className="w-full rounded-[32px] bg-white border border-slate-200/90 shadow-[0_24px_70px_rgba(0,0,0,0.07),0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
          
          {/* TOP STUDIO TOOLBAR */}
          <div className="w-full px-5 sm:px-7 py-3.5 border-b border-slate-200/80 bg-slate-50/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
            
            {/* Viewport Shading Mode Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mr-1.5">
                Shading:
              </span>
              {[
                { id: 'pbr', label: 'PBR Texture', icon: '🎨' },
                { id: 'wireframe', label: 'Wireframe', icon: '🌐' },
                { id: 'clay', label: 'Clay / MatCap', icon: '🗿' },
                { id: 'depth', label: 'Normal / Depth', icon: '🌈' },
                { id: 'botanical', label: 'Botanical Sprout', icon: '🌸' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setShadingMode(m.id as ShadingMode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    shadingMode === m.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs">{m.icon}</span>
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Actions (Auto-Rotate, Wireframe Overlay, Dimension Guides) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  isAutoRotate
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
                title="Toggle turntable auto-rotation"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isAutoRotate ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                <span>Turntable</span>
              </button>

              <button
                onClick={() => setShowDimensions(!showDimensions)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  showDimensions
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>CAD Rulers</span>
              </button>

              <button
                onClick={() => setShowWireOverlay(!showWireOverlay)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  showWireOverlay
                    ? 'bg-purple-50 border-purple-300 text-purple-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>Mesh Grid</span>
              </button>
            </div>
          </div>

          {/* MAIN 3-COLUMN WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            
            {/* ─────────────────────────────────────────────────────────────
                LEFT PANEL (3 COLUMNS): PROMPT & MESH GENERATION SETTINGS
            ───────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-3 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-200/80 bg-slate-50/40 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Input Parameters
                  </span>
                  <span className="text-[10px] font-mono bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-full">
                    NeuralMesh v4.2
                  </span>
                </div>

                {/* Prompt Textarea */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Prompt Specification
                  </label>
                  <form onSubmit={handleGenerate} className="space-y-2">
                    <textarea
                      rows={3}
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-[#ff5500] focus:ring-2 focus:ring-[#ff5500]/10 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-all resize-none shadow-sm leading-relaxed"
                      placeholder="Describe 3D geometry, materials, and lighting..."
                    />

                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full bg-[#ff5500] hover:bg-[#ff6a1a] text-white font-medium text-xs py-2.5 px-4 rounded-xl transition-all shadow-[0_2px_12px_rgba(255,85,0,0.3)] hover:shadow-[0_4px_16px_rgba(255,85,0,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>Reconstructing Mesh...</span>
                        </>
                      ) : (
                        <>
                          <span>⚡ Reconstruct 3D Model</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Source Image Reference Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Source Image Input
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                      Linked
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-10 rounded-lg overflow-hidden relative border border-slate-200 bg-slate-100 shrink-0">
                      <Image
                        src={selectedAsset.imageSrc}
                        alt={selectedAsset.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {selectedAsset.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {selectedAsset.category}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mesh Resolution Quality Segment */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Mesh Quality
                    </label>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      {meshResolution === 'ultra' ? '4K Quad-Mesh' : meshResolution === 'high' ? '2K Quad-Mesh' : 'Standard'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                    {(['standard', 'high', 'ultra'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setMeshResolution(lvl)}
                        className={`py-1 text-[11px] font-semibold rounded-lg capitalize transition-all ${
                          meshResolution === lvl
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Polycount Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Poly Target
                    </label>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      {polyTarget}k Polygons
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={300}
                    step={5}
                    value={polyTarget}
                    onChange={(e) => setPolyTarget(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ff5500]"
                  />
                </div>

                {/* PBR Material Channels Active */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Baked PBR Channels
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {['Diffuse / Albedo', 'Roughness (0.35)', 'Normal Map', 'Displacement', 'Ambient Occlusion'].map(
                      (map, i) => (
                        <span
                          key={i}
                          className="bg-white border border-slate-200 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded-md shadow-2xs"
                        >
                          ✓ {map}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Help */}
              <div className="pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                <span>💡 Click and drag the model to inspect from any angle.</span>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                CENTER VIEWPORT (6 COLUMNS): CLEAN LIGHT-GRAY 3D STUDIO CANVAS
            ───────────────────────────────────────────────────────────── */}
            <div
              ref={viewportRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="lg:col-span-6 relative flex items-center justify-center bg-gradient-to-b from-[#F7F8FA] via-[#ECEEF2] to-[#E2E5EA] overflow-hidden cursor-grab active:cursor-grabbing select-none min-h-[480px] sm:min-h-[560px]"
              style={{
                perspective: '1200px',
              }}
            >
              {/* Dynamic Atmospheric Studio Lighting Glow */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-700"
                style={{
                  background: lightingGlow,
                }}
              />

              {/* 3D Perspective Studio Floor Shadow Plane */}
              <div
                className="absolute bottom-12 w-[420px] h-[160px] rounded-full blur-2xl pointer-events-none transition-transform duration-300"
                style={{
                  background:
                    lightingPreset === 'sunset'
                      ? 'radial-gradient(ellipse at center, rgba(255, 120, 40, 0.28) 0%, rgba(15, 23, 42, 0.20) 45%, transparent 70%)'
                      : 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.25) 0%, transparent 70%)',
                  transform: `translateX(${rotation.y * 0.4}px) scale(${1 + Math.sin((rotation.y * Math.PI) / 180) * 0.08})`,
                }}
              />

              {/* 3D Floor Grid Plane with Perspective */}
              <div
                className="absolute bottom-4 w-[600px] h-[240px] opacity-[0.22] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(15,23,42,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.3) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                  transform: 'perspective(600px) rotateX(75deg)',
                }}
              />

              {/* ─────────────────────────────────────────────────────────
                  THE 3D MODEL OBJECT (BED & CLOUD WITH 3D PERSPECTIVE TILT)
              ───────────────────────────────────────────────────────── */}
              <div
                className="relative z-10 w-full max-w-[480px] px-6 sm:px-10 transition-transform duration-100 ease-out flex items-center justify-center"
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(30px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Shading Visual Layer Switcher */}
                <div className="relative w-full aspect-[3/2] flex items-center justify-center">
                  
                  {/* PBR Mode: Full Texture Render */}
                  {shadingMode === 'pbr' && (
                    <div className="relative w-full h-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)] transition-all duration-300">
                      <Image
                        src={selectedAsset.imageSrc}
                        alt={selectedAsset.name}
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                  )}

                  {/* Wireframe Mode: High-Tech Holographic Quad-Grid Overlay */}
                  {shadingMode === 'wireframe' && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="relative w-full h-full opacity-35 filter brightness-110 contrast-125">
                        <Image
                          src={selectedAsset.imageSrc}
                          alt={selectedAsset.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      {/* Procedural Quad Wireframe Matrix Overlay */}
                      <svg
                        viewBox="0 0 400 260"
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Bed Frame Quad Wireframe */}
                        <path
                          d="M 90,120 L 130,110 L 320,135 L 290,185 L 105,170 Z"
                          stroke="#6366F1"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M 90,120 L 90,165 L 105,170"
                          stroke="#6366F1"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M 320,135 L 320,180 L 290,185"
                          stroke="#6366F1"
                          strokeWidth="1.4"
                        />
                        {/* Quad wire subdivisions */}
                        {Array.from({ length: 14 }).map((_, i) => (
                          <line
                            key={`vl-${i}`}
                            x1={105 + i * 14}
                            y1={118 + i * 1.8}
                            x2={100 + i * 13.5}
                            y2={172 + i * 1.1}
                            stroke="#818CF8"
                            strokeWidth="0.8"
                            strokeDasharray="2 2"
                          />
                        ))}
                        {Array.from({ length: 7 }).map((_, i) => (
                          <line
                            key={`hl-${i}`}
                            x1={95}
                            y1={125 + i * 7}
                            x2={310}
                            y2={142 + i * 6.5}
                            stroke="#818CF8"
                            strokeWidth="0.8"
                            strokeDasharray="2 2"
                          />
                        ))}

                        {/* Volumetric Cloud Iso-Curvature Contours */}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <ellipse
                            key={`cloud-${i}`}
                            cx={200 + (i % 3) * 20}
                            cy={140 + (i % 2) * 15}
                            rx={80 + i * 14}
                            ry={35 + i * 6}
                            stroke="#A855F7"
                            strokeWidth="0.75"
                            strokeDasharray="3 3"
                            opacity={0.65}
                          />
                        ))}
                      </svg>
                    </div>
                  )}

                  {/* Clay / MatCap Mode: Polished Sculptor Occlusion */}
                  {shadingMode === 'clay' && (
                    <div className="relative w-full h-full filter grayscale contrast-125 brightness-95 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]">
                      <Image
                        src={selectedAsset.imageSrc}
                        alt={selectedAsset.name}
                        fill
                        className="object-contain"
                      />
                      {/* Clay overlay tint */}
                      <div className="absolute inset-0 bg-[#d4d4d8]/30 mix-blend-color-burn rounded-full pointer-events-none" />
                    </div>
                  )}

                  {/* Depth / Normal Map Mode: RGB Normal Vector Gradient */}
                  {shadingMode === 'depth' && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="relative w-full h-full filter saturate-200 contrast-150 mix-blend-luminosity">
                        <Image
                          src={selectedAsset.imageSrc}
                          alt={selectedAsset.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#3b82f6] via-[#ec4899] to-[#10b981] opacity-70 mix-blend-color rounded-2xl pointer-events-none" />
                    </div>
                  )}

                  {/* Botanical Sprout Mode: Sprouting Flora Layer over 3D Model */}
                  {shadingMode === 'botanical' && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={selectedAsset.imageSrc}
                        alt={selectedAsset.name}
                        fill
                        className="object-contain"
                      />
                      {/* Animated botanical blossom sprites overlay */}
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="absolute top-1/3 left-1/4 animate-bounce">
                          <span className="text-2xl drop-shadow-md">🌸</span>
                        </div>
                        <div className="absolute top-1/4 right-1/3 animate-pulse">
                          <span className="text-xl drop-shadow-md">🌺</span>
                        </div>
                        <div className="absolute bottom-1/3 right-1/4 animate-bounce">
                          <span className="text-lg drop-shadow-md">🌿</span>
                        </div>
                        <div className="absolute bottom-1/4 left-1/3 animate-pulse">
                          <span className="text-xl drop-shadow-md">🌼</span>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin duration-1000">
                          <span className="text-2xl drop-shadow-md">✨</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Optional Wireframe Grid Overlay */}
                  {showWireOverlay && shadingMode !== 'wireframe' && (
                    <div
                      className="absolute inset-0 opacity-25 pointer-events-none"
                      style={{
                        backgroundImage: `linear-gradient(to right, #6366F1 1px, transparent 1px), linear-gradient(to bottom, #6366F1 1px, transparent 1px)`,
                        backgroundSize: '16px 16px',
                        mixBlendMode: 'multiply',
                      }}
                    />
                  )}

                  {/* CAD Dimension Guides Overlay */}
                  {showDimensions && (
                    <div className="absolute inset-0 pointer-events-none text-[10px] font-mono text-slate-700">
                      {/* Width dimension (Bottom) */}
                      <div className="absolute -bottom-4 left-6 right-6 flex items-center justify-between border-b border-dashed border-slate-400 pb-1">
                        <span className="text-slate-400">|</span>
                        <span className="bg-white/90 px-2 py-0.5 rounded shadow-2xs font-bold text-slate-800">
                          W: {selectedAsset.dimensions.w}
                        </span>
                        <span className="text-slate-400">|</span>
                      </div>

                      {/* Height dimension (Left) */}
                      <div className="absolute top-4 bottom-4 -left-2 flex flex-col justify-between items-center border-l border-dashed border-slate-400 pl-1">
                        <span className="text-slate-400">—</span>
                        <span className="bg-white/90 px-1 py-0.5 rounded shadow-2xs font-bold text-slate-800 rotate-90 my-auto">
                          H: {selectedAsset.dimensions.h}
                        </span>
                        <span className="text-slate-400">—</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────
                  FLOATING 3D GIZMO COMPASS (TOP-RIGHT)
              ───────────────────────────────────────────────────────── */}
              <div className="absolute top-4 right-4 bg-white/90 border border-slate-200/90 rounded-2xl p-2 shadow-md backdrop-blur-md flex flex-col items-center gap-1.5 z-20">
                <div className="w-12 h-12 relative flex items-center justify-center">
                  {/* 3D Axis Tripod representation */}
                  <svg viewBox="0 0 60 60" className="w-full h-full">
                    {/* Center origin */}
                    <circle cx="30" cy="30" r="3" fill="#0f172a" />
                    {/* X Axis (Red) */}
                    <line x1="30" y1="30" x2="50" y2="30" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="52" y="33" fontSize="8" fontWeight="bold" fill="#ef4444">X</text>
                    {/* Y Axis (Green) */}
                    <line x1="30" y1="30" x2="30" y2="10" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="27" y="8" fontSize="8" fontWeight="bold" fill="#22c55e">Y</text>
                    {/* Z Axis (Blue) */}
                    <line x1="30" y1="30" x2="16" y2="44" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="10" y="49" fontSize="8" fontWeight="bold" fill="#3b82f6">Z</text>
                  </svg>
                </div>
                {/* Reset Viewport Button */}
                <button
                  onClick={() => setRotation({ x: 8, y: -12 })}
                  className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Floating Orbit Interaction Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/90 backdrop-blur-md text-[11px] font-medium text-slate-600 flex items-center gap-2 shadow-sm z-20">
                <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
                <span>Drag to orbit • Scroll to zoom</span>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                RIGHT PANEL (3 COLUMNS): LIGHTING, PHYSICS & EXPORT
            ───────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-3 p-5 sm:p-6 border-t lg:border-t-0 lg:border-l border-slate-200/80 bg-slate-50/40 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Environment & Lighting
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>

                {/* Lighting Presets */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Atmospheric Rig
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'sunset', label: 'Sunset Glow', color: '#ff8c42' },
                      { id: 'studio', label: 'Clean Studio', color: '#64748b' },
                      { id: 'cyberpunk', label: 'Neon Twilight', color: '#a855f7' },
                      { id: 'overcast', label: 'Soft Diffuse', color: '#94a3b8' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setLightingPreset(p.id as LightingPreset)}
                        className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-all flex items-center gap-2 ${
                          lightingPreset === p.id
                            ? 'bg-white border-slate-900 text-slate-900 shadow-sm'
                            : 'bg-white/60 border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                          style={{ backgroundColor: p.color }}
                        />
                        <span className="truncate">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Geometry & Surface Data */}
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-sm">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Mesh Geometry Metrics
                  </span>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500">Vertices</span>
                    <span className="font-semibold text-slate-800">{selectedAsset.vertCount}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500">Triangles</span>
                    <span className="font-semibold text-slate-800">{selectedAsset.polyCount}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500">BBox Volume</span>
                    <span className="font-semibold text-slate-800">
                      {selectedAsset.dimensions.w} × {selectedAsset.dimensions.l}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500">UV Unwrapped</span>
                    <span className="font-semibold text-emerald-600">Yes (Zero Overlap)</span>
                  </div>
                </div>

                {/* Export Format Selectors */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Production Export
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {['GLB', 'USDZ', 'OBJ', 'FBX'].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => handleExport(fmt)}
                        className="py-2 px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-900 text-slate-800 text-xs font-semibold font-mono transition-all hover:shadow-sm text-center cursor-pointer active:scale-95"
                      >
                        .{fmt.toLowerCase()}
                      </button>
                    ))}
                  </div>

                  {/* Master Download Button */}
                  <button
                    onClick={() => handleExport('GLB')}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download 3D Asset ({selectedAsset.sizeMb})</span>
                  </button>
                </div>
              </div>

              {/* Live notification feedback */}
              {exportNotice && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs text-center font-medium animate-in fade-in duration-200 shadow-sm">
                  {exportNotice}
                </div>
              )}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              BOTTOM ASSET GALLERY & TIMELINE STRIP
          ───────────────────────────────────────────────────────────── */}
          <div className="w-full px-5 sm:px-7 py-4 border-t border-slate-200/80 bg-slate-50/70 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mr-2">
                Session Assets:
              </span>
              <div className="flex items-center gap-2.5 overflow-x-auto py-1">
                {PRESET_ASSETS.map((asset) => {
                  const isSelected = selectedAsset.id === asset.id;
                  return (
                    <button
                      key={asset.id}
                      onClick={() => handleSelectAsset(asset)}
                      className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#ff5500] shadow-sm text-slate-900 ring-2 ring-[#ff5500]/15'
                          : 'bg-white/80 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-md overflow-hidden relative bg-slate-100 shrink-0">
                        <Image
                          src={asset.imageSrc}
                          alt={asset.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-semibold whitespace-nowrap">{asset.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">{asset.polyCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Engine Readiness Banner */}
            <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Ready for Unreal Engine 5 • Unity • Blender • WebGL</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
