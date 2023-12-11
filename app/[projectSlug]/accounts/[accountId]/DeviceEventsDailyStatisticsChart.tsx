'use client';

import dynamic from 'next/dynamic';
import { DeviceEventsDailyStatistics } from '@/app/[projectSlug]/accounts/[accountId]/interfaces';

const ColumnChart = dynamic(() => import('@ant-design/plots').then(({ Column }) => Column),
  { ssr: false });

interface Props {
  deviceEventsDailyStatistics: DeviceEventsDailyStatistics[];
}

export default function DeviceEventsDailyStatisticsChart({
  deviceEventsDailyStatistics,
}: Props) {
  const data = deviceEventsDailyStatistics.map((deviceStatistic) => ({
    date: deviceStatistic.date,
    eventCount: deviceStatistic.event_count,
    deviceId: deviceStatistic.device_id.slice(0, 5),
  }));

  const config = {
    data,
    isStack: true,
    xField: 'date',
    yField: 'eventCount',
    seriesField: 'deviceId',
  };

  return <ColumnChart {...config} />;
}
