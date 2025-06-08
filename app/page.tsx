import Image from "next/image";

export default function Home() {

  return (
    <div className="min-h-screen p-8 lg:px-20 font-[family-name:var(--font-geist-sans)]">
      <main>
          {/* <NotesHistory /> */}
          <section className="flex justify-center">
            <Image src={"/logo.jpg"} width={200} height={200} alt="match-note-maker"/>
          </section>
          <section className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">⚽ Match Note Maker</h1>
            <p className="text-gray-600 text-lg">Make smart football predictions, share clean match notes. No betting. Just football logic.</p>
          </section>

          <section className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-100 p-6 rounded-xl">
              <h2 className="font-semibold mb-2">📋 Easy Match Form</h2>
              <p className="text-sm text-gray-600">Fill in your prediction, reason, and kickoff time with ease.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl">
              <h2 className="font-semibold mb-2">💾 Save & Edit</h2>
              <p className="text-sm text-gray-600">Auto-saved to local storage. Revisit or update anytime.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl">
              <h2 className="font-semibold mb-2">📤 Copy or Share</h2>
              <p className="text-sm text-gray-600">Copy formatted text for Telegram, Substack, or personal use.</p>
            </div>
          </section>

          <section className="text-center mb-12">
            <a href="/history" className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
              Start Using the Tool
            </a>
          </section>
      </main>
    </div>
  );
}
