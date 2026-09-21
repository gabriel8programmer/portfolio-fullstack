'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Download,
  Terminal,
  Sparkles,
  Database,
  Cpu,
  Layers,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

const roles = [
  'Engenheiro de Software Full-Stack',
  'Especialista em Vibe Coding & IA',
  'Arquiteto Next.js, React & Node.js',
  'Construção de Produtos End-to-End',
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const codeSnippet = `// ⚡ Vibe Coding: Full-Stack Server Action with Next.js & AI
'use server';
import { db } from '@/lib/db';
import { generateInsights } from '@/lib/ai';

export async function createProjectAction(data: ProjectInput) {
  const validated = projectSchema.parse(data);
  const project = await db.project.create({ data: validated });
  const aiInsights = await generateInsights(project);
  return { success: true, project, aiInsights };
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md shadow-sm shadow-cyan-500/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span>Disponível para Projetos Full-Stack & Vibe Coding</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </div>

            {/* Main Greeting and Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Olá, eu sou{' '}
              <span className="text-gradient-cyan block mt-1 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                Gabriel Pereira
              </span>
            </h1>

            {/* Dynamic Rotating Subtitle */}
            <div className="h-9 mb-6">
              <span className="text-lg sm:text-xl md:text-2xl font-mono text-cyan-300/90 font-medium">
                {`> `}
                <span className="border-b-2 border-cyan-400 pb-0.5">
                  {roles[roleIndex]}
                </span>
                <span className="animate-pulse">_</span>
              </span>
            </div>

            {/* Elevator Pitch */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
              <strong className="text-white">Engenheiro de Software Full-Stack</strong> pioneiro na cultura de <span className="text-cyan-300 font-medium">Vibe Coding</span>. Desenvolvo produtos digitais completos de ponta a ponta — unindo interfaces modernas, fluidas e reativas em <strong className="text-white">Next.js e React</strong> a arquiteturas resilientes e de alta velocidade com <strong className="text-white">Node.js, TypeScript, PostgreSQL e Docker</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <a
                href="#projetos"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Ver Meus Projetos</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://drive.google.com/file/d/1dkyxCEjt9OFXgPSpN4K9pS0WJEV6sgMc/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Baixar Currículo</span>
              </a>

              <a
                href="#contato"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-950/60 hover:bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-sm font-medium flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Entrar em Contato</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-10 mt-6 border-t border-slate-800/80 w-full max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">Full-Stack</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">End-to-End</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">Vibe Coding</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">Fluxo Ágil + IA</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">100%</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">Tipado & Testado</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-lg group">
              {/* Outer decorative glow aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-35 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

              {/* Terminal Container */}
              <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Terminal Header */}
                <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      action.fullstack.ts
                    </span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    title="Copiar código"
                    aria-label="Copiar código"
                    className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Code Window */}
                <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto">
                  <pre className="text-slate-300">
                    <span className="text-slate-500">{`// ⚡ Vibe Coding: Full-Stack Action & AI`}</span>
                    {'\n'}
                    <span className="text-cyan-300">&apos;use server&apos;</span>;{'\n'}
                    <span className="text-purple-400">import</span> {'{ db }'} <span className="text-purple-400">from</span> <span className="text-emerald-300">&apos;@/lib/db&apos;</span>;{'\n'}
                    <span className="text-purple-400">import</span> {'{ generateInsights }'} <span className="text-purple-400">from</span> <span className="text-emerald-300">&apos;@/lib/ai&apos;</span>;{'\n\n'}
                    <span className="text-purple-400">export async function</span> <span className="text-blue-400">createProjectAction</span>(data) {'{'}{'\n'}
                    {'  '}<span className="text-cyan-400">const</span> validated = projectSchema.<span className="text-blue-400">parse</span>(data);{'\n'}
                    {'  '}<span className="text-cyan-400">const</span> project = <span className="text-purple-400">await</span> db.project.<span className="text-blue-400">create</span>({'{'} data: validated {'}'});{'\n'}
                    {'  '}<span className="text-cyan-400">const</span> ai = <span className="text-purple-400">await</span> <span className="text-blue-400">generateInsights</span>(project);{'\n'}
                    {'  '}<span className="text-purple-400">return</span> {'{'} success: <span className="text-emerald-300">true</span>, project, ai {'}'};{'\n'}
                    {'}'}
                  </pre>
                </div>

                {/* Terminal Footer Status Bar */}
                <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Cpu className="w-3 h-3" /> Next.js 14
                    </span>
                    <span className="flex items-center gap-1 text-indigo-400">
                      <Database className="w-3 h-3" /> TypeScript + AI
                    </span>
                  </div>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Full-Stack Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
