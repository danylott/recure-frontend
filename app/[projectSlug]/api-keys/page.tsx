import ApiKeysTable from '@/app/[projectSlug]/api-keys/ApiKeysTable';
import { getApiKeysData } from '@/app/[projectSlug]/api-keys/utils';

interface Params {
  params: {
    projectSlug: string;
  };
}

export default async function ProjectApiKeysPage({ params }: Params) {
  const { projectSlug } = params;
  const apiKeysData = await getApiKeysData(projectSlug);

  return (
    <ApiKeysTable apiKeysData={apiKeysData} />
  );
}
