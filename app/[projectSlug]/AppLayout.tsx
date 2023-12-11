'use client';

import React from 'react';
import { Layout } from 'antd';
import PageEventCaller from '@/app/[projectSlug]/PageEventCaller';
import { ProjectData } from '@/app/[projectSlug]/projects/ProjectsTable';
import { UserPlan } from '@/app/[projectSlug]/interfaces';
import HeaderComponent from './Header';
import AuthContext from './AuthContext';
import SideMenu from './SideMenu';

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
  projects: ProjectData[];
  recureApiKey: string;
  selectedProjectSlug: string;
  userPlan: UserPlan;
}

export default function AppLayout({
  children,
  projects,
  selectedProjectSlug,
  recureApiKey,
  userPlan,
}: Props) {
  return (
    <AuthContext>
      <Layout hasSider className='flex h-screen overflow-hidden'>
        <SideMenu
          projects={projects}
          selectedProjectSlug={selectedProjectSlug}
          userPlan={userPlan}
        />
        <Layout className='site-layout'>
          <HeaderComponent />
          <Content className='m-4 p-4 text-center bg-white h-full overflow-y-scroll'>
            { children }
          </Content>
          <PageEventCaller recureApiKey={recureApiKey} />
        </Layout>
      </Layout>
    </AuthContext>
  );
}
