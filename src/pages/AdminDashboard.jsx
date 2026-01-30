import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

/* ---------------- DUMMY DATA ---------------- */

const DUMMY_STATS = {
  students: 1248,
  teachers: 342,
  quests: 4120,
  lessons: 567,
};

const DUMMY_TOP_STUDENTS = [
  { initials: "AR", name: "Arjun Kumar", grade: "Grade 7", score: 98 },
  { initials: "PR", name: "Priya Singh", grade: "Grade 8", score: 95 },
  { initials: "RA", name: "Rahul Mehta", grade: "Grade 6", score: 92 },
];

const DUMMY_ACTIVITIES = [
  { text: "Arjun completed Algebra Quest", time: "2 hours ago", color: "#651d32" },
  { text: "Priya earned Geometry Badge", time: "4 hours ago", color: "#00305c" },
  { text: "New lesson: Fractions Advanced", time: "6 hours ago", color: "#651d32" },
];

const AdminDashboard = () => {
  const [stats] = useState(DUMMY_STATS);

  const barRef = useRef(null);
  const donutRef = useRef(null);
  const barChart = useRef(null);
  const donutChart = useRef(null);

  /* INIT CHARTS */
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    barChart.current?.destroy();
    donutChart.current?.destroy();

    barChart.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: ["Algebra", "Geometry", "Fractions", "Decimals"],
        datasets: [
          {
            label: "Students",
            data: [120, 90, 150, 80],
            backgroundColor: "#651d32",
            borderRadius: 6,
          },
          {
            label: "Teachers",
            data: [40, 35, 55, 30],
            backgroundColor: "#00305c",
            borderRadius: 6,
          },
        ],
      },
      options: {
        indexAxis: isMobile ? "x" : "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top" } },
      },
    });

    donutChart.current = new Chart(donutRef.current, {
      type: "doughnut",
      data: {
        labels: ["Completed", "In Progress", "Pending"],
        datasets: [
          {
            data: [65, 25, 10],
            backgroundColor: ["#39ab71", "#00305c", "#FF5722"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
      },
    });
  }, []);

  return (
    // 🔥 IMPORTANT FIX: container-fluid REMOVED
    <main className="w-full px-4 py-3 overflow-x-hidden">
      {/* STATS */}
      <div className="row g-3 mb-4">
        <StatBox title="Active Students" value={stats.students} icon="bi-people-fill"
          gradient="linear-gradient(135deg,#651d32,#8b2f47)" />
        <StatBox title="Total Teachers" value={stats.teachers} icon="bi-person-plus-fill"
          gradient="linear-gradient(135deg,#00305c,#004a8a)" />
        <StatBox title="Quests Completed" value={stats.quests} icon="bi-flag-fill"
          gradient="linear-gradient(135deg,#39ab71,#21651d)" />
        <StatBox title="Total Lessons" value={stats.lessons} icon="bi-journal-text"
          gradient="linear-gradient(135deg,#FF5722,#9f3b00)" />
      </div>

      {/* CHARTS */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="mb-3">Performance Overview</h5>
              <div style={{ height: "320px" }}>
                <canvas ref={barRef} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="mb-3">Learning Progress</h5>
              <div style={{ height: "320px" }}>
                <canvas ref={donutRef} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE + ACTIVITY */}
      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="mb-3">Top Performing Students</h5>
              <table className="table table-borderless table-sm">
                <tbody>
                  {DUMMY_TOP_STUDENTS.map((s, i) => (
                    <tr key={i}>
                      <td><div className="avatar">{s.initials}</div></td>
                      <td>
                        <strong>{s.name}</strong><br />
                        <small className="muted">{s.grade}</small>
                      </td>
                      <td className="text-end">
                        <strong style={{ color: "#651d32" }}>{s.score}%</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="mb-3">Recent Activity</h5>
              {DUMMY_ACTIVITIES.map((a, i) => (
                <div key={i} className="d-flex gap-3 mb-3">
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: a.color,
                      marginTop: 6,
                    }}
                  />
                  <div>
                    <strong>{a.text}</strong><br />
                    <small className="muted">{a.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

/* ---------------- STAT BOX ---------------- */

const StatBox = ({ title, value, icon, gradient }) => (
  <div className="col-12 col-sm-6 col-lg-3">
    <div className="stat-box d-flex justify-content-between align-items-center"
      style={{ background: gradient }}>
      <div>
        <h6>{title}</h6>
        <h3>{value}</h3>
      </div>
      <i className={`bi ${icon} fs-2 opacity-75`} />
    </div>
  </div>
);

export default AdminDashboard;
