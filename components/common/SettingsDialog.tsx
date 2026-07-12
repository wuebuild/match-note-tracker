'use client'
import { useEffect, useState } from "react";
import { Button, Description, Input, Label, ListBox, Select, TextField } from "@heroui/react";
import { toast } from "react-toastify";
import { getMe, updateSettings } from "@/service/userService";

const PRIVACY_OPTIONS = [
    { value: 'public', label: 'Public — everyone sees my notes in the feed' },
    { value: 'supporters', label: 'Supporters only — paid supporters see my feed' },
    { value: 'private', label: 'Private — only I can see my notes' },
]

function SettingsDialog ({ onSaved }: { onSaved?: () => void }) {

    const [ name, setName ] = useState('')
    const [ feedPrivacy, setFeedPrivacy ] = useState('public')
    const [ isSaving, setIsSaving ] = useState(false)

    useEffect(() => {
        getMe().then((me) => {
            if (me) {
                setName(me.name || '')
                setFeedPrivacy(me.feedPrivacy || 'public')
            }
        }).catch(() => {})
    }, [])

    const save = async () => {
        setIsSaving(true)
        try {
            const updated = await updateSettings({ name, feedPrivacy })
            if (updated) {
                // keep the cached user name in sync
                try {
                    const cached = JSON.parse(localStorage.getItem('mgm_user') || '{}')
                    localStorage.setItem('mgm_user', JSON.stringify({ ...cached, name: updated.name }))
                } catch {}
                toast.success('Settings saved')
                if (onSaved) { onSaved() }
            } else {
                toast.error('Could not save settings')
            }
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="flex w-full flex-col gap-5">
            <div>
                <h2 className="text-lg font-bold">Settings</h2>
                <p className="text-sm text-muted">Your analyst identity and feed privacy.</p>
            </div>

            <TextField value={name} onChange={(v: string) => setName(v)}>
                <Label>Display name</Label>
                <Input placeholder="Your analyst name" />
            </TextField>

            <Select
                value={feedPrivacy}
                onChange={(key: any) => { if (key) setFeedPrivacy(String(key)) }}
            >
                <Label>Feed privacy</Label>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        {PRIVACY_OPTIONS.map(option => (
                            <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                                {option.label}
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </Select.Popover>
                <Description>Picks always stay locked for others until kickoff, whatever you choose.</Description>
            </Select>

            <div className="flex justify-end">
                <Button isDisabled={isSaving || !name.trim()} onPress={save}>
                    {isSaving ? 'Saving…' : 'Save settings'}
                </Button>
            </div>
        </div>
    )
}

export default SettingsDialog
