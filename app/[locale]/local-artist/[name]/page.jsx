// pages/artists/[id].js
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
  User,
  Music,
  Paintbrush,
  Camera,
  Theater,
  MapPin,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  Info,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Users,
  Clock1,
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

// Mock data for a Sri Lankan artist
const artist = {
  id: 1,
  name: "Nimali Perera",
  category: "Traditional Dancer",
  specialty: "Kandyan Dance",
  rating: 4.9,
  reviews: 128,
  location: "Kandy, Sri Lanka",
  yearsActive: 15,
  languages: ["Sinhala", "English", "Tamil"],
  images: [
    "/artist-main.jpg",
    "/artist-1.jpg",
    "/artist-2.jpg",
    "/artist-3.jpg",
    "/artist-4.jpg",
  ],
  contact: {
    phone: "+94 76 123 4567",
    email: "nimali.perera@gmail.com",
    social: {
      facebook: "nimali.perera.dance",
      instagram: "nimali_kandyan",
      youtube: "nimali_perera_official",
    },
    website: "www.nimaliperera.com",
  },
  about:
    "Nimali Perera is a renowned Kandyan dancer with over 15 years of experience performing locally and internationally. She specializes in traditional Sri Lankan dance forms and has trained under master dancers at the Kandyan Art Association.",
  performanceDetails: {
    duration: "1-2 hours",
    groupSize: "1-10 performers",
    travel: "Available islandwide",
    requirements: "Stage area 4x4m minimum, sound system",
  },
  pricing: {
    basic: "LKR 25,000",
    premium: "LKR 50,000",
    notes: "Prices vary based on event type and location",
  },
  services: [
    "Traditional Kandyan dance performances",
    "Cultural shows for tourists",
    "Wedding performances",
    "Corporate event entertainment",
    "Dance workshops",
    "Private lessons",
  ],
  reviews: [
    {
      id: 1,
      user: "Traveler123",
      rating: 5,
      comment:
        "Nimali's performance was the highlight of our wedding! Her grace and skill were breathtaking.",
      date: "2023-06-15",
    },
    {
      id: 2,
      user: "CulturalExplorer",
      rating: 5,
      comment:
        "Authentic and mesmerizing performance. She explained the cultural significance which made it even more special.",
      date: "2023-05-22",
    },
    {
      id: 3,
      user: "EventPlanner",
      rating: 4,
      comment:
        "Professional and punctual. Our corporate clients loved the show!",
      date: "2023-04-10",
    },
  ],
  upcomingAvailability: [
    { date: "2023-08-15", status: "Available" },
    { date: "2023-08-20", status: "Booked" },
    { date: "2023-08-25", status: "Available" },
    { date: "2023-08-30", status: "Available" },
  ],
  portfolio: [
    {
      title: "Esala Perahera Performance",
      description: "Lead dancer at Kandy Esala Perahera 2022",
      image: "/portfolio-1.jpg",
    },
    {
      title: "Cultural Showcase",
      description: "Colombo International Dance Festival",
      image: "/portfolio-2.jpg",
    },
  ],
};

