/**
 * web/lib/check/gather/perplexity.ts
 *
 * Gathers answers from the Perplexity Sonar API for each prompt.
 * Gracefully skips if PERPLEXITY_API_KEY is not set.
 */

import { ENV } from "../config";
import type { EngineResult, EngineAnswer } from "../types";

export async function gatherPerplexity(prompts: string[]): Promise<EngineResult> {
  if (!ENV.perplexity) {
    return {
      engine: "Perplexity",
      available: false,
      note: "PERPLEXITY_API_KEY not set",
      answers: [],
    };
  }

  const apiKey = ENV.perplexity;

  const answers: EngineAnswer[] = await Promise.all(
    prompts.map(async (prompt): Promise<EngineAnswer> => {
      try {
        const response = await fetch("https://api.perplexity.ai/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "sonar",
            messages: [{ role: "user", content: prompt }],
          }),
        });

        if (!response.ok) {
          return { prompt, text: `(error: HTTP ${response.status} ${response.statusText})` };
        }

        const data = (await response.json()) as {
          choices?: { message?: { content?: string } }[];
          citations?: string[];
        };

        const text = data.choices?.[0]?.message?.content ?? "(no response)";
        const citations = Array.isArray(data.citations) ? data.citations : undefined;

        return { prompt, text, citations };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return { prompt, text: `(error: ${msg})` };
      }
    }),
  );

  const engine = "Perplexity";
  const allFailed = answers.every(
    (a) => a.text === "(no response)" || a.text.startsWith("(error:"),
  );
  if (allFailed) {
    return {
      engine,
      available: false,
      note: "all prompts failed (check Perplexity key)",
      answers,
    };
  }

  return { engine, available: true, answers };
}
