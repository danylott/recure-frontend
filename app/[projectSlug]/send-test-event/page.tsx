import TestEvent from '@/app/[projectSlug]/send-test-event/TestEvent';
import { getApiKeysData } from '@/app/[projectSlug]/api-keys/utils';
import { getPublicInsecureKey } from '@/app/[projectSlug]/send-test-event/utils';

interface Params {
  params: {
    projectSlug: string;
  };
}

export default async function SendTestEvent({ params }: Params) {
  const { projectSlug } = params;
  const apiKeysData = await getApiKeysData(projectSlug);
  const publicApiKey = getPublicInsecureKey(apiKeysData);

  return <TestEvent publicApiKey={publicApiKey} projectSlug={projectSlug} />;
}
