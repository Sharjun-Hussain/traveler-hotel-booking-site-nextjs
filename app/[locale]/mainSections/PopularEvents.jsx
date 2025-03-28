"use client";
import React from "react";
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
import { Calendar, Clock, MapPin, Users } from "lucide-react";

// Sample data structure - you would replace this with your actual data fetching
const sampleEvents = [
  {
    id: 1,
    title: "Colombo Music Festival",
    description:
      "The biggest music festival in Sri Lanka featuring local and international artists",
    date: "2025-04-15",
    time: "18:00",
    location: "Colombo, Viharamahadevi Park",
    category: "Music",
    image: "/api/placeholder/800/500",
    attendees: 1240,
    price: 350,
  },
  {
    id: 2,
    title: "Sri Lankan Food Festival",
    description:
      "Experience the authentic flavors of Sri Lanka with over 50 food stalls",
    date: "2025-03-28",
    time: "10:00",
    location: "Galle Face Green, Colombo",
    category: "Food",
    image: "/api/placeholder/800/500",
    attendees: 850,
    price: 300,
  },
  {
    id: 3,
    title: "Kandy Esala Perahera",
    description:
      "The historic cultural procession with traditional dancers and elephants",
    date: "2025-07-20",
    time: "20:00",
    location: "Kandy",
    category: "Cultural",
    image: "/api/placeholder/800/500",
    attendees: 5000,
    price: 200,
  },
  {
    id: 4,
    title: "Tech Summit Sri Lanka",
    description:
      "Connect with tech leaders and learn about emerging technologies",
    date: "2025-05-10",
    time: "09:00",
    location: "BMICH, Colombo",
    category: "Technology",
    image: "/api/placeholder/800/500",
    attendees: 620,
    price: 50,
  },
];

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Helper function to format price in LKR
const formatPrice = (price) => {
  return `$${price.toLocaleString()}`;
};

const PopularEventsSection = ({
  title = "Popular Events in Sri Lanka",
  subtitle = "Discover the most exciting events happening around the island",
  events = sampleEvents,
  onViewAll = () => console.log("View all events clicked"),
  onBookEvent = (eventId) => console.log(`Book event ${eventId} clicked`),
}) => {
  return (
    <section className="">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>
            <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
          </div>
          {/* <Button
            variant="outline"
            className="mt-4 md:mt-0"
            onClick={onViewAll}
          >
            View All Events
          </Button> */}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <Badge className="mb-2 bg-j-secondary/80">
                    {event.category}
                  </Badge>
                  <span className="font-semibold text-j-primary">
                    {/* {formatPrice(event.price)} */} Free
                  </span>
                </div>
                <CardTitle className="text-xl line-clamp-1">
                  {event.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{event.attendees} attending</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full"
                  onClick={() => onBookEvent(event.id)}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularEventsSection;
