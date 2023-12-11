import { getAuthServer } from '@/utils/authServerRequests';
import { ApiKeyData } from '@/app/[projectSlug]/api-keys/ApiKeysTable';

export async function getApiKeysData(id: string) {
  const res = await getAuthServer(`/api/projects/${id}/api_keys/`);

  const apiKeysData: ApiKeyData[] = await res.json();

  return apiKeysData;
}
