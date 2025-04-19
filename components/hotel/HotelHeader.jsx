import { MapPin, Star, Heart, Share } from "lucide-react";

export default function HotelHeader({ hotelData, isFavorite, setIsFavorite }) {
  return (
    <header className="mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{hotelData.name}</h1>
          <div className="flex items-center mt-2">
            <div className="flex items-center mr-3">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-semibold">{hotelData.rating}</span>
              <span className="mx-1">·</span>
              <span className="text-blue-600 underline cursor-pointer">
                {hotelData.reviewCount} reviews
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-1" />
              <span className="text-gray-600">{hotelData.location}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400">
            <Share className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
