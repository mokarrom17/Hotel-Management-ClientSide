import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  FaArrowLeft,
  FaBed,
  FaCalendarAlt,
  FaClipboardList,
  FaDoorOpen,
  FaImage,
  FaImages,
  FaMoneyBillWave,
  FaSave,
  FaTags,
  FaUndoAlt,
  FaUsers,
  FaWifi,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const EditRoomType = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roomNumber: "",
      type: "",

      adults: 1,
      child: 0,
      capacity: 1,

      beds: "",
      floor: "",
      size: "",
      view: "",

      smokingAllowed: false,
      isAvailable: true,

      discount: 0,
      price: "",

      description: "",

      image: "",

      gallery: ["", "", ""],

      amenities: [],

      tags: [],

      availability: {
        startDate: "",
        endDate: "",
      },

      cancellationPolicy: "",

      checkInTime: "",
      checkOutTime: "",
    },
  });

  const adults = Number(watch("adults")) || 0;

  const child = Number(watch("child")) || 0;

  const {
    data: room = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["roomType", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/roomTypes/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (room && Object.keys(room).length > 0) {
      reset(room);
    }
  }, [room, reset]);

  const onSubmit = async (data) => {
    try {
      setIsUpdating(true);

      delete data.reviews;
      delete data.bookedDates;
      delete data.totalReviews;

      data.capacity = Number(data.adults) + Number(data.child);

      const res = await axiosSecure.patch(`/roomTypes/${id}`, data);

      if (res.data.modifiedCount > 0 || res.data.success) {
        await queryClient.invalidateQueries({
          queryKey: ["roomTypes"],
        });

        await queryClient.invalidateQueries({
          queryKey: ["roomType", id],
        });

        Swal.fire({
          icon: "success",
          title: "Room Type Updated Successfully",
          text: "Your changes have been saved.",
          timer: 1800,
          showConfirmButton: false,
        });

        navigate(`/dashboard/manage-room-types/${id}`);
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-10">
      {/* Header */}

      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-bold">Edit Room Type</h2>

          <p className="text-gray-500 mt-2">
            Update existing room information.
          </p>
        </div>

        <Link to={`/dashboard/manage-room-types`} className="btn btn-outline">
          <FaArrowLeft />
          Back
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ================= Basic Information ================= */}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <FaBed className="text-primary" />
              Basic Information
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Room Type */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Room Type</span>
                </label>

                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Deluxe Queen Room"
                  {...register("type", {
                    required: "Room Type is required",
                  })}
                />

                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Beds */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Bed Type</span>
                </label>

                <select
                  className="select select-bordered w-full"
                  {...register("beds", {
                    required: "Bed type is required",
                  })}
                >
                  <option value="">Select Bed Type</option>
                  <option value="Single">Single</option>
                  <option value="Twin">Twin</option>
                  <option value="Double">Double</option>
                  <option value="Queen">Queen</option>
                  <option value="King">King</option>
                </select>

                {errors.beds && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.beds.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}

            <div className="mt-6">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>

              <textarea
                rows={6}
                className="textarea textarea-bordered w-full"
                placeholder="Write room description..."
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>

              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ================= Capacity ================= */}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <FaUsers className="text-primary" />
              Capacity
            </h2>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
              {/* Adults */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Adults</span>
                </label>

                <input
                  type="number"
                  min={1}
                  className="input input-bordered w-full"
                  {...register("adults", {
                    valueAsNumber: true,
                    required: true,
                  })}
                />
              </div>

              {/* Child */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Child</span>
                </label>

                <input
                  type="number"
                  min={0}
                  className="input input-bordered w-full"
                  {...register("child", {
                    valueAsNumber: true,
                    required: true,
                  })}
                />
              </div>

              {/* Total Capacity */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Total Capacity</span>
                </label>

                <input
                  type="number"
                  className="input input-bordered bg-base-200 w-full"
                  value={adults + child}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        {/* ================= Room Details ================= */}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <FaDoorOpen className="text-primary" />
              Room Details
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Floor */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Floor</span>
                </label>

                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="2"
                  {...register("floor", {
                    required: "Floor is required",
                    valueAsNumber: true,
                  })}
                />

                {errors.floor && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.floor.message}
                  </p>
                )}
              </div>

              {/* Room Size */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Room Size (sqft)
                  </span>
                </label>

                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="320"
                  {...register("size", {
                    required: "Room size is required",
                    valueAsNumber: true,
                  })}
                />

                {errors.size && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.size.message}
                  </p>
                )}
              </div>

              {/* Room View */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Room View</span>
                </label>

                <select
                  className="select select-bordered w-full"
                  {...register("view", {
                    required: "Please select room view",
                  })}
                >
                  <option value="">Select View</option>
                  <option value="Ocean View">Ocean View</option>
                  <option value="City View">City View</option>
                  <option value="Garden View">Garden View</option>
                  <option value="Pool View">Pool View</option>
                  <option value="Mountain View">Mountain View</option>
                </select>

                {errors.view && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.view.message}
                  </p>
                )}
              </div>

              {/* Smoking */}

              <div>
                <label className="label cursor-pointer justify-start gap-4 mt-8">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    {...register("smokingAllowed")}
                  />

                  <span className="label-text">Smoking Allowed</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Pricing ================= */}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <FaMoneyBillWave className="text-success" />
              Pricing
            </h2>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Price */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Price (£)</span>
                </label>

                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="150"
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                  })}
                />

                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Discount */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Discount (%)</span>
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  className="input input-bordered w-full"
                  placeholder="10"
                  {...register("discount", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= Availability ================= */}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <FaCalendarAlt className="text-info" />
              Availability
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Available */}

              <div>
                <label className="label cursor-pointer justify-start gap-4">
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    {...register("isAvailable")}
                  />

                  <span className="label-text">Currently Available</span>
                </label>
              </div>

              <div></div>

              {/* Start Date */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Available From</span>
                </label>

                <input
                  type="date"
                  className="input input-bordered w-full"
                  {...register("availability.startDate")}
                />
              </div>

              {/* End Date */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Available Until
                  </span>
                </label>

                <input
                  type="date"
                  className="input input-bordered w-full"
                  {...register("availability.endDate")}
                />
              </div>
            </div>
          </div>
        </div>
        {/* ================= Main Image ================= */}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <FaImage className="text-warning" />
              Images
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image URL */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Main Image URL</span>
                </label>

                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="https://..."
                  {...register("image", {
                    required: "Image URL is required",
                  })}
                />

                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Preview */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Image Preview</span>
                </label>

                <img
                  src={
                    watch("image") ||
                    "https://placehold.co/600x400?text=Preview"
                  }
                  alt="Preview"
                  className="w-full h-64 rounded-xl object-cover border"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= Gallery ================= */}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <FaImages className="text-warning" />
              Gallery Images
            </h2>
            <div className="grid gap-6">
              {/* Gallery 1 */}

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Gallery Image 1"
                {...register("gallery.0")}
              />

              {/* Gallery 2 */}

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Gallery Image 2"
                {...register("gallery.1")}
              />

              {/* Gallery 3 */}

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Gallery Image 3"
                {...register("gallery.2")}
              />
            </div>

            {/* Preview */}

            <div className="grid md:grid-cols-3 gap-5 mt-8">
              {[0, 1, 2].map((index) => (
                <img
                  key={index}
                  src={
                    watch(`gallery.${index}`) ||
                    "https://placehold.co/400x300?text=Gallery"
                  }
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-48 rounded-xl object-cover border"
                />
              ))}
            </div>
          </div>
        </div>
        {/* ================= Amenities ================= */}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <FaWifi className="text-secondary" />
              Amenities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                "wifi",
                "TV",
                "AC",
                "private balcony",
                "ocean view",
                "mini fridge",
                "safe",
                "hair dryer",
                "coffee machine",
                "parking",
                "gym",
                "swimming pool",
              ].map((item) => (
                <label
                  key={item}
                  className="label cursor-pointer justify-start gap-3"
                >
                  <input
                    type="checkbox"
                    value={item}
                    className="checkbox checkbox-primary"
                    {...register("amenities")}
                  />

                  <span className="label-text capitalize">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ================= Tags ================= */}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <FaTags className="text-accent" />
              Room Tags
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                "popular",
                "best value",
                "featured",
                "luxury",
                "family",
                "couple",
                "premium",
                "budget",
                "ocean view",
                "new",
              ].map((tag) => (
                <label
                  key={tag}
                  className="label cursor-pointer justify-start gap-3"
                >
                  <input
                    type="checkbox"
                    value={tag}
                    className="checkbox checkbox-secondary"
                    {...register("tags")}
                  />

                  <span className="label-text capitalize">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ================= Policies ================= */}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <FaClipboardList className="text-error" />
              Policies
            </h2>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Check In */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Check In Time</span>
                </label>

                <input
                  type="text"
                  placeholder="2:00 PM"
                  className="input input-bordered w-full"
                  {...register("checkInTime", {
                    required: "Check In Time is required",
                  })}
                />

                {errors.checkInTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.checkInTime.message}
                  </p>
                )}
              </div>

              {/* Check Out */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">Check Out Time</span>
                </label>

                <input
                  type="text"
                  placeholder="11:00 AM"
                  className="input input-bordered w-full"
                  {...register("checkOutTime", {
                    required: "Check Out Time is required",
                  })}
                />

                {errors.checkOutTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.checkOutTime.message}
                  </p>
                )}
              </div>

              {/* Cancellation Policy */}

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Cancellation Policy
                  </span>
                </label>

                <select
                  className="select select-bordered w-full"
                  {...register("cancellationPolicy", {
                    required: "Please select cancellation policy",
                  })}
                >
                  <option value="">Select Policy</option>

                  <option value="Free Cancellation">Free Cancellation</option>

                  <option value="Non Refundable">Non Refundable</option>

                  <option value="24 Hours Before Check-in">
                    24 Hours Before Check-in
                  </option>

                  <option value="48 Hours Before Check-in">
                    48 Hours Before Check-in
                  </option>
                </select>

                {errors.cancellationPolicy && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cancellationPolicy.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ================= Submit ================= */}

        <div className="flex justify-end items-center gap-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => reset(room)}
            disabled={isUpdating}
            className="btn btn-outline"
          >
            <FaUndoAlt />
            Reset Changes
          </button>

          <button
            type="submit"
            disabled={isUpdating}
            className="btn btn-primary min-w-44"
          >
            {isUpdating ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Updating...
              </>
            ) : (
              <>
                <FaSave />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoomType;
