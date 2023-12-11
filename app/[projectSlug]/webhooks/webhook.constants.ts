const accountSharerDetected = {
  triggerType: 'ACCOUNT_SHARER_DETECTED',
  flaggedScoreThreshold: null,
  shownName: 'Account sharer detected',
};

const freeTrialAbuserDetected = {
  triggerType: 'FREE_TRIAL_ABUSER_DETECTED',
  flaggedScoreThreshold: null,
  shownName: 'Free trial abuser detected',
};

const multipleAccountDetected = {
  triggerType: 'MULTIPLE_ACCOUNTS_DETECTED',
  flaggedScoreThreshold: null,
  shownName: 'Multiple accounts detected',
};

const accountSharerNewDeviceUsed = {
  triggerType: 'ACCOUNT_SHARER_NEW_DEVICE_USED',
  flaggedScoreThreshold: null,
  shownName: 'Account sharer started to use new device',
};

const freeTrialNewAccountRegistered = {
  triggerType: 'FREE_TRIAL_ABUSER_NEW_ACCOUNT_REGISTERED',
  flaggedScoreThreshold: null,
  shownName: 'Free trial abuser registered new account',
};

const testEvent = {
  triggerType: 'TEST_EVENT',
  flaggedScoreThreshold: null,
  shownName: 'Test event',
};

export const TriggerTypes = [
  accountSharerDetected,
  freeTrialAbuserDetected,
  multipleAccountDetected,
  accountSharerNewDeviceUsed,
  freeTrialNewAccountRegistered,
];

export const TriggerTypesWithTestEvent = [...TriggerTypes, testEvent];
