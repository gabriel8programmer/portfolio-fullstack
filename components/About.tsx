'use client';

import React from 'react';
import Image from 'next/image';
import {
  Server,
  Database,
  Container,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Download,
  Mail,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function About() {
  const { t, language } = useLanguage();

  const pillarIcons = [
    {
      icon: Layers,
      color: 'from-cyan-500/20 to-blue-500/10',
      borderColor: 'group-hover:border-cyan-500/50',
      iconColor: 'text-cyan-400',
    },
    {
      icon: Server,
      color: 'from-indigo-500/20 to-purple-500/10',
      borderColor: 'group-hover:border-indigo-500/50',
      iconColor: 'text-indigo-400',
    },
    {
      icon: Database,
      color: 'from-blue-500/20 to-cyan-500/10',
      borderColor: 'group-hover:border-blue-500/50',
      iconColor: 'text-blue-400',
    },
    {
      icon: Sparkles,
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'group-hover:border-emerald-500/50',
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <section id="sobre" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {t.about.title} <span className="text-gradient-cyan">{t.about.titleHighlight}</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-base sm:text-lg">
            {t.about.subtitle}
          </p>
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Avatar & Photo Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              {/* Animated glowing border ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>

              {/* Photo Container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-2xl">
                <Image
                  src="/img/perfil.jpg"
                  alt="Gabriel Pereira"
                  fill
                  sizes="(max-width: 640px) 256px, 288px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Floating Specialty Tag */}
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-md shadow-xl flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-xs font-mono font-bold text-slate-200">
                  {t.about.specialtyTag}
                </span>
              </div>
            </div>

            {/* Quick Badges below image */}
            <div className="flex flex-wrap gap-2 justify-center mt-8 max-w-xs">
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-cyan-300">
                {t.about.badges.degree}
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-indigo-300">
                {t.about.badges.pro}
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-emerald-300">
                {t.about.badges.vibe}
              </span>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-slate-300">
            <div className="space-y-4 text-base sm:text-lg leading-relaxed">
              {t.about.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {t.about.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={
                  language === 'en'
                    ? '/curriculos/curriculo_en.html'
                    : 'https://drive.google.com/file/d/1dkyxCEjt9OFXgPSpN4K9pS0WJEV6sgMc/view?usp=sharing'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{t.about.buttons.downloadResume}</span>
              </a>

              <a
                href="#contato"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>{t.about.buttons.discuss}</span>
              </a>
            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.about.pillars.map((pillar, index) => {
            const config = pillarIcons[index] || pillarIcons[0];
            const IconComponent = config.icon;
            return (
              <div
                key={index}
                className={`group p-6 rounded-2xl bg-gradient-to-b ${config.color} bg-slate-900/40 border border-slate-800 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 ${config.borderColor}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center mb-4 ${config.iconColor}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
