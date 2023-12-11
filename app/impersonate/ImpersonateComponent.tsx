'use client';

import {
  Button, Form, Input, notification, Row, Spin,
} from 'antd';
import React, { useState } from 'react';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { errorTemplate } from '@/utils/notifications';
import { redirectToDashboards } from '@/app/auth/utils';

export default function ImpersonateComponent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notificationsApi, contextHolder] = notification.useNotification();
  const { data: session } = useSession();

  async function impersonate({ email }: { email: string }) {
    setLoading(true);

    const impersonateResult = await signIn('impersonation', {
      userEmail: email,
      accessToken: session?.access,
      redirect: false,
    });

    if (!impersonateResult?.ok) {
      notificationsApi.error(errorTemplate('No such user found or you are not an admin or unknown error'));

      return;
    }

    const newSession = await getSession();

    await redirectToDashboards({
      token: newSession?.access,
      notificationsApi,
      setLoading,
      router,
    });
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }} className='text-center'>
      {contextHolder}
      <Form
        name='basic'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={impersonate}
        autoComplete='off'
      >
        <h1>Impersonate Page</h1>
        <h2>
          Your current account:
          {' '}
          {session?.user?.email || 'NO ACCOUNT'}
        </h2>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          {loading
            ? (
              <Spin className='mt-4' />
            )
            : (
              <Button type='primary' htmlType='submit' className='mt-4'>
                Impersonate
              </Button>
            )}
        </Form.Item>
      </Form>
    </Row>
  );
}
