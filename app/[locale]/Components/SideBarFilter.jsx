"use client";
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  ChevronDown,
  ChevronUp,
  X,
  Wifi,
  ParkingCircle,
  Thermometer,
  Utensils,
  Waves,
  PawPrint,
  Ban,
  Users,
  Dumbbell,
  Sparkles,
  ShieldCheck,
  Tv,
  Coffee,
  Car,
  Plane,
  Accessibility,
  Flame,
  Banknote,
  Check,
} from "lucide-react";

const SideBarFilter = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: null,
    amenities: [],
    propertyType: "all",
    facilities: [],
    services: [],
    accessibility: [],
    paymentOptions: [],
    sustainability: [],
  });

  const [openSections, setOpenSections] = useState({
    price: true,
    rating: true,
    propertyType: true,
    popular: true,
    facilities: false,
    services: false,
    accessibility: false,
    sustainability: false,
    payment: false,
  });

  const filterGroups = {
    popular: [
      { label: "Free Wi-Fi", icon: Wifi },
      { label: "Parking", icon: ParkingCircle },
      { label: "Air Conditioning", icon: Thermometer },
      { label: "Restaurant", icon: Utensils },
      { label: "Pool", icon: Waves },
      { label: "Pet Friendly", icon: PawPrint },
    ],
    propertyType: ["Hotel", "Resort", "Apartment", "Villa", "Hostel", "B&B"],
    facilities: [
      { label: "Fitness Center", icon: Dumbbell },
      { label: "Spa", icon: Sparkles },
      { label: "24/7 Front Desk", icon: ShieldCheck },
      { label: "TV Lounge", icon: Tv },
      { label: "Coffee Shop", icon: Coffee },
    ],
    accessibility: [
      { label: "Wheelchair Access", icon: Accessibility },
      { label: "Elevator", icon: Car },
      { label: "Ramp Access", icon: Plane },
    ],
    sustainability: [
      { label: "Eco Certified", icon: Sparkles },
      { label: "Carbon Neutral", icon: Flame },
      { label: "Recycling Program", icon: Banknote },
    ],
    payment: ["Free Cancellation", "Pay at Hotel", "Reserve Now, Pay Later"],
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterToggle = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const selectedFilters = [
    ...filters.amenities,
    ...filters.facilities,
    ...filters.accessibility,
    ...filters.sustainability,
    ...filters.paymentOptions,
    filters.propertyType !== "all" && `Type: ${filters.propertyType}`,
    filters.rating && `${filters.rating}+ Stars`,
  ].filter(Boolean);

  return (
    <div className="w-80 bg-white shadow-xl rounded-lg p-4 border border-gray-100">
      {/* Selected Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map((filter) => (
            <div
              key={filter}
              className="flex items-center bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {filter}
              <X
                size={14}
                className="ml-2 cursor-pointer"
                onClick={() => {
                  /* Add remove logic here */
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-b pb-4 mb-4">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <h3 className="font-semibold">Price per night</h3>
          {openSections.price ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.price && (
          <div className="px-2">
            <Slider
              range
              min={0}
              max={1000}
              value={filters.priceRange}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, priceRange: value }))
              }
              trackStyle={[{ backgroundColor: "#017E7F" }]}
              handleStyle={[
                { borderColor: "#017E7F", backgroundColor: "white" },
                { borderColor: "#017E7F", backgroundColor: "white" },
              ]}
            />
            <div className="flex justify-between text-gray-600 text-sm mt-2">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Star Rating */}
      <div className="border-b pb-4 mb-4">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("rating")}
        >
          <h3 className="font-semibold">Star Rating</h3>
          {openSections.rating ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.rating && (
          <div className="">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex text-xs items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.rating === rating}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      rating: prev.rating === rating ? null : rating,
                    }))
                  }
                  className="form-checkbox h-4 w-4 text-blue-600 rounded-sm"
                />
                <span className="text-gray-700">{rating} Stars</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Popular Filters */}
      <div className="border-b pb-4 mb-4">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("popular")}
        >
          <h3 className="font-semibold">Popular Filters</h3>
          {openSections.popular ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.popular && (
          <div className="">
            {filterGroups.popular.map(({ label, icon: Icon }) => (
              <label
                key={label}
                className="flex text-xs items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(label)}
                  onChange={() => handleFilterToggle("amenities", label)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded-sm"
                />
                <Icon size={16} className="text-gray-600" />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Property Type */}
      <div className="border-b pb-4 mb-4">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("propertyType")}
        >
          <h3 className="font-semibold">Property Type</h3>
          {openSections.propertyType ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.propertyType && (
          <div className="">
            {filterGroups.propertyType.map((type) => (
              <label
                key={type}
                className="flex text-xs items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="radio"
                  name="propertyType"
                  checked={filters.propertyType === type}
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, propertyType: type }))
                  }
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Facilities */}
      <div className="border-b pb-4 mb-4">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("facilities")}
        >
          <h3 className="font-semibold">Facilities</h3>
          {openSections.facilities ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.facilities && (
          <div className="">
            {filterGroups.facilities.map(({ label, icon: Icon }) => (
              <label
                key={label}
                className="flex text-xs items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.facilities.includes(label)}
                  onChange={() => handleFilterToggle("facilities", label)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded-sm"
                />
                <Icon size={16} className="text-gray-600" />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Accessibility Features */}
      <div className="border-b pb-4 mb-4">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("accessibility")}
        >
          <h3 className="font-semibold">Accessibility</h3>
          {openSections.accessibility ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.accessibility && (
          <div className="">
            {filterGroups.accessibility.map(({ label, icon: Icon }) => (
              <label
                key={label}
                className="flex text-xs items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.accessibility.includes(label)}
                  onChange={() => handleFilterToggle("accessibility", label)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded-sm"
                />
                <Icon size={16} className="text-gray-600" />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sustainability */}
      <div className="border-b pb-4 mb-4">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("sustainability")}
        >
          <h3 className="font-semibold">Sustainability</h3>
          {openSections.sustainability ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.sustainability && (
          <div className="">
            {filterGroups.sustainability.map(({ label, icon: Icon }) => (
              <label
                key={label}
                className="flex text-xs items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.sustainability.includes(label)}
                  onChange={() => handleFilterToggle("sustainability", label)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded-sm"
                />
                <Icon size={16} className="text-gray-600" />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Payment Options */}
      <div className="pb-4">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("payment")}
        >
          <h3 className="font-semibold">Payment Options</h3>
          {openSections.payment ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.payment && (
          <div className="">
            {filterGroups.payment.map((option) => (
              <label
                key={option}
                className="flex  text-xs items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.paymentOptions.includes(option)}
                  onChange={() => handleFilterToggle("paymentOptions", option)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded-sm"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBarFilter;
