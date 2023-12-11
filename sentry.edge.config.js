// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever middleware or an Edge route handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const USE_SENTRY = Boolean(Number(process.env.USE_SENTRY || process.env.NEXT_PUBLIC_USE_SENTRY || '1'));

if (USE_SENTRY) {
  Sentry.init({
    dsn: SENTRY_DSN || 'https://064d74c4cc044223a1ad18544933f75f@o4504371870433280.ingest.sentry.io/4505005513703424',
    // Adjust this value in production, or use tracesSampler for greater control
    sampleRate: 1.0,
    tracesSampleRate: 0.001,
    debug: true,
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
  });
}
