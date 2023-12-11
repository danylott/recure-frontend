'use client';

import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Device, DeviceList } from '@/app/[projectSlug]/devices/interfaces';
import usePageChanger from '@/app/hooks/usePageChanger';
import { createFormattedDate } from '@/app/[projectSlug]/utils';

const columns: ColumnsType<Device> = [
  {
    title: 'DEVICE ID',
    dataIndex: 'device_id',
    key: 'device_id',
    width: '25%',
  },
  {
    title: 'NUMBER OF ACCOUNTS',
    dataIndex: 'number_of_accounts',
    key: 'number_of_accounts',
    width: '25%',
  },
  {
    title: 'TOTAL EVENTS',
    key: 'total_events',
    dataIndex: 'total_events',
    width: '25%',
  },
  {
    title: 'LAST EVENT',
    key: 'last_event',
    dataIndex: 'last_event',
    width: '25%',
    render: (last_event) => createFormattedDate(last_event),
  },
];

interface Props {
  devices: DeviceList;
}

export default function DevicesTable({
  devices,
}: Props) {
  const { changePage, pageFromURL } = usePageChanger();

  return (
    <Table
      columns={columns}
      dataSource={devices.results}
      pagination={{
        pageSize: 10,
        total: devices.count,
        current: pageFromURL,
        onChange: changePage,
        showSizeChanger: false,
      }}
      size='middle'
      rowClassName='cursor-pointer'
    />
  );
}
