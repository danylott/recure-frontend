'use client';

import { useRouter } from 'next/navigation';

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function DynamicLink({ href, children }: Props) {
  const router = useRouter();

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault(); router.push(href);
      }}
    >
      {children}
    </a>
  );
}
