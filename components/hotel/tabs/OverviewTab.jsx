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
} from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";

export default function OverviewTab({ hotelData }) {
  const [expandedAmenities, setExpandedAmenities] = useState(false);

  return (
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
  );
}