const ArtistDetailPage = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingType, setBookingType] = useState("basic");
  // const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

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
        id: artist.reviews.length + 1,
        user: userName || "Anonymous",
        rating,
        comment: review,
        date: new Date().toISOString().split("T")[0],
      };
      artist.reviews.unshift(newReview);
      setReview("");
      setRating(0);
      setUserName("");
      alert("Thank you for your review!");
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (bookingDate) {
      alert(
        `Booking request sent for ${bookingDate}! ${artist.name} will contact you shortly.`
      );
      setBookingDate("");
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === artist.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? artist.images.length - 1 : prevIndex - 1
    );
  };

  const getCategoryIcon = () => {
    switch (artist.category.toLowerCase()) {
      case "traditional dancer":
        return <Theater className="h-6 w-6 text-purple-500" />;
      case "musician":
        return <Music className="h-6 w-6 text-blue-500" />;
      case "painter":
        return <Paintbrush className="h-6 w-6 text-orange-500" />;
      case "photographer":
        return <Camera className="h-6 w-6 text-green-500" />;
      default:
        return <User className="h-6 w-6" />;
    }
  };

  const renderImageGallery = () => {
    const images = artist.images;
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
            alt={artist.name}
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
                alt={`${artist.name} ${index + 1}`}
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
              alt={`${artist.name} 1`}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={images[1]}
              alt={`${artist.name} 2`}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={images[2]}
              alt={`${artist.name} 3`}
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
                alt={`${artist.name} ${index + 1}`}
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
          alt={`${artist.name} ${currentImageIndex + 1}`}
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
                    {getCategoryIcon()}
                    <div>
                      <h1 className="text-2xl font-bold">{artist.name}</h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        {artist.category} • {artist.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-bold">{artist.rating}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        ({artist.reviews.length} reviews)
                      </span>
                    </div>
                    <Badge variant="outline">{artist.specialty}</Badge>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {artist.about}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">
                    Performance Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Clock1 className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Duration</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {artist.performanceDetails.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Group Size</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {artist.performanceDetails.groupSize}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Travel</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {artist.performanceDetails.travel}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Requirements</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {artist.performanceDetails.requirements}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {artist.services.map((service, index) => (
                    <Badge key={index} variant="secondary">
                      {service}
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
                  <TabsList className="mb-4 grid grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold mb-2">
                          Languages Spoken
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {artist.languages.map((language, index) => (
                            <Badge key={index} variant="outline">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-2">
                          Performance History
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {artist.name} has been performing professionally for{" "}
                          {artist.yearsActive} years, with experience at:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">
                              Kandy Esala Perahera (2015-2023)
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">
                              Colombo International Dance Festival
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">
                              Various cultural shows for international
                              dignitaries
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="portfolio">
                    <h3 className="text-lg font-bold mb-4">Recent Work</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {artist.portfolio.map((item, index) => (
                        <Card key={index} className="dark:bg-zinc-700">
                          <CardContent className="p-0">
                            <div className="relative h-48">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover rounded-t-lg"
                              />
                            </div>
                            <div className="p-4">
                              <h4 className="font-bold">{item.title}</h4>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {item.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
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
                          Customer Reviews ({artist.reviews.length})
                        </h3>
                        <div className="space-y-6">
                          {artist.reviews.map((review) => (
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

          {/* Right Column - Booking and Additional Info */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            {/* <Card className="mb-6 dark:bg-zinc-800 sticky top-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Book This Artist</h2>

                <form onSubmit={handleBookingSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Performance Type
                    </label>
                    <div className="flex gap-2 mb-4">
                      <Button
                        type="button"
                        variant={
                          bookingType === "basic" ? "default" : "outline"
                        }
                        onClick={() => setBookingType("basic")}
                        className="flex-1"
                      >
                        Basic (LKR {artist.pricing.basic})
                      </Button>
                      <Button
                        type="button"
                        variant={
                          bookingType === "premium" ? "default" : "outline"
                        }
                        onClick={() => setBookingType("premium")}
                        className="flex-1"
                      >
                        Premium (LKR {artist.pricing.premium})
                      </Button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Preferred Date
                    </label>
                    <Input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Availability
                    </label>
                    <div className="space-y-2">
                      {artist.upcomingAvailability.map((slot, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span>{slot.date}</span>
                          <Badge
                            variant={
                              slot.status === "Available"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {slot.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full mb-4">
                    Request Booking
                  </Button>

                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {artist.pricing.notes}
                  </p>
                </form>
              </CardContent>
            </Card> */}

            {/* Contact Card */}
            <Card className="mb-6 dark:bg-zinc-800">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Contact Artist</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                      <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {artist.contact.phone}
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
                        {artist.contact.email}
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
                        {artist.contact.website}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Social Media</h3>
                  <div className="flex gap-3">
                    {artist.contact.social.facebook && (
                      <a
                        href={`https://facebook.com/${artist.contact.social.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="icon">
                          <Facebook className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    {artist.contact.social.instagram && (
                      <a
                        href={`https://instagram.com/${artist.contact.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="icon">
                          <Instagram className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    {artist.contact.social.youtube && (
                      <a
                        href={`https://youtube.com/${artist.contact.social.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="icon">
                          <Youtube className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
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
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Full refund if cancelled 14+ days before event
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            50% refund if cancelled 7-14 days before
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            No refund for cancellations within 7 days
                          </span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="requirements">
                    <AccordionTrigger>
                      Performance Requirements
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Minimum 4x4m performance area
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Dressing room with mirror
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Sound system for music
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Parking space for equipment vehicle
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

export default ArtistDetailPage;
