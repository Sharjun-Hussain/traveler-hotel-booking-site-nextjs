"use client";
import React, { useEffect, useRef, useState } from "react";
import { Search, MapPin, Star, Filter, Calendar, Users, FilterXIcon, SlidersHorizontal, ArrowUpDown, Map, X } from "lucide-react";
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
import SecNav from "../Components/SecNav";
import MobileNav from "@/components/ui/MobileNav";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import axios from "axios";
import CustomizedHotelCardSectionWithCarousel from "../Components/HotelsCardsLayout";

export default function HotelsListingPage() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeBottomSheet, setActiveBottomSheet] = useState(null);
  const [FetchedHotels, setFetchedHotels] = useState([])
  const searchRef = useRef(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (window.innerWidth < 768 && isSearchExpanded) {
          setIsSearchExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchExpanded]);

  // Scroll handler for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only apply sticky behavior on large screens
      if (window.innerWidth >= 768) {
        if (currentScrollY > 200) { // Start showing sticky header after scrolling down 200px
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (window.innerWidth < 768) {
      setIsSearchExpanded(false);
    }
    // Perform search logic here
  };

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer/list/properties`, {
        headers: {

          "Content-Type": "application/json",
        }
      }

      );

      if (response.status === 200) {
        setFetchedHotels(response.data.data)
      }
      else {
        console.error("Falied to fatch hotels")
      }

    }
    fetchHotels()
  }, [])


  // const hotels = [
  //   {
  //     id: 1,
  //     name: "Shangri-La Colombo",
  //     location: "Galle Face, Colombo",
  //     rating: 4.8,
  //     reviews: 320,
  //     price: 220,
  //     image:
  //       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/18/22/f7/shangri-la-hotel-jakarta.jpg?w=700&h=-1&s=1",
  //     amenities: ["Free WiFi", "Pool", "Spa", "Gym", "Seaside View"],
  //     distance: "0.5 km from Galle Face Beach",
  //   },
  //   {
  //     id: 2,
  //     name: "Cinnamon Grand Colombo",
  //     location: "Colombo 03, Sri Lanka",
  //     rating: 4.7,
  //     reviews: 280,
  //     price: 200,
  //     image:
  //       "https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/50826/photos/8493018_XL.jpg?tr=w-1200%2Cfo-auto",
  //     amenities: ["Free WiFi", "Swimming Pool", "Fine Dining", "Bar", "Spa"],
  //     distance: "1 km from Colombo City Center",
  //   },
  //   {
  //     id: 3,
  //     name: "Heritance Kandalama",
  //     location: "Dambulla, Sri Lanka",
  //     rating: 4.9,
  //     reviews: 400,
  //     price: 180,
  //     image:
  //       "https://cf.bstatic.com/xdata/images/hotel/max1024x768/34687318.jpg?k=76cc5b29b46c9e95814271db622f8ce20030cc266d29818b451242f5c6e955c1&o=&hp=1",
  //     amenities: [
  //       "Infinity Pool",
  //       "Jungle View",
  //       "Free WiFi",
  //       "Luxury Spa",
  //       "Restaurant",
  //     ],
  //     distance: "5 km from Sigiriya Rock",
  //   },
  //   {
  //     id: 4,
  //     name: "Jetwing Lighthouse",
  //     location: "Galle, Sri Lanka",
  //     rating: 4.6,
  //     reviews: 270,
  //     price: 190,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2e76GDOJ3bb0UZsJKp1CtvpjhJac04w2iQ&s",
  //     amenities: [
  //       "Beachfront",
  //       "Free WiFi",
  //       "Swimming Pool",
  //       "Spa",
  //       "Fine Dining",
  //     ],
  //     distance: "2 km from Galle Fort",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gray-50 w-full mx-auto duration-300 dark:bg-zinc-900/90 lg:pt-14">
      <SecNav classnames="shadow-sm" />
      <MobileNav />

      {/* Search Bar Container - Modified for sticky behavior */}
      <div
        ref={searchRef}
        className={`
          transition-all duration-300 ease-in-out  mt-16
          ${isSticky ?
            "fixed lg:top-14 left-0 right-0 z-40 bg-j-primary dark:bg-zinc-800 shadow-lg transition-all duration-300" :
            "relative bg-j-primary-hover dark:bg-blue-950 transition-all duration-300"
          }
        `}
      >
        <div className={`${isSearchExpanded ? "fixed inset-0 bg-white dark:bg-zinc-900 z-50 overflow-y-auto" : "hidden md:block"}`}>
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isSearchExpanded ? "py-4" : "py-4"}`}>
            {isSearchExpanded && (
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Search</h2>
                <button onClick={() => setIsSearchExpanded(false)}>
                  <X size={24} />
                </button>
              </div>
            )}

            <form
              onSubmit={handleSearchSubmit}
              className={`
                bg-white dark:bg-zinc-800 rounded-lg shadow p-4 
                ${isSticky ? "border border-gray-200 dark:border-zinc-700" : ""}
              `}
            >
              <div className="grid items-center grid-cols-1 md:grid-cols-6 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Where are you going?"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                  <Input
                    type="date"
                    placeholder="Check-in"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                  <Input
                    type="date"
                    placeholder="Check-out"
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
                      <SelectItem value="1a0c">Budget Tourer/Backpacker</SelectItem>
                      <SelectItem value="Business Traveler">Business Traveler</SelectItem>
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

                <Button type="submit" className="w-full">
                  <Search size={18} className="mr-2" />
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${isSticky ? "mt-14" : ""}`}>
        {/* Mobile search trigger button */}
        {!isSearchExpanded && (
          <div className="md:hidden p-4">
            <button
              onClick={() => setIsSearchExpanded(true)}
              className="w-full bg-white dark:bg-zinc-800 rounded-lg shadow p-3 flex items-center gap-2"
            >
              <MapPin className="text-gray-400" size={18} />
              <span className="text-sm font-medium">Where are you going?</span>
            </button>
          </div>
        )}

        <main className="mx-auto container px-4 lg:py-8 sm:px-0">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <SideBarFilter className="hidden lg:block" />

            {/* Hotels List */}
            <div className="w-full container">
              <div className="w-full h-12">
                {/* Mobile Filter Bar */}
                <div className="md:hidden sticky top-28 z-30 dark:bg-zinc-800 border-b dark:border-zinc-700">
                  <div className="container mx-auto px-4">
                    <div className="flex justify-between">
                      <Drawer open={activeBottomSheet === "filter"} onOpenChange={(open) => setActiveBottomSheet(open ? "filter" : null)}>
                        <DrawerTrigger asChild>
                          <button className="flex items-center gap-1 px-3 py-2 text-sm">
                            <SlidersHorizontal size={16} />
                            <span>Filters</span>
                          </button>
                        </DrawerTrigger>
                        <DrawerContent className="h-screen">
                          <DrawerHeader className="text-left">Filters</DrawerHeader>
                          <div className="p-4 overflow-y-auto">
                            <SideBarFilter />
                          </div>
                        </DrawerContent>
                      </Drawer>

                      <Drawer open={activeBottomSheet === "sort"} onOpenChange={(open) => setActiveBottomSheet(open ? "sort" : null)}>
                        <DrawerTrigger asChild>
                          <button className="flex items-center gap-1 px-3 py-2 text-sm">
                            <ArrowUpDown size={20} /> <span>Sort</span>
                          </button>
                        </DrawerTrigger>
                        <DrawerContent className="h-[40vh]">
                          <DrawerHeader className="text-left">Sort by</DrawerHeader>
                          <div className="p-4">
                            <Select>
                              <SelectTrigger className="w-full mb-2">
                                <SelectValue placeholder="Recommended" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Sort by:</SelectLabel>
                                  <SelectItem value="Recommended">Recommended</SelectItem>
                                  <SelectItem value="lowtohigh">Price (low to high)</SelectItem>
                                  <SelectItem value="hightolow">Price (high to low)</SelectItem>
                                  <SelectItem value="grapes">Rating (high to low)</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </DrawerContent>
                      </Drawer>

                      <button className="flex items-center gap-1 px-3 py-2 text-sm">
                        <Map size={20} /> <span>Map</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <h2 className="font-bold text-md lg:text-2xl">
                  {FetchedHotels.length} properties found
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


              {FetchedHotels.length === 0 && (
                <div className="text-center mt-8">
                  <p className="text-gray-500">No hotels found for your search criteria.</p>
                </div>
              )}

              {/* Hotel Cards */}
              <div className="">
                <CustomizedHotelCardSectionWithCarousel
                  gridItemsToShowBreakpoints={{ sm: 1, md: 2, lg: 3, xl: 4 }}
                  type="hotel"
                  entityName="Hotels"
                  displayMode="grid"
                  destinations={FetchedHotels}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div >
  );
}