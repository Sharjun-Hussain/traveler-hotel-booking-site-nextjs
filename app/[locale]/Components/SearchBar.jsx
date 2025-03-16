// components/SearchBar.js
"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import ModernDatepicker from "./DatePicker";
import CustomGuestSelector from "./PassengerPicker";
import { MultiSelect } from "@/components/ui/MultipleSelector";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchType, setSearchType] = useState("hotels");
  const [selectedFoodType, setselectedFoodType] = useState([]);
  const router = useRouter();

  const handleSearchClick = () => {
    const routes = {
      hotels: "/hotels-and-apartments",
      homestay: "/homestays",
      activities: "/activity",
      transport: "/transport",
      food: "/food-beverages",
    };

    const route = routes[searchType];
    router.push(route);
  };

  const foodtype = [
    {
      value: "specialty-restaurant",
      label: "Specialty Restaurant",
      icon: Turtle,
    },
    { value: "cuisine-based", label: "Cuisine Based", icon: Cat },
    { value: "dietary-preference", label: "Dietary Preference", icon: Dog },
  ];

  return (
    <Card className="w-full relative max-w-7xl bg-background/95 backdrop-blur-sm border-none p-0  shadow-lg">
      <CardContent className="p-3 sm:p-6 rounded-lg">
        {/* Search Type Tabs */}
        <Tabs
          defaultValue="hotels"
          onValueChange={setSearchType}
          className="w-full"
        >
          <TabsList className="flex justify-around w-full gap-2  overflow-x-auto mb-4 lg:m-0 sm:mb-6">
            <TabsTrigger
              value="hotels"
              className="text-xs sm:text-sm whitespace-nowrap"
            >
              Hotels & Apartments
            </TabsTrigger>
            <TabsTrigger
              value="homestay"
              className="text-xs sm:text-sm whitespace-nowrap"
            >
              Homestays
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="text-xs sm:text-sm whitespace-nowrap"
            >
              Activities
            </TabsTrigger>
            <TabsTrigger
              value="transport"
              className="text-xs sm:text-sm whitespace-nowrap"
            >
              Transport
            </TabsTrigger>
            <TabsTrigger
              value="food"
              className="text-xs sm:text-sm whitespace-nowrap"
            >
              Food & Beverages
            </TabsTrigger>
          </TabsList>

          {/* Search Forms */}
          <TabsContent value="hotels" className="lg:mt-6 ">
            <div className="grid grid-cols-1  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6  gap-3 sm:gap-4">
              <div className="sm:col-span-1   md:col-span-1  lg:col-span-1 xl:col-span-1">
                <div className="p-2 bg-white border shadow rounded-md transition-shadow">
                  <Label className="text-xs sm:text-sm mb-1 block">
                    Destination/Hotel
                  </Label>
                  <Input
                    type="text"
                    placeholder="Where are you going?"
                    className="text-sm "
                  />
                </div>
              </div>
              <div className="sm:col-span-1 md:col-span-1  lg:col-span-1 xl:col-span-1">
                <div className="p-2 bg-white border shadow rounded-md transition-shadow">
                  <Label className="text-xs sm:text-sm mb-1 block">
                    Travellor Type
                  </Label>
                  <Select defaultValue="1a0c">
                    <SelectTrigger className="text-sm ">
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent
                      className="w-[200px] max-w-full"
                      position="popper"
                      sideOffset={4}
                    >
                      <SelectItem value="1a0c">
                        Budget Tourer/Backpacker
                      </SelectItem>
                      <SelectItem value="Business Traveler">
                        Business Traveler
                      </SelectItem>
                      <SelectItem value="Couple">Couple</SelectItem>
                      <SelectItem value="2a0c">Digital Nomad</SelectItem>
                      <SelectItem value="2a0c">Family</SelectItem>
                      <SelectItem value="2a0c">Group</SelectItem>
                      <SelectItem value="2a0c">Honeymooners</SelectItem>
                      <SelectItem value="2a0c">Researcher/Student</SelectItem>
                      <SelectItem value="2a0c">Solo Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 xl:col-span-1">
                <div className="p-2 bg-white border shadow rounded-md transition-shadow">
                  <CustomGuestSelector />
                </div>
              </div>

              <div className="sm:col-span-3 lg:col-span-3 xl:col-span-3">
                <ModernDatepicker className="absolute z-100" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="homestay" className="lg:mt-6">
            <div className="grid grid-cols-1  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6  gap-3 sm:gap-4">
              <div className="sm:col-span-1   md:col-span-1  lg:col-span-1 xl:col-span-1">
                <div className="p-2 bg-white border shadow rounded-md transition-shadow">
                  <Label className="text-xs sm:text-sm mb-1 block">
                    Destination/Hotel
                  </Label>
                  <Input
                    type="text"
                    placeholder="Where are you going?"
                    className="text-sm "
                  />
                </div>
              </div>
              <div className="sm:col-span-1 md:col-span-1  lg:col-span-1 xl:col-span-1">
                <div className="p-2 bg-white border shadow rounded-md transition-shadow">
                  <Label className="text-xs sm:text-sm mb-1 block">
                    Travellor Type
                  </Label>
                  <Select defaultValue="1a0c">
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1a0c">
                        Budget Tourer/Backpacker
                      </SelectItem>
                      <SelectItem value="Business Traveler">
                        Business Traveler
                      </SelectItem>
                      <SelectItem value="Couple">Couple</SelectItem>
                      <SelectItem value="2a0c">Digital Nomad</SelectItem>
                      <SelectItem value="2a0c">Family</SelectItem>
                      <SelectItem value="2a0c">Group</SelectItem>
                      <SelectItem value="2a0c">Honeymooners</SelectItem>
                      <SelectItem value="2a0c">Researcher/Student</SelectItem>
                      <SelectItem value="2a0c">Solo Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 xl:col-span-1">
                <div className="p-2 bg-white border shadow rounded-md transition-shadow">
                  <CustomGuestSelector />
                </div>
              </div>

              <div className="sm:col-span-3 lg:col-span-3 xl:col-span-3">
                <ModernDatepicker className="absolute z-100" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="lg:mt-6">
            <div className="flex  gap-3 sm:gap-4">
              <div className="flex-1">
                <Label className="text-xs sm:text-sm mb-1 block">
                  Activity
                </Label>
                <Input
                  type="text"
                  placeholder="Search by city or activity?"
                  className="text-sm"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transport" className="lg:mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="sm:col-span-2 lg:col-span-2  ">
                <Label className="text-xs sm:text-sm mb-1 block">
                  Service Provider/City
                </Label>
                <Input
                  type="text"
                  placeholder="Uber or Colombo"
                  className="text-sm"
                />
              </div>
              {/* <div className="sm:col-span-2 lg:col-span-1">
                <Label className="text-xs sm:text-sm mb-1 block">To</Label>
                <Input
                  type="text"
                  placeholder="Where to?"
                  className="text-sm"
                />
              </div> */}
              {/* <div className="sm:col-span-2 lg:col-span-1">
                <CustomGuestSelector type="transport" />
              </div>
              <div className="lg:col-span-3">
                <ModernDatepicker type="transport" />
              </div> */}
            </div>
          </TabsContent>

          <TabsContent value="food" className="lg:mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label className="text-xs sm:text-sm mb-1 block">
                  Location
                </Label>
                <Input
                  type="text"
                  placeholder="Where are you dining?"
                  className="text-sm"
                />
              </div>

              <div>
                <Label className="text-xs sm:text-sm mb-1 block">
                  Cuisine Type
                </Label>
                {/* <Select defaultValue="all">
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cuisines</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="seafood">Seafood</SelectItem>
                  </SelectContent>
                </Select> */}
                <MultiSelect
                  options={foodtype}
                  onValueChange={setselectedFoodType}
                  defaultValue={selectedFoodType}
                  placeholder="Select Food Type"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
              </div>
              {/* <div>
                <Label className="text-xs sm:text-sm mb-1 block">
                  Party Size
                </Label>
                <Select defaultValue="2p">
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select party size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1p">1 Person</SelectItem>
                    <SelectItem value="2p">2 People</SelectItem>
                    <SelectItem value="4p">3-4 People</SelectItem>
                    <SelectItem value="5p">5+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            </div>
          </TabsContent>

          {/* Search Button */}
          <div className="mt-4 sm:mt-6">
            <Button onClick={handleSearchClick} className="w-full text-sm">
              Search
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
