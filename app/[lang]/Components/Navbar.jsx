// components/Navbar.js
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Users,
  PenBoxIcon,
  Home,
  WholeWordIcon,
  Globe,
} from "lucide-react";
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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav className="w-full z-50  bg-transparent  ">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Sri Lanka Vista
            </Link>
          </div>

          {/*  Auth, Currency, Language, Theme */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Currency Dropdown */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  USD <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>USD - US Dollar</DropdownMenuItem>
                <DropdownMenuItem>LKR - Sri Lankan Rupee</DropdownMenuItem>
                <DropdownMenuItem>EUR - Euro</DropdownMenuItem>
                <DropdownMenuItem>GBP - British Pound</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            {/* Language Dropdown */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  English <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Sinhala</DropdownMenuItem>
                <DropdownMenuItem>Tamil</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <Globe />
            {/* Auth Links */}
            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-1">
                <Users size={16} />
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="gap-1">
                <PenBoxIcon size={16} />
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border overflow-y-auto max-h-[80vh]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/hotels-apartments"
              className="block px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Hotels & Apartments
            </Link>
            <Link
              href="/homestays"
              className="block px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Homestays
            </Link>

            {/* Transport collapsible section */}
            <div className="border-t border-border pt-1">
              <p className="px-3 py-2 text-sm font-medium text-foreground">
                Transport
              </p>
              <div className="pl-4 space-y-1">
                {transportOptions.map((option) => (
                  <Link
                    key={option.title}
                    href={`/transport/${option.href}`}
                    className="block px-3 py-1.5 rounded-md text-sm text-foreground/80 hover:text-foreground hover:bg-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {option.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/activities"
              className="block px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Activities
            </Link>

            {/* Food & Beverage collapsible section */}
            <div className="border-t border-border pt-1">
              <p className="px-3 py-2 text-sm font-medium text-foreground">
                Food & Beverage
              </p>

              {/* Dietary Preferences section */}
              <div className="pl-4 mb-2">
                <p className="px-3 py-1 text-xs font-medium text-foreground/70">
                  Dietary Preference
                </p>
                <div className="pl-2 space-y-1">
                  {dietaryPreferences.map((option) => (
                    <Link
                      key={option}
                      href={`/food-beverage/dietary/${option}`}
                      className="block px-3 py-1.5 rounded-md text-xs text-foreground/80 hover:text-foreground hover:bg-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {option}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Cuisine Based section */}
              <div className="pl-4 mb-2">
                <p className="px-3 py-1 text-xs font-medium text-foreground/70">
                  Cuisine Based
                </p>
                <div className="pl-2 space-y-1">
                  {cuisineTypes.map((option) => (
                    <Link
                      key={option}
                      href={`/food-beverage/cuisine/${option
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, "-")}`}
                      className="block px-3 py-1.5 rounded-md text-xs text-foreground/80 hover:text-foreground hover:bg-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {option}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Specialty Restaurant section */}
              <div className="pl-4 mb-2">
                <p className="px-3 py-1 text-xs font-medium text-foreground/70">
                  Specialty Restaurant
                </p>
                <div className="pl-2 space-y-1">
                  {specialtyRestaurants.map((option) => (
                    <Link
                      key={option}
                      href={`/food-beverage/specialty/${option
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, "-")}`}
                      className="block px-3 py-1.5 rounded-md text-xs text-foreground/80 hover:text-foreground hover:bg-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {option}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile dropdowns */}
            <div className="flex flex-col space-y-2 pt-2 border-t border-border">
              {/* Currency and Language as simple buttons with popups in mobile */}
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground/70 mb-2">
                  Currency
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    USD
                  </Button>
                  <Button variant="outline" size="sm">
                    LKR
                  </Button>
                  <Button variant="outline" size="sm">
                    EUR
                  </Button>
                  <Button variant="outline" size="sm">
                    GBP
                  </Button>
                </div>
              </div>

              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground/70 mb-2">
                  Language
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    English
                  </Button>
                  <Button variant="outline" size="sm">
                    Sinhala
                  </Button>
                  <Button variant="outline" size="sm">
                    Tamil
                  </Button>
                </div>
              </div>

              {/* Theme toggle for mobile */}
              {/* <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground/70 mb-2">
                  Theme
                </p>
                <ThemeToggle />
              </div> */}
            </div>

            <div className="border-t border-border pt-4 pb-3 flex flex-col space-y-2 px-3">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Users size={16} />
                  Login
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-start gap-2">
                  <PenBoxIcon size={16} />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

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
