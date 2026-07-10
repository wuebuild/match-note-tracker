"use client"
import { useEffect, useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";
import { logIn } from "@/service/authService";

interface LoginProps {
    signUp?: any
}

export default function Login({ signUp } : LoginProps) {

  const [ credentials, setCredentials ] = useState({
    email: '',
    password: ''
  })
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem('mgm_access_token')
    if (session) { window.location.replace('/') }
  }, []);

  const submitCredentials = async () => {
    setLoading(true)
    try {
      await logIn({
        email: credentials.email,
        password: credentials.password
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="text-center">
        <h2 className="text-lg font-bold">Welcome back</h2>
        <p className="text-sm text-muted">Sign in to sync your notes and climb the leaderboard.</p>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => { e.preventDefault(); submitCredentials() }}
      >
        <TextField name="email" type="email" isRequired value={credentials.email}
          onChange={(v: string) => setCredentials(prev => ({ ...prev, email: v }))}>
          <Label>Email</Label>
          <Input placeholder="you@example.com" />
        </TextField>
        <TextField name="password" type="password" isRequired value={credentials.password}
          onChange={(v: string) => setCredentials(prev => ({ ...prev, password: v }))}>
          <Label>Password</Label>
          <Input placeholder="••••••••" />
        </TextField>
        <Button type="submit" fullWidth isDisabled={loading} className="mt-2">
          {loading ? 'Signing in…' : 'Sign In'}
        </Button>
      </form>
      <div className="text-center text-xs text-muted">
        {"Don't have an account? "}
        <button type="button" className="cursor-pointer font-semibold text-pitch-600 hover:underline" onClick={() => {
          if (signUp) signUp()
        }}>Sign up</button>
      </div>
    </div>
  );
}
