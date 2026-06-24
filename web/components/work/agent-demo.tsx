import type { AgentDemoData } from "@/content/work";

// Phone-frame transcript + a "what it handles / you stay in control" panel.
// Phone styling mirrors components/mock/examples.tsx (the customer's phone:
// agent messages on the left in grey, the other person on the right in signal).
export function AgentDemo({ demo }: { demo: AgentDemoData }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="flex justify-center">
        <div className="w-full max-w-[330px] rounded-[2.4rem] border border-[var(--color-border)] bg-[#0c0c0c] p-2.5 shadow-[0_40px_80px_-32px_rgba(0,0,0,0.6)]">
          <div className="rounded-[1.9rem] bg-[#111111] p-5">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-white/15" aria-hidden />
            <div className="grid gap-2.5">
              {demo.messages.map((m, i) =>
                m.from === "agent" ? (
                  <div
                    key={i}
                    className="mr-auto w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-[#262626] px-3.5 py-2.5 text-[13px] leading-[1.5] text-[var(--color-fg)]"
                  >
                    {m.text}
                  </div>
                ) : (
                  <div
                    key={i}
                    className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[var(--color-signal)] px-3.5 py-2.5 text-[13px] font-medium text-[var(--color-on-signal)]"
                  >
                    {m.text}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="inline-block rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-fg-variant)]">
          Demo
        </span>
        <h3 className="mt-4 text-[22px] font-bold tracking-tight text-[var(--color-fg)]">{demo.name}</h3>
        <p className="mt-2 text-[16px] leading-[1.5] text-[var(--color-fg-variant)]">{demo.tagline}</p>
        <ul className="mt-5 grid gap-2.5">
          {demo.handles.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[var(--color-fg)]">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-signal)]" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-[var(--color-border)] pt-4 text-[14px] leading-[1.5] text-[var(--color-fg-variant)]">
          <span className="font-semibold text-[var(--color-fg)]">You stay in control:</span> {demo.control}.
        </p>
      </div>
    </div>
  );
}
