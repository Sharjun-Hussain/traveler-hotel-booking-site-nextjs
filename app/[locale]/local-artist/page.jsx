// pages/artists/index.js
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Slider,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from "@/components/ui/slider";
import {
  Sun,
  Moon,
  Star,
  Filter,
  ArrowUpDown,
  MapPin,
  X,
  Check,
  User,
  Music,
  Paintbrush,
  Theater,
  Camera,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

// Mock data for Sri Lankan artists
const artists = [
  {
    id: 1,
    name: "Nimali Perera",
    category: "Traditional Dancer",
    specialty: "Kandyan Dance",
    rating: 4.9,
    reviews: 128,
    location: "Kandy",
    price: 25000,
    image: "/artist-1.jpg",
    available: true,
    languages: ["Sinhala", "English"],
    features: ["Weddings", "Cultural Events", "Workshops"],
  },
  {
    id: 2,
    name: "Rajith Fernando",
    category: "Musician",
    specialty: "Traditional Drumming",
    rating: 4.7,
    reviews: 95,
    location: "Colombo",
    price: 18000,
    image: "/artist-2.jpg",
    available: true,
    languages: ["Sinhala", "English", "Tamil"],
    features: ["Weddings", "Corporate Events", "Private Parties"],
  },
  {
    id: 3,
    name: "Samanthi Rathnayake",
    category: "Painter",
    specialty: "Traditional Art",
    rating: 4.8,
    reviews: 64,
    location: "Galle",
    price: 15000,
    image: "/artist-3.jpg",
    available: false,
    languages: ["Sinhala", "English"],
    features: ["Live Painting", "Workshops", "Exhibitions"],
  },
  {
    id: 4,
    name: "Dinesh Bandara",
    category: "Photographer",
    specialty: "Cultural Photography",
    rating: 4.5,
    reviews: 112,
    location: "Colombo",
    price: 30000,
    image: "/artist-4.jpg",
    available: true,
    languages: ["Sinhala", "English"],
    features: ["Events", "Portraits", "Commercial"],
  },
  {
    id: 5,
    name: "Kumari Weerasinghe",
    category: "Traditional Dancer",
    specialty: "Devil Dance",
    rating: 4.6,
    reviews: 87,
    location: "Kurunegala",
    price: 22000,
    image: "/artist-5.jpg",
    available: true,
    languages: ["Sinhala"],
    features: ["Cultural Events", "Festivals", "Tourist Shows"],
  },
  {
    id: 6,
    name: "Sanath Jayasuriya",
    category: "Musician",
    specialty: "Baila Music",
    rating: 4.4,
    reviews: 76,
    location: "Negombo",
    price: 20000,
    image: "/artist-6.jpg",
    available: true,
    languages: ["Sinhala", "English"],
    features: ["Weddings", "Parties", "Hotels"],
  },
];
const categories = [
  {
    id: "dancer",
    name: "Traditional Dancer",
    icon: <Theater className="h-4 w-4" />,
  },
  { id: "musician", name: "Musician", icon: <Music className="h-4 w-4" /> },
  { id: "painter", name: "Painter", icon: <Paintbrush className="h-4 w-4" /> },
  {
    id: "photographer",
    name: "Photographer",
    icon: <Camera className="h-4 w-4" />,
  },
];

const locations = ["Colombo", "Kandy", "Galle", "Negombo", "Kurunegala"];
const features = [
  "Weddings",
  "Cultural Events",
  "Corporate Events",
  "Workshops",
];

const ArtistsListPage = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState("recommended");
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedFeatures([]);
    setPriceRange([5000, 50000]);
    setMinRating(0);
    if (isMobile) setShowMobileFilters(false);
  };

  const filteredArtists = artists.filter((artist) => {
    // ... (keep your existing filter logic)
    return true;
  });

  const sortedArtists = [...filteredArtists].sort((a, b) => {
    // ... (keep your existing sort logic)
    return 0;
  });

  const getCategoryIcon = (category) => {
    // ... (keep your existing icon logic)
    return <User className="h-5 w-5" />;
  };

  if (!mounted) {
    return null;
  }

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <div
                className={`w-4 h-4 flex items-center justify-center border rounded-sm ${
                  selectedCategories.includes(category.id)
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-400 dark:border-gray-600"
                }`}
              >
                {selectedCategories.includes(category.id) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-sm">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div>
        <h3 className="font-medium mb-3">Locations</h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <div
              key={location}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleLocation(location)}
            >
              <div
                className={`w-4 h-4 flex items-center justify-center border rounded-sm ${
                  selectedLocations.includes(location)
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-400 dark:border-gray-600"
                }`}
              >
                {selectedLocations.includes(location) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-sm">{location}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-medium mb-3">Features</h3>
        <div className="space-y-2">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleFeature(feature)}
            >
              <div
                className={`w-4 h-4 flex items-center justify-center border rounded-sm ${
                  selectedFeatures.includes(feature)
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-400 dark:border-gray-600"
                }`}
              >
                {selectedFeatures.includes(feature) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price & Rating */}
      <div>
        <div className="mb-6">
          <h3 className="font-medium mb-3">Price Range (LKR)</h3>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={5000}
              max={50000}
              step={1000}
              minStepsBetweenThumbs={1}
              className="mb-2"
            />
            <div className="flex justify-between text-sm">
              <span>LKR {priceRange[0].toLocaleString()}</span>
              <span>LKR {priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* <div>
          <h3 className="font-medium mb-3">Minimum Rating</h3>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setMinRating(star)}
                className={`p-1 rounded-md ${
                  minRating === star
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < star
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                {star === 0 && <span className="text-xs">Any</span>}
              </button>
            ))}
          </div>
        </div> */}
      </div>

      <div className="flex gap-2 pt-4 border-t dark:border-gray-700">
        <Button variant="outline" onClick={clearAllFilters} className="flex-1">
          Clear all
        </Button>
        <Button onClick={() => setShowMobileFilters(false)} className="flex-1">
          Show results
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mt-14 bg-gray-50 dark:bg-zinc-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Local Artists in Sri Lanka</h1>
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
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar Filters - Hidden on mobile */}
          {!isMobile && (
            <div className="w-64 shrink-0">
              <Card className="dark:bg-zinc-800 sticky top-6">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-lg">Filters</h2>
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  <FilterPanel />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1">
            {/* Filter and Sort Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              {/* Mobile Filter Button */}
              {isMobile && (
                <Button
                  variant="outline"
                  onClick={() => setShowMobileFilters(true)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {(selectedCategories.length > 0 ||
                    selectedLocations.length > 0 ||
                    selectedFeatures.length > 0 ||
                    priceRange[0] !== 5000 ||
                    priceRange[1] !== 50000 ||
                    minRating > 0) && (
                    <Badge className="ml-1">
                      {selectedCategories.length +
                        selectedLocations.length +
                        selectedFeatures.length +
                        (priceRange[0] !== 5000 ? 1 : 0) +
                        (priceRange[1] !== 50000 ? 1 : 0) +
                        (minRating > 0 ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              )}

              {/* Sort Options */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Sort by:
                </span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 text-sm flex-1 md:flex-none"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Rating (High to Low)</option>
                  <option value="reviews">Most Reviewed</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategories.length > 0 ||
              selectedLocations.length > 0 ||
              selectedFeatures.length > 0 ||
              priceRange[0] !== 5000 ||
              priceRange[1] !== 50000 ||
              minRating > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((catId) => {
                  const category = categories.find((c) => c.id === catId);
                  return (
                    <Badge
                      key={catId}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {category?.name}
                      <button onClick={() => toggleCategory(catId)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}

                {selectedLocations.map((location) => (
                  <Badge
                    key={location}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {location}
                    <button onClick={() => toggleLocation(location)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}

                {selectedFeatures.map((feature) => (
                  <Badge
                    key={feature}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {feature}
                    <button onClick={() => toggleFeature(feature)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}

                {(priceRange[0] !== 5000 || priceRange[1] !== 50000) && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    LKR {priceRange[0].toLocaleString()} -{" "}
                    {priceRange[1].toLocaleString()}
                    <button onClick={() => setPriceRange([5000, 50000])}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                {minRating > 0 && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    {minRating}+ Stars
                    <button onClick={() => setMinRating(0)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Artists List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedArtists.length > 0 ? (
                sortedArtists.map((artist) => (
                  <Card
                    key={artist.id}
                    className="hover:shadow-lg transition-shadow dark:bg-zinc-800"
                  >
                    <CardContent className="p-0">
                      <div className="relative h-48">
                        <Image
                          src={artist.image}
                          alt={artist.name}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary">
                            {artist.available ? "Available" : "Booked"}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{artist.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{artist.rating}</span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                              ({artist.reviews})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          {getCategoryIcon(artist.category)}
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {artist.category} • {artist.location}
                          </span>
                        </div>

                        <p className="text-sm mb-4 line-clamp-2">
                          {artist.specialty}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {artist.features.slice(0, 3).map((feature, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-bold">
                              LKR {artist.price.toLocaleString()}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm block">
                              per performance
                            </span>
                          </div>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium mb-2">
                    No artists match your filters
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try adjusting your search or filters to find what you're
                    looking for.
                  </p>
                  <Button onClick={clearAllFilters}>Clear all filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <Drawer open={showMobileFilters} onOpenChange={setShowMobileFilters}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="flex justify-between items-center">
              <span>Filters</span>
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 dark:text-blue-400"
              >
                Clear all
              </button>
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto">
            <FilterPanel />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ArtistsListPage;
