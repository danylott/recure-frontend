import { ApiKeyData } from '@/app/[projectSlug]/api-keys/ApiKeysTable';

export function getPublicInsecureKey(apiKeys: ApiKeyData[]): string {
  const publicKeyObject = apiKeys.find((item) => item.type === 'PUBLIC');

  if (!publicKeyObject || !publicKeyObject.insecure_key) {
    throw new Error('Unable to find public insecure key.');
  }

  return publicKeyObject.insecure_key;
}
