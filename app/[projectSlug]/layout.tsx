import { getAuthServer } from '@/utils/authServerRequests';
import { ProjectData } from '@/app/[projectSlug]/projects/ProjectsTable';
import { getUserPlan } from '@/app/[projectSlug]/utils';
import AppLayout from './AppLayout';

async function getProjects() {
  const res = await getAuthServer('/api/projects/');

  const projects: ProjectData[] = (
    await res.json()
  );

  return projects;
}

interface Props {
  children: React.ReactNode;
  params: {
    projectSlug: string;
  };
}

export default async function DashboardProjectsLayout(
  { children, params }: Props,
) {
  const [
    projects,
    userPlan,
  ] = await Promise.all([
    getProjects(),
    getUserPlan(),
  ]);

  const { projectSlug } = params;

  return (
    <AppLayout
      projects={projects}
      selectedProjectSlug={projectSlug}
      recureApiKey={process.env.RECURE_PUBLIC_API_KEY || ''}
      userPlan={userPlan}
    >
      {children}
    </AppLayout>
  );
}
