import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  FaBed,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaPen,
  FaUserCircle,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// ==========================================
// Helper — format Firebase's ISO creation date
// ==========================================
const formatJoinDate = (isoString) => {
  if (!isoString) return "Unknown";

  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Profile = () => {
  const { user, updateUserProfile } = useAuth();

  const axiosSecure = useAxiosSecure();

  // ==========================================
  // Edit State
  // ==========================================
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user?.displayName || "");

  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const [saving, setSaving] = useState(false);

  // ==========================================
  // Booking Stats (reuses the same protected endpoint as MyBookings)
  // ==========================================
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);

      return res.data;
    },
  });

  const totalBookings = bookings.length;

  const paidBookings = bookings.filter(
    (b) => b.paymentStatus === "paid",
  ).length;

  const pendingBookings = totalBookings - paidBookings;

  const totalSpent = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  // ==========================================
  // Handle Save
  // ==========================================
  const handleSave = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Name can't be empty!");
      return;
    }

    setSaving(true);

    try {
      await updateUserProfile({
        displayName: name.trim(),
        photoURL: photoURL.trim(),
      });

      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile!");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
    setIsEditing(false);
  };

  return (
    <div className="bg-[#faf7f2] min-h-screen">
      <ToastContainer />

      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-16">
        {/* ==========================================
            Profile Card
        ========================================== */}
        <div className="bg-white rounded-[35px] shadow-lg p-8 md:p-10">
          {!isEditing ? (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user?.displayName || "User"}
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#c49b63] shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-[#c49b63] text-white flex items-center justify-center shadow-md">
                  <FaUserCircle size={64} />
                </div>
              )}

              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-black text-black">
                  {user?.displayName || "Hotel Guest"}
                </h1>

                <p className="text-gray-500 mt-1">{user?.email}</p>

                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mt-4">
                  <FaCalendarAlt />

                  <span>
                    Member since {formatJoinDate(user?.metadata?.creationTime)}
                  </span>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 inline-flex items-center gap-2 bg-[#c49b63] hover:bg-[#aa8453] text-white font-bold px-6 py-3 rounded-2xl transition duration-300"
                >
                  <FaPen size={14} />
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            /* ==========================================
                Edit Form
            ========================================== */
            <form onSubmit={handleSave} className="space-y-5 max-w-md">
              <h2 className="text-2xl font-black text-black mb-4">
                Edit Profile
              </h2>

              <div>
                <label className="text-black font-semibold mb-2 block">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="input input-bordered w-full bg-white text-black rounded-2xl h-14"
                  required
                />
              </div>

              <div>
                <label className="text-black font-semibold mb-2 block">
                  Photo URL
                </label>

                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full bg-white text-black rounded-2xl h-14"
                />
              </div>

              <div>
                <label className="text-black font-semibold mb-2 block">
                  Email
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 text-black rounded-2xl h-14"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 h-14 rounded-2xl bg-[#c49b63] hover:bg-[#aa8453] text-white font-bold transition duration-300 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex-1 h-14 rounded-2xl bg-gray-100 hover:bg-gray-200 text-black font-bold transition duration-300 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ==========================================
            Booking Stats
        ========================================== */}
        <h2 className="text-2xl font-black text-black mt-12 mb-6">
          Booking Stats
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-[#c49b63]"></span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FaBed />
                <p>Total Bookings</p>
              </div>

              <h3 className="text-2xl font-black mt-2 text-black">
                {totalBookings}
              </h3>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FaCheckCircle />
                <p>Paid</p>
              </div>

              <h3 className="text-2xl font-black mt-2 text-green-600">
                {paidBookings}
              </h3>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FaClock />
                <p>Pending</p>
              </div>

              <h3 className="text-2xl font-black mt-2 text-yellow-600">
                {pendingBookings}
              </h3>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FaDollarSign />
                <p>Total Spent</p>
              </div>

              <h3 className="text-2xl font-black mt-2 text-[#c49b63]">
                ${totalSpent.toFixed(2)}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
