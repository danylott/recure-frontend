'use client';

import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import {
  Account,
  Flag,
  ProjectAccounts,
} from '@/app/[projectSlug]/accounts/interfaces';
import { createFormattedDate } from '@/app/[projectSlug]/utils';
import usePageChanger from '@/app/hooks/usePageChanger';
import {
  blurredAccountDataBlock,
} from '@/app/[projectSlug]/blurredAccountDataBlock';

interface ColumnProps {
  hasAccountPersonalDataPermission: boolean;
}

const columns = (
  { hasAccountPersonalDataPermission }: ColumnProps,
): ColumnsType<Account> => {
  const getAccountDataCell = (text: string) => (hasAccountPersonalDataPermission
    ? text
    : blurredAccountDataBlock);

  return [
    {
      title: 'ID',
      dataIndex: 'original_account_id',
      key: 'original_account_id',
      width: '20%',
      render: getAccountDataCell,
    },
    {
      title: 'EMAIL',
      key: 'email',
      dataIndex: 'email',
      width: '30%',
      render: getAccountDataCell,
    },
    {
      title: 'LAST SEEN',
      dataIndex: 'last_event_timestamp',
      key: 'last_event_timestamp',
      width: '15%',
      render: (last_event_timestamp) => createFormattedDate(
        last_event_timestamp,
      ),
    },
    {
      title: 'FLAGS',
      key: 'flags',
      dataIndex: 'flags',
      width: '35%',
      render: (accountFlags: Flag[]) => {
        const flagTags = accountFlags.map((flag) => (
          <Tag key={flag.flag} color='geekblue'>
            {flag.flag}
          </Tag>
        ));

        return flagTags.length > 0
          ? flagTags
          : null;
      },
    },
  ];
};

interface Props {
  accounts: ProjectAccounts;
  projectSlug: string;
  hasAccountPersonalDataPermission: boolean;
}

export default function AllAccountsTable({
  projectSlug, accounts, hasAccountPersonalDataPermission,
}: Props) {
  const { changePage, pageFromURL } = usePageChanger();

  const router = useRouter();

  const onRow = (record: Account) => ({
    onClick: () => {
      router.push(`/${projectSlug}/accounts/${record.id}`);
    },
  });

  return (
    <Table
      columns={columns({ hasAccountPersonalDataPermission })}
      rowKey='id'
      dataSource={accounts.results}
      pagination={{
        pageSize: 10,
        total: accounts.count,
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
