import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const username = 'gabriel8programmer';

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'User-Agent': 'Portfolio-Gabriel-App',
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
        headers: {
          'User-Agent': 'Portfolio-Gabriel-App',
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      }),
    ]);

    let userData = null;
    let reposData = [];

    if (userRes.ok) {
      userData = await userRes.json();
    }
    if (reposRes.ok) {
      reposData = await reposRes.json();
    }

    // Fallback if rate limited or offline
    const fallbackProfile = {
      login: username,
      name: 'Gabriel Pereira',
      avatar_url: 'https://avatars.githubusercontent.com/u/105327299?v=4',
      bio: 'Desenvolvedor Backend Node.js | TypeScript | PostgreSQL | APIs RESTful & Docker',
      public_repos: 18,
      followers: 12,
      following: 15,
      html_url: `https://github.com/${username}`,
    };

    const cleanRepos = (reposData.length > 0 ? reposData : [
      {
        id: 1,
        name: 'rentals-api',
        description: 'API de locação e reservas construída com Fastify, PostgreSQL e Clean Architecture',
        html_url: `https://github.com/${username}/rentals-api`,
        language: 'TypeScript',
        stargazers_count: 5,
        forks_count: 1,
        updated_at: '2025-01-20T00:00:00Z',
      },
      {
        id: 2,
        name: 'leads-api',
        description: 'Microsserviço de gestão de leads e CRM com PostgreSQL, Prisma ORM e Docker',
        html_url: `https://github.com/${username}/leads-api`,
        language: 'TypeScript',
        stargazers_count: 4,
        forks_count: 0,
        updated_at: '2024-12-10T00:00:00Z',
      },
      {
        id: 3,
        name: 'todo-list-api',
        description: 'API RESTful robusta com autenticação JWT, MongoDB e documentação Swagger',
        html_url: `https://github.com/${username}/todo-list-api`,
        language: 'TypeScript',
        stargazers_count: 3,
        forks_count: 0,
        updated_at: '2024-10-05T00:00:00Z',
      },
    ]).map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'Repositório de desenvolvimento backend e microsserviços',
      html_url: repo.html_url,
      language: repo.language || 'TypeScript',
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      updatedAt: repo.updated_at,
    }));

    return NextResponse.json({
      profile: userData || fallbackProfile,
      repos: cleanRepos,
    });
  } catch (error) {
    return NextResponse.json({
      profile: {
        login: username,
        name: 'Gabriel Pereira',
        avatar_url: '/img/perfil.jpg',
        bio: 'Desenvolvedor Backend Node.js & TypeScript',
        public_repos: 18,
        followers: 12,
        following: 15,
        html_url: `https://github.com/${username}`,
      },
      repos: [],
    });
  }
}
