import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";

const AdminAddLesson = () => {
  const [title, setTitle] = useState("Advanced Algebra");
  const [content, setContent] = useState("Lesson content...");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://your-api.com/api/lessons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to save lesson");
      }

      const data = await response.json();
      alert("Lesson saved successfully!");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Error saving lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-app d-flex flex-column" style={{ overflowX: "hidden" }}>
      {/* ===== HEADER FULL WIDTH ===== */}
      {/* <AdminHeader title="Add Lesson" /> */}

      {/* ===== CONTENT ===== */}
      <div className="d-flex flex-grow-1" style={{ marginTop: "20px" }}>
        <main className="admin-content container-fluid flex-grow-1 px-3">
          <div className="page-section" style={{ marginTop: "0.5rem" }}>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                      className="form-control"
                      rows="8"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3 d-flex gap-2">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => alert("Approved!")}
                    >
                      Approve
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAddLesson;