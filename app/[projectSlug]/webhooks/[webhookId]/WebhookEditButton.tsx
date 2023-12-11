'use client';

import { EditFilled } from '@ant-design/icons';
import React from 'react';

interface Props {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

export default function WebhookEditButton(
  { isEditing, setIsEditing }: Props,
) {
  if (isEditing) {
    return null;
  }

  return (
    <>
      <EditFilled onClick={() => setIsEditing(!isEditing)} className='ml-2 mt-1' />
    </>
  );
}
