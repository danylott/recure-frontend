'use client';

import { Button, Checkbox, Popover } from 'antd';
import { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import useFilterChanger from '@/app/[projectSlug]/accounts/useFilterChanger';
import { FlagName } from '@/app/[projectSlug]/accounts/interfaces';
import { capitalizeFirstLetter } from '@/app/[projectSlug]/accounts/utils';

interface FilterOption {
  label: string;
  value: string;
}

interface Props {
  flagNames: FlagName[];
}

export default function FlagFilter({ flagNames }: Props) {
  const { changeFilters, filtersFromURL } = useFilterChanger();
  const [
    selectedFilters, setSelectedFilters,
  ] = useState<string[]>(filtersFromURL);
  const [visible, setVisible] = useState<boolean>(false);

  const filterOptions: FilterOption[] = flagNames.map((flag) => ({
    label: capitalizeFirstLetter(flag.name.replace(/_/g, ' ')),
    value: flag.name.toLowerCase().replace(/_/g, '-'),
  }));

  const handleFilterChange = (e: CheckboxChangeEvent): void => {
    if (e.target.checked) {
      setSelectedFilters([...selectedFilters, e.target.value]);
    } else {
      setSelectedFilters(selectedFilters.filter(
        (filter) => filter !== e.target.value,
      ));
    }
  };

  const applyFilters = (): void => {
    changeFilters(selectedFilters);
    setVisible(false);
  };

  const handleVisibleChange = (visibility: boolean): void => {
    setVisible(visibility);
  };

  const filterCount = selectedFilters.length;

  const content = (
    <div>
      {filterOptions.map((filterOption) => (
        <div className='block' key={filterOption.value}>
          <Checkbox
            value={filterOption.value}
            onChange={handleFilterChange}
            checked={selectedFilters.includes(filterOption.value)}
            // doesn't work using tailwind
            style={{ lineHeight: '2.5rem' }}
          >
            {filterOption.label}
          </Checkbox>
        </div>
      ))}
      <Button
        type='primary'
        onClick={applyFilters}
        className='mt-2.5'
      >
        Select Filters
      </Button>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger='click'
      open={visible}
      onOpenChange={handleVisibleChange}
      placement='bottom'
    >
      <Button>
        Filters
        {filterCount > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
            {filterCount}
          </span>
        )}
      </Button>
    </Popover>
  );
}
