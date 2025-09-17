import { client } from "@/utlis/axios";

type LoadListNotesParams = {
  limit?: number
  page?: number
  national?: boolean
  name?: string
}

export async function loadTeams ({
    limit,
    page,
    national = false,
    name = '',
} : LoadListNotesParams) {
    const res = await client.get(`/teams/list?name=${name}&limit=${limit}&page=${page}&national=${national}`)
    return res.data.data
}