import About from "../About/About";
import FeaturedRooms from "../FeaturedRoom/FeaturedRooms";
import Banner from "../Banner/Banner";
import NewsLetter from "../NewsLetter/NewsLetter";
import Offers from "../Offers/Offers";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <FeaturedRooms></FeaturedRooms>
      <Offers></Offers>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default Home;
