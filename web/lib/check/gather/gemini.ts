/**
 * web/lib/check/gather/gemini.ts
 *
 * Gathers answers from the Google Gemini API (gemini-2.5-flash) with Google
 * Search grounding enabled. Gracefully skips if GEMINI_API_KEY is not set.
 */

import { ENV } from "../config";
import type { EngineResult, EngineAnswer } from "../types";

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

  const apiKey = ENV.gemini;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

  const answers: EngineAnswer[] = await Promise.all(
    prompts.map(async (prompt): Promise<EngineAnswer> => {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            tools: [{ google_search: {} }],
          }),
        });

        if (!response.ok) {
          return { prompt, text: `(error: HTTP ${response.status} ${response.statusText})` };
        }

        const data = (await response.json()) as GeminiResponse;

        const text =
          data.candidates?.[0]?.content?.parts
            ?.map((p) => p.text ?? "")
            .join("")
            .trim() ?? "(no response)";

        return { prompt, text: text || "(no response)" };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return { prompt, text: `(error: ${msg})` };
      }
    }),
  );

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
