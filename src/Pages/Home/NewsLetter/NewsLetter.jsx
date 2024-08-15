import { IoIosPaperPlane } from "react-icons/io";

const NewsLetter = () => {
  return (
    <div className="text-center bg-[#ab8a62] p-8 md:p-16 mx-3">
      <h2 className="font-extrabold text-3xl md:text-5xl lg:text-6xl text-white mb-6 md:mb-8">
        Subscribe Newsletter{" "}
      </h2>
      <div className="md:w-3/4 lg:w-1/2 mx-auto">
        <form className="flex flex-col lg:flex-row">
          <div className="form-control w-full lg:w-2/3 text-black mb-4 lg:mb-0 lg:mr-2">
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              className="input bg-white rounded-lg p-3 w-full lg:rounded-none"
              required
            />
          </div>
          <div className="form-control w-full lg:w-1/3">
            <button className="btn flex items-center justify-center rounded-lg lg:rounded-none p-3 w-full bg-black text-white">
              <IoIosPaperPlane /> Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
