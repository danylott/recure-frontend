import {
  convertHumanReadableFlagsToApi,
  getAccounts, getFlagNames,
} from '@/app/[projectSlug]/accounts/utils';
import AllAccounts from '@/app/[projectSlug]/accounts/AllAccounts';
import { hasRequiredPermission } from '@/app/[projectSlug]/utils';
import { UserPlanPermissions } from '@/app/[projectSlug]/UserPlanPermissions';

interface Params {
  params: {
    projectSlug: string;
  };
  searchParams: {
    page?: number;
    flags?: string;
    email?: string;
  };
}

export default async function AllAccountsPage(
  { params, searchParams }: Params,
) {
  const { projectSlug } = params;
  const page = searchParams.page || 1;
  const humanReadableFlags = searchParams.flags || '';
  const email = searchParams.email || '';

  const flags = convertHumanReadableFlagsToApi(humanReadableFlags);

  const [
    hasAccountPersonalDataPermission,
    accounts,
    flagsNames,
  ] = await Promise.all([
    hasRequiredPermission(
      UserPlanPermissions.AccountPersonalDataAccess,
    ),
    getAccounts(projectSlug, page, flags, email),
    getFlagNames(),
  ]);

  return (
    <AllAccounts
      accounts={accounts}
      projectSlug={projectSlug}
      hasAccountPersonalDataPermission={hasAccountPersonalDataPermission}
      flagNames={flagsNames}
    />
  );
}
