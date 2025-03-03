// components/Navbar.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Users, PenBoxIcon } from "lucide-react";
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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Transport categories
  const transportOptions = [
    "Bicycles",
    "Buses",
    "Cars",
    "Ferries/Boats",
    "Flights",
    "Motorcycles/Scooties",
    "Tuktuk",
    "Vans",
    "Other",
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
    <nav className="w-full z-50 bg-background/80 backdrop-blur-md border-b border-border sticky top-0">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Sri Lanka Vista
            </Link>
          </div>

          {/* Desktop Navigation using shadcn NavigationMenu */}
          <div className="hidden md:flex items-center justify-center">
            <NavigationMenu className="relative">
              <NavigationMenuList className="flex items-center gap-1">
                {/* Hotels & Apartments */}
                <NavigationMenuItem>
                  <Link href="/hotels-apartments" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Hotels & Apartments
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Homestays */}
                <NavigationMenuItem>
                  <Link href="/homestays" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Homestays
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Transport Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Transport</NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-0">
                    <ul className="grid w-[220px] gap-1 p-2">
                      {transportOptions.map((option) => (
                        <li key={option}>
                          <Link
                            href={`/transport/${option
                              .toLowerCase()
                              .replace(/[^a-z0-9]/g, "-")}`}
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              {option}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Activities */}
                <NavigationMenuItem>
                  <Link href="/activities" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Activities
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Food & Beverage Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Food & Beverage</NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-0">
                    <div className="grid grid-cols-3 w-[800px] gap-3 p-4">
                      <div>
                        <h3 className="font-medium text-sm mb-2 text-primary">
                          Dietary Preference
                        </h3>
                        <ul className="space-y-1">
                          {dietaryPreferences.map((option) => (
                            <li key={option}>
                              <Link
                                href={`/food-beverage/dietary/${option
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

          {/* Right side - Auth, Currency, Language, Theme */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Currency Dropdown */}
            <DropdownMenu>
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
            </DropdownMenu>

            {/* Language Dropdown */}
            <DropdownMenu>
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
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />

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
                    key={option}
                    href={`/transport/${option
                      .toLowerCase()
                      .replace(/[^a-z0-9]/g, "-")}`}
                    className="block px-3 py-1.5 rounded-md text-sm text-foreground/80 hover:text-foreground hover:bg-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {option}
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
                      href={`/food-beverage/dietary/${option
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
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground/70 mb-2">
                  Theme
                </p>
                <ThemeToggle />
              </div>
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
