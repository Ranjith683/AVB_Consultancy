import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { candidate, loading } = useAuth();
  if (loading) return <div className="auth-loading"><div className="spinner"></div></div>;
  if (!candidate) return <Navigate to="/candidate/login" replace />;
  return children;
};

export default ProtectedRoute;
