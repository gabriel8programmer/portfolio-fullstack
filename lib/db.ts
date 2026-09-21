import fs from 'fs';
import path from 'path';
import { PortfolioData, Project, StackItem, ContactMessage } from '@/types';
import { initialPortfolioData } from './default-data';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolio-data.json');

function ensureDataFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialPortfolioData, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error ensuring data file exists:', error);
  }
}

export function getPortfolioData(): PortfolioData {
  ensureDataFile();
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(fileContent);
    return {
      projects: parsed.projects || initialPortfolioData.projects,
      stacks: parsed.stacks || initialPortfolioData.stacks,
      messages: parsed.messages || [],
    };
  } catch (error) {
    console.error('Error reading portfolio data, falling back to initial data:', error);
    return initialPortfolioData;
  }
}

export function savePortfolioData(data: PortfolioData): boolean {
  ensureDataFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    return false;
  }
}

// Projects operations
export function getProjects(): Project[] {
  const data = getPortfolioData();
  return data.projects.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function addProject(project: Omit<Project, 'id' | 'createdAt'> & { id?: string }): Project {
  const data = getPortfolioData();
  const id = project.id || project.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString(36);
  const newProject: Project = {
    ...project,
    id,
    order: project.order ?? data.projects.length + 1,
    createdAt: new Date().toISOString().split('T')[0],
  };
  data.projects.push(newProject);
  savePortfolioData(data);
  return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const data = getPortfolioData();
  const index = data.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  data.projects[index] = {
    ...data.projects[index],
    ...updates,
    id, // protect ID
  };
  savePortfolioData(data);
  return data.projects[index];
}

export function deleteProject(id: string): boolean {
  const data = getPortfolioData();
  const initialLength = data.projects.length;
  data.projects = data.projects.filter((p) => p.id !== id);
  if (data.projects.length === initialLength) return false;
  savePortfolioData(data);
  return true;
}

// Stacks operations
export function getStacks(): StackItem[] {
  const data = getPortfolioData();
  return data.stacks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function addStack(stack: Omit<StackItem, 'id'> & { id?: string }): StackItem {
  const data = getPortfolioData();
  const id = stack.id || stack.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const newStack: StackItem = {
    ...stack,
    id,
    order: stack.order ?? data.stacks.length + 1,
  };
  data.stacks.push(newStack);
  savePortfolioData(data);
  return newStack;
}

export function updateStack(id: string, updates: Partial<StackItem>): StackItem | null {
  const data = getPortfolioData();
  const index = data.stacks.findIndex((s) => s.id === id);
  if (index === -1) return null;

  data.stacks[index] = {
    ...data.stacks[index],
    ...updates,
    id,
  };
  savePortfolioData(data);
  return data.stacks[index];
}

export function deleteStack(id: string): boolean {
  const data = getPortfolioData();
  const initialLength = data.stacks.length;
  data.stacks = data.stacks.filter((s) => s.id !== id);
  if (data.stacks.length === initialLength) return false;
  savePortfolioData(data);
  return true;
}

// Contact messages operations
export function getMessages(): ContactMessage[] {
  const data = getPortfolioData();
  return (data.messages || []).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
  const data = getPortfolioData();
  const newMessage: ContactMessage = {
    ...msg,
    id: 'msg-' + Date.now().toString(36),
    createdAt: new Date().toISOString(),
    read: false,
  };
  if (!data.messages) data.messages = [];
  data.messages.unshift(newMessage);
  savePortfolioData(data);
  return newMessage;
}

export function deleteMessage(id: string): boolean {
  const data = getPortfolioData();
  if (!data.messages) return false;
  data.messages = data.messages.filter((m) => m.id !== id);
  savePortfolioData(data);
  return true;
}

export function resetPortfolioData(): PortfolioData {
  savePortfolioData(initialPortfolioData);
  return initialPortfolioData;
}
