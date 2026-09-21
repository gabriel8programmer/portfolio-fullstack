'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Github,
  GitFork,
  Star,
  ExternalLink,
  BookOpen,
  Users,
  Activity,
  Code2,
  Sparkles,
} from 'lucide-react';

interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
}

export function GitHubSection() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const res = await fetch('/api/github');
        if (res.ok) {
          const data = await res.json();
          setProfile(data.profile);
          setRepos(data.repos || []);
        }
      } catch (err) {
        console.error('Erro ao buscar dados do GitHub', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGitHubData();
  }, []);

  const languageColors: Record<string, string> = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-400',
    HTML: 'bg-orange-500',
    CSS: 'bg-indigo-500',
    default: 'bg-cyan-500',
  };

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-[#090d16]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>Integração em Tempo Real</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Atividade no <span className="text-gradient-cyan">GitHub</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-base sm:text-lg">
            Acompanhe em tempo real meus commits, repositórios públicos e contribuições diretamente da API oficial do GitHub.
          </p>
        </div>

        {/* Profile Card & Stats */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                <Image
                  src={profile?.avatar_url || '/img/perfil.jpg'}
                  alt={profile?.name || 'Gabriel Pereira'}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                  {profile?.name || 'Gabriel Pereira'}
                  <span className="text-xs font-mono text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30">
                    @{profile?.login || 'gabriel8programmer'}
                  </span>
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-xl">
                  {profile?.bio || 'Engenheiro Full-Stack | Vibe Coding | Next.js | TypeScript | Node.js'}
                </p>
              </div>
            </div>

            {/* Metrics pills */}
            <div className="flex items-center gap-4">
              <div className="px-5 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center">
                <div className="text-2xl font-bold font-mono text-cyan-400">
                  {profile?.public_repos ?? 18}
                </div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                  Repositórios
                </div>
              </div>

              <div className="px-5 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center">
                <div className="text-2xl font-bold font-mono text-indigo-400">
                  {profile?.followers ?? 12}
                </div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                  Seguidores
                </div>
              </div>

              <a
                href={profile?.html_url || 'https://github.com/gabriel8programmer'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Perfil</span>
              </a>
            </div>

          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.slice(0, 6).map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 font-mono text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span className="truncate">{repo.name}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                </div>

                <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-6">
                  {repo.description || 'Repositório de código limpo com testes e boas práticas de arquitetura.'}
                </p>
              </div>

              {/* Repo Meta Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      languageColors[repo.language] || languageColors.default
                    }`}
                  ></span>
                  <span>{repo.language}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Link to see all repos on GitHub */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/gabriel8programmer?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 font-mono text-sm font-medium transition-all"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span>Ver todos os repositórios no GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
