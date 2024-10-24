import React from "react";

function CreateTrip() {
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary bsaed on your preferences.
      </p>
      <div>
        <div className="mt-10">
          <h2 className="text-l my-3 font-medium">
            What is your destination of choice?
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
