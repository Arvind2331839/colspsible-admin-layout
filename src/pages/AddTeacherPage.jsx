import React, { useState } from "react";
import axios from "axios";

const AddTeacherPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subjects: "",
    qualification: "",
    experience: "",
    bio: "",
    address: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, photo: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      await axios.post(
        "http://localhost:5000/api/admin/teachers", // 🔁 update if needed
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccess("Teacher added successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-fluid my-3">
      <div className="page-section">
        <div className="card">
          <div className="card-body">
            <h5 className="mb-4">Add New Teacher</h5>

            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* PHOTO */}
                <div className="col-md-3 text-center mb-4">
                  <div
                    style={{
                      width: 140,
                      height: 140,
                      background: "#f0f0f0",
                      borderRadius: 10,
                      margin: "0 auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <i className="bi bi-image" style={{ fontSize: 48, color: "#ccc" }} />
                    )}
                  </div>

                  <div className="mt-3">
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      id="photoInput"
                      onChange={handlePhotoChange}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => document.getElementById("photoInput").click()}
                    >
                      Upload Photo
                    </button>
                  </div>
                </div>

                {/* FORM */}
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name *</label>
                      <input
                        className="form-control"
                        name="fullName"
                        required
                        onChange={handleChange}
                        placeholder="Prof. John Doe"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        required
                        onChange={handleChange}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        name="phone"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Subject(s) Taught *</label>
                      <input
                        className="form-control"
                        name="subjects"
                        required
                        onChange={handleChange}
                        placeholder="Algebra, Geometry"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Qualification *</label>
                      <input
                        className="form-control"
                        name="qualification"
                        required
                        onChange={handleChange}
                        placeholder="B.Sc Mathematics"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Experience (years)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="experience"
                        min="0"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Bio / About</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      name="bio"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      name="address"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <hr />

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <div className="d-flex gap-2">
                <button className="btn btn-success" disabled={loading}>
                  <i className="bi bi-check-circle"></i>{" "}
                  {loading ? "Saving..." : "Add Teacher"}
                </button>
                <a href="/admin-teachers" className="btn btn-outline-secondary">
                  Cancel
                </a>
              </div>
            </form>

          </div>
        </div>
      </div>
    </main>
  );
};

export default AddTeacherPage;