// pages/events.js
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
  MapPin,
  Filter,
  Sun,
  Moon,
  X,
  Ticket,
  Music,
  Utensils,
  Dumbbell,
  Church,
  Paintbrush,
  Briefcase,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import SecNav from "../Components/SecNav";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";

const EventsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState(new Date());
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortOption, setSortOption] = useState("price-low");
  const [filters, setFilters] = useState({
    location: "",
    eventType: searchParams.get("type") || "all",
  });
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [lastscrollY, setlastscrollY] = useState(0);
  const [isfixed, setisfixed] = useState(false);
  const [eventsData, setEventsData] = useState([]);
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

  useEffect(() => {
    const fetchEventsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/list/events`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setEventsData(response.data.data);
        setFilteredData(response.data.data);

        // Apply URL filter if present
        const urlType = searchParams.get("type");
        if (urlType) {
          setFilters((prev) => ({ ...prev, eventType: urlType }));
          addFilter("category", urlType);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, [searchParams]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let results = [...eventsData];

    if (filters.location) {
      results = results.filter((item) =>
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.eventType !== "all") {
      results = results.filter(
        (item) =>
          item.category.toLowerCase() === filters.eventType.toLowerCase()
      );
    }

    if (activeFilters.length > 0) {
      results = results.filter((item) => {
        return activeFilters.every((filter) => {
          if (filter.type === "category") {
            return item.category.toLowerCase() === filter.value.toLowerCase();
          }
          if (filter.type === "location") {
            return item.location.toLowerCase() === filter.value.toLowerCase();
          }
          if (filter.type === "date") {
            const eventDate = new Date(item.date);
            const filterDate = new Date(filter.value);
            return eventDate.toDateString() === filterDate.toDateString();
          }
          return true;
        });
      });
    }

    results = results.filter(
      (item) =>
        item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    switch (sortOption) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "date":
        results.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }

    setFilteredData(results);
  }, [filters, activeFilters, sortOption, priceRange, eventsData]);

  const addFilter = (type, value) => {
    if (
      !activeFilters.some(
        (filter) => filter.type === type && filter.value === value
      )
    ) {
      setActiveFilters([...activeFilters, { type, value }]);
    }

    // Update URL if category filter
    if (type === "category") {
      router.push(`/events?type=${value}`);
    }
  };

  const removeFilter = (type, value) => {
    setActiveFilters(
      activeFilters.filter(
        (filter) => !(filter.type === type && filter.value === value)
      )
    );

    // Update URL if category filter is removed
    if (type === "category") {
      router.push("/events");
    }
  };

  const handleSearch = () => {
    console.log("Searching with parameters:", filters);
  };

  const getEventIcon = (type) => {
    switch (type.toLowerCase()) {
      case "cultural":
        return <Ticket className="h-4 w-4" />;
      case "music":
        return <Music className="h-4 w-4" />;
      case "food":
        return <Utensils className="h-4 w-4" />;
      case "sports":
        return <Dumbbell className="h-4 w-4" />;
      case "religious":
        return <Church className="h-4 w-4" />;
      case "art":
        return <Paintbrush className="h-4 w-4" />;
      case "business":
        return <Briefcase className="h-4 w-4" />;
      case "festival":
        return <Ticket className="h-4 w-4" />;
      default:
        return <Ticket className="h-4 w-4" />;
    }
  };

  if (!mounted) {
    return null;
  }

  const eventCategories = [
    ...new Set(eventsData.map((item) => item.category)),
  ];
  const eventLocations = [
    ...new Set(eventsData.map((item) => item.location)),
  ];
  const eventDates = [
    ...new Set(eventsData.map((item) => new Date(item.date).toDateString())),
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
                        placeholder="Location"
                        value={filters.location}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <Button className="w-full md:w-auto " onClick={handleSearch}>
                    Search Events
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
                  <h3 className="font-medium mb-2">Price Range (LKR)</h3>
                  <div className="px-2">
                    <Slider
                      range
                      min={0}
                      max={50000}
                      step={1000}
                      value={priceRange}
                      onChange={setPriceRange}
                      trackStyle={[{ backgroundColor: "#017E7F" }]}
                      handleStyle={[
                        { borderColor: "#017E7F", backgroundColor: "white" },
                        { borderColor: "#017E7F", backgroundColor: "white" },
                      ]}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>Rs. {priceRange[0].toLocaleString()}</span>
                      <span>Rs. {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Event Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {eventCategories.map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${activeFilters.some(
                          (f) => f.type === "category" && f.value === category
                        )
                          ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                          : ""
                          }`}
                        onClick={() => {
                          if (
                            activeFilters.some(
                              (f) => f.type === "category" && f.value === category
                            )
                          ) {
                            removeFilter("category", category);
                          } else {
                            addFilter("category", category);
                          }
                        }}
                      >
                        {getEventIcon(category)}
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Location</h3>
                  <div className="flex flex-wrap gap-2">
                    {eventLocations.map((location) => (
                      <Button
                        key={location}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${activeFilters.some(
                          (f) => f.type === "location" && f.value === location
                        )
                          ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                          : ""
                          }`}
                        onClick={() => {
                          if (
                            activeFilters.some(
                              (f) => f.type === "location" && f.value === location
                            )
                          ) {
                            removeFilter("location", location);
                          } else {
                            addFilter("location", location);
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
                  <h3 className="font-medium mb-2">Date</h3>
                  <div className="space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            if (selectedDate) {
                              setDate(selectedDate);
                              addFilter("date", selectedDate.toISOString());
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setActiveFilters([]);
                    setPriceRange([0, 50000]);
                    setFilters({
                      location: "",
                      eventType: "all",
                    });
                    setDate(new Date());
                    router.push("/events");
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
                  <h3 className="font-medium mb-2">Price Range (LKR)</h3>
                  <div className="px-2">
                    <Slider
                      range
                      min={0}
                      max={50000}
                      step={1000}
                      value={priceRange}
                      onChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>Rs. {priceRange[0].toLocaleString()}</span>
                      <span>Rs. {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Event Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {eventCategories.map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${activeFilters.some(
                          (f) => f.type === "category" && f.value === category
                        )
                          ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                          : ""
                          }`}
                        onClick={() => {
                          if (
                            activeFilters.some(
                              (f) => f.type === "category" && f.value === category
                            )
                          ) {
                            removeFilter("category", category);
                          } else {
                            addFilter("category", category);
                          }
                        }}
                      >
                        {getEventIcon(category)}
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Location</h3>
                  <div className="flex flex-wrap gap-2">
                    {eventLocations.map((location) => (
                      <Button
                        key={location}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${activeFilters.some(
                          (f) => f.type === "location" && f.value === location
                        )
                          ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                          : ""
                          }`}
                        onClick={() => {
                          if (
                            activeFilters.some(
                              (f) => f.type === "location" && f.value === location
                            )
                          ) {
                            removeFilter("location", location);
                          } else {
                            addFilter("location", location);
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
                  <h3 className="font-medium mb-2">Date</h3>
                  <div className="space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            if (selectedDate) {
                              setDate(selectedDate);
                              addFilter("date", selectedDate.toISOString());
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setActiveFilters([]);
                    setPriceRange([0, 50000]);
                    setDate(new Date());
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
                  {filteredData.length} events found
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
                  <SelectItem value="date">Date (Soonest)</SelectItem>
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
                    {filter.type === "category" && getEventIcon(filter.value)}
                    {filter.type === "location" && <span>Location:</span>}
                    {filter.type === "date" && <span>Date:</span>}
                    {filter.type === "date"
                      ? format(new Date(filter.value), "PPP")
                      : filter.value}
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
              {loading ? (
                <div className="text-center py-12">
                  <p>Loading events...</p>
                </div>
              ) : filteredData.length > 0 ? (
                filteredData.map((event) => (
                  <div
                    key={event.id}
                    className="group relative w-full inline-block p-0.5 rounded-2xl overflow-hidden border-transparent hover:border-transparent transition-all duration-300"
                  >
                    <Card className="overflow-hidden relative z-10 p-0 m-0 dark:bg-zinc-900">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4">
                          <img
                            src={event.images[0]}
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4 md:ps-6 md:py-6 md:w-3/4 ">
                          <div className="flex flex-col md:flex-row justify-between h-full">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                {getEventIcon(event.category)}
                                <h3 className="text-lg font-bold">
                                  {event.title}
                                </h3>
                                {event.featured && (
                                  <Badge
                                    className="bg-green-400/30"
                                    variant="success"
                                  >
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 mb-2">
                                {event.organizer}
                              </p>
                              <div className="mb-4">
                                <span className="text-yellow-500">★</span>
                                <span className="font-bold">{event.rating}</span>
                              </div>
                            </div>
                            <div className="flex flex-col text-right justify-between h-full">
                              <div className="text-xl font-bold">
                                Rs. {event.price.toLocaleString()}
                              </div>
                              <div className="text-end">
                                <div className="text-gray-600 dark:text-gray-400">
                                  {format(new Date(event.date), "PPP")}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">
                                  {event.time}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-4">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <div className="text-gray-600 dark:text-gray-400">
                              {event.location}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="secondary">
                              {event.category}
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {event.description}
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
                    No events found with the current filters.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setActiveFilters([]);
                      setPriceRange([0, 50000]);
                      setFilters({
                        location: "",
                        eventType: "all",
                      });
                      setDate(new Date());
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

export default EventsPage;