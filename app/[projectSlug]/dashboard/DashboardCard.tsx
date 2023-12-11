'use client';

import { Card, Col } from 'antd';
import React from 'react';

interface Props {
  text: string;
  quantity: number;
  icon: React.ReactNode;
}

export default function DashboardCard({ text, quantity, icon }: Props) {
  return (
    <Col span={8}>
      <Card>
        <div className='text-xl'>
          <p>{text}</p>
          { quantity }
          {' '}
          {icon}
        </div>
      </Card>
    </Col>
  );
}
