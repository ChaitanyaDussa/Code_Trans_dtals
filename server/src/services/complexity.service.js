import { askGemini } from "./gemini.service.js";
import { ANALYZE_COMPLEXITY_PROMPT } from "../constants/prompts.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";
import { getLanguageName } from "../constants/languages.js";

export const analyzeComplexity = async (code, language) => {
  const langName = getLanguageName(language);

  const prompt = ANALYZE_COMPLEXITY_PROMPT(code, langName);

  const rawResponse = await askGemini(prompt);
  const result = parseGeminiJSON(rawResponse);

  return {
    timeComplexity: result.timeComplexity || "Unknown",
    spaceComplexity: result.spaceComplexity || "Unknown",
    explanation: result.explanation || "Could not determine complexity.",
  };
};
