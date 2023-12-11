'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { UserActivationStatus } from '@/app/auth/activate/enums';
import { post } from '@/utils/requests';

interface Props {
  uid: string;
  token: string;
}

export default function ActivateUser({ uid, token }: Props) {
  const [activationStatus, setActivationStatus] = useState<
    UserActivationStatus
    >(UserActivationStatus.PENDING);

  const activateUser = useCallback(
    async () => {
      const response = await post({
        url: '/api/users/activation/',
        data: { uid, token },
      });

      if (response.ok) {
        setActivationStatus(UserActivationStatus.SUCCESS);

        return;
      }

      setActivationStatus(UserActivationStatus.FAILURE);
    }, [],
  );

  useEffect(() => {
    activateUser();
  }, [uid, token]);

  switch (activationStatus) {
    case UserActivationStatus.SUCCESS:
      return (
        <div className='text-center mt-10'>
          <h2>Your account has been activated!</h2>
          <Button type='primary'>
            <Link href='/auth/signin'>Go to Login Page</Link>
          </Button>
        </div>
      );
    case UserActivationStatus.FAILURE:
      return (
        <div className='text-center mt-10'>
          <h1>Account Activation Failed.</h1>
        </div>
      );
    default:
      return null;
  }
}
