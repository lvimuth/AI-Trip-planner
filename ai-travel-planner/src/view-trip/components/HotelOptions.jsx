import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import HotelCardItem from "./HotelCardItem";

function HotelOptions({ trip }) {
  const hotels = trip?.tripData?.hotel_options || [];
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <HotelCardItem hotels={hotels} />
    </div>
  );
}

export default HotelOptions;
