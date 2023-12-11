'use client';

import { notification, Popconfirm } from 'antd';
import { useSession } from 'next-auth/react';
import { DeleteFilled } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { destroy } from '@/utils/requests';
import { errorTemplate, infoTemplate } from '@/utils/notifications';

interface Props {
  webhookId: string;
  projectSlug: string;
}

export default function WebhookDeleteButton(
  { webhookId, projectSlug }: Props,
) {
  const [notificationsApi, contextHolder] = notification.useNotification();
  const { data: session } = useSession();
  const router = useRouter();

  const deleteWebhook = useCallback(async () => {
    const response = await destroy({
      url: `/api/projects/${projectSlug}/webhooks/${webhookId}/`,
      data: {},
      token: session?.access,
    });

    if (response.ok) {
      notificationsApi.info(infoTemplate('Webhook deleted successfully'));
      router.push(`/${projectSlug}/webhooks`);

      return;
    }

    try {
      const responseData = await response.json();

      notificationsApi.error(
        errorTemplate(JSON.stringify(responseData)),
      );
    } catch (error) {
      notificationsApi.error(errorTemplate('An error occurred while deleting the webhook.'));
    }
  }, [webhookId, projectSlug, session, router, notificationsApi]);

  return (
    <>
      {contextHolder}
      <Popconfirm
        title="Are you sure you want to delete this webhook?"
        onConfirm={deleteWebhook}
        okText="Yes"
        cancelText="No"
      >
        <DeleteFilled className='ml-5 mt-1' />
      </Popconfirm>
    </>
  );
}
