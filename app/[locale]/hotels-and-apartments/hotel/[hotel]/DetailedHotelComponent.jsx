"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import HotelHeader from "@/components/hotel/HotelHeader";
import HotelGallery from "@/components/hotel/HotelGallery";
import HotelHighlights from "@/components/hotel/HotelHighlights";
import HotelTabs from "@/components/hotel/HotelTabs";
import HotelBookingWidget from "@/components/hotel/HotelBookingWidget";
import HotelStickyBar from "@/components/hotel/HotelStickyBar";
import FullScreenGallery from "@/components/hotel/FullScreenGallery";
import { hotelData } from "./hotelData";

export default function HotelDetailsPage() {
  const router = useRouter();
  const bookingSectionRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null,
  });
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0 });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookNow = () => {
    if (!selectedRoom || !selectedDates.checkIn || !selectedDates.checkOut) {
      alert("Please select a room, check-in, and check-out dates.");
      return;
    }
    router.push(
      `/checkout?roomId=${selectedRoom.id}&checkIn=${selectedDates.checkIn}&checkOut=${selectedDates.checkOut}&adults=${guests.adults}&children=${guests.children}`
    );
  };

  const calculateNights = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    const checkIn = new Date(selectedDates.checkIn);
    const checkOut = new Date(selectedDates.checkOut);
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const totalPrice = () => {
    const nights = calculateNights();
    const roomPrice = selectedRoom
      ? selectedRoom.discountPrice || selectedRoom.price
      : hotelData.discountPrice || hotelData.price;
    return nights * roomPrice;
  };

  const serviceFee = () => {
    return Math.round(totalPrice() * 0.1);
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    bookingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="lg:mt-14 h">
      <Head>
        <title>{hotelData.name} | Luxury Stay - SL Vista</title>
        <meta name="description" content={hotelData.description} />
      </Head>

      {/* <HotelStickyBar
        isScrolled={isScrolled}
        hotelData={hotelData}
        selectedRoom={selectedRoom}
        calculateNights={calculateNights}
        totalPrice={totalPrice}
        serviceFee={serviceFee}
        handleBookNow={handleBookNow}
      /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <HotelHeader
          hotelData={hotelData}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
        />

        <HotelGallery
          images={hotelData.images}
          setShowAllPhotos={setShowAllPhotos}
          setCurrentImageIndex={setCurrentImageIndex}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <HotelHighlights />

            <HotelTabs
              className="mb-14"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              hotelData={hotelData}
              handleRoomClick={handleRoomClick}
            />
          </div>

          <div className="lg:w-1/3" ref={bookingSectionRef}>
            <HotelBookingWidget
              hotelData={hotelData}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              guests={guests}
              setGuests={setGuests}
              calculateNights={calculateNights}
              totalPrice={totalPrice}
              serviceFee={serviceFee}
              handleBookNow={handleBookNow}
            />
          </div>
        </div>
      </div>

      <FullScreenGallery
        showAllPhotos={showAllPhotos}
        setShowAllPhotos={setShowAllPhotos}
        images={hotelData.images}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        isFavorite={isFavorite}
        setIsFavorite={setIsFavorite}
        hotelName={hotelData.name}
      />
    </div>
  );
}
