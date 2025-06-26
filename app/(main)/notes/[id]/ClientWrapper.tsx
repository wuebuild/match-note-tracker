'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const NotesDetail = dynamic(() => import('@/components/match-notes/NotesDetail'), { ssr: false });

export default function ClientWrapper({ id }: { id: string }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotesDetail id={id} />
    </Suspense>
  );
}