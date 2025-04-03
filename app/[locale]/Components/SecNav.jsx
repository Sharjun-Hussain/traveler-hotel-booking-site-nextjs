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
  TruckIcon,
  CompassIcon,
  Coffee,
  Pizza,
  Salad,
  Palmtree,
  Mountain,
  Map,
  Waves,
  AlignVerticalSpaceBetweenIcon,
  ShoppingBag,
  GitPullRequestDraft,
  Torus,
} from "lucide-react";

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
  const mainNavItems = [
    {
      title: "Transport",
      icon: <Car size={18} />,
      isDropdown: true,
      content: "transport",
    },
    {
      title: "Activities",
      icon: <Compass size={18} />,
      isDropdown: true,
      content: "activity",
    },
    {
      title: "Food & Beverage",
      icon: <Utensils size={18} />,
      isDropdown: true,
      content: "food",
    },
    {
      title: "Events ",
      icon: <AlignVerticalSpaceBetweenIcon size={18} />,
      isDropdown: true,
      content: "events",
    },
    {
      title: "Local Artists",
      icon: <AlignVerticalSpaceBetweenIcon size={18} />,
      isDropdown: true,
      content: "artists",
    },
    {
      title: "Shoppings",
      icon: <ShoppingBag size={18} />,
      isDropdown: true,
      content: "shopping",
    },
    {
      title: "Licensed Tour Guides",
      icon: <Torus size={18} />,
      isDropdown: true,
      content: "tourguide",
    },
    {
      title: "Other",
      icon: <Torus size={18} />,
      isDropdown: true,
      content: "other",
    },
  ];

  const transportOptions = [
    {
      title: "Bicycles",
      href: "/transport/bicycles",
      icon: <Bike size={16} />,
      description:
        "A two-wheeled, human-powered mode of transport ideal for short distances and eco-friendly travel.",
    },
    {
      title: "Buses",
      href: "/transport/buses",
      icon: <Bus size={16} />,
      description:
        "Public or private road transport designed to carry multiple passengers efficiently within cities or between locations.",
    },
    {
      title: "Cars",
      href: "/transport/cars",
      icon: <Car size={16} />,
      description:
        "Personal or rental four-wheeled vehicles offering flexible and comfortable travel options.",
    },
    {
      title: "Ferries/Boats",
      href: "/transport/ferries-boats",
      icon: <Anchor size={16} />,
      description:
        "Water-based transport used for crossing rivers, lakes, or short sea routes.",
    },
    {
      title: "Flights",
      href: "/transport/flights",
      icon: <Plane size={16} />,
      description:
        "Air travel for long-distance and international transportation with commercial or private airlines.",
    },
    {
      title: "Motorcycles/Scooties",
      href: "/transport/motorcycles-scooties",
      icon: <BikeIcon size={16} />,
      description:
        "Two-wheeled motorized vehicles ideal for quick urban transport and personal commuting.",
    },
    {
      title: "Tuktuk",
      href: "/transport/tuktuk",
      icon: <Truck size={16} />,
      description:
        "A three-wheeled auto-rickshaw used as an affordable and quick transport option in many cities.",
    },
    {
      title: "Vans",
      href: "/transport/vans",
      icon: <TruckIcon size={16} />,
      description:
        "Larger vehicles used for group transport, delivery services, or road trips.",
    },
    {
      title: "Other",
      href: "/transport/other",
      icon: <CompassIcon size={16} />,
      description:
        "Any other mode of transport not listed above, including experimental and emerging technologies.",
    },
  ];

  // Activity categories with icons
  const activityCategories = [
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
      title: "Handcrafting Visits",
      href: "/activity/handcrafting-visits",
      icon: <Palmtree size={16} />,
    },
    {
      title: "Eco Tours / Experience",
      href: "/activity/eco-tours",
      icon: <Palmtree size={16} />,
    },
    {
      title: "Fishing",
      href: "/activity/fishing",
      icon: <Anchor size={16} />,
    },
    {
      title: "Hiking and Trekking",
      href: "/activity/hiking-trekking",
      icon: <Mountain size={16} />,
    },
    {
      title: "Hot Air Ballooning",
      href: "/activity/hot-air-ballooning",
      icon: <Compass size={16} />,
    },
    {
      title: "Jet Skiing & Kayaking",
      href: "/activity/jet-skiing-kayaking",
      icon: <Waves size={16} />,
    },
    {
      title: "Mountain Biking",
      href: "/activity/mountain-biking",
      icon: <Bike size={16} />,
    },
    {
      title: "Safari",
      href: "/activity/safari",
      icon: <Compass size={16} />,
    },
    {
      title: "Snorkeling & Scuba Diving",
      href: "/activity/snorkeling-scuba",
      icon: <Waves size={16} />,
    },
    {
      title: "Surfing",
      href: "/activity/surfing",
      icon: <Waves size={16} />,
    },
    {
      title: "Tea Plantation Tours",
      href: "/activity/tea-plantation",
      icon: <Palmtree size={16} />,
    },
    {
      title: "Temple Visits",
      href: "/activity/temple-visits",
      icon: <Building size={16} />,
    },
    {
      title: "Traditional Village Tours",
      href: "/activity/village-tours",
      icon: <Palmtree size={16} />,
    },
    {
      title: "Traditional Ceremonies Visits",
      href: "/activity/traditional-ceremonies",
      icon: <Palmtree size={16} />,
    },
    {
      title: "Turtle Watching",
      href: "/activity/turtle-watching",
      icon: <Waves size={16} />,
    },
    {
      title: "Whale & Dolphin Watching",
      href: "/activity/whale-dolphin-watching",
      icon: <Waves size={16} />,
    },
    {
      title: "White Water Rafting",
      href: "/activity/white-water-rafting",
      icon: <Waves size={16} />,
    },
    {
      title: "Yoga and Meditation",
      href: "/activity/yoga-meditation",
      icon: <Palmtree size={16} />,
    },
    {
      title: "Other",
      href: "/activity/other",
      icon: <Compass size={16} />,
    },
  ];

  // Food & Beverage categories with icons
  const dietaryPreferences = [
    { name: "Diabetic-Friendly", icon: <Salad size={16} /> },
    { name: "Gluten Free", icon: <Salad size={16} /> },
    { name: "Halal", icon: <Salad size={16} /> },
    { name: "Jain", icon: <Salad size={16} /> },
    { name: "Keto", icon: <Salad size={16} /> },
    { name: "Kosher", icon: <Salad size={16} /> },
    { name: "Non-Vegetarian", icon: <Utensils size={16} /> },
    { name: "Organic", icon: <Salad size={16} /> },
    { name: "Vegan", icon: <Salad size={16} /> },
    { name: "Vegetarian", icon: <Salad size={16} /> },
  ];

  const cuisineTypes = [
    { name: "Sri Lankan Authentic", icon: <Utensils size={16} /> },
    { name: "African Cuisine", icon: <Utensils size={16} /> },
    { name: "American Cuisine", icon: <Utensils size={16} /> },
    { name: "Asian Cuisine", icon: <Utensils size={16} /> },
    { name: "BBQ / Grill", icon: <Utensils size={16} /> },
    { name: "Buffet", icon: <Utensils size={16} /> },
    { name: "Café / Bistro", icon: <Coffee size={16} /> },
    { name: "Casual Dining", icon: <Utensils size={16} /> },
    { name: "European Cuisine", icon: <Utensils size={16} /> },
    { name: "Fast Food", icon: <Pizza size={16} /> },
    { name: "Fine Dining", icon: <Utensils size={16} /> },
    { name: "Fusion Cuisine", icon: <Utensils size={16} /> },
    { name: "Middle Eastern Cuisine", icon: <Utensils size={16} /> },
    { name: "Seafood Restaurant", icon: <Anchor size={16} /> },
    { name: "Steakhouse", icon: <Utensils size={16} /> },
    { name: "Street Food", icon: <Pizza size={16} /> },
  ];

  const shoppingItems = [
    "Ayurvedic Products and herbal oils",
    "Ceylon Cinnamon",
    "Ceylon Tea",
    "Gems",
    "Handcrafted silverware and Brassware",
    "Handloom and Batik clothing",
    "Leather goods and Accessories",
    "Souverniors",
    "Spices",
    "Sri Lankan art paintings",
    "Sri Lankan sweets",
    "Sunscreen & Mosquito repellents",
    "Traditional handicrafts and wooden masks",
  ];

  const specialtyRestaurants = [
    { name: "Brunch Spots", icon: <Coffee size={16} /> },
    { name: "Dessert / Ice Cream Parlor", icon: <Coffee size={16} /> },
    { name: "Diners", icon: <Utensils size={16} /> },
    { name: "Farm-to-Table", icon: <Salad size={16} /> },
    { name: "Food Truck", icon: <Pizza size={16} /> },
    { name: "Juice Bar", icon: <Coffee size={16} /> },
    { name: "Hookah Lounge", icon: <Coffee size={16} /> },
    { name: "Rooftop Restaurants", icon: <Utensils size={16} /> },
    { name: "Sushi Bars", icon: <Utensils size={16} /> },
    { name: "Tea Houses", icon: <Coffee size={16} /> },
    { name: "Themed Restaurants", icon: <Utensils size={16} /> },
  ];

  const other = [
    " Air ticketing / Travel agents",
    "Beach Bars and clubs",
    "Casinos",
    "Courier Service",
    "Entertainment and night life",
    "Free WiFi spots",
    "Grocery shop",
    "Hospitals & clinics",
    "Insurance",
    "Laundry",
    "Live music",
    "Money changer",
    "Pharmacies and medication",
    "Simcards & mobile data",
    "Visa extension / Facilitation",
    "Weather",
  ];

  const tourguides = [
    "Guide1	",
    "Guide2	",
    "Guide3	",
    "Guide4	",
    "Guide5	",
    "Guide6	",
    "Guide7	",
    "Guide8	",
    "Guide9	",
    "Guide10	",
  ];

  const eventsAndArtists = {
    events: [
      { name: "Cultural Festivals", icon: <Palmtree size={16} /> },
      {
        name: "Music Concerts",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      { name: "Art Exhibitions", icon: <Compass size={16} /> },
      {
        name: "Traditional Performances",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      { name: "Local Markets", icon: <ShoppingBag size={16} /> },
    ],
    artists: [
      {
        name: "Handloom Weavers",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      {
        name: "Jewelry Designers",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      {
        name: "Lace Makers & Embroiderers",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      { name: "Musicians", icon: <AlignVerticalSpaceBetweenIcon size={16} /> },
      {
        name: "Novelists & Writers",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      { name: "Painters", icon: <AlignVerticalSpaceBetweenIcon size={16} /> },
      {
        name: "Photographers",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      {
        name: "Playwrights",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      { name: "Poets", icon: <AlignVerticalSpaceBetweenIcon size={16} /> },
      {
        name: "Pottery Artists",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      { name: "Sculptors", icon: <AlignVerticalSpaceBetweenIcon size={16} /> },
      { name: "Singers", icon: <AlignVerticalSpaceBetweenIcon size={16} /> },
      {
        name: "Street Artists / Muralists",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      {
        name: "Street Performers",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      {
        name: "Traditional Dancers",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      {
        name: "Traditional Mask Makers",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
      {
        name: "Wood Carvers",
        icon: <AlignVerticalSpaceBetweenIcon size={16} />,
      },
    ],
  };
  return (
    <div className="hidden md:flex   ">
      <div className="max-w-screen-xl mx-auto">
        <NavigationMenu className="relative">
          <NavigationMenuList className=" container flex justify-center wrap lg:scale-100 md:scale-80 space-x-1">
            {mainNavItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                {item.isDropdown ? (
                  <>
                    <NavigationMenuTrigger className="h-16 px-4 font-normal">
                      <div className="flex flex-col items-center justify-center space-y-1">
                        {item.icon}
                        <span className="text-xs">{item.title}</span>
                      </div>
                    </NavigationMenuTrigger>

                    {item.content === "transport" && (
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[700px] lg:grid-cols-3">
                          {transportOptions.map((transport) => (
                            <ListItem
                              key={transport.title}
                              title={transport.title}
                              href={transport.href}
                              icon={transport.icon}
                            >
                              {/* {transport.description} */}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    )}

                    {item.content === "activity" && (
                      <NavigationMenuContent>
                        <div className="grid md:w-screen lg:w-5xl grid-cols-5 gap-3 p-4">
                          {activityCategories.map((option) => (
                            <Link
                              key={option.title}
                              href={option.href}
                              className="flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-md transition-colors"
                            >
                              {option.icon}
                              <span>{option.title}</span>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    )}

                    {item.content === "food" && (
                      <NavigationMenuContent>
                        <div className="grid grid-cols-3 md:w-screen lg:w-3xl gap-3 p-4">
                          <div>
                            <h3 className="font-medium text-sm mb-2 text-primary">
                              Dietary Preference
                            </h3>
                            <ul className="space-y-1">
                              {dietaryPreferences.map((option) => (
                                <li key={option.name}>
                                  <Link
                                    href={`/food-beverage/dietary/${option.name
                                      .toLowerCase()
                                      .replace(/[^a-z0-9]/g, "-")}`}
                                    className="flex items-center gap-2 py-1 text-sm hover:text-primary transition-colors"
                                  >
                                    {option.icon}
                                    <span>{option.name}</span>
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
                                <li key={option.name}>
                                  <Link
                                    href={`/food-beverage/cuisine/${option.name
                                      .toLowerCase()
                                      .replace(/[^a-z0-9]/g, "-")}`}
                                    className="flex items-center gap-2 py-1 text-sm hover:text-primary transition-colors"
                                  >
                                    {option.icon}
                                    <span>{option.name}</span>
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
                                <li key={option.name}>
                                  <Link
                                    href={`/food-beverage/specialty/${option.name
                                      .toLowerCase()
                                      .replace(/[^a-z0-9]/g, "-")}`}
                                    className="flex items-center gap-2 py-1 text-sm hover:text-primary transition-colors"
                                  >
                                    {option.icon}
                                    <span>{option.name}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    )}

                    {item.content === "shopping" && (
                      <NavigationMenuContent>
                        <div className="grid grid-cols-3 gap-4 p-4 md:w-screen lg:w-5xl">
                          {shoppingItems.map((option) => (
                            <Link
                              key={option}
                              href={`/shopping/${option
                                .toLowerCase()
                                .replace(/[^a-z0-9]/g, "-")}`}
                              className="flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-md transition-colors"
                            >
                              <ShoppingBag size={16} />
                              <span>{option}</span>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    )}

                    {item.content === "events" && (
                      <NavigationMenuContent>
                        <div className="md:w-screen lg:w-5xl ">
                          <div className="">
                            <div className=" grid grid-cols-3 gap-3 p-4">
                              {eventsAndArtists.events.map((event) => (
                                <div key={event.name}>
                                  <Link
                                    href={`/events/${event.name
                                      .toLowerCase()
                                      .replace(/[^a-z0-9]/g, "-")}`}
                                    className="flex items-center gap-2 py-1 text-sm hover:text-primary transition-colors"
                                  >
                                    {event.icon}
                                    <span>{event.name}</span>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    )}

                    {item.content === "artists" && (
                      <NavigationMenuContent>
                        <div className=" gap-3 p-4 lg:w-5xl md:w-screen ">
                          <div className="col-span-3">
                            <div className="grid grid-cols-3 gap-3">
                              {eventsAndArtists.artists.map((artist) => (
                                <Link
                                  key={artist.name}
                                  href={`/artists/${artist.name
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]/g, "-")}`}
                                  className="flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-md transition-colors"
                                >
                                  {artist.icon}
                                  <span>{artist.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    )}

                    {item.content === "tourguide" && (
                      <NavigationMenuContent>
                        <div className="grid md:w-screen lg:w-5xl grid-cols-5 gap-3 p-4">
                          {tourguides.map((option, index) => (
                            <Link
                              key={index}
                              href={option}
                              className="flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-md transition-colors"
                            >
                              {option}
                              {/* <span>{option.title}</span> */}
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    )}

                    {item.content === "other" && (
                      <NavigationMenuContent>
                        <div className="grid grid-cols-4 lg:w-[1000px] gap-4 p-4 md:w-screen ">
                          {other.map((option) => (
                            <Link
                              key={option}
                              href={`/other/${option
                                .trim()
                                .toLowerCase()
                                .replace(/[^a-z0-9]/g, "-")}`}
                              className="flex items-center gap-2 p-2 text-sm hover:bg-accent rounded-md transition-colors"
                            >
                              <Compass size={16} />
                              <span>{option}</span>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    )}
                  </>
                ) : (
                  <Link href={item.href} passHref>
                    <NavigationMenuLink
                      className={
                        navigationMenuTriggerStyle() + " h-16 px-4 font-normal"
                      }
                    >
                      <div className="flex flex-col items-center justify-center space-y-1">
                        {item.icon}
                        <span className="text-xs">{item.title}</span>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default SecNav;

const ListItem = React.forwardRef(
  ({ className, title, children, href, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={href}
            ref={ref}
            className={cn(
              "flex flex-col space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              {icon} {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
