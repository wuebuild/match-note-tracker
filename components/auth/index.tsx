'use client'
import React, { useState } from "react"
import Login from "./LoginForm"
import Register from "./RegisterForm"
import Image from "next/image"

function Auth ({

}) {

    const [ register, setOpenRegister ] = useState(false)

    return (
        <div>
            <div className="justify-items-center w-full">
                <Image className="rounded-sm" src="/logo_.png" width={60} height={60} alt="Match Note Maker"/>
            </div>
            { !register && <Login signUp={() => { setOpenRegister(true) }}/> }
            { register && <Register signIn={() => { setOpenRegister(false) }}/>}
        </div>
    )
}

export default Auth