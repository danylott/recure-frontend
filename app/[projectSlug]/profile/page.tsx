import PersonalInformationComponent from '@/app/[projectSlug]/profile/PersonalInformationComponent';
import { getUserInformation } from '@/app/[projectSlug]/profile/utils';
import ChangePasswordComponent
  from '@/app/[projectSlug]/profile/ChangePasswordComponent';

export default async function ProfilePage() {
  const userInformation = await getUserInformation();

  return (
    <>
      <h1 className='text-2xl mb-8'>Manage your personal information</h1>
      <PersonalInformationComponent
        userInfo={userInformation}
      />
      <ChangePasswordComponent />
    </>
  );
}
