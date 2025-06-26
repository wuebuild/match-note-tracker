// app/(main)/notes/[id]/page.tsx
export const dynamicParams = true;

import ClientWrapper from './ClientWrapper';

export default function Note({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen gap-2 p-8 sm:p-8 xl:p-20 xl:pt-8 font-[family-name:var(--font-geist-sans)]">
      <div className="mt-4">
        <ClientWrapper id={id} />
      </div>
    </div>
  );
}