import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(5);

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://api.example.com/students"); // Replace with your API
        setStudents(res.data); // Expected array of student objects
      } catch (err) {
        console.error("Error fetching students:", err);
        // Fallback dummy data
        setStudents([
          { id: 1, name: "Jane Doe", email: "jane@example.com", progress: "72%", status: "Active" },
          { id: 2, name: "John Smith", email: "john@example.com", progress: "45%", status: "Active" },
          { id: 3, name: "Priya Kumar", email: "priya@example.com", progress: "88%", status: "Active" },
          { id: 4, name: "Aarav Patel", email: "aarav@example.com", progress: "60%", status: "Active" },
          { id: 5, name: "Sofia Lee", email: "sofia@example.com", progress: "95%", status: "Active" },
          { id: 6, name: "Mohit Singh", email: "mohit@example.com", progress: "34%", status: "Inactive" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Filter and slice students based on search and entries
  const filteredStudents = useMemo(() => {
    const filtered = students.filter((s) =>
      `${s.name} ${s.email} ${s.progress} ${s.status}`.toLowerCase().includes(search.toLowerCase())
    );
    return entries === "all" ? filtered : filtered.slice(0, entries);
  }, [students, search, entries]);

  const totalRecords = students.filter((s) =>
    `${s.name} ${s.email} ${s.progress} ${s.status}`.toLowerCase().includes(search.toLowerCase())
  ).length;

  const showingFrom = filteredStudents.length === 0 ? 0 : 1;
  const showingTo = filteredStudents.length;

  return (
    <main className="container-fluid py-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h5 className="mb-2 mb-md-0">Students</h5>
            <a href="/add-student" className="btn btn-primary btn-sm">New student</a>
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
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">Loading...</td>
                  </tr>
                ) : filteredStudents.length > 0 ? (
                  filteredStudents.map((s, idx) => (
                    <tr key={s.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.progress}</td>
                      <td>
                        <span
                          className={`badge ${s.status === "Active" ? "bg-success" : "bg-secondary"}`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td>
                        <a href={`/student-profile/${s.id}`} className="btn btn-sm btn-success me-1">
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

export default StudentsPage;