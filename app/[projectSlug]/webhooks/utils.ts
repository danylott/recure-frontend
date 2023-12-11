import { getAuthServer } from '@/utils/authServerRequests';
import { Webhook } from '@/app/[projectSlug]/webhooks/WebhooksTable';

export async function getWebhooksData(id: string) {
  const res = await getAuthServer(`/api/projects/${id}/webhooks/`);

  const webhooks: Webhook[] = await res.json();

  return webhooks;
}
