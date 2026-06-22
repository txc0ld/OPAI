/**
 * src/gather/gemini.ts
 *
 * Gathers answers from the Google Gemini 2.0 Flash API with Google Search
 * grounding enabled. Gracefully skips if GEMINI_API_KEY is not set.
 */

import { ENV } from "../config.js";
import type { EngineResult, EngineAnswer } from "../types.js";

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
}

export async function gatherGemini(prompts: string[]): Promise<EngineResult> {
  if (!ENV.gemini) {
    return {
      engine: "Google (Gemini)",
      available: false,
      note: "GEMINI_API_KEY not set",
      answers: [],
    };
  }

  const answers: EngineAnswer[] = [];
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

  for (const prompt of prompts) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": ENV.gemini,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ google_search: {} }],
        }),
      });

      if (!response.ok) {
        answers.push({
          prompt,
          text: `(error: HTTP ${response.status} ${response.statusText})`,
        });
        continue;
      }

      const data = (await response.json()) as GeminiResponse;

      const text =
        data.candidates?.[0]?.content?.parts
          ?.map((p) => p.text ?? "")
          .join("")
          .trim() ?? "(no response)";

      answers.push({ prompt, text: text || "(no response)" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      answers.push({ prompt, text: `(error: ${msg})` });
    }
  }

  const engine = "Google (Gemini)";
  const allFailed = answers.every(
    (a) => a.text === "(no response)" || a.text.startsWith("(error:"),
  );
  if (allFailed) {
    return {
      engine,
      available: false,
      note: "all prompts failed (check Gemini key)",
      answers,
    };
  }

  return { engine, available: true, answers };
}
