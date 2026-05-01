import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "./context/AuthContext";

import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Login from "./components/layouts/login";

function App() {
  const { isAuth, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuth ? <Login /> : <Navigate to="/dashboard" />}
      />

      <Route
        path="/"
        element={isAuth ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
