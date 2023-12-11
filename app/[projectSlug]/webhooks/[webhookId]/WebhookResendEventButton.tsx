'use client';

import { Button, notification } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import React, { useState, useCallback } from 'react';
import { Session } from 'next-auth';
import { post } from '@/utils/requests';
import { infoTemplate } from '@/utils/notifications';
import { WebhookEventStatus, WebhookEvent } from '@/app/[projectSlug]/interfaces';

interface Props {
  record: WebhookEvent;
  projectSlug: string;
  webhookId: string;
  session?: Session | null;
}

export default function ResendEventButton({
  record,
  projectSlug,
  webhookId,
  session,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [notificationsApi, contextHolder] = notification.useNotification();

  const handleResend = useCallback(async () => {
    setLoading(true);

    const response = await post({
      url: `/api/projects/${projectSlug}/webhooks/${webhookId}/events/${record.id}/resend_event/`,
      data: {},
      token: session?.access,
    });

    if (response.ok) {
      notificationsApi.info(infoTemplate('Event resent successfully!'));
    } else {
      notificationsApi.error(infoTemplate('Event resent failed!'));
    }

    setLoading(false);
  }, [projectSlug, webhookId, record.id, session?.access, notificationsApi]);

  const { status } = record;

  switch (status) {
    case WebhookEventStatus.FailedAfterResending:
    case WebhookEventStatus.FailedWaitingForResend:
      return (
        <>
          {contextHolder}
          <Button
            type="primary"
            size="small"
            icon={<SendOutlined />}
            loading={loading}
            onClick={handleResend}
            className="w-1/2"
            danger
          >
            Try again
          </Button>
        </>
      );
    default:
      return null;
  }
}
