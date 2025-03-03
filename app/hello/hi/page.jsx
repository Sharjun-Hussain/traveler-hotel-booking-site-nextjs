"use client";
import React, { useState } from "react";
import {
  MapPin,
  Star,
  Calendar,
  Users,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share,
  Phone,
  Mail,
  Map,
  Clock,
  Menu,
  Globe,
} from "lucide-react";

export default function HotelDetailsPage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  // Sample data - in a real app this would come from your API
  const hotel = {
    id: 1,
    name: "Grand Plaza Hotel & Spa",
    location: "Downtown, New York",
    rating: 4.8,
    reviews: 243,
    price: 199,
    description:
      "Located in the heart of downtown, Grand Plaza Hotel & Spa offers luxury accommodations with stunning city views. Our hotel features spacious rooms, a full-service spa, rooftop pool, and award-winning restaurants. Perfect for business travelers and vacationers alike.",
    images: [
      "/api/placeholder/1200/800",
      "/api/placeholder/1200/800",
      "/api/placeholder/1200/800",
      "/api/placeholder/1200/800",
      "/api/placeholder/1200/800",
      "/api/placeholder/1200/800",
    ],
    amenities: [
      { name: "Free WiFi", category: "general" },
      { name: "Swimming Pool", category: "leisure" },
      { name: "Spa & Wellness Center", category: "leisure" },
      { name: "Fitness Center", category: "leisure" },
      { name: "Restaurant", category: "food" },
      { name: "Bar/Lounge", category: "food" },
      { name: "Room Service", category: "service" },
      { name: "24-Hour Front Desk", category: "service" },
      { name: "Business Center", category: "business" },
      { name: "Conference Rooms", category: "business" },
      { name: "Airport Shuttle", category: "transport" },
      { name: "Parking", category: "transport" },
      { name: "Air Conditioning", category: "room" },
      { name: "Flat-screen TV", category: "room" },
      { name: "Mini Bar", category: "room" },
      { name: "Coffee Machine", category: "room" },
    ],
    roomTypes: [
      {
        id: 1,
        name: "Deluxe King Room",
        price: 199,
        size: "35 m²",
        beds: "1 King Bed",
        capacity: "2 Adults",
        amenities: [
          "Free WiFi",
          "Air Conditioning",
          "Flat-screen TV",
          "Mini Bar",
          "Coffee Machine",
        ],
        image: "/api/placeholder/400/300",
        availableRooms: 5,
      },
      {
        id: 2,
        name: "Executive Suite",
        price: 299,
        size: "55 m²",
        beds: "1 King Bed",
        capacity: "2 Adults, 1 Child",
        amenities: [
          "Free WiFi",
          "Air Conditioning",
          "Flat-screen TV",
          "Mini Bar",
          "Coffee Machine",
          "Separate Living Area",
          "City View",
        ],
        image: "/api/placeholder/400/300",
        availableRooms: 3,
      },
      {
        id: 3,
        name: "Family Room",
        price: 249,
        size: "45 m²",
        beds: "2 Queen Beds",
        capacity: "4 Adults",
        amenities: [
          "Free WiFi",
          "Air Conditioning",
          "Flat-screen TV",
          "Mini Bar",
          "Coffee Machine",
        ],
        image: "/api/placeholder/400/300",
        availableRooms: 2,
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        date: "February 15, 2025",
        rating: 5,
        comment:
          "Absolutely loved my stay! The staff was incredibly friendly and the room was immaculate. The spa services were top-notch. Will definitely return!",
      },
      {
        id: 2,
        user: "John D.",
        date: "January 28, 2025",
        rating: 4,
        comment:
          "Great location and comfortable rooms. The breakfast buffet was extensive and delicious. Only minor issue was the slow WiFi in certain areas.",
      },
      {
        id: 3,
        user: "Maria G.",
        date: "December 10, 2024",
        rating: 5,
        comment:
          "One of the best hotels I've stayed at in New York. The rooftop pool offers amazing views of the city. The room was spacious and the bed was incredibly comfortable.",
      },
    ],
    policies: {
      checkIn: "From 3:00 PM",
      checkOut: "Until 12:00 PM",
      cancellation:
        "Free cancellation up to 24 hours before check-in. Cancellations made within 24 hours of check-in are subject to a one-night charge.",
      children:
        "Children of all ages are welcome. Children under 12 stay free when using existing bedding.",
      pets: "Pets are not allowed, except for service animals.",
      smoking: "Smoking is not permitted in any area of the hotel.",
    },
    activities: [
      {
        name: "Guided City Tours",
        price: "$45 per person",
        image: "/api/placeholder/300/200",
      },
      {
        name: "Cooking Classes",
        price: "$75 per person",
        image: "/api/placeholder/300/200",
      },
      {
        name: "Wine Tasting",
        price: "$55 per person",
        image: "/api/placeholder/300/200",
      },
    ],
    nearby: [
      {
        name: "Central Park",
        distance: "0.5 miles",
        type: "Park",
        image: "/api/placeholder/300/200",
      },
      {
        name: "Museum of Modern Art",
        distance: "0.8 miles",
        type: "Museum",
        image: "/api/placeholder/300/200",
      },
      {
        name: "Times Square",
        distance: "1.2 miles",
        type: "Attraction",
        image: "/api/placeholder/300/200",
      },
      {
        name: "Fifth Avenue",
        distance: "0.3 miles",
        type: "Shopping",
        image: "/api/placeholder/300/200",
      },
    ],
    contact: {
      phone: "+1 (212) 555-1234",
      email: "info@grandplazahotel.com",
      address: "123 Broadway, New York, NY 10003",
      website: "www.grandplazahotel.com",
    },
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleBookNow = () => {
    // In a real app, this would navigate to a booking form or reservation system
    console.log("Booking:", {
      hotel: hotel.name,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      rooms,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600">
            YourHotelBooking
          </h1>
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

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm">
            <ol className="list-none p-0 flex">
              <li className="flex items-center">
                <a href="/" className="text-indigo-600 hover:underline">
                  Home
                </a>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <a href="/hotels" className="text-indigo-600 hover:underline">
                  Hotels
                </a>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-700">{hotel.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hotel Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center gap-1 mr-4">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{hotel.rating}</span>
                <span className="text-gray-500">
                  ({hotel.reviews.length} reviews)
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-1" />
                <span>{hotel.location}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Heart size={18} />
              <span>Save</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Share size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 overflow-hidden rounded-lg">
            <img
              src={hotel.images[selectedImage]}
              alt={`${hotel.name} - Image ${selectedImage + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {hotel.images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-md overflow-hidden h-20 w-32 flex-shrink-0 ${
                  selectedImage === index ? "ring-2 ring-indigo-600" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content - Hotel Details */}
          <div className="lg:w-2/3">
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8 overflow-x-auto">
                {[
                  "overview",
                  "rooms",
                  "amenities",
                  "reviews",
                  "location",
                  "policies",
                ].map((tab) => (
                  <button
                    key={tab}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                      selectedTab === tab
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              {selectedTab === "overview" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">About This Hotel</h2>
                  <p className="text-gray-700 mb-6">{hotel.description}</p>

                  <h3 className="text-lg font-bold mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    {hotel.amenities.slice(0, 6).map((amenity) => (
                      <div key={amenity.name} className="flex items-center">
                        <Check size={16} className="text-green-500 mr-2" />
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold mb-3">Hotel Activities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {hotel.activities.map((activity) => (
                      <div
                        key={activity.name}
                        className="bg-gray-50 rounded-lg overflow-hidden"
                      >
                        <img
                          src={activity.image}
                          alt={activity.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <h4 className="font-semibold">{activity.name}</h4>
                          <p className="text-gray-600 text-sm">
                            {activity.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === "rooms" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Available Rooms</h2>
                  <div className="space-y-6">
                    {hotel.roomTypes.map((room) => (
                      <div
                        key={room.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3">
                            <img
                              src={room.image}
                              alt={room.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-bold">{room.name}</h3>
                              <div className="text-right">
                                <div className="text-xl font-bold">
                                  ${room.price}
                                </div>
                                <div className="text-sm text-gray-500">
                                  per night
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                              <div className="flex items-center">
                                <span className="font-semibold mr-2">
                                  Size:
                                </span>
                                <span>{room.size}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-semibold mr-2">
                                  Beds:
                                </span>
                                <span>{room.beds}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-semibold mr-2">
                                  Capacity:
                                </span>
                                <span>{room.capacity}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-semibold mr-2">
                                  Available:
                                </span>
                                <span>{room.availableRooms} rooms</span>
                              </div>
                            </div>
                            <div className="mt-4">
                              <h4 className="font-semibold mb-2">
                                Room Amenities:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {room.amenities.map((amenity) => (
                                  <span
                                    key={amenity}
                                    className="px-2 py-1 bg-gray-100 text-sm rounded-md"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === "amenities" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Hotel Amenities</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      "general",
                      "leisure",
                      "food",
                      "service",
                      "business",
                      "transport",
                      "room",
                    ].map((category) => {
                      const categoryAmenities = hotel.amenities.filter(
                        (a) => a.category === category
                      );
                      if (categoryAmenities.length === 0) return null;

                      return (
                        <div key={category}>
                          <h3 className="text-lg font-semibold mb-4 capitalize">
                            {category}
                          </h3>
                          <ul className="space-y-2">
                            {categoryAmenities.map((amenity) => (
                              <li
                                key={amenity.name}
                                className="flex items-center"
                              >
                                <Check
                                  size={16}
                                  className="text-green-500 mr-2"
                                />
                                <span>{amenity.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedTab === "reviews" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Guest Reviews</h2>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                      Write a Review
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-4xl font-bold text-center text-indigo-600 mb-2">
                        {hotel.rating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={20}
                            className={
                              star <= Math.floor(hotel.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-center text-gray-600">
                        Based on {hotel.reviews.length} reviews
                      </p>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = hotel.reviews.filter(
                            (r) => Math.floor(r.rating) === star
                          ).length;
                          const percentage =
                            (count / hotel.reviews.length) * 100;

                          return (
                            <div key={star} className="flex items-center">
                              <div className="w-20 text-sm text-gray-600">
                                {star} stars
                              </div>
                              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-yellow-400 h-2.5 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <div className="w-16 text-sm text-gray-600">
                                {percentage.toFixed(0)}%
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {hotel.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold">{review.user}</h3>
                            <p className="text-sm text-gray-500">
                              {review.date}
                            </p>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">
                      Show More Reviews
                    </button>
                  </div>
                </div>
              )}

              {selectedTab === "location" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    Location & Nearby Attractions
                  </h2>

                  <div className="bg-gray-100 h-96 rounded-lg mb-8 flex items-center justify-center">
                    <div className="text-center">
                      <Map size={48} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500">
                        Interactive map would be displayed here
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {hotel.contact.address}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-4">Nearby Attractions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hotel.nearby.map((place) => (
                      <div
                        key={place.name}
                        className="flex bg-white border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <div className="w-1/3">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <h4 className="font-semibold">{place.name}</h4>
                          <p className="text-sm text-gray-500">{place.type}</p>
                          <p className="text-sm text-indigo-600 mt-2">
                            {place.distance}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === "policies" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Hotel Policies</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock size={20} className="text-indigo-600 mr-2" />
                        <h3 className="font-semibold">Check-in Time</h3>
                      </div>
                      <p>{hotel.policies.checkIn}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock size={20} className="text-indigo-600 mr-2" />
                        <h3 className="font-semibold">Check-out Time</h3>
                      </div>
                      <p>{hotel.policies.checkOut}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Cancellation Policy
                      </h3>
                      <p className="text-gray-700">
                        {hotel.policies.cancellation}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Children Policy</h3>
                      <p className="text-gray-700">{hotel.policies.children}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Pet Policy</h3>
                      <p className="text-gray-700">{hotel.policies.pets}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Smoking Policy</h3>
                      <p className="text-gray-700">{hotel.policies.smoking}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Phone size={20} className="text-indigo-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p>{hotel.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail size={20} className="text-indigo-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>{hotel.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin size={20} className="text-indigo-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p>{hotel.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe size={20} className="text-indigo-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Website</h3>
                    <p>{hotel.contact.website}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
