'use client';

import { useRouter } from 'next/navigation';
import { Button, Modal } from 'antd';
import { useCallback, useState } from 'react';
import { getSession } from 'next-auth/react';
import WebCard from '@/app/[projectSlug]/send-test-event/WebCard';
import { get } from '@/utils/requests';
import { RecentActivity } from '@/app/[projectSlug]/dashboard/interfaces';
import IOSCard from '@/app/[projectSlug]/send-test-event/iOSCard';

interface Props {
  publicApiKey: string;
  projectSlug: string;
}

export default function TestEvent({ publicApiKey, projectSlug }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSkip = useCallback(() => {
    router.push(`/${projectSlug}/dashboard`);
  }, [projectSlug, router]);

  const handleModalCancel = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  const handleCheckEvent = useCallback(async () => {
    const session = await getSession();

    setLoading(true);

    const recentActivityResult = await get({
      url: `/api/dashboard/recent_activity/?project_slug=${projectSlug}`,
      headers: {
        Authorization: `Bearer ${session?.access}`,
      },
    });

    const recentActivity: RecentActivity = await recentActivityResult.json();

    if (recentActivity?.results.length === 0) {
      setModalVisible(true);
    } else {
      router.push(`/${projectSlug}/dashboard`);
    }

    setLoading(false);
  }, []);

  return (
    <>
      <div className='text-left mb-4'>
        <h3 className='mb-4'>Let&apos;s establish a connection!</h3>
        <h3 className='mb-4'>
          Install Recure AI on your website or app to
          analyze your users and begin encouraging account sharers and
          repeat trial users to upgrade.
        </h3>
        <h2 className='mb-4'>Choose your installation method for Recure AI.</h2>
      </div>
      <WebCard publicApiKey={publicApiKey} />
      <IOSCard publicApiKey={publicApiKey} />

      <div className='mt-4'>
        <Button type='default' className='mr-2' onClick={handleSkip}>
          Skip
        </Button>
        <Button
          type='primary'
          onClick={handleCheckEvent}
          loading={loading}
        >
          Verify Event
        </Button>
      </div>
      <Modal
        open={modalVisible}
        onCancel={handleModalCancel}
        title='No Events Found'
        footer={null}
      >
        <p>We didn&apos;t receive any events from you.</p>
      </Modal>
    </>
  );
}
