import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout";

// Guarda de rota: sem sessão redireciona para /login;
// com sessão renderiza o Layout (que contém o <Outlet /> das rotas filhas).
function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Layout />;
}

export default ProtectedRoute;
