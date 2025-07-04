'use client'
import MatchCard from "@/components/match-notes/MatchCard"
import { loadNotes } from "@/utlis/storage/notes"
import { useEffect, useState } from "react"
import MatchForm from "@/components/match-notes/MatchForm";
import DialogComponent from "../tailwind/DialogComponent";
import Image from "next/image";
import { loadListNotes } from "@/service/notesService";

export default function NotesHistory ({

}) {

    const [ isLoading, setIsLoading ] = useState(true)
    const [ editData, setEditData ] = useState<MatchNotes|null>()
    const [ openDialog, setOpenDialog ] = useState(false)
    const [ matchNotes, setMatchNotes ] = useState<MatchNotes[]>([])
    
    useEffect(() => { loadMyMatchNotes() }, [])

    const loadMyMatchNotes = async () => {
        const session = localStorage.getItem('mgm_access_token')
        if (session) { 
            const data = await loadListNotes()
            if (data) { setMatchNotes(data.data) }
        } else {
            const data = await loadNotes()
            if (data) { setMatchNotes(data) }
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (editData) { setOpenDialog(true) }
    }, [editData])

    return (
        <>
            <div className="flex items-center gap-[16px] mb-4">
                <div className="font-bold text-[24px]">My Notes</div>
                <div onClick={() => {
                    setOpenDialog(true)
                }}><button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-[12px] font-bold">Create Notes</button></div>
            </div>
            {
                (!isLoading && matchNotes.length == 0) &&
                <div className="text-center w-full h-full mt-32">
                    <Image className="mx-auto my-auto" src={"/placeholder.png"} width={80} height={80} alt={"placeholder"} />
                    <div>Notes is empty</div>
                </div>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] w-[100%]">
                {   
                    matchNotes.map((v, index) => {
                        return (
                            <MatchCard key={index} info={v} onClick={() => {
                                setEditData(v)
                            }} />
                        )
                    })
                }
            </div>
            <DialogComponent open={openDialog} setOpenDialog={() => {
                setOpenDialog(false)
                setEditData(null)
            }}>
                <div>
                    <div className="cursor-pointer text-right pb-4 sticky" onClick={() => {
                        setOpenDialog(false)
                        setEditData(null)
                    }}>X</div>
                    <div className="pl-1 pr-1 overflow-auto">
                        <MatchForm data={editData || null}/>
                    </div>
                </div>
            </DialogComponent>
        </>
    )
}