"use client";

import { useCallback, useRef, useState } from "react";
import type { ComparisonItem } from "@/content/paper";

/**
 * Before/after image comparison with a draggable divider.
 * Common on super-resolution / deblurring / restoration project pages.
 *
 * Uses clip-path (not width clipping) so both images render at full size —
 * SSR-safe, no measurement of the container needed.
 */
export function CompareSlider({ item }: { item: ComparisonItem }) {
  const [pos, setPos] = useState(50); // percent revealed of "before" from the left
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // Multiple "after" variants (e.g. deblur without IMU vs with IMU) — falls
  // back to the single after/afterLabel pair when `afters` is not provided.
  const variants =
    item.afters && item.afters.length > 0
      ? item.afters
      : [{ src: item.after, label: item.afterLabel ?? "After" }];
  const active = variants[Math.min(activeIdx, variants.length - 1)];

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      /* pointer may not be active (e.g. synthetic events); dragging still works */
    }
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updateFromClientX(e.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };

  return (
    <figure>
      <div
        ref={containerRef}
        style={{ aspectRatio: item.aspect ?? "16 / 9", touchAction: "pan-y" }}
        className="relative w-full cursor-ew-resize select-none overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        onPointerLeave={stop}
      >
        {/* After (full, underneath) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={active.src}
          alt={`${item.label} — ${active.label}`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* Before (clipped to the left of the divider) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.before}
          alt={`${item.label} — ${item.beforeLabel ?? "before"}`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />

        {/* Labels */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
          {item.beforeLabel ?? "Before"}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
          {active.label}
        </span>

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white shadow-md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </div>
        </div>

        {/* Keyboard-accessible control. pointer-events-none so it never
            intercepts touch/mouse (the container handles all dragging via
            pointer events); keyboard focus + arrow keys still work. */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Reveal amount for ${item.label}`}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 w-full opacity-0"
        />
      </div>
      {variants.length > 1 && (
        <div className="mt-3 flex justify-center">
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
            {variants.map((v, i) => (
              <button
                key={v.src}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  i === activeIdx
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <figcaption className="mt-3 text-center text-sm text-slate-600">
        {item.label}
      </figcaption>
    </figure>
  );
}
