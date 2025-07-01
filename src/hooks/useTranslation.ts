
import { useState, useEffect, useCallback } from 'react';

interface Translation {
  [key: string]: any;
}

const getDefaultLanguage = (): string => {
  // Get browser language
  const browserLang = navigator.language.split('-')[0];
  
  // Supported languages
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl'];
  
  // Check if browser language is supported, otherwise default to English
  return supportedLanguages.includes(browserLang) ? browserLang : 'en';
};

const loadTranslation = async (language: string): Promise<Translation> => {
  try {
    const translation = await import(`../translations/${language}.json`);
    return translation.default;
  } catch (error) {
    console.warn(`Failed to load translation for ${language}, falling back to English`);
    const fallback = await import('../translations/en.json');
    return fallback.default;
  }
};

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    // Check localStorage first, then browser language
    return localStorage.getItem('preferredLanguage') || getDefaultLanguage();
  });
  
  const [translations, setTranslations] = useState<Translation>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations whenever language changes
  useEffect(() => {
    const loadCurrentTranslation = async () => {
      setIsLoading(true);
      try {
        console.log('Loading translation for language:', currentLanguage);
        const translation = await loadTranslation(currentLanguage);
        setTranslations(translation);
        console.log('Translation loaded successfully:', translation);
      } catch (error) {
        console.error('Error loading translation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCurrentTranslation();
  }, [currentLanguage]);

  const changeLanguage = useCallback((language: string) => {
    console.log('Changing language to:', language);
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  }, []);

  const t = useCallback((key: string): any => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    // Return the value as-is (could be string, array, or object)
    return value !== undefined ? value : key;
  }, [translations]);

  return {
    t,
    currentLanguage,
    changeLanguage,
    isLoading,
    supportedLanguages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl']
  };
};
