import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const dummyTeachers = [
  { id: 1, name: "Prof. Alan", email: "alan@example.com", courses: "Algebra, Calculus" },
  { id: 2, name: "Ms. Neha", email: "neha@example.com", courses: "Fractions, Geometry" },
  { id: 3, name: "Mr. Rahul", email: "rahul@example.com", courses: "Algebra" },
  { id: 4, name: "Dr. Meera", email: "meera@example.com", courses: "Calculus" },
  { id: 5, name: "Mr. Kumar", email: "kumar@example.com", courses: "Statistics" },
  { id: 6, name: "Ms. Fatima", email: "fatima@example.com", courses: "Probability" },
];

const TeachersPage = () => {
  const [teachers, setTeachers] = useState(dummyTeachers);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(5);

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("https://api.example.com/teachers"); // replace with your API
        if (res.data && res.data.length > 0) setTeachers(res.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  // Filter & paginate
  const filteredTeachers = useMemo(() => {
    const filtered = teachers.filter(t =>
      `${t.name} ${t.email} ${t.courses}`.toLowerCase().includes(search.toLowerCase())
    );
    return entries === "all" ? filtered : filtered.slice(0, entries);
  }, [teachers, search, entries]);

  const totalRecords = teachers.filter(t =>
    `${t.name} ${t.email} ${t.courses}`.toLowerCase().includes(search.toLowerCase())
  ).length;

  const showingFrom = filteredTeachers.length === 0 ? 0 : 1;
  const showingTo = filteredTeachers.length;

  return (
    <main className="container-fluid py-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h5 className="mb-2 mb-md-0">Teachers</h5>
            <a href="/add-teacher" className="btn btn-primary btn-sm">New teacher</a>
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
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Courses</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">Loading...</td>
                  </tr>
                ) : filteredTeachers.length > 0 ? (
                  filteredTeachers.map((t, idx) => (
                    <tr key={t.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{t.name}</td>
                      <td>{t.email}</td>
                      <td>{t.courses}</td>
                      <td>
                        <a href={`/edit-teacher/${t.id}`} className="btn btn-sm btn-success me-1">
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

          {/* Showing X to Y of Z */}
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

export default TeachersPage;