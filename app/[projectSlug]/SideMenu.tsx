'use client';

import { Layout, Menu } from 'antd';
import {
  CloudServerOutlined,
  // FileTextOutlined,
  KeyOutlined,
  ProjectOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { BsLaptop } from 'react-icons/all';
import { ProjectData } from '@/app/[projectSlug]/projects/ProjectsTable';
import DynamicLink from '@/app/[projectSlug]/DynamicLink';
import { UserPlan } from '@/app/[projectSlug]/interfaces';
import ProjectSelector from './ProjectSelector';

const { Sider } = Layout;

interface Props {
  projects: ProjectData[];
  selectedProjectSlug: string;
  userPlan: UserPlan;
}

export default function SideMenu(
  { projects, selectedProjectSlug, userPlan }: Props,
) {
  if (!userPlan) {
    return <div />;
  }

  return (
    <Sider>
      <div className='flex justify-center mt-4 mb-2'>
        <div className='w-full mx-6'>
          <ProjectSelector
            projects={projects}
            projectSlug={selectedProjectSlug}
          />
        </div>
      </div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '/dashboard',
            icon: <UnorderedListOutlined />,
            label: <Link href={`/${selectedProjectSlug}/dashboard`}>Dashboard</Link>,
          },
          {
            key: '/accounts',
            icon: <UsergroupAddOutlined />,
            // used to prevent a soft navigation
            label: <DynamicLink href={`/${selectedProjectSlug}/accounts`}>Accounts</DynamicLink>,
          },
          {
            key: '/devices',
            icon: <BsLaptop />,
            label: <Link href={`/${selectedProjectSlug}/devices`}>Devices</Link>,
          },
          {
            key: '/projects',
            icon: <ProjectOutlined />,
            label: <Link href={`/${selectedProjectSlug}/projects`}>Projects</Link>,
          },
          {
            key: '/api_keys',
            icon: <KeyOutlined />,
            label: <Link href={`/${selectedProjectSlug}/api-keys`}>API Keys</Link>,
          },
          {
            key: '/webhooks',
            icon: <CloudServerOutlined />,
            label: <Link href={`/${selectedProjectSlug}/webhooks`}>Webhooks</Link>,
          },
          {
            key: '/settings',
            icon: <SettingOutlined />,
            label: <Link href={`/${selectedProjectSlug}/settings`}>Settings</Link>,
          },
          {
            key: '/profile',
            icon: <UserOutlined />,
            label: (
              <>
                <Link href={`/${selectedProjectSlug}/profile`}>Profile</Link>
                {/* <div
                  className={`inline p-1 rounded text-xs text-zinc-100 ${
                    userPlan.plan_type === UserPlanType.Free
                      ? 'ml-12 bg-[#163E5E]'
                      : 'ml-7 bg-gradient-to-br from-[#350FCD] from-0% to-[#620FCD] to-100%'
                  }`}
                >
                  {
                    userPlan.plan_type === UserPlanType.Free
                      ? 'Free'
                      : 'Premium'
                  }
                </div> */}
              </>
            ),
          },
          // {
          //   key: '/documentation',
          //   icon: <FileTextOutlined />,
          //   label: <Link href='/docs/index.html' target='_blank' rel='noreferrer'>Documentation</Link>,
          //   style: {
          //     position: 'absolute', bottom: 0, zIndex: 1, transition: 'all 0.2s',
          //   },
          // },
        ]}
      />
    </Sider>
  );
}
