import {
  getAccount,
  getAccountDevices,
  getAccountEvents,
  getAccountFlaggedGroups,
  getDeviceEventsDailyStatistics,
  getFirstFlaggedDate,
  getFlags,
  getLastFlaggedDate,
  getLastVisitDate,
} from '@/app/[projectSlug]/accounts/[accountId]/utils';
import AccountProfile
  from '@/app/[projectSlug]/accounts/[accountId]/AccountProfile';
import { hasRequiredPermission } from '@/app/[projectSlug]/utils';
import { UserPlanPermissions } from '@/app/[projectSlug]/UserPlanPermissions';

interface Params {
  params: {
    projectSlug: string;
    accountId: string;
  };
}

export default async function AccountPage({ params }: Params) {
  const { projectSlug, accountId } = params;

  const [
    hasAccountPersonalDataPermission,
    account,
    accountEvents,
    accountFlaggedGroups,
    accountDevices,
    deviceEventsDailyStatistics,
  ] = await Promise.all([
    hasRequiredPermission(UserPlanPermissions.AccountPersonalDataAccess),
    getAccount(projectSlug, accountId),
    getAccountEvents(projectSlug, accountId),
    getAccountFlaggedGroups(projectSlug, accountId),
    getAccountDevices(projectSlug, accountId),
    getDeviceEventsDailyStatistics(projectSlug, accountId),
  ]);

  const lastVisitDate = getLastVisitDate(accountEvents);
  const flags = getFlags(account);
  const firstFlaggedTimestamp = getFirstFlaggedDate(accountFlaggedGroups);
  const lastFlaggedTimestamp = getLastFlaggedDate(accountFlaggedGroups);

  return (
    <AccountProfile
      hasAccountPersonalDataPermission={hasAccountPersonalDataPermission}
      account={account}
      lastVisitedAt={lastVisitDate}
      accountFlags={flags}
      firstFlaggedAt={firstFlaggedTimestamp}
      lastFlaggedAt={lastFlaggedTimestamp}
      accountEvents={accountEvents}
      devices={accountDevices}
      deviceEventsDailyStatistics={deviceEventsDailyStatistics}
      projectSlug={projectSlug}
      accountId={accountId}
    />
  );
}
