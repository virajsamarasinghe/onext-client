import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const SimpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        textAlign: "center",
        lineHeight: "40px",
        color: "white",
        fontSize: "18px",
      }}
      onClick={onClick}
      aria-label="Next Slide"
    >
      <FaAngleRight />
    </div>
  );
};

const SimplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        textAlign: "center",
        lineHeight: "40px",
        color: "white",
        fontSize: "18px",
      }}
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <FaAngleLeft />
    </div>
  );
};

const SpecialRoles = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);
  const [autoScrollDirection, setAutoScrollDirection] = useState("next");

  useEffect(() => {
    fetch("https://onext-server1.onrender.com/menu")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setRecipes(specials);
      })
      .catch((error) => {
        console.error("Error fetching the menu data:", error);
      });
  }, []);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (autoScrollDirection === "next") {
        slider.current.slickNext();
      } else {
        slider.current.slickPrev();
      }

      setAutoScrollDirection((prevDirection) =>
        prevDirection === "next" ? "prev" : "next"
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoScroll);
  }, [autoScrollDirection]);

  const settings = {
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
    nextArrow: <SimpleNextArrow />,
    prevArrow: <SimplePrevArrow />,
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Fashion Collections</p>
        <h2 className="title md:w-[520px]">
          Standout Special Fashion Collections From Our Store
        </h2>
      </div>

      {/* Arrow buttons for slider */}
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button
          onClick={() => slider.current.slickPrev()}
          className="btn p-2 rounded-full ml-5"
          aria-label="Previous Slide"
        >
          <FaAngleLeft className="w-8 h-8 p-1" />
        </button>
        <button
          onClick={() => slider.current.slickNext()}
          className="btn p-2 rounded-full ml-5 bg-pink"
          aria-label="Next Slide"
        >
          <FaAngleRight className="w-8 h-8 p-1" />
        </button>
      </div>

      <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
        {recipes.map((item) => (
          <Cards key={item._id} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default SpecialRoles;
