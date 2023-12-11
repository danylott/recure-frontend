'use client';

import { FloatButton, notification, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { PlusOutlined } from '@ant-design/icons';
import CreateProjectModal, {
  CreateProjectFormData,
} from '@/app/[projectSlug]/projects/CreateProjectModal';
import { post } from '@/utils/requests';
import { errorTemplate, infoTemplate } from '@/utils/notifications';

export interface ProjectData {
  id: number;
  name: string;
  slug: string;
  website_link: string;
  user: number;
  created_at: string;
}

const columns: ColumnsType<ProjectData> = [
  {
    title: 'Project Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Project Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Website Link',
    dataIndex: 'website_link',
    key: 'website_link',
  },
];

interface Props {
  projectsData: ProjectData[];
}

export default function ProjectsTable({ projectsData }: Props) {
  const [
    createProjectModalVisible,
    setCreateProjectModalVisible,
  ] = useState(false);
  const [notificationsApi, contextHolder] = notification.useNotification();

  const { data: session } = useSession();

  const showCreateProjectModal = useCallback(() => {
    setCreateProjectModalVisible(true);
  }, []);

  const createNewProject = async (values: CreateProjectFormData) => {
    const response = await post({
      url: '/api/projects/',
      data: values,
      token: session?.access,
    });

    setCreateProjectModalVisible(false);

    if (response.ok) {
      notificationsApi.info(infoTemplate('Created successfully'));

      return;
    }

    const data = await response.json();

    notificationsApi.error(
      errorTemplate(JSON.stringify(data)),
    );
  };

  return (
    <>
      {contextHolder}
      <h2 className='text-left'>Projects</h2>
      <Table
        columns={columns}
        dataSource={projectsData}
        rowKey={(record) => record.slug}
        pagination={false}
      />
      <FloatButton
        type='primary'
        icon={<PlusOutlined />}
        className='mr-10'
        onClick={showCreateProjectModal}
      />
      <CreateProjectModal
        isCreateProjectModalVisible={createProjectModalVisible}
        setIsCreateProjectModalVisible={setCreateProjectModalVisible}
        handleCreateNewProject={createNewProject}
      />
    </>
  );
}
