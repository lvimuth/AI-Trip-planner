import React from "react";

function HotelOptions({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {console.log(trip?.tripData?.hotel_options)}
        {trip?.tripData?.hotel_options?.map((item, index) => (
          <div>
            <img src="/placeholder.png" alt="" className="rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelOptions;
