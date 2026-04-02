import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login("register", form);
  };

  return (
    <div className="min-h-screen flex bg-[#0f0e1a]">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 bg-linear-to-br from-[#13123a] to-[#0f0e1a]">
        <div className="text-white font-bold text-lg">🏨 HostelMS</div>

        <div>
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Create your system.
            <br />
            <span className="bg-linear-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">
              Start managing.
            </span>
          </h2>

          <p className="text-gray-400 max-w-sm">
            Set up your hostel management dashboard in minutes.
          </p>
        </div>

        <p className="text-xs text-gray-600">© 2026 HostelMS</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <Link to="/" className="text-white font-bold text-lg block mb-6">
              🏨 HostelMS
            </Link>

            <h1 className="text-3xl font-extrabold text-white mb-2">
              Create account
            </h1>
            <p className="text-gray-400 text-sm">Start your free journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={form.name}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
              required
            />

            <button className="w-full cursor-pointer py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold">
              Create Account →
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-300 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
