'use client'; // Important: Make this a client component
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children } : {children?: ReactNode}) {
  return <SessionProvider>{children}</SessionProvider>;
}