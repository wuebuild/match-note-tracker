'use client'
import { useCallback, useEffect, useState } from "react"
import { Button, Card, Skeleton } from "@heroui/react";
import { Plus, NotebookPen } from "lucide-react";
import { toast } from "react-toastify";

import MatchCard from "@/components/match-notes/MatchCard"
import MatchForm from "@/components/match-notes/MatchForm";
import DialogComponent from "../tailwind/DialogComponent";
import { loadNotes } from "@/utlis/storage/notes"
import { loadListNotes } from "@/service/notesService";

export default function NotesHistory () {

    const [ isLoading, setIsLoading ] = useState(true)
    const [ editData, setEditData ] = useState<MatchNotes|null>()
    const [ openDialog, setOpenDialog ] = useState(false)
    const [ matchNotes, setMatchNotes ] = useState<MatchNotes[]>([])

    const loadMyMatchNotes = useCallback(async () => {
        const session = localStorage.getItem('mgm_access_token')
        if (session) {
            const data = await loadListNotes()
            setMatchNotes(Array.isArray(data) ? data : [])
        } else {
            const data = await loadNotes()
            setMatchNotes(data || [])
        }
        setIsLoading(false)
    }, [])

    useEffect(() => { loadMyMatchNotes() }, [loadMyMatchNotes])

    useEffect(() => {
        if (editData) { setOpenDialog(true) }
    }, [editData])

    const closeDialog = () => {
        setOpenDialog(false)
        setEditData(null)
    }

    const onNoteSaved = () => {
        closeDialog()
        toast.success('Note saved')
        loadMyMatchNotes()
    }

    const totals = {
        picks: matchNotes.length,
        wins: matchNotes.filter(n => n.pickResult && ['true', 'right'].includes(String(n.pickResult).toLowerCase())).length,
        settled: matchNotes.filter(n => n.pickResult != null).length,
        points: matchNotes.reduce((sum, n: any) => sum + (Number(n.pointsAwarded) || 0), 0),
    }
    const winRate = totals.settled ? Math.round((totals.wins / totals.settled) * 100) : null

    return (
        <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">My Notes</h1>
                    <p className="text-sm text-muted">Your prediction journal, match by match.</p>
                </div>
                <Button onPress={() => { setOpenDialog(true) }}>
                    <Plus size={16} />
                    New note
                </Button>
            </div>

            {/* Stats */}
            {!isLoading && matchNotes.length > 0 &&
                <div className="mb-6 grid grid-cols-2 gap-3 sm:max-w-xl sm:grid-cols-4">
                    <Card className="px-4 py-3">
                        <div className="text-[11px] uppercase tracking-wide text-muted">Picks</div>
                        <div className="text-xl font-bold">{totals.picks}</div>
                    </Card>
                    <Card className="px-4 py-3">
                        <div className="text-[11px] uppercase tracking-wide text-muted">Correct</div>
                        <div className="text-xl font-bold text-win">{totals.wins}</div>
                    </Card>
                    <Card className="px-4 py-3">
                        <div className="text-[11px] uppercase tracking-wide text-muted">Win rate</div>
                        <div className="text-xl font-bold">{winRate != null ? `${winRate}%` : '—'}</div>
                    </Card>
                    <Card className="px-4 py-3">
                        <div className="text-[11px] uppercase tracking-wide text-muted">Points</div>
                        <div className="text-xl font-bold text-pitch-700">{totals.points}</div>
                    </Card>
                </div>
            }

            {/* Loading skeletons */}
            {isLoading &&
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="flex flex-col gap-3 p-5">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                            <div className="grid grid-cols-2 gap-3">
                                <Skeleton className="h-12" />
                                <Skeleton className="h-12" />
                            </div>
                            <Skeleton className="h-16" />
                        </Card>
                    ))}
                </div>
            }

            {/* Empty state */}
            {!isLoading && matchNotes.length === 0 &&
                <Card className="mx-auto mt-10 flex w-full max-w-md flex-col items-center gap-3 p-10 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pitch-50 text-pitch-600">
                        <NotebookPen size={22} />
                    </div>
                    <div className="text-base font-bold">No match notes yet</div>
                    <p className="text-sm text-muted">
                        Write your first prediction before kickoff: pick, confidence, and the reasoning behind it.
                    </p>
                    <Button className="mt-2" onPress={() => { setOpenDialog(true) }}>
                        <Plus size={16} />
                        Create your first note
                    </Button>
                </Card>
            }

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    matchNotes.map((v, index) => (
                        <MatchCard
                            key={v.id || v._id || index}
                            info={v}
                            onClick={() => { setEditData(v) }}
                            onChanged={() => { toast.success('Note deleted'); loadMyMatchNotes() }}
                        />
                    ))
                }
            </div>

            <DialogComponent open={openDialog} setOpenDialog={closeDialog}>
                <MatchForm data={editData || null} onSaved={onNoteSaved}/>
            </DialogComponent>
        </>
    )
}
