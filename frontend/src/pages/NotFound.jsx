import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0e1a] text-white flex items-center justify-center px-6">
      
      <div className="text-center max-w-md">

        {/* 404 TEXT */}
        <h1 className="text-7xl font-extrabold mb-4 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          404
        </h1>

        {/* MESSAGE */}
        <h2 className="text-2xl font-semibold mb-2">
          Page not found
        </h2>

        <p className="text-gray-400 mb-8 text-sm">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex justify-center gap-4">

          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 font-semibold shadow-lg hover:opacity-90 transition"
          >
            Go Home →
          </Link>

        </div>
      </div>
    </div>
  );
}