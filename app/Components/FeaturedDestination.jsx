// components/FeaturedDestinations.js

import kandy from "@/public/kandy.jpg";
import mirissa from "@/public/mirissa.jpg";
import sigiriya from "@/public/sigiriya.png";
import elle from "@/public/elle.jpg";
import Image from "next/image";
export default function FeaturedDestinations() {
  const destinations = [
    {
      id: 1,
      name: "Sigiriya",
      description: "Ancient rock fortress with frescoes",
      image: sigiriya,
      link: "/destinations/sigiriya",
    },
    {
      id: 2,
      name: "Ella",
      description: "Scenic mountain village with tea plantations",
      image: elle,
      link: "/destinations/ella",
    },
    {
      id: 3,
      name: "Mirissa",
      description: "Beautiful beach with whale watching",
      image: mirissa,
      link: "/destinations/mirissa",
    },
    {
      id: 4,
      name: "Kandy",
      description: "Cultural capital with Temple of the Tooth",
      image: kandy,
      link: "/destinations/kandy",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Featured Destinations
        </h2>
        <a href="/destinations" className="text-blue-600 hover:text-blue-800">
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <a href={destination.link}>
              <div className="h-48 overflow-hidden">
                <Image
                  width={192}
                  height={250}
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {destination.name}
                </h3>
                <p className="text-gray-600">{destination.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
