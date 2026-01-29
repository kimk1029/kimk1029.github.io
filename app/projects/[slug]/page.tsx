import { notFound } from 'next/navigation';
import { allProjects } from '@/app/data';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
