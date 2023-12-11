'use client';

import { Row, Col, InputNumber } from 'antd';
import React from 'react';

interface Props {
  accountSharer: boolean;
  freeTrialAbuser: boolean;
  accountSharerValue: number;
  setAccountSharerValue: (value: number) => void;
  freeTrialAbuserValue: number;
  setFreeTrialAbuserValue: (value: number) => void;
}

const ProjectDashboardSettings: React.FC<Props> = ({
  accountSharer,
  freeTrialAbuser,
  accountSharerValue,
  setAccountSharerValue,
  freeTrialAbuserValue,
  setFreeTrialAbuserValue,
}) => (
  <div>
    <h3 className='text-left mt-5'>Dashboard Settings</h3>
    <hr />
    <div className='text-left mt-5 mb-3'>The minimum score for displaying data on the dashboard:</div>
    <Row className='mb-3'>
      <Col>
        <span className='mr-3'>Account sharers detection</span>
        <InputNumber
          min={0}
          max={1}
          step={0.1}
          value={accountSharerValue}
          size='small'
          onChange={(value) => {
            if (value !== null) {
              setAccountSharerValue(value);
            }
          }}
          disabled={!accountSharer}
        />
      </Col>
    </Row>
    <Row className='mb-3'>
      <Col>
        <span className='mr-3'>Free trial abusers detection</span>
        <InputNumber
          min={0}
          max={1}
          step={0.1}
          value={freeTrialAbuserValue}
          size='small'
          onChange={(value) => {
            if (value !== null) {
              setFreeTrialAbuserValue(value);
            }
          }}
          disabled={!freeTrialAbuser}
        />
      </Col>
    </Row>
  </div>
);

export default ProjectDashboardSettings;
