'use client';

import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { setValue } from '@/utlis/reactSelect';
import { saveNote, updateNote } from '@/utlis/storage/notes';
import { createNotes, updateNotes } from '@/service/notesService';

function MatchForm(props: MatchFormProps) {

    const pickTypeOptions = [
        { value: 1, label: '1x2' },
        { value: 2, label: 'Over/Under' },
    ]

    const winnerOptions = [
        { value: 'home', label: 'Home' },
        { value: 'away', label: 'Away' },
        { value: 'draw', label: 'Draw' }
    ];

    const overUnderOptions = [
        { value: 'ov1', label: "Over 2.5"},
        { value: 'ov2', label: "Over 3.5" },
        { value: 'ov3', label: "Over 4.5" },
        { value: 'un1', label: "Under 2.5"},
        { value: 'un2', label: "Under 3.5" },
        { value: 'un3', label: "Under 4.5" },
    ];

    const [ defaultOptions, setDefaultOptions ] = useState<{value: string, label: string}[]>([])
    // let defaultOptions : {value: string, label: string}[] = []

    const [ pickForm, setPickForm ] = useState<MatchNotes>({
        id: null,
        _id: null,
        title: "",
        pickTypeId: "",
        pickType: "",
        pick: "",
        pickInfo: "",
        confidence: 10,
        reason: {
            id: "",
            en: "",
            idn: ""
        },
        kickOffTime: new Date(),
        pickResult: null,
        result: "",
        reflection: "",
        user: null,
        createdDate: new Date(),
        isSynced: false
    })

    const onChange = (e : any) => {
        setPickForm(prev => ({
            ...prev,
            ...e
        }))
    }

    useEffect(() => {
        if (!props.data) { return; }
        setPickForm(prev => ({
            ...prev,
            ...props.data
        }))
    }, [props.data])

    useEffect(() => {
        if (pickForm.pickTypeId == '1') {
            setDefaultOptions(winnerOptions);
        } else if (pickForm.pickTypeId == '2') {
            setDefaultOptions(overUnderOptions);
        } else {
            setDefaultOptions([]);
        }
    }, [pickForm.pickTypeId]) // eslint-disable-next-line react-hooks/exhaustive-deps

    const submitForm = async () => {
        const form = {
            ...pickForm,
            kickOffTime: pickForm.kickOffTime ? new Date(pickForm.kickOffTime).toISOString() : new Date()
        }
        const session = localStorage.getItem('mgm_access_token')
        if (pickForm.id || pickForm._id) { 
            if (session)  { 
                await updateNotes(form)
            } else { updateNote(form)  }
            // window.location.reload()
        } else { 
            if (session) {
                await createNotes(form)
            } else { saveNote(form) }
        }
    }

    return (
        <div className='w-full md:p-0'>
            <div className={`grid ${(pickForm.id || pickForm._id) ? 'grid-cols-1' : 'grid-cols-1'}`}>
                <div className='grid gap-[16px]'>
                    <div>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-password">
                                Match Title
                            </label>
                            <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                value={pickForm.title} onChange={(e) => { onChange({title: e.currentTarget.value}) }} type="text" placeholder="Manchester United vs Tottenham"/>
                        </div>
                    </div>
                    <div>
                        <div className="w-full md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-password">
                                Kick Off Time
                            </label>
                            <DatePicker
                                className="h-full w-full resize-none rounded-md border border-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                selected={pickForm.kickOffTime}
                                onChange={(date) => onChange({kickOffTime: date})}
                                showTimeSelect
                                dateFormat="YYYY-MM-dd HH:mm"
                            />
                            {/* <p className="text-gray-600 text-xs italic">Your confidence for your pick is {pickForm.confidence}</p> */}
                        </div>
                    </div>
                    <div>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-password">
                                Pick Type
                            </label>
                            <div className="w-full">
                                <Select
                                    classNames={{
                                        control: () => 'h-full w-full resize-none rounded-md border border-gray-200 bg-transparent px-1 py-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50',
                                    }}
                                    value={setValue(pickForm.pickTypeId, pickTypeOptions)}
                                    isClearable
                                    options={pickTypeOptions}
                                    onChange={(newValue : any) => onChange({pickTypeId: newValue.value, pickType: newValue.label, pick: null, pickInfo: null})}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-password">
                                Pick
                            </label>
                            <div className="w-full">
                                <CreatableSelect
                                    classNames={{
                                        control: () => 'h-full w-full resize-none rounded-md border border-gray-200 bg-transparent px-1 py-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50',
                                    }}
                                    value={setValue(pickForm.pick, defaultOptions)}
                                    isClearable
                                    options={defaultOptions}
                                    onChange={(newValue : any) => onChange({pickInfo: newValue.value, pick: newValue.label})}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-password">
                                Confidence
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={pickForm.confidence}
                                onChange={(e) => {
                                    onChange({ confidence: e.currentTarget.value })
                                }}
                            />
                            <p className="text-gray-600 text-xs italic">Your confidence for your pick is {pickForm.confidence}</p>
                        </div>
                    </div>
                    <div>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-password">
                                Reason (EN)
                            </label>
                            <textarea
                                className="h-full min-h-[100px] w-full resize-none rounded-md border border-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                value={pickForm.reason.en}
                                onChange={(e) => {
                                    onChange({ reason: { ...pickForm.reason, en: e.currentTarget.value} })
                                }}
                            />
                            {/* <p className="text-gray-600 text-xs italic">Your confidence for your pick is {pickForm.confidence}</p> */}
                        </div>
                    </div>
                    <div className='-mt-4'>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-password">
                                Reason (ID)
                            </label>
                            <textarea
                                className="h-full min-h-[100px] w-full resize-none rounded-md border border-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                value={pickForm.reason.id}
                                onChange={(e) => {
                                    onChange({ reason: { ...pickForm.reason, id: e.currentTarget.value} })
                                }}
                            />
                            {/* <p className="text-gray-600 text-xs italic">Your confidence for your pick is {pickForm.confidence}</p> */}
                        </div>
                    </div>
                </div>
                <div className='grid'>
                    {
                        (pickForm.id || pickForm._id) &&
                        <>
                            <div className="w-full py-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-password">
                                    Pick Result
                                </label>
                                <Select
                                    classNames={{
                                        control: () => 'h-full w-full resize-none rounded-md border border-gray-200 bg-transparent px-1 py-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50',
                                    }}
                                    value={setValue(pickForm.pickResult, [
                                        {label: 'Right', value: 'true'},
                                        {label: 'False', value: 'false'},
                                    ])}
                                    isClearable
                                    options={[
                                        {label: 'Right', value: 'true'},
                                        {label: 'False', value: 'false'},
                                    ]}
                                    onChange={(newValue : any) => onChange({pickResult: newValue.value})}
                                />
                            </div>
                            <div className="min-h-[100px]">
                                <div className="w-full">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-password">
                                        Result
                                    </label>
                                    <textarea
                                        className="h-full min-h-[100px] w-full resize-none rounded-md border border-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                        value={pickForm.result}
                                        onChange={(e) => {
                                            onChange({ result: e.currentTarget.value })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="min-h-[100px]">
                                <div className="w-full">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-password">
                                        Reflection
                                    </label>
                                    <textarea
                                        className="h-full min-h-[100px] w-full resize-none rounded-md border border-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                        value={pickForm.reflection}
                                        onChange={(e) => {
                                            onChange({ reflection: e.currentTarget.value })
                                        }}
                                    />
                                    <p className="text-gray-600 text-xs italic">Your result & reflection can be edited when the match end</p>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className='align-right text-right mt-8'>
                <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer"
                    onClick={() => submitForm()}
                >
                    <span>Save</span>
                </button>
            </div>
        </div>
    )    
}

export default MatchForm

interface MatchFormProps {
    data: MatchNotes | null
}