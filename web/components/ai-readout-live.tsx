"use client";

import { useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { CHECK_CTA } from "@/lib/nav";

type AIReadoutLiveProps = {
  prompt: string;
  competitors: string[];
  caption?: string;
};

type DocWithViewTransition = Document & {
  startViewTransition?: (cb: () => void) => unknown;
};

const YOU = "you";

// Live, interactive version of the signature AI-readout. Two acts:
//  A — a pure-CSS "answer being generated" reveal (see globals.css `.air-*`).
//  B — type your business into the empty slot, then watch it spring to #1 with
//      OperateAI via the View Transitions API (graceful instant fallback).
export function AIReadoutLive({ prompt, competitors, caption = "Asked just now" }: AIReadoutLiveProps) {
  const competitorIds = competitors.map((_, i) => `c${i}`);
  const [orderIds, setOrderIds] = useState<string[]>([...competitorIds, YOU]);
  const [you, setYou] = useState("");
  const [reranked, setReranked] = useState(false);

  const labelFor = (id: string) => (id === YOU ? you.trim() : competitors[Number(id.slice(1))]);

  function rerank() {
    if (!you.trim() || reranked) return;
    const apply = () =>
      flushSync(() => {
        setOrderIds([YOU, ...competitorIds]);
        setReranked(true);
      });
    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = typeof document !== "undefined" ? (document as DocWithViewTransition) : null;
    if (doc?.startViewTransition && !reduced) doc.startViewTransition(apply);
    else apply();
  }

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-12 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-signal-glow), transparent 70%)" }}
      />

      <div
        className="ai-live grain relative overflow-hidden rounded-3xl border font-mono text-[12.5px] leading-[1.6]"
        style={{
          borderColor: "color-mix(in oklab, var(--color-signal) 18%, var(--color-border))",
          background: "linear-gradient(160deg, #1c1c1c, #0c0c0c)",
          boxShadow: "0 40px 80px -32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="relative z-[1] p-5 lg:p-6">
          {/* header */}
          <div className="mb-5 flex items-center justify-between border-b border-[var(--color-border)] pb-4">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="grid h-6 w-6 place-items-center rounded-md bg-[var(--color-signal)] text-[10px] font-extrabold text-[var(--color-on-signal)]"
              >
                AI
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-variant)]">{caption}</span>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-variant)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-signal)]" aria-hidden />
              live
            </span>
          </div>

          {/* prompt — clip-reveal "typing" */}
          <p className="flex gap-2 text-[var(--color-fg)]">
            <span aria-hidden className="select-none text-[var(--color-fg-variant)]">
              &rsaquo;
            </span>
            <span className="air-prompt">{prompt}</span>
          </p>

          {/* thinking — fades in then out during the gap before the answer */}
          <div className="air-think mt-3 flex items-center gap-2 pl-4 text-[var(--color-fg-variant)]" aria-hidden>
            <span className="text-[10px] uppercase tracking-[0.16em]">thinking</span>
            <span className="flex items-center gap-1">
              <i className="inline-block h-1 w-1 rounded-full bg-[var(--color-fg-variant)]" />
              <i className="inline-block h-1 w-1 rounded-full bg-[var(--color-fg-variant)]" />
              <i className="inline-block h-1 w-1 rounded-full bg-[var(--color-fg-variant)]" />
            </span>
          </div>

          {/* answer rows */}
          <ol role="list" className="mt-4 grid gap-1.5">
            {orderIds.map((id, i) => {
              const isYou = id === YOU;
              const named = isYou && reranked;
              const lit = !isYou || named;
              const editing = isYou && !reranked;
              return (
                <li
                  key={id}
                  className={cn(
                    "air-row flex items-center gap-3 rounded-lg px-3 py-2.5",
                    isYou && !named ? "text-[var(--color-fg-variant)]" : "text-[var(--color-fg)]",
                  )}
                  style={
                    {
                      viewTransitionName: `air-${id}`,
                      background: named
                        ? "color-mix(in oklab, var(--color-signal) 16%, transparent)"
                        : !isYou
                          ? "color-mix(in oklab, var(--color-signal) 6%, transparent)"
                          : "color-mix(in oklab, var(--color-fg) 4%, transparent)",
                      ...(named
                        ? { boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--color-signal) 40%, transparent)" }
                        : {}),
                    } as CSSProperties
                  }
                >
                  <span
                    className={cn(
                      "grid h-5 w-5 flex-none place-items-center rounded-md bg-[var(--color-surface-high)] text-[10px]",
                      isYou && !named ? "text-[var(--color-fg-variant)]" : "text-[var(--color-signal)]",
                    )}
                  >
                    {i + 1}
                  </span>

                  {editing ? (
                    <input
                      value={you}
                      onChange={(e) => setYou(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          rerank();
                        }
                      }}
                      maxLength={40}
                      placeholder="+ type your business"
                      aria-label="Your business name"
                      className="w-full flex-1 bg-transparent text-[var(--color-fg)] outline-none placeholder:text-[color-mix(in_oklab,var(--color-fg-variant)_75%,transparent)]"
                    />
                  ) : (
                    <span className="flex-1">{labelFor(id)}</span>
                  )}

                  {lit ? (
                    <span aria-hidden className="text-[var(--color-signal)]">
                      ✓
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-variant)]">not named</span>
                  )}
                </li>
              );
            })}
          </ol>

          {/* foot — hook + action */}
          <div className="air-foot mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
            {!reranked ? (
              <>
                <p className="flex items-center gap-2 font-semibold text-[var(--color-signal)]">
                  <span aria-hidden className="caret inline-block h-3.5 w-[7px] bg-[var(--color-signal)]" />
                  is your name here?
                </p>
                {you.trim() ? (
                  <button
                    type="button"
                    onClick={rerank}
                    className="rounded-full bg-[var(--color-signal)] px-4 py-1.5 text-[12px] font-bold text-[var(--color-on-signal)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    See it with OperateAI →
                  </button>
                ) : null}
              </>
            ) : (
              <>
                <p className="font-semibold text-[var(--color-signal)]">Now AI names you first.</p>
                <Link
                  href={CHECK_CTA.href}
                  className="rounded-full bg-[var(--color-signal)] px-4 py-1.5 text-[12px] font-bold text-[var(--color-on-signal)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Make it real, free →
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
