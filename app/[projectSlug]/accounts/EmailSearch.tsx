'use client';

import { Input } from 'antd';
import { useCallback } from 'react';
import useEmailSearch from './useEmailSearch';

export default function EmailSearch() {
  const { changeEmailFilter, emailFilter } = useEmailSearch();

  const handleSearch = useCallback((value: string) => {
    changeEmailFilter(value);
  }, [changeEmailFilter]);

  return (
    <Input.Search
      placeholder="Search by email"
      onSearch={handleSearch}
      enterButton
      defaultValue={emailFilter}
    />
  );
}
