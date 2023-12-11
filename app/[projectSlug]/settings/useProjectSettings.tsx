'use client';

import { useState } from 'react';
import { Form } from 'antd';

export default function useProjectSettings() {
  const [projectSettingsForm] = Form.useForm();
  const [accountSharer, setAccountSharer] = useState(false);
  const [freeTrialAbuser, setFreeTrialAbuser] = useState(false);
  const [accountSharerValue, setAccountSharerValue] = useState(0.7);
  const [freeTrialAbuserValue, setFreeTrialAbuserValue] = useState(0.7);
  const [loading] = useState(false);

  return {
    projectSettingsForm,
    accountSharer,
    setAccountSharer,
    freeTrialAbuser,
    setFreeTrialAbuser,
    accountSharerValue,
    setAccountSharerValue,
    freeTrialAbuserValue,
    setFreeTrialAbuserValue,
    loading,
  };
}
