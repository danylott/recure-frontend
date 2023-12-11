'use client';

import { FlagName, ProjectAccounts } from '@/app/[projectSlug]/accounts/interfaces';
import AllAccountsTable from '@/app/[projectSlug]/accounts/AllAccountsTable';
import FlagFilter from '@/app/[projectSlug]/accounts/FlagFilter';
import EmailSearch from '@/app/[projectSlug]/accounts/EmailSearch';

interface Props {
  accounts: ProjectAccounts;
  projectSlug: string;
  hasAccountPersonalDataPermission: boolean;
  flagNames: FlagName[];
}

export default function AllAccounts(
  {
    accounts, projectSlug, hasAccountPersonalDataPermission, flagNames,
  }: Props,
) {
  return (
    <>
      <div className='flex items-center mb-2.5'>
        <h2 className='text-left'>All Accounts</h2>
        <div className='ml-auto flex items-center'>
          <div className='mr-7'>
            <EmailSearch />
          </div>
          <div className='mr-7'>
            <FlagFilter flagNames={flagNames} />
          </div>
        </div>
      </div>
      <AllAccountsTable
        accounts={accounts}
        projectSlug={projectSlug}
        hasAccountPersonalDataPermission={hasAccountPersonalDataPermission}
      />
    </>
  );
}
