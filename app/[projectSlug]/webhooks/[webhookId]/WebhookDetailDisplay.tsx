'use client';

import React from 'react';
import { Row, Typography } from 'antd';

interface WebhookDetailDisplayProps {
  name: string;
  url: string;
}

export default function WebhookDetailDisplay({
  name,
  url,
}: WebhookDetailDisplayProps) {
  return (
    <>
      <Row className='row mb-2'>
        <Typography.Text className='pl-5 text-3xl p-1 font-bold'>
          Name:
        </Typography.Text>
        <Typography.Text className='pl-2 text-3xl p-1'>
          {name}
        </Typography.Text>
      </Row>
      <Row className='row'>
        <Typography.Text className='pl-5 text-3xl p-1 font-bold'>
          URL:
        </Typography.Text>
        <Typography.Link className='pl-2 text-3xl p-1'>
          {url}
        </Typography.Link>
      </Row>
    </>
  );
}
