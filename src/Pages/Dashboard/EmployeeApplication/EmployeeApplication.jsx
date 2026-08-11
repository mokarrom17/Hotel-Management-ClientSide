import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const EmployeeApplication = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Employee Application:", data);

    // API পরে connect করব
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Employee Application
          </h1>

          <p className="mt-2 text-gray-500">
            Apply to join our hotel team. Your application will be reviewed by
            an administrator.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                defaultValue={user?.displayName || ""}
                readOnly
                className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600 outline-none"
                {...register("name", {
                  required: "Name is required",
                })}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                defaultValue={user?.email || ""}
                readOnly
                className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600 outline-none"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone + Date of Birth */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-[#aa8453]"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^01[3-9]\d{8}$/,
                      message: "Enter a valid Bangladeshi phone number",
                    },
                  })}
                />

                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Date of Birth
                </label>

                <input
                  type="date"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-[#aa8453]"
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                />

                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Address
              </label>

              <textarea
                rows="3"
                placeholder="Enter your current address"
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-[#aa8453]"
                {...register("address", {
                  required: "Address is required",
                })}
              />

              {errors.address && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Position */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Position Applied For
              </label>

              <select
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-[#aa8453]"
                {...register("position", {
                  required: "Please select a position",
                })}
              >
                <option value="">Select a position</option>
                <option value="Front Desk">Front Desk</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Reservations">Reservations</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Maintenance">Maintenance</option>
              </select>

              {errors.position && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.position.message}
                </p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Previous Experience
              </label>

              <select
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-[#aa8453]"
                {...register("experience", {
                  required: "Please select your experience",
                })}
              >
                <option value="">Select experience</option>
                <option value="No experience">No experience</option>
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>

              {errors.experience && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Skills
              </label>

              <input
                type="text"
                placeholder="e.g. Customer Service, Communication, MS Office"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-[#aa8453]"
                {...register("skills", {
                  required: "Please enter your skills",
                })}
              />

              {errors.skills && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.skills.message}
                </p>
              )}
            </div>

            {/* Reason */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Why do you want to join us?
              </label>

              <textarea
                rows="5"
                placeholder="Tell us why you would be a good fit..."
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-[#aa8453]"
                {...register("reason", {
                  required: "Please tell us why you want to join",
                  minLength: {
                    value: 20,
                    message: "Please write at least 20 characters",
                  },
                })}
              />

              {errors.reason && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.reason.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end border-t border-gray-100 pt-6">
              <button
                type="submit"
                className="rounded-xl bg-[#aa8453] px-7 py-3 font-semibold text-white transition hover:bg-black"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeApplication;
