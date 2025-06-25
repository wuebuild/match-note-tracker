import { client } from "@/utlis/axios"
import { toast } from "react-toastify"

export async function logIn(credentials: Login) {
    const res = await client.post('/auth/login', {
        ...credentials
    })
    let { data } = res
    let { error } = data
    if (error) {
        toast.error(res ? error.data.message : '', { toastId: 'error_login' }) 
        return { data: null }
    }
    toast.success("Login success")
    let userInfo : User = {
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
        refresh_token: data.data.refresh_token
    }
    let token : UserToken = {...res.data.data}
    if (token) { 
        localStorage.setItem('mgm_user', JSON.stringify(userInfo))
        localStorage.setItem('mgm_access_token', token.access_token)
        window.location.reload();
    } else { toast.error("Wrong email / password") }
}