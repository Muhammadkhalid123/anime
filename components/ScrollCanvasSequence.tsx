'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollCanvasSequenceProps {
  totalFrames?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export default function ScrollCanvasSequence({
  totalFrames = 100,
  containerRef,
  className = '',
}: ScrollCanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedFramesRef = useRef<boolean[]>(new Array(totalFrames).fill(false));
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);
  const lastRenderedFrameRef = useRef<number>(-1);
  const [initialFrameLoaded, setInitialFrameLoaded] = useState(false);
  const prefersReducedMotionRef = useRef(false);

  // Helper to get frame image path
  const getFrameSrc = (index: number) => {
    const padded = String(index).padStart(3, '0');
    return `/frames/frame-${padded}.jpg`;
  };

  // Draw a specific frame onto canvas with cover aspect-ratio
  const drawFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Find requested frame or fallback to closest loaded frame
    let frameIndex = Math.max(1, Math.min(totalFrames, Math.round(frameNumber))) - 1;
    let img = imagesRef.current[frameIndex];

    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame to prevent any blank screen or flicker
      let bestDist = Infinity;
      let bestIndex = -1;
      for (let i = 0; i < totalFrames; i++) {
        if (loadedFramesRef.current[i] && imagesRef.current[i]?.complete) {
          const dist = Math.abs(i - frameIndex);
          if (dist < bestDist) {
            bestDist = dist;
            bestIndex = i;
          }
        }
      }
      if (bestIndex !== -1) {
        img = imagesRef.current[bestIndex];
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate aspect cover dimensions
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const renderWidth = imgWidth * ratio;
    const renderHeight = imgHeight * ratio;
    const offsetX = (canvasWidth - renderWidth) / 2;
    const offsetY = (canvasHeight - renderHeight) / 2;

    // Fast draw
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, renderWidth, renderHeight);

    lastRenderedFrameRef.current = frameNumber;
  }, [totalFrames]);

  // Update canvas size matching DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    // Force redraw current frame on resize
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Calculate target frame from container scroll progress
  const updateScrollProgress = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;

    if (scrollableDistance <= 0) return;

    // -rect.top is the distance scrolled into the container
    const scrolled = -rect.top;
    const rawProgress = scrolled / scrollableDistance;
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));

    // Map 0..1 to 1..totalFrames
    const target = 1 + clampedProgress * (totalFrames - 1);
    targetFrameRef.current = target;

    if (prefersReducedMotionRef.current) {
      currentFrameRef.current = target;
      drawFrame(target);
    }
  }, [containerRef, totalFrames, drawFrame]);

  // Progressive image preloading
  useEffect(() => {
    imagesRef.current = new Array(totalFrames).fill(null);
    loadedFramesRef.current = new Array(totalFrames).fill(false);

    // 1. Load First Frame with maximum priority
    const firstImg = new window.Image();
    firstImg.src = getFrameSrc(1);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      loadedFramesRef.current[0] = true;
      setInitialFrameLoaded(true);
      resizeCanvas();
      drawFrame(1);
    };

    // 2. Preload remaining frames progressively in batches
    const preloadRemaining = () => {
      // Preload critical milestone frames first (every 10th frame), then fill in
      const priorityOrder: number[] = [];
      
      // Tier 1: Milestones (every 5 frames)
      for (let i = 2; i <= totalFrames; i += 5) {
        priorityOrder.push(i);
      }
      // Tier 2: Remaining frames
      for (let i = 2; i <= totalFrames; i++) {
        if (!priorityOrder.includes(i)) {
          priorityOrder.push(i);
        }
      }

      let currentIndex = 0;
      const batchSize = 6;

      const loadNextBatch = () => {
        if (currentIndex >= priorityOrder.length) return;

        const batch = priorityOrder.slice(currentIndex, currentIndex + batchSize);
        currentIndex += batchSize;

        let completedInBatch = 0;
        batch.forEach((frameNum) => {
          const img = new window.Image();
          img.src = getFrameSrc(frameNum);
          img.onload = () => {
            imagesRef.current[frameNum - 1] = img;
            loadedFramesRef.current[frameNum - 1] = true;
            completedInBatch++;
            if (completedInBatch === batch.length) {
              if (window.requestIdleCallback) {
                window.requestIdleCallback(loadNextBatch, { timeout: 200 });
              } else {
                setTimeout(loadNextBatch, 16);
              }
            }
          };
          img.onerror = () => {
            // Fallback try with underscore naming if needed
            const fallbackImg = new window.Image();
            const padded = String(frameNum).padStart(3, '0');
            fallbackImg.src = `/frames/frame_${padded}.jpg`;
            fallbackImg.onload = () => {
              imagesRef.current[frameNum - 1] = fallbackImg;
              loadedFramesRef.current[frameNum - 1] = true;
            };
            completedInBatch++;
            if (completedInBatch === batch.length) {
              setTimeout(loadNextBatch, 16);
            }
          };
        });
      };

      loadNextBatch();
    };

    if (firstImg.complete) {
      preloadRemaining();
    } else {
      firstImg.addEventListener('load', preloadRemaining, { once: true });
    }

    return () => {
      imagesRef.current = [];
    };
  }, [totalFrames, resizeCanvas, drawFrame]);

  // Main continuous animation loop with smooth lerp
  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = mediaQuery.matches;

    const handleMotionPreference = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionPreference);

    // Window resize handler
    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    // Scroll handler
    const onScroll = () => {
      updateScrollProgress();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    // Persistent rAF loop for Apple-like smooth interpolation
    let running = true;
    const lerpFactor = 0.14; // Ultra smooth responsiveness

    const tick = () => {
      if (!running) return;

      if (!prefersReducedMotionRef.current) {
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.001) {
          currentFrameRef.current += diff * lerpFactor;
          drawFrame(currentFrameRef.current);
        } else if (currentFrameRef.current !== targetFrameRef.current) {
          currentFrameRef.current = targetFrameRef.current;
          drawFrame(currentFrameRef.current);
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', onScroll);
      mediaQuery.removeEventListener('change', handleMotionPreference);
    };
  }, [resizeCanvas, updateScrollProgress, drawFrame]);

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-700 block"
        style={{
          opacity: initialFrameLoaded ? 1 : 0,
        }}
      />
      {/* Seamless luxury edge blending overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />
    </div>
  );
}
