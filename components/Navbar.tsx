'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Shield, Github, Linkedin, ExternalLink, Code2 } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'sobre', 'stacks', 'projetos', 'github', 'contato'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#home', id: 'home' },
    { label: 'Sobre', href: '#sobre', id: 'sobre' },
    { label: 'Stacks & Vibe', href: '#stacks', id: 'stacks' },
    { label: 'Projetos', href: '#projetos', id: 'projetos' },
    { label: 'GitHub Live', href: '#github', id: 'github' },
    { label: 'Contato', href: '#contato', id: 'contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#090d16]/85 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-black/40'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-[2px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-lg tracking-wider text-slate-100 flex items-center gap-1.5">
              Gabriel<span className="text-cyan-400">.dev</span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">
              Full-Stack & Vibe Coding
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === link.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action icons (Social + Admin portal) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/gabriel8programmer"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub de Gabriel"
            aria-label="Perfil no GitHub"
            className="w-9 h-9 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/gabrielwebprogrammer"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn de Gabriel"
            aria-label="Perfil no LinkedIn"
            className="w-9 h-9 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <Link
            href="/admin"
            title="Painel Administrativo"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all group"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/admin"
            title="Painel Administrativo"
            aria-label="Painel Administrativo"
            className="w-9 h-9 rounded-lg bg-slate-900/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400"
          >
            <Shield className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fechar Menu' : 'Abrir Menu'}
            className="w-10 h-10 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-200 hover:text-cyan-400 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bg-[#090d16]/95 backdrop-blur-xl border-b border-cyan-500/20 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-cyan-400'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex gap-3">
              <a
                href="https://github.com/gabriel8programmer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/gabrielwebprogrammer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-sm font-mono text-cyan-300 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Painel Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
