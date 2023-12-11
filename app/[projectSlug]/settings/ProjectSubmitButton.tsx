'use client';

import React from 'react';
import { Button, Form, Spin } from 'antd';

interface Props {
  loading: boolean;
}

const ProjectSubmitButton: React.FC<Props> = ({ loading }) => (
  <Form.Item>
    {loading
      ? (
        <Spin />
      )
      : (
        <Button type='primary' htmlType='submit' className='mt-5'>Update Information</Button>
      )}
  </Form.Item>
);

export default ProjectSubmitButton;
