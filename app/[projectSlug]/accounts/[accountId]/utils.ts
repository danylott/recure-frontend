import { getAuthServer } from '@/utils/authServerRequests';
import {
  AccountDetail,
  AccountDevices,
  AccountEvents,
  FlaggedGroup,
  DeviceEventsDailyStatistics,
} from '@/app/[projectSlug]/accounts/[accountId]/interfaces';

export async function getAccount(projectSlug: string, accountId: string) {
  const res = await getAuthServer(`/api/projects/${projectSlug}/accounts/${accountId}/`);

  const account: AccountDetail = (
    await res.json()
  );

  return account;
}

export async function getAccountEvents(projectSlug: string, accountId: string) {
  const res = await getAuthServer(`/api/projects/${projectSlug}/accounts/${accountId}/events`);

  const accountEvents: AccountEvents = (
    await res.json()
  );

  return accountEvents;
}

export async function getAccountFlaggedGroups(
  projectSlug: string, accountId: string,
) {
  const res = await getAuthServer(`/api/projects/${projectSlug}/accounts/${accountId}/flags`);

  const flaggedGroups: FlaggedGroup[] = (
    await res.json()
  );

  return flaggedGroups;
}

export async function getAccountDevices(
  projectSlug: string, accountId: string,
) {
  const res = await getAuthServer(`/api/projects/${projectSlug}/accounts/${accountId}/devices`);

  const devices: AccountDevices = (
    await res.json()
  );

  return devices;
}

export async function getDeviceEventsDailyStatistics(
  projectSlug: string, accountId: string,
) {
  const res = await getAuthServer(
    `/api/projects/${projectSlug}/accounts/${accountId}/device_events_daily_statistics/`,
  );

  const statistics: DeviceEventsDailyStatistics[] = (
    await res.json()
  );

  return statistics;
}

export function getLastVisitDate(accountEvents: AccountEvents) {
  return accountEvents.results[0].created_at;
}

export function getFlags(account: AccountDetail) {
  if (account.flags.length > 0) {
    return account.flags.map((f) => f.flag);
  }

  return [];
}

export function getFirstFlaggedDate(flaggedGroups: FlaggedGroup[]) {
  if (flaggedGroups.length > 0) {
    return flaggedGroups[0].created_at;
  }

  return '';
}

export function getLastFlaggedDate(flaggedGroups: FlaggedGroup[]) {
  if (flaggedGroups.length > 0) {
    return flaggedGroups[flaggedGroups.length - 1].created_at;
  }

  return '';
}
