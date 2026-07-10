'use client';
import { useEffect, useState } from "react";
import { Card, Input, Label, Skeleton, TextField } from "@heroui/react";
import { Shield } from "lucide-react";
import { useDebounce } from "use-debounce";
import { loadTeams } from "@/service/teamService";

export default function Teams() {

  const [teams, setTeams] = useState<Teams[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Teams>();
  const [debounceFilter] = useDebounce(search, 500)

  useEffect(() => {
    async function fetchTeams() {
      try {
        setIsLoading(true)
        const data = await loadTeams({
          limit: 20,
          page: 0,
          national: false,
          name: debounceFilter,
        });
        if (data) { setTeams(data); }
      } catch (err) {
        console.error("Error fetching teams:", err);
      } finally {
        setIsLoading(false)
      }
    }
    fetchTeams();
  }, [debounceFilter]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
        <p className="text-sm text-muted">Browse clubs to reference in your match notes.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Team list */}
        <Card className="max-h-[70vh] overflow-y-auto p-4">
          <TextField aria-label="Search team" value={search} onChange={(v: string) => setSearch(v)}>
            <Label className="sr-only">Search team</Label>
            <Input placeholder="Search team…" />
          </TextField>

          <ul className="mt-4 space-y-1">
            {isLoading && [...Array(6)].map((_, i) => (
              <li key={i} className="flex items-center gap-2 p-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </li>
            ))}
            {!isLoading && teams.map((item) => (
              <li
                key={item._id}
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg p-2 text-sm transition-colors ${selectedTeam?._id === item._id ? 'bg-pitch-50 font-semibold text-pitch-700' : 'hover:bg-pitch-50/60'}`}
                onClick={() => setSelectedTeam(item)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.logo} alt="" loading="lazy" className="h-6 w-6 object-contain" />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
          {!isLoading && teams.length === 0 && (
            <p className="mt-6 text-center text-sm text-muted">No teams found</p>
          )}
        </Card>

        {/* Detail panel */}
        <Card className="p-6 md:col-span-2">
          {selectedTeam ? (
            <div>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedTeam.logo} alt="" className="h-12 w-12 object-contain" />
                <div>
                  <h2 className="text-xl font-bold">{selectedTeam.name}</h2>
                  <p className="text-sm text-muted">Founded {selectedTeam.founded || "unknown"}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pitch-50 text-pitch-600">
                <Shield size={22} />
              </div>
              <p className="text-sm text-muted">Select a team to see details</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
