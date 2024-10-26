import { Button } from "@/components/ui/button";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";

function PlaceCardItem({ placeDetails }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="/placeholder.png"
        alt=""
        className="w-[130px] h-[130px] rounded-xl"
      />
      <Button>
        <FaMapLocationDot />
      </Button>
    </div>
  );
}

export default PlaceCardItem;
