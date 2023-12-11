'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Card } from 'antd';
import { createDashboardConfig } from '@/app/[projectSlug]/dashboard/utils';
import { AccountSharer } from '@/app/[projectSlug]/dashboard/interfaces';

const AreaChart = dynamic(() => import('@ant-design/plots').then(({ Area }) => Area),
  { ssr: false });

interface Props {
  data: AccountSharer[];
}

export default function AccountSharersChart({ data }: Props) {
  const config = createDashboardConfig(data, 'account_sharers');

  return (
    <Card>
      <h2 className='text-left'>Account Sharers</h2>
      <AreaChart
        {...config}
      />
    </Card>
  );
}
