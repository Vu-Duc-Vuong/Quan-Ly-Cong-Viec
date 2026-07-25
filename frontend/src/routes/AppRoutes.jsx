import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Statistics from "../pages/Statistics";
import Tasks from "../pages/Tasks";
import Categories from "../pages/Categories";
import Calendar from "../pages/Calendar";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route path="/" element={<Dashboard />} />

        <Route path="/statistics" element={<Statistics />} />

        <Route path="/tasks" element={<Tasks />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/calendar" element={<Calendar />} />

        <Route path="/profile" element={<Profile />} />

      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

    </Routes>
  );
}

export default AppRoutes;