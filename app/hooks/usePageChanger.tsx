'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function usePageChanger() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const pageFromURL = Number(searchParams.get('page')) || 1;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const changePage = useCallback(
    async (newPage: number) => {
      const pageString = String(newPage);

      router.push(`${pathname}?${createQueryString('page', pageString)}`);
    },
    [createQueryString, pathname, router],
  );

  return {
    changePage,
    pageFromURL,
  };
}
