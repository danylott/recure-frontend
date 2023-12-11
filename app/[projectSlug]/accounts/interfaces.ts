export interface Flag {
  flag: string;
  score: number;
}

export interface Account {
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
  flags: Flag[];
  last_event_timestamp: string;
}

export interface ProjectAccounts {
  count: number;
  next: string | null;
  previous: string | null;
  results: Account[];
}

export interface FlagName {
  name: string;
}
