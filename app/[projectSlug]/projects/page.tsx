import ProjectsTable from '@/app/[projectSlug]/projects/ProjectsTable';
import { getProjectsData } from '@/app/[projectSlug]/projects/utils';

export default async function ProjectsPage() {
  const projectsData = await getProjectsData();

  return (
    <ProjectsTable projectsData={projectsData} />
  );
}
