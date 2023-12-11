import RegisterComponent from '@/app/auth/signup/RegisterComponent';

export const dynamic = 'force-dynamic';

export default function SignUpPage() {
  return (
    <RegisterComponent
      recurePublicApiKey={process.env.RECURE_PUBLIC_API_KEY}
    />
  );
}
