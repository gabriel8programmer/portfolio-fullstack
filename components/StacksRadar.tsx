'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StackItem, StackCategory } from '@/types';
import { initialPortfolioData } from '@/lib/default-data';
import { Search, Sparkles, Layers, Cpu, Database, Wrench, Globe, Filter } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function StacksRadar({ initialStacks = initialPortfolioData.stacks }: { initialStacks?: StackItem[] }) {
  const { t, language } = useLanguage();
  const [stacks, setStacks] = useState<StackItem[]>(initialStacks);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function loadStacks() {
      try {
        const res = await fetch('/api/stacks');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setStacks(data);
          }
        }
      } catch (err) {
        // use initial fallback
      }
    }
    loadStacks();
  }, []);

  const categories = [
    { id: 'all', label: t.stacks.categories.all, icon: Layers },
    { id: 'frontend', label: t.stacks.categories.frontend, icon: Sparkles },
    { id: 'backend', label: t.stacks.categories.backend, icon: Cpu },
    { id: 'languages', label: t.stacks.categories.languages, icon: Globe },
    { id: 'database', label: t.stacks.categories.database, icon: Database },
    { id: 'devops', label: t.stacks.categories.devops, icon: Wrench },
  ];

  const filteredStacks = stacks.filter((stack) => {
    const matchesCategory = selectedCategory === 'all' || stack.category === selectedCategory;
    const matchesSearch =
      stack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stack.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Especialista':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40';
      case 'Avançado':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-indigo-950/60 text-indigo-300 border-indigo-500/40';
    }
  };

  const getLevelLabel = (level: string) => {
    const badgeKey = level as keyof typeof t.stacks.levelBadges;
    return t.stacks.levelBadges[badgeKey] || level;
  };

  return (
    <section id="stacks" className="py-24 relative overflow-hidden bg-[#090d16]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.stacks.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {t.stacks.title} <span className="text-gradient-cyan">{t.stacks.titleHighlight}</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-base sm:text-lg">
            {t.stacks.subtitle}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md overflow-x-auto max-w-full w-full md:w-auto scrollbar-none">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const count = cat.id === 'all' ? stacks.length : stacks.filter((s) => s.category === cat.id).length;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.stacks.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </div>

        </div>

        {/* Stacks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredStacks.map((stack) => {
            const iconUrl = `https://cdn.simpleicons.org/${stack.iconSlug}/white`;

            return (
              <div
                key={stack.id}
                className="group relative p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col items-center text-center"
              >
                {/* Subtle top glow line */}
                <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/0 group-hover:via-cyan-400/50 to-transparent transition-all duration-500"></div>

                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 group-hover:bg-slate-800 border border-slate-700/60 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-inner">
                  <img
                    src={iconUrl}
                    alt={stack.name}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Name */}
                <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1.5">
                  {stack.name}
                </h4>

                {/* Level Badge */}
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getLevelBadgeClass(stack.level)}`}>
                  {getLevelLabel(stack.level)}
                </span>
              </div>
            );
          })}
        </div>

        {filteredStacks.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            <p className="text-lg">{t.stacks.emptySearch} &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-cyan-400 hover:underline text-sm font-medium"
            >
              {t.stacks.clearFilters}
            </button>
          </div>
        )}

        {/* Vibe Coding AI banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900/70 to-purple-950/40 border border-cyan-500/30 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-cyan-400">
                <Sparkles className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  {t.stacks.banner.title}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                    {t.stacks.banner.tag}
                  </span>
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {t.stacks.banner.description}
                </p>
              </div>
            </div>

            <a
              href="#projetos"
              className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all"
            >
              {language === 'en' ? 'View Projects' : 'Ver Resultados'}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
