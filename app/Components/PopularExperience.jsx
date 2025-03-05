// components/PopularExperiences.js

import whale from "@/public/whale.jpg";
import tea from "@/public/tea.jpg";
import safari from "@/public/safari.jpg";
import cooking from "@/public/cooking.jpg";
import Image from "next/image";

export default function PopularExperiences() {
  const experiences = [
    {
      id: 1,
      name: "Safari at Yala National Park",
      price: 75,
      rating: 4.8,
      reviews: 124,
      image: safari,
    },
    {
      id: 2,
      name: "Tea Plantation Tour",
      price: 45,
      rating: 4.7,
      reviews: 98,
      image: tea,
    },
    {
      id: 3,
      name: "Cooking Class in Colombo",
      price: 35,
      rating: 4.9,
      reviews: 87,
      image: cooking,
    },
    {
      id: 4,
      name: "Whale Watching in Mirissa",
      price: 60,
      rating: 4.6,
      reviews: 156,
      image: whale,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Popular Experiences
        </h2>
        <a href="/experiences" className="text-blue-600 hover:text-blue-800">
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="bg-white dark:bg-zinc-600 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                width={192}
                height={250}
                src={experience.image}
                alt={experience.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-blue-600 text-white  py-1 px-3 rounded-tr-lg">
                From ${experience.price}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-200 mb-1">
                {experience.name}
              </h3>
              <div className="flex items-center text-sm">
                <div className="flex items-center text-yellow-400  mr-1">
                  <span>★</span>
                </div>
                <span className="font-medium">{experience.rating}</span>
                <span className="text-gray-500 dark:text-zinc-300 ml-1">
                  ({experience.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
