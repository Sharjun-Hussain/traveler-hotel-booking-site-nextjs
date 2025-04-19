import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function HotelGallery({
  images,
  setShowAllPhotos,
  setCurrentImageIndex,
}) {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px]">
        <div className="md:col-span-2 row-span-2 relative rounded-l-lg overflow-hidden">
          <Image
            src={images[0]}
            alt="Main hotel image"
            layout="fill"
            objectFit="cover"
            className="cursor-pointer"
            onClick={() => {
              setCurrentImageIndex(0);
              setShowAllPhotos(true);
            }}
          />
        </div>
        <div className="hidden md:block relative">
          <Image
            src={images[1]}
            alt="Hotel photo 2"
            layout="fill"
            objectFit="cover"
            className="cursor-pointer"
            onClick={() => {
              setCurrentImageIndex(1);
              setShowAllPhotos(true);
            }}
          />
        </div>
        <div className="hidden md:block relative rounded-tr-lg overflow-hidden">
          <Image
            src={images[2]}
            alt="Hotel photo 3"
            layout="fill"
            objectFit="cover"
            className="cursor-pointer"
            onClick={() => {
              setCurrentImageIndex(2);
              setShowAllPhotos(true);
            }}
          />
        </div>
        <div className="hidden md:block relative">
          <Image
            src={images[3]}
            alt="Hotel photo 4"
            layout="fill"
            objectFit="cover"
            className="cursor-pointer"
            onClick={() => {
              setCurrentImageIndex(3);
              setShowAllPhotos(true);
            }}
          />
        </div>
        <div className="hidden md:block relative rounded-br-lg overflow-hidden">
          <Image
            src={images[4]}
            alt="Hotel photo 5"
            layout="fill"
            objectFit="cover"
            className="cursor-pointer"
            onClick={() => {
              setCurrentImageIndex(4);
              setShowAllPhotos(true);
            }}
          />
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-md text-sm font-medium flex items-center shadow-md hover:bg-gray-100"
          >
            <span>Show all photos</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
