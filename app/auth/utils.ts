import { RecureAIClient } from 'recure';
import { EventType } from 'recure/web/enums';
import * as Sentry from '@sentry/nextjs';
import { UserDetail } from '@/app/auth/interfaces';
import { get } from '@/utils/requests';
import { errorTemplate } from '@/utils/notifications';
import { ProjectData } from '@/app/[projectSlug]/projects/ProjectsTable';

interface recureTrackEventParams {
  user: UserDetail;
  eventType: EventType;
  recurePublicApiKey?: string;
  eventOptions?: {
    pageName: string;
  };
}

export async function recureTrackEvent(
  {
    user, eventType, recurePublicApiKey, eventOptions,
  }: recureTrackEventParams,
) {
  try {
    const recure = new RecureAIClient({ publicApiKey: recurePublicApiKey });

    const trackOptions = {
      userOptions: {
        userId: user.id,
        userEmail: user.email,
      },
      eventType,
      eventOptions,
    };

    await recure.track(trackOptions);
  } catch (error) {
    await Sentry.captureException(error);
  }
}

interface redirectToPageParams {
  token?: string;
  notificationsApi: any;
  setLoading: any;
  router: any;
}

export async function redirectToDashboards({
  token, notificationsApi, setLoading, router,
}: redirectToPageParams) {
  const projectsResult = await get({
    url: '/api/projects/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!projectsResult?.ok) {
    notificationsApi.error(errorTemplate('No projects found'));
    setLoading(false);

    return;
  }

  const projects: ProjectData[] = await projectsResult.json();

  const projectSlug = projects[0].slug;

  router.push(`/${projectSlug}/dashboard`);
}
