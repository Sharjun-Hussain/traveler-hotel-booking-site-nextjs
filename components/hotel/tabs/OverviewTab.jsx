import { useState } from "react";
import Image from "next/image";
import {
  Leaf,
  MessageCircle,
  Clock,
  Hotel,
  Wifi,
  Waves,
  Utensils,
  ConciergeBell,
  Car,
  Dumbbell,
  Briefcase,
  ParkingCircle,
  AirVent,
  Tv,
  ShowerHead,
  Mountain,
  PawPrint,
  Sailboat,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function OverviewTab({ hotelData }) {
  const [expandedAmenities, setExpandedAmenities] = useState(false);
  const [showRoomDetails, setShowRoomDetails] = useState({});

  const toggleRoomDetails = (roomId) => {
    setShowRoomDetails((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }));
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4">About {hotelData.name}</h2>
        <p className="mb-6">{hotelData.description}</p>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Most popular facilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotelData.amenities
              .slice(0, expandedAmenities ? hotelData.amenities.length : 6)
              .map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <DynamicIcon name={amenity.icon} />
                  <span className="ml-2">{amenity.name}</span>
                </div>
              ))}
          </div>
          {hotelData.amenities.length > 6 && (
            <button
              onClick={() => setExpandedAmenities(!expandedAmenities)}
              className="mt-4 text-blue-600 font-medium flex items-center"
            >
              {expandedAmenities ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  <span>Show more</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Sustainability */}
        <div className="border rounded-lg p-4 mb-6">
          <div className="flex items-center mb-3">
            <Leaf className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="font-bold">Sustainability</h3>
          </div>
          <p className="mb-3">
            This property has taken steps to provide more sustainable travel
            options
          </p>
          <div className="flex items-center">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
              Level {hotelData.sustainability.level}
            </div>
            <button className="text-blue-600 text-sm font-medium">
              See what's being done
            </button>
          </div>
        </div>

        {/* Host Info */}
        <div className="border rounded-lg p-4 mb-6">
          <h3 className="font-bold mb-3">Hosted by {hotelData.host.name}</h3>
          <div className="flex items-start">
            <div className="relative w-16 h-16 mr-4">
              <Image
                src={hotelData.host.avatar}
                alt={hotelData.host.name}
                layout="fill"
                className="rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center mb-1">
                <span className="font-medium mr-2">Superhost</span>
                <span className="text-sm text-gray-600">
                  Hosting since {hotelData.host.since}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MessageCircle className="w-4 h-4 mr-1" />
                <span>Response rate: {hotelData.host.responseRate}</span>
                <span className="mx-2">•</span>
                <span>Response time: {hotelData.host.responseTime}</span>
              </div>
              <div className="text-sm text-gray-600">
                Speaks: {hotelData.host.languages.join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Available rooms</h2>
        <div className="space-y-6">
          {hotelData.rooms.map((room) => (
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
    </>
  );
}
