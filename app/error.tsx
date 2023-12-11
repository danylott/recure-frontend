'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function Error({
  error,
}: {
  error: Error;
}) {
  const reportSentry = async (e: Error) => {
    await Sentry.captureException(e);
  };

  useEffect(() => {
    reportSentry(error);
  }, [error]);

  return (
    <div>
      <h1>
        Something wrong happened.
      </h1>
    </div>
  );
}
