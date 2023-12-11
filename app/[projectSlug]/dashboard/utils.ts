import { getAuthServer } from '@/utils/authServerRequests';
import {
  AccountSharer,
  CreatedAccount,
  FlaggedAccount,
  FlaggedAccounts,
  FreeTrialAbuser,
  RecentActivity,
} from '@/app/[projectSlug]/dashboard/interfaces';

export async function getRecentActivityData(projectSlug: string) {
  const res = await getAuthServer(`/api/dashboard/recent_activity/?project_slug=${projectSlug}`);

  const recentActivityData: RecentActivity = (
    await res.json()
  );

  return recentActivityData;
}

export async function getFlaggedAccountsData(projectSlug: string) {
  const res = await getAuthServer(`/api/dashboard/flagged_accounts_list/?project_slug=${projectSlug}`);

  const flaggedAccountsData: FlaggedAccounts = (
    await res.json()
  );

  return flaggedAccountsData;
}

export async function getAccountSharersData(projectSlug: string) {
  const res = await getAuthServer(`/api/dashboard/account_sharers_distribution/?project_slug=${projectSlug}`);

  const accountSharersData: { account_sharers: AccountSharer[] } = (
    await res.json()
  );

  return accountSharersData.account_sharers;
}

export async function getFreeTrialAbusersData(projectSlug: string) {
  const res = await getAuthServer(`/api/dashboard/free_trial_abusers_distribution/?project_slug=${projectSlug}`);

  const freeTrialAbusersData: { free_trial_abusers: FreeTrialAbuser[] } = (
    await res.json()
  );

  return freeTrialAbusersData.free_trial_abusers;
}

export async function getTotalAccounts(projectSlug: string) {
  const res = await getAuthServer(`/api/dashboard/created_users_distribution/?project_slug=${projectSlug}`);

  const totalAccountsData: { created_users: CreatedAccount[] } = (
    await res.json()
  );

  return totalAccountsData.created_users;
}

export async function getFlaggedAccountsDistribution(projectSlug: string) {
  const res = await getAuthServer(`/api/dashboard/flagged_accounts_distribution/?project_slug=${projectSlug}`);

  const flaggedAccountsDistributionData: {
    flagged_accounts: FlaggedAccount[];
  } = await res.json();

  return flaggedAccountsDistributionData.flagged_accounts;
}

export function getLastItemByKey(
  keyName: string, array: Array<any>,
): number {
  if (array && array.length > 0) {
    return array[array.length - 1][keyName];
  }

  return 0;
}

export function createDashboardConfig(data: Array<any>, yField: string) {
  return {
    data,
    smooth: true,
    xField: 'date',
    yField,
    color: '#00A2FF',
    point: {
      size: 3,
      shape: 'circle',
    },
    meta: {
      date: {
        range: [0, 1],
      },
      count: {
        min: 0,
      },
    },
  };
}

export function extractRelativePath(url: string) {
  const apiIndex = url.indexOf('/api/');

  return url.slice(apiIndex);
}
