import { Button } from "@/components/ui/button.jsx";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { FaShare } from "react-icons/fa";

function InfomationSection({ trip }) {
  const [photoURL, setPhotoURL] = useState();
  useEffect(() => {
    GetPlacePhoto();
  }, [trip]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.destination,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);
      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoURL(photoURL);
    });
  };
  return (
    <div>
      <img
        src={photoURL ? photoURL : "/placeholder.png"}
        alt=""
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.destination}
          </h2>
          <div className="flex gap-5 :flex-col">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🗓️
              {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰
              {trip?.userSelection?.budget} budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              👫 No of Traveller {trip?.userSelection?.traveller}
            </h2>
          </div>
        </div>
        <Button>
          <FaShare />
        </Button>
      </div>
    </div>
  );
}

export default InfomationSection;
