'use client'

export const dynamicParams = true;
import { use } from 'react';
import NotesDetail from '@/components/match-notes/NotesDetail';

export default function Note(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);

  return (
        <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-8 sm:px-6">
            { id && <NotesDetail id={id}/>}
        </div>
  );
}
