export const dynamicParams = true;
'use client';
import { use, useEffect, useState } from 'react';
import NotesDetail from '@/components/match-notes/NotesDetail';
import { loadNoteDetail } from '@/service/notesService';
import Breadcrumb from '@/components/common/Breadcumb/Breadcumb';
import { loadNote } from '@/utlis/storage/notes';

export default function Note(props: { params: Promise<{ id: string }> }) {
  
  const { id } = use(props.params);
  const [ note, setNote ] = useState<MatchNotes>()
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem('mgm_access_token')
    if (session) {
      loadNotesDetailFromServer()
    } else {
      loadNotesDetailFromLocal()
    }
  }, [])

  const loadNotesDetailFromServer = async () => {
    setLoading(true)
    const data = await loadNoteDetail(Number(id))
    if (data.data) { setNote(data.data) }
    setLoading(false)
  }

  const loadNotesDetailFromLocal = async () => {
    const data = await loadNote(id)
    console.log('here data', data)
    setNote(data)
  }

  return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen gap-2 p-8 sm:p-8 xl:p-20 xl:pt-8 font-[family-name:var(--font-geist-sans)]">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Notes', href: '/notes' },
                { label: note?.title || note?.id || '-' } // current page, no link
              ]}
            />
            <div className='mt-4'>
                {/* <MatchForm/> */}
                { note && <NotesDetail note={note}/>}
                { (!note && !loading) && <div>Not Found</div>}
            </div>
        </div>
  );
}