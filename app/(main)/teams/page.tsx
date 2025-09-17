'use client';
import { loadTeams } from "@/service/teamService";
import { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";

export default function Teams({

}) {

  const [teams, setTeams] = useState<Teams[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Teams>();
  const listRef = useRef(null);
  const [debounceFilter] = useDebounce(search, 500)

  useEffect(() => {
    async function fetchTeams() {
      try {
        loadTeamList()
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    }
    fetchTeams();
  }, [debounceFilter]);

  const loadTeamList = async () => {
    const data = await loadTeams({
        limit: 20,
        page: 0,
        national: false,
        name: search,
    });
    if (data) { setTeams(data); }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Football Teams</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Team list */}
        <div
          ref={listRef}
          className="bg-white p-4 rounded shadow max-h-[70vh] overflow-y-auto"
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 Search team..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <h2 className="font-semibold mb-2">Teams</h2>
          <ul className="space-y-2">
            {teams.map((item) => (
              <li
                key={item._id}
                className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                onClick={() => setSelectedTeam(item)}
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-6 h-6"
                />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
          {teams.length === 0 && (
            <p className="text-gray-500 text-center mt-4">No teams found</p>
          )}
        </div>

        {/* Detail panel */}
        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          {selectedTeam ? (
            <div>
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <img
                  src={selectedTeam.logo}
                  alt={selectedTeam.name}
                  className="w-10 h-10"
                />
                <span>{selectedTeam.name}</span>
              </h2>
              <p>
                <strong>Founded:</strong>{" "}
                {selectedTeam.founded || "Unknown"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Select a team to see details</p>
          )}
        </div>
      </div>
    </div>
  );
}