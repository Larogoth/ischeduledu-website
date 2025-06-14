
// Simple language detection - checks for common non-English characters
export const isEnglish = (text: string): boolean => {
  // Check for common non-English characters (Chinese, Japanese, Korean, etc.)
  const nonEnglishPattern = /[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af\u0400-\u04ff]/;
  return !nonEnglishPattern.test(text);
};

export const translateText = async (text: string, targetLang: string = 'en'): Promise<string> => {
  try {
    // Use Google Translate API via a free service
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|${targetLang}`);
    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    
    throw new Error('Translation failed');
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};
