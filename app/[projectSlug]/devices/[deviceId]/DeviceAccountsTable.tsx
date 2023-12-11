'use client';

import { Table } from 'antd';
import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import {
  DeviceAccount,
  DeviceAccounts,
} from '@/app/[projectSlug]/devices/[deviceId]/interfaces';
import {
  blurredAccountDataBlock,
} from '@/app/[projectSlug]/blurredAccountDataBlock';
import usePageChanger from '@/app/hooks/usePageChanger';

interface ColumnProps {
  hasAccountPersonalDataPermission: boolean;
}

const columns = (
  { hasAccountPersonalDataPermission }: ColumnProps,
): ColumnsType<DeviceAccount> => {
  const getAccountDataCell = (text: string) => (hasAccountPersonalDataPermission
    ? text
    : blurredAccountDataBlock);

  return [
    {
      title: 'ID',
      dataIndex: 'original_account_id',
      key: 'original_account_id',
      width: '33%',
      render: getAccountDataCell,
    },
    {
      title: 'EMAIL',
      key: 'email',
      dataIndex: 'email',
      width: '34%',
      render: getAccountDataCell,
    },
    {
      title: 'NUMBER OF DEVICES',
      key: 'num_devices',
      dataIndex: 'num_devices',
      width: '33%',
    },
  ];
};

interface Props {
  deviceAccounts: DeviceAccounts;
  projectSlug: string;
  hasAccountPersonalDataPermission: boolean;
}

export default function DeviceAccountsTable({
  deviceAccounts,
  projectSlug,
  hasAccountPersonalDataPermission,
}: Props) {
  const { changePage, pageFromURL } = usePageChanger();

  const router = useRouter();

  const onRow = (record: DeviceAccount) => ({
    onClick: () => {
      router.push(`/${projectSlug}/accounts/${record.id}`);
    },
  });

  return (
    <Table
      columns={columns({ hasAccountPersonalDataPermission })}
      dataSource={deviceAccounts.results}
      pagination={{
        pageSize: 10,
        total: deviceAccounts.count,
        current: pageFromURL,
        onChange: changePage,
        showSizeChanger: false,
      }}
      size='middle'
      onRow={onRow}
      rowClassName='cursor-pointer'
    />
  );
}
