import { getAuthServer } from '@/utils/authServerRequests';
import { ProjectData } from '@/app/[projectSlug]/projects/ProjectsTable';
import { ProjectFlagSettings } from '@/app/[projectSlug]/settings/types';

export async function getProjectDetailsData(id: string) {
  const res = await getAuthServer(`/api/projects/${id}/`);

  const projectData: ProjectData = await res.json();

  return projectData;
}

export async function getProjectFlagSettings(
  projectSlug: string,
) {
  const res = await getAuthServer(`/api/projects/${projectSlug}/flag_settings/`);

  const flags: ProjectFlagSettings[] = await res.json();

  return flags;
}
