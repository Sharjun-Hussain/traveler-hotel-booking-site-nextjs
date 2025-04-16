// pages/hotels/[id].js
"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
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
  Heart,
  Share,
  ChevronLeft,
  ChevronRight,
  Award,
  Briefcase,
  Shield,
  MessageCircle,
  CalendarIcon,
  User,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function HotelDetails() {
  const router = useRouter();
  const bookingSectionRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null,
  });
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);

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
        image: "/api/placeholder/400/300",
      },
      {
        name: "Traditional Sri Lankan Cooking Class",
        description:
          "Learn to cook authentic Sri Lankan cuisine with our chefs.",
        price: 40,
        image: "/api/placeholder/400/300",
      },
      {
        name: "Galle Fort Heritage Walk",
        description:
          "Explore the UNESCO-listed Galle Fort with a guided walking tour.",
        price: 20,
        image: "/api/placeholder/400/300",
      },
    ],
    nearbyPlaces: [
      {
        name: "Galle Fort",
        distance: "2 km",
        description:
          "A historic fort built by the Portuguese in the 16th century, offering stunning colonial architecture.",
        image: "/api/placeholder/200/150",
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
    host: {
      name: "Sanjay Gupta",
      since: "2018",
      responseRate: "98%",
      responseTime: "within an hour",
      avatar: "/api/placeholder/64/64",
    },
  };

  const handleBookNow = () => {
    if (!selectedRoom || !selectedDates.checkIn || !selectedDates.checkOut) {
      alert("Please select a room, check-in, and check-out dates.");
      return;
    }
    router.push(
      `/checkout?roomId=${selectedRoom.id}&checkIn=${selectedDates.checkIn}&checkOut=${selectedDates.checkOut}&adults=${guests.adults}&children=${guests.children}`
    );
  };

  const calculateNights = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    const checkIn = new Date(selectedDates.checkIn);
    const checkOut = new Date(selectedDates.checkOut);
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const totalPrice = () => {
    const nights = calculateNights();
    const roomPrice = selectedRoom ? selectedRoom.price : hotelData.price;
    return nights * roomPrice;
  };

  const serviceFee = () => {
    return Math.round(totalPrice() * 0.1);
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    bookingSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white mt-14">
      <Head>
        <title>{hotelData.name} | Luxury Stay</title>
        <meta name="description" content={hotelData.description} />
      </Head>

      {/* Photo Gallery - Mobile */}
      <div className="md:hidden relative">
        <div className="relative h-64 w-full">
          <Image
            src={hotelData.images[currentImageIndex]}
            alt={`${hotelData.name}`}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-sm">
            {currentImageIndex + 1}/{hotelData.images.length}
          </div>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? hotelData.images.length - 1 : prev - 1
              )
            }
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1"
          >
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === hotelData.images.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1"
          >
            <ChevronRight size={20} className="text-gray-800" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="py-4 md:pt-8 md:pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[--color-j-text-title]">
            {hotelData.name}
          </h1>
          <div className="flex flex-wrap items-center justify-between mt-2">
            <div className="flex items-center text-sm">
              <div className="flex items-center mr-2">
                <Star className="w-4 h-4 text-[--color-j-primary] fill-[--color-j-primary]" />
                <span className="ml-1 font-semibold">{hotelData.rating}</span>
                <span className="mx-1">·</span>
                <span className="text-[--color-j-text-small] underline">
                  {hotelData.reviewCount} reviews
                </span>
              </div>
              <span className="hidden sm:inline mx-1">·</span>
              <div className="flex items-center text-[--color-j-text-small]">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{hotelData.location}</span>
              </div>
            </div>
            <div className="flex mt-2 sm:mt-0">
              <Button
                variant="ghost"
                className="flex items-center mr-4 text-sm font-medium text-[--color-j-text-title]"
                onClick={() => window.alert("Share feature would go here")}
              >
                <Share className="w-4 h-4 mr-1" />
                <span>Share</span>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center text-sm font-medium text-[--color-j-text-title]"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`w-4 h-4 mr-1 ${
                    isFavorite ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                <span>Save</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Photo Gallery - Desktop */}
        <div className="hidden md:block mt-4 mb-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px]">
            <div className="col-span-2 row-span-2 relative rounded-l-xl overflow-hidden">
              <Image
                src={hotelData.images[0]}
                alt={`${hotelData.name} main`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative">
              <Image
                src={hotelData.images[1]}
                alt={`${hotelData.name} photo 2`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative rounded-tr-xl overflow-hidden">
              <Image
                src={hotelData.images[2]}
                alt={`${hotelData.name} photo 3`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative">
              <Image
                src={hotelData.images[3]}
                alt={`${hotelData.name} photo 4`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative rounded-br-xl overflow-hidden">
              <Image
                src={hotelData.images[4]}
                alt={`${hotelData.name} photo 5`}
                layout="fill"
                objectFit="cover"
              />
              <button
                onClick={() => setShowAllPhotos(true)}
                className="absolute bottom-2 right-2 bg-white text-[--color-j-text-title] px-3 py-2 rounded-md text-sm font-medium"
              >
                Show all photos
              </button>
            </div>
          </div>
        </div>

        {/* Full screen photo gallery */}
        {showAllPhotos && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <button
                onClick={() => setShowAllPhotos(false)}
                className="flex items-center text-[--color-j-text-title]"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span>Back to listing</span>
              </button>
              <div className="flex">
                <button className="flex items-center mr-4 text-sm font-medium text-[--color-j-text-title]">
                  <Share className="w-4 h-4 mr-1" />
                  <span>Share</span>
                </button>
                <button className="flex items-center text-sm font-medium text-[--color-j-text-title]">
                  <Heart
                    className={`w-4 h-4 mr-1 ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span>Save</span>
                </button>
              </div>
            </div>
            <div className="p-4 max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-4">All photos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotelData.images.map((image, idx) => (
                  <div key={idx} className="relative aspect-video">
                    <Image
                      src={image}
                      alt={`${hotelData.name} photo ${idx + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row mt-4 lg:mt-8 gap-6 lg:gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Host and Basic Info */}
            <div className="flex justify-between items-start border-b pb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[--color-j-text-title]">
                  {hotelData.name} hosted by {hotelData.host?.name || "Sanjay"}
                </h2>
                <div className="flex flex-wrap items-center text-[--color-j-text-small] mt-1 text-sm">
                  <span>{hotelData.rooms[0].capacity} guests</span>
                  <span className="mx-1">·</span>
                  <span>{hotelData.rooms[0].beds}</span>
                  <span className="mx-1">·</span>
                  <span>{hotelData.rooms[0].size}</span>
                </div>
              </div>
              <div className="relative w-12 h-12">
                <Image
                  src={hotelData.host?.avatar || "/api/placeholder/64/64"}
                  alt={hotelData.host?.name || "Host"}
                  layout="fill"
                  className="rounded-full"
                />
              </div>
            </div>

            {/* Quick Highlights */}
            <div className="py-6 border-b">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <Award className="w-6 h-6 text-[--color-j-primary]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Experienced host</h3>
                    <p className="text-sm text-[--color-j-text-small]">
                      {hotelData.host?.name || "Sanjay"} has been hosting since{" "}
                      {hotelData.host?.since || "2018"}.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <MessageCircle className="w-6 h-6 text-[--color-j-primary]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Great communication</h3>
                    <p className="text-sm text-[--color-j-text-small]">
                      {hotelData.host?.responseRate || "98%"} response rate
                      within {hotelData.host?.responseTime || "an hour"}.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <Shield className="w-6 h-6 text-[--color-j-primary]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Free cancellation</h3>
                    <p className="text-sm text-[--color-j-text-small]">
                      Cancel before check-in for a partial refund.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="py-6 border-b">
              <p className="text-[--color-j-text-title] mb-4">
                {hotelData.description}
              </p>
              <button className="font-medium text-[--color-j-primary] underline">
                Show more
              </button>
            </div>

            {/* Tabs Navigation for Mobile */}
            <div className="lg:hidden border-b overflow-x-auto scrollbar-hide">
              <div className="flex whitespace-nowrap">
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
                    className={`py-3 px-4 ${
                      activeTab === tab
                        ? "text-[--color-j-primary] border-b-2 border-[--color-j-primary] font-medium"
                        : "text-[--color-j-text-small]"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Rooms Section */}
            <div className="space-y-4">
              {hotelData.rooms.map((room) => (
                <Card
                  key={room.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleRoomClick(room)}
                >
                  <div className="flex flex-col md:flex-row gap-4 p-4">
                    <div className="md:w-1/3 relative h-48">
                      <Image
                        src={room.image}
                        alt={room.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3 flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <div className="flex items-center text-sm text-[--color-j-text-small] mt-1 mb-2">
                          <Users className="w-4 h-4 mr-1" />
                          <span>
                            {room.capacity} guests • {room.beds} • {room.size}
                          </span>
                        </div>
                        <p className="text-[--color-j-text-small] mb-2">
                          {room.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {room.amenities.map((amenity, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center mt-2">
                        <div className="text-lg font-bold text-[--color-j-primary]">
                          ${room.price}{" "}
                          <span className="text-sm font-normal text-[--color-j-text-small]">
                            / night
                          </span>
                        </div>
                        <Button
                          onClick={() => setSelectedRoom(room)}
                          className="bg-[--color-j-primary] hover:bg-[--color-j-primary-hover]"
                        >
                          Select Room
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Amenities Section */}
            <div className="py-6 border-b">
              <h2 className="text-xl font-bold text-[--color-j-text-title] mb-5">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {hotelData.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-[--color-j-light] p-3 rounded-lg"
                  >
                    <div className="bg-[--color-j-primary] p-2 rounded-full mr-3">
                      {amenity.icon === "Wifi" && (
                        <Wifi className="w-5 h-5 text-white" />
                      )}
                      {amenity.icon === "Coffee" && (
                        <Coffee className="w-5 h-5 text-white" />
                      )}
                      {amenity.icon === "Car" && (
                        <Car className="w-5 h-5 text-white" />
                      )}
                      {amenity.icon === "Clock" && (
                        <Clock className="w-5 h-5 text-white" />
                      )}
                      {amenity.icon === "Activity" && (
                        <Activity className="w-5 h-5 text-white" />
                      )}
                      {amenity.icon === "Spa" && (
                        <Sailboat className="w-5 h-5 text-white" />
                      )}
                      {amenity.icon === "Briefcase" && (
                        <Briefcase className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className="text-[--color-j-text-small]">
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="py-6 border-b">
              <h2 className="text-xl font-bold text-[--color-j-text-title] mb-5">
                Reviews
              </h2>
              <div className="space-y-6">
                {hotelData.reviews.slice(0, visibleReviews).map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0">
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
                        <div className="text-sm text-[--color-j-text-small]">
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
                    <p className="text-[--color-j-text-small]">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
              {visibleReviews < hotelData.reviews.length && (
                <button
                  onClick={() => setVisibleReviews((prev) => prev + 3)}
                  className="mt-4 text-[--color-j-primary] font-medium"
                >
                  Show more reviews
                </button>
              )}
            </div>

            {/* Location Section */}
            <div className="py-6 border-b">
              <h2 className="text-xl font-bold text-[--color-j-text-title] mb-5">
                Location
              </h2>
              <div className="relative h-64 bg-[--color-j-light] rounded-lg overflow-hidden">
                {/* Placeholder for a real map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/api/placeholder/800/400"
                    alt="Map"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[--color-j-text-small]">Map</span>
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-lg mt-4 mb-3">
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
                      <div className="flex items-center text-sm text-[--color-j-text-small] mb-1">
                        <Navigation className="w-3 h-3 mr-1" />
                        <span>{place.distance}</span>
                      </div>
                      <p className="text-[--color-j-text-small] text-sm">
                        {place.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies Section */}
            <div className="py-6">
              <h2 className="text-xl font-bold text-[--color-j-text-title] mb-5">
                Policies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[--color-j-light] p-4 rounded-lg border shadow-md">
                  <h4 className="font-medium mb-2">Check-in / Check-out</h4>
                  <div className="flex items-start mb-2">
                    <Clock className="w-5 h-5 text-[--color-j-text-small] mr-2 mt-0.5" />
                    <div>
                      <p className="text-[--color-j-text-small]">
                        Check-in: {hotelData.policies.checkIn}
                      </p>
                      <p className="text-[--color-j-text-small]">
                        Check-out: {hotelData.policies.checkOut}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[--color-j-light] p-4 rounded-lg  border shadow-md">
                  <h4 className="font-medium mb-2">Cancellation Policy</h4>
                  <p className="text-[--color-j-text-small]">
                    {hotelData.policies.cancellation}
                  </p>
                </div>
                <div className="bg-[--color-j-light] p-4 rounded-lg  border shadow-md">
                  <h4 className="font-medium mb-2">Children & Extra Beds</h4>
                  <p className="text-[--color-j-text-small]">
                    {hotelData.policies.children}
                  </p>
                  <p className="text-[--color-j-text-small] mt-1">
                    {hotelData.policies.extraBed}
                  </p>
                </div>
                <div className="bg-[--color-j-light] p-4 rounded-lg  border shadow-md">
                  <h4 className="font-medium mb-2">Pet Policy</h4>
                  <p className="text-[--color-j-text-small]">
                    {hotelData.policies.pets}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          {/* Booking Sidebar */}
          <div className="lg:w-1/3" ref={bookingSectionRef}>
            <div className="bg-white rounded-lg shadow-lg border p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Book Your Stay</h3>

              {/* Price Display */}
              <div className="mb-4">
                <div className="font-medium mb-2">Price</div>
                <div className="text-2xl font-bold text-[--color-j-primary]">
                  ${selectedRoom ? selectedRoom.price : hotelData.price}
                  <span className="text-sm font-normal text-[--color-j-text-small]">
                    {" "}
                    / night
                  </span>
                </div>
              </div>

              {/* Date Picker */}
              <div className="mb-4">
                <label className="block font-medium mb-2">Dates</label>
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDates.checkIn
                          ? selectedDates.checkIn.toLocaleDateString()
                          : "Check-in"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDates.checkIn}
                        onSelect={(date) =>
                          setSelectedDates({ ...selectedDates, checkIn: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDates.checkOut
                          ? selectedDates.checkOut.toLocaleDateString()
                          : "Check-out"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDates.checkOut}
                        onSelect={(date) =>
                          setSelectedDates({ ...selectedDates, checkOut: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Guest Selector */}
              <div className="mb-6">
                <label className="block font-medium mb-2">Guests</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <User className="mr-2 h-4 w-4" />
                      {guests.adults} adults, {guests.children} children,{" "}
                      {guests.infants} infants
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      {/* Adults */}
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Adults</h4>
                          <p className="text-sm text-gray-500">Ages 13+</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setGuests({
                                ...guests,
                                adults: Math.max(1, guests.adults - 1),
                              })
                            }
                          >
                            -
                          </Button>
                          <span>{guests.adults}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setGuests({
                                ...guests,
                                adults: guests.adults + 1,
                              })
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Children</h4>
                          <p className="text-sm text-gray-500">Ages 2–12</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setGuests({
                                ...guests,
                                children: Math.max(0, guests.children - 1),
                              })
                            }
                          >
                            -
                          </Button>
                          <span>{guests.children}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setGuests({
                                ...guests,
                                children: guests.children + 1,
                              })
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Infants</h4>
                          <p className="text-sm text-gray-500">Under 2</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setGuests({
                                ...guests,
                                infants: Math.max(0, guests.infants - 1),
                              })
                            }
                          >
                            -
                          </Button>
                          <span>{guests.infants}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setGuests({
                                ...guests,
                                infants: guests.infants + 1,
                              })
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Total Amount and Nights */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[--color-j-text-small]">
                    ${selectedRoom ? selectedRoom.price : hotelData.price} x{" "}
                    {calculateNights()} nights
                  </span>
                  <span className="font-medium">
                    $
                    {(selectedRoom ? selectedRoom.price : hotelData.price) *
                      calculateNights()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[--color-j-text-small]">
                    Service fee
                  </span>
                  <span className="font-medium">${serviceFee()}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-[--color-j-primary]">
                    ${totalPrice() + serviceFee()}
                  </span>
                </div>
              </div>

              {/* Reserve Button */}
              <Button
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
                    ? "bg-j-primary hover:bg-[--color-j-primary-hover]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Reserve
              </Button>

              {(!selectedRoom ||
                !selectedDates.checkIn ||
                !selectedDates.checkOut) && (
                <p className="text-sm text-[--color-j-text-small] mt-2 text-center">
                  {!selectedRoom
                    ? "Please select a room"
                    : !selectedDates.checkIn || !selectedDates.checkOut
                    ? "Please select check-in and check-out dates"
                    : ""}
                </p>
              )}

              {/* Additional Info */}
              <div className="mt-4 text-sm text-[--color-j-text-small]">
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
      </div>
    </div>
  );
}
