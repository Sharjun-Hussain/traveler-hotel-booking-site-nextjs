"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Users,
  PenBoxIcon,
  Home,
  Building,
  ShoppingCart,
  Headphones,
  Compass,
  Utensils,
  ShoppingBag,
  Bike,
  Car,
  Palmtree,
  Mountain,
  Map,
  Anchor,
  Waves,
  AlignVerticalSpaceBetweenIcon,
  LocateIcon,
  Coffee,
  Cake,
  Music,
  Banknote,
  WifiIcon,
  Stethoscope,
  MessageSquareText,
  CloudSun,
  Torus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import LanguageDialog from "./LangModel";
import CurrencyDialog from "./CurrencyModel";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNavItems = [
    {
      title: "Hotels & Apartments",
      href: "/hotels-and-apartments",
      icon: <Building size={18} />,
      isDropdown: false,
    },
    {
      title: "Homestays",
      href: "/homestays",
      icon: <Home size={18} />,
      isDropdown: false,
    },
  ];

  const navigationItems = [
    {
      title: "Transport",
      icon: <Car size={18} />,
      isDropdown: true,
      id: "transport",
      children: [
        {
          title: "Bicycles",
          href: "/transport/bicycles",
          icon: <Bike size={16} />,
        },
        {
          title: "Buses",
          href: "/transport/buses",
          icon: <Car size={16} />,
        },
        {
          title: "Cars",
          href: "/transport/cars",
          icon: <Car size={16} />,
        },
        {
          title: "Ferries/Boats",
          href: "/transport/ferries-boats",
          icon: <Anchor size={16} />,
        },
        {
          title: "Flights",
          href: "/transport/flights",
          icon: <Compass size={16} />,
        },
        {
          title: "Motorcycles/Scooties",
          href: "/transport/motorcycles-scooties",
          icon: <Bike size={16} />,
        },
        {
          title: "Tuktuk",
          href: "/transport/tuktuk",
          icon: <Car size={16} />,
        },
        {
          title: "Vans",
          href: "/transport/vans",
          icon: <Car size={16} />,
        },
        {
          title: "Other",
          href: "/transport/other",
          icon: <Compass size={16} />,
        },
      ],
    },
    {
      title: "Activities",
      icon: <Compass size={18} />,
      isDropdown: true,
      id: "activities",
      children: [
        {
          title: "Artisan Making Place Visit",
          href: "/activity/artisan-making",
          icon: <Palmtree size={16} />,
        },
        {
          title: "Ayurveda and Spa Treatments",
          href: "/activity/ayurveda-spa",
          icon: <Palmtree size={16} />,
        },
        {
          title: "Camping & Glamping",
          href: "/activity/camping-glamping",
          icon: <Mountain size={16} />,
        },
        {
          title: "City Tours",
          href: "/activity/city-tours",
          icon: <Map size={16} />,
        },
        {
          title: "Colonial Heritage Tours",
          href: "/activity/colonial-heritage",
          icon: <Building size={16} />,
        },
        {
          title: "Cooking Classes",
          href: "/activity/cooking-classes",
          icon: <Utensils size={16} />,
        },
        {
          title: "Eco Tours / Experience",
          href: "/activity/eco-tours",
          icon: <Palmtree size={16} />,
        },
        {
          title: "Hiking and Trekking",
          href: "/activity/hiking-trekking",
          icon: <Mountain size={16} />,
        },
        {
          title: "Safari",
          href: "/activity/safari",
          icon: <Compass size={16} />,
        },
        {
          title: "Other",
          href: "/activity/other",
          icon: <Compass size={16} />,
        },
      ],
    },
    {
      title: "Food & Beverage",
      icon: <Utensils size={18} />,
      isDropdown: true,
      id: "food",
      children: [
        {
          title: "Dietary Preferences",
          isGroup: true,
          items: [
            {
              title: "Vegetarian",
              href: "/food-beverage/dietary/vegetarian",
              icon: <Palmtree size={16} />,
            },
            {
              title: "Vegan",
              href: "/food-beverage/dietary/vegan",
              icon: <Palmtree size={16} />,
            },
            {
              title: "Gluten Free",
              href: "/food-beverage/dietary/gluten-free",
              icon: <Cake size={16} />,
            },
            {
              title: "Halal",
              href: "/food-beverage/dietary/halal",
              icon: <Utensils size={16} />,
            },
            {
              title: "Kosher",
              href: "/food-beverage/dietary/kosher",
              icon: <Utensils size={16} />,
            },
          ],
        },
        {
          title: "Cuisine Types",
          isGroup: true,
          items: [
            {
              title: "Sri Lankan Authentic",
              href: "/food-beverage/cuisine/sri-lankan",
              icon: <Utensils size={16} />,
            },
            {
              title: "Asian Cuisine",
              href: "/food-beverage/cuisine/asian",
              icon: <Utensils size={16} />,
            },
            {
              title: "European Cuisine",
              href: "/food-beverage/cuisine/european",
              icon: <Utensils size={16} />,
            },
            {
              title: "Fast Food",
              href: "/food-beverage/cuisine/fast-food",
              icon: <Coffee size={16} />,
            },
            {
              title: "Seafood Restaurant",
              href: "/food-beverage/cuisine/seafood",
              icon: <Anchor size={16} />,
            },
          ],
        },
        {
          title: "Specialty Restaurants",
          isGroup: true,
          items: [
            {
              title: "Dessert / Ice Cream Parlor",
              href: "/food-beverage/specialty/dessert",
              icon: <Cake size={16} />,
            },
            {
              title: "Rooftop Restaurants",
              href: "/food-beverage/specialty/rooftop",
              icon: <Building size={16} />,
            },
            {
              title: "Tea Houses",
              href: "/food-beverage/specialty/tea-houses",
              icon: <Coffee size={16} />,
            },
            {
              title: "Food Truck",
              href: "/food-beverage/specialty/food-truck",
              icon: <Car size={16} />,
            },
          ],
        },
      ],
    },
    {
      title: "Events & Local Artists",
      icon: <AlignVerticalSpaceBetweenIcon size={18} />,
      isDropdown: true,
      id: "events",
      children: [
        {
          title: "Events",
          isGroup: true,
          items: [
            {
              title: "Cultural Festivals",
              href: "/events/cultural-festivals",
              icon: <Palmtree size={16} />,
            },
            {
              title: "Music Concerts",
              href: "/events/music-concerts",
              icon: <Music size={16} />,
            },
            {
              title: "Art Exhibitions",
              href: "/events/art-exhibitions",
              icon: <Compass size={16} />,
            },
            {
              title: "Traditional Performances",
              href: "/events/traditional-performances",
              icon: <AlignVerticalSpaceBetweenIcon size={16} />,
            },
            {
              title: "Local Markets",
              href: "/events/local-markets",
              icon: <ShoppingBag size={16} />,
            },
          ],
        },
        {
          title: "Local Artists",
          isGroup: true,
          items: [
            {
              title: "Handloom Weavers",
              href: "/artists/handloom-weavers",
              icon: <AlignVerticalSpaceBetweenIcon size={16} />,
            },
            {
              title: "Musicians",
              href: "/artists/musicians",
              icon: <Music size={16} />,
            },
            {
              title: "Painters",
              href: "/artists/painters",
              icon: <AlignVerticalSpaceBetweenIcon size={16} />,
            },
            {
              title: "Traditional Dancers",
              href: "/artists/traditional-dancers",
              icon: <AlignVerticalSpaceBetweenIcon size={16} />,
            },
          ],
        },
      ],
    },
    {
      title: "Shopping",
      icon: <ShoppingBag size={18} />,
      isDropdown: true,
      id: "shopping",
      children: [
        {
          title: "Ayurvedic Products",
          href: "/shopping/ayurvedic-products",
          icon: <ShoppingBag size={16} />,
        },
        {
          title: "Ceylon Cinnamon",
          href: "/shopping/ceylon-cinnamon",
          icon: <ShoppingBag size={16} />,
        },
        {
          title: "Ceylon Tea",
          href: "/shopping/ceylon-tea",
          icon: <Coffee size={16} />,
        },
        {
          title: "Gems",
          href: "/shopping/gems",
          icon: <ShoppingBag size={16} />,
        },
        {
          title: "Handcrafted silverware",
          href: "/shopping/handcrafted-silverware",
          icon: <ShoppingBag size={16} />,
        },
      ],
    },
    {
      title: "Licensed Tour Guides",
      icon: <LocateIcon size={18} />,
      isDropdown: false,
      href: "/tour-guides",
    },
    {
      title: "Other Services",
      icon: <Compass size={18} />,
      isDropdown: true,
      id: "other",
      children: [
        {
          title: "Air ticketing / Travel agents",
          href: "/other/air-ticketing",
          icon: <Compass size={16} />,
        },
        {
          title: "Beach Bars and clubs",
          href: "/other/beach-bars-clubs",
          icon: <Music size={16} />,
        },
        {
          title: "Free WiFi spots",
          href: "/other/free-wifi",
          icon: <WifiIcon size={16} />,
        },
        {
          title: "Hospitals & clinics",
          href: "/other/hospitals",
          icon: <Stethoscope size={16} />,
        },
        {
          title: "Money changer",
          href: "/other/money-changer",
          icon: <Banknote size={16} />,
        },
      ],
    },
  ];

  return (
    <nav className="w-full z-50 fixed top-0 left-0 right-0 bg-background ">
      <div className="container md:px-4 mx-auto">
        <div className="flex justify-between items-center h-14">
          <div className="flex">
            <div className="rounded-full h-12 w-12 overflow-hidden">
              <Image width={100} height={100} src="/logo.jpg" alt="logo" />
            </div>
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                Sri Lanka Vista
              </Link>
            </div>
            <div className="lg:flex hidden ms-12 gap-4 text-sm items-center">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  className="hover:text-primary rounded-full  border-1 px-4 py-1 bg-j-secondary/60 transition-colors  hover:bg-j-secondary-hover font-semibold"
                  href={item.href}
                  id={item.href}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth, Currency, Language, Theme - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex gap-2 justify-center items-center">
              <Button variant="ghost" className="bg-white/80 backdrop-blur-sm">
                List my property
              </Button>
              <Button variant="ghost" className="bg-white/80 backdrop-blur-sm">
                <ShoppingCart className="h-5 w-5 mr-1" />
              </Button>
              <button className="cursor-pointer text-[16px] hover:text-foreground/70">
                En
              </button>
              <button className="cursor-pointer text-[17px] -mt-[1px] hover:text-foreground/70">
                த
              </button>
              <button className="cursor-pointer text-[18px] hover:text-foreground/70">
                සි
              </button>
              <LanguageDialog />
              <CurrencyDialog />{" "}
            </div>
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
            <Link href="/customer-care">
              <Button size="sm" className="gap-1 bg-j-primary-hover">
                <Headphones size={16} />
              </Button>
            </Link>
          </div>

          {/* Mobile menu Sheet trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full sm:max-w-md overflow-y-auto pb-20"
              >
                <SheetHeader className=" pb-4 mb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="rounded-full h-8 w-8 overflow-hidden">
                      <Image
                        width={32}
                        height={32}
                        src="/logo.jpg"
                        alt="logo"
                      />
                    </div>
                    <span className="text-xl font-bold text-primary">
                      Sri Lanka Vista
                    </span>
                  </SheetTitle>
                </SheetHeader>

                {/* Main Navigation Items */}
                <div className="space-y-1 mb-4">
                  {mainNavItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-accent"
                      >
                        {item.icon}
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Nested Accordion Navigation */}
                <Accordion type="multiple" className="w-full">
                  {navigationItems.map((item) =>
                    item.isDropdown ? (
                      <AccordionItem value={item.id} key={item.id}>
                        <AccordionTrigger className="py-2 px-3 hover:bg-accent hover:no-underline rounded-md">
                          <div className="flex items-center gap-3">
                            {item.icon}
                            <span className="font-medium">{item.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-4">
                          {item.children.map((child, childIndex) =>
                            child.isGroup ? (
                              <div key={childIndex} className="pb-3">
                                <h4 className="text-sm font-medium text-foreground/70 py-2 px-2">
                                  {child.title}
                                </h4>
                                <div className="space-y-1">
                                  {child.items.map((subItem) => (
                                    <SheetClose asChild key={subItem.href}>
                                      <Link
                                        href={subItem.href}
                                        className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-accent text-sm"
                                      >
                                        {subItem.icon}
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SheetClose>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <SheetClose asChild key={child.href}>
                                <Link
                                  href={child.href}
                                  className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-accent text-sm"
                                >
                                  {child.icon}
                                  <span>{child.title}</span>
                                </Link>
                              </SheetClose>
                            )
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-accent"
                        >
                          {item.icon}
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SheetClose>
                    )
                  )}
                </Accordion>

                <Separator className="my-4" />

                {/* Language Switcher */}
                <div className="px-3 py-3">
                  <h4 className="text-sm font-medium text-foreground/70 mb-2">
                    Language
                  </h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      English
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      සිංහල
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      தமிழ்
                    </Button>
                  </div>
                </div>

                {/* Currency Switcher */}
                <div className="px-3 py-3">
                  <h4 className="text-sm font-medium text-foreground/70 mb-2">
                    Currency
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
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

                <Separator className="my-4" />

                {/* Auth Buttons */}
                <div className="px-3 py-3 space-y-3">
                  <SheetClose asChild>
                    <Link href="/list-property">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <Building size={16} />
                        List my property
                      </Button>
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <Users size={16} />
                        Login
                      </Button>
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link href="/register">
                      <Button className="w-full justify-start gap-2">
                        <PenBoxIcon size={16} />
                        Sign Up
                      </Button>
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link href="/support">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <Headphones size={16} />
                        Contact Support
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
