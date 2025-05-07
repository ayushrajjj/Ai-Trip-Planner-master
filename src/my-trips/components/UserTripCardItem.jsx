import { useEffect, useState } from "react";

function UserTripCardItem({ trip }) { // Destructure the trip prop
  // Debugging logs to inspect the trip data
  console.log("UserTripCardItem trip data:", trip);

  const [photoUrl, setPhotoUrl] = useState("/default-photo.jpg"); // Default image URL

  useEffect(() => {
    async function GetPlacePhoto() {
      try {
        // Assuming `trip?.userSelection?.location` is used to fetch the photo
        const location = trip?.userSelection?.location;
        if (location) {
          const fetchedPhoto = await fetchPlaceImage(location); // Replace with your actual API call
          console.log(`Fetched photo for location ${location}:`, fetchedPhoto);
          setPhotoUrl(fetchedPhoto || "/default-photo.jpg"); // Fallback to default image
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
        setPhotoUrl("/default-photo.jpg"); // Fallback to default image on error
      }
    }

    if (trip?.userSelection?.location) {
      GetPlacePhoto();
    }
  }, [trip?.userSelection?.location]); // Dependency array updated to track location changes

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg">
      <div>
        <img
          src={photoUrl}
          className="object-cover rounded-xl w-full h-40"
          alt={trip?.userSelection?.location || "Trip Image"}
        />
        <div className="mt-4">
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location || "No location available"}
          </h2>
          <p className="text-gray-500">
            Traveler: {trip?.userSelection?.traveler || "Not specified"}
          </p>
          <p className="text-gray-500">
            Budget: {trip?.userSelection?.budget || "Not specified"}
          </p>
          <p className="text-gray-500">
            Number of Days: {trip?.userSelection?.noOfdays || "Not specified"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserTripCardItem;