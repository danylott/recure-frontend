'use client';

import { Col, Row } from 'antd';
import React from 'react';
import {
  AccountDetail,
  AccountDevices,
  AccountEvents,
  DeviceEventsDailyStatistics,
} from '@/app/[projectSlug]/accounts/[accountId]/interfaces';
import AccountCard from '@/app/[projectSlug]/accounts/[accountId]/AccountCard';
import RecentActivityTable
  from '@/app/[projectSlug]/accounts/[accountId]/AccountRecentActivityTable';
import AccountDevicesTable
  from '@/app/[projectSlug]/accounts/[accountId]/AccountDevicesTable';
import DeviceEventsDailyStatisticsChart from '@/app/[projectSlug]/accounts/[accountId]/DeviceEventsDailyStatisticsChart';

interface Props {
  hasAccountPersonalDataPermission: boolean;
  account: AccountDetail;
  lastVisitedAt: string;
  accountFlags: Array<string>;
  firstFlaggedAt: string;
  lastFlaggedAt: string;
  accountEvents: AccountEvents;
  devices: AccountDevices;
  deviceEventsDailyStatistics: DeviceEventsDailyStatistics[];
  projectSlug: string;
  accountId: string;
}

export default function AccountProfile({
  hasAccountPersonalDataPermission,
  account,
  lastVisitedAt,
  accountFlags,
  firstFlaggedAt,
  lastFlaggedAt,
  accountEvents,
  devices,
  deviceEventsDailyStatistics,
  projectSlug,
  accountId,
}: Props) {
  return (
    <Row className='h-screen' gutter={16}>
      <Col span={8}>
        <div className='sticky top-0'>
          <AccountCard
            hasAccountPersonalDataPermission={hasAccountPersonalDataPermission}
            account={account}
            lastVisitedAt={lastVisitedAt}
            accountFlags={accountFlags}
            firstFlaggedAt={firstFlaggedAt}
            lastFlaggedAt={lastFlaggedAt}
          />
        </div>
      </Col>
      <Col span={16}>
        <div className='mb-3'>
          <h3 className='text-left'>Recent Activity</h3>
          <RecentActivityTable
            accountEvents={accountEvents}
            projectSlug={projectSlug}
            accountId={accountId}
          />
        </div>
        <div>
          <h3 className='text-left'>Devices</h3>
          <AccountDevicesTable
            devices={devices}
            projectSlug={projectSlug}
            accountId={accountId}
          />
        </div>
        <div>
          <h3 className='text-left'>Device Events Daily Statistics</h3>
          <DeviceEventsDailyStatisticsChart
            deviceEventsDailyStatistics={deviceEventsDailyStatistics}
          />
        </div>
      </Col>
    </Row>
  );
}
