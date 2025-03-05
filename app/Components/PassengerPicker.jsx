import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";

const CustomGuestSelector = ({ showlabel = false }) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const increment = (setter, value, max = 10) => {
    if (value < max) setter(value + 1);
  };

  const decrement = (setter, value, min = 0) => {
    if (value > min) setter(value - 1);
  };

  const getSummaryText = () => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults !== 1 ? "s" : ""}`);
    if (children > 0)
      parts.push(`${children} Child${children !== 1 ? "ren" : ""}`);
    if (rooms > 0) parts.push(`${rooms} Room${rooms !== 1 ? "s" : ""}`);

    return parts.join(", ");
  };

  return (
    <div className="w-full max-w-sm">
      {showlabel && (
        <Label className="text-xs sm:text-sm mb-1 block">Guests</Label>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-transparent text-left font-normal text-sm border border-gray-200 h-10"
          >
            <span className="truncate">{getSummaryText()}</span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="p-4 space-y-4">
            {/* Adults selector */}
            <div className="flex items-center justify-between">
              <Label className="font-medium">Adults</Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => decrement(setAdults, adults, 1)}
                  disabled={adults <= 1}
                >
                  <span className="text-lg font-bold">-</span>
                </Button>
                <span className="w-10 text-center">{adults}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => increment(setAdults, adults)}
                >
                  <span className="text-lg font-bold">+</span>
                </Button>
              </div>
            </div>

            {/* Children selector */}
            <div className="flex items-center justify-between">
              <Label className="font-medium">Children</Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => decrement(setChildren, children)}
                  disabled={children <= 0}
                >
                  <span className="text-lg font-bold">-</span>
                </Button>
                <span className="w-10 text-center">{children}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => increment(setChildren, children)}
                >
                  <span className="text-lg font-bold">+</span>
                </Button>
              </div>
            </div>

            {/* Rooms selector */}
            <div className="flex items-center justify-between">
              <Label className="font-medium">Rooms</Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => decrement(setRooms, rooms, 1)}
                  disabled={rooms <= 1}
                >
                  <span className="text-lg font-bold">-</span>
                </Button>
                <span className="w-10 text-center">{rooms}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => increment(setRooms, rooms)}
                >
                  <span className="text-lg font-bold">+</span>
                </Button>
              </div>
            </div>

            <Button className="w-full mt-2" onClick={() => setIsOpen(false)}>
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomGuestSelector;
