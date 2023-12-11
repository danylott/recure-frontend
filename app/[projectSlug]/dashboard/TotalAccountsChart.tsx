'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Card } from 'antd';
import { createDashboardConfig } from '@/app/[projectSlug]/dashboard/utils';
import { CreatedAccount } from '@/app/[projectSlug]/dashboard/interfaces';

const AreaChart = dynamic(() => import('@ant-design/plots').then(({ Area }) => Area),
  { ssr: false });

interface Props {
  data: CreatedAccount[];
}

export default function TotalAccountsChart({ data }: Props) {
  const config = createDashboardConfig(data, 'created_users');

  return (
    <div className='my-6'>
      <Card>
        <h2 className='text-left'>Total Accounts</h2>
        <AreaChart {...config} />
      </Card>
    </div>
  );
}
