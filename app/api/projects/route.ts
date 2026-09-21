import { NextResponse } from 'next/server';
import { getProjects, addProject } from '@/lib/db';

export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar projetos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.description) {
      return NextResponse.json({ error: 'Título e descrição são obrigatórios' }, { status: 400 });
    }

    const project = addProject({
      title: body.title,
      tagline: body.tagline || body.title,
      description: body.description,
      category: body.category || 'backend',
      image: body.image || '/img/projects/todo-list.png',
      githubUrl: body.githubUrl || 'https://github.com/gabriel8programmer',
      liveUrl: body.liveUrl || '',
      technologies: Array.isArray(body.technologies) ? body.technologies : ['Node.js', 'TypeScript'],
      featured: Boolean(body.featured),
      order: Number(body.order) || 0,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar projeto' }, { status: 500 });
  }
}
