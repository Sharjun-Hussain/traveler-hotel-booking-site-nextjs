"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CircleDot,
  Circle,
  ChevronDown,
} from "lucide-react";
import HotelCard from "./HotelCard";
import { Button } from "@/components/ui/button";

// Skeleton component for loading state
const HotelCardSkeleton = () => (
  <div className="w-full mt-4 h-full rounded-lg">
    <div className="max-w-full w-full overflow-hidden shadow-sm relative rounded-lg">
      {/* Image skeleton */}
      <div className="relative h-48 bg-gray-200 animate-pulse"></div>

      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="flex justify-between items-start mb-2">
          <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse"></div>
        </div>

        {/* Hotel type skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3 animate-pulse"></div>

        {/* Amenities skeleton */}
        <div className="flex flex-wrap gap-2 mb-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-6 bg-gray-200 rounded w-20 animate-pulse"
            ></div>
          ))}
        </div>

        {/* Description skeleton */}
        <div className="h-10 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>

        {/* Price and button skeleton */}
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-9 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

// Sorting dropdown component
const SortDropdown = ({ label, options, currentValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center rounded-2xl justify-between gap-2 border px-3 py-1.5 text-sm font-medium bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-100 bg-white border rounded shadow-lg min-w-[150px]">
          {options.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${currentValue === option.value ? "bg-gray-50 font-medium" : ""
                }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

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
  // Load more feature props
  initialItemsLimit = 12,
  loadMoreEnabled = true,
  loadMoreButtonLabel = "Load More",
  loadMoreButtonClass = "bg-j-primary text-white py-2 px-4 rounded-md  mt-8 mx-auto",
  onLoadMore = () => { },
  loadingMoreItems = false,
  loadMoreItemsCount = 12, // Number of items to load each time
  // Sorting props
  enableSorting = false,
  sortingOptions = [
    {
      label: "Popularity",
      options: [
        { label: "Most Popular", value: "popularity-desc" },
        { label: "Least Popular", value: "popularity-asc" },
      ],
    },
    {
      label: "Price",
      options: [
        { label: "Low to High", value: "price-asc" },
        { label: "High to Low", value: "price-desc" },
      ],
    },
    {
      label: "Newest",
      options: [
        { label: "Newest First", value: "date-desc" },
        { label: "Oldest First", value: "date-asc" },
      ],
    },
    {
      label: "Rating",
      options: [
        { label: "Highest Rated", value: "rating-desc" },
        { label: "Lowest Rated", value: "rating-asc" },
      ],
    },
  ],
  onSortChange = null, // External callback for server-side sorting
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
  const [visibleItems, setVisibleItems] = useState(initialItemsLimit);
  const carouselRef = useRef(null);

  // Sorting states
  const [sortedItems, setSortedItems] = useState([...destinations]);
  const [sortCriteria, setSortCriteria] = useState({
    popularity: "popularity-desc",
    price: "price-asc",
    date: "date-desc",
    rating: "rating-desc",
  });

  // Reset sorted items when destinations change
  useEffect(() => {
    applySorting(destinations);
  }, [destinations]);

  // Apply sorting based on current criteria
  const applySorting = (items) => {
    // Create a copy to avoid mutating props
    let result = [...items];

    // Get the active sort value - this could be enhanced further
    // For simplicity, we'll prioritize in this order: popularity, price, date, rating
    const activeSortValue =
      sortCriteria.popularity ||
      sortCriteria.price ||
      sortCriteria.date ||
      sortCriteria.rating;

    if (!activeSortValue) {
      setSortedItems(result);
      return;
    }

    // Parse the sort value (e.g., "price-asc" to get field="price", direction="asc")
    const [field, direction] = activeSortValue.split("-");

    // Handle different sort fields
    switch (field) {
      case "popularity":
        // Assuming higher popularity value = more popular
        result.sort((a, b) => {
          const aValue = a.popularity || 0;
          const bValue = b.popularity || 0;
          return direction === "asc" ? aValue - bValue : bValue - aValue;
        });
        break;

      case "price":
        result.sort((a, b) => {
          // Handle missing price values
          const aValue =
            typeof a.price === "number"
              ? a.price
              : typeof a.price === "string"
                ? parseFloat(a.price.replace(/[^0-9.]/g, ""))
                : 0;
          const bValue =
            typeof b.price === "number"
              ? b.price
              : typeof b.price === "string"
                ? parseFloat(b.price.replace(/[^0-9.]/g, ""))
                : 0;
          return direction === "asc" ? aValue - bValue : bValue - aValue;
        });
        break;

      case "date":
        result.sort((a, b) => {
          // Assuming there's a date field, could be 'createdAt' or similar
          const aValue = a.date ? new Date(a.date).getTime() : 0;
          const bValue = b.date ? new Date(b.date).getTime() : 0;
          return direction === "asc" ? aValue - bValue : bValue - aValue;
        });
        break;

      case "rating":
        result.sort((a, b) => {
          const aValue = a.rating || 0;
          const bValue = b.rating || 0;
          return direction === "asc" ? aValue - bValue : bValue - aValue;
        });
        break;

      default:
        // No sorting
        break;
    }

    setSortedItems(result);
  };

  // Handler for sort change
  const handleSortChange = (option, value) => {
    // Update the sort criteria
    const newCriteria = { ...sortCriteria };

    // Reset all other criteria when one is selected
    Object.keys(newCriteria).forEach((key) => {
      if (key === option) {
        newCriteria[key] = value;
      } else {
        newCriteria[key] = null;
      }
    });

    setSortCriteria(newCriteria);

    // If external handler is provided (for server-side sorting)
    if (onSortChange) {
      onSortChange(option, value);
    } else {
      // Otherwise, sort client-side
      applySorting(destinations);
    }
  };

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
  const maxIndex = Math.max(0, sortedItems.length - itemsToShow);

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

  // Handle load more button click
  const handleLoadMore = () => {
    onLoadMore(visibleItems, visibleItems + loadMoreItemsCount);
    setVisibleItems((prev) => prev + loadMoreItemsCount);
  };

  // Calculate pagination dots
  const totalDots = Math.ceil((maxIndex + 1) / scrollCount);
  const currentDot = Math.floor(currentIndex / scrollCount);

  // Select Arrow component based on prop
  const PrevArrow = arrowType === "chevron" ? ChevronLeft : ArrowLeft;
  const NextArrow = arrowType === "chevron" ? ChevronRight : ArrowRight;

  // Render sorting options
  const renderSortingOptions = () => {
    if (!enableSorting) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-4  w-fit rounded-2xl">
        {sortingOptions.map((sortOption) => (
          <SortDropdown
            key={sortOption.label}
            label={sortOption.label}
            options={sortOption.options}
            currentValue={sortCriteria[sortOption.label.toLowerCase()]}
            onChange={(value) =>
              handleSortChange(sortOption.label.toLowerCase(), value)
            }
          />
        ))}
      </div>
    );
  };

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
            className={`h-6 w-6 flex items-center justify-center rounded-full transition-colors duration-300 ${isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
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
            className={`h-1 w-12 rounded-full transition-colors duration-300 ${isActive ? "bg-blue-600" : "bg-gray-300"
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
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 ${arrowStyle} ${arrowPosition === "overlay" ? "pointer-events-auto" : ""
            }`}
          aria-label="Previous destinations"
        >
          <PrevArrow size={24} />
        </button>
        <button
          onClick={handleNext}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 ${arrowStyle} ${arrowPosition === "overlay" ? "pointer-events-auto" : ""
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

  // Render loading skeletons for grid layout
  const renderLoadingSkeletons = () => {
    return (
      <div
        className={`grid grid-cols-1 gap-4 
        ${gridItemsToShowBreakpoints.md
            ? `md:${getGridColsClass(gridItemsToShowBreakpoints.md)}`
            : ""
          } 
        ${gridItemsToShowBreakpoints.lg
            ? `lg:${getGridColsClass(gridItemsToShowBreakpoints.lg)}`
            : ""
          } 
        ${gridItemsToShowBreakpoints.xl
            ? `xl:${getGridColsClass(gridItemsToShowBreakpoints.xl)}`
            : ""
          }`}
      >
        {[...Array(loadMoreItemsCount)].map((_, index) => (
          <div key={`skeleton-${index}`} className="w-full">
            <HotelCardSkeleton />
          </div>
        ))}
      </div>
    );
  };

  // Render load more button
  const renderLoadMoreButton = () => {
    if (
      displayMode !== "grid" ||
      !loadMoreEnabled ||
      sortedItems.length < initialItemsLimit
    ) {
      return null;
    }

    return (
      <div className="flex justify-center mt-4">
        <Button
          onClick={handleLoadMore}
          className={loadMoreButtonClass}
          disabled={loadingMoreItems}
        >
          {loadingMoreItems ? "Loading..." : loadMoreButtonLabel}
        </Button>
      </div>
    );
  };

  // Render content based on display mode
  const renderContent = () => {
    if (displayMode === "grid") {
      const itemsToDisplay = sortedItems.slice(0, visibleItems);

      // Grid layout with predefined Tailwind classes
      return (
        <>
          <div
            className={`grid grid-cols-1 gap-4 
            ${gridItemsToShowBreakpoints.md
                ? `md:${getGridColsClass(gridItemsToShowBreakpoints.md)}`
                : ""
              } 
            ${gridItemsToShowBreakpoints.lg
                ? `lg:${getGridColsClass(gridItemsToShowBreakpoints.lg)}`
                : ""
              } 
            ${gridItemsToShowBreakpoints.xl
                ? `xl:${getGridColsClass(gridItemsToShowBreakpoints.xl)}`
                : ""
              }`}
          >
            {itemsToDisplay.map((destination) => (
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

          {/* Show loading skeletons if more items are being loaded */}
          {loadingMoreItems && renderLoadingSkeletons()}

          {/* Render load more button if needed */}
          {renderLoadMoreButton()}
        </>
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
              transform: `translateX(-${(currentIndex * 100) / carouselItemsToShow
                }%)`,
            }}
          >
            {sortedItems.map((destination) => (
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
      className={`w-full relative ${headTitle || description ? "py-8 px-4" : ""
        } `}
    >
      <div className="font-bold text-j-primary text-lg">
        {headTitle && headTitle.toUpperCase()}
      </div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
      </div>
      <div
        className={`text-md text-j-text-small ${headTitle || description ? "mb-4" : ""
          } max-w-3xl`}
      >
        {description}
      </div>

      {/* Render sorting options above content */}
      {renderSortingOptions()}

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
