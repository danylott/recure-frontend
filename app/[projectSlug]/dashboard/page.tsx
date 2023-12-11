import { redirect } from 'next/navigation';
import {
  getAccountSharersData,
  getFlaggedAccountsData,
  getFlaggedAccountsDistribution,
  getFreeTrialAbusersData,
  getLastItemByKey,
  getRecentActivityData,
  getTotalAccounts,
} from '@/app/[projectSlug]/dashboard/utils';
import TotalAccountsChart
  from '@/app/[projectSlug]/dashboard/TotalAccountsChart';
import TotalAccountInfo from '@/app/[projectSlug]/dashboard/TotalAccountInfo';
import AccountSharersChart
  from '@/app/[projectSlug]/dashboard/AccountSharersChart';
import FreeTrialAbusersChart
  from '@/app/[projectSlug]/dashboard/FreeTrialAbusersChart';
import TotalFlaggedAccountsChart
  from '@/app/[projectSlug]/dashboard/TotalFlaggedAccountsChart';
import FlaggedAccountsTable
  from '@/app/[projectSlug]/dashboard/FlaggedAccountsTable';
import RecentActivityTable
  from '@/app/[projectSlug]/dashboard/DashboardRecentActivityTable';
import { hasRequiredPermission } from '@/app/[projectSlug]/utils';
import { UserPlanPermissions } from '@/app/[projectSlug]/UserPlanPermissions';

interface Params {
  params: {
    projectSlug: string;
  };
}

export default async function DashboardPage({ params }: Params) {
  const { projectSlug } = params;

  const [
    hasAccountPersonalDataPermission,
    totalAccountsData,
    accountSharersData,
    freeTrialAbusersData,
    flaggedAccountsDistribution,
    flaggedAccountsData,
    recentActivityData,
  ] = await Promise.all([
    hasRequiredPermission(UserPlanPermissions.AccountPersonalDataAccess),
    getTotalAccounts(projectSlug),
    getAccountSharersData(projectSlug),
    getFreeTrialAbusersData(projectSlug),
    getFlaggedAccountsDistribution(projectSlug),
    getFlaggedAccountsData(projectSlug),
    getRecentActivityData(projectSlug),
  ]);

  if (recentActivityData.results.length === 0) {
    redirect(`/${projectSlug}/send-test-event`);
  }

  const totalAccountsNumber = getLastItemByKey('created_users', totalAccountsData);
  const accountSharersTotal = getLastItemByKey('account_sharers', accountSharersData);
  const freeTrialAbusersTotal = getLastItemByKey('free_trial_abusers', freeTrialAbusersData);

  return (
    <>
      <TotalAccountInfo
        accountSharersTotal={accountSharersTotal}
        freeTrialAbusersTotal={freeTrialAbusersTotal}
        totalAccounts={totalAccountsNumber}
      />
      <TotalAccountsChart data={totalAccountsData} />
      <div className='text-center my-6'>
        <div className='inline-block w-1/2 pr-1.5'>
          <AccountSharersChart data={accountSharersData} />
        </div>
        <div className='inline-block w-1/2 pl-1.5'>
          <FreeTrialAbusersChart data={freeTrialAbusersData} />
        </div>
      </div>
      <TotalFlaggedAccountsChart data={flaggedAccountsDistribution} />
      <div className='my-6'>
        <h2 className='text-left'>Recent Activity</h2>
        <RecentActivityTable
          hasAccountPersonalDataPermission={hasAccountPersonalDataPermission}
          recentActivityData={recentActivityData}
          projectSlug={projectSlug}
        />
      </div>
      <div className='mt-10'>
        <FlaggedAccountsTable
          hasAccountPersonalDataPermission={hasAccountPersonalDataPermission}
          flaggedAccountsData={flaggedAccountsData}
          projectSlug={projectSlug}
        />
      </div>
    </>
  );
}
