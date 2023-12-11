export interface Device {
  id: number;
  device_id: string;
  last_event: string;
  total_events: number;
  number_of_accounts: number;
}

export interface DeviceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Device[];
}
