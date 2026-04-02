import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../api/axios.api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [fees, setFees] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [feesRes, complaintsRes, roomsRes] = await Promise.all([
          api.get("/api/fees/my"),
          api.get("/api/complaints/my"),
          api.get("/api/rooms"),
        ]);
        setFees(feesRes.data.fees || []);
        setComplaints(complaintsRes.data.complaints || []);

        // Find the room containing this user
        const myRoom = roomsRes.data.rooms?.find((r) =>
          r.occupants.some((o) => o._id === user._id),
        );
        setRoom(myRoom || null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#0f0e1a] text-white">
      <Navbar />

      <div className="pt-24 px-6 max-w-4xl mx-auto pb-16">
        {/* Profile Header */}
        <div className="mb-10 flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold mb-1">{user?.name}</h1>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-medium capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Room Info */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">🏠 Room Details</h2>
          {room ? (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Room</p>
                  <p className="font-bold text-lg">{room.roomNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400">Floor</p>
                  <p className="font-bold text-lg">{room.floor}</p>
                </div>
                <div>
                  <p className="text-gray-400">Type</p>
                  <p className="font-bold text-lg capitalize">{room.type}</p>
                </div>
                <div>
                  <p className="text-gray-400">Roommates</p>
                  <p className="font-bold text-lg">
                    {room.occupants.length} / {room.capacity}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-sm">
              No room assigned yet. Please contact the admin.
            </div>
          )}
        </div>

        {/* Fee History */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">💳 Fee History</h2>
          {fees.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-gray-400">
                  <tr>
                    <th className="p-4 text-left">Month</th>
                    <th className="p-4 text-left">Amount</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((fee) => (
                    <tr
                      key={fee._id}
                      className="border-t border-white/10"
                    >
                      <td className="p-4">
                        {fee.month} {fee.year}
                      </td>
                      <td className="p-4">₹{fee.amount.toLocaleString()}</td>
                      <td
                        className={`p-4 font-medium ${
                          fee.status === "paid"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {fee.status === "paid" ? "Paid" : "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-sm">
              No fee records found.
            </div>
          )}
        </div>

        {/* Complaint History */}
        <div>
          <h2 className="text-xl font-semibold mb-4">📋 Complaint History</h2>
          {complaints.length > 0 ? (
            <div className="space-y-3">
              {complaints.map((c) => (
                <div
                  key={c._id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm">{c.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Room {c.roomNumber} •{" "}
                      {new Date(c.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      c.status === "resolved"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {c.status === "resolved" ? "Resolved" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-sm">
              No complaints filed.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
