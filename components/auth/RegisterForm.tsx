'use client'

import { useEffect, useState } from "react"
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import { toast } from "react-toastify"
import { registerUser } from "@/service/userService"

interface RegisterProps {
    signIn?: any
}

function Register ({ signIn } : RegisterProps) {

    const [ form, setForm ] = useState<AccountInfo>()
    const [ joiForm, setJoiForm] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if (form) {
            setJoiForm({
                name: form.name ? '' : "Name can't be empty",
                email: form.email ? '' : "Email can't be empty",
                password: form.password ? '' : "Password can't be empty"
            })
        }
    }, [form])

    const onChange = (e:any) => {
        setForm(prev => ({
            ...prev,
            ...e
        }))
    }

    const checkPassword = () => {
        return (form?.password == confirmPassword)
    }

    const register = async () => {
        if (form) {
            setLoading(true)
            await registerUser({
                ...form,
                confirmPassword
            })
            setLoading(false)
        } else { toast.error("Please fill the form") }
    }

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="text-center">
                <h2 className="text-lg font-bold">Create your account</h2>
                <p className="text-sm text-muted">Keep your analysis history and earn points for correct picks.</p>
            </div>
            <TextField isRequired value={form?.name || ''} isInvalid={Boolean(joiForm.name)}
                onChange={(v: string) => onChange({name: v})}>
                <Label>Name</Label>
                <Input placeholder="Your name" />
                <FieldError>{joiForm.name}</FieldError>
            </TextField>
            <TextField type="email" isRequired value={form?.email || ''} isInvalid={Boolean(joiForm.email)}
                onChange={(v: string) => onChange({email: v})}>
                <Label>Email</Label>
                <Input placeholder="you@example.com" />
                <FieldError>{joiForm.email}</FieldError>
            </TextField>
            <TextField type="password" isRequired value={form?.password || ''} isInvalid={Boolean(joiForm.password)}
                onChange={(v: string) => onChange({password: v})}>
                <Label>Password</Label>
                <Input placeholder="••••••••" />
                <FieldError>{joiForm.password}</FieldError>
            </TextField>
            <TextField type="password" isRequired value={confirmPassword} isInvalid={!checkPassword()}
                onChange={(v: string) => setConfirmPassword(v)}>
                <Label>Confirm password</Label>
                <Input placeholder="••••••••" />
                <FieldError>Password does not match</FieldError>
            </TextField>
            <Button fullWidth className="mt-2"
                isDisabled={loading || !checkPassword() || Boolean(joiForm.name || joiForm.email || joiForm.password)}
                onPress={() => { register() }}>
                {loading ? 'Creating account…' : 'Sign Up'}
            </Button>
            <div className="text-center text-xs text-muted">
                Already have an account?{' '}
                <button type="button" className="cursor-pointer font-semibold text-pitch-600 hover:underline" onClick={() => {
                    if (signIn) signIn()
                }}>Sign in</button>
            </div>
        </div>
    )
}

export default Register
