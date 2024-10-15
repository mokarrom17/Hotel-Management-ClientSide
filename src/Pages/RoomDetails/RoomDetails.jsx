import { useLoaderData } from "react-router-dom";
import hotelBg from "../../assets/HotelBg2.jpg";

const RoomDetails = () => {
  const features = useLoaderData();
  const { type, image, adults, child, price } = features;
  return (
    <div>
      <div
        className="hero min-h-48"
        style={{
          backgroundImage: ` url(${hotelBg})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl text-white font-bold">{type}</h1>
          </div>
        </div>
      </div>
      <div className="w-2/3 ">
        <div className="flex justify-center relative -mb-12 ">
          <div className="card w-[700px] mt-10 bg-white shadow-xl">
            <div className="card-body s">
              <div className="flex justify-between">
                <div>
                  <h2 className="card-title text-2xl font-bold text-black">
                    {type}
                  </h2>
                  <div className="flex text-black gap-4">
                    <span>Adults:{adults}</span>
                    <span>Child:{child}</span>
                  </div>
                </div>
                <div className="">
                  <div className="text-3xl text-black font-bold">
                    ${price}.00
                  </div>
                  <div className="text-sm text-black">
                    +10.00% Tax /<span className="text-[#aa8453]"> Night</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center">
          <img
            className="w-[800px] h-[400px] border rounded-xl"
            src={image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
