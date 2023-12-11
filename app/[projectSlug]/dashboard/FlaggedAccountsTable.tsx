'use client';

import { ColumnsType } from 'antd/es/table';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Button, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  FlaggedAccountItem,
  FlaggedAccounts,
} from '@/app/[projectSlug]/dashboard/interfaces';
import { createFormattedDate } from '@/app/[projectSlug]/utils';
import { get } from '@/utils/requests';
import {
  blurredAccountDataBlock,
} from '@/app/[projectSlug]/blurredAccountDataBlock';

interface ColumnProps {
  hasAccountPersonalDataPermission: boolean;
}

const columns = (
  { hasAccountPersonalDataPermission }: ColumnProps,
): ColumnsType<FlaggedAccountItem> => {
  const getAccountDataCell = (text: string) => (hasAccountPersonalDataPermission
    ? text
    : blurredAccountDataBlock);

  return [
    {
      title: 'Account',
      dataIndex: 'user_id',
      key: 'user_id',
      width: '15%',
      render: getAccountDataCell,
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      width: '25%',
      render: getAccountDataCell,
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
      width: '15%',
    },
    {
      title: 'Flag',
      key: 'flag',
      dataIndex: 'flag',
      width: '20%',
      render: (text) => <Tag color='geekblue'>{text}</Tag>,
    },
    {
      title: 'Date & Time',
      key: 'when',
      dataIndex: 'when',
      width: '25%',
      render: (when) => createFormattedDate(when),
    },
  ];
};

interface Props {
  flaggedAccountsData: FlaggedAccounts;
  projectSlug: string;
  hasAccountPersonalDataPermission: boolean;
}

export default function FlaggedAccountsTable({
  flaggedAccountsData,
  projectSlug,
  hasAccountPersonalDataPermission,
}: Props) {
  const [flaggedAccounts, setFlaggedAccounts]
    = useState<FlaggedAccounts>(flaggedAccountsData);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const { data: session } = useSession();

  const handleExportToCSV = async () => {
    const res = await get({
      url: `/api/dashboard/flagged_accounts_list_for_csv/?project_slug=${projectSlug}`,
      headers: {
        Authorization: `Bearer ${session?.access}`,
        Host: 'frontend',
      },
    });

    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      const csvContent = Papa.unparse(data);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

      saveAs(blob, 'flagged_accounts.csv');
    }
  };

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    setPage(newPage);

    const res: FlaggedAccounts = await get({
      url: `/api/dashboard/flagged_accounts_list/?project_slug=${projectSlug}&page=${newPage}`,
      headers: {
        Authorization: `Bearer ${session?.access}`,
        Host: 'frontend',
      },
    }).then((response) => response.json());

    if (res && res.results) {
      setFlaggedAccounts(res);
    }

    setLoading(false);
  };

  const router = useRouter();

  const onRow = (record: FlaggedAccountItem) => ({
    onClick: () => {
      router.push(`/${projectSlug}/accounts/${record.recure_id}`);
    },
  });

  return (
    <>
      <div className="flex items-center">
        <h2 className="mr-4">Flagged Accounts</h2>
        {
          hasAccountPersonalDataPermission && (
          <Button className="mb-2" onClick={handleExportToCSV}>
            Export to CSV
          </Button>
          )
        }
      </div>
      <Table
        columns={columns({ hasAccountPersonalDataPermission })}
        dataSource={flaggedAccounts.results}
        pagination={{
          pageSize: 10,
          total: flaggedAccounts.count,
          current: page,
          onChange: handlePageChange,
          showSizeChanger: false,
        }}
        loading={loading}
        size='middle'
        onRow={onRow}
        rowClassName='cursor-pointer'
      />
    </>
  );
}
