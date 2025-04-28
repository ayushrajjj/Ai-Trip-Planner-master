import React, { useEffect, useState } from 'react';
import { Button } from "../../../components/ui/button";
import { IoMdSend } from "react-icons/io";
import { fetchPlaceImage } from "../../../service/GloablApi"; // Import the API service for fetching images

function InfoSection({ trip }) {
  const [locationImage, setLocationImage] = useState(null); // State to store the location image
  const location = trip?.userSelection?.location; // Extract location from trip data

  useEffect(() => {
    const fetchLocationImage = async () => {
      if (location) {
        const image = await fetchPlaceImage(location);
        setLocationImage(image); // Set the fetched image for the location
      }
    };

    fetchLocationImage(); // Call function to fetch image when location changes
  }, [location]); // Dependency array to re-run when location changes

  return (
    <div>
      <img
        src={locationImage || '/airplane.jpeg'} // Use dynamic image or fallback to default
        className='h-[340px] w-full object-cover rounded-xl'
        alt={location || 'Airplane'}
      />
      <div className="flex justify-between items-center">
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{location}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text:xs md:text-md'>
              📅 {trip?.userSelection?.noOfdays} Days
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text:xs md:text-md'>
              💰 Budget: {trip?.userSelection?.budget}
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 sm:text:xs md:text-md'>
              🧑‍🤝‍🧑 Travellers: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button>
          <IoMdSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
