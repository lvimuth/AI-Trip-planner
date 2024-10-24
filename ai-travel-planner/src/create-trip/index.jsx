import React, { useState } from "react";
import destinations from "../constants/countries.jsx";

function CreateTrip() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");


  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchTerm(option); // Update the input field with the selected option
    setIsDropdownOpen(false);
  };

  // Filter destinations based on the search term
  const filteredDestinations = destinations.filter((destination) =>
    destination.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-60 px-5 mt-10">
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
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 text-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Start typing a destination..."
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => setIsDropdownOpen(true)} // Open dropdown when input is focused
            />
            {isDropdownOpen && (
              <ul className="absolute z-10 w-full border border-gray-300 bg-white rounded-md mt-1 max-h-60 overflow-y-auto">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((destination, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(destination)}
                      className="p-3 cursor-pointer hover:bg-gray-100"
                    >
                      {destination}
                    </li>
                  ))
                ) : (
                  <li className="p-3 text-gray-500">No destinations found</li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
