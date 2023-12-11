'use client';

import {
  Avatar, Card, Divider, List, Tooltip,
} from 'antd';
import { EyeInvisibleOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import {
  AccountDetail,
} from '@/app/[projectSlug]/accounts/[accountId]/interfaces';
import { createFormattedDate } from '@/app/[projectSlug]/utils';

interface Props {
  hasAccountPersonalDataPermission: boolean;
  account: AccountDetail;
  lastVisitedAt: string;
  accountFlags: Array<string>;
  firstFlaggedAt: string;
  lastFlaggedAt: string;
}

export default function AccountCard({
  hasAccountPersonalDataPermission,
  account,
  lastVisitedAt,
  accountFlags,
  firstFlaggedAt,
  lastFlaggedAt,
}: Props) {
  const {
    original_account_id, first_name, last_name, email, created_at,
  } = account;

  const createdAt = createFormattedDate(created_at);
  const lastVisitDate = createFormattedDate(lastVisitedAt);
  const firstFlaggedDate = createFormattedDate(firstFlaggedAt);
  const lastFlaggedDate = createFormattedDate(lastFlaggedAt);

  const data = [
    { name: 'Account ID', value: original_account_id },
    { name: 'Created at', value: createdAt },
    { name: 'Last visit', value: lastVisitDate },
    {
      name: 'Flags',
      value: accountFlags.length
        ? accountFlags.join(', ')
        : 'No Flags',
    },
  ];

  if (firstFlaggedAt !== '') {
    data.push(
      { name: 'First flagged at', value: firstFlaggedDate },
      { name: 'Last flagged at', value: lastFlaggedDate },
    );
  }

  const blurredAccountIdBlock = (
    <Tooltip title='Subscription Required'>
      <div className='flex'>
        <div className='flex-1 bg-gray-300 blur-sm mr-3' />
        <EyeInvisibleOutlined className='ml-1' />
      </div>
    </Tooltip>
  );

  return (
    <Card className='h-full'>
      <div className='flex flex-col items-center'>
        <Avatar size={100} icon={<UserOutlined />} />
        {
          hasAccountPersonalDataPermission && (
          <div className='mt-4'>
            <div className='font-bold text-xl'>
              { first_name }
              { ' ' }
              { last_name }
            </div>
            <div className='text-sm'>{email}</div>
          </div>
          )
        }
      </div>
      <Divider />
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item className='my-6'>
            <div className='text-left w-2/5 text-zinc-500 font-bold'>{item.name}</div>
            <div className='text-left w-3/5 text-black font-bold'>
              {
                (item.name === 'Account ID' && !hasAccountPersonalDataPermission)
                  ? blurredAccountIdBlock
                  : item.value
              }
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}
