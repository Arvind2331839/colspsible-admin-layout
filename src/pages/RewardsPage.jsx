import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const dummyRewards = [
  { id: 1, badgeName: "Gold Master", description: "Complete 50 quests", pointsRequired: "12,000", category: "Gold", categoryColor: "#ffc107", earnedBy: "12 students" },
  { id: 2, badgeName: "Silver Star", description: "Complete 30 quests", pointsRequired: "8,000", category: "Silver", categoryColor: "#0dcaf0", earnedBy: "28 students" },
  { id: 3, badgeName: "Bronze Achiever", description: "Complete 15 quests", pointsRequired: "5,000", category: "Bronze", categoryColor: "#6c757d", earnedBy: "45 students" },
  { id: 4, badgeName: "Math Wizard", description: "Score 90%+ in Algebra", pointsRequired: "6,000", category: "Math", categoryColor: "#651d32", earnedBy: "18 students" },
  { id: 5, badgeName: "Science Scholar", description: "Complete all Science lessons", pointsRequired: "7,000", category: "Science", categoryColor: "#00305c", earnedBy: "22 students" },
];

const RewardsPage = () => {
  const [rewards, setRewards] = useState(dummyRewards);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(5);

  // Fetch rewards from API and replace dummy data
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await axios.get("https://api.example.com/rewards"); // Replace with your API
        if (res.data && res.data.length > 0) {
          setRewards(res.data);
        }
      } catch (err) {
        console.error("Error fetching rewards:", err);
        // keep dummy data if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  // Filter and slice rewards based on search and entries
  const filteredRewards = useMemo(() => {
    const filtered = rewards.filter((r) =>
      `${r.badgeName} ${r.description} ${r.category} ${r.earnedBy}`.toLowerCase().includes(search.toLowerCase())
    );
    return entries === "all" ? filtered : filtered.slice(0, entries);
  }, [rewards, search, entries]);

  const totalRecords = rewards.filter((r) =>
    `${r.badgeName} ${r.description} ${r.category} ${r.earnedBy}`.toLowerCase().includes(search.toLowerCase())
  ).length;

  const showingFrom = filteredRewards.length === 0 ? 0 : 1;
  const showingTo = filteredRewards.length;

  return (
    <main className="container-fluid py-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h5 className="mb-2 mb-md-0">Manage Rewards & Badges</h5>
            <a href="/add-reward" className="btn btn-primary btn-sm">New reward</a>
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
                  <th>Badge Name</th>
                  <th>Description</th>
                  <th>Points Required</th>
                  <th>Category</th>
                  <th>Earned By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">Loading...</td>
                  </tr>
                ) : filteredRewards.length > 0 ? (
                  filteredRewards.map((r, idx) => (
                    <tr key={r.id || idx}>
                      <td><strong>{r.badgeName}</strong></td>
                      <td>{r.description}</td>
                      <td>{r.pointsRequired}</td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            background: r.categoryColor || "#6c757d",
                            color: "#fff",
                          }}
                        >
                          {r.category}
                        </span>
                      </td>
                      <td>{r.earnedBy}</td>
                      <td>
                        <a href={`/edit-reward/${r.id}`} className="btn btn-sm btn-success me-1">
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
                    <td colSpan="6" className="text-center text-muted py-4">
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Showing X to Y of Z entries */}
          {!loading && (
            <div className="d-flex justify-content-between mt-2 small text-muted">
              <div>
                Showing {showingFrom} to {showingTo} of {totalRecords} entries
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default RewardsPage;