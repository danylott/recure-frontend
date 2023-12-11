import { getAuthServer } from '@/utils/authServerRequests';
import { DeviceList } from '@/app/[projectSlug]/devices/interfaces';

export async function getDevices(projectSlug: string, page: number) {
  const result = await getAuthServer(`/api/projects/${projectSlug}/devices/?page=${page}`);

  const devices: DeviceList = await result.json();

  return devices;
}
