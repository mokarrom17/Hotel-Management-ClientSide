import { useLoaderData } from "react-router-dom";
import hotelBg from "../../assets/HotelBg2.jpg";
import { BsDoorClosed, BsDoorOpen } from "react-icons/bs";
import { RiCheckDoubleFill } from "react-icons/ri";

const RoomDetails = () => {
  const features = useLoaderData();
  const {
    type,
    image,
    adults,
    child,
    price,
    description,
    checkInTime,
    checkOutTime,
    cancellationPolicy,
    amenities,
  } = features;
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
                  <div className="text-3xl text-[#aa8453] font-bold">
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
        <div className="flex justify-center mt-6 shadow-md">
          <div className="card bg-white w-[800px] shadow-xl">
            <div className="card-body text-black divide-y-2">
              <h2 className="card-title">Description</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
        {/*  Check-In Time & Checkout Time*/}
        <div className="flex justify-center mt-6 shadow-md">
          <div className="card bg-white w-[800px] shadow-xl">
            <div className="card-body text-black divide-y-2">
              <h2 className="card-title">Check-In Time & Checkout Time</h2>
              <div className="flex">
                <p className="flex gap-2">
                  <BsDoorClosed className="text-xl"></BsDoorClosed> Check-In
                  Time:{checkInTime}
                </p>
                <p className="flex gap-2">
                  <BsDoorOpen className="text-xl"></BsDoorOpen> Checkout Time:
                  {checkOutTime}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Cancellation Policy */}
        <div className="flex justify-center mt-6 shadow-md">
          <div className="card bg-white w-[800px] shadow-xl">
            <div className="card-body text-black divide-y-2">
              <h2 className="card-title text-2xl">Cancellation Policy</h2>
              <p className="text-xl font-medium flex gap-2">
                <RiCheckDoubleFill className="text-2xl"></RiCheckDoubleFill>{" "}
                {cancellationPolicy}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6 shadow-md">
          <div className="card bg-white w-[800px] shadow-xl">
            <div className="card-body text-black divide-y-2">
              <h2 className="card-title">Amenities</h2>
              <div className="gap-4">
                <p>{amenities}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
