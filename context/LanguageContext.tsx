'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '@/lib/i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (typeof translations)['pt'];
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_gabriel_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (savedLang === 'pt' || savedLang === 'en') {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang === 'pt' ? 'pt-BR' : 'en';
      } else {
        // Optional: Detect browser language preference
        const browserLang = navigator.language?.toLowerCase();
        if (browserLang.startsWith('en')) {
          // If browser is explicitly English, we can still default to pt or en
          // But to be friendly to international visitors, or preserve pt as initial
        }
      }
    } catch {
      // Ignore localStorage errors (e.g. private mode or disabled)
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'pt' ? 'en' : 'pt';
    setLanguage(nextLang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isLoaded,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
