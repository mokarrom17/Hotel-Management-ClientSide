import About from "../About/About";
import FeaturedRooms from "../FeaturedRoom/FeaturedRooms";
import Banner from "../Banner/Banner";
import NewsLetter from "../NewsLetter/NewsLetter";
import Offers from "../Offers/Offers";
import ClientReviews from "../ClientReviews/ClientReviews";
import Faq from "../Faq/Faq";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <FeaturedRooms></FeaturedRooms>
      <Offers></Offers>
      <Faq></Faq>
      <ClientReviews></ClientReviews>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default Home;
