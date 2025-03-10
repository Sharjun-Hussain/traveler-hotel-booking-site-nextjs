"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Users, PenBoxIcon, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const SecNav = () => {
  const transportOptions = [
    {
      title: "Bicycles",
      href: "/transport/bicycles",
      description:
        "A two-wheeled, human-powered mode of transport ideal for short distances and eco-friendly travel.",
    },
    {
      title: "Buses",
      href: "/transport/buses",
      description:
        "Public or private road transport designed to carry multiple passengers efficiently within cities or between locations.",
    },
    {
      title: "Cars",
      href: "/transport/cars",
      description:
        "Personal or rental four-wheeled vehicles offering flexible and comfortable travel options.",
    },
    {
      title: "Ferries/Boats",
      href: "/transport/ferries-boats",
      description:
        "Water-based transport used for crossing rivers, lakes, or short sea routes.",
    },
    {
      title: "Flights",
      href: "/transport/flights",
      description:
        "Air travel for long-distance and international transportation with commercial or private airlines.",
    },
    {
      title: "Motorcycles/Scooties",
      href: "/transport/motorcycles-scooties",
      description:
        "Two-wheeled motorized vehicles ideal for quick urban transport and personal commuting.",
    },
    {
      title: "Tuktuk",
      href: "/transport/tuktuk",
      description:
        "A three-wheeled auto-rickshaw used as an affordable and quick transport option in many cities.",
    },
    {
      title: "Vans",
      href: "/transport/vans",
      description:
        "Larger vehicles used for group transport, delivery services, or road trips.",
    },
    {
      title: "Other",
      href: "/transport/other",
      description:
        "Any other mode of transport not listed above, including experimental and emerging technologies.",
    },
  ];

  // Food & Beverage categories
  const dietaryPreferences = [
    "Diabetic-Friendly",
    "Gluten Free",
    "Halal",
    "Jain",
    "Keto",
    "Kosher",
    "Non-Vegetarian",
    "Organic",
    "Vegan",
    "Vegetarian",
  ];

  const cuisineTypes = [
    "Sri Lankan Authentic",
    "African Cuisine",
    "American Cuisine",
    "Asian Cuisine",
    "BBQ / Grill",
    "Buffet",
    "Café / Bistro",
    "Casual Dining",
    "European Cuisine",
    "Fast Food",
    "Fine Dining",
    "Fusion Cuisine",
    "Middle Eastern Cuisine",
    "Seafood Restaurant",
    "Steakhouse",
    "Street Food",
  ];

  const specialtyRestaurants = [
    "Brunch Spots",
    "Dessert / Ice Cream Parlor",
    "Diners",
    "Farm-to-Table",
    "Food Truck",
    "Juice Bar",
    "Hookah Lounge",
    "Rooftop Restaurants",
    "Sushi Bars",
    "Tea Houses",
    "Themed Restaurants",
  ];

  const activity = [
    {
      title: "Artisan Making Place Visit",
      href: "/activity/artisan-making",
      description:
        "Explore traditional artisan workshops and witness skilled craftsmen at work.",
    },
    {
      title: "Ayurveda and Spa Treatments",
      href: "/activity/ayurveda-spa",
      description:
        "Rejuvenate with ancient Ayurveda therapies and luxurious spa treatments.",
    },
    {
      title: "Camping & Glamping",
      href: "/activity/camping-glamping",
      description:
        "Experience nature with comfortable camping or luxury glamping stays.",
    },
    {
      title: "City Tours",
      href: "/activity/city-tours",
      description:
        "Discover vibrant cityscapes, historical landmarks, and local culture.",
    },
    {
      title: "Colonial Heritage Tours",
      href: "/activity/colonial-heritage",
      description:
        "Step back in time with tours of colonial-era architecture and history.",
    },
    {
      title: "Cooking Classes",
      href: "/activity/cooking-classes",
      description: "Learn to cook authentic local dishes with expert chefs.",
    },
    {
      title: "Handcrafting Visits",
      href: "/activity/handcrafting-visits",
      description: "Engage in hands-on crafting sessions with local artisans.",
    },
    {
      title: "Eco Tours / Experience",
      href: "/activity/eco-tours",
      description:
        "Immerse yourself in sustainable travel and eco-friendly activity.",
    },
    {
      title: "Fishing",
      href: "/activity/fishing",
      description:
        "Enjoy a relaxing fishing trip in serene lakes, rivers, or coastal waters.",
    },
    {
      title: "Hiking and Trekking",
      href: "/activity/hiking-trekking",
      description:
        "Embark on scenic trails through mountains, forests, and countryside.",
    },
    {
      title: "Hot Air Ballooning",
      href: "/activity/hot-air-ballooning",
      description:
        "Soar above breathtaking landscapes in a thrilling hot air balloon ride.",
    },
    {
      title: "Jet Skiing & Kayaking",
      href: "/activity/jet-skiing-kayaking",
      description:
        "Experience the thrill of jet skiing or paddle through waters with kayaking.",
    },
    {
      title: "Mountain Biking",
      href: "/activity/mountain-biking",
      description:
        "Ride through rugged mountain trails and scenic countryside routes.",
    },
    {
      title: "Safari",
      href: "/activity/safari",
      description:
        "Go on a wildlife safari and witness exotic animals in their natural habitat.",
    },
    {
      title: "Snorkeling & Scuba Diving",
      href: "/activity/snorkeling-scuba",
      description: "Explore vibrant underwater ecosystems and marine life.",
    },
    {
      title: "Surfing",
      href: "/activity/surfing",
      description:
        "Catch the waves and enjoy the thrill of surfing in stunning locations.",
    },
    {
      title: "Tea Plantation Tours",
      href: "/activity/tea-plantation",
      description:
        "Visit lush tea estates and learn about the tea-making process.",
    },
    {
      title: "Temple Visits",
      href: "/activity/temple-visits",
      description:
        "Discover the spiritual beauty of ancient temples and sacred sites.",
    },
    {
      title: "Traditional Village Tours",
      href: "/activity/village-tours",
      description:
        "Experience authentic rural life and interact with local communities.",
    },
    {
      title: "Traditional Ceremonies Visits",
      href: "/activity/traditional-ceremonies",
      description:
        "Witness and take part in time-honored cultural and religious ceremonies.",
    },
    {
      title: "Turtle Watching",
      href: "/activity/turtle-watching",
      description:
        "Observe sea turtles nesting and hatching on protected beaches.",
    },
    {
      title: "Whale & Dolphin Watching",
      href: "/activity/whale-dolphin-watching",
      description:
        "Embark on a boat tour to see majestic whales and playful dolphins.",
    },
    {
      title: "White Water Rafting",
      href: "/activity/white-water-rafting",
      description:
        "Navigate through exhilarating river rapids for an adrenaline rush.",
    },
    {
      title: "Yoga and Meditation",
      href: "/activity/yoga-meditation",
      description: "Find inner peace with guided yoga and meditation sessions.",
    },
    {
      title: "Other",
      href: "/activity/other",
      description: "Explore unique and off-the-beaten-path activity.",
    },
  ];
  return (
    <div>
      <div className="hidden  md:flex items-center justify-center">
        <NavigationMenu className="relative">
          <NavigationMenuList className="flex items-center gap-1">
            {/* Hotels & Apartments */}
            <NavigationMenuItem>
              <Link href="/hotels-and-apartments" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <div className="flex   font-light justify-center flex-col items-center">
                    <Home width={18} className="mt-2" />{" "}
                    <div className="text-xs mt-1 mb-2">Hotels & Apartments</div>
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Homestays */}
            <NavigationMenuItem>
              <Link href="/homestays" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <div className="flex   font-light justify-center flex-col items-center">
                    <Home width={18} className="mt-2" />{" "}
                    <div className="text-xs mt-1 mb-2">Homestays</div>
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Transport Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="flex   font-light justify-center flex-col items-center">
                  <Home width={16} className="mt-2 font-normal " />{" "}
                  <div className="text-xs mt-1 mb-2">Transport</div>
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[900px]">
                  {transportOptions.map((transport) => (
                    <ListItem key={transport.title} title={transport.title}>
                      {transport.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Activities */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Activity</NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-0">
                <div className="grid grid-cols-3 w-[800px] gap-3 p-4">
                  <ul className="space-y-1 grid grid-cols-3 col-span-3">
                    {activity.map((option) => (
                      <li key={option}>
                        <Link
                          href={`/activity/${option.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]/g, "-")}`}
                          className="block text-sm py-1 hover:text-primary transition-colors"
                        >
                          {option.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Food & Beverage Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Food & Beverage</NavigationMenuTrigger>
              <NavigationMenuContent className="absolute  left-0">
                <div className="grid grid-cols-3 w-[800px] gap-3 p-4">
                  <div>
                    <h3 className="font-medium text-sm mb-2 text-primary">
                      Dietary Preference
                    </h3>
                    <ul className="space-y-1">
                      {dietaryPreferences.map((option) => (
                        <li key={option}>
                          <Link
                            href={`/food-beverage/dietary/${option}`}
                            className="block text-sm py-1 hover:text-primary transition-colors"
                          >
                            {option}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-2 text-primary">
                      Cuisine Based
                    </h3>
                    <ul className="space-y-1">
                      {cuisineTypes.map((option) => (
                        <li key={option}>
                          <Link
                            href={`/food-beverage/cuisine/${option
                              .toLowerCase()
                              .replace(/[^a-z0-9]/g, "-")}`}
                            className="block text-sm py-1 hover:text-primary transition-colors"
                          >
                            {option}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-2 text-primary">
                      Specialty Restaurant
                    </h3>
                    <ul className="space-y-1">
                      {specialtyRestaurants.map((option) => (
                        <li key={option}>
                          <Link
                            href={`/food-beverage/specialty/${option
                              .toLowerCase()
                              .replace(/[^a-z0-9]/g, "-")}`}
                            className="block text-sm py-1 hover:text-primary transition-colors"
                          >
                            {option}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default SecNav;

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
