'use client';

import React, { useCallback, useEffect } from 'react';
import {
  Col, Form, notification, Row,
} from 'antd';
import { ProjectData } from '@/app/[projectSlug]/projects/ProjectsTable';
import ProjectGeneralSettingsForm from '@/app/[projectSlug]/settings/ProjectGeneralSettingsForm';
import ProjectEventSettings from '@/app/[projectSlug]/settings/ProjectEventSettings';
import ProjectDashboardSettings from '@/app/[projectSlug]/settings/ProjectDashboardSettings';
import ProjectSubmitButton from '@/app/[projectSlug]/settings/ProjectSubmitButton';
import { useFormHandler } from '@/app/[projectSlug]/settings/useFormHandler';
import { ProjectFlagSettings } from '@/app/[projectSlug]/settings/types';
import { useFormFlagHandler } from '@/app/[projectSlug]/settings/useFormFlagHandler';
import { infoTemplate } from '@/utils/notifications';
import useProjectSettings from '@/app/[projectSlug]/settings/useProjectSettings';

interface Props {
  projectData: ProjectData;
  projectSlug: string;
  projectFlagSettings: ProjectFlagSettings[];
}

export default function ProjectSettings(
  {
    projectData,
    projectSlug,
    projectFlagSettings,
  }: Props,
) {
  const [notificationsApi, contextHolder] = notification.useNotification();

  const {
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
  } = useProjectSettings();

  const { name, website_link } = projectData;

  const generalFormValues = {
    name,
    website_link,
  };

  const handleFormSubmit = useFormHandler(
    notificationsApi,
    projectSlug,
    generalFormValues,
  );

  const { handleFormSubmit: handleFlagFormSubmit } = useFormFlagHandler(
    notificationsApi,
    projectSlug,
    accountSharer,
    freeTrialAbuser,
    accountSharerValue,
    freeTrialAbuserValue,
    projectFlagSettings,
  );

  const handleSubmit = useCallback(async (values: any) => {
    const isGeneralFormUpdatedSuccessfully = await handleFormSubmit(values);
    const isFlagFormUpdatedSuccessfully = await handleFlagFormSubmit(values);

    if (isGeneralFormUpdatedSuccessfully && isFlagFormUpdatedSuccessfully) {
      notificationsApi.info(infoTemplate('Updated successfully'));
    }
  }, [handleFormSubmit, handleFlagFormSubmit]);

  useEffect(() => {
    const accountSharerData = projectFlagSettings.find((item: ProjectFlagSettings) => item.flag === 'ACCOUNT_SHARER');

    if (accountSharerData) {
      setAccountSharer(accountSharerData.is_enabled);
      setAccountSharerValue(accountSharerData.dashboard_threshold);
    }

    const freeTrialAbuserData = projectFlagSettings.find((item: ProjectFlagSettings) => item.flag === 'FREE_TRIAL_ABUSER');

    if (freeTrialAbuserData) {
      setFreeTrialAbuser(freeTrialAbuserData.is_enabled);
      setFreeTrialAbuserValue(freeTrialAbuserData.dashboard_threshold);
    }
  }, [projectFlagSettings]);

  return (
    <>
      {contextHolder}
      <Row justify='center' align='top' className='flex mb-8'>
        <Col span={12}>
          <h2 className='text-left mb-5'>Project Settings</h2>
          <Form
            form={projectSettingsForm}
            name='projectSettingsForm'
            layout='vertical'
            wrapperCol={{ span: 24 }}
            initialValues={projectData}
            autoComplete='off'
            onFinish={handleSubmit}
          >
            <ProjectGeneralSettingsForm />
            <ProjectEventSettings
              accountSharer={accountSharer}
              setAccountSharer={setAccountSharer}
              freeTrialAbuser={freeTrialAbuser}
              setFreeTrialAbuser={setFreeTrialAbuser}
            />
            <ProjectDashboardSettings
              accountSharer={accountSharer}
              freeTrialAbuser={freeTrialAbuser}
              accountSharerValue={accountSharerValue}
              setAccountSharerValue={setAccountSharerValue}
              freeTrialAbuserValue={freeTrialAbuserValue}
              setFreeTrialAbuserValue={setFreeTrialAbuserValue}
            />
            <ProjectSubmitButton loading={loading} />
          </Form>
        </Col>
      </Row>
    </>
  );
}
