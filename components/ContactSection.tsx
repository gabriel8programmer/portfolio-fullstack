'use client';

import React, { useState } from 'react';
import {
  Mail,
  Send,
  Linkedin,
  Github,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail = 'gabrielwebprogrammer@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Falha ao enviar mensagem');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Erro inesperado. Tente novamente.');
    }
  };

  return (
    <section id="contato" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Vamos Conversar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Entre em <span className="text-gradient-cyan">Contato</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-base sm:text-lg">
            Tem uma oportunidade profissional, projeto ou dúvida técnica? Envie uma mensagem e vamos construir algo incrível juntos!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                Conecte-se comigo
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Estou aberto para oportunidades como engenheiro full-stack, projetos inovadores com vibe coding e soluções digitais de alto impacto. Respondo com rapidez!
              </p>

              {/* Direct email card with copy button */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex items-center justify-between gap-3 group hover:border-cyan-500/40 transition-all">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">E-mail Profissional</div>
                    <div className="text-sm font-semibold text-slate-200 truncate">{contactEmail}</div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-all flex-shrink-0"
                  title="Copiar e-mail"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/gabrielwebprogrammer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex items-center justify-between gap-3 group hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">LinkedIn</div>
                    <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      in/gabrielwebprogrammer
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">Visitar &rarr;</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/gabriel8programmer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex items-center justify-between gap-3 group hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">GitHub</div>
                    <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      github.com/gabriel8programmer
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">Visitar &rarr;</span>
              </a>
            </div>

            {/* Availability Pill */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div className="text-xs text-emerald-300 leading-relaxed font-mono">
                Horário de resposta habitual: menos de 24 horas. Fuso horário de Brasília (UTC-3).
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-2xl relative">
              <h3 className="text-2xl font-bold text-white mb-2">
                Envie uma mensagem direta
              </h3>
              <p className="text-sm text-slate-400 mb-8">
                Preencha os dados abaixo. Sua mensagem será entregue imediatamente no meu painel administrativo.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ex: Ana Silva"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Seu E-mail Profissional
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Ex: ana.silva@empresa.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Mensagem / Proposta
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Olá Gabriel! Gostaria de conversar sobre uma oportunidade de trabalho / projeto..."
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                  />
                </div>

                {status === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 text-sm flex items-center gap-3 animate-in fade-in">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                    <span>Mensagem enviada com sucesso! Obrigado pelo contato, responderei em breve.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-sm flex items-center gap-3 animate-in fade-in">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Enviar Mensagem</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
