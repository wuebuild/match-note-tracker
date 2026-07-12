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

export async function getMe () {
    const res = await client.get('/user/me')
    return (res.data?.data || null) as MyProfile | null
}

export async function updateSettings (settings: { name?: string, bio?: string, feedPrivacy?: string }) {
    const res = await client.patch('/user/settings', settings)
    return (res.data?.data || null) as MyProfile | null
}

export async function toggleFavouriteTeam (teamId: string) {
    const res = await client.post('/user/favourite-teams/toggle', { teamId })
    return res.data?.data as { favourite: boolean, favouriteTeams: MyProfile['favouriteTeams'] } | undefined
}