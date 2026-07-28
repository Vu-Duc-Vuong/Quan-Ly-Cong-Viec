import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Statistics from "../pages/Statistics";
import Tasks from "../pages/Tasks";
import Calendar from "../pages/Calendar";

import Member3CategoriesPage from "../member3/pages/Member3CategoriesPage";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import ProtectedRoute from "../components/ProtectedRoute";


function AppRoutes() {

  return (

    <Routes>


      {/* Các trang sau khi đăng nhập */}

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />


        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />


        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Member3CategoriesPage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />


        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


      </Route>



      {/* Các trang chưa đăng nhập */}


      <Route
        path="/login"
        element={<Login />}
      />


      <Route
        path="/register"
        element={<Register />}
      />


      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />


      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />


    </Routes>

  );

}


export default AppRoutes;