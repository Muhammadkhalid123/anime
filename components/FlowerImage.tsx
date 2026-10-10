'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import * as THREE from 'three';

export interface FlowerImageProps {
  /** Source image URL or path */
  src?: string;
  /**
   * Display Mode:
   * - "hybrid": 3D floating subject (bed + cloud) with living botanical flowers and leaves blooming across its surface and contours.
   * - "particle": Entire silhouette formed out of botanical particle sprites.
   * - "contour": Dense botanical growth along the edges and silhouettes of the bed and cloud.
   * @default "hybrid"
   */
  mode?: 'hybrid' | 'particle' | 'contour';
  /**
   * Color derivation mode:
   * - "image": Samples pixel color with regional intelligence (sunset peach clouds, sage/linen bed).
   * - "palette": Classical Originkit botanical palette (#FF4D0F bloom / #1F8A3B leaf).
   * @default "image"
   */
  colorMode?: 'image' | 'palette';
  /** Base bloom color for palette mode. @default "#FF4D0F" */
  bloomColor?: string;
  /** Base leaf color for palette mode. @default "#1F8A3B" */
  leafColor?: string;
  /** Maximum number of particles sampled across the subject mask. @default 25000 */
  maxParticles?: number;
  /** Multiplier for bloom flower sprite size. @default 10 */
  bloomSize?: number;
  /** Multiplier for leaf sprite size. @default 10 */
  leafSize?: number;
  /** Probability multiplier (0 to 20 scale, default 4) for leaves vs blooms. @default 4 */
  leafMix?: number;
  /** Positional random jitter spread (0 to 20 scale). @default 4 */
  spread?: number;
  /** Hue jitter spread in HSL (0 to 20 scale). @default 6 */
  hueSpread?: number;
  /** Base sprite opacity (0 to 20 scale). @default 16 */
  opacity?: number;
  /** Distance from pure white (0-255 RGB) for subject boundary detection. @default 18 */
  threshold?: number;
  /** Grow-in transition duration in seconds. @default 0.9 */
  duration?: number;
  /** Initial random delay in seconds. @default 1.0 */
  delay?: number;
  /** Enable reactive pointer hover interaction. @default true */
  hoverOn?: boolean;
  /** Hover interaction parameters */
  hover?: {
    radius?: number;
    boost?: number;
  };
  /** Canvas background color or 'transparent'. @default "transparent" */
  background?: string;
  /** Enable 3D perspective mouse tilt and floating bed drift. @default true */
  enable3DTilt?: boolean;
  /** Enable ambient floating motion. @default true */
  idleMotion?: boolean;
  /** Accessibility label. @default "A 3D bed floating inside a sunset cloud with blooming botanical particles" */
  alt?: string;
  /** Optional callback fired when image mask sampling and mesh initialization finish */
  onLoaded?: () => void;
  /** Additional container CSS styles */
  style?: React.CSSProperties;
  /** Additional container CSS class names */
  className?: string;
}

export interface FlowerImageHandle {
  /** Re-triggers the flower bloom grow-in animation */
  replay: () => void;
  /** Retrieves particle count */
  getParticleCount: () => { blooms: number; leaves: number; total: number };
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & CUBIC-BEZIER SOLVER (Exact Originkit Implementation)
// ─────────────────────────────────────────────────────────────────────────────

const SCALE_FACTOR = 0.085;
const CAM_DISTANCE = 35;

const NAMED_EASES: Record<string, number[]> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  circIn: [0.55, 0, 1, 0.45],
  circOut: [0, 0.55, 0.45, 1],
  circInOut: [0.85, 0, 0.15, 1],
};

function makeEaseFn(easeName = 'circOut') {
  const [x1, y1, x2, y2] = NAMED_EASES[easeName] || NAMED_EASES.circOut;
  if (x1 === y1 && x2 === y2) return (t: number) => t;

  const bez = (a: number, b: number, t: number) => {
    const u = 1 - t;
    return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t;
  };

  return (t: number) => {
    const x = Math.max(0, Math.min(1, t));
    let s = x;
    for (let i = 0; i < 8; i++) {
      const cx = bez(x1, x2, s) - x;
      const u = 1 - s;
      const dx = 3 * u * u * x1 + 6 * u * s * (x2 - x1) + 3 * s * s * (1 - x2);
      if (Math.abs(dx) < 1e-6) break;
      s -= cx / dx;
      s = Math.max(0, Math.min(1, s));
    }
    return bez(y1, y2, s);
  };
}

const circOutEase = makeEaseFn('circOut');

// ─────────────────────────────────────────────────────────────────────────────
// COLOR HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) return [l, l, l];
  const hue2rgb = (p: number, q: number, t: number) => {
    let val = t;
    if (val < 0) val += 1;
    if (val > 1) val -= 1;
    if (val < 1 / 6) return p + (q - p) * 6 * val;
    if (val < 1 / 2) return q;
    if (val < 2 / 3) return p + (q - p) * (2 / 3 - val) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);
  return [r, g, b];
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCEDURAL SPRITE TEXTURES (Exact Originkit Geometry)
// ─────────────────────────────────────────────────────────────────────────────

function makeFlowerTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.translate(size / 2, size / 2);
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i / 5) * Math.PI * 2);
    ctx.beginPath();
    ctx.ellipse(0, -size * 0.24, size * 0.15, size * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.07, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function makeLeafTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.translate(size / 2, size / 2);
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.beginPath();
  ctx.moveTo(0, -size * 0.42);
  ctx.quadraticCurveTo(size * 0.3, -size * 0.05, 0, size * 0.42);
  ctx.quadraticCurveTo(-size * 0.3, -size * 0.05, 0, -size * 0.42);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// ─────────────────────────────────────────────────────────────────────────────
// PARTICLE INTERFACE & SHARED MATH REUSABLES
// ─────────────────────────────────────────────────────────────────────────────

interface Particle {
  type: number; // 0 = bloom, 1 = leaf
  x: number;
  y: number;
  z: number;
  t: number;
  wait: number;
  jitter: number;
  maxScale: number;
  baseRotation: number;
  swaySpeed: number;
  swayPhase: number;
  currentRotation: number;
  hover: number;
  hue: number;
  r: number;
  g: number;
  b: number;
  depthLayer: number; // -1 = background, 0 = midground/bed, 1 = foreground blooms
}

const _tempMatrix = new THREE.Matrix4();
const _tempPosition = new THREE.Vector3();
const _tempQuaternion = new THREE.Quaternion();
const _tempScale = new THREE.Vector3();
const _tempEuler = new THREE.Euler();
const _tempColor = new THREE.Color();

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const FlowerImage = forwardRef<FlowerImageHandle, FlowerImageProps>(function FlowerImage(
  {
    src = '/bed-cloud.png',
    mode = 'hybrid',
    colorMode = 'image',
    bloomColor = '#FF4D0F',
    leafColor = '#1F8A3B',
    maxParticles = 25000,
    bloomSize = 10,
    leafSize = 10,
    leafMix = 4,
    spread = 4,
    hueSpread = 6,
    opacity = 18,
    threshold = 18,
    duration = 0.9,
    delay = 1.0,
    hoverOn = true,
    hover = { radius: 9, boost: 12 },
    background = 'transparent',
    enable3DTilt = true,
    idleMotion = true,
    alt = 'A 3D bed floating inside a sunset cloud with blooming botanical particles',
    onLoaded,
    style,
    className,
  },
  ref
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const bloomsRef = useRef<Particle[]>([]);
  const leavesRef = useRef<Particle[]>([]);
  const countsRef = useRef({ blooms: 0, leaves: 0, total: 0 });

  const onLoadedRef = useRef(onLoaded);
  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  const propsRef = useRef({
    mode,
    colorMode,
    bloomColor,
    leafColor,
    maxParticles,
    bloomSize,
    leafSize,
    leafMix,
    spread,
    hueSpread,
    opacity,
    threshold,
    duration,
    delay,
    hoverOn,
    hover,
    enable3DTilt,
    idleMotion,
  });

  useEffect(() => {
    propsRef.current = {
      mode,
      colorMode,
      bloomColor,
      leafColor,
      maxParticles,
      bloomSize,
      leafSize,
      leafMix,
      spread,
      hueSpread,
      opacity,
      threshold,
      duration,
      delay,
      hoverOn,
      hover,
      enable3DTilt,
      idleMotion,
    };
  }, [
    mode,
    colorMode,
    bloomColor,
    leafColor,
    maxParticles,
    bloomSize,
    leafSize,
    leafMix,
    spread,
    hueSpread,
    opacity,
    threshold,
    duration,
    delay,
    hoverOn,
    hover,
    enable3DTilt,
    idleMotion,
  ]);

  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    group: THREE.Group;
    subject3DMesh: THREE.Mesh | null;
    subjectGlowMesh: THREE.Mesh | null;
    bloomMesh: THREE.InstancedMesh | null;
    leafMesh: THREE.InstancedMesh | null;
    bloomTexture: THREE.CanvasTexture;
    leafTexture: THREE.CanvasTexture;
    geometry: THREE.PlaneGeometry;
    bloomMaterial: THREE.MeshBasicMaterial;
    leafMaterial: THREE.MeshBasicMaterial;
    subjectTexture: THREE.Texture | null;
    animationFrameId: number;
    lastTime: number;
    clockTime: number;
    isVisible: boolean;
    isTabActive: boolean;
    prefersReducedMotion: boolean;
    targetTiltX: number;
    targetTiltY: number;
    currentTiltX: number;
    currentTiltY: number;
    currentImage: HTMLImageElement | null;
  } | null>(null);

  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 99999,
    y: 99999,
    active: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  const replayAnimation = useCallback(() => {
    const reset = (p: Particle) => {
      p.t = 0;
      p.hover = 0;
    };
    bloomsRef.current.forEach(reset);
    leavesRef.current.forEach(reset);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      replay: replayAnimation,
      getParticleCount: () => countsRef.current,
    }),
    [replayAnimation]
  );

  // ───────────────────────────────────────────────────────────────────────────
  // IMAGE SAMPLING & BOTANICAL PARTICLE CREATION
  // ───────────────────────────────────────────────────────────────────────────

  const sampleImageMask = useCallback(
    (img: HTMLImageElement, containerW: number, containerH: number) => {
      if (containerW <= 0 || containerH <= 0) return;

      const p = propsRef.current;
      const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const containerAspect = containerW / containerH;

      let renderW: number;
      let renderH: number;
      if (containerAspect > imgAspect) {
        renderH = containerH * 0.88;
        renderW = renderH * imgAspect;
      } else {
        renderW = containerW * 0.88;
        renderH = renderW / imgAspect;
      }

      const offCanvas = document.createElement('canvas');
      offCanvas.width = Math.max(1, Math.round(renderW * dpr));
      offCanvas.height = Math.max(1, Math.round(renderH * dpr));
      const ctx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, offCanvas.width, offCanvas.height);
      const imgData = ctx.getImageData(0, 0, offCanvas.width, offCanvas.height);
      const data = imgData.data;
      const cw = offCanvas.width;
      const ch = offCanvas.height;

      // 1. Evaluate Subject Mask & Silhouette
      let litCount = 0;
      const coarseStep = 2;
      for (let y = 0; y < ch; y += coarseStep) {
        for (let x = 0; x < cw; x += coarseStep) {
          const idx = (y * cw + x) * 4;
          if (data[idx + 3] <= 20) continue;
          const distWhite = Math.hypot(255 - data[idx], 255 - data[idx + 1], 255 - data[idx + 2]);
          if (distWhite > p.threshold * 0.5) {
            litCount += coarseStep * coarseStep;
          }
        }
      }

      // 2. Compute Grid Step based on particle budget
      const targetBudget = p.mode === 'hybrid' ? Math.min(p.maxParticles, 18000) : p.maxParticles;
      const gridStep = Math.max(1, Math.ceil(Math.sqrt(litCount / Math.max(100, targetBudget))));

      const imageSceneWidth = renderW * SCALE_FACTOR;
      const imageSceneHeight = renderH * SCALE_FACTOR;
      const baseUnit = imageSceneWidth * 0.018;

      const bloomBaseScale = (p.bloomSize / 10) * baseUnit;
      const leafBaseScale = (p.leafSize / 10) * baseUnit * 0.85;

      const newBlooms: Particle[] = [];
      const newLeaves: Particle[] = [];

      const leafMixProb = (p.leafMix / 20) * 0.9;
      const spreadFactor = (p.spread / 20) * 0.8;
      const hueSpreadVal = (p.hueSpread / 20) * 0.15;

      for (let py = 0; py < ch; py += gridStep) {
        for (let px = 0; px < cw; px += gridStep) {
          const idx = (py * cw + px) * 4;
          const a = data[idx + 3];
          if (a <= 20) continue;

          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const distWhite = Math.hypot(255 - r, 255 - g, 255 - b);

          const alphaNorm = a / 255;
          let prob = 0;

          if (p.mode === 'contour') {
            // Contour mode: concentrate on edges of clouds and bed
            const isEdge = distWhite > p.threshold * 0.4 && distWhite < p.threshold * 3.5;
            prob = isEdge ? alphaNorm * 1.2 : alphaNorm * 0.15;
          } else if (p.mode === 'hybrid') {
            // Hybrid mode: living botanical flora across bed & sunset cloud ridges
            if (distWhite > p.threshold * 2.0) {
              prob = alphaNorm * 0.75;
            } else if (distWhite > p.threshold * 0.4) {
              prob = alphaNorm * ((distWhite - p.threshold * 0.4) / (p.threshold * 1.6));
            }
          } else {
            // Particle mode: full density reconstruction
            if (distWhite > p.threshold * 2.2) {
              prob = alphaNorm;
            } else if (distWhite > p.threshold * 0.4) {
              prob = alphaNorm * ((distWhite - p.threshold * 0.4) / (p.threshold * 1.8));
            }
          }

          if (Math.random() > prob) continue;

          // Positional jitter
          const jitterX = (Math.random() - 0.5) * spreadFactor * gridStep;
          const jitterY = (Math.random() - 0.5) * spreadFactor * gridStep;
          const sampleX = Math.max(0, Math.min(cw - 1, Math.round(px + jitterX)));
          const sampleY = Math.max(0, Math.min(ch - 1, Math.round(py + jitterY)));

          const sIdx = (sampleY * cw + sampleX) * 4;
          const sR = data[sIdx];
          const sG = data[sIdx + 1];
          const sB = data[sIdx + 2];
          const luminance = (0.2126 * sR + 0.7152 * sG + 0.0722 * sB) / 255;

          // Scene coordinates centered
          const normX = sampleX / cw - 0.5;
          const normY = -(sampleY / ch - 0.5);

          const sceneX = normX * imageSceneWidth;
          const sceneY = normY * imageSceneHeight;

          // Region Analysis (Floating Bed vs Sunset Cloud)
          const nx = sampleX / cw;
          const ny = sampleY / ch;
          const [hOrig, sOrig, lOrig] = rgbToHsl(sR, sG, sB);

          // Central bed area detection (desaturated linen/bed frame)
          const inBedArea = nx >= 0.22 && nx <= 0.84 && ny >= 0.38 && ny <= 0.78;
          const isBed = inBedArea && sOrig < 0.22 && lOrig > 0.20 && lOrig < 0.94;

          // 3D Depth Layering (Z-depth)
          // Bed is in front (z ~ +0.5 to +1.2), cloud spans (z ~ -1.5 to +0.8)
          let sceneZ = (Math.random() - 0.5) * 1.2;
          let depthLayer = 0;

          if (isBed) {
            sceneZ = 0.4 + (1 - ny) * 0.8 + (Math.random() - 0.5) * 0.3;
            depthLayer = 1;
          } else {
            sceneZ = -0.4 + (luminance - 0.5) * 1.0 + (Math.random() - 0.5) * 0.4;
            depthLayer = luminance > 0.7 ? 1 : -1;
          }

          // Sprite type determination
          const isLeaf = isBed ? Math.random() < Math.min(0.65, leafMixProb + 0.35) : Math.random() < leafMixProb;
          const type = isLeaf ? 1 : 0;

          // Color derivation
          let finalR: number;
          let finalG: number;
          let finalB: number;

          if (p.colorMode === 'palette') {
            const baseCol = new THREE.Color(isLeaf ? p.leafColor : p.bloomColor);
            const baseHsl = { h: 0, s: 0, l: 0 };
            baseCol.getHSL(baseHsl);
            const jH = (baseHsl.h + (Math.random() - 0.5) * hueSpreadVal + 1) % 1;
            const [pr, pg, pb] = hslToRgb(jH, baseHsl.s, baseHsl.l);
            finalR = pr;
            finalG = pg;
            finalB = pb;
          } else {
            let h = hOrig;
            let s = sOrig;
            let l = lOrig;

            if (isBed) {
              if (Math.random() < 0.45) {
                // Soft sage green contrast
                h = 0.31 + (Math.random() - 0.5) * 0.04;
                s = 0.14 + Math.random() * 0.06;
                l = 0.58 + (Math.random() - 0.5) * 0.08;
              } else {
                // Linen tint
                h = (h + (Math.random() - 0.5) * 0.03 + 1) % 1;
                s = Math.max(0.06, s * 0.9);
                l = Math.min(0.88, l + 0.04);
              }
            } else {
              // Sunset cloud: boost saturation +12%
              s = Math.min(1, s * 1.14);
              h = (h + (Math.random() - 0.5) * hueSpreadVal + 1) % 1;
              l = Math.max(0, Math.min(1, l + (Math.random() - 0.5) * 0.05));

              if (luminance > 0.85) {
                l = Math.min(1, l + 0.06);
                s = Math.max(0.2, s * 0.85);
              }
            }

            const [pr, pg, pb] = hslToRgb(h, s, l);
            finalR = pr;
            finalG = pg;
            finalB = pb;
          }

          // Scale & Distribution
          let maxScale: number;
          let baseRotation: number;

          if (!isLeaf) {
            // Bloom: 0.9 * random^20 * bloomSize
            const powerRand = Math.pow(Math.random(), 20);
            maxScale = (0.12 + 0.88 * powerRand) * bloomBaseScale;
            baseRotation = Math.random() * Math.PI * 2;
          } else {
            // Leaf: (0.1 + 0.7 * random^7) * leafSize
            const powerRand = Math.pow(Math.random(), 7);
            maxScale = (0.1 + 0.7 * powerRand) * leafBaseScale;
            baseRotation = (Math.random() - 0.5) * Math.PI * 0.6;
          }

          const lumMultiplier = 0.7 + 0.6 * luminance;
          maxScale = maxScale * lumMultiplier;

          // Distance from center for radial growth wave
          const centerDist = Math.hypot(normX, normY) / 0.707;
          const wait = Math.random() * p.delay + centerDist * 0.55;
          const jitter = 0.6 + 0.8 * Math.random();

          const particle: Particle = {
            type,
            x: sceneX,
            y: sceneY,
            z: sceneZ,
            t: 0,
            wait,
            jitter,
            maxScale,
            baseRotation,
            swaySpeed: 0.8 + Math.random() * 0.6,
            swayPhase: Math.random() * Math.PI * 2,
            currentRotation: baseRotation,
            hover: 0,
            hue: Math.random() - 0.5,
            r: finalR,
            g: finalG,
            b: finalB,
            depthLayer,
          };

          if (isLeaf) newLeaves.push(particle);
          else newBlooms.push(particle);
        }
      }

      bloomsRef.current = newBlooms;
      leavesRef.current = newLeaves;
      countsRef.current = {
        blooms: newBlooms.length,
        leaves: newLeaves.length,
        total: newBlooms.length + newLeaves.length,
      };

      const state = threeRef.current;
      if (!state) return;

      // Update / Create 3D Subject Model Plane (for Hybrid mode)
      if (p.mode === 'hybrid') {
        if (!state.subject3DMesh) {
          const planeGeom = new THREE.PlaneGeometry(imageSceneWidth, imageSceneHeight, 32, 32);
          const textureLoader = new THREE.TextureLoader();
          const tex = textureLoader.load(img.src);
          tex.colorSpace = THREE.SRGBColorSpace;
          state.subjectTexture = tex;

          const mat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            opacity: 0.94,
            depthWrite: false,
            side: THREE.DoubleSide,
          });

          const mesh = new THREE.Mesh(planeGeom, mat);
          mesh.position.set(0, 0, 0);
          state.group.add(mesh);
          state.subject3DMesh = mesh;

          // Ambient subtle sunset glow backing
          const glowMat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            opacity: 0.28,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });
          const glowMesh = new THREE.Mesh(planeGeom, glowMat);
          glowMesh.position.set(0, 0, -0.6);
          glowMesh.scale.set(1.06, 1.06, 1);
          state.group.add(glowMesh);
          state.subjectGlowMesh = glowMesh;
        } else {
          state.subject3DMesh.visible = true;
          if (state.subjectGlowMesh) state.subjectGlowMesh.visible = true;
        }
      } else {
        if (state.subject3DMesh) state.subject3DMesh.visible = false;
        if (state.subjectGlowMesh) state.subjectGlowMesh.visible = false;
      }

      // Recreate Instanced Meshes for Blooms & Leaves
      if (state.bloomMesh) {
        state.group.remove(state.bloomMesh);
        state.bloomMesh.dispose();
        state.bloomMesh = null;
      }
      if (state.leafMesh) {
        state.group.remove(state.leafMesh);
        state.leafMesh.dispose();
        state.leafMesh = null;
      }

      if (newBlooms.length > 0) {
        const bloomMesh = new THREE.InstancedMesh(
          state.geometry,
          state.bloomMaterial,
          newBlooms.length
        );
        bloomMesh.frustumCulled = false;
        bloomMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

        for (let i = 0; i < newBlooms.length; i++) {
          const b = newBlooms[i];
          _tempPosition.set(b.x, b.y, b.z);
          _tempEuler.set(0, 0, b.baseRotation);
          _tempQuaternion.setFromEuler(_tempEuler);
          _tempScale.set(0, 0, 1);
          _tempMatrix.compose(_tempPosition, _tempQuaternion, _tempScale);
          bloomMesh.setMatrixAt(i, _tempMatrix);

          _tempColor.setRGB(b.r, b.g, b.b);
          bloomMesh.setColorAt(i, _tempColor);
        }
        bloomMesh.instanceMatrix.needsUpdate = true;
        if (bloomMesh.instanceColor) bloomMesh.instanceColor.needsUpdate = true;
        state.group.add(bloomMesh);
        state.bloomMesh = bloomMesh;
      }

      if (newLeaves.length > 0) {
        const leafMesh = new THREE.InstancedMesh(
          state.geometry,
          state.leafMaterial,
          newLeaves.length
        );
        leafMesh.frustumCulled = false;
        leafMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

        for (let i = 0; i < newLeaves.length; i++) {
          const l = newLeaves[i];
          _tempPosition.set(l.x, l.y, l.z);
          _tempEuler.set(0, 0, l.baseRotation);
          _tempQuaternion.setFromEuler(_tempEuler);
          _tempScale.set(0, 0, 1);
          _tempMatrix.compose(_tempPosition, _tempQuaternion, _tempScale);
          leafMesh.setMatrixAt(i, _tempMatrix);

          _tempColor.setRGB(l.r, l.g, l.b);
          leafMesh.setColorAt(i, _tempColor);
        }
        leafMesh.instanceMatrix.needsUpdate = true;
        if (leafMesh.instanceColor) leafMesh.instanceColor.needsUpdate = true;
        state.group.add(leafMesh);
        state.leafMesh = leafMesh;
      }

      setIsLoading(false);
      if (onLoadedRef.current) onLoadedRef.current();
    },
    []
  );

  // ───────────────────────────────────────────────────────────────────────────
  // THREE.JS CORE LIFECYCLE (Mount Once)
  // ───────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let destroyed = false;
    let resizeTimeout: NodeJS.Timeout;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const scene = new THREE.Scene();
    const group = new THREE.Group();
    scene.add(group);

    const initialW = Math.max(10, container.clientWidth || 600);
    const initialH = Math.max(10, container.clientHeight || 400);

    const spanH = initialH * SCALE_FACTOR;
    const initialFov = 2 * Math.atan(spanH / 2 / CAM_DISTANCE) * (180 / Math.PI);

    const camera = new THREE.PerspectiveCamera(initialFov, initialW / initialH, 0.1, 1000);
    camera.position.set(0, 0, CAM_DISTANCE);
    camera.lookAt(0, 0, 0);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(initialW, initialH, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const geometry = new THREE.PlaneGeometry(1.2, 1.2);
    const bloomTexture = makeFlowerTexture();
    const leafTexture = makeLeafTexture();

    const bloomAlpha = 0.05 + Math.min(20, Math.max(1, opacity)) * 0.045;
    const leafAlpha = 0.08 + Math.min(20, Math.max(1, opacity)) * 0.045;

    const bloomMaterial = new THREE.MeshBasicMaterial({
      alphaMap: bloomTexture,
      transparent: true,
      opacity: bloomAlpha,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const leafMaterial = new THREE.MeshBasicMaterial({
      alphaMap: leafTexture,
      transparent: true,
      opacity: leafAlpha,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    threeRef.current = {
      renderer,
      scene,
      camera,
      group,
      subject3DMesh: null,
      subjectGlowMesh: null,
      bloomMesh: null,
      leafMesh: null,
      bloomTexture,
      leafTexture,
      geometry,
      bloomMaterial,
      leafMaterial,
      subjectTexture: null,
      animationFrameId: 0,
      lastTime: performance.now(),
      clockTime: 0,
      isVisible: true,
      isTabActive: !document.hidden,
      prefersReducedMotion,
      targetTiltX: 0,
      targetTiltY: 0,
      currentTiltX: 0,
      currentTiltY: 0,
      currentImage: null,
    };

    // ─────────────────────────────────────────────────────────────────────────
    // ANIMATION & PHYSICS RENDER LOOP
    // ─────────────────────────────────────────────────────────────────────────

    const renderLoop = (currentTime: number) => {
      const state = threeRef.current;
      if (!state || destroyed) return;

      state.animationFrameId = requestAnimationFrame(renderLoop);

      if (!state.isVisible || !state.isTabActive) {
        state.lastTime = currentTime;
        return;
      }

      const dt = Math.min(0.05, (currentTime - state.lastTime) / 1000);
      state.lastTime = currentTime;
      state.clockTime += dt;
      const time = state.clockTime;

      const p = propsRef.current;

      // 3D Perspective Tilt & Parallax Physics
      if (p.enable3DTilt) {
        state.currentTiltX += (state.targetTiltX - state.currentTiltX) * (1 - Math.exp(-dt * 6));
        state.currentTiltY += (state.targetTiltY - state.currentTiltY) * (1 - Math.exp(-dt * 6));
        state.group.rotation.x = state.currentTiltX * 0.28;
        state.group.rotation.y = state.currentTiltY * 0.35;
      } else {
        state.group.rotation.x = 0;
        state.group.rotation.y = 0;
      }

      // Ambient Floating Motion (Bed Floating on Cloud)
      if (p.idleMotion) {
        state.group.position.y = Math.sin(time * 0.9) * 0.35;
        state.group.position.x = Math.cos(time * 0.5) * 0.15;
      } else {
        state.group.position.y = 0;
        state.group.position.x = 0;
      }

      const hoverRadius = (p.hover?.radius ?? 9) * 0.9;
      const hoverBoost = (p.hover?.boost ?? 12) * 0.25;

      const pointer = pointerRef.current;
      const isPointerActive = p.hoverOn && pointer.active;

      const durationSec = Math.max(0.05, p.duration);

      // ── Update Blooms ──
      const blooms = bloomsRef.current;
      const bloomMesh = state.bloomMesh;
      if (bloomMesh && blooms.length > 0) {
        let needsUpdate = false;
        for (let i = 0; i < blooms.length; i++) {
          const item = blooms[i];

          if (item.wait > 0) {
            item.wait -= dt;
          } else if (item.t < 1) {
            item.t += dt / (durationSec * item.jitter);
            if (item.t > 1) item.t = 1;
          }

          const growT = state.prefersReducedMotion ? 1 : circOutEase(item.t);

          let targetHover = 0;
          if (isPointerActive) {
            const dist = Math.hypot(item.x - pointer.x, item.y - pointer.y);
            const near = Math.max(0, 1 - dist / hoverRadius);
            targetHover = near * near;
          }
          item.hover += (targetHover - item.hover) * (1 - Math.exp(-dt * 7));

          if (p.idleMotion) {
            const sway = Math.sin(time * item.swaySpeed + item.swayPhase) * ((2 * Math.PI) / 180);
            item.currentRotation = item.baseRotation + sway;
          }

          const currentScale = item.maxScale * growT * (1 + hoverBoost * item.hover);

          _tempPosition.set(item.x, item.y, item.z);
          _tempEuler.set(0, 0, item.currentRotation);
          _tempQuaternion.setFromEuler(_tempEuler);
          _tempScale.set(currentScale, currentScale, 1);
          _tempMatrix.compose(_tempPosition, _tempQuaternion, _tempScale);

          bloomMesh.setMatrixAt(i, _tempMatrix);
          needsUpdate = true;
        }
        if (needsUpdate) bloomMesh.instanceMatrix.needsUpdate = true;
      }

      // ── Update Leaves ──
      const leaves = leavesRef.current;
      const leafMesh = state.leafMesh;
      if (leafMesh && leaves.length > 0) {
        let needsUpdate = false;
        for (let i = 0; i < leaves.length; i++) {
          const item = leaves[i];

          if (item.wait > 0) {
            item.wait -= dt;
          } else if (item.t < 1) {
            item.t += dt / (durationSec * item.jitter);
            if (item.t > 1) item.t = 1;
          }

          const growT = state.prefersReducedMotion ? 1 : circOutEase(item.t);

          let targetHover = 0;
          if (isPointerActive) {
            const dist = Math.hypot(item.x - pointer.x, item.y - pointer.y);
            const near = Math.max(0, 1 - dist / hoverRadius);
            targetHover = near * near;
          }
          item.hover += (targetHover - item.hover) * (1 - Math.exp(-dt * 7));

          if (p.idleMotion) {
            const sway = Math.sin(time * item.swaySpeed + item.swayPhase) * ((2.5 * Math.PI) / 180);
            item.currentRotation = item.baseRotation + sway;
          }

          const currentScale = item.maxScale * growT * (1 + hoverBoost * item.hover);
          const lift = 0.5 * currentScale;
          const liftX = -Math.sin(item.currentRotation) * lift;
          const liftY = Math.cos(item.currentRotation) * lift;

          _tempPosition.set(item.x + liftX, item.y + liftY, item.z);
          _tempEuler.set(0, 0, item.currentRotation);
          _tempQuaternion.setFromEuler(_tempEuler);
          _tempScale.set(currentScale, currentScale, 1);
          _tempMatrix.compose(_tempPosition, _tempQuaternion, _tempScale);

          leafMesh.setMatrixAt(i, _tempMatrix);
          needsUpdate = true;
        }
        if (needsUpdate) leafMesh.instanceMatrix.needsUpdate = true;
      }

      state.renderer.render(state.scene, state.camera);
    };

    threeRef.current.animationFrameId = requestAnimationFrame(renderLoop);

    const resizeObserver = new ResizeObserver((entries) => {
      if (destroyed) return;
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width <= 0 || height <= 0) continue;

        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (destroyed || !threeRef.current) return;
          const s = threeRef.current;
          s.renderer.setSize(width, height, false);
          s.camera.aspect = width / height;
          const newSpanH = height * SCALE_FACTOR;
          s.camera.fov = 2 * Math.atan(newSpanH / 2 / CAM_DISTANCE) * (180 / Math.PI);
          s.camera.updateProjectionMatrix();

          if (s.currentImage && s.currentImage.complete) {
            sampleImageMask(s.currentImage, width, height);
          }
        }, 120);
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (threeRef.current) {
            const wasVisible = threeRef.current.isVisible;
            threeRef.current.isVisible = entry.isIntersecting;
            if (entry.isIntersecting && !wasVisible) {
              replayAnimation();
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      if (threeRef.current) {
        threeRef.current.isTabActive = !document.hidden;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      destroyed = true;
      clearTimeout(resizeTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (threeRef.current) {
        cancelAnimationFrame(threeRef.current.animationFrameId);

        if (threeRef.current.bloomMesh) {
          threeRef.current.group.remove(threeRef.current.bloomMesh);
          threeRef.current.bloomMesh.dispose();
        }
        if (threeRef.current.leafMesh) {
          threeRef.current.group.remove(threeRef.current.leafMesh);
          threeRef.current.leafMesh.dispose();
        }
        if (threeRef.current.subject3DMesh) {
          threeRef.current.group.remove(threeRef.current.subject3DMesh);
          threeRef.current.subject3DMesh.geometry.dispose();
          if (Array.isArray(threeRef.current.subject3DMesh.material)) {
            threeRef.current.subject3DMesh.material.forEach((m) => m.dispose());
          } else {
            threeRef.current.subject3DMesh.material.dispose();
          }
        }
        if (threeRef.current.subjectGlowMesh) {
          threeRef.current.group.remove(threeRef.current.subjectGlowMesh);
          threeRef.current.subjectGlowMesh.geometry.dispose();
          if (Array.isArray(threeRef.current.subjectGlowMesh.material)) {
            threeRef.current.subjectGlowMesh.material.forEach((m) => m.dispose());
          } else {
            threeRef.current.subjectGlowMesh.material.dispose();
          }
        }

        threeRef.current.geometry.dispose();
        threeRef.current.bloomTexture.dispose();
        threeRef.current.leafTexture.dispose();
        if (threeRef.current.subjectTexture) threeRef.current.subjectTexture.dispose();
        threeRef.current.bloomMaterial.dispose();
        threeRef.current.leafMaterial.dispose();
        threeRef.current.renderer.dispose();
        threeRef.current = null;
      }
    };
  }, [sampleImageMask, replayAnimation, opacity]);

  // Load Image & Resample on parameter changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    const handleLoad = () => {
      if (threeRef.current) {
        threeRef.current.currentImage = img;
      }
      sampleImageMask(img, container.clientWidth, container.clientHeight);
    };

    img.onload = handleLoad;
    if (img.complete) {
      handleLoad();
    }
  }, [
    src,
    mode,
    colorMode,
    bloomColor,
    leafColor,
    maxParticles,
    bloomSize,
    leafSize,
    leafMix,
    spread,
    hueSpread,
    threshold,
    duration,
    delay,
    sampleImageMask,
  ]);

  // Opacity updates
  useEffect(() => {
    if (threeRef.current) {
      const bloomAlpha = 0.05 + Math.min(20, Math.max(1, opacity)) * 0.045;
      const leafAlpha = 0.08 + Math.min(20, Math.max(1, opacity)) * 0.045;
      threeRef.current.bloomMaterial.opacity = bloomAlpha;
      threeRef.current.leafMaterial.opacity = leafAlpha;
    }
  }, [opacity]);

  // Background updates
  useEffect(() => {
    if (threeRef.current) {
      if (background !== 'transparent') {
        threeRef.current.renderer.setClearColor(new THREE.Color(background), 1);
      } else {
        threeRef.current.renderer.setClearColor(0x000000, 0);
      }
    }
  }, [background]);

  // ───────────────────────────────────────────────────────────────────────────
  // POINTER & 3D TILT HANDLERS
  // ───────────────────────────────────────────────────────────────────────────

  const updatePointerPosition = useCallback((clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;

    pointerRef.current.x = (px - rect.width / 2) * SCALE_FACTOR;
    pointerRef.current.y = -(py - rect.height / 2) * SCALE_FACTOR;
    pointerRef.current.active = true;

    // 3D Parallax Tilt Normalized Coordinates [-1, 1]
    if (threeRef.current) {
      const normX = (px / rect.width - 0.5) * 2;
      const normY = (py / rect.height - 0.5) * 2;
      threeRef.current.targetTiltX = -normY * 0.22;
      threeRef.current.targetTiltY = normX * 0.28;
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      updatePointerPosition(e.clientX, e.clientY);
    },
    [updatePointerPosition]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      updatePointerPosition(e.clientX, e.clientY);
    },
    [updatePointerPosition]
  );

  const handlePointerLeave = useCallback(() => {
    pointerRef.current.active = false;
    pointerRef.current.x = 99999;
    pointerRef.current.y = 99999;
    if (threeRef.current) {
      threeRef.current.targetTiltX = 0;
      threeRef.current.targetTiltY = 0;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        touchAction: 'none',
        userSelect: 'none',
        ...style,
      }}
      className={`flower-image-container ${className || ''}`}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {isLoading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '2px solid rgba(255, 140, 60, 0.25)',
              borderTopColor: '#ff7722',
              animation: 'spin 0.8s linear infinite',
            }}
          />
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// PRESETS & WRAPPER UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

export interface FlowerPreset {
  name: string;
  props: Partial<FlowerImageProps>;
}

export const FLOWER_PRESETS = {
  hybridSunsetBed: {
    name: '3D Living Model (Bed + Sprouting Flora)',
    props: {
      mode: 'hybrid',
      colorMode: 'image',
      bloomSize: 10,
      leafSize: 10,
      leafMix: 4,
      spread: 4,
      hueSpread: 6,
      opacity: 18,
      duration: 0.9,
      enable3DTilt: true,
      idleMotion: true,
    },
  },
  pureParticleBed: {
    name: 'Full Botanical Cloud Synthesis',
    props: {
      mode: 'particle',
      colorMode: 'image',
      bloomSize: 9,
      leafSize: 8,
      leafMix: 3,
      spread: 4,
      hueSpread: 7,
      opacity: 19,
      duration: 1.0,
      enable3DTilt: true,
      idleMotion: true,
    },
  },
  contourSprout: {
    name: 'Contour Flora & Cloud Vines',
    props: {
      mode: 'contour',
      colorMode: 'image',
      bloomSize: 12,
      leafSize: 11,
      leafMix: 6,
      spread: 5,
      hueSpread: 8,
      opacity: 19,
      duration: 0.85,
      enable3DTilt: true,
      idleMotion: true,
    },
  },
  originkitClassicPalette: {
    name: 'Originkit Classic Palette',
    props: {
      mode: 'hybrid',
      colorMode: 'palette',
      bloomColor: '#FF4D0F',
      leafColor: '#1F8A3B',
      bloomSize: 11,
      leafSize: 10,
      leafMix: 5,
      spread: 5,
      hueSpread: 10,
      opacity: 18,
      enable3DTilt: true,
      idleMotion: true,
    },
  },
} as const;

export function withPreset(defaultProps: Partial<FlowerImageProps>) {
  return forwardRef<FlowerImageHandle, FlowerImageProps>(function PresetFlowerImage(props, ref) {
    return <FlowerImage ref={ref} {...defaultProps} {...props} />;
  });
}

export default FlowerImage;
