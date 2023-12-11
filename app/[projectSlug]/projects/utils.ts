import { getAuthServer } from '@/utils/authServerRequests';
import { ProjectData } from '@/app/[projectSlug]/projects/ProjectsTable';

export async function getProjectsData() {
  const res = await getAuthServer('/api/projects/');

  const projectsData: ProjectData[] = await res.json();

  return projectsData;
}
