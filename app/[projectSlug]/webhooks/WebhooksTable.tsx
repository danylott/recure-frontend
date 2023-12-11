'use client';

import {
  FloatButton, notification, Table, Tag,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { post } from '@/utils/requests';
import { errorTemplate, infoTemplate } from '@/utils/notifications';
import CreateWebhookModal, { WebhookFormData } from '@/app/[projectSlug]/webhooks/CreateWebhookModal';
import { TriggerTypes } from '@/app/[projectSlug]/webhooks/webhook.constants';

export interface WebhookTrigger {
  id: number;
  trigger_type: string;
  flagged_score_threshold: number;
}

export interface Webhook {
  id: number;
  name: string;
  url: string;
  webhook_triggers: WebhookTrigger[];
}

interface Props {
  webhooksData: Webhook[];
  projectSlug: string;
}

export default function WebhooksTable({ webhooksData, projectSlug }: Props) {
  const columns: ColumnsType<Webhook> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, webhook) => (
        <Link href={`/${projectSlug}/webhooks/${webhook.id}`}>
          {webhook.name}
        </Link>
      ),
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Triggers',
      dataIndex: 'webhook_triggers',
      key: 'webhook_triggers',
      width: '50%',
      render: (_, webhook) => (
        webhook.webhook_triggers
          .map((trigger) => (
            <Tag color='geekblue' key={trigger.id}>
              {TriggerTypes.find(
                (item) => item.triggerType === trigger.trigger_type,
              )?.shownName}
            </Tag>
          ))
      ),
    },
  ];

  const [notificationsApi, contextHolder] = notification.useNotification();
  const [
    createWebhookModalVisible, setCreateWebhookModalVisible,
  ] = useState(false);

  const { data: session } = useSession();

  const createWebhook = async (values: WebhookFormData) => {
    const response = await post({
      url: `/api/projects/${projectSlug}/webhooks/`,
      data: values,
      token: session?.access,
    });

    setCreateWebhookModalVisible(false);

    const responseData = await response.json();

    if (response.ok) {
      notificationsApi.info(infoTemplate('Webhook created successfully'));

      return;
    }

    notificationsApi.error(
      errorTemplate(JSON.stringify(responseData)),
    );
  };

  const showModal = useCallback(() => {
    setCreateWebhookModalVisible(true);
  }, []);

  return (
    <>
      {contextHolder}
      <h2 className='text-left ml-4'>
        Webhooks
        <Link href='/docs/webhooks.html' target='_blank' rel="noreferrer">
          <QuestionCircleOutlined
            className="ml-2"
          />
        </Link>
      </h2>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={webhooksData}
        pagination={false}
      />
      <FloatButton
        type='primary'
        icon={<PlusOutlined />}
        className='mr-10'
        onClick={showModal}
      />
      <CreateWebhookModal
        isCreateWebhookModalVisible={createWebhookModalVisible}
        setIsCreateWebhookModalVisible={setCreateWebhookModalVisible}
        handleCreateWebhook={createWebhook}
      />
    </>
  );
}
