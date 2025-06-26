export const dynamicParams = true;
import NotesDetail from '@/components/match-notes/NotesDetail';

export default function Note({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen gap-2 p-8 sm:p-8 xl:p-20 xl:pt-8 font-[family-name:var(--font-geist-sans)]">
            <div className='mt-4'>
                {/* <MatchForm/> */}
                { id && <NotesDetail id={id}/>}
            </div>
        </div>
  );
}