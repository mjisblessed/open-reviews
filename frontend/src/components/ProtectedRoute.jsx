import { useAuth } from "../contexts/AuthContext";
import AdminLoginPage from "../pages/AdminLoginPage";

const ProtectedRoute = ({ children }) => {
  const { isAdminLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return <AdminLoginPage />;
  }

  return children;
};

export default ProtectedRoute;