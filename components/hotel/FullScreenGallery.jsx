import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart, Share } from "lucide-react";

export default function FullScreenGallery({
  showAllPhotos,
  setShowAllPhotos,
  images,
  currentImageIndex,
  setCurrentImageIndex,
  isFavorite,
  setIsFavorite,
  hotelName,
}) {
  if (!showAllPhotos) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      <div className="sticky top-0 bg-black bg-opacity-90 z-10 p-4 flex justify-between items-center">
        <button
          onClick={() => setShowAllPhotos(false)}
          className="text-white flex items-center"
        >
          <X className="w-6 h-6 mr-2" />
          <span>Close</span>
        </button>
        <div className="text-white">
          {currentImageIndex + 1} / {images.length}
        </div>
        <div className="flex space-x-4">
          <button className="text-white">
            <Share className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="text-white"
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorite ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <div className="relative flex-1 flex items-center justify-center p-4">
        <Image
          src={images[currentImageIndex]}
          alt={`${hotelName} photo ${currentImageIndex + 1}`}
          width={1200}
          height={800}
          objectFit="contain"
          className="max-w-full max-h-[calc(100vh-80px)]"
        />
        <button
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev === images.length - 1 ? 0 : prev + 1
            )
          }
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
      <div className="p-4 bg-black bg-opacity-90">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 relative ${
                currentImageIndex === idx ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                layout="fill"
                objectFit="cover"
                className="opacity-90 hover:opacity-100"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
