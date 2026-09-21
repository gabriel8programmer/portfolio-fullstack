import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { StacksRadar } from '@/components/StacksRadar';
import { ProjectsGallery } from '@/components/ProjectsGallery';
import { GitHubSection } from '@/components/GitHubSection';
import { ContactSection } from '@/components/ContactSection';
import { getProjects, getStacks } from '@/lib/db';

export const revalidate = 60; // ISR revalidate every 60s

export default async function HomePage() {
  const initialProjects = getProjects();
  const initialStacks = getStacks();

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
