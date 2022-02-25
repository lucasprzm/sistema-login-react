import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
// import Route from "./Route";
export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <Autenticacao>
            <Dashboard />
          </Autenticacao>
        }
      />
    </Routes>
  );
}

function Autenticacao({ children }) {
  const loading = false;
  const signed = true;

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
