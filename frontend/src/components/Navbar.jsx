import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-white bg-white/10"
      : "text-gray-400 hover:text-white hover:bg-white/5";

  const navLinks =
    user?.role === "admin"
      ? [
          { to: "/admin", label: "Dashboard" },
          { to: "/notices", label: "Notices" },
        ]
      : [
          { to: "/home", label: "Dashboard" },
          { to: "/notices", label: "Notices" },
          { to: "/profile", label: "Profile" },
        ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0e1a]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={user?.role === "admin" ? "/admin" : "/home"}
          className="text-white font-bold text-lg flex items-center gap-2"
        >
          🏨 HostelMS
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.to)}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Info + Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="text-sm">
              <p className="text-white font-medium leading-none">{user?.name}</p>
              <p className="text-gray-500 text-xs capitalize">{user?.role}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-2 ml-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${isActive(link.to)}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
