import { Button } from "@/components/ui/button.jsx";
import React from "react";
import { FaShare } from "react-icons/fa";

function InfomationSection({ trip }) {
  return (
    <div>
      <img
        src="/placeholder.png"
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
