import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../api/axios.api";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const [fees, setFees] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showRoomRequestModal, setShowRoomRequestModal] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    roomNumber: "",
    description: "",
  });
  const [roomRequestForm, setRoomRequestForm] = useState({
    roomId: "",
    reason: "",
  });

  const fetchData = async () => {
    try {
      const [feesRes, complaintsRes, roomsRes, requestsRes] = await Promise.all([
        api.get("/api/fees/my"),
        api.get("/api/complaints/my"),
        api.get("/api/rooms"),
        api.get("/api/room-requests/my"),
      ]);
      setFees(feesRes.data.fees || []);
      setComplaints(complaintsRes.data.complaints || []);
      setAllRooms(roomsRes.data.rooms || []);
      setMyRequests(requestsRes.data.requests || []);

      const myRoom = roomsRes.data.rooms?.find((r) =>
        r.occupants.some((o) => o._id === user._id),
      );
      setRoom(myRoom || null);
      if (myRoom) {
        setComplaintForm((prev) => ({
          ...prev,
          roomNumber: myRoom.roomNumber,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const latestFee = fees[0];
  const pendingComplaints = complaints.filter((c) => c.status === "pending");

  const handleComplaint = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/complaints", complaintForm);
      if (data.success) {
        toast.success("Complaint submitted!");
        setShowComplaintModal(false);
        setComplaintForm({
          roomNumber: room?.roomNumber || "",
          description: "",
        });
        fetchData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  const handleRoomRequest = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/room-requests", roomRequestForm);
      if (data.success) {
        toast.success(data.message);
        setShowRoomRequestModal(false);
        setRoomRequestForm({ roomId: "", reason: "" });
        fetchData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit request");
    }
  };

  const availableRooms = allRooms.filter(
    (r) => r.occupants.length < r.capacity,
  );

  // Create recent activity from complaints and fees
  const activity = [
    ...complaints.map((c) => ({
      id: c._id,
      text: `${c.status === "resolved" ? "✅" : "🛠"} Complaint: ${c.description}`,
      time: new Date(c.createdAt),
      type: c.status,
    })),
    ...fees.map((f) => ({
      id: f._id,
      text: `${f.status === "paid" ? "✅" : "⏳"} Fee ${f.month} ${f.year}: ₹${f.amount.toLocaleString()}`,
      time: new Date(f.createdAt),
      type: f.status,
    })),
  ]
    .sort((a, b) => b.time - a.time)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0f0e1a] text-white">
      <Navbar />

      <div className="pt-24 px-6 max-w-7xl mx-auto pb-16">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold mb-2">
            Welcome back, {user?.name} 👋
          </h1>
          <p className="text-gray-400 text-sm">
            Here's what's happening with your hostel today.
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* ROOM */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm text-gray-400 mb-2">Room</h3>
            <p className="text-2xl font-bold">
              {room ? room.roomNumber : "Not Assigned"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {room
                ? `Floor ${room.floor} • ${room.type} (${room.occupants.length}/${room.capacity})`
                : "Contact admin for room assignment"}
            </p>
          </div>

          {/* FEES */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm text-gray-400 mb-2">Fees Status</h3>
            <p
              className={`text-2xl font-bold ${
                latestFee?.status === "paid"
                  ? "text-green-400"
                  : latestFee
                    ? "text-red-400"
                    : "text-gray-500"
              }`}
            >
              {latestFee
                ? latestFee.status === "paid"
                  ? "Paid"
                  : "Pending"
                : "No Records"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {latestFee
                ? `${latestFee.month} ${latestFee.year} • ₹${latestFee.amount.toLocaleString()}`
                : "No fee records yet"}
            </p>
          </div>

          {/* COMPLAINTS */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm text-gray-400 mb-2">Complaints</h3>
            <p
              className={`text-2xl font-bold ${
                pendingComplaints.length > 0
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {pendingComplaints.length > 0
                ? `${pendingComplaints.length} Active`
                : "All Clear"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {pendingComplaints.length > 0
                ? "Pending resolution"
                : "No active complaints"}
            </p>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => setShowComplaintModal(true)}
              className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-left cursor-pointer hover:opacity-90 transition"
            >
              <h3 className="font-semibold mb-1">➕ Raise Complaint</h3>
              <p className="text-sm opacity-80">
                Report issues in your room
              </p>
            </button>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
              <h3 className="font-semibold mb-1">💳 Fee Status</h3>
              <p className="text-sm text-gray-400">
                {fees.filter((f) => f.status === "pending").length} pending
                payment(s)
              </p>
            </div>

            <button
              onClick={() => setShowRoomRequestModal(true)}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left cursor-pointer hover:bg-white/10 transition"
            >
              <h3 className="font-semibold mb-1">🏠 Request Room</h3>
              <p className="text-sm text-gray-400">
                {availableRooms.length} room(s) available
              </p>
            </button>
          </div>
        </div>

        {/* MY ROOM REQUESTS */}
        {myRequests.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">My Room Requests</h2>
            <div className="space-y-3">
              {myRequests.map((req) => (
                <div
                  key={req._id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm">
                      Room {req.roomNumber}
                      {req.reason && ` — "${req.reason}"`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(req.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      req.status === "approved"
                        ? "bg-green-500/20 text-green-300"
                        : req.status === "rejected"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECENT ACTIVITY */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          {activity.length > 0 ? (
            <div className="space-y-4">
              {activity.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <p className="text-sm">{item.text}</p>
                  <span className="text-xs text-gray-500">
                    {item.time.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-sm text-center">
              No recent activity yet.
            </div>
          )}
        </div>
      </div>

      {/* Complaint Modal */}
      <Modal
        isOpen={showComplaintModal}
        onClose={() => setShowComplaintModal(false)}
        title="Raise a Complaint"
      >
        <form onSubmit={handleComplaint} className="space-y-4">
          <input
            type="text"
            placeholder="Room Number"
            value={complaintForm.roomNumber}
            onChange={(e) =>
              setComplaintForm({
                ...complaintForm,
                roomNumber: e.target.value,
              })
            }
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
            required
          />
          <textarea
            placeholder="Describe your issue..."
            value={complaintForm.description}
            onChange={(e) =>
              setComplaintForm({
                ...complaintForm,
                description: e.target.value,
              })
            }
            rows={3}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400 resize-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Submit Complaint
          </button>
        </form>
      </Modal>

      {/* Room Request Modal */}
      <Modal
        isOpen={showRoomRequestModal}
        onClose={() => setShowRoomRequestModal(false)}
        title="Request a Room"
      >
        {availableRooms.length > 0 ? (
          <form onSubmit={handleRoomRequest} className="space-y-4">
            <select
              value={roomRequestForm.roomId}
              onChange={(e) =>
                setRoomRequestForm({
                  ...roomRequestForm,
                  roomId: e.target.value,
                })
              }
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
              required
            >
              <option value="">Select a room</option>
              {availableRooms.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.roomNumber} — Floor {r.floor} — {r.type} ({r.occupants.length}/{r.capacity})
                </option>
              ))}
            </select>
            <textarea
              placeholder="Why do you want this room? (optional)"
              value={roomRequestForm.reason}
              onChange={(e) =>
                setRoomRequestForm({
                  ...roomRequestForm,
                  reason: e.target.value,
                })
              }
              rows={3}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400 resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition cursor-pointer"
            >
              Submit Request
            </button>
          </form>
        ) : (
          <p className="text-gray-400 text-sm text-center py-4">
            No rooms available at the moment.
          </p>
        )}
      </Modal>
    </div>
  );
}