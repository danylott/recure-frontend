'use client';

import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { patch } from '@/utils/requests';
import { errorTemplate } from '@/utils/notifications';
import { ProjectFlagSettings } from '@/app/[projectSlug]/settings/types';

export const useFormFlagHandler = (
  notificationsApi: any,
  projectSlug: string,
  accountSharer: boolean,
  freeTrialAbuser: boolean,
  accountSharerValue: number,
  freeTrialAbuserValue: number,
  projectFlagSettings: ProjectFlagSettings[],
) => {
  const { data: session } = useSession();
  const [formValues, setFormValues] = useState<ProjectFlagSettings>();

  const freeTrialAbuserID = projectFlagSettings.find((item: ProjectFlagSettings) => item.flag === 'FREE_TRIAL_ABUSER')?.id;
  const accountSharerID = projectFlagSettings.find((item: ProjectFlagSettings) => item.flag === 'ACCOUNT_SHARER')?.id;

  const handleFormSubmit = useCallback(async (values: ProjectFlagSettings) => {
    setFormValues(values);
    const responseAccSharer = await patch({
      url: `/api/projects/${projectSlug}/flag_settings/${accountSharerID}/`,
      data: {
        is_enabled: accountSharer,
        dashboard_threshold: accountSharerValue,
      },
      token: session?.access,
    });

    const responseFreeTrial = await patch({
      url: `/api/projects/${projectSlug}/flag_settings/${freeTrialAbuserID}/`,
      data: {
        is_enabled: freeTrialAbuser,
        dashboard_threshold: freeTrialAbuserValue,
      },
      token: session?.access,
    });

    if (!responseFreeTrial.ok || !responseAccSharer.ok) {
      if (!responseFreeTrial.ok) {
        const data = await responseFreeTrial.json();

        notificationsApi.error(errorTemplate(JSON.stringify(data)));
      }

      if (!responseAccSharer.ok) {
        const data = await responseAccSharer.json();

        notificationsApi.error(errorTemplate(JSON.stringify(data)));
      }

      return false;
    }

    return true;
  }, [
    notificationsApi,
    projectSlug,
    session?.access,
    accountSharer,
    freeTrialAbuser,
    accountSharerValue,
    freeTrialAbuserValue,
  ]);

  return {
    formValues,
    handleFormSubmit,
  };
};
