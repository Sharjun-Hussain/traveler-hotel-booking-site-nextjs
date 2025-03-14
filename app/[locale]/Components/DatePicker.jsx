import React, { useState, useEffect, useRef } from "react";
import { format, addDays } from "date-fns";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ModernDatepicker = ({ type = "hotel", props }) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 1));
  const [openPicker, setOpenPicker] = useState(null);

  // Format date for display
  const formatDate = (date) => format(date, "EEE, MMM d");
  const formatDateLong = (date) => format(date, "EEEE, MMMM d, yyyy");

  // Ensure checkout date is after checkin date
  useEffect(() => {
    if (checkOutDate <= checkInDate) {
      setCheckOutDate(addDays(checkInDate, 1));
    }
  }, [checkInDate, checkOutDate]);

  // Calculate stay duration
  if (type !== "transport") {
    var stayDuration = () => {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays === 1 ? "1 night" : `${diffDays} nights`;
    };
  }

  return (
    <div {...props}>
      {/* Mobile Design (stacked) */}
      <div className="md:hidden flex flex-col gap-4 w-full">
        {/* Check-in Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer p-4 rounded-lg shadow-sm w-full hover:border-blue-400 transition-colors bg-white dark:bg-zinc-800">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-300 text-xs font-medium mb-1">
                  CHECK-IN
                </span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {formatDate(checkInDate)}
                </span>
              </div>
              <CalendarDays className="w-5 h-5 text-gray-500 dark:text-white" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start">
            <Calendar
              mode="single"
              selected={checkInDate}
              onSelect={(date) => date && setCheckInDate(date)}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Check-out Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer border p-4 rounded-lg shadow-sm w-full hover:border-blue-400 transition-colors bg-white dark:bg-zinc-800">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-300 text-xs font-medium mb-1">
                  CHECK-OUT
                </span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {formatDate(checkOutDate)}
                </span>
              </div>
              <CalendarDays className="w-5 h-5 text-gray-500 dark:text-white" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="end">
            <Calendar
              mode="single"
              selected={checkOutDate}
              onSelect={(date) => date && setCheckOutDate(date)}
              disabled={(date) => date <= checkInDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Desktop Design (combined elegant selector) */}
      <div className="hidden md:block relative">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer border shadow p-2 rounded-md w-full transition-shadow bg-white dark:bg-zinc-800">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-black font-medium dark:text-gray-300 text-sm mb-2">
                    Check-in
                  </span>
                  <span className="text-gray-900 dark:text-white text-sm">
                    {formatDateLong(checkInDate)}
                  </span>
                </div>

                <ArrowRight className="text-gray-400" />

                <div className="flex flex-col">
                  <span className="text-black dark:text-gray-300 text-sm font-medium mb-2">
                    Check-out
                  </span>
                  <span className="text-gray-900 dark:text-white text-sm">
                    {formatDateLong(checkOutDate)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium dark:bg-blue-900 dark:text-blue-200">
                  {type != "transport" && stayDuration()}
                </span>
                <CalendarDays className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 z-50"
            align="center"
            side="bottom"
            sideOffset={8}
            avoidCollisions={false}
          >
            <div className="flex flex-col sm:flex-row  p-4 gap-4 sm:gap-8">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Check-in date
                </h3>
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={(date) => date && setCheckInDate(date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Check-out date
                </h3>
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={(date) => date && setCheckOutDate(date)}
                  disabled={(date) => date <= checkInDate}
                  initialFocus
                />
              </div>
            </div>
            {/* <div className="p-4 border-t">
              <Button className="w-full" onClick={() => document.body.click()}>
                Apply
              </Button>
            </div> */}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ModernDatepicker;
