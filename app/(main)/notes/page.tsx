import NotesHistory from "@/components/match-notes/NotesHistory"

function History ({

}) {

    return (
        <div className="grid min-h-screen p-8 md:px-20 gap-16">
            <main className="flex flex-col sm:items-start">
                <NotesHistory />
            </main>
        </div>
    )
}

export default History