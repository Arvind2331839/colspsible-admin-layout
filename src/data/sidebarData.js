// src/data/sidebarData.js
// export const sidebarLinks = [
//   { path: "dashboard", label: "Dashboard", icon: "bi-speedometer2" },
//   { path: "students", label: "Students", icon: "bi-people" },
//   { path: "teachers", label: "Teachers", icon: "bi-person-badge" },
//   { path: "lessons", label: "Lessons", icon: "bi-journal-text" },
//   { path: "quests", label: "Quests", icon: "bi-flag" },
//   { path: "problems", label: "Problems", icon: "bi-puzzle" },
//   { path: "leaderboard", label: "Leaderboard", icon: "bi-trophy" },
//   { path: "rewards", label: "Rewards", icon: "bi-gift" },
// ]


import {
  FiHome,
  FiUsers,
  FiUser,
  FiBook,
  FiFlag,
  FiGrid,
  FiAward,
  FiGift,
} from "react-icons/fi";

export const sidebarLinks = [
  { label: "Dashboard", path: "/admin/dashboard", icon: FiHome },
  { label: "Students", path: "/admin/students", icon: FiUsers },
  { label: "Teachers", path: "/admin/teachers", icon: FiUser },
  { label: "Lessons", path: "/admin/lessons", icon: FiBook },
  { label: "Quests", path: "/admin/quests", icon: FiFlag },
  { label: "Problems", path: "/admin/problems", icon: FiGrid },
  { label: "Leaderboard", path: "/admin/leaderboard", icon: FiAward },
  { label: "Rewards", path: "/admin/rewards", icon: FiGift },
];

