import Image from "next/image";
import { Navigation } from "lucide-react";

export default function LocationTab({ hotelData }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Location</h2>

      <div className="h-96 mb-6 rounded-lg overflow-hidden">
        {/* Map component would go here */}
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Map View</span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">What's nearby</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotelData.nearbyPlaces.map((place, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="relative h-40">
                <Image
                  src={place.image}
                  alt={place.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold mb-1">{place.name}</h4>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Navigation className="w-4 h-4 mr-1" />
                  <span>{place.distance}</span>
                  <span className="mx-2">•</span>
                  <span>{place.type}</span>
                </div>
                <p className="text-sm text-gray-700">{place.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Top attractions</h3>
        <div className="space-y-3">
          {hotelData.activities.map((activity, index) => (
            <div key={index} className="flex items-start border-b pb-3">
              <div className="relative w-16 h-16 min-w-16 mr-4 rounded overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h4 className="font-bold">{activity.name}</h4>
                <p className="text-sm text-gray-600 mb-1">
                  {activity.description}
                </p>
                <div className="flex items-center text-sm">
                  <span className="font-medium">${activity.price}</span>
                  <span className="mx-2">•</span>
                  <span>{activity.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
