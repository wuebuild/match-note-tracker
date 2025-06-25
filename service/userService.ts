import { client } from "@/utlis/axios"
import { toast } from "react-toastify"

export async function registerUser(userInfo: AccountInfo) {
    const res = await client.post('/auth/sign-up', {
        ...userInfo
    })
    let { data } = res
    let { error } = data
    if (error) {
        toast.error(res ? error.data.message : '', { toastId: 'error_register' }) 
        return { data: null }
    }
    let userData : User = {
        id: data.data.id,
        name: data.data.name,
        email: data.data.email, 
        refresh_token: data.data.refresh_token
    }
    let token : UserToken = {...res.data.data}
    if (token) { 
      localStorage.setItem('mgm_user', JSON.stringify(userData))
      localStorage.setItem('mgm_access_token', token.access_token)
      window.location.reload();
    }
}

export async function signUp(token: string) {
    const res = await client.get('/auth/signup', {
        data: {}
    })
}