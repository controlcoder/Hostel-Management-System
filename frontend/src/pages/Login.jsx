import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login("login", form);
  };

  return (
    <div className="min-h-screen flex bg-[#0f0e1a] font-sans">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 bg-linear-to-br from-[#13123a] to-[#0f0e1a] relative overflow-hidden">
        <div className="text-white font-bold text-lg">🏨 HostelMS</div>

        <div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Manage smarter.
            <br />
            <span className="bg-linear-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">
              Not harder.
            </span>
          </h2>

          <p className="text-gray-400 max-w-sm mb-8">
            Your entire hostel — rooms, students, fees, and complaints — managed
            from one dashboard.
          </p>

          <div className="space-y-3 text-sm text-gray-400">
            <div>🏠 Real-time room allocation</div>
            <div>💳 Automated fee reminders</div>
            <div>📋 Complaint tracking</div>
          </div>
        </div>

        <p className="text-xs text-gray-600">© 2026 HostelMS</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <Link to="/" className="text-white font-bold text-lg block mb-6">
              🏨 HostelMS
            </Link>

            <h1 className="text-3xl font-extrabold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-gray-400 text-sm">Sign in to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs text-gray-400 uppercase font-semibold">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase font-semibold">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
                required
              />
            </div>

            <div className="text-right text-sm">
              <a href="#" className="text-indigo-400">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:opacity-90"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-300 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
