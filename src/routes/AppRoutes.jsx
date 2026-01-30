import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

// pages
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import StudentsPage from "../pages/StudentsPage";
import TeachersPage from "../pages/TeachersPage";
import LessonsPage from "../pages/LessonsPage";
import QuestsPage from "../pages/QuestsPage";
import ProblemsPage from "../pages/ProblemsPage";
import LeaderboardPage from "../pages/LeaderboardPage";
import RewardsPage from "../pages/RewardsPage";

import AddProblemForm from "../pages/AddProblemForm";
import AddQuestPage from "../pages/AddQuestPage";
import AddStudentPage from "../pages/AddStudentPage";
import AddTeacherPage from "../pages/AddTeacherPage";
import AdminAddLesson from "../pages/AdminAddLesson";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ROOT */}
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* ===== PUBLIC ===== */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<AdminLogin />} />
      </Route>

      {/* ===== ADMIN (PROTECTED) ===== */}
      <Route element={<ProtectedRoute allowed={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>

          {/* dashboard */}
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* core pages */}
          <Route path="students" element={<StudentsPage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="lessons" element={<LessonsPage />} />
          <Route path="quests" element={<QuestsPage />} />
          <Route path="problems" element={<ProblemsPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="rewards" element={<RewardsPage />} />

          {/* add / forms */}
          <Route path="add-problem" element={<AddProblemForm />} />
          <Route path="add-quest" element={<AddQuestPage />} />
          <Route path="add-student" element={<AddStudentPage />} />
          <Route path="add-teacher" element={<AddTeacherPage />} />
          <Route path="add-lesson" element={<AdminAddLesson />} />

        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/admin" replace />} />

    </Routes>
  );
}
