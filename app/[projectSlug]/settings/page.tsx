import ProjectSettings
  from '@/app/[projectSlug]/settings/ProjectSettings';
import { getProjectDetailsData, getProjectFlagSettings } from '@/app/[projectSlug]/settings/utils';

interface Params {
  params: {
    projectSlug: string;
  };
}

export default async function ProjectSettingsPage({ params }: Params) {
  const { projectSlug } = params;
  const projectData = await getProjectDetailsData(projectSlug);
  const projectFlagSettings = await getProjectFlagSettings(projectSlug);

  return (
    <ProjectSettings
      projectData={projectData}
      projectSlug={projectSlug}
      projectFlagSettings={projectFlagSettings}
    />
  );
}
