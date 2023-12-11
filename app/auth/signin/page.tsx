import LoginComponent from '@/app/auth/signin/LoginComponent';

// to access process.env in client component
export const dynamic = 'force-dynamic';

export default function SignInPage() {
  return (
    <>
      <LoginComponent
        recurePublicApiKey={process.env.RECURE_PUBLIC_API_KEY}
      />
    </>
  );
}
