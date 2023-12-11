import React, { useCallback, useState } from 'react';
import { Typography } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

interface Props {
  text: string;
}

function maskString(str: string) {
  const toMask = 8;

  if (str.length <= toMask) {
    return str;
  }

  const visiblePart = str.slice(0, toMask);
  const hiddenPart = str.slice(toMask).replace(/./g, '*');

  return visiblePart + hiddenPart;
}

export default function HideableCopyableText({ text }: Props) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <div>
      <Paragraph copyable={{ text }}>
        {visible
          ? text
          : maskString(text)}
        <Text className='m-1 cursor-pointer opacity-100 hover:opacity-80' onClick={toggleVisibility}>
          {visible
            ? <EyeInvisibleOutlined className='text-base' />
            : <EyeOutlined className='text-base' />}
        </Text>
      </Paragraph>
    </div>
  );
}
