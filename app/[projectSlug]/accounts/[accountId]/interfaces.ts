export interface AccountDetail {
  id: number;
  project: number;
  original_account_id: string;
  email: string;
  first_name: string;
  last_name: string;
  country: string;
  phone: string;
  is_banned: boolean;
  created_at: string;
  flags: { flag: string; score: number }[];
  flags_url: string;
  events_url: string;
  devices_url: string;
}

export interface Event {
  id: number;
  event_type: string;
  ip_address: {
    ip_address: string;
    location: string;
    is_anonymous: boolean;
  };
  device: {
    raw_user_agent: string;
    device: string;
    device_id: string;
  };
  created_at: string;
}

export interface AccountEvents {
  count: number;
  next: string | null;
  previous: string | null;
  results: Event[];
}

export interface FlaggedGroup {
  id: number;
  flag: string;
  score: number;
  accounts: Array<any>;
  created_at: string;
  updated_at: string;
}

export interface Device {
  id: number;
  operating_system: string;
  location: string;
  first_visit: string;
  last_visit: string;
  device_id: string;
}

export interface AccountDevices {
  count: number;
  next: string | null;
  previous: string | null;
  results: Device[];
}

export interface DeviceEventsDailyStatistics {
  device_id: string;
  date: string;
  event_count: number;
}
