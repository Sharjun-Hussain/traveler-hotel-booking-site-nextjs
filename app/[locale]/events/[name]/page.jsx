// pages/transport/[id].js
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sun,
  Moon,
  ArrowLeft,
  Car,
  Bus,
  Train,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Info,
  Users,
  Wifi,
  Coffee,
  Briefcase,
  CreditCard,
  ShieldCheck,
  MessageSquare,
  User,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Globe,
  Navigation,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
// import { Rating } from "@/components/ui/rating";
import Image from "next/image";

// Mock data for a single transport agency in Sri Lanka
const transportAgency = {
  id: 1,
  name: "Colombo Transport Services",
  description:
    "Providing reliable transportation services across Sri Lanka since 2010. We offer various vehicle types to suit your travel needs.",
  rating: 4.5,
  reviews: 182,
  establishedYear: 2010,
  images: [
    "/transport-hero.jpg",
    "/transport-1.jpg",
    "/transport-2.jpg",
    "/transport-3.jpg",
    "/transport-4.jpg",
  ],
  contact: {
    phone: "+94 11 234 5678",
    email: "info@colombotransport.com",
    website: "www.colombotransport.com",
    address: "123 Galle Road, Colombo 03, Sri Lanka",
    openingHours: "Monday-Sunday: 6:00 AM - 10:00 PM",
  },
  vehicleTypes: ["Car", "Van", "Bus", "Tuk-tuk"],
  routes: [
    "Colombo - Kandy",
    "Colombo - Galle",
    "Colombo - Negombo",
    "Colombo - Airport",
  ],
  features: [
    "24/7 Service",
    "English Speaking Drivers",
    "Airport Transfers",
    "City Tours",
    "Intercity Travel",
  ],
  amenities: [
    { name: "Wi-Fi", available: true, icon: "Wifi" },
    { name: "Refreshments", available: true, icon: "Coffee" },
    { name: "Luggage Storage", available: true, icon: "Briefcase" },
    { name: "Power Outlets", available: false, icon: "CreditCard" },
  ],
  schedule: [
    { day: "Monday", departures: ["07:30", "09:45", "14:20"] },
    { day: "Tuesday", departures: ["07:30", "14:20"] },
    { day: "Wednesday", departures: ["07:30", "09:45", "14:20"] },
    { day: "Thursday", departures: ["07:30", "14:20"] },
    { day: "Friday", departures: ["07:30", "09:45", "14:20", "16:30"] },
    { day: "Saturday", departures: ["07:30", "09:45", "11:15", "14:20"] },
    { day: "Sunday", departures: ["09:45", "14:20"] },
  ],
  highlights: [
    "Reliable and punctual service",
    "Well-maintained vehicles",
    "Competitive pricing",
    "Flexible payment options",
  ],
  cancellationPolicy:
    "Free cancellation up to 24 hours before departure. 50% refund for cancellations between 24 and 12 hours before departure. No refund for cancellations less than 12 hours before departure.",
  pickupInstructions:
    "Please arrive at the pickup location at least 15 minutes before departure. Our drivers will be wearing company uniforms and holding signs with your name.",
  route: [
    {
      station: "Colombo",
      arrivalTime: "",
      departureTime: "07:30",
      distance: "0 km",
    },
    {
      station: "Kandy",
      arrivalTime: "10:15",
      departureTime: "10:25",
      distance: "115 km",
    },
    {
      station: "Galle",
      arrivalTime: "11:40",
      departureTime: "11:45",
      distance: "119 km",
    },
    {
      station: "Negombo",
      arrivalTime: "12:15",
      departureTime: "12:20",
      distance: "37 km",
    },
  ],
  reviews: [
    {
      id: 1,
      user: "Traveler123",
      rating: 5,
      comment:
        "Excellent service! The driver was punctual and the vehicle was clean.",
      date: "2023-05-15",
    },
    {
      id: 2,
      user: "AdventureSeeker",
      rating: 4,
      comment:
        "Good experience overall. Comfortable ride from Colombo to Kandy.",
      date: "2023-04-22",
    },
    {
      id: 3,
      user: "LocalExplorer",
      rating: 3,
      comment: "Average service. The AC wasn't working properly in our van.",
      date: "2023-03-10",
    },
  ],
};

