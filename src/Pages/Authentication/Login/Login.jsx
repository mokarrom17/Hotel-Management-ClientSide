import { Link, useNavigate } from "react-router-dom";
import img from "../../../assets/Hotel.jpg";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="">
      <div className="carousel w-full rounded-lg">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={img} className="w-full m-6" />

          <div className="absolute h-full flex items-center justify-between w-full bg-gradient-to-r from-[#151515] to-[#00000000] ">
            <h2 className="text-white text-5xl ml-10 w-1/2 font-extrabold  ">
              SPEND YOUR BEAUTIFUL MOMENT WITH LUXURY.
            </h2>

            <form
              onSubmit={handleLogin}
              className="card-body border text-white  bg-white rounded-lg mr-32 "
            >
              <h1 className="text-5xl text-center text-black mb-5 font-bold">
                Login now!
              </h1>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-black">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-black">
                    Password
                  </span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover font-bold text-black text-1xl"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <button className="btn bg-[#FF3811] font-bold text-white">
                  Login
                </button>
              </div>
              <p className="text-black font-bold text-center mx-4">
                Do Not Have Account ?
                <Link to={"/signUp"} className="text-[#FF3811]">
                  {" "}
                  Sign Up
                </Link>
              </p>
              <div className="divider text-slate-500">OR</div>
              <button className="btn bg-white text-black border-[#e5e5e5]">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
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
