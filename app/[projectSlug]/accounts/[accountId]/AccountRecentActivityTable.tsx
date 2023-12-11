'use client';

import React, { useState } from 'react';
import {
  Table, Tag, Tooltip, Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSession } from 'next-auth/react';
import { createFormattedDate } from '@/app/[projectSlug]/utils';
import { get } from '@/utils/requests';
import { capitalizeFirstLetter } from '@/app/[projectSlug]/accounts/utils';
import { AccountEvents, Event } from './interfaces';

const columns: ColumnsType<Event> = [
  {
    title: 'LOCATION',
    dataIndex: ['ip_address', 'location'],
    key: 'location',
    width: '25%',
  },
  {
    title: 'DEVICE TYPE',
    dataIndex: ['device', 'device'],
    key: 'device',
    width: '20%',
  },
  {
    title: 'VPN',
    dataIndex: ['ip_address', 'is_anonymous'],
    key: 'is_anonymous',
    width: '10%',
    render: (vpn) => (vpn
      ? <Tag color='green'>TRUE</Tag>
      : <Tag color='red'>FALSE</Tag>),
  },
  {
    title: 'EVENT TYPE',
    dataIndex: 'event_type',
    key: 'event_type',
    width: '15%',
    render: (event_type) => capitalizeFirstLetter(event_type),
  },
  {
    title: 'DATE & TIME',
    dataIndex: 'created_at',
    key: 'created_at',
    width: '15%',
    render: (created_at) => createFormattedDate(created_at),
  },
  {
    title: 'DEVICE ID',
    dataIndex: ['device', 'device_id'],
    key: 'device_id',
    width: '15%',
    render: (device_id) => (
      <Tooltip title={device_id} placement='left'>
        <Typography.Text copyable={{ text: device_id }}>
          {device_id.slice(0, 5)}
        </Typography.Text>
      </Tooltip>
    ),
  },
];

interface Props {
  accountEvents: AccountEvents;
  projectSlug: string;
  accountId: string;
}

export default function RecentActivityTable({
  accountEvents,
  projectSlug,
  accountId,
}: Props) {
  const [accountEventsState, setAccountEvents]
    = useState<AccountEvents>(accountEvents);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const { data: session } = useSession();

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    setPage(newPage);

    const res: AccountEvents = await get({
      url: `/api/projects/${projectSlug}/accounts/${accountId}/events/?page=${newPage}`,
      headers: {
        Authorization: `Bearer ${session?.access}`,
        Host: 'frontend',
      },
    }).then((response) => response.json());

    if (res && res.results) {
      setAccountEvents(res);
    }

    setLoading(false);
  };

  return (
    <Table
      columns={columns}
      dataSource={accountEventsState.results}
      pagination={{
        pageSize: 5,
        total: accountEventsState.count,
        current: page,
        onChange: handlePageChange,
        showSizeChanger: false,
      }}
      loading={loading}
    />
  );
}
