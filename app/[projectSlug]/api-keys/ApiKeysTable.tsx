'use client';

import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import HideableCopyableText from '@/app/[projectSlug]/api-keys/HideableCopyableText';

export interface ApiKeyData {
  name: string;
  type: string;
  insecure_key: string;
}

const columns: ColumnsType<ApiKeyData> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
  },
  {
    title:
  <span>
    Type
    <Link href='/docs/integration/api-keys.html' target='_blank' rel="noreferrer"><QuestionCircleOutlined className="ml-2" /></Link>
  </span>,
    dataIndex: 'type',
    key: 'type',
    width: '25%',
  },
  {
    title: 'Full key',
    dataIndex: 'insecure_key',
    key: 'insecure_key',
    width: '50%',
    render: (insecureKey, record) => (
      record.type === 'PRIVATE'
        ? <HideableCopyableText text={insecureKey} />
        : <Typography.Text copyable>{insecureKey}</Typography.Text>
    ),
  },
];

interface Props {
  apiKeysData: ApiKeyData[];
}

export default function ApiKeysTable({ apiKeysData }: Props) {
  return (
    <>
      <h2 className='text-left ml-4'>Api Keys</h2>
      <Table
        size='large'
        columns={columns}
        dataSource={apiKeysData}
        rowKey={(record) => record.type}
        pagination={false}
      />
    </>
  );
}
