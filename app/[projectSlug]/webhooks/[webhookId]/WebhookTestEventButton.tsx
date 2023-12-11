'use client';

import { Button, notification } from 'antd';
import { useSession } from 'next-auth/react';
import { SendOutlined } from '@ant-design/icons';
import React from 'react';
import { post } from '@/utils/requests';
import { infoTemplate } from '@/utils/notifications';

interface Props {
  webhookId: string;
  projectSlug: string;
}

export default function WebhookTestEventButton(
  { webhookId, projectSlug }: Props,
) {
  const [notificationsApi, contextHolder] = notification.useNotification();
  const { data: session } = useSession();

  const sendTestEvent = async () => {
    await post({
      url: `/api/projects/${projectSlug}/webhooks/${webhookId}/test_event/`,
      data: {},
      token: session?.access,
    });

    notificationsApi.info(infoTemplate('Sent test event successfully!'));
  };

  return (
    <>
      {contextHolder}
      <Button type='primary' onClick={sendTestEvent} icon={<SendOutlined />}>
        Send test event
      </Button>
    </>
  );
}
