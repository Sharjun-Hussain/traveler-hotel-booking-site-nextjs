import { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, MapPin, User, X, CreditCard, Lock, Info, ShoppingCart } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
    SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data for demonstration
const bookingData = {
    property: {
        name: "Ocean View Villa",
        location: "Unawatuna, Sri Lanka",
        image: "/api/placeholder/400/200",
        rating: 4.8,
        reviews: 127,
        roomType: "Deluxe Suite with Balcony",
        amenities: ["Free WiFi", "Air conditioning", "Ocean view", "Private bathroom"]
    },
    dates: {
        checkIn: "2025-05-15",
        checkOut: "2025-05-20",
        nights: 5
    },
    guests: {
        adults: 2,
        children: 1
    },
    pricing: {
        basePrice: 175,
        taxes: 35,
        serviceFee: 25,
        discount: 50,
        total: 850
    },
    cancellation: {
        policy: "Free cancellation before May 13, 2025",
        refundPercentage: 100
    }
};

export default function BookingSheet() {
    const [showPriceDetails, setShowPriceDetails] = useState(false);
    const [showPropertyDetails, setShowPropertyDetails] = useState(true);
    const [promoCode, setPromoCode] = useState("");
    const [isApplyingPromo, setIsApplyingPromo] = useState(false);
    const [promoApplied, setPromoApplied] = useState(false);

    // Format date to readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleApplyPromo = () => {
        if (!promoCode) return;

        setIsApplyingPromo(true);
        // Simulate API call
        setTimeout(() => {
            setIsApplyingPromo(false);
            setPromoApplied(true);
            // In a real app, you would update the pricing here
        }, 1000);
    };

    const handleRemovePromo = () => {
        setPromoApplied(false);
        setPromoCode("");
        // In a real app, you would revert the pricing changes here
    };

    return (
        <div className="flex flex-col items-center">
            <Sheet >
                <SheetTrigger asChild>
                    <Button variant="ghost" className="bg-white/80  backdrop-blur-sm">
                        <ShoppingCart className="h-5 w-5 mr-1" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto p-0">
                    {/* Header */}
                    <SheetHeader className="bg-j-primary p-4 sm:p-5 text-white sticky top-0 z-10">
                        <div className="flex justify-between items-center">
                            <SheetTitle className="text-white text-xl sm:text-2xl font-bold">Booking Summary</SheetTitle>
                            <SheetClose className="rounded-full p-1 hover:bg-red-400 transition-colors">
                                <X size={18} />
                            </SheetClose>
                        </div>
                        <SheetDescription className="text-blue-100 text-sm">
                            Complete your reservation for an amazing stay in Sri Lanka
                        </SheetDescription>
                    </SheetHeader>

                    {/* Main content */}
                    <div className="p-4 sm:p-5">
                        {/* Property details section */}
                        <div className="mb-4">
                            <button
                                className="flex justify-between items-center w-full cursor-pointer"
                                onClick={() => setShowPropertyDetails(!showPropertyDetails)}
                            >
                                <h2 className="text-lg font-semibold text-gray-800">Property Details</h2>
                                {showPropertyDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>

                            <AnimatePresence>
                                {showPropertyDetails && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-3 flex gap-3 pb-4">
                                            <div className="w-1/3 min-w-[100px]">
                                                <img
                                                    src={bookingData.property.image}
                                                    alt={bookingData.property.name}
                                                    className="rounded-lg object-cover w-full aspect-square"
                                                />
                                            </div>
                                            <div className="w-2/3">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-semibold text-gray-800 line-clamp-2">
                                                        {bookingData.property.name}
                                                    </h3>
                                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 ml-2">
                                                        ★ {bookingData.property.rating}
                                                    </Badge>
                                                </div>

                                                <div className="flex items-center text-xs text-gray-600 mt-1">
                                                    <MapPin size={12} className="mr-1" />
                                                    {bookingData.property.location}
                                                </div>

                                                <p className="mt-2 text-sm font-medium text-gray-700">{bookingData.property.roomType}</p>

                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {bookingData.property.amenities.map((amenity, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="outline"
                                                            className="text-xs bg-gray-100 text-gray-700 py-0.5 px-2"
                                                        >
                                                            {amenity}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Separator className="my-3" />

                        {/* Stay details */}
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Stay Details</h2>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="border rounded-lg p-2 bg-gray-50">
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <Calendar size={14} className="mr-1" />
                                        <span className="text-xs font-medium">Check-in</span>
                                    </div>
                                    <p className="text-sm font-semibold">{formatDate(bookingData.dates.checkIn)}</p>
                                    <p className="text-xs text-gray-500">From 2:00 PM</p>
                                </div>

                                <div className="border rounded-lg p-2 bg-gray-50">
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <Calendar size={14} className="mr-1" />
                                        <span className="text-xs font-medium">Check-out</span>
                                    </div>
                                    <p className="text-sm font-semibold">{formatDate(bookingData.dates.checkOut)}</p>
                                    <p className="text-xs text-gray-500">Until 11:00 AM</p>
                                </div>

                                <div className="border rounded-lg p-2 bg-gray-50">
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <Calendar size={14} className="mr-1" />
                                        <span className="text-xs font-medium">Duration</span>
                                    </div>
                                    <p className="text-sm font-semibold">{bookingData.dates.nights} nights</p>
                                </div>

                                <div className="border rounded-lg p-2 bg-gray-50">
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <User size={14} className="mr-1" />
                                        <span className="text-xs font-medium">Guests</span>
                                    </div>
                                    <p className="text-sm font-semibold">
                                        {bookingData.guests.adults} {bookingData.guests.adults > 1 ? 'adults' : 'adult'}
                                        {bookingData.guests.children > 0 && `, ${bookingData.guests.children} ${bookingData.guests.children > 1 ? 'children' : 'child'}`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-3" />

                        {/* Cancellation policy */}
                        <div className="mb-4">
                            <Alert className="bg-green-50 border-green-200 p-3">
                                <AlertDescription className="flex items-start">
                                    <Info size={14} className="mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="text-sm font-medium text-green-700">{bookingData.cancellation.policy}</span>
                                        <p className="text-xs text-green-600 mt-1">You'll get a full refund if you cancel before May 13</p>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        </div>

                        <Separator className="my-3" />

                        {/* Price breakdown */}
                        <div className="mb-4">
                            <button
                                className="flex justify-between items-center w-full cursor-pointer"
                                onClick={() => setShowPriceDetails(!showPriceDetails)}
                            >
                                <h2 className="text-lg font-semibold text-gray-800">Price Details</h2>
                                {showPriceDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>

                            <AnimatePresence>
                                {showPriceDetails && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-3 space-y-2">
                                            <div className="flex justify-between text-sm text-gray-700">
                                                <span>${bookingData.pricing.basePrice} × {bookingData.dates.nights} nights</span>
                                                <span>${bookingData.pricing.basePrice * bookingData.dates.nights}</span>
                                            </div>

                                            <div className="flex justify-between text-sm text-gray-700">
                                                <span>Taxes & fees</span>
                                                <span>${bookingData.pricing.taxes}</span>
                                            </div>

                                            <div className="flex justify-between text-sm text-gray-700">
                                                <span>Service fee</span>
                                                <span>${bookingData.pricing.serviceFee}</span>
                                            </div>

                                            {bookingData.pricing.discount > 0 && (
                                                <div className="flex justify-between text-sm text-green-600">
                                                    <span>Special discount</span>
                                                    <span>-${bookingData.pricing.discount}</span>
                                                </div>
                                            )}

                                            {promoApplied && (
                                                <div className="flex justify-between text-sm text-green-600">
                                                    <span>Promo code</span>
                                                    <div className="flex items-center">
                                                        <span className="mr-2">-${bookingData.pricing.discount}</span>
                                                        <button
                                                            onClick={handleRemovePromo}
                                                            className="text-xs text-red-500 hover:text-red-700"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            <Separator className="my-2" />

                                            <div className="flex justify-between font-bold">
                                                <span>Total</span>
                                                <span>${bookingData.pricing.total}</span>
                                            </div>

                                            <div className="pt-2">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter promo code"
                                                        value={promoCode}
                                                        onChange={(e) => setPromoCode(e.target.value)}
                                                        className="w-full p-2 text-sm border rounded-lg  outline-none"
                                                        disabled={promoApplied}
                                                    />
                                                    <button
                                                        onClick={handleApplyPromo}
                                                        disabled={!promoCode || promoApplied || isApplyingPromo}
                                                        className={`absolute right-2 top-2 text-sm font-medium ${promoApplied ? 'text-green-600' : 'text-blue-600'
                                                            } ${isApplyingPromo ? 'opacity-50' : ''}`}
                                                    >
                                                        {isApplyingPromo ? 'Applying...' : promoApplied ? 'Applied' : 'Apply'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Separator className="my-3" />

                        {/* Payment method */}
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h2>

                            <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                                <CreditCard size={18} className="mr-2 text-gray-600" />
                                <div>
                                    <p className="text-sm font-medium">Credit or Debit Card</p>
                                    <p className="text-xs text-gray-500">Visa, Mastercard, American Express</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer/Checkout button - Fixed at bottom */}
                    <SheetFooter className="sticky bottom-0 p-4 bg-white border-t shadow-sm">
                        <div className="w-full">
                            <Button className="w-full bg-j-primary hover:bg-j-primary/90 text-white font-medium py-3 px-4 rounded-lg transition duration-200 h-auto">
                                <Lock size={16} className="mr-2" />
                                Complete Booking
                            </Button>
                            <p className="text-center text-gray-500 text-xs mt-2">
                                By clicking "Complete Booking" you agree to our terms and conditions
                            </p>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}