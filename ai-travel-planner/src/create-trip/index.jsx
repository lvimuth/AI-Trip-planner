import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input.jsx";
import destinations from "../constants/countries.jsx"; // Import destinations array
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome component
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({}); // Correctly initialize formData using useState
  const [daysErrorMessage, setDaysErrorMessage] = useState("");
  const [destinationErrorMessage, setDestinationErrorMessage] = useState("");
  const [budgetErrorMessage, setBudgetErrorMessage] = useState("");
  const [travellersErrorMessage, setTravellersErrorMessage] = useState(""); // New state for error message
  const dropdownRef = useRef(null); // Create a ref for the dropdown
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (err) => console.log(err),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  const saveAITrip = async (tripData) => {
    setLoading(true);
    const docID = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));

    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user.email,
      id: docID,
    });
    setLoading(false);
    navigate("/view-trip/" + docID);
  };
  // Generate trip and handle validation
  const OnGenerateTrip = async () => {
    if (formData?.noOfDays > 5) {
      setDaysErrorMessage("You cannot enter more than 5 days for this trip.");
      toast("You cannot enter more than 5 days for this trip..");
      setBudgetErrorMessage("");
      setDestinationErrorMessage("");
      setTravellersErrorMessage("");
      return;
    } else if (!formData?.destination) {
      setDestinationErrorMessage("Please select a destination.");
      toast("Please select a destination");
      setDaysErrorMessage("");
      setBudgetErrorMessage("");
      setTravellersErrorMessage("");
      return;
    } else if (!formData?.noOfDays) {
      setDaysErrorMessage("Please enter the number of days for this trip.");
      toast("Please enter the number of days for this trip.");
      setBudgetErrorMessage("");
      setDestinationErrorMessage("");
      setTravellersErrorMessage("");
      return;
    } else if (!formData?.budget) {
      setBudgetErrorMessage("Please select a budget.");
      toast("Please select a budget.");
      setDaysErrorMessage("");
      setDestinationErrorMessage("");
      setTravellersErrorMessage("");
      return;
    } else if (!formData?.traveller) {
      setTravellersErrorMessage("Please select the number of travellers.");
      toast("Please select the number of travellers.");
      setDaysErrorMessage("");
      setBudgetErrorMessage("");
      setDestinationErrorMessage("");
      return;
    } else {
      setDaysErrorMessage("");
      setBudgetErrorMessage("");
      setDestinationErrorMessage("");
      setTravellersErrorMessage("");
      // Clear the error if valid
      // Proceed with trip generation logic here
      console.log("Generating trip...");
    }

    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    setLoading(true);
    const finalPrompt = AI_PROMPT.replace("{destination}", formData.destination)
      .replace("{noOfDays}", formData.noOfDays)
      .replace("{budget}", formData.budget)
      .replace("{traveller}", formData.traveller)
      .replace("{noOfDays}", formData.noOfDays);

    const result = await chatSession.sendMessage(finalPrompt);
    console.log(result?.response?.text());
    setLoading(false);
    saveAITrip(result?.response?.text());
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
          {destinationErrorMessage && (
            <p className="text-red-500 mt-2">{destinationErrorMessage}</p> // Render error message below input in red
          )}
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
          {daysErrorMessage && (
            <p className="text-red-500 mt-2">{daysErrorMessage}</p> // Render error message below input in red
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
          {budgetErrorMessage && (
            <p className="text-red-500 mt-2">{budgetErrorMessage}</p> // Render error message below input in red
          )}
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
          {travellersErrorMessage && (
            <p className="text-red-500 mt-2">{travellersErrorMessage}</p> // Render error message below input in red
          )}
        </div>

        {/* Submit Button */}
        <div className="my-10 justify-end flex">
          <Button disabled={loading} onClick={OnGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <DialogTitle>SignIn</DialogTitle>
                <img src="/logo.svg" alt="" />
                <h2 className="font-bold text-lg mt-7">SignIn with Google</h2>
                <p>SignIn with Google Authentication to the app securely</p>
                <Button
                  onClick={googleLogin}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="h-9 w-9" />
                  SignIn With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
