import { getAuthServer } from '@/utils/authServerRequests';
import { Webhook } from '@/app/[projectSlug]/webhooks/WebhooksTable';
import { WebhookEventsHistory } from '@/app/[projectSlug]/interfaces';

export async function getWebhookDetailsData(
  projectSlug: string,
  webhookId: string,
) {
  const res = await getAuthServer(`/api/projects/${projectSlug}/webhooks/${webhookId}/`);

  const webhook: Webhook = await res.json();

  return webhook;
}

export async function getWebhookEventsHistory(
  projectSlug: string,
  webhookId: string,
) {
  const res = await getAuthServer(`/api/projects/${projectSlug}/webhooks/${webhookId}/events/?ordering=-created_at`);

  const events: WebhookEventsHistory = await res.json();

  return events;
}
