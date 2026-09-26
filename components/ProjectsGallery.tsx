'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { initialPortfolioData } from '@/lib/default-data';
import {
  ExternalLink,
  Github,
  FolderGit2,
  Sparkles,
  X,
  Code,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { Modal } from '@/components/Modal';

export function ProjectsGallery({ initialProjects = initialPortfolioData.projects }: { initialProjects?: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (err) {
        // Fallback to initial
      }
    }
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((proj) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'featured') return proj.featured;
    return proj.category === selectedFilter;
  });

  return (
    <section id="projetos" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Aplicações & Produtos Digitais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Projetos <span className="text-gradient-cyan">Full-Stack & APIs</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-base sm:text-lg">
            Soluções completas desenvolvidas com arquitetura limpa, interfaces reativas, segurança e alta performance de ponta a ponta.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md gap-1">
            {[
              { id: 'all', label: 'Todos os Projetos' },
              { id: 'featured', label: '⭐ Destaques' },
              { id: 'fullstack', label: 'Full-Stack' },
              { id: 'backend', label: 'Back-end & APIs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col"
            >
              {/* Project Image Box */}
              <div
                onClick={() => setActiveModalProject(project)}
                className="relative h-52 w-full bg-slate-950 overflow-hidden cursor-pointer"
              >
                <Image
                  src={project.image || '/img/projects/todo-list.png'}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-cyan-300">
                    {project.category.toUpperCase()}
                  </span>

                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/50 backdrop-blur-md text-[11px] font-mono text-cyan-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      Destaque
                    </span>
                  )}
                </div>

                {/* Overlay hover prompt */}
                <div className="absolute inset-0 bg-cyan-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-xl bg-slate-900 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xl border border-cyan-500/40">
                    Ver Detalhes do Projeto <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-300 line-clamp-3 mb-5 leading-relaxed">
                  {project.tagline || project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                  {project.technologies.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-1 rounded-md bg-slate-800/40 text-[10px] font-mono text-cyan-400">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 hover:border-cyan-500/40 transition-all"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>Repositório</span>
                  </a>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Deploy</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="w-full py-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-cyan-500/30 transition-all"
                    >
                      <Code className="w-4 h-4" />
                      <span>Arquitetura</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            <p className="text-lg">Nenhum projeto encontrado nesta categoria.</p>
          </div>
        )}

      </div>

      {/* Project Details Modal */}
      <Modal
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
        maxWidth="max-w-2xl"
      >
        {activeModalProject && (
          <div>
            {/* Modal Image */}
            <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-slate-800">
              <Image
                src={activeModalProject.image || '/img/projects/todo-list.png'}
                alt={activeModalProject.title}
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Title & Category */}
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
                {activeModalProject.category.toUpperCase()}
              </span>
              {activeModalProject.featured && (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Projeto Destaque
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {activeModalProject.title}
            </h3>

            {/* Full description */}
            <div className="text-slate-300 text-sm sm:text-base space-y-4 mb-6 leading-relaxed">
              <p>{activeModalProject.description}</p>
            </div>

            {/* Technologies List */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Tecnologias Utilizadas
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links in modal */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>Ver Código no GitHub</span>
              </a>

              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Acessar Deploy</span>
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
