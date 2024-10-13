import { Link } from "react-router-dom";
import img from "../../assets/Hotel.jpg";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
const Login = () => {
  const handleLogin = (event) => {
    const { signUp } = useContext(AuthContext);

    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signUp(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => console.log(error));
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
