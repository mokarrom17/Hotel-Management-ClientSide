import { useLoaderData } from "react-router-dom";
import hotelBg from "../../assets/HotelBg2.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsDoorClosed, BsDoorOpen } from "react-icons/bs";
import { RiCheckDoubleFill } from "react-icons/ri";
import {
  FiDroplet,
  FiMonitor,
  FiRefreshCw,
  FiWifi,
  FiWind,
} from "react-icons/fi";
import { FaSwimmingPool } from "react-icons/fa";
import { FaAccessibleIcon } from "react-icons/fa6";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Providers/AuthProvider";

const RoomDetails = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const { user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const checkIn = form.checkIn.value;
    const checkOut = form.checkOut.value;
    const roomNumber = form.rooms.value;
    const name = form.name.value;
    const email = user?.email;
    const phone = form.phone.value;
    const booking = {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      checkIn: checkIn,
      checkOut: checkOut,
      roomNumber: roomNumber,
      type: type,
    };
    console.log(booking);
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Booking successful!");
        }
      })
      .catch((error) => {
        toast.error("Booking failed. Please try again.");
      });
  };

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
    beds,
    gallery,
  } = features;

  const [mainImage, setMainImage] = useState(image);
  const [smallImage, setSmallImage] = useState(gallery.slice(0, 3));
  // Handle swapping images
  const handleImageClick = (selectedImage) => {
    const updateImage = smallImage.filter((img) => img !== selectedImage);
    updateImage.unshift(mainImage);
    setMainImage(selectedImage);
    setSmallImage(updateImage);
  };

  //Function to Determine Which icon to display for each amenity
  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
      case "free wifi":
        return <FiWifi className="text-blue-500" />;
      case "TV":
        return <FiMonitor className="text-green-500" />;
      case "AC":
      case "air conditioning":
        return <FiWind className="text-purple-500" />;
      case "whirlpool tub":
        return <FiDroplet className="text-teal-500" />;
      case "connecting rooms":
        return <BsDoorOpen className="text-orange-500" />;
      case "POOL":
      case "swimming pool":
        return <FaSwimmingPool className="text-blue-400" />;
      case "Washing Machine":
        return <FiRefreshCw className="text-gray-500" />;
      case "accessible bathroom":
        return <FaAccessibleIcon className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ToastContainer />
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
      <div className="flex bg-white">
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
                      +10.00% Tax /
                      <span className="text-[#aa8453]"> Night</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-center">
            <img
              className="w-[800px] h-[400px] border rounded-xl"
              src={mainImage}
              alt=""
            />
          </div>
          {/* Gallery Section */}
          <div className="flex justify-center mt-4 space-x-4">
            {smallImage.map((smallImage, index) => (
              <img
                key={index}
                src={smallImage}
                alt={`small ${index}`}
                className="w-30 h-24 object-cover border rounded-md cursor-pointer hover:scale-105 transform transition"
                onClick={() => handleImageClick(smallImage)}
              />
            ))}
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
                <h2 className="card-title">Cancellation Policy</h2>
                <p className="text-xl font-medium flex gap-2">
                  <RiCheckDoubleFill className="text-2xl"></RiCheckDoubleFill>{" "}
                  {cancellationPolicy}
                </p>
              </div>
            </div>
          </div>
          {/* Amenities */}
          <div className="flex justify-center mt-6 shadow-md">
            <div className="card bg-white w-[800px] shadow-xl">
              <div className="card-body text-black divide-y-2">
                <h2 className="card-title">Amenities</h2>
                <div className="flex flex-wrap gap-3">
                  {amenities.map((amenity, index) => (
                    <div className="flex items-center gap-2  px-3 py-1">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Beds */}
          <div className="flex justify-center mt-6 shadow-md">
            <div className="card bg-white w-[800px] shadow-xl">
              <div className="card-body text-black divide-y-2">
                <h2 className="card-title ">Beds</h2>
                <p className="text-xl font-medium flex gap-2">
                  <RiCheckDoubleFill className="text-2xl"></RiCheckDoubleFill>{" "}
                  {beds}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 mt-16 mx-auto">
          <form
            onSubmit={handleBooking}
            className="border-2 p-10 rounded-lg shadow-md mx-10"
          >
            <div className="mb-4 flex flex-col space-y-2 text-black font-medium">
              <label>Check In</label>
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                name="checkIn"
                className="input input-bordered w-full focus:border-[#aa8453] focus:ring-0 text-black bg-white"
                required
                minDate={new Date()}
              />
            </div>
            <div className="mb-4 flex flex-col space-y-2 text-black font-medium">
              <label>Check Out</label>
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                name="checkOut"
                className="input input-bordered focus:border-[#aa8453] focus:ring-0 w-full text-black bg-white"
                required
                minDate={
                  checkInDate
                    ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                    : new Date()
                }
              />
            </div>
            <div className="mb-4 flex flex-col space-y-2 text-black  font-medium">
              <label>Name</label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                placeholder="Enter Your full name"
                className="input input-bordered focus:border-[#aa8453] focus:ring-0  w-full max-w-xs text-black bg-white"
              />
            </div>
            <div className="mb-4 flex flex-col space-y-2 text-black font-medium">
              <label>Email</label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                placeholder="Enter Your email address"
                className="input input-bordered focus:border-[#aa8453] focus:ring-0  w-full max-w-xs bg-white"
              />
            </div>
            <div className="mb-4 flex flex-col space-y-2 text-black font-medium">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter Your phone number"
                className="input input-bordered focus:border-[#aa8453] focus:ring-0  w-full max-w-xs bg-white"
              />
            </div>
            <div className="flex flex-col space-y-2 mb-6">
              <label className="font-medium focus:border-[#aa8453] focus:ring-0 text-black">
                Rooms
              </label>
              <input
                type="number"
                id="rooms"
                name="rooms"
                placeholder="Number of Rooms"
                min="1"
                className=" block input-bordered focus:border-[#aa8453] focus:ring-0 w-full px-5 py-3 text-black bg-white input rounded-md font-medium "
              />
            </div>
            <button className="btn btn-wide hover:bg-[#aa8453] border-white bg-white text-black">
              SEND BOOKING REQUEST
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
