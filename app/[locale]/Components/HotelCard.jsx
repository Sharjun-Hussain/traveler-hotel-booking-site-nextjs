import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Star,
  Wifi,
  Droplets,
  Wind,
  Car,
  Coffee,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCurrencyStore } from "@/stores/useCurrencyStore";

// Reusable HotelCard component
const HotelCard = ({
  type = "hotel",
  id,
  url,
  name,
  location,
  rating,
  reviewCount,
  price,
  currency = "$",
  priceUnit = "/night",
  imageUrl,
  images,
  amenities = [],
  description,
  sponsored = false,
  isFavorite = false,
  onFavoriteToggle = () => { },
  onDetailsClick = () => { },
}) => {



  const { formatPrice } = useCurrencyStore();
  // Function to render amenity icon based on type
  const renderAmenityIcon = (type) => {
    switch (type) {
      case "wifi":
        return <Wifi className="h-4 w-4 mr-1" />;
      case "pool":
        return <Droplets className="h-4 w-4 mr-1" />;
      case "ac":
        return <Wind className="h-4 w-4 mr-1" />;
      case "breakfast":
        return <Coffee className="h-4 w-4 mr-1" />;
      case "parking":
        return <Car className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Link
      href={
        type == "destination"
          ? `/hotels-and-apartments?destination=${id}`
          : type == "hotel"
            ? `/hotels-and-apartments/hotel/${name.trim().replace(/\s+/g, "-").toLowerCase()}?hotel_id=${id}`
            : "#"
      }
    >
      <Card className="max-w-full w-full overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 relative">
        {/* Sponsored Badge */}
        {sponsored && (
          <div className="absolute top-0 left-0 bg-blue-500 text-white py-1 px-10 text-xs font-medium transform -rotate-45 origin-bottom-left translate-y-20  z-10">
            SPONSORED
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {imageUrl &&
            <Image
              src={imageUrl}
              alt={name}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />

          }

          {images && images.length > 0 &&


            <Image
              src={images[0].imageUrl}
              alt={name}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />

          }


          {/* Location Badge */}
          {type == "hotel" && (
            <div className="absolute bottom-2 left-2">
              <Badge
                variant="secondary"
                className="bg-white text-blue-500 flex items-center gap-1 px-2 py-1 rounded-full"
              >
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                {location}
              </Badge>
            </div>
          )}

          {/* Favorite Button */}
          {/* {type == "hotel" && (
            <button
              onClick={() => onFavoriteToggle(id)}
              className="absolute top-2 right-2 bg-white/80 p-1 rounded-full shadow-md"
            >
              <Heart
                className={`h-5 w-5 hover:text-red-600 hover:fill-red-700 ${isFavorite ? "fill-red-500 text-red-500" : "text-black"
                  }`}
              />
            </button>
          )} */}

          {/* Image Pagination Dots */}
          {/* <div className="absolute bottom-2 right-2 flex gap-1">
            <div className="h-2 w-2 bg-white rounded-full"></div>
            <div className="h-2 w-2 bg-white/50 rounded-full"></div>
            <div className="h-2 w-2 bg-white/50 rounded-full"></div>
          </div> */}
        </div>

        {/* Content */}
        <CardContent className="p-2">
          {/* Header */}
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-[14px] text-gray-900">{name}</h3>
            {type == "hotel" && (
              <div className="flex items-center text-yellow-400 text-sm">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 " />
                <span className="text-black">{rating}</span>
                <span className="text-gray-400 ml-1">({reviewCount})</span>
              </div>
            )}
          </div>

          {/* Hotel Type */}
          {type == "hotel" && (
            <p className="text-gray-500 text-sm mb-3">Hotel</p>
          )}

          {/* Amenities */}
          {type == "hotel" && (
            <div className="flex flex-wrap gap-2 mb-3">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center text-xs text-gray-600 bg-j-secondary/20 px-2 py-1 rounded-md"
                >
                  {renderAmenityIcon(amenity.type)}
                  <span>{amenity.label}</span>
                </div>
              ))}
              {amenities.length > 0 && (
                <div className="flex items-center text-xs text-gray-600 px-2 py-1">
                  <Plus className="h-3 w-3 mr-1" />
                  <span>5 more</span>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Price and Details */}
          {type == "hotel" && (
            <div className="flex justify-between items-center mt-4">
              <div>
                <span className="font-bold text-xl">
                  {/* {currency} */}
                  {/* {price} */}
                  {/* {formatPrice(price)} */}
                </span>
                {/* <span className="text-gray-500 text-sm">{priceUnit}</span> */}
              </div>
              <Button
                onClick={() => onDetailsClick(id)}
                className=" py-2 px-3 h-auto font-semibold bg-j-primary"
              >
                Get More Details
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default HotelCard;
