import { useEffect } from "react";
import img1 from "../../../assets/image-1.jpg";
import img2 from "../../../assets/image-2.jpg";
import img3 from "../../../assets/image-3.jpg";
import img4 from "../../../assets/image-4.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
const About = () => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div className="max-w-7xl mx-auto p-4 md:m-12 ">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div
          className="grid grid-cols-2 gap-5 lg:w-1/2 mb-8 lg:mb-0"
          data-aos="fade-right"
        >
          <img src={img1} className="rounded-lg h-[300px] w-[300px]" />
          <img src={img2} className="rounded-lg h-[300px] w-[300px]" />
          <img src={img3} className="rounded-lg h-[300px] w-[300px]" />
          <img src={img4} className="rounded-lg h-[300px] w-[300px]" />
        </div>
        <div className=" ml-12 lg:w-1/2" data-aos="fade-left">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Welcome and Relax at Our Hotel
          </h2>
          <h2 className="text-xl md:text-2xl mb-4">
            Maecenas nec odio et ante tincidunt tempus. Donec vitae apitlibero
            venenatis faucibus. Nullam quis ante. Etiam sit amet orci
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum
            rutrum nuncnc nonummy metus. Vestibulum volutpat pretium libero.
            Cras id dui. Aenean ueros nisl sagittis vestibulum. Nullam nulla
            eros, ultricies sit amet nonummy id, imperdiet ugiat pede. Sed
            lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo
            plentesque facilisis. Etiam imperdiet imperdiet orci.
            <br />
            Nunc nec neque. posuere ut, mauris. Praesent adipiscing. Phasellus
            ullamcorper ipsum rutrum nuncnc nonummy metus. Vestibulum volutpat
            pretium libero. Cras id dui. Aenean ueros nisl sagittis ve posuere
            ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum
            nuncnc nonummy metus. Vestibulum volutpat pretium libero. Cras id
            dui. Aenean ueros nisl sagittis vestibulum. Nullam nulla eros,
            ultricies sit amet nonummy id, imperdiet ugiat pede. Sed lectus.
            Donec mollis hendrerit risus. Phasellus nec sem in justo plentesque
            facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
