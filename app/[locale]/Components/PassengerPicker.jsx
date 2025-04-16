import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";

const CustomGuestSelector = ({
  showlabel = true,
  type = "hotel",
  onSelectData,
}) => {
  const [adults, setAdults] = useState(2);
  const [Infants, setInfants] = useState(0);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (onSelectData) {
      onSelectData({
        adults,
        children,
        rooms,
        Infants,
      });
    }
  }, [adults, children, rooms, Infants]);

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
    if (type == "hotel") {
      if (rooms > 0) parts.push(`${rooms} Room${rooms !== 1 ? "s" : ""}`);
    }
    if (type == "transport") {
      if (Infants >= 0)
        parts.push(`${Infants} Infant${Infants !== 1 ? "s" : ""}`);
    }

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
            className="w-full justify-between bg-transparent text-left font-normal text-sm border"
          >
            <span className="truncate">{getSummaryText()}</span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-min-md p-0" align="start">
          <div className="p-4 space-y-4">
            {/* Adults selector */}
            <div className="flex items-center justify-between">
              <Label className="">
                <div className="flex flex-col gap-1 font-medium">
                  Adults{" "}
                  <span className="text-j-text-small-2 text-xs">
                    Ages 13 or above
                  </span>
                </div>
              </Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => decrement(setAdults, adults, 1)}
                  disabled={adults <= 1}
                >
                  <span className="text-lg font-normal">-</span>
                </Button>
                <span className="w-10 text-center">{adults}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => increment(setAdults, adults)}
                >
                  <span className="text-lg font-normal">+</span>
                </Button>
              </div>
            </div>

            {/* Children selector */}
            <div className="flex items-center justify-between">
              <Label className="">
                <div className="flex flex-col gap-1 font-medium">
                  Children{" "}
                  <span className="text-j-text-small-2 text-xs">
                    Ages 2 – 12
                  </span>
                </div>
              </Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => decrement(setChildren, children)}
                  disabled={children <= 0}
                >
                  <span className="text-lg font-normal">-</span>
                </Button>
                <span className="w-10 text-center">{children}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => increment(setChildren, children)}
                >
                  <span className="text-lg font-normal">+</span>
                </Button>
              </div>
            </div>

            {/* Rooms selector (only for hotels) */}
            {type === "hotel" && (
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
                    <span className="text-lg font-normal">-</span>
                  </Button>
                  <span className="w-10 text-center">{rooms}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => increment(setRooms, rooms)}
                  >
                    <span className="text-lg font-normal">+</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Transport type (only for transport) */}
            {type === "transport" && (
              <div className="flex items-center justify-between">
                <Label className="">
                  <div className="flex flex-col gap-1 font-medium">
                    Adults{" "}
                    <span className="text-j-text-small-2 text-xs">
                      Ages 0 - 2
                    </span>
                  </div>
                </Label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => decrement(setInfants, Infants, 0)}
                    disabled={Infants <= 0}
                  >
                    <span className="text-lg font-bold">-</span>
                  </Button>
                  <span className="w-10 text-center">{Infants}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => increment(setInfants, Infants)}
                  >
                    <span className="text-lg font-bold">+</span>
                  </Button>
                </div>
              </div>
            )}

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
