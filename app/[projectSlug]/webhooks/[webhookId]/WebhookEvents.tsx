'use client';

import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ReloadOutlined } from '@ant-design/icons';
import { get } from '@/utils/requests';
import { TriggerTypesWithTestEvent } from '@/app/[projectSlug]/webhooks/webhook.constants';
import { formatQuery } from '@/app/[projectSlug]/webhooks/queryFormatManager';
import ResendEventButton from '@/app/[projectSlug]/webhooks/[webhookId]/WebhookResendEventButton';
import { WebhookEventStatus, WebhookEvent, WebhookEventsHistory } from '@/app/[projectSlug]/interfaces';

interface Props {
  webhookEvents: WebhookEventsHistory;
  projectSlug: string;
  webhookId: string;
}

export default function WebhookEvents(
  {
    webhookEvents,
    projectSlug,
    webhookId,
  }: Props,
) {
  const [webhookEventsHistory, setWebhookEventsHistory] = useState<
    WebhookEventsHistory
    >(webhookEvents);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const { data: session } = useSession();
  const [hoveredId, setHoveredId] = useState<null | number>(null);

  const renderStatusTag = (
    status: WebhookEventStatus,
    record: WebhookEvent,
  ) => {
    switch (status) {
      case WebhookEventStatus.FailedAfterResending:
      case WebhookEventStatus.FailedWaitingForResend:
        return hoveredId === record.id
          ? (
            <ResendEventButton
              record={record}
              projectSlug={projectSlug}
              webhookId={webhookId}
              session={session}
            />
          )
          : (
            <Tag color='red'>{status}</Tag>
          );
      case WebhookEventStatus.TotallyFailed:
        return <Tag color='red'>{status}</Tag>;
      case WebhookEventStatus.Completed:
      case WebhookEventStatus.CompletedAfterResending:
        return <Tag color='green'>{status}</Tag>;
      default:
        return <Tag color='geekblue'>{status}</Tag>;
    }
  };

  const columns: ColumnsType<WebhookEvent> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Time',
      dataIndex: 'created_at',
      key: 'trigger.payload.datetime',
      sorter: true,
      render: (_, webhook_event) => (
        webhook_event.payload.datetime?.substring(0, 19)
      ),
    },
    {
      title: 'Trigger',
      dataIndex: 'trigger.trigger_type',
      key: 'trigger.trigger_type',
      width: '25%',
      render: (_, webhook_event) => (
        <Tag color='geekblue'>
          {TriggerTypesWithTestEvent.find(
            (item) => item.triggerType === webhook_event.trigger.trigger_type,
          )?.shownName}
        </Tag>
      ),
    },
    {
      title: 'Flagged Score',
      dataIndex: 'event_score',
      key: 'event_score',
      width: '20%',
      sorter: true,
      render: (_, webhook_event) => (
        webhook_event.event_score?.toFixed(2)
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '30%',
      render: (status, record) => (
        <div
          onMouseEnter={() => setHoveredId(record.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {renderStatusTag(status, record)}
        </div>
      ),
    },

  ];

  const fetchEvents = async (newPage: number, orderBy?: string) => {
    setLoading(true);
    const orderByParam = orderBy || '-created_at';

    const res: WebhookEventsHistory = await get({
      url: `/api/projects/${projectSlug}/webhooks/${webhookId}/events/?page=${newPage}&ordering=${orderByParam}`,
      headers: {
        Authorization: `Bearer ${session?.access}`,
      },
    }).then((response) => response.json());

    if (res && res.results) {
      setWebhookEventsHistory(res);
    }

    setLoading(false);
  };

  const handleTableChange = async (
    pagination: any,
    filters: any,
    sorter: any,
  ) => {
    const { order, field } = sorter;
    const formattedQuery = formatQuery(order, field);

    await fetchEvents(page, formattedQuery);
  };

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    await fetchEvents(newPage);
  };

  const handleReload = async () => {
    await fetchEvents(page);
  };

  return (
    <>
      <h2 className='text-left ml-4'>
        Webhook Events History
        <ReloadOutlined
          className='ml-5'
          onClick={handleReload}
          spin={loading}
        />
      </h2>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={webhookEventsHistory.results}
        onChange={handleTableChange}
        pagination={{
          pageSize: 10,
          total: webhookEventsHistory.count,
          current: page,
          onChange: handlePageChange,
        }}
        loading={loading}
        expandable={{
          expandedRowRender: (event) => (
            <p>
              {(() => {
                try {
                  return JSON.stringify(event.payload, null, 2);
                } catch (error) {
                  return `Error: ${error}`;
                }
              })()}
            </p>
          ),
        }}
      />
    </>
  );
}
