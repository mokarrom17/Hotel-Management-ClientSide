import { IoIosPaperPlane } from "react-icons/io";

const NewsLetter = () => {
  return (
    <div className="text-center bg-[#ab8a62] p-16 mx-3">
      <h2 className="font-extrabold text-6xl text-white mb-8">
        Subscribe Newsletter{" "}
      </h2>
      <div className="w-1/2 mx-auto">
        <form className="lg:flex">
          <div className="form-control w-2/3 text-black">
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              className="input bg-white rounded-none"
              required
            />
          </div>
          <div className="form-control w-1/3">
            <button className="btn rounded-none bg-black text-white">
              <IoIosPaperPlane /> Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
