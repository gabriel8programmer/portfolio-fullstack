export type Language = 'pt' | 'en';

export const translations = {
  pt: {
    navbar: {
      brandSub: 'Full-Stack & Vibe Coding',
      adminSub: 'Painel Administrativo',
      nav: {
        home: 'Início',
        about: 'Sobre',
        stacks: 'Stacks & Vibe',
        projects: 'Projetos',
        github: 'GitHub Live',
        contact: 'Contato',
      },
      adminButton: 'Admin',
      backToPortfolio: 'Voltar ao Portfólio',
      openMenu: 'Abrir Menu',
      closeMenu: 'Fechar Menu',
      switchLang: 'Mudar para Inglês',
    },
    hero: {
      statusBadge: 'Disponível para Projetos Full-Stack & Vibe Coding',
      greeting: 'Olá, eu sou',
      roles: [
        'Engenheiro de Software Full-Stack',
        'Especialista em Vibe Coding & IA',
        'Arquiteto Next.js, React & Node.js',
        'Construção de Produtos End-to-End',
      ],
      elevatorPitch: {
        role: 'Engenheiro de Software Full-Stack',
        vibeCoding: 'Vibe Coding',
        descriptionPart1: ' pioneiro na cultura de ',
        descriptionPart2: '. Desenvolvo produtos digitais completos de ponta a ponta — unindo interfaces modernas, fluidas e reativas em ',
        frontendTech: 'Next.js e React',
        descriptionPart3: ' a arquiteturas resilientes e de alta velocidade com ',
        backendTech: 'Node.js, TypeScript, PostgreSQL e Docker',
        descriptionPart4: '.',
      },
      buttons: {
        viewProjects: 'Ver Meus Projetos',
        downloadResume: 'Baixar Currículo',
        contactMe: 'Entrar em Contato',
      },
      metrics: {
        fullstack: {
          title: 'Full-Stack',
          sub: 'End-to-End',
        },
        vibeCoding: {
          title: 'Vibe Coding',
          sub: 'Fluxo Ágil + IA',
        },
        testing: {
          title: '100%',
          sub: 'Tipado & Testado',
        },
      },
      terminal: {
        filename: 'action.fullstack.ts',
        copy: 'Copiar código',
        copied: 'Copiado!',
        comment: '// ⚡ Vibe Coding: Full-Stack Action & IA',
        status: 'Full-Stack Ready',
      },
    },
    about: {
      badge: 'Engenharia Full-Stack & Vibe Coding',
      title: 'Sobre',
      titleHighlight: 'Mim',
      subtitle:
        'Unindo formação técnica sólida em sistemas, desenvolvimento full-stack end-to-end e fluxos modernos de vibe coding para criar produtos digitais completos.',
      specialtyTag: 'Full-Stack Engineer',
      badges: {
        degree: '🎓 ADS Graduado',
        pro: '🚀 Full-Stack Pro',
        vibe: '⚡ Vibe Coder',
      },
      bio: [
        'Sou graduado em Análise e Desenvolvimento de Sistemas com especialização Full-Stack pela OneBitCode. Minha proposta de valor é entregar produtos digitais completos de ponta a ponta: do design refinado e responsivo no frontend à arquitetura resiliente no backend.',
        'Domino todo o ciclo de engenharia de software moderno com Next.js, React, Tailwind CSS, TypeScript, Node.js, Fastify, PostgreSQL, MongoDB, Prisma ORM e Docker.',
        'Adoto intensamente a cultura de Vibe Coding: aproveito o melhor dos modelos de Inteligência Artificial para acelerar o desenvolvimento, prototipar em tempo recorde e focar no que realmente importa — arquitetura limpa, experiência de usuário impecável e regras de negócio à prova de falhas.',
      ],
      highlights: [
        'Desenvolvimento Full-Stack End-to-End',
        'Interfaces Reativas em Next.js & React',
        'APIs RESTful de Alta Vazão em Node.js',
        'Modelagem PostgreSQL, MongoDB & Prisma',
        'Fluxos de Vibe Coding com IA Generativa',
        'Conteinerização Completa com Docker',
      ],
      buttons: {
        downloadResume: 'Download do Currículo',
        discuss: 'Conversar sobre Oportunidades',
      },
      pillars: [
        {
          title: 'Front-end Moderno & UI Reativa',
          description:
            'Criação de interfaces elegantes e interativas com Next.js 14, React e Tailwind CSS, focando em performance, acessibilidade e microinterações fluidas.',
        },
        {
          title: 'Back-end Robusto & APIs RESTful',
          description:
            'Construção de arquiteturas desacopladas utilizando Node.js, Fastify e Express com validação rigorosa de esquemas e controle de autenticação JWT.',
        },
        {
          title: 'Bancos de Dados & DevOps',
          description:
            'Modelagem relacional e documental com PostgreSQL, MongoDB e Prisma ORM, associada à conteinerização em Docker para paridade de ambientes.',
        },
        {
          title: 'Vibe Coding & Engenharia com IA',
          description:
            'Adoção de fluxos ágeis aumentados por Inteligência Artificial para prototipagem rápida, automação de testes e entrega de valor com alta velocidade.',
        },
      ],
    },
    stacks: {
      badge: 'Ecossistema Full-Stack & Vibe Coding',
      title: 'Stacks &',
      titleHighlight: 'Habilidades Full-Stack',
      subtitle:
        'Tecnologias que domino para criar experiências completas de software — desde o design do frontend até a persistência e escalabilidade no backend.',
      categories: {
        all: 'Todas as Stacks',
        frontend: 'Frontend & Vibe',
        backend: 'Back-end & APIs',
        languages: 'Linguagens',
        database: 'Banco de Dados',
        devops: 'DevOps & Tooling',
      },
      searchPlaceholder: 'Buscar tecnologia...',
      emptySearch: 'Nenhuma stack encontrada para a busca',
      clearFilters: 'Limpar filtros',
      levelBadges: {
        Iniciante: 'Iniciante',
        Intermediário: 'Intermediário',
        Avançado: 'Avançado',
        Especialista: 'Especialista',
      },
      banner: {
        title: 'Vibe Coding & AI-Driven Workflow',
        tag: 'High Velocity',
        description:
          'Adoto ferramentas modernas de Inteligência Artificial combinadas com engenharia rigorosa de software para acelerar prototipagem, automação de testes e entrega contínua com máxima qualidade e assertividade.',
      },
    },
    projects: {
      badge: 'Aplicações & Produtos Digitais',
      title: 'Projetos',
      titleHighlight: 'Full-Stack & APIs',
      subtitle:
        'Soluções completas desenvolvidas com arquitetura limpa, interfaces reativas, segurança e alta performance de ponta a ponta.',
      filters: {
        all: 'Todos os Projetos',
        featured: '⭐ Destaques',
        fullstack: 'Full-Stack',
        backend: 'Back-end & APIs',
      },
      card: {
        featured: 'Destaque',
        viewDetails: 'Ver Detalhes do Projeto',
        repository: 'Repositório',
        deploy: 'Deploy',
        architecture: 'Arquitetura',
      },
      modal: {
        featuredBadge: 'Projeto Destaque',
        techHeading: 'Tecnologias Utilizadas',
        viewCode: 'Ver Código no GitHub',
        openDeploy: 'Acessar Deploy',
      },
      emptyState: 'Nenhum projeto encontrado nesta categoria.',
      defaults: {
        'rentals-api': {
          tagline: 'Plataforma de reservas e locações de alto desempenho com Fastify e PostgreSQL',
          description:
            'Aplicação desenvolvida para gerenciar fluxos complexos de agendamentos e locações em tempo real. Implementa Fastify para máxima taxa de vazão (throughput), validação por JSON Schema, Prisma ORM conectado ao PostgreSQL, suíte de testes com Jest e conteinerização em Docker.',
        },
        'leads-api': {
          tagline: 'Sistema de captura, qualificação e gestão de leads corporativos',
          description:
            'Solução completa voltada para CRM e pipeline comercial de prospecção. Desenvolvida em TypeScript com Express e Next.js, integrando Prisma ORM com PostgreSQL, documentação OpenAPI interativa no Swagger UI, validações robustas e ambiente de desenvolvimento modularizado com Docker Compose.',
        },
        'todo-list-api': {
          tagline: 'Gerenciador avançado de tarefas com autenticação JWT e MongoDB',
          description:
            'Aplicação para controle produtivo de tarefas com controle de acesso baseado em roles (RBAC) e autenticação JWT. Persistência de dados NoSQL com MongoDB e Mongoose, documentação viva com Swagger, testes automatizados e deploy conteinerizado.',
        },
      },
    },
    github: {
      badge: 'Integração em Tempo Real',
      title: 'Atividade no',
      titleHighlight: 'GitHub',
      subtitle:
        'Acompanhe em tempo real meus commits, repositórios públicos e contribuições diretamente da API oficial do GitHub.',
      defaultBio: 'Engenheiro Full-Stack | Vibe Coding | Next.js | TypeScript | Node.js',
      metrics: {
        repos: 'Repositórios',
        followers: 'Seguidores',
        profile: 'Perfil',
      },
      defaultRepoDesc: 'Repositório de código limpo com testes e boas práticas de arquitetura.',
    },
    contact: {
      badge: 'Vamos Conversar',
      title: 'Entre em',
      titleHighlight: 'Contato',
      subtitle:
        'Tem uma oportunidade profissional, projeto ou dúvida técnica? Envie uma mensagem e vamos construir algo incrível juntos!',
      info: {
        title: 'Conecte-se comigo',
        description:
          'Estou aberto para oportunidades como engenheiro full-stack, projetos inovadores com vibe coding e soluções digitais de alto impacto. Respondo com rapidez!',
        emailLabel: 'E-mail Profissional',
        copyEmail: 'Copiar e-mail',
        emailCopied: 'E-mail copiado!',
        visit: 'Visitar',
        availability:
          'Horário de resposta habitual: menos de 24 horas. Fuso horário de Brasília (UTC-3).',
      },
      form: {
        title: 'Envie uma mensagem direta',
        subtitle:
          'Preencha os dados abaixo. Sua mensagem será entregue imediatamente no meu painel administrativo.',
        nameLabel: 'Seu Nome Completo',
        namePlaceholder: 'Ex: Ana Silva',
        emailLabel: 'Seu E-mail Profissional',
        emailPlaceholder: 'Ex: ana.silva@empresa.com',
        messageLabel: 'Mensagem ou Proposta de Projeto',
        messagePlaceholder:
          'Olá Gabriel, gostaria de conversar sobre uma oportunidade / projeto...',
        submitButton: 'Enviar Mensagem',
        sendingButton: 'Enviando...',
        successMessage: 'Mensagem enviada com sucesso! Responderei em breve.',
        errorMessageDefault: 'Erro inesperado. Tente novamente.',
      },
    },
    footer: {
      bio: 'Engenheiro Full-Stack & Vibe Coder. Construindo produtos digitais completos e modernos com Next.js, React, Node.js e Inteligência Artificial.',
      nav: {
        home: 'Início',
        about: 'Sobre',
        stacks: 'Stacks',
        projects: 'Projetos',
        github: 'GitHub Live',
        contact: 'Contato',
        admin: 'Painel Admin',
      },
      backToPortfolio: 'Voltar ao Portfólio Público',
      copyright: 'Gabriel Pereira. Todos os direitos reservados.',
      builtWith: 'Desenvolvido com Next.js, Tailwind CSS & Vibe Coding',
      scrollToTop: 'Voltar ao topo',
    },
  },

  en: {
    navbar: {
      brandSub: 'Full-Stack & Vibe Coding',
      adminSub: 'Admin Dashboard',
      nav: {
        home: 'Home',
        about: 'About',
        stacks: 'Stacks & Vibe',
        projects: 'Projects',
        github: 'GitHub Live',
        contact: 'Contact',
      },
      adminButton: 'Admin',
      backToPortfolio: 'Back to Portfolio',
      openMenu: 'Open Menu',
      closeMenu: 'Close Menu',
      switchLang: 'Switch to Portuguese',
    },
    hero: {
      statusBadge: 'Available for Full-Stack & Vibe Coding Projects',
      greeting: 'Hello, I am',
      roles: [
        'Full-Stack Software Engineer',
        'Vibe Coding & AI Specialist',
        'Next.js, React & Node.js Architect',
        'End-to-End Product Builder',
      ],
      elevatorPitch: {
        role: 'Full-Stack Software Engineer',
        vibeCoding: 'Vibe Coding',
        descriptionPart1: ' pioneering the ',
        descriptionPart2: ' culture. I craft complete digital products from end to end — merging sleek, reactive interfaces in ',
        frontendTech: 'Next.js and React',
        descriptionPart3: ' with resilient, high-speed architectures powered by ',
        backendTech: 'Node.js, TypeScript, PostgreSQL, and Docker',
        descriptionPart4: '.',
      },
      buttons: {
        viewProjects: 'View My Projects',
        downloadResume: 'Download Resume',
        contactMe: 'Get in Touch',
      },
      metrics: {
        fullstack: {
          title: 'Full-Stack',
          sub: 'End-to-End',
        },
        vibeCoding: {
          title: 'Vibe Coding',
          sub: 'Agile Flow + AI',
        },
        testing: {
          title: '100%',
          sub: 'Typed & Tested',
        },
      },
      terminal: {
        filename: 'action.fullstack.ts',
        copy: 'Copy code',
        copied: 'Copied!',
        comment: '// ⚡ Vibe Coding: Full-Stack Action & AI',
        status: 'Full-Stack Ready',
      },
    },
    about: {
      badge: 'Full-Stack Engineering & Vibe Coding',
      title: 'About',
      titleHighlight: 'Me',
      subtitle:
        'Combining a solid technical foundation in software systems, end-to-end full-stack engineering, and modern vibe coding workflows to build complete digital products.',
      specialtyTag: 'Full-Stack Engineer',
      badges: {
        degree: '🎓 B.S. Systems Grad',
        pro: '🚀 Full-Stack Pro',
        vibe: '⚡ Vibe Coder',
      },
      bio: [
        'I hold a degree in Systems Analysis and Development with Full-Stack specialization from OneBitCode. My value proposition is delivering complete digital products end-to-end: from refined, responsive frontend design to resilient backend architecture.',
        'I master the complete modern software engineering cycle using Next.js, React, Tailwind CSS, TypeScript, Node.js, Fastify, PostgreSQL, MongoDB, Prisma ORM, and Docker.',
        'I deeply embrace the Vibe Coding culture: harnessing state-of-the-art Artificial Intelligence models to accelerate development, prototype at record speed, and focus on what truly matters — clean architecture, flawless user experience, and bulletproof business rules.',
      ],
      highlights: [
        'End-to-End Full-Stack Development',
        'Reactive Interfaces with Next.js & React',
        'High-Throughput RESTful APIs in Node.js',
        'Data Modeling with PostgreSQL, MongoDB & Prisma',
        'Vibe Coding Workflows with Generative AI',
        'Full Containerization with Docker',
      ],
      buttons: {
        downloadResume: 'Download Resume',
        discuss: 'Discuss Opportunities',
      },
      pillars: [
        {
          title: 'Modern Front-end & Reactive UI',
          description:
            'Crafting elegant and interactive interfaces with Next.js 14, React, and Tailwind CSS, focusing on performance, accessibility, and fluid micro-interactions.',
        },
        {
          title: 'Robust Back-end & RESTful APIs',
          description:
            'Building decoupled architectures using Node.js, Fastify, and Express with rigorous schema validation and JWT authentication control.',
        },
        {
          title: 'Databases & DevOps',
          description:
            'Relational and document modeling with PostgreSQL, MongoDB, and Prisma ORM, combined with Docker containerization for seamless environment parity.',
        },
        {
          title: 'Vibe Coding & AI Engineering',
          description:
            'Adopting agile workflows augmented by Artificial Intelligence for rapid prototyping, automated testing, and high-velocity value delivery.',
        },
      ],
    },
    stacks: {
      badge: 'Full-Stack Ecosystem & Vibe Coding',
      title: 'Stacks &',
      titleHighlight: 'Full-Stack Skills',
      subtitle:
        'Technologies I master to create complete software experiences — from frontend design to backend persistence and scalability.',
      categories: {
        all: 'All Stacks',
        frontend: 'Frontend & Vibe',
        backend: 'Back-end & APIs',
        languages: 'Languages',
        database: 'Databases',
        devops: 'DevOps & Tooling',
      },
      searchPlaceholder: 'Search technology...',
      emptySearch: 'No stacks found for query',
      clearFilters: 'Clear filters',
      levelBadges: {
        Iniciante: 'Beginner',
        Intermediário: 'Intermediate',
        Avançado: 'Advanced',
        Especialista: 'Expert',
      },
      banner: {
        title: 'Vibe Coding & AI-Driven Workflow',
        tag: 'High Velocity',
        description:
          'I leverage modern Artificial Intelligence tools combined with rigorous software engineering to accelerate prototyping, test automation, and continuous delivery with maximum quality and precision.',
      },
    },
    projects: {
      badge: 'Applications & Digital Products',
      title: 'Projects',
      titleHighlight: 'Full-Stack & APIs',
      subtitle:
        'Complete solutions built with clean architecture, reactive interfaces, security, and high performance from end to end.',
      filters: {
        all: 'All Projects',
        featured: '⭐ Featured',
        fullstack: 'Full-Stack',
        backend: 'Back-end & APIs',
      },
      card: {
        featured: 'Featured',
        viewDetails: 'View Project Details',
        repository: 'Repository',
        deploy: 'Live Demo',
        architecture: 'Architecture',
      },
      modal: {
        featuredBadge: 'Featured Project',
        techHeading: 'Technologies Used',
        viewCode: 'View Code on GitHub',
        openDeploy: 'Access Live Demo',
      },
      emptyState: 'No projects found in this category.',
      defaults: {
        'rentals-api': {
          tagline: 'High-performance rentals and booking platform built with Fastify and PostgreSQL',
          description:
            'Application engineered to manage complex real-time booking and rental workflows. Implements Fastify for maximum throughput, JSON Schema validation, Prisma ORM with PostgreSQL, Jest test suite, and Docker containerization.',
        },
        'leads-api': {
          tagline: 'Corporate lead capture, qualification, and sales pipeline management system',
          description:
            'Full-featured CRM and sales prospecting pipeline platform. Developed in TypeScript with Express and Next.js, integrating Prisma ORM with PostgreSQL, interactive OpenAPI Swagger documentation, robust validation, and Docker Compose development environment.',
        },
        'todo-list-api': {
          tagline: 'Advanced task management hub with JWT authentication and MongoDB',
          description:
            'Task productivity application featuring Role-Based Access Control (RBAC) and JWT authentication. NoSQL persistence with MongoDB and Mongoose, live Swagger documentation, automated testing, and containerized deployment.',
        },
      },
    },
    github: {
      badge: 'Real-Time Integration',
      title: 'GitHub',
      titleHighlight: 'Activity',
      subtitle:
        'Track my commits, public repositories, and contributions in real time directly from the official GitHub API.',
      defaultBio: 'Full-Stack Engineer | Vibe Coding | Next.js | TypeScript | Node.js',
      metrics: {
        repos: 'Repositories',
        followers: 'Followers',
        profile: 'Profile',
      },
      defaultRepoDesc: 'Clean code repository with automated tests and architecture best practices.',
    },
    contact: {
      badge: "Let's Connect",
      title: 'Get in',
      titleHighlight: 'Touch',
      subtitle:
        'Have a career opportunity, project, or technical question? Send a message and let us build something extraordinary together!',
      info: {
        title: 'Connect with me',
        description:
          'I am open to full-stack engineering opportunities, innovative vibe coding projects, and high-impact digital solutions. I respond promptly!',
        emailLabel: 'Professional Email',
        copyEmail: 'Copy email',
        emailCopied: 'Email copied!',
        visit: 'Visit',
        availability:
          'Typical response time: under 24 hours. Brasília timezone (UTC-3).',
      },
      form: {
        title: 'Send a direct message',
        subtitle:
          'Fill in the details below. Your message will be delivered directly to my administrative dashboard.',
        nameLabel: 'Your Full Name',
        namePlaceholder: 'e.g. John Doe',
        emailLabel: 'Your Professional Email',
        emailPlaceholder: 'e.g. john.doe@company.com',
        messageLabel: 'Message or Project Proposal',
        messagePlaceholder:
          'Hello Gabriel, I would like to discuss an opportunity / project...',
        submitButton: 'Send Message',
        sendingButton: 'Sending...',
        successMessage: 'Message sent successfully! I will get back to you shortly.',
        errorMessageDefault: 'Unexpected error. Please try again.',
      },
    },
    footer: {
      bio: 'Full-Stack Engineer & Vibe Coder. Building complete, modern digital products with Next.js, React, Node.js, and Artificial Intelligence.',
      nav: {
        home: 'Home',
        about: 'About',
        stacks: 'Stacks',
        projects: 'Projects',
        github: 'GitHub Live',
        contact: 'Contact',
        admin: 'Admin Panel',
      },
      backToPortfolio: 'Back to Public Portfolio',
      copyright: 'Gabriel Pereira. All rights reserved.',
      builtWith: 'Built with Next.js, Tailwind CSS & Vibe Coding',
      scrollToTop: 'Back to top',
    },
  },
};
