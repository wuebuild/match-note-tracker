'use client'

import { useState } from "react"
import WBInput from "../common/Input/Input"
import WBButton from "../common/Button/Button"
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
            await registerUser({
                ...form,
                confirmPassword
            })
        } else { toast.error("Please fill the form") }
    }

    return (
        <div className="flex overflow-hidden relative w-full h-full">
            <div className="z-20 flex w-full items-center justify-center">
                <div className="flex flex-col justify-center items-center w-90 text-xl">
                    <div className="flex flex-col gap-1 p-6 m-4 w-full bg-white rounded shadow-lg">
                        <div className="grid gap-3">
                            <div className="w-full">
                                <WBInput title="Name"  value={form?.name || ''} onChange={(e:any) => {
                                    onChange({name: e})
                                }} placeHolder="Name" error={joiForm.name}/>
                            </div>
                            <div className="w-full">
                                <WBInput title="Email"  value={form?.email || ''} onChange={(e:any) => {
                                    onChange({email: e})
                                }} placeHolder="Email" error={joiForm.email}/>
                            </div>
                            <div className="w-full">
                                <WBInput title="Password" type="password" value={form?.password || ''} onChange={(e:any) => {
                                    onChange({password: e})
                                }} placeHolder="Password" error={joiForm.password}/>
                            </div>
                            <div className="w-full">
                                <WBInput title="Confirm Password" type="password" value={confirmPassword || ''} onChange={(e:any) => {
                                    setConfirmPassword(e)
                                }} placeHolder="Confirm Password" error={checkPassword() ? '' : "*Password not match"}/>
                            </div>
                            <WBButton loading={loading} className="mt-4" disabled={!checkPassword() || joiForm.name || joiForm.email || joiForm.password} onClick={() => {
                                register()
                            }}>Sign In</WBButton>
                            <div className="text-xs mt-8 text-right">Already have an account ? <span className="cursor-pointer" onClick={() => {
                                if (signIn) signIn()
                            }}>Sign In</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
