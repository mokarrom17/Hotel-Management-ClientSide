import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch("offers.json")
      .then((res) => res.json())
      .then((data) => setOffers(data));
  });

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mb-12 mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-white font-bold text-5xl">Special Offers</h2>
      </div>

      <div className="">
        <Slider {...settings}>
          {offers.map((offer) => (
            <div className="p-6" key={offer._id}>
              <div>
                <img
                  className=" h-[250px] w-full rounded-lg"
                  src={offer.img}
                  alt=""
                />
              </div>
              <div className="text-white divide-y pl-8">
                <h1 className="my-3">{offer.title}</h1>
                <p className="pt-3">{offer.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Offers;
