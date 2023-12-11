'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function useFilterChanger() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const flags = searchParams.get('flags');

  const filtersFromURL = flags
    ? flags.split(',')
    : [];

  const createQueryString = useCallback(
    (filters: string[]) => {
      const params = new URLSearchParams(searchParams);

      // set page to 1 on filters change
      params.set('page', '1');
      params.set('flags', filters.join(','));

      return params.toString();
    },
    [searchParams],
  );

  const changeFilters = useCallback(
    async (newFilters: string[]) => {
      router.push(`${pathname}?${createQueryString(newFilters)}`);
    },
    [createQueryString, pathname, router],
  );

  return {
    changeFilters,
    filtersFromURL,
  };
}
