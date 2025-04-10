"use client";
import React, { useEffect, useState } from "react";
import { Search, MapPin, Star, Filter, Calendar, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CustomGuestSelector from "../Components/PassengerPicker";
import SideBarFilter from "../Components/SideBarFilter";

import { Button } from "@/components/ui/button";
import HotelCard from "../Components/HotelCard";
import CustomizedSectionWithCarousel from "../Components/CarausalSposored";
import SecNav from "../Components/SecNav";

export default function HotelsListingPage() {
  const [lastscrollY, setlastscrollY] = useState(0);
  const [isfixed, setisfixed] = useState(false);

  useEffect(() => {
    const handlescroll = () => {
      const currentscrollY = window.scrollY;

      if (currentscrollY > 50 && currentscrollY < lastscrollY) {
        setisfixed(true);
      } else {
        setisfixed(false);
      }
      setlastscrollY(currentscrollY);
    };

    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, [lastscrollY]);

  const hotels = [
    {
      id: 1,
      name: "Shangri-La Colombo",
      location: "Galle Face, Colombo",
      rating: 4.8,
      reviews: 320,
      price: 220,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/18/22/f7/shangri-la-hotel-jakarta.jpg?w=700&h=-1&s=1",
      amenities: ["Free WiFi", "Pool", "Spa", "Gym", "Seaside View"],
      distance: "0.5 km from Galle Face Beach",
    },
    {
      id: 2,
      name: "Cinnamon Grand Colombo",
      location: "Colombo 03, Sri Lanka",
      rating: 4.7,
      reviews: 280,
      price: 200,
      image:
        "https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/50826/photos/8493018_XL.jpg?tr=w-1200%2Cfo-auto",
      amenities: ["Free WiFi", "Swimming Pool", "Fine Dining", "Bar", "Spa"],
      distance: "1 km from Colombo City Center",
    },
    {
      id: 3,
      name: "Heritance Kandalama",
      location: "Dambulla, Sri Lanka",
      rating: 4.9,
      reviews: 400,
      price: 180,
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/34687318.jpg?k=76cc5b29b46c9e95814271db622f8ce20030cc266d29818b451242f5c6e955c1&o=&hp=1",
      amenities: [
        "Infinity Pool",
        "Jungle View",
        "Free WiFi",
        "Luxury Spa",
        "Restaurant",
      ],
      distance: "5 km from Sigiriya Rock",
    },
    {
      id: 4,
      name: "Jetwing Lighthouse",
      location: "Galle, Sri Lanka",
      rating: 4.6,
      reviews: 270,
      price: 190,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2e76GDOJ3bb0UZsJKp1CtvpjhJac04w2iQ&s",
      amenities: [
        "Beachfront",
        "Free WiFi",
        "Swimming Pool",
        "Spa",
        "Fine Dining",
      ],
      distance: "2 km from Galle Fort",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full mx-auto  dark:bg-zinc-900/90 pt-14">
      <SecNav classnames="shadow-sm" />
      <div className="mt-14">
        {/* Search Bar */}
        <div
          className={`fixed transition-all duration-300 ease-in-out bg-j-primary-hover dark:bg-blue-950 py-6 ${
            isfixed ? " top-28 left-0 w-full shadow-md z-52" : "relative"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />

                  <Input
                    type="text"
                    placeholder="Where are you going?"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <Input
                    type="date"
                    placeholder="Where are you going?"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <Input
                    type="date"
                    placeholder="?"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="relative">
                  <CustomGuestSelector showlabel={false} />
                </div>
                <div className="relative">
                  <Select defaultValue="Couple">
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1a0c">
                        Budget Tourer/Backpacker
                      </SelectItem>
                      <SelectItem value="Business Traveler">
                        Business Traveler
                      </SelectItem>
                      <SelectItem value="Couple">Couple</SelectItem>
                      <SelectItem value="2a0c">Digital Nomad</SelectItem>
                      <SelectItem value="2a0c">Family</SelectItem>
                      <SelectItem value="2a0c">Group</SelectItem>
                      <SelectItem value="2a0c">Honeymooners</SelectItem>
                      <SelectItem value="2a0c">Researcher/Student</SelectItem>
                      <SelectItem value="2a0c">Solo Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="">
                  <Search size={18} />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className=" mx-auto container px-4 py-8 sm:px-0">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <SideBarFilter />

            {/* Hotels List */}
            <div className="w-full container">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-md lg:text-2xl">
                  4 properties found
                </h2>
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Recommended" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sort by:</SelectLabel>
                        <SelectItem value="Recommended">Recommended</SelectItem>
                        <SelectItem value="lowtohigh">
                          Price (low to high)
                        </SelectItem>
                        <SelectItem value="hightolow">
                          Price (high to low)
                        </SelectItem>
                        <SelectItem value="grapes">
                          Rating (high to low)
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Hotel Cards */}
              <div className="">
                <CustomizedSectionWithCarousel
                  gridItemsToShowBreakpoints={{ sm: 1, md: 2, lg: 3, xl: 4 }}
                  type="hotel"
                  displayMode="grid"
                  destinations={hotels}
                />
              </div>

              {/* Pagination */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
