
import React from "react";


function PlaceCardItem({ placeDetails }) {
  {
    console.log(placeDetails);
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="/placeholder.png"
        alt=""
        className="w-[130px] h-[130px] rounded-xl"
      />

      {/* Optional: Display image if available */}
      {/* {placeDetails.image_url && (
                          <img
                            src={placeDetails.image_url}
                            alt={placeDetails.place}
                            className="mt-2 w-full max-w-md object-cover rounded-lg"
                          />
                        )} */}
      
    </div>
  );
}

export default PlaceCardItem;
