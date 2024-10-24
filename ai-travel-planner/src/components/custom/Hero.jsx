import React from "react";
import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h2 className="font-extrabold text-[40px] text-center mt-40">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI :
        </span>
        <br /> Personalized Itineraties at Your FingerTrips
      </h2>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel creator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Button className="">Get Started</Button>
    </div>
  );
}

export default Hero;
