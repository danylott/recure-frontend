import React from 'react';
import {
  getWebhookDetailsData,
  getWebhookEventsHistory,
} from '@/app/[projectSlug]/webhooks/[webhookId]/utils';
import WebhookDetail
  from '@/app/[projectSlug]/webhooks/[webhookId]/WebhookDetails';
import { hasRequiredPermission } from '@/app/[projectSlug]/utils';
import { UserPlanPermissions } from '@/app/[projectSlug]/UserPlanPermissions';
import NoPaidSubscriptionPage from '@/app/[projectSlug]/NoPaidSubscriptionPage';

interface Params {
  params: {
    projectSlug: string;
    webhookId: string;
  };
}

export default async function WebhookDetailPage({ params }: Params) {
  const hasWebhooksPermission = await hasRequiredPermission(
    UserPlanPermissions.WebhooksUsage,
  );

  if (!hasWebhooksPermission) {
    return <NoPaidSubscriptionPage />;
  }

  const { projectSlug, webhookId } = params;

  const [
    webhookData,
    webhookEvents,
  ] = await Promise.all([
    getWebhookDetailsData(projectSlug, webhookId),
    getWebhookEventsHistory(projectSlug, webhookId),
  ]);

  return (
    <WebhookDetail
      webhookData={webhookData}
      webhookEvents={webhookEvents}
      projectSlug={projectSlug}
      webhookId={webhookId}
    />
  );
}
