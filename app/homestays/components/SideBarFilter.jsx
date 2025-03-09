"use client";
import { Filter } from "lucide-react";
import React, { useState } from "react";

const SideBarFilter = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
    propertyType: "all",
  });
  return (
    <div>
      <div className="w-full md:w-80 bg-[#F4C430]/40 dark:bg-zinc-800 p-6 rounded-lg shadow h-fit">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl">Filters</h2>
          <Filter size={20} className="text-indigo-600" />
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Price Range</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">${filters.priceRange[0]}</span>
            <span className="text-gray-600">${filters.priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            className="w-full mt-2 accent-[#017E7F]"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [0, parseInt(e.target.value)],
              })
            }
          />
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Star Rating</h3>
          <div className="flex gap-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                className={`px-3 py-1 border ${
                  filters.rating === rating
                    ? "bg-indigo-100 border-indigo-400"
                    : "border-gray-300"
                } rounded-md`}
                onClick={() =>
                  setFilters({
                    ...filters,
                    rating: rating === filters.rating ? 0 : rating,
                  })
                }
              >
                {rating}+
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Amenities</h3>
          <div className="space-y-2">
            {[
              "Free WiFi",
              "Pool",
              "Spa",
              "Gym",
              "Restaurant",
              "Parking",
              "Air Conditioning",
            ].map((amenity) => (
              <div key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  id={amenity}
                  className="mr-2 accent-indigo-600"
                  onChange={() => {
                    const newAmenities = filters.amenities.includes(amenity)
                      ? filters.amenities.filter((a) => a !== amenity)
                      : [...filters.amenities, amenity];
                    setFilters({ ...filters, amenities: newAmenities });
                  }}
                />
                <label htmlFor={amenity}>{amenity}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Property Type</h3>
          <div className="space-y-2">
            {["all", "hotel", "resort", "apartment", "villa", "hostel"].map(
              (type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="radio"
                    id={type}
                    name="propertyType"
                    className="mr-2 accent-indigo-600"
                    checked={filters.propertyType === type}
                    onChange={() =>
                      setFilters({ ...filters, propertyType: type })
                    }
                  />
                  <label htmlFor={type} className="capitalize">
                    {type}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        <button className="w-full bg-[#017E7F] dark:bg-blue-950 text-white py-2 rounded-md hover:bg-indigo-700 dark:hover:bg-blue-800">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SideBarFilter;
