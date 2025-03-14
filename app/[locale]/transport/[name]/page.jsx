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
  Calendar,
  Star,
  CheckCircle,
  X,
  Info,
  Users,
  Briefcase,
  Wifi,
  Coffee,
  Warehouse,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for a single transport option in Sri Lanka
const transportDetail = {
  id: 1,
  type: "Train",
  name: "Ella Express",
  provider: "Sri Lanka Railways",
  rating: 4.8,
  reviews: 245,
  price: 18,
  departureTime: "07:30",
  arrivalTime: "12:45",
  duration: "5h 15m",
  departureLocation: "Colombo Fort Station",
  arrivalLocation: "Ella Station",
  distance: "273 km",
  features: [
    "Scenic Route",
    "First Class Option",
    "Dining Car",
    "Reserved Seating",
    "Air Conditioned",
  ],
  amenities: [
    { name: "Wi-Fi", available: true, icon: "Wifi" },
    { name: "Food", available: true, icon: "Coffee" },
    { name: "Large Luggage", available: true, icon: "Briefcase" },
    { name: "Power Outlets", available: false, icon: "CreditCard" },
  ],
  classes: [
    {
      name: "First Class",
      price: 28,
      available: 12,
      description:
        "Private compartments with comfortable seating and panoramic views",
    },
    {
      name: "Second Class",
      price: 18,
      available: 37,
      description: "Reserved seating with good views and comfortable chairs",
    },
    {
      name: "Third Class",
      price: 10,
      available: 86,
      description: "Basic seating with no reservation required",
    },
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
    "Passes through tea plantations and mountainous terrain",
    "Famous Nine Arch Bridge view",
    "One of the most scenic train journeys in the world",
    "Optional photo stops at key viewpoints (first class only)",
  ],
  description:
    "The Ella Express is one of Sri Lanka's most iconic rail journeys, taking passengers from Colombo through the central highlands to the mountain village of Ella. This route is famous for its breathtaking scenery, including lush tea plantations, mountain passes, and the famous Nine Arch Bridge. The train offers different class options, with First Class providing air conditioning and panoramic windows for the best views.",
  cancellationPolicy:
    "Free cancellation up to 24 hours before departure. 50% refund for cancellations between 24 and 12 hours before departure. No refund for cancellations less than 12 hours before departure.",
  pickupInstructions:
    "Please arrive at Colombo Fort Station at least 30 minutes before departure. Tickets can be collected from the reservation counter with your booking reference and ID. First and Second Class passengers should proceed to Platform 3, while Third Class boards from Platform 4.",
  route: [
    {
      station: "Colombo Fort",
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
      station: "Nanu Oya",
      arrivalTime: "11:40",
      departureTime: "11:45",
      distance: "209 km",
    },
    {
      station: "Haputale",
      arrivalTime: "12:15",
      departureTime: "12:20",
      distance: "243 km",
    },
    {
      station: "Ella",
      arrivalTime: "12:45",
      departureTime: "",
      distance: "273 km",
    },
  ],
  images: [
    "/api/placeholder/800/400",
    "/api/placeholder/800/400",
    "/api/placeholder/800/400",
  ],
  mapImage: "/api/placeholder/800/400",
};

const TransportDetailPage = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedClass, setSelectedClass] = useState("Second Class");
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
    switch (transportDetail.type) {
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

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Theme Toggle and Back Button */}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src={transportDetail.images[0]}
                alt={transportDetail.name}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Basic Info */}
            <Card className="mb-6 dark:bg-zinc-800">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTransportIcon()}
                    <div>
                      <h1 className="text-2xl font-bold">
                        {transportDetail.name}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        by {transportDetail.provider}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-bold">
                        {transportDetail.rating}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        ({transportDetail.reviews} reviews)
                      </span>
                    </div>
                    <Badge variant="outline">{transportDetail.type}</Badge>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between border-t border-b py-4 mb-4 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2 md:mb-0">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Departure
                      </div>
                      <div className="font-medium">
                        {transportDetail.departureTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2 md:mb-0">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Duration
                      </div>
                      <div className="font-medium">
                        {transportDetail.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Arrival
                      </div>
                      <div className="font-medium">
                        {transportDetail.arrivalTime}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        From
                      </div>
                      <div className="font-medium">
                        {transportDetail.departureLocation}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        To
                      </div>
                      <div className="font-medium">
                        {transportDetail.arrivalLocation}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {transportDetail.features.map((feature, index) => (
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
                  <TabsList className="mb-4 grid grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="route">Route</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold mb-2">Description</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {transportDetail.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-2">Highlights</h3>
                        <ul className="space-y-2">
                          {transportDetail.highlights.map(
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
                        <h3 className="text-lg font-bold mb-2">Map</h3>
                        <div className="rounded-lg overflow-hidden">
                          <img
                            src={transportDetail.mapImage}
                            alt="Route Map"
                            className="w-full h-auto"
                          />
                        </div>
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
                        {transportDetail.route.map((stop, index) => (
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
                      {transportDetail.amenities.map((amenity, index) => (
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

                  <TabsContent value="schedule">
                    <h3 className="text-lg font-bold mb-4">Weekly Schedule</h3>
                    <div className="space-y-3">
                      {transportDetail.schedule.map((day, index) => (
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
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking and Additional Info */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <Card className="mb-6 dark:bg-zinc-800 sticky top-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Travel Classes</h2>

                <div className="space-y-4 mb-6">
                  {transportDetail.classes.map((classOption) => (
                    <div
                      key={classOption.name}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedClass === classOption.name
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600"
                          : "dark:border-gray-700"
                      }`}
                      onClick={() => setSelectedClass(classOption.name)}
                    >
                      <div className="flex justify-between mb-2">
                        <div className="font-bold">{classOption.name}</div>
                        <div className="text-blue-600 dark:text-blue-400 font-bold">
                          ${classOption.price}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {classOption.description}
                      </p>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1 text-gray-500" />
                        <span
                          className={
                            classOption.available < 10
                              ? "text-red-500"
                              : "text-gray-600 dark:text-gray-400"
                          }
                        >
                          {classOption.available} seats left
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-4 dark:border-gray-700">
                  <div className="flex justify-between mb-2">
                    <div className="text-gray-600 dark:text-gray-400">
                      Base fare
                    </div>
                    <div>
                      $
                      {transportDetail.classes.find(
                        (c) => c.name === selectedClass
                      )?.price || transportDetail.price}
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <div className="text-gray-600 dark:text-gray-400">
                      Service fee
                    </div>
                    <div>$2</div>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t dark:border-gray-700">
                    <div>Total</div>
                    <div>
                      $
                      {(transportDetail.classes.find(
                        (c) => c.name === selectedClass
                      )?.price || transportDetail.price) + 2}
                    </div>
                  </div>
                </div>

                <Button className="w-full mb-4">Book Now</Button>

                <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  No payment required now. Pay later.
                </div>
              </CardContent>
            </Card>

            {/* Additional Information Accordions */}
            <Card className="dark:bg-zinc-800">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="cancellation">
                    <AccordionTrigger>Cancellation Policy</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 dark:text-gray-300">
                        {transportDetail.cancellationPolicy}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="pickup">
                    <AccordionTrigger>Pickup Instructions</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 dark:text-gray-300">
                        {transportDetail.pickupInstructions}
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
                            First Class: 30kg per passenger (2 large bags)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Second Class: 25kg per passenger (2 medium bags)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Third Class: 20kg per passenger (1 large bag)
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
                            Regular safety inspections
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            First aid kits available
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Security personnel on board
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Emergency communication systems
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
