import React, { useState } from "react";
import axios from "axios";

const AddProblemForm = () => {
  // State to store form inputs
  const [title, setTitle] = useState("Fraction addition (3 terms)");
  const [content, setContent] = useState("Enter problem text...");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);
    setMessage(null);

    try {
      // Replace with your backend endpoint
      const response = await axios.post("http://localhost:5000/api/problems", {
        title,
        content,
      });

      setMessage({ type: "success", text: "Problem saved successfully!" });
      console.log("Server response:", response.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to save problem",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-fluid mt-5">
      <div className="page-section">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter problem title"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="content">
                  Content / Prompt
                </label>
                <textarea
                  id="content"
                  className="form-control"
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter problem text..."
                />
              </div>

              {message && (
                <div
                  className={`alert ${
                    message.type === "success" ? "alert-success" : "alert-danger"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProblemForm;