import React from "react";
import CustomizedSectionWithCarousel from "../Components/CarausalSposored";

const SponsoredHotels = () => {
  const destinations = [
    {
      id: 1,
      name: "Cinnamon Grand Colombo",
      image: "/api/placeholder/800/500",
      rating: 4.7,
      price: "199",
      description:
        "Luxury hotel in the heart of Colombo with world-class dining.",
      url: "/hotel?id=1&ref=sponsored_abc123",
      sponsored: true,
      amenities: [
        { type: "wifi", label: "Free WiFi" },
        { type: "pool", label: "Swimming Pool" },
        { type: "ac", label: "Air Conditioning" },
        { type: "breakfast", label: "Free Breakfast" },
        { type: "parking", label: "Free Parking" },
      ],
    },
    {
      id: 2,
      name: "Shangri-La Colombo",
      image: "/api/placeholder/800/500",
      rating: 4.8,
      price: "249",
      description:
        "Five-star comfort with stunning ocean views and fine dining.",
      url: "/hotel?id=2&aff=partner_xyz789",
      sponsored: false,
      amenities: [
        { type: "wifi", label: "Free WiFi" },
        { type: "pool", label: "Swimming Pool" },
        { type: "ac", label: "Air Conditioning" },
        { type: "breakfast", label: "Free Breakfast" },
        { type: "parking", label: "Free Parking" },
      ],
    },
    {
      id: 3,
      name: "Heritance Kandalama",
      image: "/api/placeholder/800/500",
      rating: 4.9,
      price: "279",
      description:
        "Eco-friendly luxury surrounded by nature and historic sites.",
      url: "/hotel?id=3&utm_source=referral",
      sponsored: true,
      amenities: [
        { type: "wifi", label: "Free WiFi" },
        { type: "pool", label: "Swimming Pool" },
        { type: "ac", label: "Air Conditioning" },
        { type: "breakfast", label: "Free Breakfast" },
        { type: "parking", label: "Free Parking" },
      ],
    },
    {
      id: 4,
      name: "Jetwing Lighthouse",
      image: "/api/placeholder/800/500",
      rating: 4.6,
      price: "229",
      description:
        "Colonial-style beachfront hotel offering breathtaking sunsets.",
      url: "/hotel?id=4&campaign=deal_march2024",
      sponsored: false,
      amenities: [
        { type: "wifi", label: "Free WiFi" },
        { type: "pool", label: "Swimming Pool" },
        { type: "ac", label: "Air Conditioning" },
        { type: "breakfast", label: "Free Breakfast" },
        { type: "parking", label: "Free Parking" },
      ],
    },
    {
      id: 5,
      name: "Anantara Peace Haven Tangalle",
      image: "/api/placeholder/800/500",
      rating: 5.0,
      price: "399",
      description: "Tropical paradise with a private beach and spa retreats.",
      url: "/hotel?id=5&promo=exclusive_offer",
      sponsored: true,
      amenities: [
        { type: "wifi", label: "Free WiFi" },
        { type: "pool", label: "Swimming Pool" },
        { type: "ac", label: "Air Conditioning" },
        { type: "breakfast", label: "Free Breakfast" },
        { type: "parking", label: "Free Parking" },
      ],
    },
    {
      id: 6,
      name: "Uga Ulagalla",
      image: "/api/placeholder/800/500",
      rating: 4.9,
      price: "349",
      description: "Secluded luxury villas with stunning countryside views.",
      url: "/hotel?id=6&tracking=ad_campaign_567",
      sponsored: false,
      amenities: [
        { type: "wifi", label: "Free WiFi" },
        { type: "pool", label: "Swimming Pool" },
        { type: "ac", label: "Air Conditioning" },
        { type: "breakfast", label: "Free Breakfast" },
        { type: "parking", label: "Free Parking" },
      ],
    },
    {
      id: 7,
      name: "Cape Weligama",
      image: "/api/placeholder/800/500",
      rating: 4.8,
      price: "369",
      description: "Cliffside resort with private pools and ocean views.",
      url: "/hotel?id=7&affiliate_code=booking_plus",
      sponsored: true,
      amenities: [
        { type: "wifi", label: "Free WiFi" },
        { type: "pool", label: "Swimming Pool" },
        { type: "ac", label: "Air Conditioning" },
        { type: "breakfast", label: "Free Breakfast" },
        { type: "parking", label: "Free Parking" },
      ],
    },
    {
      id: 8,
      name: "The Fortress Resort & Spa",
      image: "/api/placeholder/800/500",
      rating: 4.7,
      price: "289",
      description: "Elegant beachfront luxury with Ayurvedic spa treatments.",
      url: "/hotel?id=8&referral=travel_site",
      sponsored: false,
      amenities: [
        { type: "wifi", label: "Free WiFi" },
        { type: "pool", label: "Swimming Pool" },
        { type: "ac", label: "Air Conditioning" },
        { type: "breakfast", label: "Free Breakfast" },
        { type: "parking", label: "Free Parking" },
      ],
    },
  ];

  return (
    <div className="container mx-auto w-full">
      <CustomizedSectionWithCarousel
        displayMode="carousel"
        destinations={destinations}
        headTitle="Featured Properties"
        title="Sponsored stays - Featured for you"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium
        laudantium iste quod quos. Possimus perferendis at dolore aspernatur
        eligendi voluptates voluptatem tenetur natus dolorem, hic beatae nemo
        ipsam odio aliquam?"
      />
    </div>
  );
};

export default SponsoredHotels;
