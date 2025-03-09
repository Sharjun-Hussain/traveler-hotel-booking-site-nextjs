// app/activities/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Search,
  MapPin,
  Filter,
  SortDesc,
  ArrowUpDown,
  Bus,
  Car,
  Ship,
  Train,
  Plane,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Sample Sri Lankan activities data
const sriLankanActivities = [
  {
    id: 1,
    title: "Sigiriya Rock Fortress Tour",
    description: "Explore the ancient rock fortress with a guided tour",
    location: "Sigiriya",
    price: 45,
    currency: "USD",
    rating: 4.8,
    reviews: 342,
    duration: "4 hours",
    tags: ["Culture", "History", "Adventure"],
    image: "/api/placeholder/800/500",
    transport: ["Bus", "Car"],
    featured: true,
    facilities: ["Guide", "Water", "Snacks"],
    difficulty: "Moderate",
  },
  {
    id: 2,
    title: "Yala National Park Safari",
    description:
      "Spot leopards and other wildlife in Sri Lanka's famous national park",
    location: "Yala",
    price: 75,
    currency: "USD",
    rating: 4.7,
    reviews: 518,
    duration: "6 hours",
    tags: ["Wildlife", "Nature", "Photography"],
    image: "/api/placeholder/800/500",
    transport: ["Jeep", "Bus"],
    featured: true,
    facilities: ["Guide", "Water", "Meals"],
    difficulty: "Easy",
  },
  {
    id: 3,
    title: "Kandy Temple of the Tooth Tour",
    description:
      "Visit the sacred Buddhist temple housing Buddha's tooth relic",
    location: "Kandy",
    price: 25,
    currency: "USD",
    rating: 4.6,
    reviews: 287,
    duration: "2 hours",
    tags: ["Culture", "Religion", "History"],
    image: "/api/placeholder/800/500",
    transport: ["Walk", "Car", "Bus"],
    featured: false,
    facilities: ["Guide", "Cultural Experience"],
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "Ella Rock Hike",
    description: "Challenging hike with breathtaking views of hill country",
    location: "Ella",
    price: 35,
    currency: "USD",
    rating: 4.9,
    reviews: 204,
    duration: "5 hours",
    tags: ["Hiking", "Nature", "Adventure"],
    image: "/api/placeholder/800/500",
    transport: ["Walk", "Train"],
    featured: false,
    facilities: ["Guide", "Water"],
    difficulty: "Hard",
  },
  {
    id: 5,
    title: "Galle Fort Walking Tour",
    description: "Explore the historic Dutch fort and colonial architecture",
    location: "Galle",
    price: 30,
    currency: "USD",
    rating: 4.5,
    reviews: 321,
    duration: "3 hours",
    tags: ["History", "Culture", "Architecture"],
    image: "/api/placeholder/800/500",
    transport: ["Walk", "Car"],
    featured: true,
    facilities: ["Guide", "Snacks"],
    difficulty: "Easy",
  },
  {
    id: 6,
    title: "Whale Watching in Mirissa",
    description:
      "Boat tour to see blue whales and dolphins in their natural habitat",
    location: "Mirissa",
    price: 65,
    currency: "USD",
    rating: 4.3,
    reviews: 412,
    duration: "5 hours",
    tags: ["Wildlife", "Ocean", "Nature"],
    image: "/api/placeholder/800/500",
    transport: ["Boat", "Ship"],
    featured: true,
    facilities: ["Guide", "Breakfast", "Water", "Safety Equipment"],
    difficulty: "Easy",
  },
  {
    id: 7,
    title: "Polonnaruwa Ancient City Bicycle Tour",
    description: "Cycle through the ruins of the ancient kingdom",
    location: "Polonnaruwa",
    price: 40,
    currency: "USD",
    rating: 4.7,
    reviews: 186,
    duration: "4 hours",
    tags: ["History", "Culture", "Cycling"],
    image: "/api/placeholder/800/500",
    transport: ["Bicycle", "Car"],
    featured: false,
    facilities: ["Guide", "Bicycle", "Water"],
    difficulty: "Moderate",
  },
  {
    id: 8,
    title: "Colombo City Food Tour",
    description: "Taste authentic Sri Lankan street food with a local guide",
    location: "Colombo",
    price: 50,
    currency: "USD",
    rating: 4.8,
    reviews: 235,
    duration: "4 hours",
    tags: ["Food", "Culture", "Urban"],
    image: "/api/placeholder/800/500",
    transport: ["Walk", "Tuk Tuk"],
    featured: false,
    facilities: ["Guide", "Food Tastings", "Drinks"],
    difficulty: "Easy",
  },
  {
    id: 9,
    title: "Udawalawe Elephant Safari",
    description: "See elephants in the wild at this renowned national park",
    location: "Udawalawe",
    price: 60,
    currency: "USD",
    rating: 4.9,
    reviews: 326,
    duration: "3 hours",
    tags: ["Wildlife", "Nature", "Photography"],
    image: "/api/placeholder/800/500",
    transport: ["Jeep", "Bus"],
    featured: true,
    facilities: ["Guide", "Water", "Binoculars"],
    difficulty: "Easy",
  },
  {
    id: 10,
    title: "Adam's Peak Pilgrimage Hike",
    description:
      "Night hike to witness the spectacular sunrise from this sacred mountain",
    location: "Nallathanniya",
    price: 40,
    currency: "USD",
    rating: 4.6,
    reviews: 289,
    duration: "7 hours",
    tags: ["Hiking", "Religion", "Adventure"],
    image: "/api/placeholder/800/500",
    transport: ["Walk", "Car"],
    featured: false,
    facilities: ["Guide", "Rest Areas"],
    difficulty: "Hard",
  },
  {
    id: 11,
    title: "Arugam Bay Surf Lesson",
    description: "Learn to surf at one of Sri Lanka's best surfing spots",
    location: "Arugam Bay",
    price: 35,
    currency: "USD",
    rating: 4.7,
    reviews: 211,
    duration: "2 hours",
    tags: ["Water Sports", "Beach", "Adventure"],
    image: "/api/placeholder/800/500",
    transport: ["Walk"],
    featured: true,
    facilities: ["Instructor", "Equipment", "Safety Gear"],
    difficulty: "Moderate",
  },
  {
    id: 12,
    title: "Nine Arches Bridge Train Experience",
    description:
      "Witness and photograph trains crossing the iconic bridge in Ella",
    location: "Ella",
    price: 15,
    currency: "USD",
    rating: 4.5,
    reviews: 342,
    duration: "2 hours",
    tags: ["Photography", "Nature", "Culture"],
    image: "/api/placeholder/800/500",
    transport: ["Walk", "Train"],
    featured: false,
    facilities: ["Guide", "Refreshments"],
    difficulty: "Easy",
  },
];

