import { AgentDemo } from "@/components/work/agent-demo";
import { AGENT_DEMOS } from "@/content/work";

export function AgentDemos() {
  return (
    <div className="mt-12 grid gap-16">
      {AGENT_DEMOS.map((demo, i) => (
        <div key={demo.key} className={i % 2 === 1 ? "lg:[&>div>div:first-child]:order-2" : undefined}>
          <AgentDemo demo={demo} />
        </div>
      ))}
    </div>
  );
}
