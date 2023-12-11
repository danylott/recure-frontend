'use client';

import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import Image from 'next/image';

export default function NoPaidSubscriptionPage() {
  return (
    <div className='flex flex-col items-center'>
      <Image src='/images/upgrade.png' alt='Upgrade Image' width={500} height={375} />
      <h1 className='text-4xl font-bold mt-2'>Subscription Required</h1>
      <p className='text-lg mt-4'>
        This feature is only available for users with a paid subscription.
        <br />
        Don&apos;t hesitate to contact our Sales for more information.
      </p>
      <div className='flex items-center mt-6'>
        <MailOutlined style={{ fontSize: '24px' }} />
        <span className='ml-2'>hello@recure.ai</span>
      </div>
    </div>
  );
}
