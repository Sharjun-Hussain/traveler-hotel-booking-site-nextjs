const demodata = {
  id: "hotel-456",
  name: "Serene Bay Resort & Spa",
  location: "Galle, Sri Lanka",
  rating: 4.7,
  reviewCount: 382,
  price: 175,
  discountPrice: 159,
  discountPercentage: 9,
  description:
    "Discover the perfect blend of luxury and nature at Serene Bay Resort & Spa, located along the breathtaking coast of Galle, Sri Lanka. Enjoy world-class hospitality, stunning oceanfront views, and a peaceful retreat with premium amenities.",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2e76GDOJ3bb0UZsJKp1CtvpjhJac04w2iQ&s",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/34687318.jpg?k=76cc5b29b46c9e95814271db622f8ce20030cc266d29818b451242f5c6e955c1&o=&hp=1",
    "https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/50826/photos/8493018_XL.jpg?tr=w-1200%2Cfo-auto",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/18/22/f7/shangri-la-hotel-jakarta.jpg?w=700&h=-1&s=1",
    "https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/50826/photos/8493018_XL.jpg?tr=w-1200%2Cfo-auto",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2e76GDOJ3bb0UZsJKp1CtvpjhJac04w2iQ&s",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/18/22/f7/shangri-la-hotel-jakarta.jpg?w=700&h=-1&s=1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2e76GDOJ3bb0UZsJKp1CtvpjhJac04w2iQ&s",
  ],
  amenities: [
    { name: "Free WiFi", icon: "Wifi", category: "internet" },
    { name: "Infinity Pool", icon: "Swim", category: "pool" },
    { name: "Spa & Wellness Center", icon: "Spa", category: "wellness" },
    { name: "Restaurant", icon: "Utensils", category: "food" },
    { name: "24/7 Front Desk", icon: "ConciergeBell", category: "services" },
    { name: "Airport Shuttle", icon: "Car", category: "transport" },
    { name: "Fitness Center", icon: "Dumbbell", category: "wellness" },
    { name: "Business Center", icon: "Briefcase", category: "business" },
    { name: "Parking", icon: "ParkingCircle", category: "transport" },
    { name: "Beach Access", icon: "Waves", category: "outdoor" },
    { name: "Air Conditioning", icon: "AirVent", category: "room" },
    { name: "Flat-screen TV", icon: "Tv", category: "room" },
    { name: "Private Bathroom", icon: "ShowerHead", category: "room" },
    { name: "Mountain View", icon: "Mountain", category: "view" },
    { name: "Garden View", icon: "Leaf", category: "view" },
    { name: "Pet Friendly", icon: "PawPrint", category: "policies" },
  ],
  rooms: [
    {
      id: "deluxe-1",
      name: "Deluxe Ocean View",
      price: 175,
      discountPrice: 159,
      capacity: 2,
      beds: "1 King Bed",
      size: "42 m²",
      description:
        "A spacious room with a private balcony offering panoramic ocean views and premium amenities.",
      amenities: [
        "Free WiFi",
        "Air conditioning",
        "Flat-screen TV",
        "Mini bar",
        "Tea/Coffee maker",
        "Private balcony",
        "Safe",
      ],
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/18/22/f7/shangri-la-hotel-jakarta.jpg?w=700&h=-1&s=1",
      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/18/22/f7/shangri-la-hotel-jakarta.jpg?w=700&h=-1&s=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/34687318.jpg?k=76cc5b29b46c9e95814271db622f8ce20030cc266d29818b451242f5c6e955c1&o=&hp=1",
        "https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/50826/photos/8493018_XL.jpg?tr=w-1200%2Cfo-auto",
      ],
      cancellation: "Free cancellation",
      breakfast: "Breakfast included",
    },
    {
      id: "suite-1",
      name: "Presidential Suite",
      price: 299,
      discountPrice: 269,
      capacity: 3,
      beds: "1 King Bed + 1 Sofa Bed",
      size: "70 m²",
      description:
        "A luxurious suite featuring a separate living area, jacuzzi, and stunning beachside views.",
      amenities: [
        "Free WiFi",
        "Air conditioning",
        "Flat-screen TV",
        "Mini bar",
        "Tea/Coffee maker",
        "Jacuzzi",
        "Separate living area",
        "Sea view",
      ],
      image:
        "https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/50826/photos/8493018_XL.jpg?tr=w-1200%2Cfo-auto",

      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/18/22/f7/shangri-la-hotel-jakarta.jpg?w=700&h=-1&s=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/34687318.jpg?k=76cc5b29b46c9e95814271db622f8ce20030cc266d29818b451242f5c6e955c1&o=&hp=1",
        "https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/50826/photos/8493018_XL.jpg?tr=w-1200%2Cfo-auto",
      ],
      cancellation: "Free cancellation",
      breakfast: "Breakfast included",
    },
    {
      id: "villa-1",
      name: "Private Pool Villa",
      price: 399,
      discountPrice: 359,
      capacity: 5,
      beds: "2 King Beds",
      size: "90 m²",
      description:
        "A secluded villa with a private infinity pool, personal butler service, and direct beach access.",
      amenities: [
        "Free WiFi",
        "Air conditioning",
        "Flat-screen TV",
        "Mini bar",
        "Tea/Coffee maker",
        "Private pool",
        "Kitchenette",
        "Butler service",
        "Beach access",
      ],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2e76GDOJ3bb0UZsJKp1CtvpjhJac04w2iQ&s",

      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/18/22/f7/shangri-la-hotel-jakarta.jpg?w=700&h=-1&s=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/34687318.jpg?k=76cc5b29b46c9e95814271db622f8ce20030cc266d29818b451242f5c6e955c1&o=&hp=1",
        "https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/50826/photos/8493018_XL.jpg?tr=w-1200%2Cfo-auto",
      ],
      cancellation: "Non-refundable",
      breakfast: "Breakfast included",
    },
  ],
  reviews: [
    {
      id: "rev-1",
      user: "Ruwan Perera",
      avatar: "/avatar1.jpg",
      rating: 5,
      date: "February 10, 2025",
      comment:
        "The best beach resort I have ever visited! The staff was friendly, the food was delicious, and the ocean view from our room was spectacular.",
      travelerType: "Couple",
      stayDuration: "3 nights",
    },
    {
      id: "rev-2",
      user: "Emily Watson",
      avatar: "/avatar2.jpg",
      rating: 4,
      date: "January 22, 2025",
      comment:
        "Amazing experience! The spa treatments were relaxing, and the infinity pool was a highlight. Would have loved faster WiFi, but overall fantastic!",
      travelerType: "Solo traveler",
      stayDuration: "5 nights",
    },
    {
      id: "rev-3",
      user: "Aravinda Fernando",
      avatar: "/avatar3.jpg",
      rating: 5,
      date: "January 8, 2025",
      comment:
        "A perfect getaway! The seafood restaurant serves the best crab curry, and the sunset from the beachside lounge is unforgettable.",
      travelerType: "Family",
      stayDuration: "7 nights",
    },
    {
      id: "rev-4",
      user: "James Rodriguez",
      avatar: "/avatar4.jpg",
      rating: 4,
      date: "December 15, 2024",
      comment:
        "Great location and excellent service. The room was spacious and clean. The only downside was the construction noise nearby.",
      travelerType: "Business",
      stayDuration: "2 nights",
    },
    {
      id: "rev-5",
      user: "Priya Patel",
      avatar: "/avatar5.jpg",
      rating: 5,
      date: "November 28, 2024",
      comment:
        "Absolutely stunning property. The staff went above and beyond to make our anniversary special. Will definitely return!",
      travelerType: "Couple",
      stayDuration: "4 nights",
    },
  ],
  activities: [
    {
      name: "Whale Watching Tour",
      description:
        "Witness the majestic blue whales and dolphins off the coast of Mirissa.",
      price: 60,
      duration: "Half day",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/34687318.jpg?k=76cc5b29b46c9e95814271db622f8ce20030cc266d29818b451242f5c6e955c1&o=&hp=1",
    },
    {
      name: "Traditional Sri Lankan Cooking Class",
      description: "Learn to cook authentic Sri Lankan cuisine with our chefs.",
      price: 40,
      duration: "3 hours",
      image:
        "https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/50826/photos/8493018_XL.jpg?tr=w-1200%2Cfo-auto",
    },
    {
      name: "Galle Fort Heritage Walk",
      description:
        "Explore the UNESCO-listed Galle Fort with a guided walking tour.",
      price: 20,
      duration: "2 hours",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/18/22/f7/shangri-la-hotel-jakarta.jpg?w=700&h=-1&s=1",
    },
  ],
  nearbyPlaces: [
    {
      name: "Galle Fort",
      distance: "2 km",
      description:
        "A historic fort built by the Portuguese in the 16th century, offering stunning colonial architecture.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2e76GDOJ3bb0UZsJKp1CtvpjhJac04w2iQ&s",
      type: "Historic site",
    },
    {
      name: "Unawatuna Beach",
      distance: "5 km",
      description:
        "A popular golden sandy beach known for its turquoise waters and vibrant nightlife.",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/34687318.jpg?k=76cc5b29b46c9e95814271db622f8ce20030cc266d29818b451242f5c6e955c1&o=&hp=1",

      type: "Beach",
    },
    {
      name: "Sinharaja Rainforest",
      distance: "30 km",
      description:
        "A UNESCO World Heritage Site, home to diverse wildlife and lush tropical forests.",
      image:
        "https://ik.imgkit.net/3vlqs5axxjf/external/https://media.iceportal.com/50826/photos/8493018_XL.jpg?tr=w-1200%2Cfo-auto",

      type: "Nature reserve",
    },
  ],
  policies: {
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    cancellation:
      "Free cancellation up to 72 hours before check-in. After that, a one-night charge applies.",
    children:
      "Children under 10 stay free with parents. Extra bed charges apply.",
    pets: "Pets are allowed with prior approval (charges may apply).",
    extraBed: "$25 per night for extra beds (subject to availability).",
    payment: "Credit card required to guarantee reservation",
    taxes: "All taxes included in room rate",
  },
  host: {
    name: "Sanjay Gupta",
    since: "2018",
    responseRate: "98%",
    responseTime: "within an hour",
    avatar: "/host.jpg",
    languages: ["English", "Sinhala", "Hindi"],
  },
  sustainability: {
    level: "Level 3",
    practices: [
      "Solar panels for hot water",
      "Waste reduction program",
      "Locally sourced food",
      "Energy-efficient lighting",
    ],
  },
  coordinates: {
    lat: 6.0333,
    lng: 80.2167,
  },
};

