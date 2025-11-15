import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { KeyIcon } from "lucide-react";
import toast from "react-hot-toast";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginAsAdmin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter both username and password");
      return;
    }

    setLoading(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      const success = loginAsAdmin(username, password);
      
      if (success) {
        toast.success("Welcome back, Admin!");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
      
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <KeyIcon className="size-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-center">Admin Login</h2>
            <p className="text-base-content/70 text-center">
              Enter your credentials to access admin features
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter admin username"
                className="input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter admin password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="divider">OR</div>

          <div className="text-center">
            <p className="text-sm text-base-content/70 mb-2">
              Want to browse without admin access?
            </p>
            <a href="/public" className="btn btn-outline btn-sm">
              View Public Sermons
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;