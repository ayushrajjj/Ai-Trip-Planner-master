import React, { useState, useEffect } from "react";

function CityAutocomplete({ place, onChange }) {
  const [inputValue, setInputValue] = useState(place || ""); // Ensure input value updates correctly
  const [options, setOptions] = useState([]);

  // Fetch city suggestions from OpenStreetMap
  const fetchCities = async (query) => {
    if (query.length < 3) return; // Only fetch after 3 characters
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1`
      );
      const data = await response.json();

      const cityOptions = data
        .filter((item) => item.address.city || item.address.town || item.address.village) // Ensure we get valid city names
        .map((item) => ({
          label: `${item.address.city || item.address.town || item.address.village}, ${item.address.state}`,
          value: `${item.address.city || item.address.town || item.address.village}, ${item.address.state}`,
        }));

      setOptions(cityOptions);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  return (
    <div className="relative mt-6"> {/* Adjusted spacing */}
      {/* Input Field */}
      <input
        type="text"
        className="flex h-12 w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter a city..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          fetchCities(e.target.value);
        }}
      />

      {/* Dropdown for suggestions */}
      {options.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setInputValue(option.label);
                onChange(option.label);
                setOptions([]); // Hide dropdown
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {/* Clear Input Button */}
      {inputValue && (
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          onClick={() => {
            setInputValue(""); // Clear input
            onChange(""); // Clear selected place in parent
          }}
        >
          ✖
        </button>
      )}
    </div>
  );
}

export default CityAutocomplete;