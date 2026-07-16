import { client } from "@/utlis/axios";

interface LoadFixturesParams {
    search?: string,
    league?: string,
    date?: string,
    upcoming?: boolean,
    finished?: boolean,
    page?: number,
    limit?: number,
}

export async function loadFixtures (params: LoadFixturesParams = {}) {
    const query = new URLSearchParams()
    if (params.search) { query.set('search', params.search) }
    if (params.league) { query.set('league', params.league) }
    if (params.date) { query.set('date', params.date) }
    if (params.upcoming) { query.set('upcoming', '1') }
    if (params.finished) { query.set('finished', '1') }
    query.set('page', String(params.page ?? 0))
    if (params.limit) { query.set('limit', String(params.limit)) }
    const res = await client.get(`/fixtures/list?${query.toString()}`)
    return (res.data?.data || []) as Fixture[]
}
