'use client';

import React from 'react';
import WebhookDetailDisplay from './WebhookDetailDisplay';
import WebhookDetailEditForm from './WebhookDetailEditForm';

interface WebhookDetailFormProps {
  isEditing: boolean;
  handleCancel: () => void;
  webhookData: {
    name: string;
    url: string;
  };
  onSave: (values: { name: string; url: string }) => Promise<void>;
}

export default function WebhookDetailForm({
  isEditing,
  handleCancel,
  webhookData,
  onSave,
}: WebhookDetailFormProps) {
  if (isEditing) {
    return (
      <WebhookDetailEditForm
        handleCancel={handleCancel}
        onSave={onSave}
        webhookData={webhookData}
      />
    );
  }

  return (
    <>
      <WebhookDetailDisplay
        name={webhookData.name}
        url={webhookData.url}
      />
    </>
  );
}
