import React from "react";

function InfomationSection({trip}) {
  return (
    <div>
      <img
        src="/placeholder.png"
        alt=""
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">{trip?.userSelection?.destination}</h2>
      </div>
    </div>
  );
}

export default InfomationSection;
