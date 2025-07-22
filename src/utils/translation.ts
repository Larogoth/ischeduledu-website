
import { validateFormInput, sanitizeInput } from './security';
import { logSafeError, ErrorSeverity } from './errorHandling';
import { validateTranslationInput } from './inputValidation';

export interface TranslationResponse {
  responseData: {
    translatedText: string;
  };
  responseDetails: string;
  responseStatus: number;
  responderId: string;
  matches: any[];
}

let cache: { [key: string]: string } = {};

const getCacheKey = (text: string, targetLang: string): string => {
  return `${text.toLowerCase().trim()}_${targetLang}`;
};

export const isEnglish = (text: string): boolean => {
  if (!text || typeof text !== 'string') return true;
  
  // Simple heuristic to detect non-English text
  const nonEnglishPatterns = [
    /[ñáéíóúü]/i, // Spanish
    /[àâäéèêëïîôöùûüÿç]/i, // French
    /[äöüß]/i, // German
    /[àèéìíîòóù]/i, // Italian
    /[ãâáàéêíóôõú]/i, // Portuguese
    /[а-яё]/i, // Russian
    /[\u4e00-\u9fff]/, // Chinese
    /[\u3040-\u309f\u30a0-\u30ff]/, // Japanese
    /[\uac00-\ud7af]/, // Korean
    /[\u0600-\u06ff]/, // Arabic
    /[\u0900-\u097f]/ // Hindi
  ];

  return !nonEnglishPatterns.some(pattern => pattern.test(text));
};

export const translateText = async (text: string, targetLang: string = 'en'): Promise<string> => {
  // Enhanced input validation
  const validation = validateTranslationInput(text);
  if (!validation.isValid) {
    logSafeError(
      new Error(`Translation input validation failed: ${validation.error}`),
      'translateText',
      ErrorSeverity.LOW
    );
    return text; // Return original text if validation fails
  }

  const sanitizedText = validation.sanitizedText;
  const cacheKey = getCacheKey(sanitizedText, targetLang);
  
  // Check cache first
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  // Don't translate if text is too short or appears to be non-text
  if (sanitizedText.length < 3 || /^\d+$/.test(sanitizedText) || /^[^a-zA-Z]*$/.test(sanitizedText)) {
    cache[cacheKey] = sanitizedText;
    return sanitizedText;
  }

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sanitizedText)}&langpair=en|${targetLang}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout and security headers
        signal: AbortSignal.timeout(5000) // 5 second timeout
      }
    );

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate API response structure
    if (!data || typeof data.responseData?.translatedText !== 'string') {
      throw new Error('Invalid translation API response structure');
    }

    const translatedText = data.responseData.translatedText;
    
    // Validate translated text before caching
    const translationValidation = validateTranslationInput(translatedText);
    const finalTranslation = translationValidation.isValid ? translationValidation.sanitizedText : sanitizedText;
    
    // Cache the result
    cache[cacheKey] = finalTranslation;
    return finalTranslation;
    
  } catch (error) {
    logSafeError(error, 'translateText', ErrorSeverity.LOW);
    
    // Return original text if translation fails
    cache[cacheKey] = sanitizedText;
    return sanitizedText;
  }
};

export const detectLanguage = (text: string): string => {
  const validation = validateTranslationInput(text);
  const safeText = validation.isValid ? validation.sanitizedText : text;
  
  // Simple language detection based on character patterns
  const patterns = {
    'es': /[ñáéíóúü]/i,
    'fr': /[àâäéèêëïîôöùûüÿç]/i,
    'de': /[äöüß]/i,
    'it': /[àèéìíîòóù]/i,
    'pt': /[ãâáàéêíóôõú]/i,
    'ru': /[а-яё]/i,
    'zh': /[\u4e00-\u9fff]/,
    'ja': /[\u3040-\u309f\u30a0-\u30ff]/,
    'ko': /[\uac00-\ud7af]/,
    'ar': /[\u0600-\u06ff]/,
    'hi': /[\u0900-\u097f]/
  };

  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(safeText)) {
      return lang;
    }
  }

  return 'en'; // Default to English
};

export const clearTranslationCache = (): void => {
  cache = {};
};
