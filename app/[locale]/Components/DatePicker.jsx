import React, { useState, useEffect } from "react";
import {
  format,
  addDays,
  isSameDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  isWithinInterval,
} from "date-fns";
import { CalendarDays, ArrowRight, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

const DatePicker = ({
  onDatesChange,
  minStay = 1,
  className,
  initialCheckIn,
  initialCheckOut,
}) => {
  const [open, setOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState(initialCheckIn || null);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOut || null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleDateSelect = (date) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
      if (!isDesktop) setCurrentMonth(startOfMonth(date));
    } else {
      if (date > checkInDate) {
        setCheckOutDate(date);
        // setOpen(false);
      } else {
        setCheckInDate(date);
        setCheckOutDate(null);
      }
    }
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      onDatesChange?.({ checkIn: checkInDate, checkOut: checkOutDate });
    }
  }, [checkInDate, checkOutDate]);

  const getDateStatus = (date) => {
    if (isSameDay(date, checkInDate)) return "start";
    if (checkOutDate && isSameDay(date, checkOutDate)) return "end";
    if (
      checkInDate &&
      checkOutDate &&
      isWithinInterval(date, { start: checkInDate, end: checkOutDate })
    )
      return "in-range";
    if (
      hoveredDate &&
      checkInDate &&
      !checkOutDate &&
      isWithinInterval(date, { start: checkInDate, end: hoveredDate })
    )
      return "hovered-range";
    return "";
  };

  const displayedMonths = isDesktop
    ? [currentMonth, addMonths(currentMonth, 1)]
    : [currentMonth];

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex flex-col items-start justify-start text-left h-20"
          >
            <div>Select Date</div>
            <div className="flex justify-between   w-full text-sm">
              <div className="flex  justify-between w-[90%]  items-center gap-2">
                <CalendarDays size={42} />
                {checkInDate
                  ? format(checkInDate, "eee, MMM d")
                  : "Check-in-date"}
                <div>—</div>
                {checkOutDate
                  ? format(checkOutDate, "eee, MMM d")
                  : "Check-out-date"}
              </div>
              {/* {checkInDate && checkOutDate && (
                <span className="ml-4 text-sm text-muted-foreground">
                  {Math.ceil(
                    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
                  )}{" "}
                  nights
                </span>
              )} */}
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col p-4">
            <div className="flex gap-4">
              {displayedMonths.map((month, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center px-4">
                    <h3 className="font-semibold">
                      {format(month, "MMMM yyyy")}
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentMonth(addMonths(month, -1))}
                        disabled={isDesktop && index !== 0}
                      >
                        ←
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentMonth(addMonths(month, 1))}
                        disabled={isDesktop && index !== 1}
                      >
                        →
                      </Button>
                    </div>
                  </div>
                  <Calendar
                    month={month}
                    mode="range"
                    selected={{ from: checkInDate, to: checkOutDate }}
                    onDayClick={handleDateSelect}
                    onDayMouseEnter={setHoveredDate}
                    onDayMouseLeave={() => setHoveredDate(null)}
                    disabled={(date) => date < new Date()}
                    className="border-0"
                    dayClassName={(date) => {
                      const status = getDateStatus(date);
                      return cn(
                        "h-9 w-9 rounded-full hover:bg-primary/90",
                        status === "start" &&
                          "bg-primary text-white hover:bg-primary",
                        status === "end" &&
                          "bg-primary text-white hover:bg-primary",
                        status === "in-range" && "bg-primary/20",
                        status === "hovered-range" && "bg-primary/10"
                      );
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 px-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setCheckInDate(null);
                  setCheckOutDate(null);
                }}
              >
                <X className="mr-2 h-4 w-4" /> Clear
              </Button>
              <Button onClick={() => setOpen(false)}>Done</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
