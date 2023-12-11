'use client';

import React from 'react';
import {
  Col, Form, Input, Row,
} from 'antd';

export default function ProjectGeneralSettingsForm() {
  return (
    <>
      <h3 className='text-left'>Project General Settings</h3>
      <hr />
      <Row>
        <Col span={12} className='p-4'>
          <Form.Item name='name' label='Project Name'>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12} className='p-4'>
          <Form.Item name='website_link' label='Project URL'>
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
