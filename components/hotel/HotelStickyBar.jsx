import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function HotelStickyBar({
  isScrolled,
  hotelData,
  selectedRoom,
  calculateNights,
  totalPrice,
  serviceFee,
  handleBookNow,
}) {
  if (!isScrolled) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <div className="relative w-12 h-12 mr-3">
              <Image
                src={hotelData.images[0]}
                alt={hotelData.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div>
              <h3 className="font-bold">{hotelData.name}</h3>
              <div className="flex items-center text-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span>{hotelData.rating}</span>
                <span className="mx-1">·</span>
                <span className="underline">
                  {hotelData.reviewCount} reviews
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-right mr-6 hidden md:block">
            <div className="text-sm text-gray-500">
              Price for {calculateNights()} nights
            </div>
            <div className="font-bold text-xl">
              ${totalPrice() + serviceFee()}
            </div>
          </div>
          <Button
            onClick={handleBookNow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
          >
            Reserve
          </Button>
        </div>
      </div>
    </div>
  );
}
