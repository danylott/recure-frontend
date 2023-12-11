import React from 'react';
import { hasRequiredPermission } from '@/app/[projectSlug]/utils';
import { getWebhooksData } from '@/app/[projectSlug]/webhooks/utils';
import WebhooksTable from '@/app/[projectSlug]/webhooks/WebhooksTable';
import NoPaidSubscriptionPage from '@/app/[projectSlug]/NoPaidSubscriptionPage';
import { UserPlanPermissions } from '../UserPlanPermissions';

interface Params {
  params: {
    projectSlug: string;
  };
}

export default async function ProjectWebhooksPage({ params }: Params) {
  const hasWebhooksPermission = await hasRequiredPermission(
    UserPlanPermissions.WebhooksUsage,
  );

  if (!hasWebhooksPermission) {
    return <NoPaidSubscriptionPage />;
  }

  const { projectSlug } = params;
  const webhooksData = await getWebhooksData(projectSlug);

  return (
    <WebhooksTable webhooksData={webhooksData} projectSlug={projectSlug} />
  );
}
