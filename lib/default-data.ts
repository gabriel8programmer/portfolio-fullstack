import { PortfolioData } from '@/types';

export const initialPortfolioData: PortfolioData = {
  projects: [
    {
      id: 'rentals-api',
      title: 'Rentals Platform & API',
      tagline: 'Plataforma de reservas e locações de alto desempenho com Fastify e PostgreSQL',
      description: 'Aplicação desenvolvida para gerenciar fluxos complexos de agendamentos e locações em tempo real. Implementa Fastify para máxima taxa de vazão (throughput), validação por JSON Schema, Prisma ORM conectado ao PostgreSQL, suíte de testes com Jest e conteinerização em Docker.',
      category: 'fullstack',
      image: '/img/projects/rentals-api.png',
      githubUrl: 'https://github.com/gabriel8programmer/rentals-api',
      liveUrl: '',
      technologies: ['Next.js', 'React', 'TypeScript', 'Fastify', 'PostgreSQL', 'Prisma', 'Docker', 'Swagger'],
      featured: true,
      order: 1,
      createdAt: '2025-01-15',
    },
    {
      id: 'leads-api',
      title: 'Leads CRM Platform',
      tagline: 'Sistema de captura, qualificação e gestão de leads corporativos',
      description: 'Solução completa voltada para CRM e pipeline comercial de prospecção. Desenvolvida em TypeScript com Express e Next.js, integrando Prisma ORM com PostgreSQL, documentação OpenAPI interativa no Swagger UI, validações robustas e ambiente de desenvolvimento modularizado com Docker Compose.',
      category: 'fullstack',
      image: '/img/projects/leads-api.png',
      githubUrl: 'https://github.com/gabriel8programmer/leads-api',
      liveUrl: '',
      technologies: ['TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'Docker', 'Swagger', 'Tailwind CSS'],
      featured: true,
      order: 2,
      createdAt: '2024-11-20',
    },
    {
      id: 'todo-list-api',
      title: 'Todo List Hub',
      tagline: 'Gerenciador avançado de tarefas com autenticação JWT e MongoDB',
      description: 'Aplicação para controle produtivo de tarefas com controle de acesso baseado em roles (RBAC) e autenticação JWT. Persistência de dados NoSQL com MongoDB e Mongoose, documentação viva com Swagger, testes automatizados e deploy conteinerizado.',
      category: 'fullstack',
      image: '/img/projects/todo-list.png',
      githubUrl: 'https://github.com/gabriel8programmer/todo-list-api',
      liveUrl: '',
      technologies: ['Node.js', 'TypeScript', 'Express', 'MongoDB', 'Mongoose', 'Docker', 'Swagger', 'Jest'],
      featured: true,
      order: 3,
      createdAt: '2024-09-10',
    },
  ],
  stacks: [
    // Frontend & Vibe
    { id: 'nextjs', name: 'Next.js 14', category: 'frontend', iconSlug: 'nextdotjs', level: 'Especialista', color: '#ffffff', order: 1 },
    { id: 'react', name: 'React', category: 'frontend', iconSlug: 'react', level: 'Avançado', color: '#61DAFB', order: 2 },
    { id: 'tailwindcss', name: 'Tailwind CSS', category: 'frontend', iconSlug: 'tailwindcss', level: 'Especialista', color: '#06B6D4', order: 3 },
    { id: 'vibe-code', name: 'Vibe Coding & AI Tooling', category: 'frontend', iconSlug: 'openai', level: 'Especialista', color: '#10A37F', order: 4 },

    // Languages
    { id: 'typescript', name: 'TypeScript', category: 'languages', iconSlug: 'typescript', level: 'Avançado', color: '#3178C6', order: 5 },
    { id: 'javascript', name: 'JavaScript (ES6+)', category: 'languages', iconSlug: 'javascript', level: 'Avançado', color: '#F7DF1E', order: 6 },
    { id: 'sql', name: 'SQL', category: 'languages', iconSlug: 'postgresql', level: 'Avançado', color: '#4169E1', order: 7 },
    
    // Backend
    { id: 'nodejs', name: 'Node.js', category: 'backend', iconSlug: 'nodedotjs', level: 'Avançado', color: '#5FA04E', order: 8 },
    { id: 'express', name: 'Express.js', category: 'backend', iconSlug: 'express', level: 'Avançado', color: '#ffffff', order: 9 },
    { id: 'fastify', name: 'Fastify', category: 'backend', iconSlug: 'fastify', level: 'Avançado', color: '#000000', order: 10 },
    { id: 'nestjs', name: 'NestJS', category: 'backend', iconSlug: 'nestjs', level: 'Intermediário', color: '#E0234E', order: 11 },
    { id: 'rest-api', name: 'APIs RESTful', category: 'backend', iconSlug: 'postman', level: 'Especialista', color: '#FF6C37', order: 12 },
    
    // Database
    { id: 'postgresql', name: 'PostgreSQL', category: 'database', iconSlug: 'postgresql', level: 'Avançado', color: '#4169E1', order: 13 },
    { id: 'mongodb', name: 'MongoDB', category: 'database', iconSlug: 'mongodb', level: 'Avançado', color: '#47A248', order: 14 },
    { id: 'prisma', name: 'Prisma ORM', category: 'database', iconSlug: 'prisma', level: 'Avançado', color: '#2D3748', order: 15 },
    { id: 'mysql', name: 'MySQL', category: 'database', iconSlug: 'mysql', level: 'Intermediário', color: '#4479A1', order: 16 },
    { id: 'redis', name: 'Redis', category: 'database', iconSlug: 'redis', level: 'Intermediário', color: '#DC382D', order: 17 },
    { id: 'mongoose', name: 'Mongoose', category: 'database', iconSlug: 'mongoose', level: 'Avançado', color: '#880000', order: 18 },
    { id: 'sequelize', name: 'Sequelize', category: 'database', iconSlug: 'sequelize', level: 'Intermediário', color: '#52B0E7', order: 19 },
    
    // DevOps & Tools
    { id: 'docker', name: 'Docker & Compose', category: 'devops', iconSlug: 'docker', level: 'Avançado', color: '#2496ED', order: 20 },
    { id: 'git', name: 'Git', category: 'devops', iconSlug: 'git', level: 'Avançado', color: '#F05032', order: 21 },
    { id: 'github', name: 'GitHub', category: 'devops', iconSlug: 'github', level: 'Avançado', color: '#ffffff', order: 22 },
    { id: 'swagger', name: 'Swagger / OpenAPI', category: 'devops', iconSlug: 'swagger', level: 'Avançado', color: '#85EA2D', order: 23 },
    { id: 'jest', name: 'Jest', category: 'devops', iconSlug: 'jest', level: 'Intermediário', color: '#C21325', order: 24 },
    { id: 'vitest', name: 'Vitest', category: 'devops', iconSlug: 'vitest', level: 'Intermediário', color: '#FCC72B', order: 25 },
    { id: 'postman', name: 'Postman', category: 'devops', iconSlug: 'postman', level: 'Avançado', color: '#FF6C37', order: 26 },
    { id: 'insomnia', name: 'Insomnia', category: 'devops', iconSlug: 'insomnia', level: 'Avançado', color: '#5849BE', order: 27 },
  ],
  messages: [],
};