const TransportDetailPage = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleBackClick = () => {
    // router.back();
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (review && rating > 0) {
      const newReview = {
        id: transportAgency.reviews.length + 1,
        user: userName || "Anonymous",
        rating,
        comment: review,
        date: new Date().toISOString().split("T")[0],
      };
      transportAgency.reviews.unshift(newReview);
      setReview("");
      setRating(0);
      setUserName("");
      alert("Thank you for your review!");
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === transportAgency.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? transportAgency.images.length - 1 : prevIndex - 1
    );
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "Wifi":
        return <Wifi className="h-5 w-5" />;
      case "Coffee":
        return <Coffee className="h-5 w-5" />;
      case "Briefcase":
        return <Briefcase className="h-5 w-5" />;
      case "CreditCard":
        return <CreditCard className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getTransportIcon = () => {
    switch (transportAgency.type) {
      case "Car":
        return <Car className="h-6 w-6 text-blue-500" />;
      case "Bus":
        return <Bus className="h-6 w-6 text-green-500" />;
      case "Train":
        return <Train className="h-6 w-6 text-red-500" />;
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  // Image gallery layout based on number of images
  const renderImageGallery = () => {
    const images = transportAgency.images;
    const count = images.length;

    if (count === 0) {
      return (
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg h-64 flex items-center justify-center">
          <span className="text-gray-500">No images available</span>
        </div>
      );
    }

    if (count === 1) {
      return (
        <div className="relative rounded-lg overflow-hidden h-96">
          <Image
            src={images[0]}
            alt={transportAgency.name}
            fill
            className="object-cover"
          />
        </div>
      );
    }

    if (count === 2) {
      return (
        <div className="grid grid-cols-2 gap-2 h-96">
          {images.map((img, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden">
              <Image
                src={img}
                alt={`${transportAgency.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    if (count === 3) {
      return (
        <div className="grid grid-cols-2 gap-2 h-96">
          <div className="relative row-span-2 rounded-lg overflow-hidden">
            <Image
              src={images[0]}
              alt={`${transportAgency.name} 1`}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={images[1]}
              alt={`${transportAgency.name} 2`}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={images[2]}
              alt={`${transportAgency.name} 3`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      );
    }

    if (count === 4) {
      return (
        <div className="grid grid-cols-2 gap-2 h-96">
          {images.map((img, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden">
              <Image
                src={img}
                alt={`${transportAgency.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    // For 5+ images, show carousel
    return (
      <div className="relative rounded-lg overflow-hidden h-96">
        <Image
          src={images[currentImageIndex]}
          alt={`${transportAgency.name} ${currentImageIndex + 1}`}
          fill
          className="object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 w-2 rounded-full ${
                currentImageIndex === index ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Theme Toggle and Back Button */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
            thumbIcon={
              theme === "dark" ? (
                <Moon className="h-3 w-3" />
              ) : (
                <Sun className="h-3 w-3" />
              )
            }
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">{renderImageGallery()}</div>

            {/* Basic Info */}
            <Card className="mb-6 dark:bg-zinc-800">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTransportIcon()}
                    <div>
                      <h1 className="text-2xl font-bold">
                        {transportAgency.name}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Established in {transportAgency.establishedYear}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-bold">
                        {transportAgency.rating}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        ({transportAgency.reviews.length} reviews)
                      </span>
                    </div>
                    <Badge variant="outline">Transport Service</Badge>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {transportAgency.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">
                    Vehicle Types Available
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {transportAgency.vehicleTypes.map((type, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-4 py-2"
                      >
                        <div className="flex items-center gap-2">
                          {type === "Car" && (
                            <Car className="h-5 w-5 text-blue-500" />
                          )}
                          {type === "Bus" && (
                            <Bus className="h-5 w-5 text-green-500" />
                          )}
                          {type === "Train" && (
                            <Train className="h-5 w-5 text-red-500" />
                          )}
                          {type === "Van" && (
                            <Car className="h-5 w-5 text-purple-500" />
                          )}
                          {type === "Tuk-tuk" && (
                            <Car className="h-5 w-5 text-orange-500" />
                          )}
                          {type}
                        </div>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Popular Routes</h3>
                  <div className="flex flex-wrap gap-3">
                    {transportAgency.routes.map((route, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {route}
                        </div>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {transportAgency.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Additional Information */}
            <Card className="dark:bg-zinc-800">
              <CardContent className="pt-6">
                <Tabs
                  defaultValue="overview"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="mb-4 grid grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    {/* <TabsTrigger value="route">Route</TabsTrigger> */}
                    {/* <TabsTrigger value="amenities">Amenities</TabsTrigger> */}
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold mb-2">Highlights</h3>
                        <ul className="space-y-2">
                          {transportAgency.highlights.map(
                            (highlight, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {highlight}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-2">
                          Operating Hours
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {transportAgency.contact.openingHours}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="route">
                    <h3 className="text-lg font-bold mb-4">Complete Route</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Station</TableHead>
                          <TableHead>Arrival</TableHead>
                          <TableHead>Departure</TableHead>
                          <TableHead>Distance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transportAgency.route.map((stop, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {stop.station}
                            </TableCell>
                            <TableCell>{stop.arrivalTime || "-"}</TableCell>
                            <TableCell>{stop.departureTime || "-"}</TableCell>
                            <TableCell>{stop.distance}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="amenities">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {transportAgency.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center text-center p-4 border rounded-lg dark:border-gray-700"
                        >
                          <div
                            className={`p-3 rounded-full mb-2 ${
                              amenity.available
                                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                                : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                            }`}
                          >
                            {getIconComponent(amenity.icon)}
                          </div>
                          <div className="font-medium">{amenity.name}</div>
                          <div className="text-sm">
                            {amenity.available ? (
                              <span className="text-green-600 dark:text-green-400">
                                Available
                              </span>
                            ) : (
                              <span className="text-gray-500">
                                Not Available
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews">
                    <div className="space-y-6">
                      {/* Review Form */}
                      <div className="border rounded-lg p-4 dark:border-gray-700">
                        <h3 className="text-lg font-bold mb-4">
                          Write a Review
                        </h3>
                        <form onSubmit={handleSubmitReview}>
                          <div className="mb-4">
                            <Input
                              placeholder="Your name (optional)"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          </div>
                          <div className="mb-4">
                            {/* <Rating
                              value={rating}
                              onChange={setRating}
                              className="flex gap-1"
                            /> */}
                          </div>
                          <div className="mb-4">
                            <Textarea
                              placeholder="Share your experience..."
                              value={review}
                              onChange={(e) => setReview(e.target.value)}
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Submit Review
                          </Button>
                        </form>
                      </div>

                      {/* Reviews List */}
                      <div>
                        <h3 className="text-lg font-bold mb-4">
                          Customer Reviews ({transportAgency.reviews.length})
                        </h3>
                        <div className="space-y-6">
                          {transportAgency.reviews.map((review) => (
                            <div
                              key={review.id}
                              className="border-b pb-6 dark:border-gray-700"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2">
                                  <User className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{review.user}</h4>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    <span className="text-sm">
                                      {review.rating}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                                      • {review.date}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300">
                                {review.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Details and Additional Info */}
          <div className="lg:col-span-1">
            {/* Contact Details Card */}
            <Card className="mb-6 dark:bg-zinc-800  top-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Contact Details</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                      <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {transportAgency.contact.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                      <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {transportAgency.contact.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                      <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Website</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {transportAgency.contact.website}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-full">
                      <Navigation className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {transportAgency.contact.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
                      <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Opening Hours</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {transportAgency.contact.openingHours}
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6">Contact Now</Button>
              </CardContent>
            </Card>

            {/* Schedule Card */}
            {/* <Card className="mb-6 dark:bg-zinc-800">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Weekly Schedule</h2>
                <div className="space-y-3">
                  {transportAgency.schedule.map((day, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:items-center justify-between border-b pb-3 dark:border-gray-700"
                    >
                      <div className="font-medium mb-2 md:mb-0 md:w-1/4">
                        {day.day}
                      </div>
                      <div className="flex flex-wrap gap-2 md:w-3/4">
                        {day.departures.map((time, timeIndex) => (
                          <Badge
                            key={timeIndex}
                            variant="outline"
                            className="px-3 py-1"
                          >
                            <Clock className="h-3 w-3 mr-1" /> {time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* Additional Information Accordions */}
            <Card className="dark:bg-zinc-800">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="cancellation">
                    <AccordionTrigger>Cancellation Policy</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 dark:text-gray-300">
                        {transportAgency.cancellationPolicy}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="pickup">
                    <AccordionTrigger>Pickup Instructions</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 dark:text-gray-300">
                        {transportAgency.pickupInstructions}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="luggage">
                    <AccordionTrigger>Luggage Policy</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Standard: 20kg per passenger (1 large bag)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Extra luggage available for additional fee
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Special items (bikes, etc.) by arrangement
                          </span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="safety">
                    <AccordionTrigger>Safety Measures</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Regular vehicle maintenance and inspections
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            First aid kits available in all vehicles
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Experienced, licensed drivers
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            24/7 emergency support
                          </span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportDetailPage;
