import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary).map(
            ([day, timings], index) => {
              const dayNumber = day.replace("day", "Day ");
              return (
                <div key={index} className="mb-6">
                  <h3 className="font-medium text-lg">{dayNumber}</h3>

                  {/* Sort timings in the order of morning, afternoon, evening */}
                  {Object.entries(timings)
                    .sort((a, b) => {
                      const order = ["morning", "afternoon", "evening"];
                      return order.indexOf(a[0]) - order.indexOf(b[0]);
                    })
                    .map(([timeOfDay, placeDetails]) => (
                      <div
                        key={timeOfDay}
                        className="ml-4 mt-3 border rounded-xl p-3 shadow-lg "
                      >
                        <h4 className="font-semibold capitalize">
                          {timeOfDay}
                        </h4>
                        <p className="text-orange-600 italic">
                          {placeDetails.time}
                        </p>
                        <div className="flex md:flex-row flex-col">
                          <div className="w-full md:w-3/4 p-2">
                            <p className="font-bold">{placeDetails.place}</p>
                            <p className="text-gray-700">
                              {placeDetails.details}
                            </p>
                            <p className="text-gray-500 text-justify md:text-left">
                              Rating: {placeDetails.rating} ⭐
                            </p>
                            <p className="text-gray-500">
                              Ticket: {placeDetails.ticket_pricing}
                            </p>
                          </div>

                          {/* Optional: Display image if available */}
                          {/* {placeDetails.image_url && (
                          <img
                            src={placeDetails.image_url}
                            alt={placeDetails.place}
                            className="mt-2 w-full max-w-md object-cover rounded-lg"
                          />
                        )} */}
                          <div className="w-full md:w-1/4 p-2 flex justify-center items-center h-full">
                            <PlaceCardItem place={placeDetails} />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
