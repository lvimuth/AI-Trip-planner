import React, { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import { Link } from "react-router-dom";

function UserTripCardItems({ trip }) {
  const [photoURL, setPhotoURL] = useState();
  useEffect(() => {
    GetPlacePhoto();
  }, [trip]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.destination,
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
    <Link to={"/view-trip/" + trip.id}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoURL ? photoURL : "/placeholder.png"}
          className="object-cover rounded-xl w-full h-20"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip.userSelection.destination}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip.userSelection.noOfDays} Days trip with{" "}
            {trip.userSelection.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItems;
