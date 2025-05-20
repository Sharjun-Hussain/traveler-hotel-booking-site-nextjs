// pages/shopping.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, ShoppingBag, Store, Star, MapPin, ChevronDown, ChevronUp, SlidersHorizontal, ArrowUpDown, Map } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";
import queryString from "query-string";
import MobileNav from "@/components/ui/MobileNav";
import SecNav from "../Components/SecNav";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import SideBarFilter from "../Components/SideBarFilter";




const ShoppingPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortOption, setSortOption] = useState("rating");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [shopsData, setShopsData] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [activeBottomSheet, setActiveBottomSheet] = useState(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isfixed, setisfixed] = useState(false);
  const [SearchLocation, setSearchLocation] = useState("")
  const [SearchQuery, setSearchQuery] = useState("")


  const handleSearch = () => { }


  // Parse URL params on initial load and when URL changes
  useEffect(() => {
    const params = queryString.parse(searchParams.toString());

    // Initialize filters from URL
    const newFilters = [];

    if (params.category) {
      const categories = Array.isArray(params.category)
        ? params.category
        : [params.category];
      categories.forEach(cat => {
        if (typeof cat === 'string') {
          newFilters.push({ type: 'category', value: cat });
        }
      });
    }

    if (params.location && typeof params.location === 'string') {
      newFilters.push({ type: 'location', value: params.location });
    }

    if (params.shop) {
      const shops = Array.isArray(params.shop)
        ? params.shop
        : [params.shop];
      shops.forEach(shop => {
        if (typeof shop === 'string') {
          newFilters.push({ type: 'shop', value: shop });
        }
      });
    }

    setActiveFilters(newFilters);

    // Initialize sort from URL if present
    if (params.sort && typeof params.sort === 'string' &&
      ['rating', 'name-asc', 'name-desc'].includes(params.sort)) {
      setSortOption(params.sort);
    }

    // Initialize price range from URL if present
    if (params.minPrice && params.maxPrice) {
      const min = Number(params.minPrice);
      const max = Number(params.maxPrice);
      if (!isNaN(min) && !isNaN(max) && min >= 0 && max <= 50000 && min <= max) {
        setPriceRange([min, max]);
      }
    }
  }, [searchParams]);

  // Update URL when filters change
  const updateUrl = useCallback((filters, sort, priceRange) => {
    const params = {};

    // Group filters by type
    const groupedFilters = filters.reduce((acc, filter) => {
      if (!acc[filter.type]) acc[filter.type] = [];
      acc[filter.type].push(filter.value);
      return acc;
    }, {});

    // Add filters to params
    Object.entries(groupedFilters).forEach(([type, values]) => {
      if (values.length === 1) {
        params[type] = values[0];
      } else if (values.length > 1) {
        params[type] = values;
      }
    });

    // Add sort if not default
    if (sort !== 'rating') {
      params.sort = sort;
    }

    // Add price range if not default
    if (priceRange[0] !== 0 || priceRange[1] !== 50000) {
      params.minPrice = priceRange[0];
      params.maxPrice = priceRange[1];
    }

    // Build URL
    const query = queryString.stringify(params, { arrayFormat: 'comma' });
    const url = query ? `${pathname}?${query}` : pathname;

    // Use replace instead of push to avoid adding to history stack
    router.replace(url, { scroll: false });
  }, [pathname, router]);

  // Fetch shops data
  useEffect(() => {
    const fetchShopsData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shops`);
        setShopsData(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopsData();
  }, []);

  // Apply filters and update URL when any filter changes
  useEffect(() => {
    if (shopsData.length === 0) return;

    let results = [...shopsData];

    // Apply category filters
    const categoryFilters = activeFilters.filter(f => f.type === 'category');
    if (categoryFilters.length > 0) {
      results = results.filter(shop =>
        categoryFilters.some(filter =>
          shop.categories.includes(filter.value)
        )
      );
    }

    // Apply location filters
    const locationFilters = activeFilters.filter(f => f.type === 'location');
    if (locationFilters.length > 0) {
      results = results.filter(shop =>
        locationFilters.some(filter =>
          shop.location.toLowerCase().includes(filter.value.toLowerCase())
        )
      );
    }

    // Apply shop name filters
    const shopFilters = activeFilters.filter(f => f.type === 'shop');
    if (shopFilters.length > 0) {
      results = results.filter(shop =>
        shopFilters.some(filter =>
          shop.name.toLowerCase().includes(filter.value.toLowerCase())
        )
      );
    }

    // Apply price range filter to shop items
    results = results.map(shop => ({
      ...shop,
      items: shop.items.filter(item =>
        item.price >= priceRange[0] && item.price <= priceRange[1]
      )
    })).filter(shop => shop.items.length > 0);

    // Sort shops
    switch (sortOption) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredShops(results);
    updateUrl(activeFilters, sortOption, priceRange);
  }, [activeFilters, priceRange, sortOption, shopsData, updateUrl]);

  const addFilter = (type, value) => {
    if (!activeFilters.some(f => f.type === type && f.value === value)) {
      const newFilters = [...activeFilters, { type, value }];
      setActiveFilters(newFilters);
    }
  };

  const removeFilter = (type, value) => {
    let newFilters;
    if (value) {
      newFilters = activeFilters.filter(f => !(f.type === type && f.value === value));
    } else {
      newFilters = activeFilters.filter(f => f.type !== type);
    }
    setActiveFilters(newFilters);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getShopCategories = () => {
    const categories = new Set();
    shopsData.forEach(shop => {
      shop.categories.forEach(cat => categories.add(cat));
    });
    return Array.from(categories).sort();
  };


  return (
    <div className="min-h-screen bg-gray-50 md:pt-14">
      <SecNav />
      <MobileNav />
      <div className=" py-8">
        <div
          className={`fixed transition-all mt-8 hidden lg:grid duration-300 ease-in-out  bg-j-primary py-6 dark:bg-blue-950     ${isfixed
            ? " top-30  left-0 right-0 w-full shadow-md z-52 duration-300 ease-in-out transition-all  "
            : "relative"
            }`}
        >
          <div className="  w-full ">
            <Card className="py-4 mx-12 ">
              <CardContent>
                <div className=" flex gap-4">
                  <div className="space-y-2 w-[80%] ">
                    <div className="flex items-center relative ">
                      <MapPin className="absolute left-3 h-4 w-4 text-gray-500" />
                      <Input
                        className="pl-10"
                        placeholder="City, Area or Shop Name"
                      // value={filters.from}
                      // onChange={(e) =>
                      // setFilters({
                      //   ...filters,
                      //   from: e.target.value,
                      // })
                      // }
                      />
                    </div>
                  </div>
                  <Button className="w-full md:w-auto flex-1 " >
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          {isSearchExpanded && (
            <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-zinc-900 p-4">
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setIsSearchExpanded(false)}>
                  <X size={24} />
                </button>
                <h2 className="text-xl font-bold">Search</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <div className="flex items-center relative">
                    <MapPin className="absolute left-3 h-4 w-4 text-gray-500" />
                    <Input
                      className="pl-10"
                      placeholder="City or Area"
                      value={SearchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Shop or Category</label>
                  <Input
                    placeholder="Shop name or category"
                    value={SearchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 container mx-auto md:gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block lg:col-span-1 mt-14">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" /> Filters
                </h2>

                {activeFilters.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeFilters.map((filter, idx) => (
                      <Badge key={idx} className="flex items-center gap-1">
                        {filter.value}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFilter(filter.type, filter.value)}
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
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>Rs. {priceRange[0].toLocaleString()}</span>
                      <span>Rs. {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Shop Categories</h3>
                  <div className="space-y-2">
                    {getShopCategories().map(category => (
                      <div key={category}>
                        <button
                          className="flex items-center justify-between w-full py-2"
                          onClick={() => toggleCategory(category)}
                        >
                          <span>{category}</span>
                          {expandedCategories[category] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                        {expandedCategories[category] && (
                          <div className="pl-4 space-y-1">
                            {shopsData
                              .filter(shop => shop.categories.includes(category))
                              .map(shop => (
                                <div
                                  key={shop.id}
                                  className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 p-1 rounded"
                                  onClick={() => addFilter('shop', shop.name)}
                                >
                                  <Store className="h-3 w-3" />
                                  {shop.name}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setActiveFilters([]);
                    setPriceRange([0, 50000]);
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Mobile search trigger button */}
          {!isSearchExpanded && (
            <div className="md:hidden py-4 mt-4 w-full">
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="w-full bg-white dark:bg-zinc-800 rounded-lg shadow p-3 flex items-center gap-2"
              >
                <MapPin className="text-gray-400" size={18} />
                <span className="text-sm font-medium">Where are you going?</span>
              </button>
            </div>
          )}
          {/* Mobile Filter Bar */}
          <div className="md:hidden sticky top-0 z-30 dark:bg-zinc-800 border-b dark:border-zinc-700">
            <div className="container mx-auto px-4">
              <div className="flex justify-between">
                <Drawer open={activeBottomSheet === "filter"} onOpenChange={(open) => setActiveBottomSheet(open ? "filter" : null)}>
                  <DrawerTrigger asChild>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm">
                      <SlidersHorizontal size={16} />
                      <span>Filters</span>
                    </button>
                  </DrawerTrigger>
                  <DrawerContent className="h-screen">
                    <DrawerHeader className="text-left">Filters</DrawerHeader>
                    <div className="p-4 overflow-y-auto">
                      <SideBarFilter />
                    </div>
                  </DrawerContent>
                </Drawer>

                <Drawer open={activeBottomSheet === "sort"} onOpenChange={(open) => setActiveBottomSheet(open ? "sort" : null)}>
                  <DrawerTrigger asChild>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm">
                      <ArrowUpDown size={20} /> <span>Sort</span>
                    </button>
                  </DrawerTrigger>
                  <DrawerContent className="h-[40vh]">
                    <DrawerHeader className="text-left">Sort by</DrawerHeader>
                    <div className="p-4">
                      <Select>
                        <SelectTrigger className="w-full mb-2">
                          <SelectValue placeholder="Recommended" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sort by:</SelectLabel>
                            <SelectItem value="Recommended">Recommended</SelectItem>
                            <SelectItem value="lowtohigh">Price (low to high)</SelectItem>
                            <SelectItem value="hightolow">Price (high to low)</SelectItem>
                            <SelectItem value="grapes">Rating (high to low)</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </DrawerContent>
                </Drawer>

                <button className="flex items-center gap-1 px-3 py-2 text-sm">
                  <Map size={20} /> <span>Map</span>
                </button>
              </div>
            </div>
          </div>


          {/* Main Content */}
          <div className="lg:col-span-4 md:mt-14 container mx-auto">
            <div className="flex justify-center md:justify-between items-center mt-2 mb-6 md:gap-8">
              <h1 className="lg:text-2xl font-bold">
                {filteredShops.length}  Shops Found
              </h1>
              <div className="hidden md:block">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeFilters.map((filter, idx) => (
                  <Badge key={idx} className="flex items-center gap-1">
                    {filter.value}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeFilter(filter.type, filter.value)}
                    />
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

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <Card key={idx} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-40 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredShops.length > 0 ? (
              <div className="space-y-6">
                {filteredShops.map(shop => (
                  <Card key={shop.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={shop.image || '/shop-placeholder.jpg'}
                              alt={shop.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{shop.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-3/4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="text-xl font-bold flex items-center gap-2">
                                <Store className="h-5 w-5 text-blue-600" />
                                {shop.name}
                              </h2>
                              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                                <MapPin className="h-3 w-3" />
                                {shop.location}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {shop.categories.map(category => (
                                  <Badge
                                    key={category}
                                    variant="outline"
                                    className="cursor-pointer hover:bg-gray-100"
                                    onClick={() => addFilter('category', category)}
                                  >
                                    {category}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button size="sm">View Shop</Button>
                          </div>

                          <div className="mt-4">
                            <h3 className="font-medium mb-2">Available Items ({shop.items.length})</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {shop.items.slice(0, 4).map(item => (
                                <div key={item.id} className="border rounded-lg p-2">
                                  <div className="aspect-square bg-gray-100 rounded mb-2 overflow-hidden">
                                    <img
                                      src={item.image || '/item-placeholder.jpg'}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <h4 className="text-sm font-medium truncate">{item.name}</h4>
                                  <p className="text-sm font-bold text-blue-600">
                                    Rs. {item.price.toLocaleString()}
                                  </p>
                                </div>
                              ))}
                              {shop.items.length > 4 && (
                                <div className="border rounded-lg p-2 flex items-center justify-center bg-gray-50">
                                  <span className="text-sm font-medium">
                                    +{shop.items.length - 4} more
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-white">
                <ShoppingBag className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="text-lg font-medium mt-4">No shops found</h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters to see more results
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setActiveFilters([]);
                    setPriceRange([0, 50000]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ShoppingPage;