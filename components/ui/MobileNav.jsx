"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  BikeIcon,
  Building,
  Car,
  Compass,
  Utensils,
  Bike,
  Bus,
  Anchor,
  Plane,
  Truck,
  Coffee,
  Pizza,
  Salad,
  Palmtree,
  Mountain,
  Map,
  Waves,
  AlignVerticalSpaceBetweenIcon,
  ShoppingBag,
  Torus,
} from "lucide-react";

const MobileNav = () => {
  // Categories for the scrollable navigation
  const categories = [
    {
      icon: <Car size={24} />,
      title: "Transport",
      href: "/transport",
    },
    {
      icon: <Compass size={24} />,
      title: "Activities",
      href: "/activity",
    },
    {
      icon: <Utensils size={24} />,
      title: "Food",
      href: "/food-beverage",
    },
    {
      icon: <AlignVerticalSpaceBetweenIcon size={24} />,
      title: "Events",
      href: "/events",
    },
    {
      icon: <ShoppingBag size={24} />,
      title: "Shopping",
      href: "/shopping",
    },
    {
      icon: <Torus size={24} />,
      title: "Tour Guides",
      href: "/tourguide",
    },
    {
      icon: <Bike size={24} />,
      title: "Cycling",
      href: "/transport/bicycles",
    },
    {
      icon: <Mountain size={24} />,
      title: "Hiking",
      href: "/activity/hiking-trekking",
    },
    {
      icon: <Palmtree size={24} />,
      title: "Eco Tours",
      href: "/activity/eco-tours",
    },
    {
      icon: <Building size={24} />,
      title: "Heritage",
      href: "/activity/colonial-heritage",
    },
    {
      icon: <Waves size={24} />,
      title: "Water Sports",
      href: "/activity/surfing",
    },
    {
      icon: <Coffee size={24} />,
      title: "Cafés",
      href: "/food-beverage/cuisine/café-bistro",
    },
  ];

  // Bottom navigation items
  const bottomNavItems = [
    {
      icon: <Home size={24} />,
      title: "Home",
      href: "/",
    },
    {
      icon: <Compass size={24} />,
      title: "Explore",
      href: "/explore",
    },
    {
      icon: <Map size={24} />,
      title: "Map",
      href: "/map",
    },
    {
      icon: <ShoppingBag size={24} />,
      title: "Saved",
      href: "/saved",
    },
    {
      icon: <Building size={24} />,
      title: "Profile",
      href: "/profile",
    },
  ];

  return (
    <>
      {/* Top scrollable category navigation */}
      {/* <div className="lg:hidden sticky top-0 bg-white z-10 shadow-sm">
        <div className="overflow-x-auto pb-2 pt-4 px-4 hide-scrollbar">
          <div className="flex space-x-6 min-w-max">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="flex flex-col items-center space-y-1 min-w-16"
              >
                <div className="p-2 rounded-full bg-gray-100">
                  {category.icon}
                </div>
                <span className="text-xs text-center">{category.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div> */}

      {/* Fixed bottom navigation bar (mobile only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-between items-center px-4 py-2">
          {bottomNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex flex-col items-center justify-center py-1"
            >
              {item.icon}
              <span className="text-xs mt-1">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Add custom styles for hiding scrollbar but allowing scrolling */}
      <style jsx global>
        {`
          .hide-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari and Opera */
          }
        `}
      </style>
    </>
  );
};

export default MobileNav;
