import DynamicIcon from "@/components/DynamicIcon";
import {
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
  Leaf,
  PawPrint,
} from "lucide-react";

export default function FacilitiesTab({ amenities }) {
  const getAmenitiesByCategory = (category) => {
    return amenities.filter((amenity) => amenity.category === category);
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Facilities</h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Most popular facilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenities.slice(0, 6).map((amenity, index) => (
            <div key={index} className="flex items-center">
              <DynamicIcon name={amenity.icon} />
              <span className="ml-2">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Internet</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getAmenitiesByCategory("internet").map((amenity, index) => (
              <div key={index} className="flex items-center">
                <DynamicIcon name={amenity.icon} />
                <span className="ml-2">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Pool and wellness</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ...getAmenitiesByCategory("pool"),
              ...getAmenitiesByCategory("wellness"),
            ].map((amenity, index) => (
              <div key={index} className="flex items-center">
                <DynamicIcon name={amenity.icon} />
                <span className="ml-2">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Food & Drink</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getAmenitiesByCategory("food").map((amenity, index) => (
              <div key={index} className="flex items-center">
                <DynamicIcon name={amenity.icon} />
                <span className="ml-2">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Transport</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getAmenitiesByCategory("transport").map((amenity, index) => (
              <div key={index} className="flex items-center">
                <DynamicIcon name={amenity.icon} />
                <span className="ml-2">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
