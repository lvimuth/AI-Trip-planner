import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";

function PlaceCardItem({ placeDetails }) {
  const [photoURL, setPhotoURL] = useState();
  useEffect(() => {
    GetPlacePhoto();
  }, [placeDetails.place]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: placeDetails.place,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      
      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoURL(photoURL);
    });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={photoURL ? photoURL : "/placeholder.png"}
        alt=""
        className="w-[130px] h-[130px] rounded-xl object-cover"
      />
    </div>
  );
}

export default PlaceCardItem;
