'use client';

import { useState } from 'react';
import { Card } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import InstructionsForWeb
  from '@/app/[projectSlug]/send-test-event/InstructionsForWeb';

interface Props {
  publicApiKey: string;
}

export default function WebCard({ publicApiKey }: Props) {
  const [isActive, setIsActive] = useState(false);

  const handleCardClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="mb-2">
      <Card
        onClick={handleCardClick}
        className='w-1/3 h-20 flex items-center justify-center p-4 cursor-pointer'
        // didn't manage to do it with tailwind
        style={{
          border: isActive
            ? '2px solid #333'
            : '1px solid #d9d9d9',
        }}
      >
        <div className='flex items-center'>
          <GlobalOutlined className='text-2xl mr-2' />
          <h1 className='text-2xl mt-1'>Web</h1>
        </div>
      </Card>
      {isActive && <InstructionsForWeb publicApiKey={publicApiKey} />}
    </div>
  );
}
