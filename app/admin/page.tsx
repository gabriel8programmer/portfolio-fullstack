'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project, StackItem, ContactMessage, StackCategory } from '@/types';
import {
  Shield,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Github,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Lock,
  LogOut,
  RotateCcw,
  Sparkles,
  Layers,
  FolderGit2,
  Mail,
  Calendar,
  Save,
  X,
  Upload,
  ImageIcon,
  Loader2,
} from 'lucide-react';
import { Modal } from '@/components/Modal';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'projects' | 'stacks' | 'messages'>('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [stacks, setStacks] = useState<StackItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Project modal & form state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    tagline: '',
    description: '',
    category: 'backend' as Project['category'],
    image: '/img/projects/todo-list.png',
    githubUrl: 'https://github.com/gabriel8programmer/',
    liveUrl: '',
    technologies: 'Node.js, TypeScript, Docker',
    featured: false,
    order: 1,
  });

  // Stack modal & form state
  const [isStackModalOpen, setIsStackModalOpen] = useState(false);
  const [editingStackId, setEditingStackId] = useState<string | null>(null);
  const [stackForm, setStackForm] = useState({
    name: '',
    category: 'backend' as StackCategory,
    iconSlug: '',
    level: 'Avançado' as StackItem['level'],
    color: '#06b6d4',
    order: 1,
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao enviar imagem');
      }

      setProjectForm((prev) => ({ ...prev, image: data.url }));
      showToast('Imagem enviada e anexada ao projeto!');
    } catch (err: any) {
      showToast(err.message || 'Falha no upload da imagem', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Check auth from localStorage on load
  useEffect(() => {
    const token = localStorage.getItem('portfolio_admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchAdminData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Senha incorreta');
      }

      localStorage.setItem('portfolio_admin_token', data.token || 'auth');
      setIsAuthenticated(true);
      fetchAdminData();
      showToast('Bem-vindo ao Painel Administrativo!');
    } catch (err: any) {
      setAuthError(err.message || 'Erro ao autenticar');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setIsAuthenticated(false);
  };

  const fetchAdminData = async () => {
    setLoadingData(true);
    try {
      const [projRes, stackRes, msgRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/stacks'),
        fetch('/api/contact'),
      ]);

      if (projRes.ok) setProjects(await projRes.json());
      if (stackRes.ok) setStacks(await stackRes.json());
      if (msgRes.ok) setMessages(await msgRes.json());
    } catch (err) {
      showToast('Erro ao carregar dados do painel', 'error');
    } finally {
      setLoadingData(false);
    }
  };

  // Project operations
  const handleOpenProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingProjectId(proj.id);
      setProjectForm({
        title: proj.title,
        tagline: proj.tagline || proj.title,
        description: proj.description,
        category: proj.category,
        image: proj.image,
        githubUrl: proj.githubUrl,
        liveUrl: proj.liveUrl || '',
        technologies: proj.technologies.join(', '),
        featured: proj.featured,
        order: proj.order || 1,
      });
    } else {
      setEditingProjectId(null);
      setProjectForm({
        title: '',
        tagline: '',
        description: '',
        category: 'backend',
        image: '/img/projects/todo-list.png',
        githubUrl: 'https://github.com/gabriel8programmer/',
        liveUrl: '',
        technologies: 'Node.js, TypeScript, PostgreSQL, Docker',
        featured: false,
        order: projects.length + 1,
      });
    }
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      technologies: projectForm.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      let res;
      if (editingProjectId) {
        res = await fetch(`/api/projects/${editingProjectId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error('Falha ao salvar projeto');

      showToast(editingProjectId ? 'Projeto atualizado com sucesso!' : 'Projeto criado com sucesso!');
      setIsProjectModalOpen(false);
      fetchAdminData();
    } catch (err: any) {
      showToast(err.message || 'Erro ao salvar projeto', 'error');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Deseja realmente remover o projeto "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir projeto');

      showToast(`Projeto "${title}" excluído.`);
      fetchAdminData();
    } catch (err: any) {
      showToast(err.message || 'Erro ao excluir projeto', 'error');
    }
  };

  // Stack operations
  const handleOpenStackModal = (stk?: StackItem) => {
    if (stk) {
      setEditingStackId(stk.id);
      setStackForm({
        name: stk.name,
        category: stk.category,
        iconSlug: stk.iconSlug,
        level: stk.level,
        color: stk.color || '#06b6d4',
        order: stk.order || 1,
      });
    } else {
      setEditingStackId(null);
      setStackForm({
        name: '',
        category: 'backend',
        iconSlug: '',
        level: 'Avançado',
        color: '#06b6d4',
        order: stacks.length + 1,
      });
    }
    setIsStackModalOpen(true);
  };

  const handleSaveStack = async (e: React.FormEvent) => {
    e.preventDefault();
    const iconSlug = stackForm.iconSlug || stackForm.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const payload = { ...stackForm, iconSlug };

    try {
      let res;
      if (editingStackId) {
        res = await fetch(`/api/stacks/${editingStackId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/stacks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error('Falha ao salvar stack');

      showToast(editingStackId ? 'Stack atualizada!' : 'Nova stack adicionada!');
      setIsStackModalOpen(false);
      fetchAdminData();
    } catch (err: any) {
      showToast(err.message || 'Erro ao salvar stack', 'error');
    }
  };

  const handleDeleteStack = async (id: string, name: string) => {
    if (!confirm(`Deseja remover a stack "${name}"?`)) return;

    try {
      const res = await fetch(`/api/stacks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao remover stack');

      showToast(`Stack "${name}" removida.`);
      fetchAdminData();
    } catch (err: any) {
      showToast(err.message || 'Erro ao remover stack', 'error');
    }
  };

  // Delete message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Deseja excluir esta mensagem?')) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao remover');
      showToast('Mensagem excluída.');
      fetchAdminData();
    } catch (err: any) {
      showToast(err.message || 'Erro', 'error');
    }
  };

  // Reset data to defaults
  const handleResetData = async () => {
    if (!confirm('Atenção: isto restaurará os projetos e stacks para o estado original padrão. Deseja continuar?')) return;
    try {
      const res = await fetch('/api/reset', { method: 'POST' });
      if (!res.ok) throw new Error('Erro ao restaurar');
      showToast('Dados restaurados com sucesso!');
      fetchAdminData();
    } catch (err: any) {
      showToast(err.message || 'Erro ao restaurar', 'error');
    }
  };

  // Login Screen View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl relative">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[2px] shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-2">
            Painel Administrativo
          </h2>
          <p className="text-xs text-center text-slate-400 mb-6">
            Acesso restrito para gerenciar projetos, stacks e mensagens
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Senha / PIN de Acesso
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Digite a senha de administrador..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
            >
              {authLoading ? 'Verificando...' : 'Entrar no Painel'}
            </button>

            <div className="pt-4 border-t border-slate-800 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Voltar ao portfólio público
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard View
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl border text-sm font-medium shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-300 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-200'
              : 'bg-red-950/90 border-red-500/60 text-red-200'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Voltar ao site"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              Painel de Gestão <span className="text-gradient-cyan">Gabriel.dev</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Adicione, edite ou remova stacks e projetos em tempo real no seu portfólio.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetData}
            title="Restaurar dados originais"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Restaurar Padrões</span>
          </button>

          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-cyan-950/50 hover:bg-cyan-900/50 border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ver Portfólio</span>
          </Link>

          <button
            onClick={handleLogout}
            title="Sair do painel"
            className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/50 border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overview Stat Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Projetos Ativos</div>
            <div className="text-3xl font-bold font-mono text-cyan-400 mt-1">{projects.length}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <FolderGit2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Stacks Cadastradas</div>
            <div className="text-3xl font-bold font-mono text-indigo-400 mt-1">{stacks.length}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Mensagens Recebidas</div>
            <div className="text-3xl font-bold font-mono text-emerald-400 mt-1">{messages.length}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Mail className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 mb-8 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Projetos ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('stacks')}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
            activeTab === 'stacks'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Minhas Stacks ({stacks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
            activeTab === 'messages'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Mensagens ({messages.length})</span>
        </button>
      </div>

      {/* TAB 1: PROJECTS */}
      {activeTab === 'projects' && (
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-white">Gerenciar Projetos</h3>
            <button
              onClick={() => handleOpenProjectModal()}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Projeto</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-950 mb-4">
                    <Image
                      src={proj.image || '/img/projects/todo-list.png'}
                      alt={proj.title}
                      fill
                      className="object-cover object-top"
                    />
                    {proj.featured && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono">
                        ★ Destaque
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {proj.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {proj.tagline || proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {proj.technologies.slice(0, 4).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
                        {t}
                      </span>
                    ))}
                    {proj.technologies.length > 4 && (
                      <span className="text-[10px] font-mono text-cyan-400">
                        +{proj.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => handleOpenProjectModal(proj)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 text-xs transition-colors"
                    title="Editar projeto"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(proj.id, proj.title)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-red-950/60 text-slate-300 hover:text-red-400 text-xs transition-colors"
                    title="Remover projeto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: STACKS */}
      {activeTab === 'stacks' && (
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-white">Gerenciar Stacks & Habilidades</h3>
            <button
              onClick={() => handleOpenStackModal()}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Stack</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {stacks.map((stk) => (
              <div
                key={stk.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center justify-between relative group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-2">
                  <img
                    src={`https://cdn.simpleicons.org/${stk.iconSlug}/white`}
                    alt={stk.name}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="font-semibold text-xs text-white mb-1">{stk.name}</div>
                <div className="text-[10px] font-mono text-slate-400 mb-1">{stk.category}</div>
                <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 mb-3">
                  {stk.level}
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800 w-full justify-center">
                  <button
                    onClick={() => handleOpenStackModal(stk)}
                    className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStack(stk.id, stk.name)}
                    className="p-1.5 rounded-md hover:bg-red-950 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CONTACT MESSAGES */}
      {activeTab === 'messages' && (
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Mensagens Recebidas do Site</h3>

          {messages.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400">
              <Mail className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p>Nenhuma mensagem recebida ainda.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row items-start justify-between gap-4"
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-white text-base">{msg.name}</h4>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                        {msg.email}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {msg.message}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 pt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(msg.createdAt).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={`mailto:${msg.email}?subject=Resposta:%20Contato%20Gabriel%20Pereira`}
                      className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Responder</span>
                    </a>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 transition-colors"
                      title="Excluir mensagem"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PROJECT MODAL */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title={editingProjectId ? 'Editar Projeto' : 'Adicionar Novo Projeto'}
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSaveProject} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Título do Projeto</label>
            <input
              type="text"
              required
              value={projectForm.title}
              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
              placeholder="Ex: Auth-Service-API"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Tagline / Resumo Curto</label>
            <input
              type="text"
              required
              value={projectForm.tagline}
              onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
              placeholder="Ex: Microsserviço de autenticação com Fastify e Redis"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Descrição Completa</label>
            <textarea
              rows={3}
              required
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              placeholder="Detalhes sobre arquitetura, regras de negócio e diferenciais técnicos..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Categoria</label>
            <select
              value={projectForm.category}
              onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="backend">Back-end</option>
              <option value="api">API RESTful</option>
              <option value="fullstack">Fullstack</option>
              <option value="database">Banco de Dados</option>
              <option value="devops">DevOps</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
              Imagem do Projeto (Upload Local ou URL)
            </label>
            
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0 flex items-center justify-center">
                {projectForm.image ? (
                  <Image
                    src={projectForm.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-600" />
                )}
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold flex items-center gap-2 transition-all">
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Fazer Upload de Imagem</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {projectForm.image && (
                    <button
                      type="button"
                      onClick={() => setProjectForm({ ...projectForm, image: '' })}
                      className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 text-xs transition-colors"
                      title="Limpar imagem"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  placeholder="Ou digite o caminho (/img/... ou URL externa)"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Tecnologias (separadas por vírgula)</label>
            <input
              type="text"
              required
              value={projectForm.technologies}
              onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
              placeholder="Node.js, TypeScript, PostgreSQL, Docker, Jest"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">URL do GitHub</label>
              <input
                type="url"
                required
                value={projectForm.githubUrl}
                onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                placeholder="https://github.com/gabriel8programmer/..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">URL do Deploy (opcional)</label>
              <input
                type="url"
                value={projectForm.liveUrl}
                onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={projectForm.featured}
              onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-900 border-slate-700"
            />
            <label htmlFor="featured" className="text-sm text-slate-300 cursor-pointer">
              Destacar este projeto na página inicial
            </label>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsProjectModalOpen(false)}
              className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs font-mono transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all"
            >
              Salvar Projeto
            </button>
          </div>
        </form>
      </Modal>

      {/* STACK MODAL */}
      <Modal
        isOpen={isStackModalOpen}
        onClose={() => setIsStackModalOpen(false)}
        title={editingStackId ? 'Editar Stack' : 'Adicionar Nova Stack'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveStack} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Nome da Stack</label>
            <input
              type="text"
              required
              value={stackForm.name}
              onChange={(e) => setStackForm({ ...stackForm, name: e.target.value })}
              placeholder="Ex: NestJS, GraphQL, Go"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Categoria</label>
              <select
                value={stackForm.category}
                onChange={(e) => setStackForm({ ...stackForm, category: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="backend">Back-end</option>
                <option value="languages">Linguagens</option>
                <option value="database">Banco de Dados</option>
                <option value="devops">DevOps & Tools</option>
                <option value="frontend">Frontend & Vibe</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Nível de Domínio</label>
              <select
                value={stackForm.level}
                onChange={(e) => setStackForm({ ...stackForm, level: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Especialista">Especialista</option>
                <option value="Avançado">Avançado</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Iniciante">Iniciante</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
              Slug do Ícone (SimpleIcons)
            </label>
            <input
              type="text"
              value={stackForm.iconSlug}
              onChange={(e) => setStackForm({ ...stackForm, iconSlug: e.target.value })}
              placeholder="Ex: graphql, go, docker (opcional)"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[10px] font-mono text-slate-500 mt-1">
              Se vazio, usará o nome formatado automaticamente.
            </p>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsStackModalOpen(false)}
              className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs font-mono transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all"
            >
              Salvar Stack
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
