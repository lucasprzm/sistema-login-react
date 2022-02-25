import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

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
    </Routes>
  );
}
const loading = false;
const signed = false;
function Logado({ children }) {
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
