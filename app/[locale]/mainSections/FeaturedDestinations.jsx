import React from "react";
import Sponsored from "../Components/CarausalSposored";
import CustomizedSectionWithCarousel from "../Components/CarausalSposored";
import kandy from "@/public/kandy.jpg";
import mirissa from "@/public/mirissa.jpg";
import sigiriya from "@/public/sigiriya.png";
import elle from "@/public/elle.jpg";
import Image from "next/image";

const FeaturedDestinations = () => {
  const destinations = [
    {
      id: "1212-1124-124124-124124-1241241-124124124",
      name: "Sigiriya",
      description: "Ancient rock fortress with frescoes",
      image: kandy,
      url: "/hotels-and-apartments/",
      rating: 4.5,
      reviewCount: 120,
    },
    {
      id: 2,
      name: "Ella",
      description: "Scenic mountain village  tea plantations",
      image: elle,
      url: "/hotels-and-apartments/",
    },
    {
      id: 3,
      name: "Mirissa",
      description: "Beautiful beach with whale watching",
      image: mirissa,
      url: "/hotels-and-apartments/",
    },
    {
      id: 4,
      name: "Kandy",
      description: "Cultural capital with Temple of the Tooth",
      image: kandy,
      url: "/hotels-and-apartments/",
    },
  ];

  return (
    <div className="container  mx-auto w-full">
      <CustomizedSectionWithCarousel
        displayMode="grid"
        type="destination"
        sponsored={false}
        scrollInterval={100000}
        destinations={destinations}
        headTitle="Explore"
        title="Magical Destination"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium
        laudantium iste quod quos. Possimus perferendis at dolore aspernatur
        eligendi voluptates voluptatem tenetur natus dolorem, hic beatae nemo
        ipsam odio aliquam?"
      />
    </div>
  );
};

export default FeaturedDestinations;
