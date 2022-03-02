import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import { AuthContext } from "../contexts/auth";
import { useContext } from "react";
import Profile from "../pages/Perfil";
import Customers from "../pages/Customers";

export default function Rotas() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <NaoLogado>
            <SignIn />
          </NaoLogado>
        }
      />
      <Route
        path="/register"
        element={
          <NaoLogado>
            <SignUp />
          </NaoLogado>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Logado>
            <Dashboard />
          </Logado>
        }
      />
      <Route
        path="/profile"
        element={
          <Logado>
            <Profile />
          </Logado>
        }
      />
      <Route
        path="/clientes"
        element={
          <Logado>
            <Customers />
          </Logado>
        }
      />
    </Routes>
  );
}
function Logado({ children }) {
  const { signed, loading } = useContext(AuthContext);
  if (loading) {
    return <div></div>;
  }
  if (!signed) {
    return <Navigate to="/" />;
  }
  if (signed) {
    return children;
  }
}
function NaoLogado({ children }) {
  const { signed, loading } = useContext(AuthContext);
  if (loading) {
    return <div></div>;
  }
  if (!signed) {
    return children;
  }
  if (signed) {
    return <Navigate to="/dashboard" />;
  }
}
