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
import { addDays } from "date-fns";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SearchBar() {
  const [searchType, setSearchType] = useState("hotels");
  const [selectedFoodType, setSelectedFoodType] = useState([]);
  const router = useRouter();

  const foodtype = [
    {
      value: "specialty-restaurant",
      label: "Specialty Restaurant",
      icon: Turtle,
    },
    { value: "cuisine-based", label: "Cuisine Based", icon: Cat },
    { value: "dietary-preference", label: "Dietary Preference", icon: Dog },
  ];



  const HotelsSchema = z.object({
    travelorType: z.string().min(4, "Travelor type is required!"),
    DestinationOrHotel: z.string().min(4, "Destination or hotel is required!"),
    GuestsAndRooms: z.object({
      adults: z.number().min(1, "At least one adult is required!"),
      children: z.number(),
      rooms: z.number().min(1, "At least one room is required!"),
      Infants: z.number(),
    }),
    dates: z
      .object({
        checkIn: z
          .date()
          .min(new Date(), { message: "Check-in date must be in the future" }),
        checkOut: z
          .date()
          .min(new Date(), { message: "Check-out date must be in the future" }),
      })
      .refine((data) => data.checkOut > data.checkIn, {
        message: "Check-out date must be after check-in date",
        path: ["checkOut"],
      }),
  });

  const methods = useForm({
    resolver: zodResolver(HotelsSchema),
    defaultValues: {
      travelorType: "Budget-Tourer-Backpacker",
      DestinationOrHotel: "",
      GuestsAndRooms: {
        adults: 1,
        children: 0,
        rooms: 1,
        Infants: 0
      },
      dates: {
        checkIn: addDays(new Date(), 1),
        checkOut: addDays(new Date(), 3)
      }
    }
  });

  const { setValue, watch } = methods;

  const handleDatesChange = ({ checkIn, checkOut }) => {
    setValue("dates.checkIn", checkIn);
    setValue("dates.checkOut", checkOut);
  };

  const handleGuestChange = (data) => {
    setValue("GuestsAndRooms.adults", data.adults);
    setValue("GuestsAndRooms.children", data.children);
    setValue("GuestsAndRooms.rooms", data.rooms);
    setValue("GuestsAndRooms.Infants", data.Infants);
  };


  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);
      const isValid = await methods.trigger();
      if (!isValid) {
        console.log("Form errors:", methods.formState.errors);
        return;
      }

      const params = new URLSearchParams();

      params.append('traveorType', data.travelorType);
      params.append("destination", data.DestinationOrHotel);

      // Guests and rooms
      params.append("adults", data.GuestsAndRooms.adults);
      params.append("children", data.GuestsAndRooms.children);
      params.append("rooms", data.GuestsAndRooms.rooms);
      params.append("infants", data.GuestsAndRooms.Infants);

      // Dates (format as YYYY-MM-DD)
      params.append("checkIn", data.dates.checkIn.toISOString().split("T")[0]);
      params.append("checkOut", data.dates.checkOut.toISOString().split("T")[0]);


      const routes = {
        hotels: "/hotels-and-apartments",
        homestay: "/homestays",
        activities: "/activity",
        transport: "/transport",
        food: "/food-beverages",
      };
      router.push(`${routes[searchType]}?${params.toString()}`);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };


  return (
    <Card className="w-full max-w-7xl bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      <CardContent className="p-4 sm:p-6 pb-0 sm:pb-0">
        {/* Search Type Tabs - Improved for mobile */}
        <Tabs
          defaultValue="hotels"
          onValueChange={setSearchType}
          className="w-full"
        >
          <div className="relative mb-4 sm:mb-6">
            <TabsList className="flex space-x-1 w-full overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              {[
                { value: "hotels", label: "Hotels & Apartments" },
                { value: "homestay", label: "Homestays" },
                { value: "activities", label: "Activities" },
                { value: "transport", label: "Transport" },
                { value: "food", label: "Food & Beverages" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${searchType === tab.value
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-full sm:hidden"></div>
          </div>

          {/* Search Forms */}
          <TabsContent value="hotels" className="mt-0">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

                  {/* Traveler Type */}
                  {/* Traveler Type - Updated Implementation */}
                  <div className="space-y-1 bg-white rounded-md p-2 shadow-sm">
                    <Label className="text-sm font-medium text-gray-700">
                      Traveler Type
                    </Label>
                    <Controller
                      name="travelorType"
                      control={methods.control}
                      defaultValue="Budget-Tourer-Backpacker"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="h-12 text-sm bg-white border-gray-300 hover:border-gray-400">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="w-[var(--radix-select-trigger-width)] max-w-full">
                            <SelectItem value="Budget-Tourer-Backpacker">
                              Budget Tourer/Backpacker
                            </SelectItem>
                            <SelectItem value="Business Traveler">
                              Business Traveler
                            </SelectItem>
                            <SelectItem value="Couple">Couple</SelectItem>
                            <SelectItem value="Digital-Nomad">
                              Digital Nomad
                            </SelectItem>
                            <SelectItem value="Family">Family</SelectItem>
                            <SelectItem value="Group">Group</SelectItem>
                            <SelectItem value="Honeymooners">
                              Honeymooners
                            </SelectItem>
                            <SelectItem value="Researcher-Student">
                              Researcher/Student
                            </SelectItem>
                            <SelectItem value="Solo-Female">Solo Female</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Destination */}
                  <div className="space-y-1 bg-white rounded-md p-2 shadow-sm">
                    <Label className="text-sm font-medium text-gray-700">
                      Destination / Hotel
                    </Label>
                    <Input
                      {...methods.register("DestinationOrHotel")}
                      type="text"
                      placeholder="Where are you going?"
                      className={`h-12 text-sm ${methods.formState.errors.DestinationOrHotel
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300 focus:ring-primary-200"
                        } focus:ring-2`}
                    />
                  </div>
                  {methods.formState.errors.DestinationOrHotel && (
                    <p className="text-red-500 text-xs mt-1">
                      {methods.formState.errors.DestinationOrHotel.message}
                    </p>
                  )}

                  {/* Guests */}
                  <div className="space-y-1 bg-white rounded-md p-2 shadow-sm">
                    <div className="h-12">
                      <Controller
                        name="GuestsAndRooms"
                        control={methods.control}
                        render={({ field }) => (
                          <CustomGuestSelector
                            type="general"
                            onSelectData={(data) => {
                              handleGuestChange(data)
                              field.onChange(data)
                            }}
                          />
                        )} />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-1">
                    <div className="h-12">
                      <Controller
                        name="dates"
                        control={methods.control}
                        render={({ field }) => (
                          <ModernDatepicker
                            onDatesChange={(dates) => {
                              handleDatesChange(dates)
                              field.onChange(dates)
                            }}
                            minStay={2}
                            initialCheckIn={watch("dates.checkIn")}
                            initialCheckOut={watch("dates.checkOut")}
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="sm:col-span-2 lg:col-span-4 mt-1">
                    <Button
                      type="submit"
                      className="w-full h-12 text-sm font-medium bg-j-primary hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      Search Hotels
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </TabsContent>

          <TabsContent value="homestay" className="mt-0">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {/* Traveler Type */}
                  <div className="space-y-1 bg-white rounded-md p-2 shadow-sm">
                    <Label className="text-sm font-medium text-gray-700">
                      Traveler Type
                    </Label>
                    <Select
                      {...methods.register("travelorType")}
                      defaultValue="Budget-Tourer-Backpacker"
                    >
                      <SelectTrigger className="h-12 text-sm bg-white border-gray-300 hover:border-gray-400">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="w-[var(--radix-select-trigger-width)] max-w-full">
                        <SelectItem value="Budget-Tourer-Backpacker">
                          Budget Tourer/Backpacker
                        </SelectItem>
                        <SelectItem value="Business Traveler">
                          Business Traveler
                        </SelectItem>
                        <SelectItem value="Couple">Couple</SelectItem>
                        <SelectItem value="Digital-Nomad">
                          Digital Nomad
                        </SelectItem>
                        <SelectItem value="Family">Family</SelectItem>
                        <SelectItem value="Group">Group</SelectItem>
                        <SelectItem value="Honeymooners">
                          Honeymooners
                        </SelectItem>
                        <SelectItem value="Researcher-Student">
                          Researcher/Student
                        </SelectItem>
                        <SelectItem value="Solo-Female">Solo Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Destination */}
                  <div className="space-y-1 bg-white rounded-md p-2 shadow-sm">
                    <Label className="text-sm font-medium text-gray-700">
                      Destination / Hotel
                    </Label>
                    <Input
                      {...methods.register("DestinationOrHotel", {
                        required: "This field is required",
                      })}
                      type="text"
                      placeholder="Where are you going?"
                      className={`h-12 text-sm ${methods.formState.errors.DestinationOrHotel
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300 focus:ring-primary-200"
                        } focus:ring-2`}
                    />
                  </div>

                  {/* Guests */}
                  <div className="space-y-1 bg-white rounded-md p-2 shadow-sm">
                    <div className="h-12">
                      <CustomGuestSelector
                        type="general"
                        onSelectData={handleGuestChange}
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-1">
                    <div className="h-12">
                      <ModernDatepicker
                        onDatesChange={handleDatesChange}
                        minStay={2}
                        initialCheckIn={watch("dates.checkIn")}
                        initialCheckOut={watch("dates.checkOut")}
                      />
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="sm:col-span-2 lg:col-span-4 mt-1">
                    <Button
                      type="submit"
                      className="w-full h-12 text-sm font-medium bg-j-primary hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      Search HomeStays
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </TabsContent>

          <TabsContent value="activities" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="sm:col-span-2 md:col-span-4 space-y-1">
                <Label className="text-sm font-medium text-gray-700">
                  Activity
                </Label>
                <Input
                  type="text"
                  placeholder="Search by city or activity"
                  className="h-12 text-sm border-gray-300 focus:ring-primary-200 focus:ring-2"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-4 mt-2">
                <Button
                  onClick={onSubmit}
                  className="w-full h-12 text-sm font-medium bg-j-primary hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  Search Activities
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transport" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="sm:col-span-2 md:col-span-4 space-y-1">
                <Label className="text-sm font-medium text-gray-700">
                  Service Provider / City
                </Label>
                <Input
                  type="text"
                  placeholder="Uber or Colombo"
                  className="h-12 text-sm border-gray-300 focus:ring-primary-200 focus:ring-2"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-4 mt-2">
                <Button
                  onClick={onSubmit}
                  className="w-full h-12 text-sm font-medium bg-j-primary hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  Search Transport
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="food" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="space-y-1 md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">
                  Location
                </Label>
                <Input
                  type="text"
                  placeholder="Where are you dining?"
                  className="h-12 text-sm border-gray-300 focus:ring-primary-200 focus:ring-2"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">
                  Cuisine Type
                </Label>
                <MultiSelect
                  options={foodtype}
                  onValueChange={setSelectedFoodType}
                  defaultValue={selectedFoodType}
                  placeholder="Select Food Type"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                  className="h-12"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-4 mt-2">
                <Button
                  onClick={onSubmit}
                  className="w-full h-12 text-sm font-medium bg-j-primary hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  s
                >
                  Search Restaurants
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Card>
  );
}
