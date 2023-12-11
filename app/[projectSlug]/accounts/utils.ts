import { getAuthServer } from '@/utils/authServerRequests';
import { FlagName, ProjectAccounts } from '@/app/[projectSlug]/accounts/interfaces';

export async function getAccounts(
  projectSlug: string,
  page: number,
  flags: string,
  email: string,
) {
  const res = await getAuthServer(`/api/projects/${projectSlug}/accounts/?page=${page}&flags=${flags}&email=${email}`);

  const account: ProjectAccounts = (
    await res.json()
  );

  return account;
}

export async function getFlagNames() {
  const res = await getAuthServer('/api/flags/');

  const flags: FlagName[] = await res.json();

  return flags;
}

function dashStringToUpperCaseDownSlashes(input: string) {
  return input.toUpperCase().replace(/-/g, '_');
}

export function convertHumanReadableFlagsToApi(flags: string) {
  const apiFlags: string[] = flags.split(',').map(
    (flag) => dashStringToUpperCaseDownSlashes(flag),
  );

  return apiFlags.join(',');
}

export function capitalizeFirstLetter(input: string) {
  if (input) {
    return input.charAt(0) + input.slice(1).toLowerCase();
  }

  return input;
}
