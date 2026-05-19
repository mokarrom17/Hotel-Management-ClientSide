import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/Hotel.jpg";
import { useContext } from "react";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxios from "../../../hooks/useAxios";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(name, email, password);

    // Password Validation
    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      // Create Firebase User
      const result = await createUser(email, password);

      const user = result.user;

      // Update User Profile
      await updateProfile(user, {
        displayName: name,
      });

      // User Info For Database
      const userInfo = {
        name,
        email,
        photoURL: user.photoURL || "",
        role: "customer",
        createdAt: new Date(),
        lastLogin: new Date(),
      };

      // Save User In MongoDB
      const res = await axiosSecure.post("/users", userInfo);

      console.log(res.data);

      // Navigate Home
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="carousel w-full rounded-lg">
        <div id="slide1" className="carousel-item relative w-full">
          {/* Background Image */}
          <img src={img} className="w-full h-screen object-cover" />

          {/* Overlay */}
          <div className="absolute h-full w-full bg-gradient-to-r from-[#151515]/90 to-[#00000020] flex items-center justify-between px-10">
            {/* Left Content */}
            <div className="w-1/2 hidden lg:block">
              <h2 className="text-white text-6xl font-extrabold leading-tight">
                SPEND YOUR BEAUTIFUL MOMENT WITH LUXURY.
              </h2>

              <p className="text-gray-300 mt-6 text-lg max-w-lg">
                Experience world-class hospitality, luxury rooms, and premium
                hotel services with comfort and elegance.
              </p>
            </div>

            {/* Signup Form */}
            <form
              onSubmit={handleSignUp}
              className="
                card-body
                bg-white
                rounded-2xl
                shadow-2xl
                lg:w-[450px]
                border
                border-gray-200
              "
            >
              <h1 className="text-5xl text-center text-black mb-4 font-bold">
                Sign Up
              </h1>

              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-black">Name</span>
                </label>

                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered text-black"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-black">Email</span>
                </label>

                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered text-black"
                  required
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-black">
                    Password
                  </span>
                </label>

                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered text-black"
                  required
                />

                <label className="label">
                  <a
                    href="#"
                    className="
                      label-text-alt
                      link
                      link-hover
                      font-semibold
                      text-black
                    "
                  >
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-2">
                <button
                  type="submit"
                  className="
                    btn
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
                  Sign Up
                </button>
              </div>

              {/* Login Link */}
              <p className="text-black font-semibold text-center mt-2">
                Already Have Account ?
                <Link
                  to="/login"
                  className="text-[#aa8453] ml-2 hover:underline"
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
