'use client';

import { Card } from 'antd';
import CodeSnippet from '@/app/[projectSlug]/send-test-event/CodeSnippet';

interface Props {
  publicApiKey: string;
}

export default function InstructionsForIOS({ publicApiKey }: Props) {
  const importSDK = `
  import Recure
   `;

  const createRecureCodeSnippet = `
  let recure = Recure(projectApiKey: "${publicApiKey}")
  `;

  const trackLoginEvent = `
  // Put this code after successful submitted form sign_up/login

  //  Replace userId and example@gmail.com with the real ID and email of your user.

  let userOptions = UserOptions(userId: "userId", userEmail: "example@gmail.com")

  //  UserOptions structure
  //
  //  public struct UserOptions {
  //      public let userId: String
  //      public let userEmail: String
  //      public let userPhone: String?
  //      public let userName: String?
  //  }


  Task {
      try await recure.track(userOptions: userOptions, eventType: .login)
  }
  `;

  return (
    <>
      <div className='text-left my-5'>
        <Card className='mb-5'>
          <h2>iOS SDK</h2>
          <p className='text-left'>
            This guide will walk you through the process of setting up your
            application to track login events. This will enable you to gain
            insights into multi-accounting and account sharing within
            your iOS app.
          </p>
          <p>
            To start, you need to install the iOS SDK.
            You can do it by following these steps:
          </p>
          <ul>
            <li>
              In Xcode, open your project and navigate to File →
              Swift Packages → Add Package Dependency.
            </li>
            <li>
              Paste the repository URL:
              https://github.com/Recure-AI/recure-ios-sdk.
            </li>
            <li>
              Make sure you selected Dependency Rule:
              Up to Next major Version. You should use from to
              <b>1.0.1</b>
              {' '}
              version.
            </li>
            <li>Click Add Package</li>
          </ul>
          <h2>Import the SDK</h2>
          <p>
            First, import the SDK:
          </p>
          <CodeSnippet
            code={importSDK}
            language='swift'
          />
        </Card>
        <Card>
          <h2>Creating Recure client</h2>
          <p>
            Next, create an instance of Recure.
          </p>
          <CodeSnippet
            code={createRecureCodeSnippet}
            language='swift'
          />
        </Card>
        <Card>
          <h2>Tracking the LOGIN event</h2>
          <p>
            Now, you&apos;re ready to track your first event! To track the
            login events of your users, use the .login event from EventTypes.
            Here&apos;s a code snippet to help you track the LOGIN event.
          </p>
          <CodeSnippet
            code={trackLoginEvent}
            language='swift'
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
