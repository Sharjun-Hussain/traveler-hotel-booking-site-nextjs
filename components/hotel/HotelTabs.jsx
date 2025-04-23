import { useState } from "react";
import OverviewTab from "./tabs/OverviewTab";
import RoomsTab from "./tabs/RoomsTab";
import FacilitiesTab from "./tabs/FacilitiesTab";
import LocationTab from "./tabs/LocationTab";
import ReviewsTab from "./tabs/ReviewsTab";
import PoliciesTab from "./tabs/PoliciesTab";

export default function HotelTabs({
  activeTab,
  className,
  setActiveTab,
  hotelData,
  handleRoomClick,
}) {
  return (
    <div className={`${className}`}>
      <div className="border-b mb-6">
        <div className="flex space-x-8">
          {["Overview", "Facilities", "Location", "Reviews", "Policies"].map(
            (tab) => (
              <button
                key={tab}
                className={`pb-4 px-1 font-medium ${
                  activeTab === tab.toLowerCase()
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {activeTab === "overview" && (
        <OverviewTab hotelData={hotelData} handleRoomClick={handleRoomClick} />
      )}
      {activeTab === "rooms" && (
        <RoomsTab rooms={hotelData.rooms} handleRoomClick={handleRoomClick} />
      )}
      {activeTab === "facilities" && (
        <FacilitiesTab amenities={hotelData.amenities} />
      )}
      {activeTab === "location" && <LocationTab hotelData={hotelData} />}
      {activeTab === "reviews" && <ReviewsTab reviews={hotelData.reviews} />}
      {activeTab === "policies" && (
        <PoliciesTab policies={hotelData.policies} />
      )}
    </div>
  );
}
