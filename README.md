# 🚀 Portfólio Full-Stack Engineer & Vibe Coder — Gabriel Pereira

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Status-100%25_Modernizado-cyan?style=for-the-badge)]()

Portfólio interativo de alta performance construído para apresentar produtos digitais full-stack, aplicações web completas e soluções de ponta a ponta com a estética e cultura de **Vibe Coding**, animações interativas e um painel administrativo integrado para cadastro dinâmico de projetos e stacks.

---

## ✨ Destaques & Funcionalidades

- **🌌 Fundo Interativo com Física de Partículas:**
  - Canvas HTML5 com constelação de nós reativos ao cursor do mouse, impulsos de clique e orbes neon com efeito de profundidade.
- **⚡ Next.js 14 App Router & Tailwind CSS:**
  - Renderização híbrida (SSR + ISR + Client Components), tipagem estrita com TypeScript e layout 100% responsivo para todos os dispositivos.
- **⚙️ Backend & API REST Integrados:**
  - Endpoints REST para gerenciamento de projetos (`/api/projects`), stacks (`/api/stacks`), formulário de contato (`/api/contact`) e autenticação (`/api/auth`).
  - Persistência em JSON seguro (`data/portfolio-data.json`) que funciona em qualquer provedor (Vercel, Node, Docker).
- **🛡️ Painel Administrativo Exclusivo (`/admin`):**
  - Autenticação simples por senha/PIN (padrão: `admin123`).
  - Cadastro, edição e exclusão de **Projetos** (título, descrição, tecnologias, imagens, links de GitHub e deploy).
  - Cadastro, edição e exclusão de **Stacks** (nome, categoria, nível de domínio e ícones da SimpleIcons).
  - Caixa de entrada de **Mensagens Recebidas** pelo formulário de contato com resposta rápida por e-mail.
  - Botão de restauração rápida para valores padrões.
- **🐙 Integração Oficial com a API do GitHub:**
  - Busca em tempo real dos dados do perfil (`@gabriel8programmer`), contagem de repositórios, seguidores e cartões de repositórios recentes.
- **🔍 SEO Avançado & Performance:**
  - Metadados dinâmicos com Open Graph, Twitter Cards, `sitemap.xml`, `robots.txt` e microdados estruturados Schema.org (`Person`).

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Next.js 14, React 18, Tailwind CSS, Lucide React, Canvas API
- **Backend:** Next.js Route Handlers (RESTful APIs), Node.js
- **Banco de Dados / Armazenamento:** File-based JSON Database com seeding automático
- **Tipagem & Ferramental:** TypeScript, PostCSS, ESLint

---

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
- Node.js 18+ ou 20+
- npm ou yarn

### 2. Instalação das Dependências
```bash
npm install
```

### 3. Executando em Desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### 4. Compilando para Produção
```bash
npm run build
npm start
```

---

## 🔐 Acesso ao Painel Administrativo

1. Acesse a rota [`/admin`](http://localhost:3000/admin) diretamente ou clique no ícone de escudo no menu superior.
2. Insira a senha de acesso padrão:
   ```
   admin123
   ```
3. No painel, você poderá:
   - Cadastrar novos projetos e definir tags de tecnologias.
   - Adicionar novas tecnologias e stacks de vibe coding.
   - Ler mensagens enviadas através do formulário de contato.

---

## 📁 Estrutura do Projeto

```
portfolio-fullstack/
├── app/
│   ├── admin/page.tsx          # Painel administrativo completo
│   ├── api/                    # Backend REST API
│   │   ├── auth/route.ts       # Autenticação do painel
│   │   ├── contact/route.ts    # Envio e listagem de mensagens
│   │   ├── github/route.ts     # Integração com a API do GitHub
│   │   ├── projects/route.ts   # CRUD de projetos
│   │   ├── reset/route.ts      # Restauração dos dados
│   │   └── stacks/route.ts     # CRUD de stacks
│   ├── globals.css             # Estilos globais e efeitos neon/cyber
│   ├── layout.tsx              # Root Layout com SEO, OpenGraph e JSON-LD
│   ├── page.tsx                # Página inicial consolidada
│   ├── robots.ts               # Geração automática de robots.txt
│   └── sitemap.ts              # Geração automática de sitemap.xml
├── components/
│   ├── About.tsx               # Seção Sobre Mim & Pilares Técnicos
│   ├── ContactSection.tsx      # Seção e formulário de contato validado
│   ├── Footer.tsx              # Rodapé moderno
│   ├── GitHubSection.tsx       # Seção com dados em tempo real do GitHub
│   ├── Hero.tsx                # Hero com terminal interativo e badges
│   ├── InteractiveBackground.tsx # Canvas com física de partículas interativas
│   ├── Navbar.tsx              # Navbar flutuante em vidro com menu mobile
│   ├── ProjectsGallery.tsx     # Vitrine de projetos com modal de detalhes
│   └── StacksRadar.tsx         # Radar de stacks com busca e filtros
├── data/
│   └── portfolio-data.json     # Armazenamento persistente de dados
├── lib/
│   ├── db.ts                   # Camada de banco de dados e persistência
│   └── default-data.ts         # Dados iniciais de seed
├── public/
│   └── img/                    # Imagens de projetos, fotos e ícones
├── types/
│   └── index.ts                # Definições TypeScript
├── tailwind.config.ts          # Configuração Tailwind com tema cyber
└── tsconfig.json               # Configurações do TypeScript
```

---

## 👨‍💻 Autor

**Gabriel Pereira**  
- **GitHub:** [@gabriel8programmer](https://github.com/gabriel8programmer)  
- **LinkedIn:** [gabrielwebprogrammer](https://www.linkedin.com/in/gabrielwebprogrammer)  
- **E-mail:** [gabrielwebprogrammer@gmail.com](mailto:gabrielwebprogrammer@gmail.com)
