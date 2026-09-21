import type { Metadata } from 'next';
import './globals.css';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://gabrielpereira.dev'),
  title: {
    default: 'Gabriel Pereira | Full-Stack Engineer & Vibe Coder',
    template: '%s | Gabriel Pereira',
  },
  description:
    'Portfólio de Gabriel Pereira, Engenheiro de Software Full-Stack pioneiro em Vibe Coding. Especialista em criar aplicações web modernas de ponta a ponta com Next.js, React, Node.js, TypeScript e Inteligência Artificial.',
  keywords: [
    'Gabriel Pereira',
    'Engenheiro Fullstack',
    'Full-Stack Engineer',
    'Vibe Coding',
    'AI-Driven Development',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'APIs RESTful',
    'Frontend Moderno',
  ],
  authors: [{ name: 'Gabriel Pereira', url: 'https://github.com/gabriel8programmer' }],
  creator: 'Gabriel Pereira',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://gabrielpereira.dev',
    title: 'Gabriel Pereira | Full-Stack Engineer & Vibe Coder',
    description:
      'Construindo produtos web modernos, interativos e de alta performance de ponta a ponta com Next.js, React, Node.js e Vibe Coding.',
    siteName: 'Gabriel Pereira Portfolio',
    images: [
      {
        url: '/img/perfil.jpg',
        width: 800,
        height: 800,
        alt: 'Gabriel Pereira - Full-Stack Engineer & Vibe Coder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gabriel Pereira | Full-Stack Engineer & Vibe Coder',
    description:
      'Portfólio de Engenharia Full-Stack com foco em Vibe Coding, Next.js, React, Node.js, TypeScript e arquitetura moderna.',
    images: ['/img/perfil.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/img/favicon.png',
    shortcut: '/img/favicon.png',
    apple: '/img/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gabriel Pereira',
    jobTitle: 'Full-Stack Engineer & Vibe Coder',
    url: 'https://github.com/gabriel8programmer',
    sameAs: [
      'https://github.com/gabriel8programmer',
      'https://www.linkedin.com/in/gabrielwebprogrammer',
    ],
    knowsAbout: [
      'Full-Stack Engineering',
      'Vibe Coding',
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Tailwind CSS',
      'PostgreSQL',
      'MongoDB',
      'Docker',
      'Fastify',
      'REST APIs',
    ],
  };

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/img/favicon.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
        <InteractiveBackground />
        <Navbar />
        <main className="flex-grow z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
