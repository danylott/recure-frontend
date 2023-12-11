'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function useEmailSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const emailFilter = searchParams.get('email') || '';

  const createQueryString = useCallback(
    (email: string) => {
      const params = new URLSearchParams(searchParams);

      // Set page to 1 on email filter change
      params.set('page', '1');
      params.set('email', email);

      return params.toString();
    },
    [searchParams],
  );

  const changeEmailFilter = useCallback(
    async (newEmail: string) => {
      router.push(`${pathname}?${createQueryString(newEmail)}`);
    },
    [createQueryString, pathname, router],
  );

  return {
    changeEmailFilter,
    emailFilter,
  };
}
