'use client';

import ActivateUser from '@/app/auth/activate/ActivateUser';

interface Params {
  searchParams: {
    uid: string;
    token: string;
  };
}

export default function ActivationPage({ searchParams }: Params) {
  return (
    <ActivateUser uid={searchParams.uid} token={searchParams.token} />
  );
}
