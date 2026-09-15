import { translateCode } from "../services/translation.service.js";
import { analyzeComplexity } from "../services/complexity.service.js";
import { optimizeCode } from "../services/optimization.service.js";
import { explainCode } from "../services/explanation.service.js";
import { createHistoryEntry } from "../services/history.service.js";

export const translate = async (req, res, next) => {
  try {
    const { code, sourceLanguage, targetLanguage } = req.body;

    if (!code || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({
        success: false,
        message: "code, sourceLanguage, and targetLanguage are required.",
      });
    }

    const result = await translateCode(code, sourceLanguage, targetLanguage);

    // Save to history (fire and forget --- don't wait for it)
    createHistoryEntry({
      userId: req.user._id,
      type: "translate",
      inputCode: code,
      sourceLanguage,
      targetLanguage,
      output: result,
    }).catch((err) => console.error("Failed to save history:", err.message));

    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const analyze = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "code and language are required.",
      });
    }

    const result = await analyzeComplexity(code, language);

    createHistoryEntry({
      userId: req.user._id,
      type: "analyze",
      inputCode: code,
      sourceLanguage: language,
      output: result,
    }).catch((err) => console.error("Failed to save history:", err.message));

    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const optimize = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "code and language are required.",
      });
    }

    const result = await optimizeCode(code, language);

    createHistoryEntry({
      userId: req.user._id,
      type: "optimize",
      inputCode: code,
      sourceLanguage: language,
      output: result,
    }).catch((err) => console.error("Failed to save history:", err.message));

    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const explain = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "code and language are required.",
      });
    }

    const result = await explainCode(code, language);

    createHistoryEntry({
      userId: req.user._id,
      type: "explain",
      inputCode: code,
      sourceLanguage: language,
      output: result,
    }).catch((err) => console.error("Failed to save history:", err.message));

    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
