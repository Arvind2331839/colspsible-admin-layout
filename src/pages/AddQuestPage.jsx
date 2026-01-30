import React, { useState } from "react";
import axios from "axios";

const AddQuestPage = () => {
  const [formData, setFormData] = useState({
    title: "Fractions Mastery",
    reward: "50",
    description: "Complete 10 fraction problems...",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/quests", // 👈 change API if needed
        {
          title: formData.title,
          reward: Number(formData.reward),
          description: formData.description,
        }
      );

      setSuccess("Quest saved successfully!");
      console.log("Response:", res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to save quest"
      );
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
                <label className="form-label">Quest Title</label>
                <input
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Reward (points)</label>
                <input
                  className="form-control"
                  name="reward"
                  type="number"
                  value={formData.reward}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={6}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <div>
                <button className="btn btn-primary" disabled={loading}>
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

export default AddQuestPage;