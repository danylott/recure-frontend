import { getAuthServer } from '@/utils/authServerRequests';
import {
  DeviceAccounts,
  DeviceUsageByAccount,
} from '@/app/[projectSlug]/devices/[deviceId]/interfaces';

export async function getDeviceUsageByAccount(
  projectSlug: string, deviceId: string,
) {
  const result = await getAuthServer(
    `/api/projects/${projectSlug}/devices/${deviceId}/device_usage_by_accounts/`,
  );

  const deviceUsageByAccounts: DeviceUsageByAccount[] = (
    await result.json()
  );

  return deviceUsageByAccounts;
}

export async function getDeviceAccounts(
  projectSlug: string, deviceId: string, page: number,
) {
  const result = await getAuthServer(
    `/api/projects/${projectSlug}/devices/${deviceId}/accounts/?page=${page}`,
  );

  const deviceAccounts: DeviceAccounts = (
    await result.json()
  );

  return deviceAccounts;
}
