'use client';

import dynamic from 'next/dynamic';
import {
  DeviceUsageByAccount,
} from '@/app/[projectSlug]/devices/[deviceId]/interfaces';

const ColumnChart = dynamic(() => import('@ant-design/plots').then(({ Column }) => Column),
  { ssr: false });

interface Props {
  deviceUsageByAccounts: DeviceUsageByAccount[];
}

export default function DeviceUsageByAccountsChart(
  { deviceUsageByAccounts }: Props,
) {
  const config = {
    data: deviceUsageByAccounts,
    xField: 'date',
    yField: 'event_count',
    seriesField: 'account_email',
  };

  return (
    <ColumnChart {...config} />
  );
}
