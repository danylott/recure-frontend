'use client';

import React, { useState } from 'react';
import { Button, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSession } from 'next-auth/react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import {
  RecentActivity,
  RecentActivityItem,
} from '@/app/[projectSlug]/dashboard/interfaces';
import { get } from '@/utils/requests';
import { createFormattedDate } from '@/app/[projectSlug]/utils';
import { extractRelativePath } from '@/app/[projectSlug]/dashboard/utils';
import {
  blurredAccountDataBlock,
} from '@/app/[projectSlug]/blurredAccountDataBlock';

interface ColumnProps {
  hasAccountPersonalDataPermission: boolean;
}

const columns = (
  { hasAccountPersonalDataPermission }: ColumnProps,
): ColumnsType<RecentActivityItem> => [
  {
    title: 'Account',
    dataIndex: 'user_id',
    key: 'user_id',
    width: '25%',
    render: (text: string) => (hasAccountPersonalDataPermission
      ? text
      : blurredAccountDataBlock),
  },
  {
    title: 'Device',
    dataIndex: 'device',
    key: 'device',
    width: '25%',
  },
  {
    title: 'Location',
    key: 'location',
    dataIndex: 'location',
    width: '25%',
    render: (text) => <Tag color='geekblue'>{text}</Tag>,
  },
  {
    title: 'Date & Time',
    key: 'last_activity',
    dataIndex: 'last_activity',
    width: '25%',
    render: (last_activity) => createFormattedDate(last_activity),
  },
];

interface Props {
  recentActivityData: RecentActivity;
  projectSlug: string;
  hasAccountPersonalDataPermission: boolean;
}

export default function RecentActivityTable({
  recentActivityData,
  projectSlug,
  hasAccountPersonalDataPermission,
}: Props) {
  const [recentActivity, setRecentActivity]
    = useState<RecentActivity>(recentActivityData);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const getRecentActivity = async (fullUrl: string) => {
    setLoading(true);

    const url = extractRelativePath(fullUrl);

    const res: RecentActivity = await get({
      url,
      headers: {
        Authorization: `Bearer ${session?.access}`,
        Host: 'frontend',
      },
    }).then((response) => response.json());

    if (res && res.results) {
      setRecentActivity(res);
    }

    setLoading(false);
  };

  const handleNextPage = async () => {
    if (recentActivity.next) {
      await getRecentActivity(recentActivity.next);
    }
  };

  const handlePreviousPage = async () => {
    if (recentActivity.previous) {
      await getRecentActivity(recentActivity.previous);
    }
  };

  const router = useRouter();

  const onRow = (record: RecentActivityItem) => ({
    onClick: () => {
      router.push(`/${projectSlug}/accounts/${record.recure_id}`);
    },
  });

  return (
    <div>
      <Table
        columns={columns({ hasAccountPersonalDataPermission })}
        dataSource={recentActivity.results}
        pagination={false}
        loading={loading}
        size='middle'
        onRow={onRow}
        rowClassName='cursor-pointer'
      />
      <div className='mt-4 mr-5 float-right'>
        <Button
          type='primary'
          shape='circle'
          icon={<LeftOutlined />}
          onClick={handlePreviousPage}
          disabled={!recentActivity.previous}
        />
        <Button
          className='ml-2'
          type='primary'
          shape='circle'
          icon={<RightOutlined />}
          onClick={handleNextPage}
          disabled={!recentActivity.next}
        />
      </div>
    </div>
  );
}
