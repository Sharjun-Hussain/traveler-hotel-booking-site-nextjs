import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays } from "date-fns";
import { CalendarDays, ArrowRight } from "lucide-react";

const ModernDatepicker = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 1));
  const [openPicker, setOpenPicker] = useState(null);

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const combinedPickerRef = useRef(null);

  // Format date for display
  const formatDate = (date) => format(date, "EEE, MMM d");
  const formatDateLong = (date) => format(date, "EEEE, MMMM d, yyyy");

  // Close pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openPicker &&
        combinedPickerRef.current &&
        !combinedPickerRef.current.contains(event.target)
      ) {
        setOpenPicker(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPicker]);

  // Ensure checkout date is after checkin date
  useEffect(() => {
    if (checkOutDate <= checkInDate) {
      setCheckOutDate(addDays(checkInDate, 1));
    }
  }, [checkInDate, checkOutDate]);

  // Calculate stay duration
  const stayDuration = () => {
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? "1 night" : `${diffDays} nights`;
  };

  return (
    <>
      {/* Mobile Design (stacked) */}
      <div className="md:hidden flex flex-col gap-4 w-full">
        {/* Check-in Date Picker */}
        <div className="relative flex-1" ref={checkInRef}>
          <div
            className="flex items-center justify-between cursor-pointe border border-gray-200 p-4 rounded-lg shadow-sm w-full hover:border-blue-400 transition-colors"
            onClick={() =>
              setOpenPicker(openPicker === "checkin" ? null : "checkin")
            }
          >
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-300 text-xs font-medium mb-1">
                CHECK-IN
              </span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {formatDate(checkInDate)}
              </span>
            </div>
            <CalendarDays className="w-5 h-5 text-gray-500 dark:text-white" />
          </div>
          {openPicker === "checkin" && (
            <div className="absolute mt-2  p-2 rounded-lg shadow-lg z-10 left-0">
              <DatePicker
                selected={checkInDate}
                onChange={(date) => {
                  setCheckInDate(date);
                  setOpenPicker("checkout");
                }}
                minDate={new Date()}
                inline
              />
            </div>
          )}
        </div>

        {/* Check-out Date Picker */}
        <div className="relative flex-1" ref={checkOutRef}>
          <div
            className="flex items-center justify-between cursor-pointer  border border-gray-200 p-4 rounded-lg shadow-sm w-full hover:border-blue-400 transition-colors"
            onClick={() =>
              setOpenPicker(openPicker === "checkout" ? null : "checkout")
            }
          >
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-300 text-xs font-medium mb-1">
                CHECK-OUT
              </span>
              <span className="text-gray-900  dark:text-white font-semibold">
                {formatDate(checkOutDate)}
              </span>
            </div>
            <CalendarDays className="w-5 h-5 text-gray-500 dark:text-white" />
          </div>
          {openPicker === "checkout" && (
            <div className="absolute mt-2 bg-white p-2 rounded-lg shadow-lg z-10 right-0">
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => {
                  setCheckOutDate(date);
                  setOpenPicker(null);
                }}
                minDate={addDays(checkInDate, 1)}
                inline
              />
            </div>
          )}
        </div>
      </div>

      {/* Desktop Design (combined elegant selector) */}
      <div className="hidden md:block relative " ref={combinedPickerRef}>
        <div
          className="flex items-center justify-between cursor-pointer  border border-gray-200 px-6 py-5 rounded-xl shadow-md w-full hover:shadow-lg transition-shadow"
          onClick={() => setOpenPicker(openPicker ? null : "combined")}
        >
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-300 text-sm font-medium mb-1">
                Check-in
              </span>
              <span className="text-gray-900 dark:text-white text-lg font-semibold">
                {formatDateLong(checkInDate)}
              </span>
            </div>

            <ArrowRight className="text-gray-400" />

            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-300 text-sm font-medium mb-1">
                Check-out
              </span>
              <span className="text-gray-900 dark:text-white text-lg font-semibold">
                {formatDateLong(checkOutDate)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {stayDuration()}
            </span>
            <CalendarDays className="w-6 h-6 text-gray-500" />
          </div>
        </div>

        {openPicker === "combined" && (
          <div className="absolute mt-4 bg-white p-4 rounded-xl shadow-xl z-10 left-0 right-0 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Select check-in date
                </h3>
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => {
                    setCheckInDate(date);
                  }}
                  minDate={new Date()}
                  inline
                />
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Select check-out date
                </h3>
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => {
                    setCheckOutDate(date);
                  }}
                  minDate={addDays(checkInDate, 1)}
                  inline
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                onClick={() => setOpenPicker(null)}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ModernDatepicker;
