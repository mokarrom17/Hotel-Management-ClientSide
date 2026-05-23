import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/Hotel.jpg";

import { useContext, useState } from "react";

import { useForm } from "react-hook-form";

import { AuthContext } from "../../../Providers/AuthProvider";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import toast from "react-hot-toast";

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // ==========================================
  // State
  // ==========================================
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // ==========================================
  // React Hook Form
  // ==========================================
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ==========================================
  // Submit Handler
  // ==========================================
  const onSubmit = async (data) => {
    const { email, password } = data;

    setLoading(true);

    try {
      const result = await signIn(email, password);

      console.log(result.user);

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 lg:px-8 py-4">
      <div className="rounded-3xl overflow-hidden">
        <div className="relative">
          {/* ==========================================
              Background Image
          ========================================== */}
          <img src={img} className="w-full min-h-screen object-cover" alt="" />

          {/* ==========================================
              Overlay
          ========================================== */}
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
            {/* ==========================================
                Left Content
            ========================================== */}
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
                WELCOME BACK TO YOUR LUXURY STAY.
              </h2>

              <p className="text-gray-300 mt-6 text-lg leading-8">
                Access your premium hotel account, manage reservations, enjoy
                exclusive offers and experience luxury comfort.
              </p>
            </div>

            {/* ==========================================
                Login Form
            ========================================== */}
            <form
              onSubmit={handleSubmit(onSubmit)}
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
                  Login
                </h1>

                <p className="text-center text-gray-500 mt-3">
                  Welcome back to your luxury account
                </p>
              </div>

              {/* ==========================================
                  Email
              ========================================== */}
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

              {/* ==========================================
                  Password
              ========================================== */}
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

                {/* Forgot Password */}
                <div className="mt-2 text-right">
                  <Link
                    to="/forgot-password"
                    className="
                      text-sm
                      text-[#aa8453]
                      hover:underline
                      font-medium
                    "
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* ==========================================
                  Submit Button
              ========================================== */}
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
                  {loading ? "Logging In..." : "Login"}
                </button>
              </div>

              {/* ==========================================
                  Sign Up
              ========================================== */}
              <p className="text-black font-semibold text-center mt-2">
                Don&apos;t Have An Account ?
                <Link
                  to="/signUp"
                  className="
                    text-[#aa8453]
                    ml-2
                    hover:underline
                  "
                >
                  Sign Up
                </Link>
              </p>

              {/* Divider */}
              <div className="divider text-slate-500">OR</div>

              {/* ==========================================
                  Google Button
              ========================================== */}
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
                Login with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
