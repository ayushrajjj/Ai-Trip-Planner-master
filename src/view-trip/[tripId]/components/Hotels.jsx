import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPlaceImage } from "../../../service/GloablApi"; // Ensure this import path is correct

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotels || [];
  const [hotelImages, setHotelImages] = useState({});

  useEffect(() => {
    async function fetchImages() {
      const newImages = {};

      for (const hotel of hotels) {
        const hotelName = hotel?.hotelName;
        if (hotelName) {
          try {
            const image = await fetchPlaceImage(hotelName);
            console.log(`Fetched image for ${hotelName}:`, image); // Debugging log
            newImages[hotelName] = image || "/airplane.jpeg"; // Fallback to default image
          } catch (error) {
            console.error(`Error fetching image for ${hotelName}:`, error);
            newImages[hotelName] = "/airplane.jpeg"; // Fallback to default image
          }
        }
      }

      console.log("Final hotel images:", newImages); // Debugging log
      setHotelImages(newImages);
    }

    if (hotels.length > 0) {
      fetchImages();
    }
  }, [hotels]); // Correct dependency array

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="font-bold text-xl mt-5">Hotels Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {hotels.map((item, index) => (
          <Link
            target="_blank"
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              item?.hotelName + ", " + item?.hotelAddress
            )}`}
            className="hover:scale-105 transition-all cursor-pointer"
            key={index}
          >
            <div className="border rounded-lg shadow-md hover:shadow-lg">
              <img
                src={hotelImages[item?.hotelName] || item?.imageUrl || "/airplane.jpeg"}
                className="w-full h-48 object-cover rounded-t-lg"
                alt={item?.hotelName || "Hotel"}
              />
              <div className="p-4">
                <h2 className="font-medium text-lg">{item?.hotelName}</h2>
                <h2 className="text-xs text-gray-500">📍 {item?.hotelAddress}</h2>
                <h2 className="text-sm text-gray-700 mt-2">💰 Price: ₹{item?.price}</h2>
                <h2 className="text-sm text-gray-700 mt-2">⭐ Rating: {item?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import PropTypes from "prop-types";

Hotels.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      hotels: PropTypes.arrayOf(
        PropTypes.shape({
          hotelName: PropTypes.string,
          hotelAddress: PropTypes.string,
          price: PropTypes.number,
          rating: PropTypes.number,
          imageUrl: PropTypes.string,
        })
      ),
    }),
  }),
};

export default Hotels;
