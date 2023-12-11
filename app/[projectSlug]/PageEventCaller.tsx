'use client';

import { useEffect, useCallback } from 'react';
import { EventType } from 'recure/web/enums';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { recureTrackEvent } from '@/app/auth/utils';
import { debounce } from '@/app/[projectSlug]/utils';

interface Props {
  recureApiKey: string;
}

interface UserDetail {
  user_id?: string | null | undefined;
  email?: string | null | undefined;
}

export default function PageEventCaller({ recureApiKey }: Props) {
  const { data: session } = useSession();
  const user: UserDetail | undefined = session?.user;
  const pathname = usePathname();

  const fetchUserDetail = useCallback(async () => {
    if (!user || !recureApiKey || !user.user_id || !pathname || !user.email) {
      return;
    }

    await recureTrackEvent({
      user: {
        id: user.user_id,
        email: user.email,
      },
      eventType: EventType.PAGE,
      recurePublicApiKey: recureApiKey,
      eventOptions: { pageName: pathname },
    });
  }, [user, recureApiKey, pathname]);

  const debouncedFetchUserDetail = useCallback(
    debounce(fetchUserDetail, 180),
    [fetchUserDetail],
  );

  useEffect(() => {
    const cleanup = () => {
      debouncedFetchUserDetail();
    };

    return cleanup;
  }, [debouncedFetchUserDetail]);

  return null;
}
