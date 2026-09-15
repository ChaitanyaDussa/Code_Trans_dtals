import { askGemini } from "./gemini.service.js";
import { OPTIMIZE_PROMPT } from "../constants/prompts.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";
import { getLanguageName } from "../constants/languages.js";

export const optimizeCode = async (code, language) => {
  const langName = getLanguageName(language);

  const prompt = OPTIMIZE_PROMPT(code, langName);

  const rawResponse = await askGemini(prompt);
  const result = parseGeminiJSON(rawResponse);

  return {
    optimizedCode: result.optimizedCode || "",
    suggestions: result.suggestions || "No suggestions available.",
  };
};
