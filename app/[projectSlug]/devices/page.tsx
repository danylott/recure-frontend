import { getDevices } from '@/app/[projectSlug]/devices/utils';
import DevicesTable from '@/app/[projectSlug]/devices/DevicesTable';

interface Params {
  params: {
    projectSlug: string;
  };
  searchParams: {
    page?: number;
  };
}

export default async function DevicesPage({ params, searchParams }: Params) {
  const { projectSlug } = params;
  const page = searchParams.page || 1;

  const devices = await getDevices(projectSlug, page);

  return (
    <DevicesTable devices={devices} />
  );
}
