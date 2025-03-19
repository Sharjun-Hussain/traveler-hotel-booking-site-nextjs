// components/BookingSummary.jsx
import React from "react";
import { format } from "date-fns";
import { Calendar, Users, Bed, Landmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function BookingSummary({ booking }) {
  const {
    hotelName,
    location,
    checkIn,
    checkOut,
    guests,
    roomType,
    price,
    tax,
    totalPrice,
    currency,
    nights,
  } = booking;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return format(date, "EEE, MMM d, yyyy");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">{hotelName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {location}
            </p>
          </div>

          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Check-in</p>
              <p className="text-sm">{formatDate(checkIn)}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Check-out</p>
              <p className="text-sm">{formatDate(checkOut)}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Guests</p>
              <p className="text-sm">
                {guests} {guests === 1 ? "person" : "people"}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Room Type</p>
              <p className="text-sm">{roomType}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">
                {nights} {nights === 1 ? "night" : "nights"}
              </p>
              <p className="text-sm">
                {currency} {price.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm">Taxes & fees</p>
              <p className="text-sm">
                {currency} {tax.toFixed(2)}
              </p>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>
                {currency} {totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
