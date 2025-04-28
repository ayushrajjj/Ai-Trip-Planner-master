// PlacesToVisit.jsx

import { useEffect, useState, useCallback } from "react";
import { fetchPlaceImage } from "../../../service/GloablApi.jsx"; // Import the API service

// eslint-disable-next-line react/prop-types
function PlacesToVisit({ trip }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps, react/prop-types
  const itinerary = trip?.tripData?.itinerary || {}; // Extract itinerary from trip data
  const [images, setImages] = useState({}); // State to store the images for each place

  const fetchImages = useCallback(async () => {
    const newImages = {}; // Object to store images for each place
    // Loop through itinerary and fetch images for each place
    for (const [day, details] of Object.entries(itinerary)) {
      for (const timeOfDay of ["morning", "afternoon", "evening"]) {
        const plan = details[timeOfDay];
        if (plan && plan.placeName) {
          // Fetch image for each place
          const image = await fetchPlaceImage(plan.placeName);
          newImages[`${day}-${timeOfDay}`] = image;
        }
      }
    }
    setImages(newImages); // Update state with the fetched images
  }, [itinerary]); // Memoize the function to avoid redefinition on every render

  useEffect(() => {
    fetchImages(); // Call the memoized function
  }, [fetchImages]); // Dependency array includes only the memoized function

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <h2 className="font-bold text-2xl mb-5">Places To Visit</h2>

      <div className="space-y-5">
        {Object.entries(itinerary)
          .sort(([dayA], [dayB]) => {
            const numA = parseInt(dayA.replace(/\D/g, ""));
            const numB = parseInt(dayB.replace(/\D/g, ""));
            return numA - numB;
          })
          .map(([day, details], index) => (
            <div key={index} className="p-5 border rounded-lg shadow-md hover:shadow-lg">
              <h3 className="font-medium text-lg mb-3">
                {day.toUpperCase()} - {details?.theme}
              </h3>
              <div className="space-y-5">
                {["morning", "afternoon", "evening"].map((timeOfDay) => {
                  const plan = details[timeOfDay];
                  if (!plan) return null; // Skip if no plan for this time of day
                  const image = images[`${day}-${timeOfDay}`]; // Get the image for this time of day
                  return (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plan.placeName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={timeOfDay}
                      className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-md mb-2 capitalize">
                          {timeOfDay}: {plan.placeName}
                        </h4>
                        <p className="text-sm text-gray-500">{plan.placeDetails}</p>
                        <p className="text-sm text-gray-500">
                          Best Time to Visit: {plan.bestTimeToVisit}
                        </p>
                        <p className="text-sm text-gray-500">
                          Ticket Pricing: {plan.ticketPricing}
                        </p>
                        <p className="text-sm text-gray-500">
                          Travel Time: {plan.timeToTravelFromPreviousLocation || plan.timeToTravelFromHotel}
                        </p>
                      </div>
                      {image ? (
                        <img
                          src={image}
                          alt={plan.placeName}
                          className="w-40 h-40 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-40 h-40 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                          No image available
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
