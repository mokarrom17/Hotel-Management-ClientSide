import { Link, useNavigate, useParams } from "react-router-dom";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

import Lightbox from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";

import {
  FaArrowLeft,
  FaBed,
  FaCheckCircle,
  FaEdit,
  FaLayerGroup,
  FaRulerCombined,
  FaStar,
  FaTimesCircle,
  FaTrash,
  FaUserFriends,
} from "react-icons/fa";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";

const ManageRoomTypeDetails = () => {
  const [open, setOpen] = useState(false);

  const [photoIndex, setPhotoIndex] = useState(0);

  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    data: room,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["roomType", id],

    queryFn: async () => {
      const res = await axiosSecure.get(`/roomTypes/${id}`);

      return res.data;
    },
  });

  // ==========================================
  // Admin Actions
  // ==========================================

  const handleToggleAvailability = async () => {
    try {
      await axiosSecure.patch(`/roomTypes/${id}`, {
        isAvailable: !room.isAvailable,
      });

      toast.success(
        `Room marked as ${!room.isAvailable ? "Available" : "Booked"}`,
      );

      queryClient.invalidateQueries({ queryKey: ["roomType", id] });
    } catch (error) {
      toast.error("Failed to update availability!");
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Delete this room?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c49b63",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/roomTypes/${id}`);

          toast.success("Room deleted!");

          setTimeout(() => navigate("/dashboard/manage-room-types"), 1000);
        } catch (error) {
          toast.error("Failed to delete room!");
        }
      }
    });
  };

  // ==========================================
  // Loading / Error
  // ==========================================

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-[#c49b63]"></span>
      </div>
    );
  }

  if (isError || !room) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-500">Failed to Load Room</h2>

        <Link
          to="/dashboard/manage-room-types"
          className="text-[#c49b63] underline mt-4 inline-block"
        >
          Back to Manage Rooms
        </Link>
      </div>
    );
  }

  const {
    type,
    image,
    adults,
    child,
    price,
    description,
    checkInTime,
    checkOutTime,
    cancellationPolicy,
    amenities = [],
    beds,
    gallery = [],
    rating,
    reviews = [],
    totalReviews,
    tags = [],
    size,
    floor,
    view,
    isAvailable,
  } = room;

  // Lightbox needs slides in { src } format
  const lightboxSlides = gallery.map((img) => ({ src: img }));

  return (
    <div className="space-y-8 ml-10 mb-12">
      <ToastContainer />

      {/* ==========================================
          Lightbox — renders as a fixed overlay when open
      ========================================== */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={lightboxSlides}
      />

      {/* ==========================================
          Header
      ========================================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3  py-3 rounded-full  bg-[#faf7f2] text-[#c49b63] text-xs font-bold uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-4xl font-black text-black">{type}</h2>

          <p className="text-gray-500 mt-1">Complete Room Information</p>
        </div>

        <Link
          to="/dashboard/manage-room-types"
          className="btn btn-outline border-[#c49b63] text-[#c49b63] hover:bg-[#c49b63] hover:text-white hover:border-[#c49b63]"
        >
          <FaArrowLeft />
          Back
        </Link>
      </div>

      {/* ==========================================
          Hero Image
      ========================================== */}
      <div className="rounded-[35px] overflow-hidden shadow-lg">
        <img
          src={image}
          alt={type}
          className="w-full h-[400px] md:h-[450px] object-cover"
        />
      </div>

      {/* ==========================================
          Stats Row
      ========================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-gray-400 text-sm">Price</p>
          <h3 className="text-3xl font-black mt-2 text-[#c49b63]">${price}</h3>
          <p className="text-gray-400 text-sm mt-1">Per Night</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-gray-400 text-sm">Capacity</p>
          <h3 className="text-3xl font-black mt-2 text-black">
            {(adults || 0) + (child || 0)}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {adults || 0} Adults • {child || 0} Child
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-gray-400 text-sm">Rating</p>
          <h3 className="text-3xl font-black mt-2 text-yellow-500 flex items-center gap-2">
            {rating || "N/A"} <FaStar className="text-xl" />
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {totalReviews || 0} Reviews
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-gray-400 text-sm">Availability</p>
          <h3
            className={`text-2xl font-black mt-2 flex items-center gap-2 ${
              isAvailable ? "text-green-600" : "text-red-500"
            }`}
          >
            {isAvailable ? (
              <>
                <FaCheckCircle /> Available
              </>
            ) : (
              <>
                <FaTimesCircle /> Booked
              </>
            )}
          </h3>
          <p className="text-gray-400 text-sm mt-1">Current Status</p>
        </div>
      </div>

      {/* ==========================================
          Main Layout — content + sidebar
      ========================================== */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* ---------- Main Content ---------- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery */}
          <div className="bg-white rounded-[35px] shadow-lg p-8">
            <h2 className="text-2xl font-black text-black mb-5">
              Room Gallery
            </h2>

            {gallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    onClick={() => {
                      setPhotoIndex(index);
                      setOpen(true);
                    }}
                    className="rounded-2xl h-40 w-full object-cover cursor-pointer hover:scale-105 transition duration-300"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No gallery images added yet.</p>
            )}
          </div>

          {/* Description */}
          <div className="bg-white rounded-[35px] shadow-lg p-8">
            <h2 className="text-2xl font-black text-black mb-4">Description</h2>

            <p className="text-gray-600 leading-8">
              {description || "No description provided."}
            </p>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-[35px] shadow-lg p-8">
            <h2 className="text-2xl font-black text-black mb-5">Amenities</h2>

            {amenities.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-xl bg-[#faf7f2] text-black text-sm font-medium"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No amenities listed.</p>
            )}
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-[35px] shadow-lg p-8">
            <h2 className="text-2xl font-black text-black mb-5">
              Guest Reviews
            </h2>

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border border-gray-100 rounded-2xl p-5"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-black">{review.name}</h3>

                      <div className="flex items-center gap-1 text-yellow-500">
                        <FaStar />
                        <span>{review.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600">{review.comment}</p>

                    <p className="text-sm text-gray-400 mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No reviews yet.</p>
            )}
          </div>
        </div>

        {/* ---------- Sidebar ---------- */}
        <div className="space-y-6">
          {/* Room Information */}
          <div className="bg-white rounded-[35px] shadow-lg p-8">
            <h2 className="text-xl font-black text-black mb-5">
              Room Information
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-2">
                  <FaBed /> Beds
                </span>
                <span className="font-semibold">{beds || "N/A"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-2">
                  <FaRulerCombined /> Room Size
                </span>
                <span className="font-semibold">
                  {size ? `${size} sqft` : "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-2">
                  <FaLayerGroup /> Floor
                </span>
                <span className="font-semibold">{floor || "N/A"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-2">
                  <FaUserFriends /> View
                </span>
                <span className="font-semibold">{view || "N/A"}</span>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-gray-500">Check In</span>
                <span className="font-semibold">{checkInTime || "N/A"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Check Out</span>
                <span className="font-semibold">{checkOutTime || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="bg-white rounded-[35px] shadow-lg p-8">
            <h2 className="text-xl font-black text-black mb-4">
              Cancellation Policy
            </h2>

            <p className="text-gray-600 leading-7">
              {cancellationPolicy || "No policy specified."}
            </p>
          </div>

          {/* Admin Actions */}
          <div className="bg-white rounded-[35px] shadow-lg p-8 space-y-3">
            <h2 className="text-xl font-black text-black mb-2">
              Admin Actions
            </h2>

            <Link
              to={`/dashboard/manage-room-types/edit/${id}`}
              className="w-full btn bg-[#c49b63] hover:bg-[#aa8453] text-white border-0"
            >
              <FaEdit /> Edit Room
            </Link>

            <button
              onClick={handleToggleAvailability}
              className={`w-full btn border-0 ${
                isAvailable
                  ? "btn-outline border-red-400 text-red-500 hover:bg-red-500 hover:text-white"
                  : "btn-outline border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
              }`}
            >
              {isAvailable ? (
                <>
                  <FaTimesCircle /> Mark As Booked
                </>
              ) : (
                <>
                  <FaCheckCircle /> Mark As Available
                </>
              )}
            </button>

            <button
              onClick={handleDelete}
              className="w-full btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <FaTrash /> Delete Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRoomTypeDetails;
