import React from "react";
import { Link } from "react-router-dom";

function HotelOptions({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {console.log(trip?.tripData?.hotel_options)}
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <Link
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotel.name +
              "," +
              hotel?.address
            }
            target="_blank"
          >
            <div className="hover:scale-105 transition-all cursor-pointer">
              <img src="/placeholder.png" alt="" className="rounded-xl" />
              <div className="my-2 flex flex-col gap-1">
                <h2 className="font-md">{hotel.name}</h2>
                <h2 className="text-xs text-gray-500">🗺️ {hotel.address}</h2>
                <h2 className="text-sm">💵 {hotel.price}</h2>
                <h2 className="text-sm">⭐ {hotel.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HotelOptions;
