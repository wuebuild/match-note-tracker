import moment from "moment";
import Card from "../tailwind/Card"
import { timeConverter } from "@/utlis/time/time";
import DialogComponent from "../tailwind/DialogComponent";
import { useState } from "react";
import { pickResultColor, pickResulTitle } from "@/utlis/pickResult";
import DeleteForm from "./DeleteForm";

function MatchCard (props: MatchCardProps) {
    const { info, onClick } = props
    let generatedPost = `📋 Match: ${info.title}\n`
    generatedPost += `🎯 Pick: ${info.pick}\n`
    generatedPost += `🔢 Confidence: ${info.confidence}/10\n`
    generatedPost += `🧠 Reason:\n`
    generatedPost += `EN: ${info.reason.en || '-'}\n`
    generatedPost += `ID: ${info.reason.id || '-'}\n\n\n`
    generatedPost += `🕐 Kickoff: ${moment(new Date(info.kickOffTime).toISOString()).format('YYYY-MM-DD')} ${timeConverter(info.kickOffTime)} UTC\n`
    generatedPost += `📌 Result: ${info.result || 'TBD'}\n`
    generatedPost += `🔁 Reflection: ${info.reflection || '-'}\n`

    const [ openDialog, setOpenDialog ] = useState(false)
    return (
        <Card img={null} tag={null} className={"h-full flex flex-col"}>
            <div className="relative flex flex-col justify-between flex-grow">
                <div>
                    <div className="gap-16 max-h-[60px]">
                        <div className="flex-auto grid gap-[8px]">
                            <div className="font-bold text-[20px]">{info.title}</div>
                        </div>
                        <div className="text-[8px]">posted: {`${moment(info.createdDate).format('YYYY-MM-DD HH:mm')}`}</div>
                        {
                            (info.pickResult != null && info.pickResult != undefined) &&
                            <div className={`absolute right-[-70px] top-[0px] w-[150px] transform -rotate-320 text-center font-bold text-white text-[10px] py-1 ${pickResultColor(info)}`}>
                                {pickResulTitle(info)}
                            </div>
                        }
                    </div>
                    <div className="grid grid-cols-1 mt-4">
                        <div>
                            <div className="text-gray-500 text-[12px]">Kick Off Time:</div>
                            <div className="text-[12px]">{`${moment(new Date(info.kickOffTime).toISOString()).format('YYYY-MM-DD')} ${timeConverter(info.kickOffTime)} UTC`}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mt-4">
                        <div>
                            <div className="text-gray-500 text-[12px]">Analyst Pick:</div>
                            <div className="font-bold text-[16px]">{info.pickType} {info.pick}</div>
                        </div>
                        <div>
                            <div className="text-gray-500 text-[12px]">Analyst Confidence:</div>
                            <div className="font-bold text-[16px]">{info.confidence}</div>  
                        </div>
                    </div>
                    <div className="gap-16 mt-4 min-h-30 max-h-30 text-[14px] overflow-scroll">
                        <div className="text-gray-500 text-[12px]">Reason:</div>
                        <div>{info.reason.id}</div>
                        <div>{info.reason.en}</div>
                    </div>
                </div>
                <div>
                    <div className="text-center text-[12px] cursor-pointer underline" onClick={() => {
                        window.location.href = `/notes/${info.id || info._id}`
                    }}>Read more</div>
                </div>
                <div className="flex gap-2 mt-4 justify-end">
                    <div className="text-right">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(generatedPost);
                                alert("Copied to clipboard!");
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-[12px] font-bold"
                        >Copy</button>
                    </div>
                    <div className="text-right">
                        <button
                            onClick={() => { onClick() }}
                            className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 text-[12px] font-bold"
                        >Edit</button>
                    </div>
                    <div className="text-right">
                        <button
                            onClick={() => { setOpenDialog(true) }}
                            className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 text-[12px] font-bold"
                        >Delete</button>
                    </div>
                    {/* <div className="text-right">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(generatedPost);
                                alert("Copied to clipboard!");
                            }}
                            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 text-[10px] font-bold"
                        >Send Telegram</button>
                    </div> */}
                </div>
            </div>
            <DialogComponent open={openDialog} setOpenDialog={() => {
                setOpenDialog(false)
            }}>
                <DeleteForm noteId={info.id || info._id || ''} closeDialog={() => { setOpenDialog(false) }}/>
            </DialogComponent>
        </Card>
    )
}

export default MatchCard

interface MatchCardProps {
    info: MatchNotes, 
    onClick: any
}