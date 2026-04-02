import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound.jsx";
import AdminDashboard from "./pages/Admin.jsx";
import Profile from "./pages/Profile.jsx";
import Notices from "./pages/Notices.jsx";
import AdminRoutes from "./components/AdminRoutes.jsx";

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0e1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1930",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
          },
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Landing />
            ) : user.role === "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={
            <AdminRoutes user={user}>
              <AdminDashboard />
            </AdminRoutes>
          }
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/notices"
          element={user ? <Notices /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            !user ? (
              <Login />
            ) : user.role === "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !user ? (
              <Signup />
            ) : user.role === "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
