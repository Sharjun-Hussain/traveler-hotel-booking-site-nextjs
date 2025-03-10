import {
  Bath,
  Car,
  Coffee,
  Dumbbell,
  MapPin,
  PawPrint,
  Star,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import React from "react";

const HotelCard = ({ hotel }) => {
  // Map of amenities to their corresponding icons
  const amenityIcons = {
    "Free WiFi": <Wifi size={16} />,
    Breakfast: <Coffee size={16} />,
    Restaurant: <Utensils size={16} />,
    Pool: <Waves size={16} />,
    Gym: <Dumbbell size={16} />,
    Parking: <Car size={16} />,
    Spa: <Bath size={16} />,
    "Pet Friendly": <PawPrint size={16} />,
    // Add more amenities and their icons as needed
  };

  return (
    <div>
      <div
        key={hotel.id}
        className="bg-white dark:bg-zinc-900 rounded-lg shadow overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-1/3 h-48 md:h-auto relative">
          {/* Gradient overlay for better icon visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>

          <img
            src={hotel.image}
            alt={hotel.name}
            className="h-full w-full object-cover"
          />

          {/* Amenity icons overlay */}
          <div className="absolute top-2 left-2 flex flex-col flex-wrap gap-2 z-20">
            {hotel.amenities.map(
              (amenity) =>
                amenityIcons[amenity] && (
                  <div
                    key={amenity}
                    className="p-2 bg-blue-400/80 rounded-full text-white"
                    title={amenity}
                  >
                    {amenityIcons[amenity]}
                  </div>
                )
            )}
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between">
            <h3 className="font-bold text-xl">{hotel.name}</h3>
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{hotel.rating}</span>
              <span className="text-gray-500">({hotel.reviews} reviews)</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-gray-600">
            <MapPin size={16} />
            <span>{hotel.location}</span>
            <span className="ml-2 text-indigo-600 dark:text-blue-300">
              {hotel.distance}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {hotel.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300 text-sm rounded-md"
              >
                {amenity}
              </span>
            ))}
          </div>
          <div className="mt-auto flex justify-between items-end pt-4">
            <a
              href={`/hotels/${hotel.id}`}
              className="text-indigo-600 font-semibold hover:underline"
            >
              See Details
            </a>
            <div className="text-right">
              <div className="text-gray-500">1 night, 2 adults</div>
              <div className="text-2xl font-bold">${hotel.price}</div>
              <a
                href={`/hotels/${hotel.id}/book`}
                className="mt-2 inline-block bg-[#017E7F] text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
