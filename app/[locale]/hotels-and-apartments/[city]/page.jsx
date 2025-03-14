"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Star,
  MapPin,
  Plane,
  Car,
  Train,
  Bus,
  Ship,
  Hotel,
  Utensils,
  Coffee,
  ShoppingBag,
  Camera,
  Swimming,
  Umbrella,
  Users,
  Calendar as CalendarIcon,
  Search,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  Moon,
  Sun,
} from "lucide-react";

export default function DestinationDetails() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [guests, setGuests] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample data - in a real app, this would come from an API
  const destination = {
    id: 1,
    name: "Colombo",
    country: "Sri Lanka",
    description:
      "The commercial capital and largest city of Sri Lanka, Colombo is a vibrant blend of colonial architecture, modern skyscrapers, and bustling markets.",
    rating: 4.6,
    reviews: 2483,
    weather: {
      current: "Sunny",
      temperature: "30°C",
      forecast: [
        { day: "Mon", temp: "30°C", icon: "sunny" },
        { day: "Tue", temp: "29°C", icon: "partly-cloudy" },
        { day: "Wed", temp: "31°C", icon: "sunny" },
        { day: "Thu", temp: "28°C", icon: "rainy" },
        { day: "Fri", temp: "29°C", icon: "partly-cloudy" },
      ],
    },
    images: [
      "/api/placeholder/800/400",
      "/api/placeholder/800/400",
      "/api/placeholder/800/400",
      "/api/placeholder/800/400",
      "/api/placeholder/800/400",
    ],
    popularActivities: [
      {
        id: 1,
        name: "Gangaramaya Temple Visit",
        rating: 4.7,
        price: "Free",
        image: "/api/placeholder/300/200",
      },
      {
        id: 2,
        name: "National Museum Tour",
        rating: 4.5,
        price: "$5",
        image: "/api/placeholder/300/200",
      },
      {
        id: 3,
        name: "Galle Face Green Stroll",
        rating: 4.8,
        price: "Free",
        image: "/api/placeholder/300/200",
      },
      {
        id: 4,
        name: "Pettah Market Shopping",
        rating: 4.3,
        price: "Varies",
        image: "/api/placeholder/300/200",
      },
    ],
    topHotels: [
      {
        id: 1,
        name: "Shangri-La Colombo",
        stars: 5,
        rating: 4.8,
        price: 215,
        image: "/api/placeholder/300/200",
        amenities: ["Pool", "Spa", "Gym", "Free WiFi", "Restaurant"],
      },
      {
        id: 2,
        name: "Cinnamon Grand",
        stars: 5,
        rating: 4.7,
        price: 180,
        image: "/api/placeholder/300/200",
        amenities: ["Pool", "Spa", "Gym", "Free WiFi", "Restaurant"],
      },
      {
        id: 3,
        name: "Taj Samudra",
        stars: 5,
        rating: 4.6,
        price: 165,
        image: "/api/placeholder/300/200",
        amenities: ["Pool", "Spa", "Free WiFi", "Restaurant"],
      },
      {
        id: 4,
        name: "Hilton Colombo",
        stars: 5,
        rating: 4.6,
        price: 175,
        image: "/api/placeholder/300/200",
        amenities: ["Pool", "Gym", "Free WiFi", "Restaurant"],
      },
    ],
    transport: {
      airport: {
        name: "Bandaranaike International Airport",
        distance: "32 km",
        options: [
          { type: "Taxi", time: "45-60 min", price: "$15-20" },
          { type: "Airport Bus", time: "60-75 min", price: "$1-2" },
          { type: "Hotel Shuttle", time: "45-60 min", price: "Varies" },
        ],
      },
      cityTransport: [
        {
          type: "Tuk-tuk",
          description: "Popular three-wheeled taxis",
          price: "$1-5 per trip",
        },
        {
          type: "Local Bus",
          description: "Extensive network covering all areas",
          price: "$0.20-0.50 per trip",
        },
        {
          type: "Taxi",
          description: "Metered taxis available",
          price: "$2-10 per trip",
        },
        {
          type: "Train",
          description: "Connections to other major cities",
          price: "$1-5 per trip",
        },
      ],
    },
    nearbyPlaces: [
      {
        name: "Negombo",
        distance: "38 km",
        description: "Beach town with colonial influences",
        image: "/api/placeholder/300/200",
      },
      {
        name: "Mount Lavinia",
        distance: "12 km",
        description: "Popular beach area with restaurants",
        image: "/api/placeholder/300/200",
      },
      {
        name: "Kandy",
        distance: "115 km",
        description: "Cultural capital with Temple of the Tooth",
        image: "/api/placeholder/300/200",
      },
      {
        name: "Galle",
        distance: "128 km",
        description: "Historic fort city on the coast",
        image: "/api/placeholder/300/200",
      },
    ],
    facilities: [
      {
        category: "Dining",
        items: [
          "Local Restaurants",
          "International Cuisine",
          "Street Food",
          "Cafés",
        ],
      },
      {
        category: "Shopping",
        items: [
          "Shopping Malls",
          "Local Markets",
          "Souvenir Shops",
          "Supermarkets",
        ],
      },
      {
        category: "Entertainment",
        items: ["Cinemas", "Theaters", "Casinos", "Parks"],
      },
      {
        category: "Health",
        items: ["Hospitals", "Pharmacies", "Clinics", "Emergency Services"],
      },
    ],
  };

  // Effect to check system preference for dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const darkModePreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(darkModePreference);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd also update the document class or data-theme attribute
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", !isDarkMode);
    }
  };

  // Image gallery navigation
  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % destination.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + destination.images.length) %
        destination.images.length
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Header with search and navigation */}

        {/* Main content */}
        <main className="container mx-auto px-4 py-8">
          {/* Destination header */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {destination.name}, {destination.country}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <Star
                    className="text-yellow-500 mr-1"
                    size={18}
                    fill="currentColor"
                  />
                  <span className="font-medium">{destination.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    ({destination.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-red-500 mr-1" size={18} />
                  <span>City Center</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                {destination.description}
              </p>
            </div>
            <div className="flex mt-4 lg:mt-0 space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 size={16} className="mr-1" /> Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Bookmark size={16} className="mr-1" /> Save
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Heart size={16} className="mr-1" /> Like
              </Button>
            </div>
          </div>

          {/* Image gallery */}
          <div className="relative mb-8 rounded-lg overflow-hidden">
            <img
              src={destination.images[currentImageIndex]}
              alt={`${destination.name} ${currentImageIndex + 1}`}
              className="w-full h-96 object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full"
              onClick={nextImage}
            >
              <ChevronRight size={24} />
            </Button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {destination.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Booking widget and weather info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              {/* Current weather */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Current Weather</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-5xl font-bold mr-4">
                        {destination.weather.temperature}
                      </div>
                      <div>
                        <div className="text-xl">
                          {destination.weather.current}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          Colombo, Sri Lanka
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      {destination.weather.forecast.map((day, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <span className="text-sm">{day.day}</span>
                          <span className="text-lg font-medium">
                            {day.temp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking widget */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Book Your Stay</CardTitle>
                  <CardDescription>
                    Find the best hotels in {destination.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Check-in</label>
                        <div className="relative">
                          <div className="flex items-center border rounded-md p-2">
                            <CalendarIcon
                              size={16}
                              className="mr-2 text-gray-500"
                            />
                            <span>
                              {selectedDate
                                ? selectedDate.toLocaleDateString()
                                : "Select date"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Check-out</label>
                        <div className="relative">
                          <div className="flex items-center border rounded-md p-2">
                            <CalendarIcon
                              size={16}
                              className="mr-2 text-gray-500"
                            />
                            <span>Select date</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Guests</label>
                      <div className="flex items-center justify-between">
                        <span>
                          {guests} {guests === 1 ? "Guest" : "Guests"}
                        </span>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                            disabled={guests <= 1}
                          >
                            -
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(guests + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price range</label>
                      <Slider defaultValue={[50, 75]} max={100} step={1} />
                      <div className="flex justify-between text-sm">
                        <span>$0</span>
                        <span>$500+</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Search Hotels</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Main tabs content */}
          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="transport">Transport</TabsTrigger>
              <TabsTrigger value="nearby">Nearby Places</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
            </TabsList>

            {/* Overview tab */}
            <TabsContent value="overview">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Why Visit {destination.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Colombo offers a fascinating blend of colonial architecture,
                    modern skyscrapers, and bustling markets. As Sri Lanka's
                    commercial capital, it provides visitors with a vibrant
                    experience that showcases the country's rich history and
                    contemporary culture.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    From exploring ancient temples to shopping in modern malls,
                    relaxing in lush parks to sampling delicious street food,
                    Colombo has something for every traveler. Its strategic
                    location also makes it a perfect base for exploring nearby
                    attractions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Top Attractions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destination.popularActivities.map((activity) => (
                      <Card key={activity.id} className="overflow-hidden">
                        <div className="relative h-48">
                          <img
                            src={activity.image}
                            alt={activity.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs font-medium">
                            {activity.price}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1">
                            {activity.name}
                          </h3>
                          <div className="flex items-center">
                            <Star
                              className="text-yellow-500 mr-1"
                              size={14}
                              fill="currentColor"
                            />
                            <span>{activity.rating}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Popular Hotels</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {destination.topHotels.slice(0, 2).map((hotel) => (
                      <Card key={hotel.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-48 md:h-auto">
                            <img
                              src={hotel.image}
                              alt={hotel.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="md:w-2/3 p-4">
                            <h3 className="font-semibold mb-1">{hotel.name}</h3>
                            <div className="flex items-center mb-2">
                              {Array.from({ length: hotel.stars }).map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className="text-yellow-500"
                                    fill="currentColor"
                                  />
                                )
                              )}
                            </div>
                            <div className="flex items-center mb-2">
                              <Badge variant="outline" className="mr-2">
                                <Star
                                  className="mr-1"
                                  size={12}
                                  fill="currentColor"
                                />{" "}
                                {hotel.rating}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                Excellent
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {hotel.amenities.slice(0, 3).map((amenity, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {amenity}
                                </Badge>
                              ))}
                              {hotel.amenities.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{hotel.amenities.length - 3} more
                                </Badge>
                              )}
                            </div>
                            <div className="mt-auto text-right">
                              <div className="text-sm">per night</div>
                              <div className="text-xl font-bold">
                                ${hotel.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="text-center mt-4">
                    <Button variant="outline">View All Hotels</Button>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Best Time to Visit
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Colombo has a tropical climate with consistent temperatures
                    year-round. The best time to visit is during the dry seasons
                    from December to March and from June to September. These
                    periods offer sunny days with less rainfall, perfect for
                    exploring the city and its surroundings.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    The southwest monsoon affects Colombo from May to August,
                    while the northeast monsoon brings rain from October to
                    January. However, even during these periods, rainfall
                    typically occurs in short, heavy bursts and doesn't usually
                    disrupt travel plans significantly.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Hotels tab */}
            <TabsContent value="hotels">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    Hotels in {destination.name}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Sort by:</span>
                    <select className="text-sm border rounded p-1">
                      <option>Recommended</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Guest Rating</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {destination.topHotels.map((hotel) => (
                    <Card key={hotel.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-56 md:h-auto">
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-4 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">
                                {hotel.name}
                              </h3>
                              <div className="flex items-center mb-2">
                                {Array.from({ length: hotel.stars }).map(
                                  (_, i) => (
                                    <Star
                                      key={i}
                                      size={16}
                                      className="text-yellow-500"
                                      fill="currentColor"
                                    />
                                  )
                                )}
                              </div>
                              <div className="flex items-center mb-4">
                                <MapPin
                                  size={16}
                                  className="text-red-500 mr-1"
                                />
                                <span className="text-sm text-gray-500">
                                  City Center, 0.5 km from beach
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center justify-end mb-1">
                                <Badge className="bg-green-600">
                                  <Star
                                    className="mr-1"
                                    size={12}
                                    fill="currentColor"
                                  />{" "}
                                  {hotel.rating}
                                </Badge>
                                <span className="text-sm ml-2">Excellent</span>
                              </div>
                              <div className="text-sm text-gray-500">
                                {Math.floor(hotel.rating * 100)} reviews
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {hotel.amenities.map((amenity, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs"
                              >
                                {amenity}
                              </Badge>
                            ))}
                          </div>

                          <div className="mt-auto flex justify-between items-end">
                            <div>
                              <Badge variant="secondary" className="mb-2">
                                20% OFF
                              </Badge>
                              <div className="text-sm line-through text-gray-500">
                                ${Math.floor(hotel.price * 1.2)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">per night</div>
                              <div className="text-2xl font-bold text-green-600">
                                ${hotel.price}
                              </div>
                              <Button className="mt-2">View Deal</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button variant="outline">Load More Hotels</Button>
                </div>
              </div>
            </TabsContent>

            {/* Activities tab */}
            <TabsContent value="activities">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">
                  Things to Do in {destination.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <div className="relative h-48">
                      <img
                        src="/api/placeholder/400/300"
                        alt="Cultural activities"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white font-semibold">
                          Cultural Experiences
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                          <span>Gangaramaya Temple Visit</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                          <span>National Museum Tour</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                          <span>Independence Memorial Hall</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                          <span>Seema Malaka Temple</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <div className="relative h-48">
                      <img
                        src="/api/placeholder/400/300"
                        alt="Outdoor activities"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white font-semibold">
                          Outdoor Activities
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                          <span>Galle Face Green Stroll</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                          <span>Viharamahadevi Park</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                          <span>Mount Lavinia Beach Trip</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                          <span>Beira Lake Boat Ride</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
