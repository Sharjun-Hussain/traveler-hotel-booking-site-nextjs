import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, ThumbsUp, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";

export default function HotelBookingWidget({
  hotelData,
  selectedRoom,
  setSelectedRoom,
  selectedDates,
  setSelectedDates,
  guests,
  setGuests,
  calculateNights,
  totalPrice,
  serviceFee,
  handleBookNow,
}) {
  return (
    <div className="sticky top-16 border rounded-xl shadow-lg overflow-hidden">
      {/* Price Display */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-end mb-2">
          <div>
            {selectedRoom?.discountPrice ? (
              <>
                <span className="text-2xl font-bold text-blue-600">
                  ${selectedRoom.discountPrice}
                </span>
                <span className="text-sm text-gray-600 ml-1">/ night</span>
                <div className="text-sm text-gray-500 line-through">
                  ${selectedRoom.price}
                </div>
              </>
            ) : (
              <>
                <span className="text-2xl font-bold text-blue-600">
                  $
                  {selectedRoom?.price ||
                    hotelData.discountPrice ||
                    hotelData.price}
                </span>
                <span className="text-sm text-gray-600 ml-1">/ night</span>
                {hotelData.discountPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    ${hotelData.price}
                  </div>
                )}
              </>
            )}
          </div>
          {(selectedRoom?.discountPrice || hotelData.discountPrice) && (
            <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
              Save{" "}
              {selectedRoom
                ? Math.round(
                    (1 - selectedRoom.discountPrice / selectedRoom.price) * 100
                  )
                : hotelData.discountPercentage}
              %
            </div>
          )}
        </div>
        <div className="flex items-center text-green-600 text-sm">
          <ThumbsUp className="w-4 h-4 mr-1" />
          <span>Great price for this area</span>
        </div>
      </div>

      {/* Date Picker */}
      <div className="p-4 border-b">
        <label className="block font-medium mb-2">Your stay</label>
        <div className="grid grid-cols-2 gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDates.checkIn
                  ? selectedDates.checkIn.toLocaleDateString()
                  : "Check-in"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDates.checkIn}
                onSelect={(date) =>
                  setSelectedDates({ ...selectedDates, checkIn: date })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDates.checkOut
                  ? selectedDates.checkOut.toLocaleDateString()
                  : "Check-out"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDates.checkOut}
                onSelect={(date) =>
                  setSelectedDates({ ...selectedDates, checkOut: date })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Guest Selector */}
      <div className="p-4 border-b">
        <label className="block font-medium mb-2">Guests</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <User className="mr-2 h-4 w-4" />
              {guests.adults} adults, {guests.children} children,{" "}
              {guests.infants} infants
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              {/* Adults */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Adults</h4>
                  <p className="text-sm text-gray-500">Ages 13+</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setGuests({
                        ...guests,
                        adults: Math.max(1, guests.adults - 1),
                      })
                    }
                  >
                    -
                  </Button>
                  <span>{guests.adults}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setGuests({
                        ...guests,
                        adults: guests.adults + 1,
                      })
                    }
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Children */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Children</h4>
                  <p className="text-sm text-gray-500">Ages 2–12</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setGuests({
                        ...guests,
                        children: Math.max(0, guests.children - 1),
                      })
                    }
                  >
                    -
                  </Button>
                  <span>{guests.children}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setGuests({
                        ...guests,
                        children: guests.children + 1,
                      })
                    }
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Infants */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Infants</h4>
                  <p className="text-sm text-gray-500">Under 2</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setGuests({
                        ...guests,
                        infants: Math.max(0, guests.infants - 1),
                      })
                    }
                  >
                    -
                  </Button>
                  <span>{guests.infants}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setGuests({
                        ...guests,
                        infants: guests.infants + 1,
                      })
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Selected Room */}
      {selectedRoom && (
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Selected room</h4>
            <button
              onClick={() => setSelectedRoom(null)}
              className="text-blue-600 text-sm"
            >
              Change
            </button>
          </div>
          <div className="flex items-center">
            <div className="relative w-12 h-12 mr-3">
              <Image
                src={selectedRoom.image}
                alt={selectedRoom.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div>
              <div className="font-medium">{selectedRoom.name}</div>
              <div className="text-sm text-gray-600">
                {selectedRoom.capacity} guests • {selectedRoom.beds}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="p-4 border-b">
        <h4 className="font-medium mb-3">Price details</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">
              $
              {selectedRoom?.discountPrice ||
                selectedRoom?.price ||
                hotelData.discountPrice ||
                hotelData.price}{" "}
              x {calculateNights()} nights
            </span>
            <span>
              $
              {(selectedRoom?.discountPrice ||
                selectedRoom?.price ||
                hotelData.discountPrice ||
                hotelData.price) * calculateNights()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Service fee</span>
            <span>${serviceFee()}</span>
          </div>
          <div className="flex justify-between text-green-600 text-sm">
            <span>Discount</span>
            <span>
              -$
              {selectedRoom
                ? (selectedRoom.price - selectedRoom.discountPrice) *
                  calculateNights()
                : (hotelData.price - hotelData.discountPrice) *
                  calculateNights()}
            </span>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${totalPrice() + serviceFee()}</span>
        </div>
      </div>

      {/* Reserve Button */}
      <div className="p-4">
        <Button
          onClick={handleBookNow}
          disabled={
            !selectedRoom || !selectedDates.checkIn || !selectedDates.checkOut
          }
          className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
            selectedRoom && selectedDates.checkIn && selectedDates.checkOut
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Reserve
        </Button>
        {(!selectedRoom ||
          !selectedDates.checkIn ||
          !selectedDates.checkOut) && (
          <p className="text-sm text-gray-500 mt-2 text-center">
            {!selectedRoom
              ? "Please select a room"
              : !selectedDates.checkIn || !selectedDates.checkOut
              ? "Please select check-in and check-out dates"
              : ""}
          </p>
        )}
        <div className="mt-4 text-sm text-gray-600 text-center">
          No payment required at this time
        </div>
      </div>
    </div>
  );
}
