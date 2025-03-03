"use client";
import React, { useEffect, useState } from "react";
import { Search, MapPin, Star, Filter, Calendar, Users } from "lucide-react";
import Footer from "../Components/Footer";

export default function HotelsListingPage() {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
    propertyType: "all",
  });

  const [lastscrollY, setlastscrollY] = useState(0);
  const [isfixed, setisfixed] = useState(false);

  useEffect(() => {
    const handlescroll = () => {
      const currentscrollY = window.scrollY;

      if (currentscrollY > 50 && currentscrollY < lastscrollY) {
        setisfixed(true);
      } else {
        setisfixed(false);
      }
      setlastscrollY(currentscrollY);
    };

    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, [lastscrollY]);

  // Sample data - in a real app this would come from your API
  const hotels = [
    {
      id: 1,
      name: "Shangri-La Colombo",
      location: "Galle Face, Colombo",
      rating: 4.8,
      reviews: 320,
      price: 220,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/18/22/f7/shangri-la-hotel-jakarta.jpg?w=700&h=-1&s=1",
      amenities: ["Free WiFi", "Pool", "Spa", "Gym", "Seaside View"],
      distance: "0.5 km from Galle Face Beach",
    },
    {
      id: 2,
      name: "Cinnamon Grand Colombo",
      location: "Colombo 03, Sri Lanka",
      rating: 4.7,
      reviews: 280,
      price: 200,
      image:
        "https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/50826/photos/8493018_XL.jpg?tr=w-1200%2Cfo-auto",
      amenities: ["Free WiFi", "Swimming Pool", "Fine Dining", "Bar", "Spa"],
      distance: "1 km from Colombo City Center",
    },
    {
      id: 3,
      name: "Heritance Kandalama",
      location: "Dambulla, Sri Lanka",
      rating: 4.9,
      reviews: 400,
      price: 180,
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/34687318.jpg?k=76cc5b29b46c9e95814271db622f8ce20030cc266d29818b451242f5c6e955c1&o=&hp=1",
      amenities: [
        "Infinity Pool",
        "Jungle View",
        "Free WiFi",
        "Luxury Spa",
        "Restaurant",
      ],
      distance: "5 km from Sigiriya Rock",
    },
    {
      id: 4,
      name: "Jetwing Lighthouse",
      location: "Galle, Sri Lanka",
      rating: 4.6,
      reviews: 270,
      price: 190,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2e76GDOJ3bb0UZsJKp1CtvpjhJac04w2iQ&s",
      amenities: [
        "Beachfront",
        "Free WiFi",
        "Swimming Pool",
        "Spa",
        "Fine Dining",
      ],
      distance: "2 km from Galle Fort",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div
        className={`transition-all duration-300 ease-in-out bg-indigo-700 py-6 ${
          isfixed ? "fixed top-0 left-0 w-full shadow-md z-50" : "relative"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
    </div>
  );
}
