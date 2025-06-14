
// Language detection with specific language codes
export const detectLanguage = (text: string): string => {
  // Chinese (Simplified and Traditional)
  if (/[\u4e00-\u9fff]/.test(text)) {
    return 'zh-CN';
  }
  // Japanese
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) {
    return 'ja';
  }
  // Korean
  if (/[\uac00-\ud7af]/.test(text)) {
    return 'ko';
  }
  // Russian/Cyrillic
  if (/[\u0400-\u04ff]/.test(text)) {
    return 'ru';
  }
  // Arabic
  if (/[\u0600-\u06ff]/.test(text)) {
    return 'ar';
  }
  // Hebrew
  if (/[\u0590-\u05ff]/.test(text)) {
    return 'he';
  }
  // Thai
  if (/[\u0e00-\u0e7f]/.test(text)) {
    return 'th';
  }
  // Hindi/Devanagari
  if (/[\u0900-\u097f]/.test(text)) {
    return 'hi';
  }
  // Greek
  if (/[\u0370-\u03ff]/.test(text)) {
    return 'el';
  }
  // Portuguese (check for specific Portuguese characters)
  if (/[ãõçáéíóúâêîôûàèìòù]/i.test(text)) {
    return 'pt';
  }
  // Italian (check for specific Italian characters)
  if (/[àèéìíîòóù]/i.test(text)) {
    return 'it';
  }
  // Spanish (check for specific Spanish characters)
  if (/[ñáéíóúü¿¡]/i.test(text)) {
    return 'es';
  }
  // French (check for specific French characters)
  if (/[àâäçéèêëïîôùûüÿ]/i.test(text)) {
    return 'fr';
  }
  // German (check for specific German characters)
  if (/[äöüß]/i.test(text)) {
    return 'de';
  }
  // Dutch (check for specific Dutch characters)
  if (/[áàéèíìóòúùäëïöü]/i.test(text)) {
    return 'nl';
  }
  // Swedish/Norwegian/Danish (check for Nordic characters)
  if (/[åäöæøé]/i.test(text)) {
    return 'sv'; // Default to Swedish, but covers Nordic languages
  }
  // Polish (check for specific Polish characters)
  if (/[ąćęłńóśźż]/i.test(text)) {
    return 'pl';
  }
  // Czech (check for specific Czech characters)
  if (/[áčďéěíňóřšťúůýž]/i.test(text)) {
    return 'cs';
  }
  // Turkish (check for specific Turkish characters)
  if (/[çğıöşü]/i.test(text)) {
    return 'tr';
  }
  // Romanian (check for specific Romanian characters)
  if (/[ăâîșțşţ]/i.test(text)) {
    return 'ro';
  }
  // Hungarian (check for specific Hungarian characters)
  if (/[áéíóöőúüű]/i.test(text)) {
    return 'hu';
  }
  // Vietnamese (check for specific Vietnamese characters)
  if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(text)) {
    return 'vi';
  }
  // Default to English if no specific patterns found
  return 'en';
};

export const isEnglish = (text: string): boolean => {
  return detectLanguage(text) === 'en';
};

export const translateText = async (text: string, targetLang: string = 'en'): Promise<string> => {
  try {
    const sourceLang = detectLanguage(text);
    
    // If already in target language, return as is
    if (sourceLang === targetLang) {
      return text;
    }
    
    // Use specific language pair format
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
    const data = await response.json();
    
    console.log('Translation API response:', data);
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    
    throw new Error(`Translation failed: ${data.responseDetails || 'Unknown error'}`);
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};