export const FetchHotelData = async (propertyId) => {
  try {
    // Try to fetch data from API first
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer/list/property/${propertyId}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error('Failed to fetch property data');
    }

    const property = data.data;

    // Merge API data with static demodata
    const hotelData = {
      // Core hotel info from API or fallback to static
      id: property.id ? `${property.id}` : demodata.id,
      name: property.title || demodata.name,
      location: property.city && property.country
        ? `${property.city}, ${property.country}`
        : demodata.location,
      rating: demodata.rating, // Static fallback
      reviewCount: demodata.reviewCount, // Static fallback
      price: demodata.price, // Static fallback
      discountPrice: demodata.discountPrice, // Static fallback
      discountPercentage: demodata.discountPercentage, // Static fallback
      description: property.description || demodata.description,

      // Images from API or static
      images: property.images?.length
        ? property.images.map(img => img.imageUrl)
        : demodata.images,

      // Amenities from API or static
      amenities: property.amenities?.length
        ? property.amenities.map(amenity => ({
          name: amenity.name,
          icon: amenity.icon || amenity.name.replace(/\s+/g, ''),
          category: amenity.category || 'general'
        }))
        : demodata.amenities,

      // Use static data for these sections
      rooms: demodata.rooms,
      reviews: demodata.reviews,
      activities: demodata.activities,
      nearbyPlaces: demodata.nearbyPlaces,

      // Policies - merge API data with static defaults
      policies: {
        checkIn: property.checkInTime || demodata.policies.checkIn,
        checkOut: property.checkOutTime || demodata.policies.checkOut,
        cancellation: property.cancellationPolicy || demodata.policies.cancellation,
        children: demodata.policies.children,
        pets: demodata.policies.pets,
        extraBed: demodata.policies.extraBed,
        payment: demodata.policies.payment,
        taxes: demodata.policies.taxes
      },

      // Host info - merge API with static
      host: {
        name: property.merchant?.businessName || demodata.host.name,
        since: demodata.host.since,
        responseRate: demodata.host.responseRate,
        responseTime: demodata.host.responseTime,
        avatar: demodata.host.avatar,
        languages: demodata.host.languages
      },

      // Sustainability - static
      sustainability: demodata.sustainability,

      // Coordinates from API or static
      coordinates: {
        lat: property.latitude || demodata.coordinates.lat,
        lng: property.longitude || demodata.coordinates.lng
      }
    };

    return hotelData;
  } catch (error) {
    console.error('Error fetching property data:', error);
    // Return complete static data if API fails
    return demodata;
  }
};