// Available filter options
const locations = [
  ...new Set(sriLankanActivities.map((activity) => activity.location)),
];
const transportOptions = [
  "Bus",
  "Car",
  "Train",
  "Walk",
  "Jeep",
  "Boat",
  "Ship",
  "Bicycle",
  "Tuk Tuk",
  "Plane",
];
const categories = [
  ...new Set(sriLankanActivities.flatMap((activity) => activity.tags)),
];
const difficulties = ["Easy", "Moderate", "Hard"];

export default function ActivitiesPage() {
  const { theme } = useTheme();
  const [activities, setActivities] = useState(sriLankanActivities);
  const [filteredActivities, setFilteredActivities] =
    useState(sriLankanActivities);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [showFeatured, setShowFeatured] = useState(false);

  // Apply filters and sorting
  useEffect(() => {
    let results = [...activities];

    // Search filter
    if (searchQuery) {
      results = results.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          activity.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    results = results.filter(
      (activity) =>
        activity.price >= priceRange[0] && activity.price <= priceRange[1]
    );

    // Location filter
    if (selectedLocations.length > 0) {
      results = results.filter((activity) =>
        selectedLocations.includes(activity.location)
      );
    }

    // Transport filter
    if (selectedTransport.length > 0) {
      results = results.filter((activity) =>
        activity.transport.some((t) => selectedTransport.includes(t))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter((activity) =>
        activity.tags.some((tag) => selectedCategories.includes(tag))
      );
    }

    // Difficulty filter
    if (selectedDifficulties.length > 0) {
      results = results.filter((activity) =>
        selectedDifficulties.includes(activity.difficulty)
      );
    }

    // Featured filter
    if (showFeatured) {
      results = results.filter((activity) => activity.featured);
    }

    // Apply sorting
    switch (sortBy) {
      case "price_low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "duration":
        results.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case "popularity":
        results.sort((a, b) => b.reviews - a.reviews);
        break;
      case "featured":
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    setFilteredActivities(results);
  }, [
    activities,
    searchQuery,
    priceRange,
    selectedLocations,
    selectedTransport,
    selectedCategories,
    selectedDifficulties,
    sortBy,
    showFeatured,
  ]);

  // Toggle location filter
  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };

  // Toggle transport filter
  const toggleTransport = (transport) => {
    setSelectedTransport((prev) =>
      prev.includes(transport)
        ? prev.filter((t) => t !== transport)
        : [...prev, transport]
    );
  };

  // Toggle category filter
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Toggle difficulty filter
  const toggleDifficulty = (difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((diff) => diff !== difficulty)
        : [...prev, difficulty]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 100]);
    setSelectedLocations([]);
    setSelectedTransport([]);
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSortBy("featured");
    setShowFeatured(false);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-zinc-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header and Search Section */}
      <div className="sticky top-0 z-10 px-4 py-4 shadow-md bg-white dark:bg-zinc-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Search activities, locations or experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-zinc-800"
                />
              </div>
            </div>

            {/* Mobile filters button */}
            <div className="md:hidden flex justify-end">
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter size={18} /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className={`w-full sm:max-w-md ${
                    theme === "dark" ? "bg-zinc-900" : "bg-white"
                  }`}
                >
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Customize your activity search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    {/* Mobile filters content */}
                    <div className="space-y-6">
                      {/* Price range */}
                      <div>
                        <h3 className="font-medium mb-2">Price Range (USD)</h3>
                        <div className="px-2">
                          <Slider
                            defaultValue={[0, 100]}
                            max={100}
                            step={1}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="my-4"
                          />
                          <div className="flex justify-between text-sm">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Locations */}
                      <Accordion type="single" collapsible>
                        <AccordionItem value="location">
                          <AccordionTrigger>Locations</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {locations.map((location) => (
                                <div
                                  key={location}
                                  className="flex items-center"
                                >
                                  <Checkbox
                                    id={`location-${location}`}
                                    checked={selectedLocations.includes(
                                      location
                                    )}
                                    onCheckedChange={() =>
                                      toggleLocation(location)
                                    }
                                  />
                                  <label
                                    htmlFor={`location-${location}`}
                                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {location}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      {/* Transport */}
                      <Accordion type="single" collapsible>
                        <AccordionItem value="transport">
                          <AccordionTrigger>Transport</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {transportOptions.map((transport) => (
                                <div
                                  key={transport}
                                  className="flex items-center"
                                >
                                  <Checkbox
                                    id={`transport-${transport}`}
                                    checked={selectedTransport.includes(
                                      transport
                                    )}
                                    onCheckedChange={() =>
                                      toggleTransport(transport)
                                    }
                                  />
                                  <label
                                    htmlFor={`transport-${transport}`}
                                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {transport}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      {/* Categories */}
                      <Accordion type="single" collapsible>
                        <AccordionItem value="categories">
                          <AccordionTrigger>Categories</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {categories.map((category) => (
                                <div
                                  key={category}
                                  className="flex items-center"
                                >
                                  <Checkbox
                                    id={`category-${category}`}
                                    checked={selectedCategories.includes(
                                      category
                                    )}
                                    onCheckedChange={() =>
                                      toggleCategory(category)
                                    }
                                  />
                                  <label
                                    htmlFor={`category-${category}`}
                                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {category}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      {/* Difficulty */}
                      <Accordion type="single" collapsible>
                        <AccordionItem value="difficulty">
                          <AccordionTrigger>Difficulty</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {difficulties.map((difficulty) => (
                                <div
                                  key={difficulty}
                                  className="flex items-center"
                                >
                                  <Checkbox
                                    id={`difficulty-${difficulty}`}
                                    checked={selectedDifficulties.includes(
                                      difficulty
                                    )}
                                    onCheckedChange={() =>
                                      toggleDifficulty(difficulty)
                                    }
                                  />
                                  <label
                                    htmlFor={`difficulty-${difficulty}`}
                                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {difficulty}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      {/* Featured */}
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="featured-toggle"
                          className="font-medium"
                        >
                          Featured Only
                        </Label>
                        <Switch
                          id="featured-toggle"
                          checked={showFeatured}
                          onCheckedChange={setShowFeatured}
                        />
                      </div>

                      <div className="pt-4 flex justify-between">
                        <Button variant="outline" onClick={clearFilters}>
                          Clear All
                        </Button>
                        <Button onClick={() => setFilterOpen(false)}>
                          See Results ({filteredActivities.length})
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Sorting dropdown */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <ArrowUpDown size={18} /> Sort by:
                    {sortBy === "price_low" && " Price (Low to High)"}
                    {sortBy === "price_high" && " Price (High to Low)"}
                    {sortBy === "rating" && " Rating"}
                    {sortBy === "duration" && " Duration"}
                    {sortBy === "popularity" && " Popularity"}
                    {sortBy === "featured" && " Featured"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortBy("featured")}>
                    Featured
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price_low")}>
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price_high")}>
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    Rating
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("duration")}>
                    Duration
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popularity")}>
                    Popularity
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="container mx-auto px-4 pt-6 pb-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-64 space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
                <Button
                  variant="ghost"
                  className="text-sm px-2 h-8"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price range */}
                <div>
                  <h3 className="font-medium mb-2">Price Range (USD)</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Locations */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="location">
                    <AccordionTrigger>Locations</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {locations.map((location) => (
                          <div key={location} className="flex items-center">
                            <Checkbox
                              id={`location-${location}-desktop`}
                              checked={selectedLocations.includes(location)}
                              onCheckedChange={() => toggleLocation(location)}
                            />
                            <label
                              htmlFor={`location-${location}-desktop`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {location}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Transport */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="transport">
                    <AccordionTrigger>Transport</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {transportOptions.map((transport) => (
                          <div key={transport} className="flex items-center">
                            <Checkbox
                              id={`transport-${transport}-desktop`}
                              checked={selectedTransport.includes(transport)}
                              onCheckedChange={() => toggleTransport(transport)}
                            />
                            <label
                              htmlFor={`transport-${transport}-desktop`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {transport}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Categories */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="categories">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <Checkbox
                              id={`category-${category}-desktop`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <label
                              htmlFor={`category-${category}-desktop`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Difficulty */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="difficulty">
                    <AccordionTrigger>Difficulty</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {difficulties.map((difficulty) => (
                          <div key={difficulty} className="flex items-center">
                            <Checkbox
                              id={`difficulty-${difficulty}-desktop`}
                              checked={selectedDifficulties.includes(
                                difficulty
                              )}
                              onCheckedChange={() =>
                                toggleDifficulty(difficulty)
                              }
                            />
                            <label
                              htmlFor={`difficulty-${difficulty}-desktop`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {difficulty}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Featured */}
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="featured-toggle-desktop"
                    className="font-medium"
                  >
                    Featured Only
                  </Label>
                  <Switch
                    id="featured-toggle-desktop"
                    checked={showFeatured}
                    onCheckedChange={setShowFeatured}
                  />
                </div>

                {/* Applied filters */}
                {(selectedLocations.length > 0 ||
                  selectedTransport.length > 0 ||
                  selectedCategories.length > 0 ||
                  selectedDifficulties.length > 0) && (
                  <div>
                    <h3 className="font-medium mb-2">Applied Filters</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocations.map((loc) => (
                        <Badge
                          variant="secondary"
                          key={`badge-${loc}`}
                          className="flex items-center gap-1"
                        >
                          <MapPin size={12} />
                          {loc}
                          <button
                            className="ml-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 p-0.5"
                            onClick={() => toggleLocation(loc)}
                          >
                            ✕
                          </button>
                        </Badge>
                      ))}
                      {selectedTransport.map((transport) => (
                        <Badge
                          variant="secondary"
                          key={`badge-${transport}`}
                          className="flex items-center gap-1"
                        >
                          {transport === "Bus" && <Bus size={12} />}
                          {transport === "Car" && <Car size={12} />}
                          {transport === "Train" && <Train size={12} />}
                          {transport === "Plane" && <Plane size={12} />}
                          {transport === "Ship" && <Ship size={12} />}
                          {transport}
                          <button
                            className="ml-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 p-0.5"
                            onClick={() => toggleTransport(transport)}
                          >
                            ✕
                          </button>
                        </Badge>
                      ))}
                      {selectedCategories.map((category) => (
                        <Badge
                          variant="secondary"
                          key={`badge-${category}`}
                          className="flex items-center gap-1"
                        >
                          {category}
                          <button
                            className="ml-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 p-0.5"
                            onClick={() => toggleCategory(category)}
                          >
                            ✕
                          </button>
                        </Badge>
                      ))}
                      {selectedDifficulties.map((difficulty) => (
                        <Badge
                          variant="secondary"
                          key={`badge-${difficulty}`}
                          className="flex items-center gap-1"
                        >
                          {difficulty}
                          <button
                            className="ml-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 p-0.5"
                            onClick={() => toggleDifficulty(difficulty)}
                          >
                            ✕
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Activities Grid */}
          <div className="flex-1">
            {/* Results count and applied filters summary for mobile */}
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {filteredActivities.length} Activities Found
              </h2>

              {/* Mobile applied filters display */}
              <div className="md:hidden flex flex-wrap gap-2 mt-2">
                {selectedLocations.length > 0 && (
                  <Badge variant="outline">
                    {selectedLocations.length} Locations
                  </Badge>
                )}
                {selectedTransport.length > 0 && (
                  <Badge variant="outline">
                    {selectedTransport.length} Transport
                  </Badge>
                )}
                {selectedCategories.length > 0 && (
                  <Badge variant="outline">
                    {selectedCategories.length} Categories
                  </Badge>
                )}
                {selectedDifficulties.length > 0 && (
                  <Badge variant="outline">
                    {selectedDifficulties.length} Difficulties
                  </Badge>
                )}
                {priceRange[0] > 0 ||
                  (priceRange[1] < 100 && (
                    <Badge variant="outline">
                      ${priceRange[0]}-${priceRange[1]}
                    </Badge>
                  ))}
              </div>
            </div>

            {/* No results message */}
            {filteredActivities.length === 0 && (
              <div className="p-12 text-center">
                <div className="mb-4 text-gray-400">
                  <Filter size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  No activities match your filters
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}

            {/* Activity cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <Card
                  key={activity.id}
                  className="overflow-hidden h-full flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-48 object-cover"
                    />
                    {activity.featured && (
                      <Badge className="absolute top-2 right-2 bg-blue-800 dark:bg-blue-500">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="font-bold">
                        ${activity.price}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {activity.title}
                      </CardTitle>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{activity.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          ({activity.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <MapPin size={14} className="mr-1" />
                      {activity.location}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {activity.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {activity.tags.map((tag) => (
                        <Badge
                          variant="outline"
                          key={`${activity.id}-${tag}`}
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <span className="mr-2">Duration:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {activity.duration}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">Difficulty:</span>
                        <span
                          className={`font-medium ${
                            activity.difficulty === "Easy"
                              ? "text-green-600 dark:text-green-400"
                              : activity.difficulty === "Moderate"
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {activity.difficulty}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex gap-1">
                      {activity.transport.map((t, i) => (
                        <div
                          key={`${activity.id}-transport-${i}`}
                          className="text-gray-500 dark:text-gray-400"
                          title={t}
                        >
                          {t === "Bus" && <Bus size={18} />}
                          {t === "Car" && <Car size={18} />}
                          {t === "Train" && <Train size={18} />}
                          {t === "Ship" && <Ship size={18} />}
                          {t === "Boat" && <Ship size={18} />}
                          {t === "Plane" && <Plane size={18} />}
                        </div>
                      ))}
                    </div>
                    <Button>View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
