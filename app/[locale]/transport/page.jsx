// pages/transport.js
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  Car,
  Bus,
  Train,
  MapPin,
  Filter,
  Sun,
  Moon,
  X,
  Shrub,
  Plane,
  Ship,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import CustomGuestSelector from "../Components/PassengerPicker";
import SecNav from "../Components/SecNav";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";

// Mock data for transportation options

const transportData = [
  {
    id: "transport_001",
    title: "Colombo to Kandy - AC Tourist Bus",
    images: ["https://images.unsplash.com/photo-1593797636365-2e6fce6c6712"],
    transportType: "Bus",
    vistaVerified: true,
    operatorName: "Sri Lanka Tourist Coaches",
    pricePerKmUSD: "0.12",
    amenities: [
      { type: "Air Conditioned", available: true },
      { type: "Passenger Capacity", value: "45" },
      { type: "Luggage Space", value: "Large" },
    ],
    reviews: {
      vistaReview: {
        rating: 4.6,
        text: "Reliable transport with good comfort and ventilation.",
      },
      travelerReviews: [],
    },
    contactDetails: {
      phone: "011-2345678",
      email: "contact@touristcoaches.lk",
      website: "https://www.srilankatouristcoaches.lk",
    },
    description:
      "Spacious AC bus ideal for group and long-distance travel. Operated by licensed transport providers.",
    location: {
      departureCity: "Colombo",
      arrivalCity: "Kandy",
      coordinates: {
        lat: 7.2906,
        lng: 80.6337,
      },
    },
    type: "Transport",
  },
  {
    id: "transport_002",
    title: "Kandy to Nuwara Eliya - Luxury Train",
    images: ["https://images.unsplash.com/photo-1555685818-3258bca28f99"],
    transportType: "Train",
    vistaVerified: true,
    operatorName: "Sri Lanka Railways",
    pricePerKmUSD: "0.15",
    amenities: [
      { type: "Air Conditioned", available: true },
      { type: "Passenger Capacity", value: "80" },
      { type: "Luggage Space", value: "Medium" },
    ],
    reviews: {
      vistaReview: {
        rating: 4.7,
        text: "A scenic and comfortable way to travel through the hill country.",
      },
      travelerReviews: [],
    },
    contactDetails: {
      phone: "071-2345678",
      email: "info@srilankatrailways.lk",
      website: "https://www.srilankatrailways.lk",
    },
    description:
      "Enjoy a picturesque train ride through tea plantations and mountain landscapes in this luxury coach.",
    location: {
      departureCity: "Kandy",
      arrivalCity: "Nuwara Eliya",
      coordinates: {
        lat: 6.9333,
        lng: 80.7833,
      },
    },
    type: "Transport",
  },
  {
    id: "transport_003",
    title: "Colombo to Galle - Private Taxi",
    images: ["https://images.unsplash.com/photo-1576568276570-232b52d014c3"],
    transportType: "Taxi",
    vistaVerified: false,
    operatorName: "Galle Taxis",
    pricePerKmUSD: "0.20",
    amenities: [
      { type: "Air Conditioned", available: true },
      { type: "Passenger Capacity", value: "4" },
      { type: "Luggage Space", value: "Small" },
    ],
    reviews: {
      vistaReview: {
        rating: 4.5,
        text: "Comfortable ride, but a bit pricey.",
      },
      travelerReviews: [],
    },
    contactDetails: {
      phone: "076-3456789",
      email: "galle.taxis@sl.com",
      website: "https://www.galletaxi.lk",
    },
    description:
      "Private and comfortable ride from Colombo to Galle. Ideal for small groups or solo travelers.",
    location: {
      departureCity: "Colombo",
      arrivalCity: "Galle",
      coordinates: {
        lat: 6.0483,
        lng: 80.22,
      },
    },
    type: "Transport",
  },
  {
    id: "transport_004",
    title: "Colombo to Negombo - Airport Shuttle",
    images: ["https://images.unsplash.com/photo-1568605112-9a3b8d9eaf0f"],
    transportType: "Shuttle",
    vistaVerified: true,
    operatorName: "Negombo Airport Express",
    pricePerKmUSD: "0.08",
    amenities: [
      { type: "Air Conditioned", available: true },
      { type: "Passenger Capacity", value: "20" },
      { type: "Luggage Space", value: "Large" },
    ],
    reviews: {
      vistaReview: {
        rating: 4.8,
        text: "Convenient and fast shuttle service to the airport.",
      },
      travelerReviews: [],
    },
    contactDetails: {
      phone: "011-8765432",
      email: "info@negomboairportexpress.lk",
      website: "https://www.negomboairportexpress.lk",
    },
    description:
      "Reliable shuttle service that picks you up from Colombo and drops you at Bandaranaike International Airport.",
    location: {
      departureCity: "Colombo",
      arrivalCity: "Negombo",
      coordinates: {
        lat: 7.2091,
        lng: 79.9742,
      },
    },
    type: "Transport",
  },
];

