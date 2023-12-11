import { UserPlanPermissions } from '@/app/[projectSlug]/UserPlanPermissions';

enum UserPlanName {
  Free = 'FREE',
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE'
}

export enum UserPlanType {
  Free = 'FREE',
  Paid = 'PAID'
}

export interface UserPlan {
  name: UserPlanName;
  plan_type: UserPlanType;
  price: number | null;
  permissions: { [key: string]: UserPlanPermissions[] };
  limitations: { [key: string]: number };
}

export interface Trigger {
  id: number;
  trigger_type: string;
  flagged_score_threshold: number;
}

export interface WebhookEvent {
  id: number;
  time: string;
  status: string;
  trigger: Trigger;
  event_score: number;
  payload: Record<string, any>;
}

export interface WebhookEventsHistory {
  count: number;
  next: string | null;
  previous: string | null;
  results: WebhookEvent[];
}

export enum WebhookEventStatus {
  FailedAfterResending = 'FAILED_AFTER_RESENDING',
  FailedWaitingForResend = 'FAILED_WAITING_FOR_RESEND',
  TotallyFailed = 'TOTALLY_FAILED',
  Completed = 'COMPLETED',
  CompletedAfterResending = 'COMPLETED_AFTER_RESENDING'
}
