import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input.jsx";
import destinations from "../constants/countries.jsx"; // Import destinations array
import { SelectBudgetOptions, SelectTravelList } from "@/constants/options.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome component
import { Button } from "@/components/ui/button.jsx";

function CreateTrip() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({}); // Correctly initialize formData using useState
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  // Handle input change for destination search
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  // Handle option selection and update form data
  const handleOptionClick = (name, option) => {
    setFormData({
      ...formData,
      [name]: option, // Update only the relevant field in formData
    });
    if (name === "destination") {
      setSearchTerm(option); // Set the search term only for destination
      setIsDropdownOpen(false); // Close dropdown for destination
    }
    console.log(`Updated formData:`, formData);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false); // Close the dropdown if the click is outside of it
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter destinations based on the search term
  const filteredDestinations = destinations.filter((destination) =>
    destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to clear the input field and reset the dropdown
  const handleClearInput = () => {
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  // Generate trip and handle validation
  const OnGenerateTrip = () => {
    if (formData?.noOfDays > 5) {
      setErrorMessage("You cannot enter more than 5 days for this trip.");
      return;
    } else {
      setErrorMessage(""); // Clear the error if valid
      // Proceed with trip generation logic here
      console.log("Generating trip...");
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-30 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences ⛺🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {/* Destination Selection */}
        <div>
          <h2 className="text-l my-3 font-medium">
            What is your destination of choice?
          </h2>
          <div className="relative" ref={dropdownRef}>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 text-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500 h-15"
              placeholder="Start typing a destination..."
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => setIsDropdownOpen(true)} // Open dropdown when input is focused
            />
            {searchTerm && (
              <button
                className="absolute top-1 right-3 text-gray-500 hover:text-gray-700 hover:border-none bg-transparent"
                onClick={handleClearInput}
              >
                &#x2715; {/* This is the Unicode for the "cross" symbol */}
              </button>
            )}
            {isDropdownOpen && (
              <ul className="absolute z-10 w-full border border-gray-300 bg-white rounded-md mt-1 max-h-60 overflow-y-auto">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((destination, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        handleOptionClick("destination", destination)
                      }
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

        {/* Number of Days */}
        <div>
          <h2 className="text-l my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            min="1"
            max="365"
            className="w-full border-opacity-25 border-gray-500 rounded-md p-3 text-lg h-15 placeholder-opacity-20"
            onChange={(e) => handleOptionClick("noOfDays", e.target.value)} // Update noOfDays in formData
          />
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p> // Render error message below input in red
          )}
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-l my-3 font-medium">What is your budget?</h2>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick("budget", item.title)}
                className={`flex items-center mb-4 p-4 border rounded-lg hover:shadow-lg cursor-pointer
                  ${
                    formData.budget === item.title
                      ? "bg-gray-100 border-gray-500 shadow-lg" // Highlight selected item
                      : ""
                  }
                `}
              >
                {/* Render the icon properly using FontAwesomeIcon */}
                <FontAwesomeIcon icon={item.icon} className="mr-2 text-4xl" />
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers Selection */}
        <div>
          <h2 className="text-l my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick("traveller", item.people)}
                className={`flex items-center mb-4 p-4 border rounded-lg hover:shadow-lg cursor-pointer
                  ${
                    formData.traveller === item.people
                      ? "bg-gray-100 border-gray-500 shadow-lg" // Highlight selected item
                      : ""
                  }
                `}
              >
                {/* Render the icon properly using FontAwesomeIcon */}
                <FontAwesomeIcon icon={item.icon} className="mr-2 text-4xl" />
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="my-10 justify-end flex">
          <Button onClick={OnGenerateTrip}>Generate Trip</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
