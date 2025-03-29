"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CircleDot,
  Circle,
} from "lucide-react";
import HotelCard from "./HotelCard";

const CustomizedSectionWithCarousel = ({
  headTitle,
  title,
  description,
  sponsored = false,
  destinations = [],
  scrollInterval = 3000,
  type,
  showArrows = false,
  // Separate configurations for grid and carousel
  gridItemsToShowBreakpoints = {
    sm: 1, // Mobile devices
    md: 2, // Medium devices (tablets)
    lg: 4, // Large devices (desktops)
    xl: 4, // Extra large devices (large desktops)
  },
  carouselItemsToShowBreakpoints = {
    sm: 1, // Mobile devices
    md: 2, // Medium devices (tablets)
    lg: 3, // Large devices (desktops)
    xl: 4, // Extra large devices (large desktops)
  },
  scrollCount = 1,
  arrowStyle = "rounded-full bg-white shadow-lg p-2 text-gray-800",
  arrowPosition = "bottom", // "sides", "bottom", "overlay"
  arrowType = "chevron", // "chevron", "arrow"
  showIndicators = false,
  indicatorType = "dot", // "dot", "line", "number"
  indicatorPosition = "bottom", // "bottom", "top", "side"
  displayMode = "carousel", // "carousel" or "grid"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("xl");
  const [gridItemsToShow, setGridItemsToShow] = useState(
    gridItemsToShowBreakpoints.xl
  );
  const [carouselItemsToShow, setCarouselItemsToShow] = useState(
    carouselItemsToShowBreakpoints.xl
  );
  const carouselRef = useRef(null);

  // Check window size and set appropriate breakpoint
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newBreakpoint;

      if (width < 640) {
        newBreakpoint = "sm";
      } else if (width < 768) {
        newBreakpoint = "md";
      } else if (width < 1024) {
        newBreakpoint = "lg";
      } else {
        newBreakpoint = "xl";
      }

      if (newBreakpoint !== currentBreakpoint) {
        setCurrentBreakpoint(newBreakpoint);
        setGridItemsToShow(gridItemsToShowBreakpoints[newBreakpoint]);
        setCarouselItemsToShow(carouselItemsToShowBreakpoints[newBreakpoint]);
        // Reset current index when breakpoint changes to avoid blank slides
        setCurrentIndex(0);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    currentBreakpoint,
    gridItemsToShowBreakpoints,
    carouselItemsToShowBreakpoints,
  ]);

  // Calculate the maximum valid index based on display mode
  const itemsToShow =
    displayMode === "carousel" ? carouselItemsToShow : gridItemsToShow;
  const maxIndex = Math.max(0, destinations.length - itemsToShow);

  // Auto-scroll functionality
  useEffect(() => {
    let timer;

    if (displayMode === "carousel" && !isPaused && maxIndex > 0) {
      timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + scrollCount;
          return nextIndex > maxIndex ? 0 : nextIndex;
        });
      }, scrollInterval);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    currentIndex,
    isPaused,
    maxIndex,
    scrollInterval,
    scrollCount,
    displayMode,
  ]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - scrollCount;
      return nextIndex < 0 ? maxIndex : nextIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + scrollCount;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Calculate pagination dots
  const totalDots = Math.ceil((maxIndex + 1) / scrollCount);
  const currentDot = Math.floor(currentIndex / scrollCount);

  // Select Arrow component based on prop
  const PrevArrow = arrowType === "chevron" ? ChevronLeft : ArrowLeft;
  const NextArrow = arrowType === "chevron" ? ChevronRight : ArrowRight;

  // Generate indicators based on type
  const renderIndicators = () => {
    if (displayMode === "grid" || !showIndicators || totalDots <= 1)
      return null;

    const indicators = [];
    for (let i = 0; i < totalDots; i++) {
      const isActive = i === currentDot;

      // Different indicator types
      let indicator;
      if (indicatorType === "number") {
        indicator = (
          <button
            key={i}
            onClick={() => setCurrentIndex(i * scrollCount)}
            className={`h-6 w-6 flex items-center justify-center rounded-full transition-colors duration-300 ${
              isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            aria-label={`Go to slide group ${i + 1}`}
          >
            {i + 1}
          </button>
        );
      } else if (indicatorType === "line") {
        indicator = (
          <button
            key={i}
            onClick={() => setCurrentIndex(i * scrollCount)}
            className={`h-1 w-12 rounded-full transition-colors duration-300 ${
              isActive ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide group ${i + 1}`}
          />
        );
      } else {
        // Default dot indicator
        indicator = (
          <button
            key={i}
            onClick={() => setCurrentIndex(i * scrollCount)}
            className="focus:outline-none"
            aria-label={`Go to slide group ${i + 1}`}
          >
            {isActive ? (
              <CircleDot size={16} className="text-blue-600" />
            ) : (
              <Circle size={16} className="text-gray-400" />
            )}
          </button>
        );
      }
      indicators.push(indicator);
    }

    // Indicator container positioning
    let indicatorContainerClass = "flex justify-center gap-2 mt-4";
    if (indicatorPosition === "top") {
      indicatorContainerClass = "flex justify-center gap-2 mb-4";
    } else if (indicatorPosition === "side") {
      indicatorContainerClass =
        "absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2";
    }

    return <div className={indicatorContainerClass}>{indicators}</div>;
  };

  // Generate arrow controls based on position
  const renderArrows = () => {
    if (displayMode === "grid" || !showArrows || maxIndex <= 0) return null;

    // Arrow container based on position
    if (arrowPosition === "bottom") {
      return (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handlePrev}
            className={arrowStyle}
            aria-label="Previous destinations"
          >
            <PrevArrow size={24} />
          </button>
          <button
            onClick={handleNext}
            className={arrowStyle}
            aria-label="Next destinations"
          >
            <NextArrow size={24} />
          </button>
        </div>
      );
    }

    // Default: sides or overlay
    const positioning =
      arrowPosition === "overlay"
        ? "absolute inset-0 flex items-center justify-between pointer-events-none"
        : "";

    return (
      <div className={positioning}>
        <button
          onClick={handlePrev}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 ${arrowStyle} ${
            arrowPosition === "overlay" ? "pointer-events-auto" : ""
          }`}
          aria-label="Previous destinations"
        >
          <PrevArrow size={24} />
        </button>
        <button
          onClick={handleNext}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 ${arrowStyle} ${
            arrowPosition === "overlay" ? "pointer-events-auto" : ""
          }`}
          aria-label="Next destinations"
        >
          <NextArrow size={24} />
        </button>
      </div>
    );
  };

  // Get grid column class based on number of items to show
  const getGridColsClass = (cols) => {
    // Pre-defined Tailwind classes for grid columns
    const colsMap = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    };
    return colsMap[cols] || "grid-cols-1";
  };

  // Render content based on display mode
  const renderContent = () => {
    if (displayMode === "grid") {
      // Grid layout with predefined Tailwind classes
      return (
        <div
          className={`grid grid-cols-1 gap-4 
          ${
            gridItemsToShowBreakpoints.md
              ? `md:${getGridColsClass(gridItemsToShowBreakpoints.md)}`
              : ""
          } 
          ${
            gridItemsToShowBreakpoints.lg
              ? `lg:${getGridColsClass(gridItemsToShowBreakpoints.lg)}`
              : ""
          } 
          ${
            gridItemsToShowBreakpoints.xl
              ? `xl:${getGridColsClass(gridItemsToShowBreakpoints.xl)}`
              : ""
          }`}
        >
          {destinations.map((destination) => (
            <div key={destination.id} className="w-full">
              <HotelCard
                id={destination.id}
                type={type}
                url={destination.url}
                imageUrl={destination.image}
                name={destination.name}
                price={destination.price}
                rating={destination.rating}
                reviewCount={destination.reviewCount}
                isFavorite={false}
                sponsored={destination.sponsored}
                onFavoriteToggle={() => alert()}
                description={destination.description}
                key={destination.id}
                amenities={[
                  { type: "wifi", label: "Free WiFi" },
                  { type: "pool", label: "Swimming Pool" },
                  { type: "ac", label: "Air Conditioning" },
                  { type: "breakfast", label: "Free Breakfast" },
                  { type: "parking", label: "Free Parking" },
                ]}
                location={destination.name}
              />
            </div>
          ))}
        </div>
      );
    } else {
      // Carousel layout with dedicated carousel configuration
      return (
        <div
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={carouselRef}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${
                (currentIndex * 100) / carouselItemsToShow
              }%)`,
            }}
          >
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="flex-none p-2"
                style={{ width: `${100 / carouselItemsToShow}%` }}
              >
                <HotelCard
                  type={type}
                  id={destination.id}
                  amenities={destination.amenities}
                  url={destination.url}
                  imageUrl={destination.image}
                  name={destination.name}
                  price={destination.price}
                  rating={destination.rating}
                  reviewCount={destination.rating}
                  isFavorite={false}
                  sponsored={destination.sponsored}
                  onFavoriteToggle={() => alert()}
                  description={destination.description}
                  key={destination.id}
                  location={destination.name}
                />
              </div>
            ))}
          </div>

          {arrowPosition === "overlay" && renderArrows()}
        </div>
      );
    }
  };

  return (
    <div
      className={`w-full relative ${
        headTitle || description ? "py-8  px-4" : ""
      } `}
    >
      <div className="font-bold text-j-primary text-lg">
        {headTitle && headTitle.toUpperCase()}
      </div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        {/* <a href="/destinations" className="text-blue-600 hover:text-blue-800">
          View all →
        </a> */}
      </div>
      <div
        className={`text-md text-j-text-small ${
          headTitle || description ? "mb-8" : ""
        } max-w-3xl`}
      >
        {description}
      </div>

      {indicatorPosition === "top" && renderIndicators()}

      <div className="relative">
        {renderContent()}
        {displayMode === "carousel" &&
          arrowPosition !== "overlay" &&
          renderArrows()}
      </div>

      {(indicatorPosition === "bottom" || indicatorPosition === "side") &&
        renderIndicators()}
    </div>
  );
};

export default CustomizedSectionWithCarousel;
