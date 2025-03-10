// pages/hotels/[id].js
"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Coffee,
  Wifi,
  Car,
  ThumbsUp,
  Activity,
  Navigation,
  DollarSign,
  Users,
  Sailboat,
  LucideSwitchCamera,
  Briefcase,
} from "lucide-react";

// This would be fetched from your API in a real implementation
const hotelData = {
  id: "hotel-456",
  name: "Serene Bay Resort & Spa",
  location: "Galle, Sri Lanka",
  rating: 4.7,
  reviewCount: 382,
  price: 175,
  description:
    "Discover the perfect blend of luxury and nature at Serene Bay Resort & Spa, located along the breathtaking coast of Galle, Sri Lanka. Enjoy world-class hospitality, stunning oceanfront views, and a peaceful retreat with premium amenities.",
  images: [
    "/api/placeholder/800/500",
    "/api/placeholder/800/500",
    "/api/placeholder/800/500",
    "/api/placeholder/800/500",
    "/api/placeholder/800/500",
  ],
  amenities: [
    { name: "Free WiFi", icon: "Wifi" },
    { name: "Infinity Pool", icon: "Swim" },
    { name: "Spa & Ayurveda Center", icon: "Spa" },
    { name: "Seafood Restaurant", icon: "Coffee" },
    { name: "24/7 Room Service", icon: "Clock" },
    { name: "Airport Shuttle", icon: "Car" },
    { name: "Fitness Center", icon: "Activity" },
    { name: "Conference Hall", icon: "Briefcase" },
  ],
  rooms: [
    {
      id: "deluxe-1",
      name: "Deluxe Ocean View",
      price: 175,
      capacity: 2,
      beds: "1 King Bed",
      size: "42 m²",
      description:
        "A spacious room with a private balcony offering panoramic ocean views and premium amenities.",
      amenities: [
        "Free WiFi",
        "Air conditioning",
        "Flat-screen TV",
        "Mini bar",
        "Tea/Coffee maker",
      ],
      image: "/api/placeholder/400/300",
    },
    {
      id: "suite-1",
      name: "Presidential Suite",
      price: 299,
      capacity: 3,
      beds: "1 King Bed + 1 Sofa Bed",
      size: "70 m²",
      description:
        "A luxurious suite featuring a separate living area, jacuzzi, and stunning beachside views.",
      amenities: [
        "Free WiFi",
        "Air conditioning",
        "Flat-screen TV",
        "Mini bar",
        "Tea/Coffee maker",
        "Jacuzzi",
      ],
      image: "/api/placeholder/400/300",
    },
    {
      id: "villa-1",
      name: "Private Pool Villa",
      price: 399,
      capacity: 5,
      beds: "2 King Beds",
      size: "90 m²",
      description:
        "A secluded villa with a private infinity pool, personal butler service, and direct beach access.",
      amenities: [
        "Free WiFi",
        "Air conditioning",
        "Flat-screen TV",
        "Mini bar",
        "Tea/Coffee maker",
        "Private pool",
        "Kitchenette",
      ],
      image: "/api/placeholder/400/300",
    },
  ],
  reviews: [
    {
      id: "rev-1",
      user: "Ruwan Perera",
      avatar: "/api/placeholder/50/50",
      rating: 5,
      date: "February 10, 2025",
      comment:
        "The best beach resort I have ever visited! The staff was friendly, the food was delicious, and the ocean view from our room was spectacular.",
    },
    {
      id: "rev-2",
      user: "Emily Watson",
      avatar: "/api/placeholder/50/50",
      rating: 4,
      date: "January 22, 2025",
      comment:
        "Amazing experience! The spa treatments were relaxing, and the infinity pool was a highlight. Would have loved faster WiFi, but overall fantastic!",
    },
    {
      id: "rev-3",
      user: "Aravinda Fernando",
      avatar: "/api/placeholder/50/50",
      rating: 5,
      date: "January 8, 2025",
      comment:
        "A perfect getaway! The seafood restaurant serves the best crab curry, and the sunset from the beachside lounge is unforgettable.",
    },
  ],
  activities: [
    {
      name: "Whale Watching Tour",
      description:
        "Witness the majestic blue whales and dolphins off the coast of Mirissa.",
      price: 60,
      image:
        "https://iguanasurf.net/wp-content/uploads/2018/02/surf-camp-photo.jpg",
    },
    {
      name: "Traditional Sri Lankan Cooking Class",
      description: "Learn to cook authentic Sri Lankan cuisine with our chefs.",
      price: 40,
      image:
        "https://www.srilankainstyle.com/storage/app/media/Experiences/Traditional%20Sri%20Lankan%20cooking%20class/traditional-sri-lankan-cooking-class-galle-slider-4.jpg",
    },
    {
      name: "Galle Fort Heritage Walk",
      description:
        "Explore the UNESCO-listed Galle Fort with a guided walking tour.",
      price: 20,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/24/05/e0/galle-fort.jpg?w=1200&h=1200&s=1",
    },
  ],
  nearbyPlaces: [
    {
      name: "Galle Fort",
      distance: "2 km",
      description:
        "A historic fort built by the Portuguese in the 16th century, offering stunning colonial architecture.",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/24/05/e0/galle-fort.jpg?w=1200&h=1200&s=1",
    },
    {
      name: "Unawatuna Beach",
      distance: "5 km",
      description:
        "A popular golden sandy beach known for its turquoise waters and vibrant nightlife.",
      image: "/api/placeholder/200/150",
    },
    {
      name: "Sinharaja Rainforest",
      distance: "30 km",
      description:
        "A UNESCO World Heritage Site, home to diverse wildlife and lush tropical forests.",
      image: "/api/placeholder/200/150",
    },
  ],
  policies: {
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    cancellation:
      "Free cancellation up to 72 hours before check-in. After that, a one-night charge applies.",
    children:
      "Children under 10 stay free with parents. Extra bed charges apply.",
    pets: "Sorry, pets are not allowed.",
    extraBed: "$25 per night for extra beds (subject to availability).",
  },
};

export default function HotelDetails() {
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null,
  });
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("rooms");

  const handleBookNow = () => {
    // In a real implementation, this would navigate to checkout or booking confirmation
    alert(
      `Booking confirmed for ${selectedRoom.name} from ${selectedDates.checkIn} to ${selectedDates.checkOut} for ${guests.adults} adults and ${guests.children} children`
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 min-h-screen">
      <Head>
        <title>{hotelData.name} | YourBookingApp</title>
        <meta name="description" content={hotelData.description} />
      </Head>

      {/* Header */}
      <header className="bg-white dark:bg-zinc-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-50">
              {hotelData.name}
            </h1>
            <div className="flex items-center">
              <div className="flex items-center text-yellow-500 mr-2">
                <Star className="w-5 h-5 fill-current" />
                <span className="ml-1 font-semibold">{hotelData.rating}</span>
              </div>
              <span className="text-gray-600 dark:text-zinc-300">
                ({hotelData.reviewCount} reviews)
              </span>
            </div>
          </div>
          <div className="flex items-center mt-2 text-gray-600 dark:text-zinc-200">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{hotelData.location}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Image Gallery */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden mb-8">
          <div className="relative h-96">
            <Image
              src={hotelData.images[currentImageIndex]}
              alt={`${hotelData.name} - image ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="cover"
              className="w-full"
            />
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? hotelData.images.length - 1 : prev - 1
                  )
                }
                className="bg-white dark:bg-zinc-700  p-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-zinc-600"
              >
                &lt;
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === hotelData.images.length - 1 ? 0 : prev + 1
                  )
                }
                className="bg-white dark:bg-zinc-700 p-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-zinc-600"
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <div className="flex space-x-2">
              {hotelData.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-16 cursor-pointer ${
                    currentImageIndex === index ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${hotelData.name} thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Description */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Hotel</h2>
              <p className="text-gray-700 dark:text-zinc-300">
                {hotelData.description}
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow mb-8">
              <div className="border-b border-gray-200 dark:border-zinc-700">
                <nav className="flex">
                  {[
                    "rooms",
                    "amenities",
                    "reviews",
                    "activities",
                    "location",
                    "policies",
                  ].map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-3 font-medium text-sm ${
                        activeTab === tab
                          ? "border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Rooms Tab */}
                {activeTab === "rooms" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Available Rooms
                    </h3>
                    <div className="space-y-6">
                      {hotelData.rooms.map((room) => (
                        <div
                          key={room.id}
                          className="border rounded-lg p-4 flex flex-col md:flex-row gap-4"
                        >
                          <div className="md:w-1/3 relative h-48 md:h-auto">
                            <Image
                              src={room.image}
                              alt={room.name}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-lg"
                            />
                          </div>
                          <div className="md:w-2/3 flex flex-col">
                            <div className="flex-grow">
                              <h4 className="text-lg font-semibold">
                                {room.name}
                              </h4>
                              <div className="flex items-center text-sm text-gray-600 dark:text-zinc-400 mt-1 mb-2">
                                <Users className="w-4 h-4 mr-1" />
                                <span>
                                  {room.capacity} guests • {room.beds} •{" "}
                                  {room.size}
                                </span>
                              </div>
                              <p className="text-gray-700 dark:text-zinc-300 mb-2">
                                {room.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {room.amenities.map((amenity, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded text-xs text-gray-700 dark:text-zinc-300"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-wrap justify-between items-center mt-2">
                              <div className="text-lg font-bold text-blue-600 ">
                                ${room.price}{" "}
                                <span className="text-sm font-normal text-gray-600 dark:text-zinc-400">
                                  / night
                                </span>
                              </div>
                              <button
                                onClick={() => setSelectedRoom(room)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                              >
                                Select Room
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Amenities Tab */}
                {activeTab === "amenities" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Hotel Amenities
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {hotelData.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-50 dark:bg-zinc-700 p-3 rounded-lg"
                        >
                          <div className="bg-blue-100 dark:bg-zinc-800 p-2 rounded-full mr-3">
                            {amenity.icon === "Wifi" && (
                              <Wifi className="w-5 h-5 text-blue-600 dark:text-zinc-300" />
                            )}
                            {amenity.icon === "Coffee" && (
                              <Coffee className="w-5 h-5 text-blue-600 dark:text-zinc-300" />
                            )}
                            {amenity.icon === "Car" && (
                              <Car className="w-5 h-5 text-blue-600 dark:text-zinc-300" />
                            )}
                            {amenity.icon === "Clock" && (
                              <Clock className="w-5 h-5 text-blue-600 dark:text-zinc-300" />
                            )}
                            {amenity.icon === "Activity" && (
                              <Activity className="w-5 h-5 text-blue-600 dark:text-zinc-300" />
                            )}
                            {amenity.icon === "Spa" && (
                              <LucideSwitchCamera className="w-5 h-5 text-blue-600 dark:text-zinc-300" />
                            )}
                            {amenity.icon === "Swim" && (
                              <Sailboat className="w-5 h-5 text-blue-600 dark:text-zinc-300" />
                            )}
                            {amenity.icon === "Briefcase" && (
                              <Briefcase className="w-5 h-5 text-blue-600 dark:text-zinc-300" />
                            )}
                          </div>
                          <span className="text-gray-700 dark:text-zinc-300">
                            {amenity.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">Guest Reviews</h3>
                      <div className="flex items-center">
                        <div className="bg-green-100 dark:bg-zinc-900 text-green-800 font-semibold px-3 py-1 rounded-full flex items-center">
                          <Star className="w-4 h-4 mr-1 fill-current" />
                          {hotelData.rating}
                        </div>
                        <span className="ml-2 text-gray-600">
                          ({hotelData.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {hotelData.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b pb-4 last:border-0"
                        >
                          <div className="flex items-center mb-2">
                            <div className="relative w-10 h-10 mr-3">
                              <Image
                                src={review.avatar}
                                alt={review.user}
                                layout="fill"
                                className="rounded-full"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{review.user}</div>
                              <div className="text-gray-500 dark:text-zinc-400 text-sm">
                                {review.date}
                              </div>
                            </div>
                            <div className="ml-auto flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-zinc-300">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <button className="text-blue-600 font-medium">
                        View all reviews
                      </button>
                    </div>
                  </div>
                )}

                {/* Activities Tab */}
                {activeTab === "activities" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Hotel Activities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {hotelData.activities.map((activity, index) => (
                        <div
                          key={index}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="relative h-40">
                            <Image
                              src={activity.image}
                              alt={activity.name}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-lg">
                              {activity.name}
                            </h4>
                            <p className="text-gray-600 dark:text-zinc-300 mb-2">
                              {activity.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-blue-600">
                                ${activity.price}{" "}
                                <span className="text-sm text-gray-500 dark:text-zinc-300">
                                  per person
                                </span>
                              </span>
                              <button className="text-blue-600 font-medium">
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Tab */}
                {activeTab === "location" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Location & Nearby Places
                    </h3>
                    <div className="mb-6 relative h-64 bg-gray-200 dark:bg-zinc-800 rounded-lg overflow-hidden">
                      {/* Placeholder for a real map */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src="/api/placeholder/800/400"
                          alt="Map"
                          layout="fill"
                          objectFit="cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-zinc-300">
                            Map
                          </span>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg mb-3">
                      Nearby Attractions
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {hotelData.nearbyPlaces.map((place, index) => (
                        <div
                          key={index}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="relative h-32">
                            <Image
                              src={place.image}
                              alt={place.name}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <div className="p-3">
                            <h5 className="font-medium">{place.name}</h5>
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <Navigation className="w-3 h-3 mr-1" />
                              <span>{place.distance}</span>
                            </div>
                            <p className="text-gray-700 text-sm">
                              {place.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Policies Tab */}
                {activeTab === "policies" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Hotel Policies
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 dark:bg-zinc-700 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">
                          Check-in / Check-out
                        </h4>
                        <div className="flex items-start mb-2">
                          <Clock className="w-5 h-5 text-gray-500 dark:text-zinc-300 mr-2 mt-0.5" />
                          <div>
                            <p className="text-gray-700 dark:text-zinc-200">
                              Check-in: {hotelData.policies.checkIn}
                            </p>
                            <p className="text-gray-700 dark:text-zinc-200">
                              Check-out: {hotelData.policies.checkOut}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-zinc-700 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">
                          Cancellation Policy
                        </h4>
                        <p className="text-gray-700 dark:text-zinc-300">
                          {hotelData.policies.cancellation}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-zinc-700 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">
                          Children & Extra Beds
                        </h4>
                        <p className="text-gray-700 dark:text-zinc-300">
                          {hotelData.policies.children}
                        </p>
                        <p className="text-gray-700 mt-1">
                          {hotelData.policies.extraBed}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-zinc-700 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Pet Policy</h4>
                        <p className="text-gray-700 ark:text-zinc-200">
                          {hotelData.policies.pets}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-zinc-700 rounded-lg shadow p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Book Your Stay</h3>

              <div className="mb-4">
                <div className="font-medium mb-2">Price</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${selectedRoom ? selectedRoom.price : hotelData.price}
                  <span className="text-sm font-normal text-gray-600">
                    {" "}
                    / night
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Dates</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full border rounded-md p-2"
                      onChange={(e) =>
                        setSelectedDates({
                          ...selectedDates,
                          checkIn: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full border rounded-md p-2"
                      onChange={(e) =>
                        setSelectedDates({
                          ...selectedDates,
                          checkOut: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-medium mb-2">Guests</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Adults
                    </label>
                    <select
                      className="w-full border rounded-md p-2"
                      value={guests.adults}
                      onChange={(e) =>
                        setGuests({
                          ...guests,
                          adults: parseInt(e.target.value),
                        })
                      }
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Children
                    </label>
                    <select
                      className="w-full border rounded-md p-2"
                      value={guests.children}
                      onChange={(e) =>
                        setGuests({
                          ...guests,
                          children: parseInt(e.target.value),
                        })
                      }
                    >
                      {[0, 1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                disabled={
                  !selectedRoom ||
                  !selectedDates.checkIn ||
                  !selectedDates.checkOut
                }
                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                  selectedRoom &&
                  selectedDates.checkIn &&
                  selectedDates.checkOut
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Book Now
              </button>

              {(!selectedRoom ||
                !selectedDates.checkIn ||
                !selectedDates.checkOut) && (
                <p className="text-sm text-gray-600 mt-2 text-center">
                  {!selectedRoom
                    ? "Please select a room"
                    : !selectedDates.checkIn || !selectedDates.checkOut
                    ? "Please select check-in and check-out dates"
                    : ""}
                </p>
              )}

              <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-1 text-green-600" />
                  <span>Free cancellation until 48 hours before check-in</span>
                </div>
                <div className="flex items-center mt-1">
                  <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                  <span>No payment required today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
