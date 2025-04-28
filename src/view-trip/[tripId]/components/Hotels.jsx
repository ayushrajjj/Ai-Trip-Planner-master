import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPlaceImage } from "../../../service/GloablApi"; // Import the API service for fetching images

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotels || [];
  const [hotelImages, setHotelImages] = useState({}); // Store images for each hotel

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {}; // Object to store hotel images

      // Loop through hotels and fetch images for each hotel
      for (const hotel of hotels) {
        const hotelName = hotel?.hotelName;

        if (hotelName) {
          // Fetch image for the hotel using fetchPlaceImage or a similar function
          const image = await fetchPlaceImage(hotelName);
          newImages[hotelName] = image; // Save the fetched image for the hotel
        }
      }

      setHotelImages(newImages); // Update state with the fetched images
    };

    if (hotels.length > 0) {
      fetchImages(); // Call function to fetch images
    }
  }, [hotels]); // Dependency array to re-run when hotels list changes

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="font-bold text-xl mt-5">Hotels Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {hotels.map((item, index) => (
          <Link
            target="_blank"
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              item?.hotelName +
              ", " +
              item?.hotelAddress
            }
            className="hover:scale-105 transition-all cursor-pointer"
            key={index}
          >
            <div className="border rounded-lg shadow-md hover:shadow-lg">
              {/* Hotel image with a fixed height */}
              <img
                src={hotelImages[item?.hotelName] || item?.imageUrl || "/airplane.jpeg"} // Use dynamic image or fallback
                className="w-full h-48 object-cover rounded-t-lg"
                alt={item?.hotelName || "Hotel"}
              />
              <div className="p-4">
                {/* Hotel Name */}
                <h2 className="font-medium text-lg">{item?.hotelName}</h2>
                {/* Hotel Address */}
                <h2 className="text-xs text-gray-500">📍 {item?.hotelAddress}</h2>
                {/* Price */}
                <h2 className="text-sm text-gray-700 mt-2">💰 Price: ₹{item?.price}</h2>
                {/* Rating */}
                <h2 className="text-sm text-gray-700 mt-2">⭐ Rating: {item?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
