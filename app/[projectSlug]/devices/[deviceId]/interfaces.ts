export interface DeviceUsageByAccount {
  account_email: string;
  date: string;
  event_count: number;
}

export interface DeviceAccount {
  id: number;
  original_account_id: string;
  email: string | null;
  num_devices: number;
}

export interface DeviceAccounts {
  count: number;
  next: string | null;
  previous: string | null;
  results: DeviceAccount[];
}
