// pages/transport.js
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useSearchParams, useRouter } from "next/navigation";
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
  Phone,
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
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Skeleton for a transport card
const TransportCardSkeleton = () => (
  <div className="group relative w-full inline-block p-0.5 rounded-2xl overflow-hidden border-transparent transition-all duration-300">
    <Card className="overflow-hidden relative z-10 p-0 m-0 dark:bg-zinc-900">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4">
          <Skeleton height={120} width="100%" />
        </div>
        <div className="p-4 md:ps-6 md:py-6 md:w-3/4">
          <Skeleton width={120} height={24} />
          <Skeleton count={2} />
          <div className="mb-4">
            <Skeleton width={60} />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Skeleton width={80} height={24} />
            <Skeleton width={80} height={24} />
          </div>
        </div>
      </div>
    </Card>
  </div>
);

const TransportPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState(new Date());
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortOption, setSortOption] = useState("price-low");
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    transportType: searchParams.get("type") || "all",
  });
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [lastscrollY, setlastscrollY] = useState(0);
  const [isfixed, setisfixed] = useState(false);
  const [transportData, setTransportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

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

  const transformTransportData = (apiData) => {
    return apiData.map((item) => {
      const firstImage = item.images?.length > 0 ? item.images[0].imageUrl : "";
      const firstTransportType = item.transportTypes?.length > 0
        ? item.transportTypes[0].name
        : "Unknown";

      return {
        id: `${item.id}`,
        title: item.title || "Untitled Transport",
        images: item.images?.map((img) => img.imageUrl) || [],
        transportType: firstTransportType,
        vistaVerified: item.vistaVerified || false,
        operatorName: item.title || "Unknown Operator",
        pricePerKmUSD: 0.5, // Default value
        amenities: [],
        reviews: {
          vistaReview: {
            rating: 4.5,
            text: "Good service",
          },
          travelerReviews: [],
        },
        contactDetails: {
          phone: item.phone || "",
          email: item.email || "",
          website: item.website || "",
        },
        description: item.description || "No description available",
        location: {
          departureCity: item.city || "Unknown",
          arrivalCity: item.city || "Unknown",
          coordinates: {
            lat: 0,
            lng: 0,
          },
        },
        type: "Transport",
      };
    });
  };

  useEffect(() => {
    const fetchTransportData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer/list/transport-agencies`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log(response.data.data);

        const transformedData = transformTransportData(response.data.data);
        setTransportData(transformedData);
        setFilteredData(transformedData);



        // Apply URL filter if present
        const urlType = searchParams.get("type");


        if (urlType) {
          setFilters((prev) => ({ ...prev, transportType: urlType }));
          addFilter("vehicle", urlType);

        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTransportData();
  }, [searchParams]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let results = [...transportData];

    if (filters.from) {
      results = results.filter((item) =>
        item.location.departureCity
          .toLowerCase()
          .includes(filters.from.toLowerCase())
      );
    }

    if (filters.to) {
      results = results.filter((item) =>
        item.location.arrivalCity
          .toLowerCase()
          .includes(filters.to.toLowerCase())
      );
    }

    if (filters.transportType !== "all") {
      results = results.filter(
        (item) =>
          item.transportType.toLowerCase() ===
          filters.transportType.toLowerCase()
      );
    }

    if (activeFilters.length > 0) {
      results = results.filter((item) => {
        return activeFilters.every((filter) => {
          if (filter.type === "vehicle") {
            return (
              item.transportType.toLowerCase() === filter.value.toLowerCase()
            );
          }
          if (filter.type === "departure") {
            return (
              item.location.departureCity.toLowerCase() ===
              filter.value.toLowerCase()
            );
          }
          if (filter.type === "arrival") {
            return (
              item.location.arrivalCity.toLowerCase() ===
              filter.value.toLowerCase()
            );
          }
          return true;
        });
      });
    }

    results = results.filter(
      (item) =>
        parseFloat(item.pricePerKmUSD) >= priceRange[0] &&
        parseFloat(item.pricePerKmUSD) <= priceRange[1]
    );

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
  }, [filters, activeFilters, sortOption, priceRange, transportData]);

  const addFilter = (type, value) => {
    if (
      !activeFilters.some(
        (filter) => filter.type === type && filter.value === value
      )
    ) {
      setActiveFilters([...activeFilters, { type, value }]);
    }

    // Update URL if vehicle type filter
    if (type === "vehicle") {
      router.push(`/transport?type=${value}`);
    }
  };

  const removeFilter = (type, value) => {
    setActiveFilters(
      activeFilters.filter(
        (filter) => !(filter.type === type && filter.value === value)
      )
    );

    // Update URL if vehicle type filter is removed
    if (type === "vehicle") {
      router.push("/transport");
    }
  };

  const handleSearch = () => {
    console.log("Searching with parameters:", filters);
  };

  const getTransportIcon = (type) => {
    switch (type.toLowerCase()) {
      case "bus":
        return <Bus className="h-4 w-4" />;
      case "train":
        return <Train className="h-4 w-4" />;
      case "cars":
        return <Car className="h-4 w-4" />;
      case "shuttle":
        return <Shrub className="h-4 w-4" />;
      case "plane":
        return <Plane className="h-4 w-4" />;
      case "ship":
        return <Ship className="h-4 w-4" />;
      default:
        return <Car className="h-4 w-4" />;
    }
  };

  // if (!mounted) {
  //   // Show loading indicator while page is hydrating
  //   return (
  //     <div className="min-h-screen bg-white w-full dark:bg-zinc-950 transition-colors duration-200 flex flex-col items-center justify-center">
  //       <SecNav classnames="shadow-sm" />

  //       <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
  //         {/* Animated spinner */}
  //         <div className="relative w-16 h-16 mb-6">
  //           <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 dark:border-t-blue-400 border-r-blue-500 dark:border-r-blue-400 animate-spin"></div>
  //           <div className="absolute inset-1 rounded-full border-4 border-transparent border-b-blue-500 dark:border-b-blue-400 border-l-blue-500 dark:border-l-blue-400 animate-spin animation-delay-200"></div>
  //         </div>

  //         {/* Loading text */}
  //         <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
  //           Loading Transport Agents
  //         </h2>
  //         <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
  //           Please wait while we gather the latest transport options for you...
  //         </p>

  //         {/* Subtle animated dots */}
  //         <div className="mt-4 flex space-x-1">
  //           <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-bounce animation-delay-0"></div>
  //           <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-bounce animation-delay-100"></div>
  //           <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-bounce animation-delay-200"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  const vehicleTypes = [
    ...new Set(transportData.map((item) => item.transportType)),
  ];
  const departureLocations = [
    ...new Set(transportData.map((item) => item.location.departureCity)),
  ];
  const arrivalLocations = [
    ...new Set(transportData.map((item) => item.location.arrivalCity)),
  ];

  return (
    <div className="min-h-screen bg-white w-full dark:bg-zinc-950 transition-colors duration-200 pt-14">
      <SecNav classnames="shadow-sm" />
      <div className=" mt-16 transition-all duration-300">
        <div
          className={`fixed transition-all hidden lg:grid duration-300 ease-in-out  bg-j-primary py-6 dark:bg-blue-950     ${isfixed
            ? " top-30  left-0 right-0 w-full shadow-md z-52 duration-300 ease-in-out transition-all  "
            : "relative"
            }`}
        >
          <div className="  w-full ">
            <Card className="py-4 mx-12 ">
              <CardContent>
                <div className=" flex gap-4">
                  <div className="space-y-2 w-full ">
                    <div className="flex items-center relative w-[60%]">
                      <MapPin className="absolute left-3 h-4 w-4 text-gray-500" />
                      <Input
                        className="pl-10"
                        placeholder="Departure City"
                        value={filters.from}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            from: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <Button className="w-full md:w-auto " onClick={handleSearch}>
                    Search Transport
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid mx-4 grid-cols-1 lg:grid-cols-4 gap-8 lg:mt-8">
          <div className="lg:block hidden lg:col-span-1">
            <Card className="dark:bg-zinc-900">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" /> Filters
                </h2>

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

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Price Range (per km)</h3>
                  <div className="px-2">
                    <Slider
                      range
                      min={0}
                      max={50}
                      step={0.1}
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

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Vehicle Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicleTypes.map((type) => (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${activeFilters.some(
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

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Departure City</h3>
                  <div className="flex flex-wrap gap-2">
                    {departureLocations.map((location) => (
                      <Button
                        key={location}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${activeFilters.some(
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

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Arrival City</h3>
                  <div className="flex flex-wrap gap-2">
                    {arrivalLocations.map((location) => (
                      <Button
                        key={location}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${activeFilters.some(
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

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setActiveFilters([]);
                    setPriceRange([0, 50]);
                    setFilters({
                      from: "",
                      to: "",
                      transportType: "all",
                    });
                    router.push("/transport");
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </div>

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

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Price Range (per km)</h3>
                  <div className="px-2">
                    <Slider
                      range
                      min={0}
                      max={50}
                      step={0.1}
                      value={priceRange}
                      onChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>${priceRange[0].toFixed(2)}</span>
                      <span>${priceRange[1].toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Vehicle Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicleTypes.map((type) => (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${activeFilters.some(
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

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Departure City</h3>
                  <div className="flex flex-wrap gap-2">
                    {departureLocations.map((location) => (
                      <Button
                        key={location}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${activeFilters.some(
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

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Arrival City</h3>
                  <div className="flex flex-wrap gap-2">
                    {arrivalLocations.map((location) => (
                      <Button
                        key={location}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${activeFilters.some(
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

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setActiveFilters([]);
                    setPriceRange([0, 50]);
                  }}
                >
                  Reset Filters
                </Button>
              </SheetContent>
            </Sheet>
          </div>

          <div className="lg:col-span-3">
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

            <div className="space-y-4">
              {loading || !mounted ? (
                // Show skeletons while loading data
                <>
                  {[...Array(4)].map((_, i) => (
                    <TransportCardSkeleton key={i} />
                  ))}
                </>
              ) : filteredData.length > 0 ? (
                filteredData.map((transport) => (
                  <div
                    key={transport.id}
                    className="group relative w-full inline-block p-0.5 rounded-2xl overflow-hidden border-transparent hover:border-transparent transition-all duration-300"
                  >
                    <Link href={`/transport/${transport.id}`}>
                      <Card className="overflow-hidden relative z-10 p-0 m-0 dark:bg-zinc-900">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4">
                            <img
                              src={transport.images[0]}
                              alt={transport.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="p-4 md:ps-6 md:py-6 md:w-3/4 ">
                            <div className="flex flex-col md:flex-row justify-between h-full">
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
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {transport.description}
                                </p>
                                {/* <p className="text-gray-600 dark:text-gray-400 mb-2">
                                by {transport.operatorName}
                              </p> */}
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

                              <div className="flex  flex-col text-right justify-between h-full  ">
                                {/* <div className="text-xl font-bold">
                                  ${transport.pricePerKmUSD}{" "}
                                  <span className="text-sm font-normal">
                                    / km
                                  </span>
                                </div> */}
                                <div className="text-end justify-end items-end">
                                  {transport.contactDetails.phone && (
                                    <div className=" flex items-center font-bold cursor-pointer hover:bg-j-light gap-1 px-4 py-2 bg-j-primary/20  rounded-full">
                                      <span>
                                        <Phone size={16} />
                                      </span>{" "}
                                      {transport.contactDetails.phone}
                                    </div>
                                  )}
                                  {transport.contactDetails.website && (
                                    <div>{transport.contactDetails.website}</div>
                                  )}
                                  {transport.contactDetails.email && (
                                    <div>{transport.contactDetails.email}</div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                          </div> */}

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


                          </div>
                        </div>
                      </Card>
                    </Link>
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
                      setPriceRange([0, 50]);
                      setFilters({
                        from: "",
                        to: "",
                        transportType: "all",
                      });
                      router.push("/transport");
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
