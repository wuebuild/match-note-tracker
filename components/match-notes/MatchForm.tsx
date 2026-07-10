'use client';

import { useEffect, useState } from 'react';
import { Button, Description, Input, Label, ListBox, Select, Slider, TextArea, TextField } from '@heroui/react';
import { saveNote, updateNote } from '@/utlis/storage/notes';
import { createNotes, updateNotes } from '@/service/notesService';
import { toDatetimeLocal } from '@/utlis/time/time';

const pickTypeOptions = [
    { value: '1', label: '1x2' },
    { value: '2', label: 'Over/Under' },
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

const pickResultOptions = [
    { value: 'true', label: 'Right — I called it' },
    { value: 'false', label: 'Wrong — bad call' },
]

const CUSTOM_PICK = '__custom__'

const bilingualToString = (value: any) =>
    typeof value === 'object' && value !== null ? (value.en || value.id || '') : (value || '')

function MatchForm(props: MatchFormProps) {

    const [ isSaving, setIsSaving ] = useState(false)
    const [ isCustomPick, setIsCustomPick ] = useState(false)

    const [ pickForm, setPickForm ] = useState<MatchNotes>({
        id: null,
        _id: null,
        title: "",
        pickTypeId: "",
        pickType: "",
        pick: "",
        pickInfo: "",
        confidence: 7,
        reason: { id: "", en: "", idn: "" },
        kickOffTime: new Date(),
        pickResult: null,
        result: "",
        reflection: "",
        user: null,
        createdDate: new Date(),
        isSynced: false
    })

    const isEditing = Boolean(pickForm.id || pickForm._id)
    const pickOptions = String(pickForm.pickTypeId) === '1' ? winnerOptions
        : String(pickForm.pickTypeId) === '2' ? overUnderOptions
        : []

    const onChange = (e : any) => {
        setPickForm(prev => ({ ...prev, ...e }))
    }

    useEffect(() => {
        if (!props.data) { return; }
        const data = props.data
        setPickForm(prev => ({
            ...prev,
            ...data,
            result: bilingualToString(data.result),
            reflection: bilingualToString(data.reflection),
        }))
        const options = String(data.pickTypeId) === '1' ? winnerOptions
            : String(data.pickTypeId) === '2' ? overUnderOptions : []
        setIsCustomPick(Boolean(data.pick) && !options.some(o => o.label === data.pick))
    }, [props.data])

    const selectedPickKey = isCustomPick ? CUSTOM_PICK
        : (pickOptions.find(o => o.label === pickForm.pick)?.value ?? null)

    const submitForm = async () => {
        const form = {
            ...pickForm,
            kickOffTime: pickForm.kickOffTime ? new Date(pickForm.kickOffTime).toISOString() : new Date()
        }
        const session = localStorage.getItem('mgm_access_token')
        setIsSaving(true)
        try {
            if (isEditing) {
                if (session) { await updateNotes(form, props.onSaved) }
                else { updateNote(form, props.onSaved) }
            } else {
                if (session) { await createNotes(form, props.onSaved) }
                else { saveNote(form, props.onSaved) }
            }
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className='flex w-full flex-col gap-5'>
            <div>
                <h2 className='text-lg font-bold text-foreground'>{isEditing ? 'Update match note' : 'New match note'}</h2>
                <p className='text-sm text-muted'>{isEditing ? 'Record the result and what you learned.' : 'Lock in your analysis before kickoff.'}</p>
            </div>

            <TextField value={pickForm.title} onChange={(v: string) => onChange({ title: v })}>
                <Label>Match</Label>
                <Input placeholder="Manchester United vs Tottenham" />
            </TextField>

            <TextField
                type="datetime-local"
                value={toDatetimeLocal(pickForm.kickOffTime)}
                onChange={(v: string) => onChange({ kickOffTime: v ? new Date(v) : new Date() })}
            >
                <Label>Kick-off time</Label>
                <Input />
            </TextField>

            <div className='grid gap-5 sm:grid-cols-2'>
                <Select
                    placeholder="Choose type"
                    value={String(pickForm.pickTypeId || '') || null}
                    onChange={(key: any) => {
                        const option = pickTypeOptions.find(o => o.value === String(key))
                        if (!option) { return }
                        setIsCustomPick(false)
                        onChange({ pickTypeId: option.value, pickType: option.label, pick: null, pickInfo: null })
                    }}
                >
                    <Label>Pick type</Label>
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            {pickTypeOptions.map(option => (
                                <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                                    {option.label}
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>

                <Select
                    placeholder={pickOptions.length ? "Your call" : "Choose a pick type first"}
                    isDisabled={!pickOptions.length}
                    value={selectedPickKey}
                    onChange={(key: any) => {
                        if (String(key) === CUSTOM_PICK) {
                            setIsCustomPick(true)
                            onChange({ pick: '', pickInfo: '' })
                            return
                        }
                        const option = pickOptions.find(o => o.value === String(key))
                        if (!option) { return }
                        setIsCustomPick(false)
                        onChange({ pickInfo: option.value, pick: option.label })
                    }}
                >
                    <Label>Pick</Label>
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            {pickOptions.map(option => (
                                <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                                    {option.label}
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                            <ListBox.Item id={CUSTOM_PICK} textValue="Custom pick">
                                Custom pick…
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>

            {isCustomPick && (
                <TextField value={pickForm.pick || ''} onChange={(v: string) => onChange({ pick: v, pickInfo: v })}>
                    <Label>Custom pick</Label>
                    <Input placeholder="e.g. Both teams to score" />
                </TextField>
            )}

            <Slider
                minValue={0}
                maxValue={10}
                step={1}
                value={Number(pickForm.confidence)}
                onChange={(v: any) => onChange({ confidence: v })}
            >
                <Label>Confidence</Label>
                <Slider.Output />
                <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                </Slider.Track>
            </Slider>

            <div className='flex flex-col gap-2'>
                <Label htmlFor="reason-en">Reason (English)</Label>
                <TextArea
                    id="reason-en"
                    rows={3}
                    placeholder="Why do you believe this pick is right?"
                    value={pickForm.reason.en}
                    onChange={(e) => onChange({ reason: { ...pickForm.reason, en: e.target.value } })}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <Label htmlFor="reason-id">Reason (Indonesian)</Label>
                <TextArea
                    id="reason-id"
                    rows={3}
                    placeholder="Alasan analisis kamu (opsional)"
                    value={pickForm.reason.id}
                    onChange={(e) => onChange({ reason: { ...pickForm.reason, id: e.target.value } })}
                />
            </div>

            {isEditing && (
                <div className='flex flex-col gap-5 rounded-xl border border-line bg-pitch-50/50 p-4'>
                    <div className='text-sm font-bold text-foreground'>After the match</div>
                    <Select
                        placeholder="How did your pick go?"
                        value={pickForm.pickResult ?? null}
                        onChange={(key: any) => onChange({ pickResult: String(key) })}
                    >
                        <Label>Pick result</Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                {pickResultOptions.map(option => (
                                    <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                                        {option.label}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="result">Match result</Label>
                        <TextArea
                            id="result"
                            rows={2}
                            placeholder="Final score and what happened"
                            value={pickForm.result as string}
                            onChange={(e) => onChange({ result: e.target.value })}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="reflection">Reflection</Label>
                        <TextArea
                            id="reflection"
                            rows={3}
                            placeholder="What did you get right or miss in your analysis?"
                            value={pickForm.reflection as string}
                            onChange={(e) => onChange({ reflection: e.target.value })}
                        />
                        <Description>Fill this in once the match ends — it&apos;s where the learning happens.</Description>
                    </div>
                </div>
            )}

            <div className='mt-1 flex justify-end'>
                <Button isDisabled={isSaving || !pickForm.title} onPress={() => submitForm()}>
                    {isSaving ? 'Saving…' : isEditing ? 'Save changes' : 'Save note'}
                </Button>
            </div>
        </div>
    )
}

export default MatchForm

interface MatchFormProps {
    data: MatchNotes | null
    onSaved?: () => void
}
