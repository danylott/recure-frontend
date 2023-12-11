'use client';

import { Row, Col, Switch } from 'antd';
import React from 'react';

interface Props {
  accountSharer: boolean;
  setAccountSharer: (value: boolean) => void;
  freeTrialAbuser: boolean;
  setFreeTrialAbuser: (value: boolean) => void;
}

const ProjectEventSettings: React.FC<Props> = ({
  accountSharer, setAccountSharer, freeTrialAbuser, setFreeTrialAbuser,
}) => (
  <div>
    <h3 className='text-left'>Flagging settings</h3>
    <hr />
    <div className='text-left mt-5 mb-3'>Event handling triggers:</div>
    <Row className='mb-3'>
      <Col>
        <Switch checked={accountSharer} onChange={setAccountSharer} />
        <span className='ml-3'>Account sharers detection</span>
      </Col>
    </Row>
    <Row className='mb-3'>
      <Col>
        <Switch checked={freeTrialAbuser} onChange={setFreeTrialAbuser} />
        <span className='ml-3'>Free trial abusers detection</span>
      </Col>
    </Row>
  </div>
);

export default ProjectEventSettings;
