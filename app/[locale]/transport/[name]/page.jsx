// pages/transport/[id].js
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Car,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Users,
  Wifi,
  Coffee,
  Briefcase,
  ShieldCheck,
  User,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Globe,
  Navigation,
  ArrowLeft,
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
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const TransportDetailPage = async ({ params }) => {
  const id = await params?.name;

  // Static data for fields not in API response
  const staticData = {
    rating: 4.2,
    reviews: [
      {
        id: 1,
        user: "Traveler123",
        rating: 5,
        comment: "Excellent service! The driver was punctual and professional.",
        date: "2025-05-15",
      },
      {
        id: 2,
        user: "Explorer22",
        rating: 4,
        comment: "Good experience overall. Comfortable ride.",
        date: "2025-04-22",
      },
    ],
    establishedYear: 2020,
    features: [
      "24/7 Service",
      "English Speaking Drivers",
      "Airport Transfers",
    ],
    amenities: [
      { name: "Wi-Fi", available: true, icon: "Wifi" },
      { name: "Refreshments", available: false, icon: "Coffee" },
      { name: "Luggage Storage", available: true, icon: "Briefcase" },
    ],
    schedule: [
      { day: "Monday", departures: ["07:30", "14:20"] },
      { day: "Tuesday", departures: ["07:30", "14:20"] },
      { day: "Wednesday", departures: ["07:30", "14:20"] },
      { day: "Thursday", departures: ["07:30", "14:20"] },
      { day: "Friday", departures: ["07:30", "14:20"] },
      { day: "Saturday", departures: ["09:45", "14:20"] },
      { day: "Sunday", departures: ["09:45"] },
    ],
    highlights: [
      "Reliable and punctual service",
      "Well-maintained vehicles",
      "Competitive pricing",
    ],
    cancellationPolicy:
      "Free cancellation up to 24 hours before departure. 50% refund for cancellations between 24 and 12 hours before departure.",
    pickupInstructions:
      "Please arrive at the pickup location at least 15 minutes before departure.",
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
    ],
  };

  const fetchTransportData = async () => {
    try {


      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer/list/transport-agency/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );


      return response.data.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const transportData = await fetchTransportData();
  if (!transportData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center">
        <div>Failed to load transport data</div>
      </div>
    );
  }

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
    return <Car className="h-6 w-6 text-blue-500" />;
  };

  const renderImageGallery = () => {
    if (!transportData?.images || transportData.images.length === 0) {
      return (
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg h-64 flex items-center justify-center">
          <span className="text-gray-500">No images available</span>
        </div>
      );
    }

    // For multiple images, show carousel
    return (
      <div className="relative rounded-lg overflow-hidden h-96">
        <Image
          src={transportData.images[0].imageUrl}
          alt={transportData.title}
          fill
          className="object-cover"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" asChild>
            <a href="/transport">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </a>
          </Button>
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
                      <div className="flex  items-center">
                        <h1 className="text-2xl font-bold mr-3">{transportData.title}</h1> <CheckCircle size={24} className="text-green-700 " /> <span className="italic">Vista Verified</span>

                      </div>                      <p className="text-gray-600 dark:text-gray-400">
                        Established in {staticData.establishedYear}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-bold">{staticData.rating}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        ({staticData.reviews.length} reviews)
                      </span>
                    </div>
                    <Badge variant="outline">Transport Service</Badge>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {transportData.description || "No description available"}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">
                    Vehicle Types Available
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {transportData.transportTypes?.map((type, index) => (
                      <Badge key={index} variant="outline" className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Car className="h-5 w-5 text-blue-500" />
                          {type.name}
                        </div>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Service Area</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="px-3 py-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {transportData.serviceArea || "N/A"}
                      </div>
                    </Badge>
                  </div>
                </div>

                {/* <div className="flex flex-wrap gap-2">
                  {staticData.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div> */}
              </CardContent>
            </Card>

            {/* Tabs for Additional Information */}
            <Card className="dark:bg-zinc-800">
              <CardContent className="pt-6">
                <Tabs defaultValue="reviews" className="w-full">
                  <TabsList className="mb-4 grid grid-cols-1">
                    {/* <TabsTrigger value="overview">Overview</TabsTrigger> */}
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  {/* <TabsContent value="overview">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold mb-2">Highlights</h3>
                        <ul className="space-y-2">
                          {staticData.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-2">
                          Operating Hours
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {staticData.schedule
                            .map(
                              (day) =>
                                `${day.day}: ${day.departures.join(", ")}`
                            )
                            .join(" | ")}
                        </p>
                      </div>
                    </div>
                  </TabsContent> */}

                  <TabsContent value="reviews">
                    <div className="space-y-6">
                      {/* Review Form - Will be handled by a client component */}
                      <div className="border rounded-lg p-4 dark:border-gray-700">
                        <h3 className="text-lg font-bold mb-4">
                          Write a Review
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Please sign in to leave a review
                        </p>
                      </div>

                      {/* Reviews List */}
                      <div>
                        <h3 className="text-lg font-bold mb-4">
                          Customer Reviews ({staticData.reviews.length})
                        </h3>
                        <div className="space-y-6">
                          {staticData.reviews.map((review) => (
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
            <Card className="mb-6 dark:bg-zinc-800 top-6">
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
                        {transportData.phone || "Not available"}
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
                        {transportData.email || "Not available"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                      <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Website</h4>
                      <Link href={transportData.website || "#"} className="text-gray-600 dark:text-gray-400">
                        {transportData.website || "Not available"}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-full">
                      <Navigation className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {transportData.address || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full mt-6">
                  <a href={`tel:${transportData.phone}`}>Contact Now</a>
                </Button>
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
                        {staticData.cancellationPolicy}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="pickup">
                    <AccordionTrigger>Pickup Instructions</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 dark:text-gray-300">
                        {staticData.pickupInstructions}
                      </p>
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