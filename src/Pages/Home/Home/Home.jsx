import About from "../About/About";
import FeaturedRooms from "../About/FeaturedRoom/FeaturedRooms";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <FeaturedRooms></FeaturedRooms>
    </div>
  );
};

export default Home;
