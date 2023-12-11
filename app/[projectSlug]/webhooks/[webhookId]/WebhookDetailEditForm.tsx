'use client';

import React from 'react';
import {
  Button, Input, Row, Form,
} from 'antd';

interface WebhookDetailEditFormProps {
  handleCancel: () => void;
  onSave: (values: { name: string; url: string }) => Promise<void>;
  webhookData: {
    name: string;
    url: string;
  };
}

export default function WebhookDetailEditForm({
  handleCancel,
  onSave,
  webhookData,
}: WebhookDetailEditFormProps) {
  const [form] = Form.useForm();

  const onFinish = async (values: { name: string; url: string }) => {
    await onSave(values);

    form.resetFields();
  };

  return (
    <Form
      form={form}
      initialValues={{
        name: webhookData.name,
        url: webhookData.url,
      }}
      onFinish={onFinish}
    >
      <Row className='row pl-2 w-200'>
        <Form.Item
          name='name'
          className='font-bold w-2/3'
          label='Name:'
          wrapperCol={{ span: 100 }}
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input size='small' />
        </Form.Item>
      </Row>
      <Row className='row pl-2 -mt-5 w-200'>
        <Form.Item
          name='url'
          className='font-bold w-2/3'
          label='URL:'
          wrapperCol={{ span: 100 }}
          rules={[{ required: true, message: 'URL is required' }]}
        >
          <Input size='small' />
        </Form.Item>
      </Row>
      <Row className='flex justify-center mt-0'>
        <Button onClick={handleCancel} className='mx-2'>
          Cancel
        </Button>
        <Button htmlType='submit' type='primary' className='mx-2'>
          Save
        </Button>
      </Row>
    </Form>
  );
}
