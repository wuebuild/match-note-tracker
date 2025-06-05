'use client';

import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MatchForm({

}) {

    const defaultOptions = [
        { value: 'Home', label: 'Home' },
        { value: 'Away', label: 'Away' },
        { value: 'Draw', label: 'Draw' }
    ];

    const [ pickForm, setPickForm ] = useState<MatchNotes>({
        _id: null,
        title: "",
        pick: "",
        confidence: 10,
        reason: {
            en: "",
            id: ""
        },
        kickOffTime: new Date(),
        result: "",
        user: null,
        createdDate: null
    })

    const onChange = (e : any) => {
        setPickForm(prev => ({
            ...prev,
            ...e
        }))
    }

    const submitForm = async () => {
        let form = {
            ...pickForm,
            kickOffTime: pickForm.kickOffTime ? new Date(pickForm.kickOffTime).toISOString() : new Date()
        }
        console.log(pickForm)
    }

    return (
        <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Match Title
                    </label>
                    <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        onChange={(e) => { onChange({title: e.currentTarget.value}) }}
                        id="grid-password" type="text" placeholder="Manchester United vs Tottenham"/>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Pick
                    </label>
                    <div className="w-full">
                        <CreatableSelect
                            isClearable
                            options={defaultOptions}
                            onChange={(newValue : any) => onChange({pick: newValue})}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
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
            <div className="min-h-[100px] -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Reason (EN)
                    </label>
                    <textarea
                        className="h-full min-h-[100px] w-full resize-none rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                        value={pickForm.reason.en}
                        onChange={(e) => {
                            onChange({ reason: { ...pickForm.reason, en: e.currentTarget.value} })
                        }}
                    />
                    {/* <p className="text-gray-600 text-xs italic">Your confidence for your pick is {pickForm.confidence}</p> */}
                </div>
            </div>
            <div className="min-h-[100px] -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Reason (ID)
                    </label>
                    <textarea
                        className="h-full min-h-[100px] w-full resize-none rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                        value={pickForm.reason.id}
                        onChange={(e) => {
                            onChange({ reason: { ...pickForm.reason, id: e.currentTarget.value} })
                        }}
                    />
                    {/* <p className="text-gray-600 text-xs italic">Your confidence for your pick is {pickForm.confidence}</p> */}
                </div>
            </div>
            <div className="min-h-[100px] -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Kick Off Time
                    </label>
                    <DatePicker
                        selected={pickForm.kickOffTime}
                        onChange={(date) => onChange({kickOffTime: date})}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                    {/* <p className="text-gray-600 text-xs italic">Your confidence for your pick is {pickForm.confidence}</p> */}
                </div>
            </div>
            <div className="min-h-[100px] -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Result & Reflection
                    </label>
                    <textarea
                        className="h-full min-h-[100px] w-full resize-none rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                        value={pickForm.reason.id}
                        onChange={(e) => {
                            onChange({ reason: { ...pickForm.reason, id: e.currentTarget.value} })
                        }}
                    />
                    <p className="text-gray-600 text-xs italic">Your result & reflection can be edited when the match end</p>
                </div>
            </div>
        </form>
    )    
}

export default MatchForm