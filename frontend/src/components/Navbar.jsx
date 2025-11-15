import { Link } from "react-router";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { logoutAdmin } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logoutAdmin();
    }
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary font-mono tracking-tight">Sermon Notes</h1>
            <p className="text-xs text-base-content/70">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Sermon</span>
            </Link>
            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              <LogOutIcon className="size-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;