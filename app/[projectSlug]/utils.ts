import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { getAuthServer } from '@/utils/authServerRequests';
import { UserPlan } from '@/app/[projectSlug]/interfaces';
import { UserPlanPermissions } from '@/app/[projectSlug]/UserPlanPermissions';

export const createFormattedDate = (dateString: string) => {
  if (dateString === '' || dateString === null) {
    return '';
  }

  const date = parseISO(dateString);
  const currentDate = new Date();

  if (currentDate.getFullYear() === date.getFullYear()) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  return format(date, 'yyyy-MM-dd');
};

export async function getUserPlan() {
  const res = await getAuthServer('/api/users/my_plan/');

  const userPlan: UserPlan = await res.json();

  return userPlan;
}

export async function hasRequiredPermission(permission: UserPlanPermissions) {
  const userPlan = await getUserPlan();

  if (userPlan && userPlan.permissions.permissions) {
    return userPlan.permissions.permissions.includes(permission);
  }

  return false;
}

export const debounce = (func: () => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
};
