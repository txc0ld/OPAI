/**
 * src/gather/openai.ts
 *
 * Gathers answers from the OpenAI Responses API with web search enabled.
 * Gracefully skips if OPENAI_API_KEY is not set.
 *
 * NOTE: The tool name "web_search_preview" may need to be "web_search"
 * depending on your account tier or API version. Adjust on first live run if
 * you receive a 400 error about an unknown tool name.
 */

import { ENV } from "../config.js";
import type { EngineResult, EngineAnswer } from "../types.js";

// Shape of the /v1/responses output we care about.
interface ResponseOutput {
  output_text?: string;
  output?: {
    content?: { text?: string }[];
  }[];
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

  const answers: EngineAnswer[] = [];

  for (const prompt of prompts) {
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ENV.openai}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4.1",
          tools: [{ type: "web_search_preview" }],
          input: prompt,
        }),
      });

      if (!response.ok) {
        answers.push({
          prompt,
          text: `(error: HTTP ${response.status} ${response.statusText})`,
        });
        continue;
      }

      const data = (await response.json()) as ResponseOutput;

      // Prefer the top-level output_text if present, otherwise best-effort join
      // from the output array content parts.
      let text: string;
      if (data.output_text) {
        text = data.output_text;
      } else if (Array.isArray(data.output)) {
        text = data.output
          .flatMap((o) => o.content ?? [])
          .map((c) => c.text ?? "")
          .join("")
          .trim() || "(no response)";
      } else {
        text = "(no response)";
      }

      answers.push({ prompt, text });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      answers.push({ prompt, text: `(error: ${msg})` });
    }
  }

  return {
    engine: "ChatGPT (web search)",
    available: true,
    answers,
  };
}
