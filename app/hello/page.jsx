"use client";
import React, { useState } from "react";
import { Search, MapPin, Star, Filter, Calendar, Users } from "lucide-react";

export default function HotelsListingPage() {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
    propertyType: "all",
  });

  // Sample data - in a real app this would come from your API
  const hotels = [
    {
      id: 1,
      name: "Grand Plaza Hotel",
      location: "Downtown, New York",
      rating: 4.8,
      reviews: 243,
      price: 199,
      image: "/api/placeholder/600/400",
      amenities: ["Free WiFi", "Pool", "Spa", "Gym"],
      distance: "1.2 km from center",
    },
    {
      id: 2,
      name: "Ocean View Resort",
      location: "Beachfront, Miami",
      rating: 4.6,
      reviews: 189,
      price: 249,
      image: "/api/placeholder/600/400",
      amenities: ["Free WiFi", "Private Beach", "Restaurant", "Bar"],
      distance: "0.5 km from beach",
    },
    {
      id: 3,
      name: "Mountain Retreat Lodge",
      location: "Alpine Hills, Colorado",
      rating: 4.9,
      reviews: 312,
      price: 179,
      image: "/api/placeholder/600/400",
      amenities: ["Free WiFi", "Fireplace", "Hiking Trails", "Restaurant"],
      distance: "3.5 km from ski resort",
    },
    {
      id: 4,
      name: "City Lights Inn",
      location: "Central District, Chicago",
      rating: 4.5,
      reviews: 156,
      price: 149,
      image: "/api/placeholder/600/400",
      amenities: ["Free WiFi", "Breakfast", "Parking", "Business Center"],
      distance: "0.8 km from center",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600">Find Your Stay</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 flex items-center gap-2">
              <Users size={18} />
              Sign In
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              My Bookings
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-indigo-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Destination"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Check-in & Check-out"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="relative">
                <Users
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Guests & Rooms"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2">
                <Search size={18} />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-80 bg-white p-6 rounded-lg shadow h-fit">
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
                className="w-full mt-2 accent-indigo-600"
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

            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Apply Filters
            </button>
          </div>

          {/* Hotels List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">428 properties found</h2>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-gray-600">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Recommended</option>
                  <option>Price (low to high)</option>
                  <option>Price (high to low)</option>
                  <option>Rating (high to low)</option>
                </select>
              </div>
            </div>

            {/* Hotel Cards */}
            <div className="space-y-6">
              {hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-xl">{hotel.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        <span className="font-bold">{hotel.rating}</span>
                        <span className="text-gray-500">
                          ({hotel.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-gray-600">
                      <MapPin size={16} />
                      <span>{hotel.location}</span>
                      <span className="ml-2 text-indigo-600">
                        {hotel.distance}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-between items-end pt-4">
                      <a
                        href={`/hotels/${hotel.id}`}
                        className="text-indigo-600 font-semibold hover:underline"
                      >
                        See Details
                      </a>
                      <div className="text-right">
                        <div className="text-gray-500">1 night, 2 adults</div>
                        <div className="text-2xl font-bold">${hotel.price}</div>
                        <a
                          href={`/hotels/${hotel.id}/book`}
                          className="mt-2 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav
                className="relative z-0 inline-flex shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-gray-50"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  10
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-indigo-300">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-300">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-300">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-indigo-300">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-300">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-300">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Businesses</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-indigo-300">
                    Add Your Property
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-300">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-300">
                    Advertising
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Download Our App</h3>
              <div className="flex gap-4 mt-4">
                <a href="#" className="block">
                  <img
                    src="/api/placeholder/120/40"
                    alt="App Store"
                    className="h-10"
                  />
                </a>
                <a href="#" className="block">
                  <img
                    src="/api/placeholder/120/40"
                    alt="Google Play"
                    className="h-10"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 YourHotelBooking. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
