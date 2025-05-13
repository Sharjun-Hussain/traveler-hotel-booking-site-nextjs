// app/activities/page.jsx
"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { ActivitiesMobileFilters } from "./components/ActivitiesMobileFilters";
import { ActivitiesList } from "./components/ActiviyList";
import { ActivitiesFilterSidebar } from "./components/ActivitiesFilterSidebar";
import { ActivitiesSearchHeader } from "./components/ActivitiesSearchHeader";
import SecNav from "../Components/SecNav";
import MobileNav from "@/components/ui/MobileNav";
// Move your data to a separate file

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
]


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
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: "",
    priceRange: [0, 100],
    selectedLocations: [],
    selectedTransport: [],
    selectedCategories: [],
    selectedDifficulties: [],
    sortBy: "featured",
    showFeatured: false,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      priceRange: [0, 100],
      selectedLocations: [],
      selectedTransport: [],
      selectedCategories: [],
      selectedDifficulties: [],
      sortBy: "featured",
      showFeatured: false,
    });
  };

  return (
    <div className={`mt-14
      }`}>
      <SecNav />
      <MobileNav />
      {/* <ActivitiesSearchHeader
        searchQuery={filters.searchQuery}
        onSearchChange={(value) =>
          handleFilterChange({ ...filters, searchQuery: value })
        }
        sortBy={filters.sortBy}
        onSortChange={(value) =>
          handleFilterChange({ ...filters, sortBy: value })
        }
        onFilterOpen={() => setFilterOpen(true)}
      /> */}

      <div className="container mx-auto px-4 pt-6 pb-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block">
            <ActivitiesFilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              locations={locations}
              transportOptions={transportOptions}
              categories={categories}
              difficulties={difficulties}
            />
          </div>

          {/* Activities List */}
          <ActivitiesList
            activities={sriLankanActivities}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        </div>
      </div>

      {/* Mobile Filters Sheet */}
      <ActivitiesMobileFilters
        open={filterOpen}
        onOpenChange={setFilterOpen}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        locations={locations}
        transportOptions={transportOptions}
        categories={categories}
        difficulties={difficulties}
      />
    </div>
  );
}