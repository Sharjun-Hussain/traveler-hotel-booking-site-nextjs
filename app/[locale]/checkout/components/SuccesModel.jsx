"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Share2 } from "lucide-react";

export default function SuccessModal({ isOpen, onClose, bookingDetails }) {
  const { hotelName, roomType, checkIn, checkOut, totalPrice, currency } =
    bookingDetails;

  const bookingId = `BK-${Math.floor(100000 + Math.random() * 900000)}`;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-300" />
            </div>
            <DialogTitle className="mt-4 text-xl">
              Booking Confirmed!
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 mb-4">
            <p className="text-center font-medium mb-2">Booking Reference</p>
            <p className="text-center text-xl font-bold">{bookingId}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="font-medium">Property:</p>
              <p>{hotelName}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Room:</p>
              <p>{roomType}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Check-in:</p>
              <p>{formatDate(checkIn)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Check-out:</p>
              <p>{formatDate(checkOut)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Total:</p>
              <p className="font-bold">
                {currency} {totalPrice}
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500">
          A confirmation email has been sent to your email address.
        </p>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
          <Button className="flex-1" onClick={onClose}>
            View Booking Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
