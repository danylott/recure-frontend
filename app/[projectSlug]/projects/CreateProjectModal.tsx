'use client';

import {
  Button, Form, Input, Modal,
} from 'antd';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface CreateProjectFormData{
  name: string;
  website_link: string;
}

interface Props {
  isCreateProjectModalVisible: boolean;
  setIsCreateProjectModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateNewProject: (values: CreateProjectFormData) => Promise<void>;
}

export default function CreateProjectModal(
  {
    isCreateProjectModalVisible,
    setIsCreateProjectModalVisible,
    handleCreateNewProject,
  }
    : Props,
) {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleProjectModalCancel = useCallback(() => {
    setIsCreateProjectModalVisible(false);
  }, [setIsCreateProjectModalVisible]);

  async function createProject(
    projectData: CreateProjectFormData,
  ) {
    await handleCreateNewProject(projectData);

    router.refresh();
  }

  return (
    <Modal
      title='Create New Project'
      open={isCreateProjectModalVisible}
      onCancel={handleProjectModalCancel}
      footer={null}
    >
      <Form form={form} layout='vertical' onFinish={createProject}>
        <Form.Item
          label='Project Name'
          name='name'
          rules={[{ required: true, message: 'Please enter project name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Website Link'
          name='website_link'
          rules={[{ required: true, message: 'Please enter website link' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>Create Project</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
