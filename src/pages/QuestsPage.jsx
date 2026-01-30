import React, { useState, useMemo } from "react";

/* ---------------- DUMMY DATA ---------------- */
const questsData = [
  { id: 1, quest: "Fractions Mastery", reward: "50 pts", status: "Live" },
  { id: 2, quest: "Algebra Sprint", reward: "75 pts", status: "Live" },
  { id: 3, quest: "Geometry Challenge", reward: "60 pts", status: "Live" },
  { id: 4, quest: "Decimals Drill", reward: "40 pts", status: "Paused" },
  { id: 5, quest: "Word Problem Marathon", reward: "100 pts", status: "Live" },
  { id: 6, quest: "Probability Run", reward: "55 pts", status: "Live" },
];

/* ---------------- REACT COMPONENT ---------------- */
const QuestsPage = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(5);

  // Filtered and sliced quests
  const filteredQuests = useMemo(() => {
    const filtered = questsData.filter((q) =>
      `${q.quest} ${q.reward} ${q.status}`.toLowerCase().includes(search.toLowerCase())
    );
    return entries === "all" ? filtered : filtered.slice(0, entries);
  }, [search, entries]);

  const totalRecords = questsData.filter((q) =>
    `${q.quest} ${q.reward} ${q.status}`.toLowerCase().includes(search.toLowerCase())
  ).length;

  const showingFrom = filteredQuests.length === 0 ? 0 : 1;
  const showingTo = filteredQuests.length;

  return (
    <main className="container-fluid py-3">
      <div className="card shadow-sm">
        <div className="card-body">
          {/* Header + New Quest button */}
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h5 className="mb-2 mb-md-0">Quests</h5>
            <a href="/add-quest" className="btn btn-primary btn-sm">New quest</a>
          </div>

          {/* Controls: Select + Search (left side) */}
          <div className="row align-items-center mb-3 g-2">
            <div className="col-md-6 d-flex align-items-center gap-2 flex-wrap">
              <span>Show</span>
              <select
                className="form-select form-select-sm w-auto"
                value={entries}
                onChange={(e) =>
                  setEntries(e.target.value === "all" ? "all" : Number(e.target.value))
                }
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value="all">All</option>
              </select>
              <span>entries</span>
              <input
                type="search"
                className="form-control form-control-sm ms-3 d-inline-block w-auto"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Quest</th>
                  <th>Reward</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuests.length > 0 ? (
                  filteredQuests.map((q) => (
                    <tr key={q.id}>
                      <td>{q.id}</td>
                      <td>{q.quest}</td>
                      <td>{q.reward}</td>
                      <td>
                        <span
                          className={`badge ${
                            q.status === "Live" ? "bg-success" : "bg-secondary"
                          }`}
                        >
                          {q.status}
                        </span>
                      </td>
                      <td>
                        <a href={`/edit-quest/${q.id}`} className="btn btn-sm btn-success me-1">
                          <i className="bi bi-pencil"></i>
                        </a>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Showing X to Y of Z entries */}
          <div className="d-flex justify-content-between mt-2 small text-muted">
            <div>
              Showing {showingFrom} to {showingTo} of {totalRecords} entries
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuestsPage;