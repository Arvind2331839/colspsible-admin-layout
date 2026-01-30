import React, { useState, useMemo } from "react";

/* ---------------- DUMMY DATA ---------------- */
const lessonsData = [
  { id: 1, title: "Fractions 101", author: "Prof. Alan", status: "Approved" },
  { id: 2, title: "Advanced Algebra", author: "Prof. Alan", status: "Pending" },
  { id: 3, title: "Decimals & Percents", author: "Ms. Neha", status: "Approved" },
  { id: 4, title: "Geometry Basics", author: "Mr. Rahul", status: "Approved" },
  { id: 5, title: "Linear Equations", author: "Dr. Meera", status: "Pending" },
  { id: 6, title: "Probability Intro", author: "Ms. Fatima", status: "Approved" },
];

/* ---------------- REACT COMPONENT ---------------- */
const LessonsPage = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(5);

  // Filtered and sliced lessons
  const filteredLessons = useMemo(() => {
    const filtered = lessonsData.filter((lesson) =>
      `${lesson.title} ${lesson.author} ${lesson.status}`.toLowerCase().includes(search.toLowerCase())
    );
    return entries === "all" ? filtered : filtered.slice(0, entries);
  }, [search, entries]);

  const totalRecords = lessonsData.filter((lesson) =>
    `${lesson.title} ${lesson.author} ${lesson.status}`.toLowerCase().includes(search.toLowerCase())
  ).length;

  const showingFrom = filteredLessons.length === 0 ? 0 : 1;
  const showingTo = filteredLessons.length;

  return (
    <main className="container-fluid py-3">
      <div className="card shadow-sm">
        <div className="card-body">
          {/* Header + New Lesson button */}
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h5 className="mb-2 mb-md-0">Lessons</h5>
            <a href="/add-lesson" className="btn btn-primary btn-sm">New lesson</a>
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
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLessons.length > 0 ? (
                  filteredLessons.map((lesson, index) => (
                    <tr key={lesson.id}>
                      <td>{lesson.id}</td>
                      <td>{lesson.title}</td>
                      <td>{lesson.author}</td>
                      <td>
                        <span
                          className={`${
                            lesson.status === "Approved"
                              ? "status-active"
                              : "status-block"
                          }`}
                        >
                          {lesson.status}
                        </span>
                      </td>
                      <td>
                        <a href={`/edit-lesson/${lesson.id}`} className="btn btn-sm btn-success me-1">
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

export default LessonsPage;