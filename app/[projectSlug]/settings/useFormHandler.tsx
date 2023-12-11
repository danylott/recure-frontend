'use client';

import { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { patch } from '@/utils/requests';
import { errorTemplate } from '@/utils/notifications';
import { ProjectFormData } from '@/app/[projectSlug]/settings/types';

export const useFormHandler = (
  notificationsApi: any,
  projectSlug: string,
  initialValues: ProjectFormData,
) => {
  const { data: session } = useSession();

  return useCallback(async (values: ProjectFormData) => {
    const response = await patch({ url: `/api/projects/${projectSlug}/`, data: values, token: session?.access });

    if (response.ok) {
      return true;
    }

    const data = await response.json();

    notificationsApi.error(errorTemplate(JSON.stringify(data)));

    return false;
  }, [notificationsApi, projectSlug, session?.access, initialValues]);
};
