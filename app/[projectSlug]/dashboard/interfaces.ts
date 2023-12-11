export interface FlaggedAccount {
  date: string;
  flagged_accounts: number;
}

export interface AccountSharer {
  date: string;
  account_sharers: number;
}

export interface FreeTrialAbuser {
  date: string;
  free_trial_abusers: number;
}

export interface CreatedAccount {
  date: string;
  created_users: number;
}

export interface FlaggedAccountItem {
  recure_id: number;
  device: string;
  user_id: string;
  flag: string;
  when: string;
  email: string;
}

export interface FlaggedAccounts {
  count: number;
  next: string | null;
  previous: string | null;
  results: FlaggedAccountItem[];
}

export interface RecentActivityItem {
  recure_id: number;
  user_id: string;
  device: string;
  location: string;
  last_activity: string;
}

export interface RecentActivity {
  next: string | null;
  previous: string | null;
  results: RecentActivityItem[];
}
