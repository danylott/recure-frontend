'use client';

import { Card } from 'antd';
import CodeSnippet from '@/app/[projectSlug]/send-test-event/CodeSnippet';

interface Props {
  publicApiKey: string;
}

export default function InstructionsForWeb({ publicApiKey }: Props) {
  const installRecureLibraryCodeSnippet = `
  npm install recure
   `;

  const createRecureClientCodeSnippet = `
  import { RecureAIClient } from 'recure/web';

  const recure = new RecureAIClient({ publicApiKey: '${publicApiKey}' });
  `;

  const trackLoginEvent = `
  import { EventType } from 'recure/web/enums';

  //  Replace userId and example@gmail.com with the real ID and email of your user.
  await recure.track({
    userOptions: { userId: 'userId', userEmail: 'example@gmail.com' },
    eventType: EventType.LOGIN,
  });
  `;

  return (
    <>
      <div className='text-left my-5'>
        <Card className='mb-5'>
          <h2>Web</h2>
          <p className='text-left'>
            This guide will walk you through the process of setting up your
            application to track login events. This will enable you to gain
            insights into multi-accounting and account sharing within
            your web app.
          </p>
          <p>
            To start, you need to install the Recure AI Web client library.
            You can do this using NPM or any other package manager
            of your choice.
          </p>
          <CodeSnippet
            code={installRecureLibraryCodeSnippet}
            language='typescript'
          />
        </Card>
        <Card>
          <h2>Creating the Recure client</h2>
          <p>
            Next, create an instance of RecureAIClient.
          </p>
          <CodeSnippet
            code={createRecureClientCodeSnippet}
            language='typescript'
          />
        </Card>
        <Card>
          <h2>Tracking the LOGIN event</h2>
          <p>
            Now, you&apos;re ready to track your first event! To track the
            login events of your users, use the LOGIN event from EventTypes.
            Here&apos;s a code snippet to help you track the LOGIN event.
          </p>
          <CodeSnippet
            code={trackLoginEvent}
            language='typescript'
          />
          <p>
            If everything goes smoothly, you can proceed. If there are any
            issues, appropriate feedback will be provided.
          </p>
        </Card>
      </div>
    </>
  );
}
