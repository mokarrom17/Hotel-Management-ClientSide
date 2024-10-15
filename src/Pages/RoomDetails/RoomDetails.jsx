import { useLoaderData } from "react-router-dom";

const RoomDetails = () => {
  const features = useLoaderData();
  const { type } = features;
  return (
    <div>
      <h2>Room Details:{type} </h2>
    </div>
  );
};

export default RoomDetails;
