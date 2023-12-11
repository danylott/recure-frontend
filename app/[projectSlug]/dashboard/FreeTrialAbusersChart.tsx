'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Card } from 'antd';
import { createDashboardConfig } from '@/app/[projectSlug]/dashboard/utils';
import { FreeTrialAbuser } from '@/app/[projectSlug]/dashboard/interfaces';

const AreaChart = dynamic(() => import('@ant-design/plots').then(({ Area }) => Area),
  { ssr: false });

interface Props {
  data: FreeTrialAbuser[];
}

export default function FreeTrialAbusersChart({ data }: Props) {
  const config = createDashboardConfig(data, 'free_trial_abusers');

  return (
    <Card>
      <h2 className='text-left'>Free Trial Abusers</h2>
      <AreaChart
        {...config}
      />
    </Card>
  );
}
