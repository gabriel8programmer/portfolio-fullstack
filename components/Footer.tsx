'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Shield, Code2, ArrowUp, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950/90 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href={isAdmin ? '/' : '#home'} className="flex items-center gap-2.5 mb-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-mono font-bold text-lg text-white">
                Gabriel<span className="text-cyan-400">.dev</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm">
              {t.footer.bio}
            </p>
          </div>

          {/* Nav Quick Links */}
          {!isAdmin ? (
            <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-slate-400">
              <a href="#home" className="hover:text-cyan-400 transition-colors">{t.footer.nav.home}</a>
              <a href="#sobre" className="hover:text-cyan-400 transition-colors">{t.footer.nav.about}</a>
              <a href="#stacks" className="hover:text-cyan-400 transition-colors">{t.footer.nav.stacks}</a>
              <a href="#projetos" className="hover:text-cyan-400 transition-colors">{t.footer.nav.projects}</a>
              <a href="#github" className="hover:text-cyan-400 transition-colors">{t.footer.nav.github}</a>
              <a href="#contato" className="hover:text-cyan-400 transition-colors">{t.footer.nav.contact}</a>
              <Link href="/admin" className="text-cyan-400 hover:underline flex items-center gap-1">
                <Shield className="w-3 h-3" /> {t.footer.nav.admin}
              </Link>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-slate-400">
              <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" /> {t.footer.backToPortfolio}
              </Link>
            </div>
          )}

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gabriel8programmer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Gabriel Pereira"
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/gabrielwebprogrammer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Gabriel Pereira"
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              title={t.footer.scrollToTop}
              aria-label={t.footer.scrollToTop}
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            <span>{t.footer.builtWith}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
