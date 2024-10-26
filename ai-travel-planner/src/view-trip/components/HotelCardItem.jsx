import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

function HotelCardItem({ hotels }) {
  const [photoURLs, setPhotoURLs] = useState({});

  useEffect(() => {
    // Fetch photos for all hotels
    hotels && hotels.forEach((hotel) => GetPlacePhoto(hotel));
  }, [hotels]);

  // Fetch photo for a single hotel
  const GetPlacePhoto = async (hotel) => {
    const data = { textQuery: hotel.name };
    const result = await GetPlaceDetails(data).then((resp) => {
      const photoName = resp.data.places[0]?.photos[3]?.name;
      if (photoName) {
        const photoURL = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoURLs((prev) => ({ ...prev, [hotel.name]: photoURL }));
      }
    });
  };

  return (
    <div className="w-full p-4">
      {hotels.length > 4 ? (
        // Display as slider if more than 4 hotels
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {hotels.map((hotel, index) => (
            <SwiperSlide key={index}>
              <Link
                to={
                  "https://www.google.com/maps/search/?api=1&query=" +
                  hotel.name +
                  "," +
                  hotel.address
                }
                target="_blank"
              >
                <div className="hover:scale-105 transition-all cursor-pointer">
                  <img
                    src={photoURLs[hotel.name] || "/placeholder.png"}
                    alt=""
                    className="rounded-xl"
                  />
                  <div className="my-2 flex flex-col gap-1">
                    <h2 className="font-md">{hotel.name}</h2>
                    <h2 className="text-xs text-gray-500">
                      🗺️ {hotel.address}
                    </h2>
                    <h2 className="text-sm">💵 {hotel.price}</h2>
                    <h2 className="text-sm">⭐ {hotel.rating}</h2>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Display as grid if 4 or fewer hotels
        <div
          className={`grid gap-5 ${
            hotels.length === 1
              ? "grid-cols-1 justify-center"
              : hotels.length === 2
              ? "grid-cols-2"
              : hotels.length === 3
              ? "grid-cols-3"
              : "grid-cols-4"
          }`}
        >
          {hotels.map((hotel, index) => (
            <Link
              key={index}
              to={
                "https://www.google.com/maps/search/?api=1&query=" +
                hotel.name +
                "," +
                hotel.address
              }
              target="_blank"
            >
              <div className="hover:scale-105 transition-all cursor-pointer">
                <img
                  src={photoURLs[hotel.name] || "/placeholder.png"}
                  alt=""
                  className="rounded-xl"
                />
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
      )}
    </div>
  );
}

export default HotelCardItem;
