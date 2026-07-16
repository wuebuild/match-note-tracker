'use client'
import { useEffect, useMemo, useState } from "react"
import { Button, Card, Chip, Input, Label, Skeleton, Table, TextField } from "@heroui/react"
import { PenLine, CalendarX } from "lucide-react"
import { useDebounce } from "use-debounce"
import { toast } from "react-toastify"
import { loadFixtures } from "@/service/fixtureService"
import { formatDate, timeConverter } from "@/utlis/time/time"
import DialogComponent from "@/components/tailwind/DialogComponent"
import MatchForm from "@/components/match-notes/MatchForm"

type StatusTab = 'upcoming' | 'finished' | 'all'

const STATUS_TABS: { key: StatusTab, label: string }[] = [
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'finished', label: 'Finished' },
    { key: 'all', label: 'All' },
]

const statusChip = (status?: string): { label: string, color: 'accent' | 'success' | 'default' } => {
    if (['1H', 'HT', '2H'].includes(status || '')) { return { label: 'Live', color: 'accent' } }
    if (['FT', 'AET', 'PEN'].includes(status || '')) { return { label: 'Finished', color: 'default' } }
    return { label: 'Upcoming', color: 'success' }
}

export default function Fixtures() {
    const [fixtures, setFixtures] = useState<Fixture[]>([])
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState<StatusTab>('upcoming')
    const [league, setLeague] = useState<string>('all')
    const [search, setSearch] = useState("")
    const [debouncedSearch] = useDebounce(search, 400)
    const [selected, setSelected] = useState<Fixture | null>(null)
    const [openDialog, setOpenDialog] = useState(false)

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        const params = debouncedSearch
            ? { search: debouncedSearch, limit: 100 }
            : { upcoming: tab === 'upcoming', finished: tab === 'finished', limit: 100 }
        loadFixtures(params)
            .then((data) => { if (!cancelled) { setFixtures(data); setLoading(false) } })
            .catch(() => { if (!cancelled) { setFixtures([]); setLoading(false) } })
        return () => { cancelled = true }
    }, [tab, debouncedSearch])

    // league menu is derived from the loaded fixtures (with counts)
    const leagues = useMemo(() => {
        const counts = new Map<string, number>()
        for (const f of fixtures) {
            if (f.leagueName) { counts.set(f.leagueName, (counts.get(f.leagueName) || 0) + 1) }
        }
        return [...counts.entries()].sort((a, b) => b[1] - a[1])
    }, [fixtures])

    const visible = league === 'all' ? fixtures : fixtures.filter(f => f.leagueName === league)

    // reset league filter if the selected league disappears after a tab change
    useEffect(() => {
        if (league !== 'all' && !fixtures.some(f => f.leagueName === league)) { setLeague('all') }
    }, [fixtures, league])

    const startAnalysis = (fixture: Fixture) => {
        setSelected(fixture)
        setOpenDialog(true)
    }

    const prefill = selected ? ({
        title: `${selected.homeName} vs ${selected.awayName}`,
        kickOffTime: new Date(selected.schedule),
        fixture: selected._id,
        fixtureLabel: `${selected.homeName} vs ${selected.awayName}`,
    } as unknown as MatchNotes) : null

    const menuItemClass = (active: boolean) =>
        `flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${active ? 'bg-pitch-50 font-semibold text-pitch-700' : 'text-muted hover:bg-pitch-50/60'}`

    return (
        <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Fixtures</h1>
                <p className="text-sm text-muted">Pick a match, then write your analysis. Settled results link back automatically.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
                {/* Menu */}
                <aside className="flex flex-col gap-4">
                    <div className="flex gap-1 rounded-xl border border-line bg-white p-1">
                        {STATUS_TABS.map(t => (
                            <button
                                key={t.key}
                                className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors ${tab === t.key ? 'bg-pitch-700 text-white' : 'text-muted hover:bg-pitch-50'}`}
                                onClick={() => setTab(t.key)}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <Card className="p-2">
                        <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wide text-faint">Leagues</div>
                        <button className={menuItemClass(league === 'all')} onClick={() => setLeague('all')}>
                            <span>All leagues</span>
                            <span className="text-xs text-faint">{fixtures.length}</span>
                        </button>
                        {leagues.map(([name, count]) => (
                            <button key={name} className={menuItemClass(league === name)} onClick={() => setLeague(name)}>
                                <span className="truncate">{name}</span>
                                <span className="text-xs text-faint">{count}</span>
                            </button>
                        ))}
                    </Card>
                </aside>

                {/* Table */}
                <div>
                    <div className="mb-4 max-w-sm">
                        <TextField aria-label="Search fixtures" value={search} onChange={(v: string) => setSearch(v)}>
                            <Label className="sr-only">Search fixtures</Label>
                            <Input placeholder="Search team or league" />
                        </TextField>
                    </div>

                    {loading &&
                        <div className="flex flex-col gap-2">
                            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-12 rounded-lg" />)}
                        </div>
                    }

                    {!loading && visible.length === 0 &&
                        <Card className="flex flex-col items-center gap-3 p-10 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pitch-50 text-pitch-600">
                                <CalendarX size={22} />
                            </div>
                            <div className="text-base font-bold">No fixtures here yet</div>
                            <p className="max-w-sm text-sm text-muted">
                                {debouncedSearch
                                    ? 'No matches for this search. Try another team or league.'
                                    : 'Fixtures appear once the schedule is synced. You can still write a note manually from My Notes.'}
                            </p>
                        </Card>
                    }

                    {!loading && visible.length > 0 &&
                        <Card className="overflow-hidden p-0">
                            <Table>
                                <Table.ScrollContainer>
                                    <Table.Content aria-label="Fixtures" className="min-w-[560px]">
                                        <Table.Header>
                                            <Table.Column isRowHeader>Match</Table.Column>
                                            <Table.Column>League</Table.Column>
                                            <Table.Column>Kick-off</Table.Column>
                                            <Table.Column>Status</Table.Column>
                                            <Table.Column> </Table.Column>
                                        </Table.Header>
                                        <Table.Body>
                                            {visible.map((fixture) => {
                                                const chip = statusChip(fixture.status)
                                                const score = fixture.goalsHome != null && fixture.goalsAway != null
                                                    ? `${fixture.goalsHome}-${fixture.goalsAway}` : null
                                                return (
                                                    <Table.Row key={fixture._id}>
                                                        <Table.Cell>
                                                            <span className="font-semibold text-ink">{fixture.homeName} vs {fixture.awayName}</span>
                                                            {score && <span className="ml-2 font-bold text-pitch-700">{score}</span>}
                                                        </Table.Cell>
                                                        <Table.Cell className="text-muted">{fixture.leagueName || '-'}</Table.Cell>
                                                        <Table.Cell className="whitespace-nowrap text-muted">
                                                            {formatDate(fixture.schedule)} · {timeConverter(new Date(fixture.schedule))}
                                                        </Table.Cell>
                                                        <Table.Cell><Chip color={chip.color} size="sm">{chip.label}</Chip></Table.Cell>
                                                        <Table.Cell>
                                                            <Button size="sm" variant="secondary" onPress={() => startAnalysis(fixture)}>
                                                                <PenLine size={13} />
                                                                Analyze
                                                            </Button>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            })}
                                        </Table.Body>
                                    </Table.Content>
                                </Table.ScrollContainer>
                            </Table>
                        </Card>
                    }
                </div>
            </div>

            <DialogComponent open={openDialog} setOpenDialog={() => { setOpenDialog(false); setSelected(null) }} label="Write analysis">
                <MatchForm data={prefill} onSaved={() => {
                    setOpenDialog(false)
                    setSelected(null)
                    toast.success('Analysis saved to My Notes')
                }} />
            </DialogComponent>
        </div>
    )
}
