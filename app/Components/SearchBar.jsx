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

export default function SearchBar() {
  const [searchType, setSearchType] = useState("hotels");

  return (
    <Card className="w-full max-w-4xl bg-background/95 backdrop-blur-sm border-none p-0  shadow-lg">
      <CardContent className="p-3 sm:p-6 rounded-lg">
        {/* Search Type Tabs */}
        <Tabs
          defaultValue="hotels"
          onValueChange={setSearchType}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 overflow-x-auto mb-4 lg:m-0 sm:mb-6">
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
              value="packages"
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
          <TabsContent value="hotels" className="mt-0 ">
            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="sm:col-span-2   lg:col-span-1">
                <div className="">
                  <Label className="text-xs sm:text-sm mb-1 block">
                    Destination/Hotel
                  </Label>
                  <Input
                    type="text"
                    placeholder="Where are you going?"
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-2  lg:col-span-1">
                <div>
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

              <div className="sm:col-span-2">
                <ModernDatepicker />
              </div>

              <div className="sm:col-span-2">
                <CustomGuestSelector />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="homestay" className="mt-0">
            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="sm:col-span-2   lg:col-span-1">
                <div className="">
                  <Label className="text-xs sm:text-sm mb-1 block">
                    Destination/Hotel
                  </Label>
                  <Input
                    type="text"
                    placeholder="Where are you going?"
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-2  lg:col-span-1">
                <div>
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

              <div className="sm:col-span-2">
                <ModernDatepicker />
              </div>

              <div className="sm:col-span-2">
                <CustomGuestSelector />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="mt-0">
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

          <TabsContent value="packages" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="sm:col-span-2">
                <Label className="text-xs sm:text-sm mb-1 block">From</Label>
                <Input
                  type="text"
                  placeholder="Where From?"
                  className="text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs sm:text-sm mb-1 block">To</Label>
                <Input
                  type="text"
                  placeholder="Where to?"
                  className="text-sm"
                />
              </div>
              {/* <div>
                <Label className="text-xs sm:text-sm mb-1 block">
                  Start Date
                </Label>
                <Input type="date" className="text-sm" />
              </div>
              <div>
                <Label className="text-xs sm:text-sm mb-1 block">
                  End Date
                </Label>
                <Input type="date" className="text-sm" />
              </div> */}
            </div>
          </TabsContent>

          <TabsContent value="food" className="mt-0">
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
                <Label className="text-xs sm:text-sm mb-1 block">Date</Label>
                <Input type="date" className="text-sm" />
              </div>
              <div>
                <Label className="text-xs sm:text-sm mb-1 block">
                  Cuisine Type
                </Label>
                <Select defaultValue="all">
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
                </Select>
              </div>
              <div>
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
              </div>
            </div>
          </TabsContent>

          {/* Search Button */}
          <div className="mt-4 sm:mt-6">
            <Button className="w-full text-sm">Search</Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
