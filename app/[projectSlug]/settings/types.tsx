export interface ProjectFormData {
  name: string;
  website_link: string;
}

export interface ProjectFlagSettings {
  id: number;
  flag: 'ACCOUNT_SHARER' | 'FREE_TRIAL_ABUSER';
  is_enabled: boolean;
  dashboard_threshold: number;
}
