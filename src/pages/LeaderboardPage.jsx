import React, { useState, useMemo } from "react";

const leaderboardData = [
  { rank: 1, name: "Jane Doe", grade: "Grade 8", points: 12400, quests: 45, badge: "Gold", badgeClass: "bg-success" },
  { rank: 2, name: "John Smith", grade: "Grade 7", points: 9800, quests: 38, badge: "Silver", badgeClass: "bg-info" },
  { rank: 3, name: "Arjun Kumar", grade: "Grade 7", points: 8950, quests: 35, badge: "Silver", badgeClass: "bg-info" },
  { rank: 4, name: "Priya Singh", grade: "Grade 8", points: 8600, quests: 32, badge: "Bronze", badgeClass: "bg-secondary" },
  { rank: 5, name: "Rahul Mehta", grade: "Grade 6", points: 7250, quests: 28, badge: "Bronze", badgeClass: "bg-secondary" },
  { rank: 6, name: "Maria Garcia", grade: "Grade 7", points: 6800, quests: 25, badge: "Bronze", badgeClass: "bg-secondary" },
  { rank: 7, name: "John Smith", grade: "Grade 7", points: 9800, quests: 38, badge: "Silver", badgeClass: "bg-info" },
  { rank: 8, name: "Arjun Kumar", grade: "Grade 7", points: 8950, quests: 35, badge: "Silver", badgeClass: "bg-info" },
  { rank: 9, name: "Priya Singh", grade: "Grade 8", points: 8600, quests: 32, badge: "Bronze", badgeClass: "bg-secondary" },
  { rank: 10, name: "Rahul Mehta", grade: "Grade 6", points: 7250, quests: 28, badge: "Bronze", badgeClass: "bg-secondary" },
 
];

const LeaderboardPage = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(5);

  // Filtered and sliced data
  const filteredData = useMemo(() => {
    const result = leaderboardData.filter((student) =>
      `${student.name} ${student.grade} ${student.points}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    return entries === "all" ? result : result.slice(0, entries);
  }, [search, entries]);

  // For showing X to Y of Z entries
  const totalRecords = leaderboardData.filter((student) =>
    `${student.name} ${student.grade} ${student.points}`
      .toLowerCase()
      .includes(search.toLowerCase())
  ).length;

  const showingFrom = filteredData.length === 0 ? 0 : 1;
  const showingTo = filteredData.length;

  return (
    <main className="container-fluid py-3">
      <div className="card shadow-sm">
        <div className="card-header bg-white border-0">
          <h5 className="mb-0">Student Leaderboard</h5>
        </div>

        <div className="card-body">
          {/* Controls */}
          <div className="row align-items-center mb-3 g-2">
            <div className="col-md-6 d-flex align-items-center gap-2">
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
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Rank</th>
                  <th>Student Name</th>
                  <th>Grade</th>
                  <th>Points</th>
                  <th>Quests</th>
                  <th>Badges</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((student) => (
                    <tr key={student.rank}>
                      <td>
                        <strong style={{ color: "#651d32" }}>{student.rank}</strong>
                      </td>
                      <td>
                        <strong>{student.name}</strong>
                      </td>
                      <td>{student.grade}</td>
                      <td>
                        <strong>{student.points.toLocaleString()} pts</strong>
                      </td>
                      <td>{student.quests}</td>
                      <td>
                        <span className={`badge ${student.badgeClass}`}>
                          {student.badge}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
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

export default LeaderboardPage;