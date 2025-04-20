import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RoomsTab({ rooms, handleRoomClick }) {
  const [showRoomDetails, setShowRoomDetails] = useState({});

  const toggleRoomDetails = (roomId) => {
    setShowRoomDetails((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available rooms</h2>
      <div className="space-y-6">
        {rooms.map((room) => (
          <div key={room.id} className="border rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-4 md:mb-0 md:mr-4">
                  <div className="relative h-48 w-full rounded-lg overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-bold mb-1">{room.name}</h3>
                    <div className="text-right">
                      <div className="text-lg font-bold text-j-primary">
                        ${room.discountPrice || room.price}
                        <span className="text-sm font-normal text-gray-600">
                          {" "}
                          / night
                        </span>
                      </div>
                      {room.discountPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ${room.price}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="mr-3">{room.capacity} guests</span>
                    <span className="mr-3">•</span>
                    <span>{room.beds}</span>
                    <span className="mx-3">•</span>
                    <span>{room.size}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {room.cancellation && (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-200 bg-green-50"
                      >
                        {room.cancellation}
                      </Badge>
                    )}
                    {room.breakfast && (
                      <Badge
                        variant="outline"
                        className="text-blue-600 border-blue-200 bg-blue-50"
                      >
                        {room.breakfast}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-700 mb-3">{room.description}</p>

                  <div className="flex mr-auto">
                    <Button
                      onClick={() => handleRoomClick(room)}
                      className="w-full md:w-auto bg-j-primary hover:bg-j-secondary ml-auto"
                    >
                      Select Room
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Details Accordion */}
            <div className="border-t">
              <button
                onClick={() => toggleRoomDetails(room.id)}
                className="w-full flex justify-between items-center p-4 text-left"
              >
                <span className="font-medium">Room details</span>
                {showRoomDetails[room.id] ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {showRoomDetails[room.id] && (
                <div className="p-4 pt-0 border-t">
                  <h4 className="font-medium mb-2">Room amenities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {room.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="text-gray-600">•</span>
                        <span className="ml-2 text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-medium mb-2">Room photos</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {room.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative h-32 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`${room.name} photo ${idx + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
