import { Tooltip } from 'antd';
import { EyeInvisibleOutlined } from '@ant-design/icons';

export const blurredAccountDataBlock = (
  <Tooltip title='Subscription Required'>
    <div className='flex'>
      <EyeInvisibleOutlined className='ml-1' />
      <div className='flex-1 bg-gray-300 blur-sm ml-5 mr-5' />
    </div>
  </Tooltip>
);
