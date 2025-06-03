import Image from "next/image";
import { ChevronRight } from "lucide-react";


export default function HotelGallery({
  images = [],
  setShowAllPhotos,
  setCurrentImageIndex,
  isLoading = false,
  error = null,
}) {
  if (error) {
    return (
      <div className="mb-8 h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-red-500">Failed to load images. Please try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return <GallerySkeleton />;
  }

  if (!images || images.length === 0) {
    return (
      <div className="mb-8 h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p>No images available</p>
      </div>
    );
  }

  // Ensure we have at least 5 images (fill with first image if needed)
  const displayImages = [...images];
  while (displayImages.length < 5 && displayImages.length > 0) {
    displayImages.push(displayImages[0]);
  }

  const handleImageClick = (index) => {
    if (setCurrentImageIndex && setShowAllPhotos) {
      setCurrentImageIndex(index);
      setShowAllPhotos(true);
    }
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px]">
        {/* Main image */}
        <div className="md:col-span-2 row-span-2 relative rounded-l-lg overflow-hidden">
          <Image
            src={displayImages[0]}
            alt="Main hotel image"
            layout="fill"
            objectFit="cover"
            className="cursor-pointer"
            onClick={() => handleImageClick(0)}
            priority
          />
        </div>

        {/* Secondary images */}
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`hidden md:block relative ${index === 2 ? "rounded-tr-lg" : index === 4 ? "rounded-br-lg" : ""
              } overflow-hidden`}
          >
            <Image
              src={displayImages[index]}
              alt={`Hotel photo ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="cursor-pointer"
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}

        {/* Show all photos button */}
        <div className="hidden md:block relative rounded-br-lg overflow-hidden">
          {displayImages[4] && (
            <Image
              src={displayImages[4]}
              alt="Hotel photo 5"
              layout="fill"
              objectFit="cover"
              className="cursor-pointer"
              onClick={() => handleImageClick(4)}
            />
          )}
          {setShowAllPhotos && (
            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-md text-sm font-medium flex items-center shadow-md hover:bg-gray-100 transition-colors"
            >
              <span>Show all photos</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px]">
        <div className="md:col-span-2 row-span-2 rounded-l-lg overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`hidden md:block ${i === 2 ? "rounded-tr-lg" : i === 4 ? "rounded-br-lg" : ""
              } overflow-hidden`}
          >
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skeleton({ className }) {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded-md ${className || ""}`}
    />
  );
}