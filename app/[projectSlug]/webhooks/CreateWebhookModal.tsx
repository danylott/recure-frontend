'use client';

import {
  Button, Checkbox, Form, Input, InputNumber, Modal, Row, Tooltip,
} from 'antd';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TriggerTypes } from '@/app/[projectSlug]/webhooks/webhook.constants';

interface TriggerType {
  triggerType: string;
  flaggedScoreThreshold: number | null;
  shownName: string;
}

interface TriggerSendingType {
  trigger_type: string;
  flagged_score_threshold: number;
}

export interface WebhookFormData {
  name: string;
  url: string;
  webhook_triggers: TriggerSendingType[];
}

interface Props {
  isCreateWebhookModalVisible: boolean;
  setIsCreateWebhookModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateWebhook: (values: WebhookFormData) => Promise<void>;
}

export default function CreateWebhookModal(props: Props) {
  const {
    isCreateWebhookModalVisible,
    setIsCreateWebhookModalVisible,
    handleCreateWebhook,
  } = props;
  const handleModalCancel = useCallback(() => {
    setIsCreateWebhookModalVisible(false);
  }, [setIsCreateWebhookModalVisible]);
  const router = useRouter();

  const [triggerTypes, setTriggerTypes] = useState<TriggerType[]>(TriggerTypes);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const changeTriggerScore = (trigger: string, scoreValue: number | null) => {
    const index = triggerTypes.findIndex(
      (item) => item.triggerType === trigger,
    );

    const updatedTriggerTypes = [...triggerTypes];

    updatedTriggerTypes[index] = {
      ...updatedTriggerTypes[index],
      flaggedScoreThreshold: scoreValue,
    };

    setTriggerTypes(updatedTriggerTypes);
  };

  const includeOrExcludeValueFromTriggerTypes = useCallback(
    (value: string, shownName: string) => {
      let updatedSelectedCheckboxes;

      if (selectedCheckboxes.includes(value)) {
        updatedSelectedCheckboxes = selectedCheckboxes.filter(
          (item) => item !== value,
        );
      } else {
        updatedSelectedCheckboxes = [...selectedCheckboxes, value];
      }

      setSelectedCheckboxes(updatedSelectedCheckboxes);

      const index = triggerTypes.findIndex(
        (item) => item.triggerType === value,
      );

      let updatedTriggerTypes = [...triggerTypes];

      if (index !== -1) {
        updatedTriggerTypes[index] = {
          ...updatedTriggerTypes[index],
          flaggedScoreThreshold: null,
        };
      } else {
        updatedTriggerTypes = [
          ...updatedTriggerTypes,
          {
            triggerType: value,
            flaggedScoreThreshold: 0.5,
            shownName,
          },
        ];
      }

      setTriggerTypes(updatedTriggerTypes);
    }, [selectedCheckboxes, triggerTypes],
  );

  async function prepareDataForSending(
    values: WebhookFormData,
  ) {
    const reformattedData = values;

    reformattedData.webhook_triggers = [];

    triggerTypes.forEach((trigger) => {
      if (selectedCheckboxes.includes(trigger.triggerType)) {
        reformattedData.webhook_triggers?.push({
          trigger_type: trigger.triggerType,
          flagged_score_threshold: trigger.flaggedScoreThreshold || 0.5,
        });
      }
    });

    await handleCreateWebhook(reformattedData);

    router.refresh();
  }

  return (
    <>
      <Modal
        title='Create Webhook'
        open={isCreateWebhookModalVisible}
        footer={null}
        onCancel={handleModalCancel}
      >
        <Form onFinish={prepareDataForSending}>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please, enter a name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='URL'
            name='url'
            rules={[{ required: true, message: 'Please, enter the webhook URL' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='webhook_triggers'
          >
            <Checkbox.Group>
              <div className='block ml-0'>
                {triggerTypes.map((item) => (
                  <Row key={item.triggerType} justify='space-between'>
                    <Checkbox
                      className='float-right'
                      value={item.triggerType}
                      onChange={() => {
                        includeOrExcludeValueFromTriggerTypes(
                          item.triggerType,
                          item.shownName,
                        );
                      }}
                    >
                      {item.shownName}
                    </Checkbox>
                    {selectedCheckboxes.includes(item.triggerType) && (
                    <Tooltip
                      placement='right'
                      title='That is a threshold of the score above which the webhook event would be sent (if detected)'
                    >
                      <InputNumber
                        size='small'
                        min={0}
                        max={1}
                        step={0.1}
                        defaultValue={0.5}
                        onChange={(e) => {
                          changeTriggerScore(item.triggerType, e);
                        }}
                      />
                    </Tooltip>
                    )}
                  </Row>
                ))}
              </div>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>Create Webhook</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
