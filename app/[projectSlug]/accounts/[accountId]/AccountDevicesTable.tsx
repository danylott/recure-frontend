'use client';

import React, { useState } from 'react';
import { Table, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSession } from 'next-auth/react';
import {
  AndroidOutlined,
  AppleOutlined,
  ChromeOutlined,
  QuestionCircleOutlined,
  WindowsOutlined,
} from '@ant-design/icons';
import { BsUbuntu } from 'react-icons/bs';
import { get } from '@/utils/requests';
import { createFormattedDate } from '@/app/[projectSlug]/utils';
import { AccountDevices, Device } from './interfaces';

const getOSIcon = (os: string) => {
  switch (os.toLowerCase()) {
    case 'ubuntu':
    case 'linux':
      return <BsUbuntu />;
    case 'mac os x':
    case 'ios':
    case 'iPadOS':
      return <AppleOutlined />;
    case 'chrome os':
      return <ChromeOutlined />;
    case 'windows':
      return <WindowsOutlined />;
    case 'android':
      return <AndroidOutlined />;
    default:
      return <QuestionCircleOutlined />;
  }
};

const columns: ColumnsType<Device> = [
  {
    title: 'OS',
    dataIndex: 'operating_system',
    key: 'OS',
    width: '15%',
    render: (text) => (
      <Tooltip title={text} placement='right'>
        <span className="text-2xl">
          {getOSIcon(text)}
        </span>
      </Tooltip>
    ),
  },
  {
    title: 'LOCATION',
    dataIndex: 'location',
    key: 'location',
    width: '20%',
  },
  {
    title: 'FIRST VISIT',
    dataIndex: 'first_visit',
    key: 'first_visit',
    width: '25%',
    render: (first_visit) => createFormattedDate(first_visit),
  },
  {
    title: 'LAST VISIT',
    dataIndex: 'last_visit',
    key: 'last_visit',
    width: '25%',
    render: (last_visit) => createFormattedDate(last_visit),
  },
  {
    title: 'DEVICE ID',
    dataIndex: 'device_id',
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
  devices: AccountDevices;
  projectSlug: string;
  accountId: string;
}

export default function AccountDevicesTable({
  devices,
  projectSlug,
  accountId,
}: Props) {
  const [devicesState, setDevices]
    = useState<AccountDevices>(devices);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const { data: session } = useSession();

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    setPage(newPage);

    const res: AccountDevices = await get({
      url: `/api/projects/${projectSlug}/accounts/${accountId}/devices/?page=${newPage}`,
      headers: {
        Authorization: `Bearer ${session?.access}`,
        Host: 'frontend',
      },
    }).then((response) => response.json());

    if (res && res.results) {
      setDevices(res);
    }

    setLoading(false);
  };

  return (
    <Table
      columns={columns}
      dataSource={devicesState.results}
      rowKey='device_id'
      pagination={{
        pageSize: 5,
        total: devicesState.count,
        current: page,
        onChange: handlePageChange,
        showSizeChanger: false,
      }}
      loading={loading}
    />
  );
}
