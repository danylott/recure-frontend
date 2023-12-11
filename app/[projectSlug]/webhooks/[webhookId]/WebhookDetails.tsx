'use client';

import React, { useState } from 'react';
import { Divider, notification, Spin } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import WebhookTestEventButton from '@/app/[projectSlug]/webhooks/[webhookId]/WebhookTestEventButton';
import WebhookDeleteButton from '@/app/[projectSlug]/webhooks/[webhookId]/WebhookDeleteButton';
import WebhookEditButton from '@/app/[projectSlug]/webhooks/[webhookId]/WebhookEditButton';
import WebhookEvents from '@/app/[projectSlug]/webhooks/[webhookId]/WebhookEvents';
import { patch } from '@/utils/requests';
import { errorTemplate, infoTemplate } from '@/utils/notifications';
import { WebhookEventsHistory } from '@/app/[projectSlug]/interfaces';
import WebhookDetailForm from './WebhookDetailForm';

export interface Webhook {
  id: number;
  name: string;
  url: string;
}

interface Props {
  webhookData: Webhook;
  webhookEvents: WebhookEventsHistory;
  projectSlug: string;
  webhookId: string;
}

export default function WebhookDetail(
  {
    webhookData, webhookEvents, webhookId, projectSlug,
  }: Props,
) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const updateWebhook = async (name: string, url: string) => patch({
    url: `/api/projects/${projectSlug}/webhooks/${webhookId}/`,
    data: { name, url },
    token: session?.access,
  });

  const handleSave = async (values: { name: string; url: string }) => {
    const { name, url } = values;

    setLoading(true);
    const response = await updateWebhook(name, url);

    if (response.ok) {
      setIsEditing(false);
      router.refresh();
      setLoading(false);
      notification.info(infoTemplate('Webhook updated successfully'));
    } else {
      const responseData = await response.json();

      setLoading(false);
      notification.error(errorTemplate(JSON.stringify(responseData)));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <h2
        className='ml-4 flex justify-center'
      >
        Webhook Detail Page
        <WebhookDeleteButton
          projectSlug={projectSlug}
          webhookId={webhookId}
        />
        <WebhookEditButton
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </h2>
      <Divider type='horizontal' className='w-2/5' />
      {loading
        ? <Spin />
        : (
          <WebhookDetailForm
            isEditing={isEditing}
            handleCancel={handleCancel}
            webhookData={webhookData}
            onSave={handleSave}
          />
        )}
      {!isEditing && (
        <WebhookTestEventButton
          projectSlug={projectSlug}
          webhookId={webhookId}
        />
      )}
      <Divider type='horizontal' className='w-3/5' />
      <WebhookEvents
        webhookEvents={webhookEvents}
        projectSlug={projectSlug}
        webhookId={webhookId}
      />
    </>
  );
}
