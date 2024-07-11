import About from "../About/About";
import FeaturedRooms from "../FeaturedRoom/FeaturedRooms";
import Banner from "../Banner/Banner";
import NewsLetter from "../NewsLetter/NewsLetter";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <FeaturedRooms></FeaturedRooms>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default Home;