const TransportPage = () => {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState(transportData);
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortOption, setSortOption] = useState("price-low");
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    transportType: "all",
  });
  const [priceRange, setPriceRange] = useState([0, 0.5]);
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

  useEffect(() => {
    const fetchTransportData = async () => {
      await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/transports`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    };

    fetchTransportData();
  }, []);

  // Filter options
  const vehicleTypes = ["Bus", "Train", "Taxi", "Shuttle"];
  const departureLocations = [
    ...new Set(transportData.map((item) => item.location.departureCity)),
  ];
  const arrivalLocations = [
    ...new Set(transportData.map((item) => item.location.arrivalCity)),
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let results = [...transportData];

    // Apply search params
    if (searchParams.from) {
      results = results.filter((item) =>
        item.location.departureCity
          .toLowerCase()
          .includes(searchParams.from.toLowerCase())
      );
    }

    if (searchParams.to) {
      results = results.filter((item) =>
        item.location.arrivalCity
          .toLowerCase()
          .includes(searchParams.to.toLowerCase())
      );
    }

    if (searchParams.transportType !== "all") {
      results = results.filter(
        (item) => item.transportType === searchParams.transportType
      );
    }

    // Apply active filters
    if (activeFilters.length > 0) {
      results = results.filter((item) => {
        for (const filter of activeFilters) {
          if (filter.type === "vehicle" && item.transportType !== filter.value)
            return false;
          if (
            filter.type === "departure" &&
            item.location.departureCity !== filter.value
          )
            return false;
          if (
            filter.type === "arrival" &&
            item.location.arrivalCity !== filter.value
          )
            return false;
        }
        return true;
      });
    }

    // Apply price range filter
    results = results.filter(
      (item) =>
        parseFloat(item.pricePerKmUSD) >= priceRange[0] &&
        parseFloat(item.pricePerKmUSD) <= priceRange[1]
    );

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        results.sort(
          (a, b) => parseFloat(a.pricePerKmUSD) - parseFloat(b.pricePerKmUSD)
        );
        break;
      case "price-high":
        results.sort(
          (a, b) => parseFloat(b.pricePerKmUSD) - parseFloat(a.pricePerKmUSD)
        );
        break;
      case "rating":
        results.sort(
          (a, b) => b.reviews.vistaReview.rating - a.reviews.vistaReview.rating
        );
        break;
      default:
        break;
    }

    setFilteredData(results);
  }, [searchParams, activeFilters, sortOption, priceRange]);

  const addFilter = (type, value) => {
    if (
      !activeFilters.some(
        (filter) => filter.type === type && filter.value === value
      )
    ) {
      setActiveFilters([...activeFilters, { type, value }]);
    }
  };

  const removeFilter = (type, value) => {
    setActiveFilters(
      activeFilters.filter(
        (filter) => !(filter.type === type && filter.value === value)
      )
    );
  };

  const handleSearch = () => {
    // Just use the current search params state, filters will be applied automatically via useEffect
    console.log("Searching with parameters:", searchParams);
  };

  const getTransportIcon = (type) => {
    switch (type) {
      case "Bus":
        return <Bus className="h-4 w-4" />;
      case "Train":
        return <Train className="h-4 w-4" />;
      case "Taxi":
        return <Car className="h-4 w-4" />;
      case "Shuttle":
        return <Shrub className="h-4 w-4" />;
      default:
        return <Car className="h-4 w-4" />;
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white w-full dark:bg-zinc-950 transition-colors duration-200 pt-14">
      <SecNav classnames="shadow-sm" />
      <div className=" mt-16 transition-all duration-300">
        {/* Header with Theme Toggle */}

        {/* Search Form */}

        <div
          className={`fixed transition-all hidden lg:grid duration-300 ease-in-out  bg-j-primary py-6 dark:bg-blue-950     ${
            isfixed
              ? " top-30  left-0 right-0 w-full shadow-md z-52 duration-300 ease-in-out transition-all  "
              : "relative"
          }`}
        >
          <div className="  w-full ">
            <Card className="py-4 mx-12 ">
              <CardContent>
                <div className=" flex gap-4">
                  {/* From */}
                  <div className="space-y-2 w-full ">
                    <div className="flex items-center relative w-[60%]">
                      <MapPin className="absolute left-3 h-4 w-4 text-gray-500" />
                      <Input
                        className="pl-10"
                        placeholder="Departure City"
                        value={searchParams.from}
                        onChange={(e) =>
                          setSearchParams({
                            ...searchParams,
                            from: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* To */}
                  {/* <div className="space-y-2">
                    <div className="flex items-center relative">
                      <MapPin className="absolute left-3 h-4 w-4 text-gray-500" />
                      <Input
                        className="pl-10"
                        placeholder="Arrival City"
                        value={searchParams.to}
                        onChange={(e) =>
                          setSearchParams({
                            ...searchParams,
                            to: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div> */}

                  {/* Date */}
                  {/* <div className="space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div> */}
                  {/* <div>
                    <CustomGuestSelector type="transport" showlabel={false} />
                  </div> */}
                  <Button className="w-full md:w-auto " onClick={handleSearch}>
                    Search Transport
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Area with Filters and Listings */}
        <div className="grid mx-4 grid-cols-1 lg:grid-cols-4 gap-8 lg:mt-8">
          {/* Filters Sidebar */}

          <div className="lg:block hidden lg:col-span-1">
            <Card className="dark:bg-zinc-900">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" /> Filters
                </h2>

                {/* Active Filters Display */}
                {activeFilters.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeFilters.map((filter, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {filter.value}
                        <X
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() =>
                            removeFilter(filter.type, filter.value)
                          }
                        />
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Price Range (per km)</h3>
                  <div className="px-2">
                    <Slider
                      range
                      min={0}
                      max={0.5}
                      step={0.01}
                      value={priceRange}
                      onChange={setPriceRange}
                      trackStyle={[{ backgroundColor: "#017E7F" }]}
                      handleStyle={[
                        { borderColor: "#017E7F", backgroundColor: "white" },
                        { borderColor: "#017E7F", backgroundColor: "white" },
                      ]}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>${priceRange[0].toFixed(2)}</span>
                      <span>${priceRange[1].toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle Type Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Vehicle Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicleTypes.map((type) => (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${
                          activeFilters.some(
                            (f) => f.type === "vehicle" && f.value === type
                          )
                            ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                            : ""
                        }`}
                        onClick={() => {
                          if (
                            activeFilters.some(
                              (f) => f.type === "vehicle" && f.value === type
                            )
                          ) {
                            removeFilter("vehicle", type);
                          } else {
                            addFilter("vehicle", type);
                          }
                        }}
                      >
                        {getTransportIcon(type)}
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Departure Location Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Departure City</h3>
                  <div className="flex flex-wrap gap-2">
                    {departureLocations.map((location) => (
                      <Button
                        key={location}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${
                          activeFilters.some(
                            (f) =>
                              f.type === "departure" && f.value === location
                          )
                            ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                            : ""
                        }`}
                        onClick={() => {
                          if (
                            activeFilters.some(
                              (f) =>
                                f.type === "departure" && f.value === location
                            )
                          ) {
                            removeFilter("departure", location);
                          } else {
                            addFilter("departure", location);
                          }
                        }}
                      >
                        <MapPin className="h-4 w-4" />
                        {location}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Arrival Location Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Arrival City</h3>
                  <div className="flex flex-wrap gap-2">
                    {arrivalLocations.map((location) => (
                      <Button
                        key={location}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${
                          activeFilters.some(
                            (f) => f.type === "arrival" && f.value === location
                          )
                            ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                            : ""
                        }`}
                        onClick={() => {
                          if (
                            activeFilters.some(
                              (f) =>
                                f.type === "arrival" && f.value === location
                            )
                          ) {
                            removeFilter("arrival", location);
                          } else {
                            addFilter("arrival", location);
                          }
                        }}
                      >
                        <MapPin className="h-4 w-4" />
                        {location}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Reset Filters Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setActiveFilters([]);
                    setPriceRange([0, 0.5]);
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Bottom Sheet Filter */}
          <div className="lg:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="shadow-lg flex items-center gap-2 bg-primary">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFilters.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFilters.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] p-6 rounded-t-xl">
                <SheetHeader className="mb-4">
                  <SheetTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filters
                    </div>
                    <Button variant="ghost" size="sm">
                      Done
                    </Button>
                  </SheetTitle>
                </SheetHeader>

                {/* Active Filters Display (Mobile) */}
                {activeFilters.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeFilters.map((filter, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {filter.value}
                        <X
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() =>
                            removeFilter(filter.type, filter.value)
                          }
                        />
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Price Range (Mobile) */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Price Range (per km)</h3>
                  <div className="px-2">
                    <Slider
                      range
                      min={0}
                      max={0.5}
                      step={0.01}
                      value={priceRange}
                      onChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>${priceRange[0].toFixed(2)}</span>
                      <span>${priceRange[1].toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle Type Filter (Mobile) */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Vehicle Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicleTypes.map((type) => (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${
                          activeFilters.some(
                            (f) => f.type === "vehicle" && f.value === type
                          )
                            ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                            : ""
                        }`}
                        onClick={() => {
                          if (
                            activeFilters.some(
                              (f) => f.type === "vehicle" && f.value === type
                            )
                          ) {
                            removeFilter("vehicle", type);
                          } else {
                            addFilter("vehicle", type);
                          }
                        }}
                      >
                        {getTransportIcon(type)}
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Departure Location Filter (Mobile) */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Departure City</h3>
                  <div className="flex flex-wrap gap-2">
                    {departureLocations.map((location) => (
                      <Button
                        key={location}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${
                          activeFilters.some(
                            (f) =>
                              f.type === "departure" && f.value === location
                          )
                            ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                            : ""
                        }`}
                        onClick={() => {
                          if (
                            activeFilters.some(
                              (f) =>
                                f.type === "departure" && f.value === location
                            )
                          ) {
                            removeFilter("departure", location);
                          } else {
                            addFilter("departure", location);
                          }
                        }}
                      >
                        <MapPin className="h-4 w-4" />
                        {location}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Arrival Location Filter (Mobile) */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Arrival City</h3>
                  <div className="flex flex-wrap gap-2">
                    {arrivalLocations.map((location) => (
                      <Button
                        key={location}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${
                          activeFilters.some(
                            (f) => f.type === "arrival" && f.value === location
                          )
                            ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                            : ""
                        }`}
                        onClick={() => {
                          if (
                            activeFilters.some(
                              (f) =>
                                f.type === "arrival" && f.value === location
                            )
                          ) {
                            removeFilter("arrival", location);
                          } else {
                            addFilter("arrival", location);
                          }
                        }}
                      >
                        <MapPin className="h-4 w-4" />
                        {location}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Reset Filters Button (Mobile) */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setActiveFilters([]);
                    setPriceRange([0, 0.5]);
                  }}
                >
                  Reset Filters
                </Button>
              </SheetContent>
            </Sheet>
          </div>

          {/* Transport Listings */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className=" lg:text-2xl text- font-bold ">
                  {filteredData.length} transport options found
                </span>
              </div>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Display */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeFilters.map((filter, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    {filter.type === "vehicle" &&
                      getTransportIcon(filter.value)}
                    {filter.type === "departure" && <span>From:</span>}
                    {filter.type === "arrival" && <span>To:</span>}
                    {filter.value}
                    <button
                      className="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={() => removeFilter(filter.type, filter.value)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveFilters([])}
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Transport Cards */}
            <div className="space-y-4">
              {filteredData.length > 0 ? (
                filteredData.map((transport) => (
                  <div
                    key={transport.id}
                    className="group relative w-full inline-block p-0.5 rounded-2xl overflow-hidden border-transparent hover:border-transparent transition-all duration-300"
                  >
                    <Card className="overflow-hidden relative z-10 p-0 m-0 dark:bg-zinc-900">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4">
                          <img
                            src={transport.images[0]}
                            alt={transport.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4 md:p-6 md:w-3/4">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                {getTransportIcon(transport.transportType)}
                                <h3 className="text-lg font-bold">
                                  {transport.title}
                                </h3>
                                {transport.vistaVerified && (
                                  <Badge
                                    className="bg-green-400/30"
                                    variant="success"
                                  >
                                    Vista Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 mb-2">
                                by {transport.operatorName}
                              </p>
                              <div className="mb-4">
                                <span className="text-yellow-500">★</span>
                                <span className="font-bold">
                                  {transport.reviews.vistaReview.rating}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400">
                                  {" "}
                                  ({transport.reviews.vistaReview.text})
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="bg-green-500"></div>
                              {/* <Button className="mt-2">View Details</Button> */}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <div className="text-gray-600 dark:text-gray-400">
                                  From: {transport.location.departureCity}
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <div className="text-gray-600 dark:text-gray-400">
                                  To: {transport.location.arrivalCity}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {transport.amenities.map((amenity, index) => (
                              <Badge key={index} variant="secondary">
                                {amenity.type}:{" "}
                                {amenity.available
                                  ? "Yes"
                                  : amenity.value || "No"}
                              </Badge>
                            ))}
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {transport.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-opacity duration-300" />
                  </div>
                ))
              ) : (
                <div className="text-center py-12 border rounded-lg bg-gray-50 dark:bg-zinc-900 dark:border-zinc-700">
                  <p className="text-gray-500 dark:text-gray-400">
                    No transport options found with the current filters.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setActiveFilters([]);
                      setPriceRange([0, 0.5]);
                      setSearchParams({
                        from: "",
                        to: "",
                        transportType: "all",
                      });
                    }}
                  >
                    Reset all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportPage;
