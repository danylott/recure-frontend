import DeviceUsageByAccountsChart
  from '@/app/[projectSlug]/devices/[deviceId]/DeviceUsageByAccountsChart';
import {
  getDeviceAccounts,
  getDeviceUsageByAccount,
} from '@/app/[projectSlug]/devices/[deviceId]/utils';
import { hasRequiredPermission } from '@/app/[projectSlug]/utils';
import { UserPlanPermissions } from '@/app/[projectSlug]/UserPlanPermissions';
import DeviceAccountsTable
  from '@/app/[projectSlug]/devices/[deviceId]/DeviceAccountsTable';

interface Params {
  params: {
    projectSlug: string;
    deviceId: string;
  };
  searchParams: {
    page?: number;
  };
}

export default async function DevicePage({ params, searchParams }: Params) {
  const { projectSlug, deviceId } = params;

  const page = searchParams.page || 1;

  const [
    hasAccountPersonalDataPermission,
    deviceUsageByAccounts,
    deviceAccounts,
  ] = await Promise.all([
    hasRequiredPermission(UserPlanPermissions.AccountPersonalDataAccess),
    getDeviceUsageByAccount(projectSlug, deviceId),
    getDeviceAccounts(projectSlug, deviceId, page),
  ]);

  return (
    <>
      <DeviceAccountsTable
        deviceAccounts={deviceAccounts}
        projectSlug={projectSlug}
        hasAccountPersonalDataPermission={hasAccountPersonalDataPermission}
      />
      <DeviceUsageByAccountsChart
        deviceUsageByAccounts={deviceUsageByAccounts}
      />
    </>
  );
}
