import fs from 'fs';
import path from 'path';
import { prisma } from './prisma';
import { PortfolioData, Project, StackItem, ContactMessage, StackCategory } from '@/types';
import { initialPortfolioData } from './default-data';

/**
 * Converte caminhos locais de imagens em Base64 Data URL (data:image/...;base64,...)
 * Caso a imagem já esteja em Base64, preserva intacta.
 */
export function convertImageToBase64(imagePath: string): string {
  if (!imagePath) return '';
  if (imagePath.startsWith('data:')) return imagePath;

  try {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const fullPath = path.join(process.cwd(), 'public', cleanPath);
    if (fs.existsSync(fullPath)) {
      const ext = path.extname(fullPath).toLowerCase().replace('.', '') || 'png';
      const mime = ext === 'jpg' ? 'jpeg' : ext === 'svg' ? 'svg+xml' : ext;
      const fileBuffer = fs.readFileSync(fullPath);
      return `data:image/${mime};base64,${fileBuffer.toString('base64')}`;
    }
  } catch (error) {
    console.error('Erro ao converter imagem para base64:', error);
  }
  return imagePath;
}

let tablesInitialized = false;

/**
 * Garante que as tabelas necessárias existam no banco de dados (SQLite ou Turso).
 * Evita erros de 'no such table' em ambientes de build ou instâncias recém-criadas.
 */
