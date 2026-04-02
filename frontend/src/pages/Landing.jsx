import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0f0e1a] text-white font-sans">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-20">

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Hostel Management
          <br />
          <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Made Simple
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 max-w-xl mb-10 text-sm md:text-base">
          Manage rooms, students, fees, and complaints — all from one clean and powerful dashboard.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 font-semibold shadow-lg hover:opacity-90 transition"
          >
            Login →
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition font-semibold"
          >
            Signup
          </Link>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-2">🏠 Room Allocation</h3>
            <p className="text-gray-400 text-sm">
              Assign and manage rooms in real-time without confusion.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-2">💳 Fee Management</h3>
            <p className="text-gray-400 text-sm">
              Track payments and send automated reminders easily.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-2">📋 Complaints</h3>
            <p className="text-gray-400 text-sm">
              Manage and resolve complaints with full transparency.
            </p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-500 text-sm pb-6">
        © 2026 HostelMS
      </div>
    </div>
  );
}