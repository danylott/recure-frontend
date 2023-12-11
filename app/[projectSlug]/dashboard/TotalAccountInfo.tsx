'use client';

import { Row } from 'antd';
import {
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import DashboardCard from '@/app/[projectSlug]/dashboard/DashboardCard';

interface Props {
  accountSharersTotal: number;
  freeTrialAbusersTotal: number;
  totalAccounts: number;
}

export default function TotalAccountInfo(
  { accountSharersTotal, freeTrialAbusersTotal, totalAccounts }: Props,
) {
  return (
    <Row gutter={16} className='mb-6'>
      <DashboardCard
        text='Account Sharers'
        quantity={accountSharersTotal}
        icon={<UsergroupAddOutlined />}
      />
      <DashboardCard
        text='Free Trial Abusers'
        quantity={freeTrialAbusersTotal}
        icon={<UserSwitchOutlined />}
      />
      <DashboardCard
        text='Total Accounts'
        quantity={totalAccounts}
        icon={<UserOutlined />}
      />
    </Row>
  );
}