export async function ensureTables(): Promise<void> {
  if (tablesInitialized) return;
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Project" (
        "id" TEXT PRIMARY KEY NOT NULL,
        "title" TEXT NOT NULL,
        "tagline" TEXT NOT NULL,
        "taglineEn" TEXT,
        "description" TEXT NOT NULL,
        "descriptionEn" TEXT,
        "category" TEXT NOT NULL DEFAULT 'fullstack',
        "image" TEXT NOT NULL,
        "githubUrl" TEXT NOT NULL,
        "liveUrl" TEXT DEFAULT '',
        "technologies" TEXT NOT NULL DEFAULT '[]',
        "featured" BOOLEAN NOT NULL DEFAULT 0,
        "order" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TEXT NOT NULL,
        "stars" INTEGER DEFAULT 0,
        "forks" INTEGER DEFAULT 0
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "StackItem" (
        "id" TEXT PRIMARY KEY NOT NULL,
        "name" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "iconSlug" TEXT NOT NULL,
        "level" TEXT NOT NULL DEFAULT 'Intermediário',
        "color" TEXT DEFAULT '#06b6d4',
        "order" INTEGER NOT NULL DEFAULT 0
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ContactMessage" (
        "id" TEXT PRIMARY KEY NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "message" TEXT NOT NULL,
        "createdAt" TEXT NOT NULL,
        "read" BOOLEAN NOT NULL DEFAULT 0
      );
    `);

    tablesInitialized = true;
  } catch (error) {
    console.warn('Aviso: Não foi possível auto-inicializar as tabelas no banco:', error);
  }
}

export async function seedInitialData(): Promise<void> {
  await ensureTables();

  // Seed projects with base64 converted images
  for (const project of initialPortfolioData.projects) {
    const base64Image = convertImageToBase64(project.image);
    await prisma.project.upsert({
      where: { id: project.id },
      update: {
        title: project.title,
        tagline: project.tagline,
        taglineEn: project.taglineEn || null,
        description: project.description,
        descriptionEn: project.descriptionEn || null,
        category: project.category,
        image: base64Image,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl || '',
        technologies: JSON.stringify(project.technologies || []),
        featured: Boolean(project.featured),
        order: project.order ?? 0,
        createdAt: project.createdAt || new Date().toISOString().split('T')[0],
        stars: project.stats?.stars ?? 0,
        forks: project.stats?.forks ?? 0,
      },
      create: {
        id: project.id,
        title: project.title,
        tagline: project.tagline,
        taglineEn: project.taglineEn || null,
        description: project.description,
        descriptionEn: project.descriptionEn || null,
        category: project.category,
        image: base64Image,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl || '',
        technologies: JSON.stringify(project.technologies || []),
        featured: Boolean(project.featured),
        order: project.order ?? 0,
        createdAt: project.createdAt || new Date().toISOString().split('T')[0],
        stars: project.stats?.stars ?? 0,
        forks: project.stats?.forks ?? 0,
      },
    });
  }

  // Seed stacks
  for (const stack of initialPortfolioData.stacks) {
    await prisma.stackItem.upsert({
      where: { id: stack.id },
      update: {
        name: stack.name,
        category: stack.category,
        iconSlug: stack.iconSlug,
        level: stack.level,
        color: stack.color || '#06b6d4',
        order: stack.order ?? 0,
      },
      create: {
        id: stack.id,
        name: stack.name,
        category: stack.category,
        iconSlug: stack.iconSlug,
        level: stack.level,
        color: stack.color || '#06b6d4',
        order: stack.order ?? 0,
      },
    });
  }
}

function formatProject(p: any): Project {
  let tech: string[] = [];
  try {
    tech = typeof p.technologies === 'string' ? JSON.parse(p.technologies) : p.technologies || [];
  } catch {
    tech = p.technologies ? [p.technologies] : [];
  }

  return {
    id: p.id,
    title: p.title,
    tagline: p.tagline,
    taglineEn: p.taglineEn || undefined,
    description: p.description,
    descriptionEn: p.descriptionEn || undefined,
    category: p.category as Project['category'],
    image: p.image,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl || undefined,
    technologies: tech,
    featured: Boolean(p.featured),
    order: p.order ?? 0,
    createdAt: p.createdAt,
    stats: {
      stars: p.stars ?? 0,
      forks: p.forks ?? 0,
    },
  };
}

// Projects operations
export async function getProjects(): Promise<Project[]> {
  try {
    await ensureTables();
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
    return projects.map(formatProject);
  } catch (error) {
    console.warn('Aviso: Não foi possível carregar projetos do banco:', error);
    return [];
  }
}

export async function addProject(
  project: Omit<Project, 'id' | 'createdAt'> & { id?: string }
): Promise<Project> {
  await ensureTables();
  const count = await prisma.project.count();
  const id =
    project.id ||
    project.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString(36);
  const base64Image = convertImageToBase64(project.image);

  const created = await prisma.project.create({
    data: {
      id,
      title: project.title,
      tagline: project.tagline,
      taglineEn: project.taglineEn || null,
      description: project.description,
      descriptionEn: project.descriptionEn || null,
      category: project.category || 'fullstack',
      image: base64Image,
      githubUrl: project.githubUrl || 'https://github.com/gabriel8programmer',
      liveUrl: project.liveUrl || '',
      technologies: JSON.stringify(project.technologies || []),
      featured: Boolean(project.featured),
      order: project.order ?? count + 1,
      createdAt: new Date().toISOString().split('T')[0],
      stars: project.stats?.stars ?? 0,
      forks: project.stats?.forks ?? 0,
    },
  });

  return formatProject(created);
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  await ensureTables();
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return null;

  const dataToUpdate: any = {};
  if (updates.title !== undefined) dataToUpdate.title = updates.title;
  if (updates.tagline !== undefined) dataToUpdate.tagline = updates.tagline;
  if (updates.taglineEn !== undefined) dataToUpdate.taglineEn = updates.taglineEn;
  if (updates.description !== undefined) dataToUpdate.description = updates.description;
  if (updates.descriptionEn !== undefined) dataToUpdate.descriptionEn = updates.descriptionEn;
  if (updates.category !== undefined) dataToUpdate.category = updates.category;
  if (updates.image !== undefined) dataToUpdate.image = convertImageToBase64(updates.image);
  if (updates.githubUrl !== undefined) dataToUpdate.githubUrl = updates.githubUrl;
  if (updates.liveUrl !== undefined) dataToUpdate.liveUrl = updates.liveUrl;
  if (updates.technologies !== undefined) {
    dataToUpdate.technologies = Array.isArray(updates.technologies)
      ? JSON.stringify(updates.technologies)
      : updates.technologies;
  }
  if (updates.featured !== undefined) dataToUpdate.featured = Boolean(updates.featured);
  if (updates.order !== undefined) dataToUpdate.order = Number(updates.order);
  if (updates.stats) {
    if (updates.stats.stars !== undefined) dataToUpdate.stars = updates.stats.stars;
    if (updates.stats.forks !== undefined) dataToUpdate.forks = updates.stats.forks;
  }

  const updated = await prisma.project.update({
    where: { id },
    data: dataToUpdate,
  });

  return formatProject(updated);
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    await ensureTables();
    await prisma.project.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

// Stacks operations
export async function getStacks(): Promise<StackItem[]> {
  try {
    await ensureTables();
    const stacks = await prisma.stackItem.findMany({
      orderBy: { order: 'asc' },
    });
    return stacks.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category as StackCategory,
      iconSlug: s.iconSlug,
      level: s.level as StackItem['level'],
      color: s.color || undefined,
      order: s.order,
    }));
  } catch (error) {
    console.warn('Aviso: Não foi possível carregar stacks do banco:', error);
    return [];
  }
}

export async function addStack(stack: Omit<StackItem, 'id'> & { id?: string }): Promise<StackItem> {
  await ensureTables();
  const count = await prisma.stackItem.count();
  const id = stack.id || stack.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const created = await prisma.stackItem.create({
    data: {
      id,
      name: stack.name,
      category: stack.category,
      iconSlug: stack.iconSlug || stack.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
      level: stack.level || 'Intermediário',
      color: stack.color || '#06b6d4',
      order: stack.order ?? count + 1,
    },
  });

  return {
    id: created.id,
    name: created.name,
    category: created.category as StackCategory,
    iconSlug: created.iconSlug,
    level: created.level as StackItem['level'],
    color: created.color || undefined,
    order: created.order,
  };
}

export async function updateStack(id: string, updates: Partial<StackItem>): Promise<StackItem | null> {
  await ensureTables();
  const existing = await prisma.stackItem.findUnique({ where: { id } });
  if (!existing) return null;

  const updated = await prisma.stackItem.update({
    where: { id },
    data: {
      ...(updates.name !== undefined && { name: updates.name }),
      ...(updates.category !== undefined && { category: updates.category }),
      ...(updates.iconSlug !== undefined && { iconSlug: updates.iconSlug }),
      ...(updates.level !== undefined && { level: updates.level }),
      ...(updates.color !== undefined && { color: updates.color }),
      ...(updates.order !== undefined && { order: Number(updates.order) }),
    },
  });

  return {
    id: updated.id,
    name: updated.name,
    category: updated.category as StackCategory,
    iconSlug: updated.iconSlug,
    level: updated.level as StackItem['level'],
    color: updated.color || undefined,
    order: updated.order,
  };
}

export async function deleteStack(id: string): Promise<boolean> {
  try {
    await ensureTables();
    await prisma.stackItem.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

// Contact messages operations
export async function getMessages(): Promise<ContactMessage[]> {
  try {
    await ensureTables();
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return messages.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      message: m.message,
      createdAt: m.createdAt,
      read: m.read,
    }));
  } catch (error) {
    console.warn('Aviso: Não foi possível carregar mensagens do banco:', error);
    return [];
  }
}

export async function addMessage(
  msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>
): Promise<ContactMessage> {
  await ensureTables();
  const created = await prisma.contactMessage.create({
    data: {
      id: 'msg-' + Date.now().toString(36),
      name: msg.name,
      email: msg.email,
      message: msg.message,
      createdAt: new Date().toISOString(),
      read: false,
    },
  });
  return {
    id: created.id,
    name: created.name,
    email: created.email,
    message: created.message,
    createdAt: created.createdAt,
    read: created.read,
  };
}

export async function deleteMessage(id: string): Promise<boolean> {
  try {
    await ensureTables();
    await prisma.contactMessage.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const [projects, stacks, messages] = await Promise.all([
    getProjects(),
    getStacks(),
    getMessages(),
  ]);
  return { projects, stacks, messages };
}

export async function resetPortfolioData(): Promise<PortfolioData> {
  await ensureTables();
  await prisma.project.deleteMany();
  await prisma.stackItem.deleteMany();
  await prisma.contactMessage.deleteMany();

  await seedInitialData();
  return getPortfolioData();
}
