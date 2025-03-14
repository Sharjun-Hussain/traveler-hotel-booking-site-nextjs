// components/StoryStays.jsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import mirissa from "@/public/mirissa.jpg";
import sigiriya from "@/public/sigiriya.png";
import elle from "@/public/elle.jpg";

const StoryCard = ({ image, title, description }) => {
  return (
    <div className="group relative">
      {/* Teal background offset frame */}
      <div className="relative mb-5">
        <div className="absolute inset-0 bg-teal-600 rounded-lg transform rotate-4 z-0"></div>
        <div className="relative overflow-hidden rounded-lg z-10">
          {/* Top-left label */}
          {/* <div className="absolute top-0 left-0 z-20 bg-white/90 py-1 px-3 text-sm font-medium text-teal-800 rounded-br-lg">
            STORY STAYS
          </div> */}

          {/* Image container */}
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>

      {/* Text content */}
      <h3 className="text-xl font-bold text-j-primary mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
};

const StoryStays = () => {
  // Sample data - replace with your actual content
  const storyCards = [
    {
      image: mirissa,
      title: "Humble Stays, Inspiring Stories",
      description:
        "Discover the heartwarming stories behind local homestays run by hardworking families. Experience authentic hospitality while supporting communities in need. Every stay has a story—be part of it.",
    },
    {
      image: sigiriya,
      title: "Humble Stays, Inspiring Stories",
      description:
        "Discover the heartwarming stories behind local homestays run by hardworking families. Experience authentic hospitality while supporting communities in need. Every stay has a story—be part of it.",
    },
    {
      image: elle,
      title: "Humble Stays, Inspiring Stories",
      description:
        "Discover the heartwarming stories behind local homestays run by hardworking families. Experience authentic hospitality while supporting communities in need. Every stay has a story—be part of it.",
    },
  ];

  return (
    <section className="w-full py-16 bg-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-10">
          <div className="font-bold text-j-primary text-lg uppercase">
            STORY STAYS
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Homes with Heartwarming Stories
          </h2>
          <p className="text-gray-700 max-w-2xl">
            Stay with local families and experience their inspiring journeys
            while enjoying authentic hospitality.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storyCards.map((card, index) => (
            <StoryCard
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoryStays;
