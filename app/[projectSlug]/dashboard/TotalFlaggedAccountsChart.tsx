'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Card } from 'antd';
import { createDashboardConfig } from '@/app/[projectSlug]/dashboard/utils';
import { FlaggedAccount } from '@/app/[projectSlug]/dashboard/interfaces';

const AreaChart = dynamic(() => import('@ant-design/plots').then(({ Area }) => Area),
  { ssr: false });

interface Props {
  data: FlaggedAccount[];
}

export default function TotalFlaggedAccountsChart({ data }: Props) {
  const config = createDashboardConfig(data, 'flagged_accounts');

  return (
    <Card>
      <h2 className='text-left'>Total Flagged Accounts</h2>
      <AreaChart {...config} />
    </Card>
  );
}
