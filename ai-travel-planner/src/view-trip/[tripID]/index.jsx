import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ViewTrip() {
  const { tripID } = useParams();
  const [trip, setTrips] = useState();

  useEffect(() => {
    tripID && getTripData();
  }, [tripID]);

  // Fetch trip data from API using tripID and render it.
  const getTripData = async () => {
    const docRef = doc(db, "AITrips", tripID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTrips(docSnap.data());
      console.log("Document: ", docSnap.data());
    } else {
      console.log("No such document!");
      toast("No trip data found!");
    }
  };

  return <div>ViewTrip;{tripID}</div>;
}

export default ViewTrip;
