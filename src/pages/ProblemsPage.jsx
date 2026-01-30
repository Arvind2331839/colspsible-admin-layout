import React, { useState, useMemo } from "react";

/* ---------------- DUMMY DATA ---------------- */
const problemsData = [
  { id: 1, problem: "Fraction addition (3 terms)", difficulty: "Easy" },
  { id: 2, problem: "Solve for x: 2x+5=15", difficulty: "Easy" },
  { id: 3, problem: "Area of triangle", difficulty: "Medium" },
  { id: 4, problem: "Quadratic roots", difficulty: "Medium" },
  { id: 5, problem: "Probability: coin tosses", difficulty: "Medium" },
  { id: 6, problem: "Rate and time word problem", difficulty: "Hard" },
];

/* ---------------- REACT COMPONENT ---------------- */
const ProblemsPage = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(5);

  // Filtered and sliced problems
  const filteredProblems = useMemo(() => {
    const filtered = problemsData.filter((p) =>
      `${p.problem} ${p.difficulty}`.toLowerCase().includes(search.toLowerCase())
    );
    return entries === "all" ? filtered : filtered.slice(0, entries);
  }, [search, entries]);

  const totalRecords = problemsData.filter((p) =>
    `${p.problem} ${p.difficulty}`.toLowerCase().includes(search.toLowerCase())
  ).length;

  const showingFrom = filteredProblems.length === 0 ? 0 : 1;
  const showingTo = filteredProblems.length;

  return (
    <main className="container-fluid py-3">
      <div className="card shadow-sm">
        <div className="card-body">
          {/* Header + New Problem button */}
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h5 className="mb-2 mb-md-0">Problem Scenarios</h5>
            <a href="/add-problem" className="btn btn-primary btn-sm">New problem</a>
          </div>

          {/* Controls */}
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
            </div>
            <div className="col-md-6 text-md-end">
              <input
                type="search"
                className="form-control form-control-sm d-inline-block w-100 w-md-50"
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
                  <th>Problem</th>
                  <th>Difficulty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.problem}</td>
                      <td>{p.difficulty}</td>
                      <td>
                        <a href={`/edit-problem/${p.id}`} className="btn btn-sm btn-success me-1">
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
                    <td colSpan="4" className="text-center text-muted py-4">
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

export default ProblemsPage;