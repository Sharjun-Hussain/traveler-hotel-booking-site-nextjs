// pages/hotels/[id].js
"use client";
import { useState, useRef, useEffect } from "react";
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
  X,
  ChevronDown,
  ChevronUp,
  Hotel,
  Utensils,
  Dumbbell,
  Tv,
  AirVent,
  ShowerHead,
  ConciergeBell,
  ParkingCircle,
  Waves,
  Mountain,
  Sun,
  Snowflake,
  ShoppingCart,
  Landmark,
  Leaf,
  PawPrint,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
// const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
//   ssr: false,
// });

export default function HotelDetails() {
  const router = useRouter();
  const bookingSectionRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null,
  });
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0 });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedAmenities, setExpandedAmenities] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [showRoomDetails, setShowRoomDetails] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hotelData = {
    id: "hotel-456",
    name: "Serene Bay Resort & Spa",
    location: "Galle, Sri Lanka",
    rating: 4.7,
    reviewCount: 382,
    price: 175,
    discountPrice: 159,
    discountPercentage: 9,
    description:
      "Discover the perfect blend of luxury and nature at Serene Bay Resort & Spa, located along the breathtaking coast of Galle, Sri Lanka. Enjoy world-class hospitality, stunning oceanfront views, and a peaceful retreat with premium amenities.",
    images: [
      "/hotel1.jpg",
      "/hotel2.jpg",
      "/hotel3.jpg",
      "/hotel4.jpg",
      "/hotel5.jpg",
      "/hotel6.jpg",
      "/hotel7.jpg",
      "/hotel8.jpg",
    ],
    amenities: [
      { name: "Free WiFi", icon: "Wifi", category: "internet" },
      { name: "Infinity Pool", icon: "Swim", category: "pool" },
      { name: "Spa & Wellness Center", icon: "Spa", category: "wellness" },
      { name: "Restaurant", icon: "Utensils", category: "food" },
      { name: "24/7 Front Desk", icon: "ConciergeBell", category: "services" },
      { name: "Airport Shuttle", icon: "Car", category: "transport" },
      { name: "Fitness Center", icon: "Dumbbell", category: "wellness" },
      { name: "Business Center", icon: "Briefcase", category: "business" },
      { name: "Parking", icon: "ParkingCircle", category: "transport" },
      { name: "Beach Access", icon: "Waves", category: "outdoor" },
      { name: "Air Conditioning", icon: "AirVent", category: "room" },
      { name: "Flat-screen TV", icon: "Tv", category: "room" },
      { name: "Private Bathroom", icon: "ShowerHead", category: "room" },
      { name: "Mountain View", icon: "Mountain", category: "view" },
      { name: "Garden View", icon: "Leaf", category: "view" },
      { name: "Pet Friendly", icon: "PawPrint", category: "policies" },
    ],
    rooms: [
      {
        id: "deluxe-1",
        name: "Deluxe Ocean View",
        price: 175,
        discountPrice: 159,
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
          "Private balcony",
          "Safe",
        ],
        image: "/room1.jpg",
        images: ["/room1.jpg", "/room1a.jpg", "/room1b.jpg"],
        cancellation: "Free cancellation",
        breakfast: "Breakfast included",
      },
      {
        id: "suite-1",
        name: "Presidential Suite",
        price: 299,
        discountPrice: 269,
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
          "Separate living area",
          "Sea view",
        ],
        image: "/room2.jpg",
        images: ["/room2.jpg", "/room2a.jpg", "/room2b.jpg"],
        cancellation: "Free cancellation",
        breakfast: "Breakfast included",
      },
      {
        id: "villa-1",
        name: "Private Pool Villa",
        price: 399,
        discountPrice: 359,
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
          "Butler service",
          "Beach access",
        ],
        image: "/room3.jpg",
        images: ["/room3.jpg", "/room3a.jpg", "/room3b.jpg"],
        cancellation: "Non-refundable",
        breakfast: "Breakfast included",
      },
    ],
    reviews: [
      {
        id: "rev-1",
        user: "Ruwan Perera",
        avatar: "/avatar1.jpg",
        rating: 5,
        date: "February 10, 2025",
        comment:
          "The best beach resort I have ever visited! The staff was friendly, the food was delicious, and the ocean view from our room was spectacular.",
        travelerType: "Couple",
        stayDuration: "3 nights",
      },
      {
        id: "rev-2",
        user: "Emily Watson",
        avatar: "/avatar2.jpg",
        rating: 4,
        date: "January 22, 2025",
        comment:
          "Amazing experience! The spa treatments were relaxing, and the infinity pool was a highlight. Would have loved faster WiFi, but overall fantastic!",
        travelerType: "Solo traveler",
        stayDuration: "5 nights",
      },
      {
        id: "rev-3",
        user: "Aravinda Fernando",
        avatar: "/avatar3.jpg",
        rating: 5,
        date: "January 8, 2025",
        comment:
          "A perfect getaway! The seafood restaurant serves the best crab curry, and the sunset from the beachside lounge is unforgettable.",
        travelerType: "Family",
        stayDuration: "7 nights",
      },
      {
        id: "rev-4",
        user: "James Rodriguez",
        avatar: "/avatar4.jpg",
        rating: 4,
        date: "December 15, 2024",
        comment:
          "Great location and excellent service. The room was spacious and clean. The only downside was the construction noise nearby.",
        travelerType: "Business",
        stayDuration: "2 nights",
      },
      {
        id: "rev-5",
        user: "Priya Patel",
        avatar: "/avatar5.jpg",
        rating: 5,
        date: "November 28, 2024",
        comment:
          "Absolutely stunning property. The staff went above and beyond to make our anniversary special. Will definitely return!",
        travelerType: "Couple",
        stayDuration: "4 nights",
      },
    ],
    activities: [
      {
        name: "Whale Watching Tour",
        description:
          "Witness the majestic blue whales and dolphins off the coast of Mirissa.",
        price: 60,
        duration: "Half day",
        image: "/activity1.jpg",
      },
      {
        name: "Traditional Sri Lankan Cooking Class",
        description:
          "Learn to cook authentic Sri Lankan cuisine with our chefs.",
        price: 40,
        duration: "3 hours",
        image: "/activity2.jpg",
      },
      {
        name: "Galle Fort Heritage Walk",
        description:
          "Explore the UNESCO-listed Galle Fort with a guided walking tour.",
        price: 20,
        duration: "2 hours",
        image: "/activity3.jpg",
      },
    ],
    nearbyPlaces: [
      {
        name: "Galle Fort",
        distance: "2 km",
        description:
          "A historic fort built by the Portuguese in the 16th century, offering stunning colonial architecture.",
        image: "/nearby1.jpg",
        type: "Historic site",
      },
      {
        name: "Unawatuna Beach",
        distance: "5 km",
        description:
          "A popular golden sandy beach known for its turquoise waters and vibrant nightlife.",
        image: "/nearby2.jpg",
        type: "Beach",
      },
      {
        name: "Sinharaja Rainforest",
        distance: "30 km",
        description:
          "A UNESCO World Heritage Site, home to diverse wildlife and lush tropical forests.",
        image: "/nearby3.jpg",
        type: "Nature reserve",
      },
    ],
    policies: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      cancellation:
        "Free cancellation up to 72 hours before check-in. After that, a one-night charge applies.",
      children:
        "Children under 10 stay free with parents. Extra bed charges apply.",
      pets: "Pets are allowed with prior approval (charges may apply).",
      extraBed: "$25 per night for extra beds (subject to availability).",
      payment: "Credit card required to guarantee reservation",
      taxes: "All taxes included in room rate",
    },
    host: {
      name: "Sanjay Gupta",
      since: "2018",
      responseRate: "98%",
      responseTime: "within an hour",
      avatar: "/host.jpg",
      languages: ["English", "Sinhala", "Hindi"],
    },
    sustainability: {
      level: "Level 3",
      practices: [
        "Solar panels for hot water",
        "Waste reduction program",
        "Locally sourced food",
        "Energy-efficient lighting",
      ],
    },
    coordinates: {
      lat: 6.0333,
      lng: 80.2167,
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
    const roomPrice = selectedRoom
      ? selectedRoom.discountPrice || selectedRoom.price
      : hotelData.discountPrice || hotelData.price;
    return nights * roomPrice;
  };

  const serviceFee = () => {
    return Math.round(totalPrice() * 0.1);
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    bookingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleRoomDetails = (roomId) => {
    setShowRoomDetails((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }));
  };

  const getAmenitiesByCategory = (category) => {
    return hotelData.amenities.filter(
      (amenity) => amenity.category === category
    );
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "Wifi":
        return <Wifi className="w-4 h-4" />;
      case "Swim":
        return <Waves className="w-4 h-4" />;
      case "Spa":
        return <Sailboat className="w-4 h-4" />;
      case "Utensils":
        return <Utensils className="w-4 h-4" />;
      case "ConciergeBell":
        return <ConciergeBell className="w-4 h-4" />;
      case "Car":
        return <Car className="w-4 h-4" />;
      case "Dumbbell":
        return <Dumbbell className="w-4 h-4" />;
      case "Briefcase":
        return <Briefcase className="w-4 h-4" />;
      case "ParkingCircle":
        return <ParkingCircle className="w-4 h-4" />;
      case "Waves":
        return <Waves className="w-4 h-4" />;
      case "AirVent":
        return <AirVent className="w-4 h-4" />;
      case "Tv":
        return <Tv className="w-4 h-4" />;
      case "ShowerHead":
        return <ShowerHead className="w-4 h-4" />;
      case "Mountain":
        return <Mountain className="w-4 h-4" />;
      case "Leaf":
        return <Leaf className="w-4 h-4" />;
      case "PawPrint":
        return <PawPrint className="w-4 h-4" />;
      default:
        return <Wifi className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white">
      <Head>
        <title>{hotelData.name} | Luxury Stay</title>
        <meta name="description" content={hotelData.description} />
      </Head>

      {/* Sticky Booking Bar (appears on scroll) */}
      {isScrolled && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50 py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <div className="relative w-12 h-12 mr-3">
                  <Image
                    src={hotelData.images[0]}
                    alt={hotelData.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{hotelData.name}</h3>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{hotelData.rating}</span>
                    <span className="mx-1">·</span>
                    <span className="underline">
                      {hotelData.reviewCount} reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-right mr-6 hidden md:block">
                <div className="text-sm text-gray-500">
                  Price for {calculateNights()} nights
                </div>
                <div className="font-bold text-xl">
                  ${totalPrice() + serviceFee()}
                </div>
              </div>
              <Button
                onClick={handleBookNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
              >
                Reserve
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Header Section */}
        <header className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {hotelData.name}
              </h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center mr-3">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-semibold">{hotelData.rating}</span>
                  <span className="mx-1">·</span>
                  <span className="text-blue-600 underline cursor-pointer">
                    {hotelData.reviewCount} reviews
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-500 mr-1" />
                  <span className="text-gray-600">{hotelData.location}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
                  }`}
                />
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400">
                <Share className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Photo Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px]">
            <div className="md:col-span-2 row-span-2 relative rounded-l-lg overflow-hidden">
              <Image
                src={hotelData.images[0]}
                alt={`${hotelData.name} main`}
                layout="fill"
                objectFit="cover"
                className="cursor-pointer"
                onClick={() => setShowAllPhotos(true)}
              />
            </div>
            <div className="hidden md:block relative">
              <Image
                src={hotelData.images[1]}
                alt={`${hotelData.name} photo 2`}
                layout="fill"
                objectFit="cover"
                className="cursor-pointer"
                onClick={() => setShowAllPhotos(true)}
              />
            </div>
            <div className="hidden md:block relative rounded-tr-lg overflow-hidden">
              <Image
                src={hotelData.images[2]}
                alt={`${hotelData.name} photo 3`}
                layout="fill"
                objectFit="cover"
                className="cursor-pointer"
                onClick={() => setShowAllPhotos(true)}
              />
            </div>
            <div className="hidden md:block relative">
              <Image
                src={hotelData.images[3]}
                alt={`${hotelData.name} photo 4`}
                layout="fill"
                objectFit="cover"
                className="cursor-pointer"
                onClick={() => setShowAllPhotos(true)}
              />
            </div>
            <div className="hidden md:block relative rounded-br-lg overflow-hidden">
              <Image
                src={hotelData.images[4]}
                alt={`${hotelData.name} photo 5`}
                layout="fill"
                objectFit="cover"
                className="cursor-pointer"
                onClick={() => setShowAllPhotos(true)}
              />
              <button
                onClick={() => setShowAllPhotos(true)}
                className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-md text-sm font-medium flex items-center shadow-md hover:bg-gray-100"
              >
                <span>Show all photos</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="lg:w-2/3">
            {/* Property Highlights */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <h2 className="font-bold text-lg mb-3">Property highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Top location</h3>
                    <p className="text-sm text-gray-600">
                      Rated highly by recent guests
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <ThumbsUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Free cancellation</h3>
                    <p className="text-sm text-gray-600">
                      Available on most rooms
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Great value</h3>
                    <p className="text-sm text-gray-600">
                      Recent guests loved the price
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b mb-6">
              <div className="flex space-x-8">
                {[
                  "Overview",
                  "Rooms",
                  "Facilities",
                  "Location",
                  "Reviews",
                  "Policies",
                ].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-4 px-1 font-medium ${
                      activeTab === tab.toLowerCase()
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  About {hotelData.name}
                </h2>
                <p className="mb-6">{hotelData.description}</p>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    Most popular facilities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hotelData.amenities
                      .slice(
                        0,
                        expandedAmenities ? hotelData.amenities.length : 6
                      )
                      .map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          {renderIcon(amenity.icon)}
                          <span className="ml-2">{amenity.name}</span>
                        </div>
                      ))}
                  </div>
                  {hotelData.amenities.length > 6 && (
                    <button
                      onClick={() => setExpandedAmenities(!expandedAmenities)}
                      className="mt-4 text-blue-600 font-medium flex items-center"
                    >
                      {expandedAmenities ? (
                        <>
                          <span>Show less</span>
                          <ChevronUp className="w-4 h-4 ml-1" />
                        </>
                      ) : (
                        <>
                          <span>Show more</span>
                          <ChevronDown className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Sustainability */}
                <div className="border rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-3">
                    <Leaf className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-bold">Sustainability</h3>
                  </div>
                  <p className="mb-3">
                    This property has taken steps to provide more sustainable
                    travel options
                  </p>
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                      Level {hotelData.sustainability.level}
                    </div>
                    <button className="text-blue-600 text-sm font-medium">
                      See what's being done
                    </button>
                  </div>
                </div>

                {/* Host Info */}
                <div className="border rounded-lg p-4 mb-6">
                  <h3 className="font-bold mb-3">
                    Hosted by {hotelData.host.name}
                  </h3>
                  <div className="flex items-start">
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={hotelData.host.avatar}
                        alt={hotelData.host.name}
                        layout="fill"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-medium mr-2">Superhost</span>
                        <span className="text-sm text-gray-600">
                          Hosting since {hotelData.host.since}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span>
                          Response rate: {hotelData.host.responseRate}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          Response time: {hotelData.host.responseTime}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Speaks: {hotelData.host.languages.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rooms Tab */}
            {activeTab === "rooms" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Available rooms</h2>
                <div className="space-y-6">
                  {hotelData.rooms.map((room) => (
                    <div
                      key={room.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 mb-4 md:mb-0 md:mr-4">
                            <div className="relative h-48 w-full rounded-lg overflow-hidden">
                              <Image
                                src={room.image}
                                alt={room.name}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                          </div>
                          <div className="md:w-2/3">
                            <div className="flex justify-between">
                              <h3 className="text-xl font-bold mb-1">
                                {room.name}
                              </h3>
                              <div className="text-right">
                                <div className="text-lg font-bold text-blue-600">
                                  ${room.discountPrice || room.price}
                                  <span className="text-sm font-normal text-gray-600">
                                    {" "}
                                    / night
                                  </span>
                                </div>
                                {room.discountPrice && (
                                  <div className="text-sm text-gray-500 line-through">
                                    ${room.price}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <Users className="w-4 h-4 mr-1" />
                              <span className="mr-3">
                                {room.capacity} guests
                              </span>
                              <span className="mr-3">•</span>
                              <span>{room.beds}</span>
                              <span className="mx-3">•</span>
                              <span>{room.size}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {room.cancellation && (
                                <Badge
                                  variant="outline"
                                  className="text-green-600 border-green-200 bg-green-50"
                                >
                                  {room.cancellation}
                                </Badge>
                              )}
                              {room.breakfast && (
                                <Badge
                                  variant="outline"
                                  className="text-blue-600 border-blue-200 bg-blue-50"
                                >
                                  {room.breakfast}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-700 mb-3">
                              {room.description}
                            </p>

                            <Button
                              onClick={() => handleRoomClick(room)}
                              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                            >
                              Select Room
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Room Details Accordion */}
                      <div className="border-t">
                        <button
                          onClick={() => toggleRoomDetails(room.id)}
                          className="w-full flex justify-between items-center p-4 text-left"
                        >
                          <span className="font-medium">Room details</span>
                          {showRoomDetails[room.id] ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                        {showRoomDetails[room.id] && (
                          <div className="p-4 pt-0 border-t">
                            <h4 className="font-medium mb-2">Room amenities</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                              {room.amenities.map((amenity, idx) => (
                                <div key={idx} className="flex items-center">
                                  <span className="text-gray-600">•</span>
                                  <span className="ml-2 text-sm">
                                    {amenity}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <h4 className="font-medium mb-2">Room photos</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {room.images.map((img, idx) => (
                                <div
                                  key={idx}
                                  className="relative h-32 rounded-lg overflow-hidden"
                                >
                                  <Image
                                    src={img}
                                    alt={`${room.name} photo ${idx + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="cursor-pointer"
                                    onClick={() => setShowAllPhotos(true)}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities Tab */}
            {activeTab === "facilities" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Facilities</h2>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    Most popular facilities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hotelData.amenities.slice(0, 6).map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        {renderIcon(amenity.icon)}
                        <span className="ml-2">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Internet</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getAmenitiesByCategory("internet").map(
                        (amenity, index) => (
                          <div key={index} className="flex items-center">
                            {renderIcon(amenity.icon)}
                            <span className="ml-2">{amenity.name}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      Pool and wellness
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        ...getAmenitiesByCategory("pool"),
                        ...getAmenitiesByCategory("wellness"),
                      ].map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          {renderIcon(amenity.icon)}
                          <span className="ml-2">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Food & Drink</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getAmenitiesByCategory("food").map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          {renderIcon(amenity.icon)}
                          <span className="ml-2">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Transport</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getAmenitiesByCategory("transport").map(
                        (amenity, index) => (
                          <div key={index} className="flex items-center">
                            {renderIcon(amenity.icon)}
                            <span className="ml-2">{amenity.name}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === "location" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Location</h2>

                <div className="h-96 mb-6 rounded-lg overflow-hidden">
                  {/* <MapWithNoSSR
                    lat={hotelData.coordinates.lat}
                    lng={hotelData.coordinates.lng}
                    name={hotelData.name}
                  /> */}
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">What's nearby</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hotelData.nearbyPlaces.map((place, index) => (
                      <div
                        key={index}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="relative h-40">
                          <Image
                            src={place.image}
                            alt={place.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold mb-1">{place.name}</h4>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Navigation className="w-4 h-4 mr-1" />
                            <span>{place.distance}</span>
                            <span className="mx-2">•</span>
                            <span>{place.type}</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {place.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Top attractions</h3>
                  <div className="space-y-3">
                    {hotelData.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start border-b pb-3"
                      >
                        <div className="relative w-16 h-16 min-w-16 mr-4 rounded overflow-hidden">
                          <Image
                            src={activity.image}
                            alt={activity.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">{activity.name}</h4>
                          <p className="text-sm text-gray-600 mb-1">
                            {activity.description}
                          </p>
                          <div className="flex items-center text-sm">
                            <span className="font-medium">
                              ${activity.price}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{activity.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Guest reviews</h2>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full mr-3">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-bold">{hotelData.rating}</span>
                        <span className="mx-1">/</span>
                        <span>5</span>
                      </div>
                      <span className="text-gray-600">
                        {hotelData.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Write a review
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-3">Cleanliness</h3>
                    <div className="flex items-center mb-1">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-3">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                      <span className="font-bold">4.8</span>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-3">Comfort</h3>
                    <div className="flex items-center mb-1">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-3">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: "94%" }}
                        ></div>
                      </div>
                      <span className="font-bold">4.9</span>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-3">Location</h3>
                    <div className="flex items-center mb-1">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-3">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: "96%" }}
                        ></div>
                      </div>
                      <span className="font-bold">4.9</span>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-3">Facilities</h3>
                    <div className="flex items-center mb-1">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-3">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: "88%" }}
                        ></div>
                      </div>
                      <span className="font-bold">4.6</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {hotelData.reviews.slice(0, visibleReviews).map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-6 last:border-0"
                    >
                      <div className="flex items-start mb-3">
                        <div className="relative w-12 h-12 mr-4">
                          <Image
                            src={review.avatar}
                            alt={review.user}
                            layout="fill"
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold">{review.user}</div>
                              <div className="text-sm text-gray-600">
                                {review.travelerType} • {review.stayDuration}
                              </div>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <h4 className="font-medium mt-2 mb-1">Great stay!</h4>
                          <p className="text-gray-700">{review.comment}</p>
                          <div className="flex mt-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600"
                            >
                              Helpful
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600"
                            >
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {visibleReviews < hotelData.reviews.length && (
                  <div className="text-center mt-6">
                    <Button
                      onClick={() => setVisibleReviews((prev) => prev + 3)}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      Show more reviews
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Policies Tab */}
            {activeTab === "policies" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Policies</h2>

                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-3">Check-in / Check-out</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">Check-in</p>
                          <p className="text-gray-600">
                            {hotelData.policies.checkIn}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">Check-out</p>
                          <p className="text-gray-600">
                            {hotelData.policies.checkOut}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-3">Cancellation policy</h3>
                    <p className="text-gray-700">
                      {hotelData.policies.cancellation}
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-3">Children and extra beds</h3>
                    <p className="text-gray-700 mb-2">
                      {hotelData.policies.children}
                    </p>
                    <p className="text-gray-700">
                      {hotelData.policies.extraBed}
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-3">Pets</h3>
                    <p className="text-gray-700">{hotelData.policies.pets}</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-3">Payments</h3>
                    <p className="text-gray-700 mb-2">
                      {hotelData.policies.payment}
                    </p>
                    <p className="text-gray-700">{hotelData.policies.taxes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Booking Widget */}
          <div className="lg:w-1/3" ref={bookingSectionRef}>
            <div className="sticky top-4 border rounded-xl shadow-lg overflow-hidden">
              {/* Price Display */}
              <div className="p-4 border-b">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    {selectedRoom?.discountPrice ? (
                      <>
                        <span className="text-2xl font-bold text-blue-600">
                          ${selectedRoom.discountPrice}
                        </span>
                        <span className="text-sm text-gray-600 ml-1">
                          / night
                        </span>
                        <div className="text-sm text-gray-500 line-through">
                          ${selectedRoom.price}
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl font-bold text-blue-600">
                          $
                          {selectedRoom?.price ||
                            hotelData.discountPrice ||
                            hotelData.price}
                        </span>
                        <span className="text-sm text-gray-600 ml-1">
                          / night
                        </span>
                        {hotelData.discountPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${hotelData.price}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {selectedRoom?.discountPrice || hotelData.discountPrice ? (
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      Save{" "}
                      {selectedRoom
                        ? Math.round(
                            (1 -
                              selectedRoom.discountPrice / selectedRoom.price) *
                              100
                          )
                        : hotelData.discountPercentage}
                      %
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>Great price for this area</span>
                </div>
              </div>

              {/* Date Picker */}
              <div className="p-4 border-b">
                <label className="block font-medium mb-2">Your stay</label>
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
              <div className="p-4 border-b">
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

              {/* Selected Room */}
              {selectedRoom && (
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Selected room</h4>
                    <button
                      onClick={() => setSelectedRoom(null)}
                      className="text-blue-600 text-sm"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 mr-3">
                      <Image
                        src={selectedRoom.image}
                        alt={selectedRoom.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{selectedRoom.name}</div>
                      <div className="text-sm text-gray-600">
                        {selectedRoom.capacity} guests • {selectedRoom.beds}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="p-4 border-b">
                <h4 className="font-medium mb-3">Price details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      $
                      {selectedRoom?.discountPrice ||
                        selectedRoom?.price ||
                        hotelData.discountPrice ||
                        hotelData.price}{" "}
                      x {calculateNights()} nights
                    </span>
                    <span>
                      $
                      {(selectedRoom?.discountPrice ||
                        selectedRoom?.price ||
                        hotelData.discountPrice ||
                        hotelData.price) * calculateNights()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service fee</span>
                    <span>${serviceFee()}</span>
                  </div>
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>Discount</span>
                    <span>
                      -$
                      {selectedRoom
                        ? (selectedRoom.price - selectedRoom.discountPrice) *
                          calculateNights()
                        : (hotelData.price - hotelData.discountPrice) *
                          calculateNights()}
                    </span>
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalPrice() + serviceFee()}</span>
                </div>
              </div>

              {/* Reserve Button */}
              <div className="p-4">
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
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Reserve
                </Button>
                {(!selectedRoom ||
                  !selectedDates.checkIn ||
                  !selectedDates.checkOut) && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    {!selectedRoom
                      ? "Please select a room"
                      : !selectedDates.checkIn || !selectedDates.checkOut
                      ? "Please select check-in and check-out dates"
                      : ""}
                  </p>
                )}
                <div className="mt-4 text-sm text-gray-600 text-center">
                  No payment required at this time
                </div>
              </div>
            </div>

            {/* Property Info Card */}
            <div className="mt-4 border rounded-lg p-4">
              <h3 className="font-bold mb-3">Property info</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Hotel className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Property type</p>
                    <p className="text-gray-600">Resort</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Check-in/Check-out</p>
                    <p className="text-gray-600">
                      {hotelData.policies.checkIn} /{" "}
                      {hotelData.policies.checkOut}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Cancellation policy</p>
                    <p className="text-gray-600">
                      {hotelData.policies.cancellation.split(".")[0]}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Photo Gallery */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
          <div className="sticky top-0 bg-black bg-opacity-90 z-10 p-4 flex justify-between items-center">
            <button
              onClick={() => setShowAllPhotos(false)}
              className="text-white flex items-center"
            >
              <X className="w-6 h-6 mr-2" />
              <span>Close</span>
            </button>
            <div className="text-white">
              {currentImageIndex + 1} / {hotelData.images.length}
            </div>
            <div className="flex space-x-4">
              <button className="text-white">
                <Share className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="text-white"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="relative flex-1 flex items-center justify-center p-4">
            <Image
              src={hotelData.images[currentImageIndex]}
              alt={`${hotelData.name} photo ${currentImageIndex + 1}`}
              width={1200}
              height={800}
              objectFit="contain"
              className="max-w-full max-h-[calc(100vh-80px)]"
            />
            <button
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev === 0 ? hotelData.images.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev === hotelData.images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
          <div className="p-4 bg-black bg-opacity-90">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {hotelData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 relative ${
                    currentImageIndex === idx ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="opacity-90 hover:opacity-100"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
