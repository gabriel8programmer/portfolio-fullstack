import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { StacksRadar } from '@/components/StacksRadar';
import { ProjectsGallery } from '@/components/ProjectsGallery';
import { GitHubSection } from '@/components/GitHubSection';
import { ContactSection } from '@/components/ContactSection';
import { getProjects, getStacks } from '@/lib/db';
import { Project, StackItem } from '@/types';

export const revalidate = 60; // ISR revalidate every 60s

export default async function HomePage() {
  let initialProjects: Project[] = [];
  let initialStacks: StackItem[] = [];

  try {
    initialProjects = await getProjects();
    initialStacks = await getStacks();
  } catch (error) {
    console.warn('Erro ao carregar dados iniciais no prerender da HomePage:', error);
  }

  return (
    <div className="relative">
      <Hero />
      <About />
      <StacksRadar initialStacks={initialStacks} />
      <ProjectsGallery initialProjects={initialProjects} />
      <GitHubSection />
      <ContactSection />
    </div>
  );
}
