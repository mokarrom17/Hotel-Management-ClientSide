import { useEffect, useState } from "react";
import FeaturedRoom from "./FeaturedRoom";

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/features")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);
  return (
    <div className="mb-12">
      <div className="text-center">
        <h2 className="font-bold text-5xl mb-4">Featured Room</h2>
        <p className="text-2xl">
          Every room type has many rooms. Anyone can send booking requrest from
          this site.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-6">
        {rooms.map((room) => (
          <FeaturedRoom key={room._id} room={room}></FeaturedRoom>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
