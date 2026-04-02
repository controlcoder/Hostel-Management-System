import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../api/axios.api";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [fees, setFees] = useState([]);

  // Modal states
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  // Form states
  const [roomForm, setRoomForm] = useState({
    roomNumber: "",
    floor: "",
    capacity: 3,
    type: "triple",
  });
  const [assignForm, setAssignForm] = useState({
    roomId: "",
    studentId: "",
  });
  const [feeForm, setFeeForm] = useState({
    studentId: "",
    amount: "",
    month: "",
    year: new Date().getFullYear(),
  });
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    content: "",
  });

  const fetchAll = async () => {
    try {
      const statsRes = await api.get("/api/admin/stats");
      setStats(statsRes.data.stats);
    } catch (err) {
      console.error("Failed to fetch stats:", err.response?.data || err.message);
    }

    try {
      const studentsRes = await api.get("/api/admin/students");
      setStudents(studentsRes.data.students || []);
    } catch (err) {
      console.error("Failed to fetch students:", err.response?.data || err.message);
    }

    try {
      const roomsRes = await api.get("/api/rooms");
      setRooms(roomsRes.data.rooms || []);
    } catch (err) {
      console.error("Failed to fetch rooms:", err.response?.data || err.message);
    }

    try {
      const complaintsRes = await api.get("/api/complaints/all");
      setComplaints(complaintsRes.data.complaints || []);
    } catch (err) {
      console.error("Failed to fetch complaints:", err.response?.data || err.message);
    }

    try {
      const feesRes = await api.get("/api/fees/all");
      setFees(feesRes.data.fees || []);
    } catch (err) {
      console.error("Failed to fetch fees:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Handlers
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/rooms", roomForm);
      if (data.success) {
        toast.success("Room created!");
        setShowRoomModal(false);
        setRoomForm({ roomNumber: "", floor: "", capacity: 3, type: "triple" });
        fetchAll();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(
        `/api/rooms/${assignForm.roomId}/assign`,
        { studentId: assignForm.studentId },
      );
      if (data.success) {
        toast.success("Student assigned!");
        setShowAssignModal(false);
        setAssignForm({ roomId: "", studentId: "" });
        fetchAll();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleCreateFee = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/fees", feeForm);
      if (data.success) {
        toast.success("Fee record created!");
        setShowFeeModal(false);
        setFeeForm({
          studentId: "",
          amount: "",
          month: "",
          year: new Date().getFullYear(),
        });
        fetchAll();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleSendNotice = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/notices", noticeForm);
      if (data.success) {
        toast.success("Notice posted!");
        setShowNoticeModal(false);
        setNoticeForm({ title: "", content: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleResolve = async (id) => {
    try {
      const { data } = await api.put(`/api/complaints/${id}/resolve`);
      if (data.success) {
        toast.success("Complaint resolved!");
        fetchAll();
      }
    } catch (err) {
      toast.error("Failed to resolve complaint");
    }
  };

  const handleMarkPaid = async (id) => {
    try {
      const { data } = await api.put(`/api/fees/${id}/pay`);
      if (data.success) {
        toast.success("Fee marked as paid!");
        fetchAll();
      }
    } catch (err) {
      toast.error("Failed to mark as paid");
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      const { data } = await api.delete(`/api/rooms/${id}`);
      if (data.success) {
        toast.success("Room deleted");
        fetchAll();
      }
    } catch (err) {
      toast.error("Failed to delete room");
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="min-h-screen bg-[#0f0e1a] text-white">
      <Navbar />

      <div className="pt-24 px-6 max-w-7xl mx-auto pb-16">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm">
            Manage students, rooms, and hostel operations.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm">Total Students</p>
            <h2 className="text-2xl font-bold mt-2">
              {stats?.totalStudents ?? "—"}
            </h2>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm">Occupied Rooms</p>
            <h2 className="text-2xl font-bold mt-2">
              {stats
                ? `${stats.occupiedRooms} / ${stats.totalRooms}`
                : "—"}
            </h2>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm">Pending Complaints</p>
            <h2 className="text-2xl font-bold mt-2 text-yellow-400">
              {stats?.pendingComplaints ?? "—"}
            </h2>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm">Revenue (Total)</p>
            <h2 className="text-2xl font-bold mt-2 text-green-400">
              {stats
                ? `₹${stats.monthlyRevenue.toLocaleString()}`
                : "—"}
            </h2>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <button
              onClick={() => setShowRoomModal(true)}
              className="p-6 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-500 text-left cursor-pointer hover:opacity-90 transition"
            >
              🏠 Add Room
            </button>
            <button
              onClick={() => setShowAssignModal(true)}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left cursor-pointer hover:bg-white/10 transition"
            >
              🔗 Assign Room
            </button>
            <button
              onClick={() => setShowFeeModal(true)}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left cursor-pointer hover:bg-white/10 transition"
            >
              💳 Create Fee
            </button>
            <button
              onClick={() => setShowNoticeModal(true)}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left cursor-pointer hover:bg-white/10 transition"
            >
              📢 Send Notice
            </button>
          </div>
        </div>

        {/* ROOMS TABLE */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Rooms</h2>
          {rooms.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-gray-400">
                  <tr>
                    <th className="p-4 text-left">Room</th>
                    <th className="p-4 text-left">Floor</th>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">Occupants</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr
                      key={room._id}
                      className="border-t border-white/10"
                    >
                      <td className="p-4 font-medium">{room.roomNumber}</td>
                      <td className="p-4">{room.floor}</td>
                      <td className="p-4 capitalize">{room.type}</td>
                      <td className="p-4">
                        <span
                          className={
                            room.occupants.length >= room.capacity
                              ? "text-red-400"
                              : "text-green-400"
                          }
                        >
                          {room.occupants.length} / {room.capacity}
                        </span>
                        {room.occupants.length > 0 && (
                          <span className="text-xs text-gray-500 ml-2">
                            ({room.occupants.map((o) => o.name).join(", ")})
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDeleteRoom(room._id)}
                          className="text-xs px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-sm text-center">
              No rooms created yet. Use "Add Room" to create one.
            </div>
          )}
        </div>

        {/* STUDENTS TABLE */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          {students.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-gray-400">
                  <tr>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Room</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr
                      key={s._id}
                      className="border-t border-white/10"
                    >
                      <td className="p-4">{s.name}</td>
                      <td className="p-4 text-gray-400">{s.email}</td>
                      <td className="p-4">
                        {s.room?.roomNumber || (
                          <span className="text-gray-500">Unassigned</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-sm text-center">
              No students registered yet.
            </div>
          )}
        </div>

        {/* FEES TABLE */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Fee Records</h2>
          {fees.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-gray-400">
                  <tr>
                    <th className="p-4 text-left">Student</th>
                    <th className="p-4 text-left">Month</th>
                    <th className="p-4 text-left">Amount</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((fee) => (
                    <tr
                      key={fee._id}
                      className="border-t border-white/10"
                    >
                      <td className="p-4">{fee.student?.name || "—"}</td>
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
                      <td className="p-4">
                        {fee.status === "pending" && (
                          <button
                            onClick={() => handleMarkPaid(fee._id)}
                            className="text-xs px-3 py-1 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 cursor-pointer"
                          >
                            Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-sm text-center">
              No fee records yet. Use "Create Fee" to add one.
            </div>
          )}
        </div>

        {/* COMPLAINTS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Complaints</h2>
          {complaints.length > 0 ? (
            <div className="space-y-4">
              {complaints.map((c) => (
                <div
                  key={c._id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm">
                      {c.description} — Room {c.roomNumber}
                    </p>
                    <span className="text-xs text-gray-500">
                      by {c.studentName || c.student?.name} •{" "}
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {c.status === "pending" ? (
                    <button
                      onClick={() => handleResolve(c._id)}
                      className="text-xs px-3 py-1 rounded-lg bg-green-500 hover:bg-green-600 cursor-pointer transition shrink-0"
                    >
                      Resolve
                    </button>
                  ) : (
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300 shrink-0">
                      Resolved
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-sm text-center">
              No complaints yet.
            </div>
          )}
        </div>
      </div>

      {/* CREATE ROOM MODAL */}
      <Modal
        isOpen={showRoomModal}
        onClose={() => setShowRoomModal(false)}
        title="Add Room"
      >
        <form onSubmit={handleCreateRoom} className="space-y-4">
          <input
            type="text"
            placeholder="Room Number (e.g. A-203)"
            value={roomForm.roomNumber}
            onChange={(e) =>
              setRoomForm({ ...roomForm, roomNumber: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
            required
          />
          <input
            type="number"
            placeholder="Floor"
            value={roomForm.floor}
            onChange={(e) =>
              setRoomForm({ ...roomForm, floor: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Capacity"
              value={roomForm.capacity}
              min={1}
              max={6}
              onChange={(e) =>
                setRoomForm({ ...roomForm, capacity: e.target.value })
              }
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
              required
            />
            <select
              value={roomForm.type}
              onChange={(e) =>
                setRoomForm({ ...roomForm, type: e.target.value })
              }
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
            >
              <option className="text-black" value="single">Single</option>
              <option className="text-black" value="double">Double</option>
              <option className="text-black" value="triple">Triple</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold cursor-pointer hover:opacity-90 transition"
          >
            Create Room
          </button>
        </form>
      </Modal>

      {/* ASSIGN ROOM MODAL */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        title="Assign Room to a Student"
      >
        <form onSubmit={handleAssign} className="space-y-4">
          <select
            value={assignForm.studentId}
            onChange={(e) =>
              setAssignForm({ ...assignForm, studentId: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
            required
          >
            <option hidden className="text-black" value="">Select Student</option>
            {students.map((s) => (
              <option className="text-black" key={s._id} value={s._id}>
                {s.name} ({s.email})
              </option>
            ))}
          </select>
          <select
            value={assignForm.roomId}
            onChange={(e) =>
              setAssignForm({ ...assignForm, roomId: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
            required
          >
            <option hidden className="text-black" value="">Select Room</option>
            {rooms
              .filter((r) => r.occupants.length < r.capacity)
              .map((r) => (
                <option className="text-black" key={r._id} value={r._id}>
                  {r.roomNumber} ({r.occupants.length}/{r.capacity})
                </option>
              ))}
          </select>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold cursor-pointer hover:opacity-90 transition"
          >
            Assign
          </button>
        </form>
      </Modal>

      {/* CREATE FEE MODAL */}
      <Modal
        isOpen={showFeeModal}
        onClose={() => setShowFeeModal(false)}
        title="Create Fee Record"
      >
        <form onSubmit={handleCreateFee} className="space-y-4">
          <select
            value={feeForm.studentId}
            onChange={(e) =>
              setFeeForm({ ...feeForm, studentId: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
            required
          >
            <option className="text-black" value="">Select Student</option>
            {students.map((s) => (
              <option className="text-black" key={s._id} value={s._id}>
                {s.name} ({s.email})
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount (₹)"
            value={feeForm.amount}
            onChange={(e) =>
              setFeeForm({ ...feeForm, amount: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={feeForm.month}
              onChange={(e) =>
                setFeeForm({ ...feeForm, month: e.target.value })
              }
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
              required
            >
              <option className="text-black" value="">Month</option>
              {months.map((m) => (
                <option className="text-black" key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Year"
              value={feeForm.year}
              onChange={(e) =>
                setFeeForm({ ...feeForm, year: e.target.value })
              }
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold cursor-pointer hover:opacity-90 transition"
          >
            Create Fee
          </button>
        </form>
      </Modal>

      {/* SEND NOTICE MODAL */}
      <Modal
        isOpen={showNoticeModal}
        onClose={() => setShowNoticeModal(false)}
        title="Send Notice"
      >
        <form onSubmit={handleSendNotice} className="space-y-4">
          <input
            type="text"
            placeholder="Notice Title"
            value={noticeForm.title}
            onChange={(e) =>
              setNoticeForm({ ...noticeForm, title: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400"
            required
          />
          <textarea
            placeholder="Notice content..."
            value={noticeForm.content}
            onChange={(e) =>
              setNoticeForm({ ...noticeForm, content: e.target.value })
            }
            rows={4}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-400 resize-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-semibold cursor-pointer hover:opacity-90 transition"
          >
            Post Notice
          </button>
        </form>
      </Modal>
    </div>
  );
}