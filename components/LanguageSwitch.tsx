'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

interface LanguageSwitchProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function LanguageSwitch({ className = '', size = 'md' }: LanguageSwitchProps) {
  const { language, setLanguage } = useLanguage();

  const isSmall = size === 'sm';

  return (
    <div
      role="group"
      aria-label="Seleção de idioma / Language selector"
      className={`relative inline-flex items-center bg-slate-950/80 p-1 rounded-full border border-slate-800 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 shadow-sm ${className}`}
    >
      {/* Option PT-BR */}
      <button
        type="button"
        onClick={() => setLanguage('pt')}
        aria-pressed={language === 'pt'}
        title="Português do Brasil (PT-BR)"
        className={`relative z-10 flex items-center justify-center gap-1.5 rounded-full font-mono transition-colors duration-200 select-none ${
          isSmall ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
        } ${
          language === 'pt'
            ? 'text-slate-950 font-bold'
            : 'text-slate-400 hover:text-slate-200 font-medium'
        }`}
      >
        {language === 'pt' && (
          <motion.div
            layoutId="lang-active-pill"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-md shadow-cyan-500/30"
          />
        )}
        <span className="relative z-10 flex items-center gap-1">
          <span className="text-xs leading-none" role="img" aria-label="Brasil">
            🇧🇷
          </span>
          <span>PT</span>
        </span>
      </button>

      {/* Option EN */}
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        title="English (EN)"
        className={`relative z-10 flex items-center justify-center gap-1.5 rounded-full font-mono transition-colors duration-200 select-none ${
          isSmall ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
        } ${
          language === 'en'
            ? 'text-slate-950 font-bold'
            : 'text-slate-400 hover:text-slate-200 font-medium'
        }`}
      >
        {language === 'en' && (
          <motion.div
            layoutId="lang-active-pill"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-md shadow-cyan-500/30"
          />
        )}
        <span className="relative z-10 flex items-center gap-1">
          <span className="text-xs leading-none" role="img" aria-label="English">
            🇺🇸
          </span>
          <span>EN</span>
        </span>
      </button>
    </div>
  );
}
