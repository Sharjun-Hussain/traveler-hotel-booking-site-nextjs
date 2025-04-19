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
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SearchBar() {
  const [searchType, setSearchType] = useState("hotels");
  const [selectedFoodType, setselectedFoodType] = useState([]);

  const router = useRouter();

  const handleDataFromGuestSelector = (data) => {
    console.log("Guest Selector Data:", data);
    setDataFromGuestSelector(data);
    // Handle the data as needed
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
    // defaultValues: {
    //   travelorType: "Budget-Tourer-Backpacker",
    //   DestinationOrHotel: "Colombo",
    //   GuestsAndRooms: {
    //     adults: 1,
    //     children: 0,
    //     rooms: 1,
    //     Infants: 0,
    //   },
    //   dates: {
    //     checkIn: new Date(),
    //     checkOut: addDays(new Date(), 3),
    //   },
    // },
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
  const onSubmit = (data) => {
    alert("form Submitted");
    console.log(data);
  };

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
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-8  gap-3 sm:gap-4">
                  <div className="sm:col-span-1 md:col-span-1  lg:col-span-1 xl:col-span-2">
                    <div className="p-2 bg-white border shadow rounded-md transition-shadow">
                      <Label className="text-xs sm:text-sm mb-1 block">
                        Travellor Type
                      </Label>
                      <Select
                        {...methods.register("travelorType")}
                        defaultValue="Budget-Tourer-Backpacker"
                      >
                        <SelectTrigger className="text-sm ">
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent
                          className="w-[200px] max-w-full"
                          position="popper"
                          sideOffset={4}
                        >
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
                          <SelectItem value="Solo-Female">
                            Solo Female
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="sm:col-span-1   md:col-span-1  lg:col-span-1 xl:col-span-2">
                    <div className="p-2 bg-white border shadow rounded-md transition-shadow">
                      <Label className="text-xs sm:text-sm mb-1 block">
                        Destination / Hotel
                      </Label>
                      <Input
                        {...methods.register("DestinationOrHotel", {
                          required: "This field is required", // or minLength: 1
                        })}
                        type="text"
                        placeholder="Where are you going?"
                        className={`text-sm border ${
                          methods.formState.errors.DestinationOrHotel
                            ? "border-red-300"
                            : "border-gray-300"
                        } `}
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 xl:col-span-2">
                    <div className="p-2 bg-white border shadow rounded-md transition-shadow">
                      <CustomGuestSelector onSelectData={handleGuestChange} />
                    </div>
                  </div>

                  <div className="sm:col-span-3 lg:col-span-1 xl:col-span-2">
                    <ModernDatepicker
                      onDatesChange={handleDatesChange}
                      minStay={2}
                      className="my-custom-class"
                      initialCheckIn={watch("dates.checkIn")}
                      initialCheckOut={watch("dates.checkOut")}
                    />
                  </div>
                  <div className="sm:col-span-3 lg:col-span-3 md:grid-cols-3 xl:col-span-8">
                    <Button
                      // disabled={
                      //   !methods.formState.isDirty || methods.formState.isValid
                      // }
                      type="submit"
                      className="w-full text-sm"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </TabsContent>

          <TabsContent value="homestay" className="lg:mt-6">
            <div className="grid grid-cols-1  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6  gap-3 sm:gap-4">
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
              <div className="sm:col-span-1   md:col-span-1  lg:col-span-1 xl:col-span-1">
                <div className="p-2 bg-white border shadow rounded-md transition-shadow">
                  <Label className="text-xs sm:text-sm mb-1 block">
                    Destination
                  </Label>
                  <Input
                    type="text"
                    placeholder="Where are you going?"
                    className="text-sm "
                  />
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
                  Service Provider / City
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
            {/* <Button onClick={handleSearchClick} className="w-full text-sm">
              Search
            </Button> */}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
