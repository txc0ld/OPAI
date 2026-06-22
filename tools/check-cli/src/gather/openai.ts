/**
 * src/gather/openai.ts
 *
 * Gathers answers from the OpenAI Responses API with web search enabled.
 * Gracefully skips if OPENAI_API_KEY is not set.
 */

import { ENV } from "../config.js";
import type { EngineResult, EngineAnswer } from "../types.js";

// Shape of the /v1/responses output we care about.
interface ResponseOutput {
  output_text?: string;
  output?: { type: string; content?: { type: string; text?: string }[] }[];
}

export async function gatherOpenAI(prompts: string[]): Promise<EngineResult> {
  if (!ENV.openai) {
    return {
      engine: "ChatGPT (web search)",
      available: false,
      note: "OPENAI_API_KEY not set",
      answers: [],
    };
  }

  const apiKey = ENV.openai;

  const answers: EngineAnswer[] = await Promise.all(
    prompts.map(async (prompt): Promise<EngineAnswer> => {
      try {
        const response = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4.1",
            tools: [{ type: "web_search" }], // some accounts need "web_search_preview" — switch if you get a 400
            input: prompt,
          }),
        });

        if (!response.ok) {
          return { prompt, text: `(error: HTTP ${response.status} ${response.statusText})` };
        }

        const data = (await response.json()) as ResponseOutput;

        // Prefer the top-level output_text if present (non-empty string).
        let text: string;
        if (typeof data.output_text === "string" && data.output_text.length > 0) {
          text = data.output_text;
        } else if (Array.isArray(data.output)) {
          // Walk output items that have a content array; prefer blocks typed
          // "output_text", falling back to any block that has a .text string.
          const parts: string[] = [];
          for (const item of data.output) {
            if (!Array.isArray(item.content)) continue;
            for (const block of item.content) {
              if (block.type === "output_text" && typeof block.text === "string") {
                parts.push(block.text);
              } else if (typeof block.text === "string" && block.text.length > 0) {
                parts.push(block.text);
              }
            }
          }
          text = parts.join("").trim() || "(no response)";
        } else {
          text = "(no response)";
        }

        return { prompt, text };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return { prompt, text: `(error: ${msg})` };
      }
    }),
  );

  const engine = "ChatGPT (web search)";
  const allFailed = answers.every(
    (a) => a.text === "(no response)" || a.text.startsWith("(error:"),
  );
  if (allFailed) {
    return {
      engine,
      available: false,
      note: "all prompts failed (check OpenAI key / tool name)",
      answers,
    };
  }

  return { engine, available: true, answers };
}
