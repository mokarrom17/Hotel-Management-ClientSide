import { FaComputer } from "react-icons/fa6";
import { MdOutlinePreview } from "react-icons/md";
import { Link } from "react-router-dom";

const FeaturedRoom = ({ room }) => {
  const { image, type, price, description } = room;
  return (
    <div className="card rounded-none bg-white shadow-xl ">
      <img className="h-[200px] w-full " src={image} alt="" />
      <div className="card-body ">
        <Link className="card-title font-bold text-black ">{type}</Link>
        <h2 className="text-2xl font-semibold text-[#aa8453]">
          {price}.00USD/Night
        </h2>
        <p className="text-black">{description}</p>
        <div className="flex mx-auto  ">
          <Link className="btn btn-sm hover:bg-[] rounded-none btn-dark py-2 px-4 text-white">
            {" "}
            <FaComputer></FaComputer> Book Now
          </Link>
          <Link className="btn btn-sm bg-[#aa8453] rounded-none py-2 px-4 text-white">
            {" "}
            <MdOutlinePreview /> View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRoom;
