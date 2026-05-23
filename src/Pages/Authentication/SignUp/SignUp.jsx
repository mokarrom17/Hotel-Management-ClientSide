import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/Hotel.jpg";
import { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxios from "../../../hooks/useAxios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);

  const axiosPublic = useAxios();

  const navigate = useNavigate();

  // Show Password Toggle
  const [showPassword, setShowPassword] = useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Password Watch
  const password = watch("password");

  // Submit Handler
  const handleRegister = async (data) => {
    const { name, email, password } = data;

    setLoading(true);

    try {
      // Create Firebase User
      const result = await createUser(email, password);

      const user = result.user;

      // Update User Profile
      await updateProfile(user, {
        displayName: name,
      });

      // User Info
      const userInfo = {
        name,
        email,
        photoURL: user.photoURL || "",
        role: "customer",
        createdAt: new Date(),
        lastLogin: new Date(),
      };

      // Save User To Database
      const res = await axiosPublic.post("/users", userInfo);

      if (res.data.insertedId || res.data.message) {
        toast.success("Account Created Successfully");
      }

      // Reset Form
      reset();

      // Navigate
      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 lg:px-8 py-4">
      <div className="rounded-3xl overflow-hidden">
        <div className="relative">
          {/* Background Image */}
          <img src={img} className="w-full min-h-screen object-cover" alt="" />

          {/* Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#151515]/90
              to-[#00000020]
              flex
              items-center
              justify-center
              lg:justify-between
              px-6
              lg:px-10
            "
          >
            {/* Left Content */}
            <div className="hidden lg:block max-w-xl">
              <p
                className="
                  text-[#aa8453]
                  uppercase
                  tracking-[6px]
                  font-semibold
                  mb-5
                "
              >
                Luxury Hotel Experience
              </p>

              <h2
                className="
                  text-white
                  text-6xl
                  font-extrabold
                  leading-tight
                "
              >
                SPEND YOUR BEAUTIFUL MOMENT WITH LUXURY.
              </h2>

              <p className="text-gray-300 mt-6 text-lg leading-8">
                Experience world-class hospitality, premium rooms, luxury
                services, and unforgettable comfort crafted for your perfect
                stay.
              </p>
            </div>

            {/* Sign Up Form */}
            <form
              onSubmit={handleSubmit(handleRegister)}
              className="
                card-body
                bg-white
                rounded-3xl
                shadow-2xl
                w-full
                max-w-[460px]
                border
                border-gray-200
              "
            >
              {/* Heading */}
              <div className="mb-2">
                <h1
                  className="
                    text-5xl
                    text-center
                    text-black
                    font-bold
                  "
                >
                  Sign Up
                </h1>

                <p className="text-center text-gray-500 mt-3">
                  Create your luxury hotel account
                </p>
              </div>

              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-black">
                    Full Name
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="
                    input
                    input-bordered
                    h-14
                    text-black
                    rounded-xl
                  "
                  {...register("name", {
                    required: "Name is required",
                  })}
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-black">
                    Email Address
                  </span>
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    input
                    input-bordered
                    h-14
                    text-black
                    rounded-xl
                  "
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-black">
                    Password
                  </span>
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="
                      input
                      input-bordered
                      h-14
                      text-black
                      rounded-xl
                      w-full
                    "
                    {...register("password", {
                      required: "Password is required",

                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },

                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,

                        message:
                          "Password must contain uppercase, lowercase and number",
                      },
                    })}
                  />

                  {/* Show Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                    "
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}

                {/* Password Strength */}
                {password && (
                  <p className="text-sm mt-2 text-[#aa8453] font-medium">
                    Password looks good 🔥
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 mt-1">
                <input type="checkbox" className="checkbox checkbox-sm mt-1" />

                <p className="text-sm text-gray-600">
                  I agree to the{" "}
                  <span className="text-[#aa8453] font-semibold">
                    Terms & Conditions
                  </span>
                </p>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    btn
                    h-14
                    rounded-xl
                    tracking-wide
                    bg-[#aa8453]
                    hover:bg-black
                    text-white
                    border-none
                    font-bold
                    text-lg
                    transition
                    duration-300
                  "
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>
              </div>

              {/* Login */}
              <p className="text-black font-semibold text-center mt-2">
                Already Have Account ?
                <Link
                  to="/login"
                  className="
                    text-[#aa8453]
                    ml-2
                    hover:underline
                  "
                >
                  Login
                </Link>
              </p>

              {/* Divider */}
              <div className="divider text-slate-500">OR</div>

              {/* Google Button */}
              <button
                type="button"
                className="
                  btn
                  bg-white
                  text-black
                  border
                  border-gray-300
                  hover:bg-gray-100
                  rounded-xl
                  h-14
                  font-semibold
                "
              >
                <svg
                  aria-label="Google logo"
                  width="18"
                  height="18"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>

                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>

                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>

                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>

                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Sign Up with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
