"use client"
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, MapPin, Camera, BedDouble, Home, Clock, DollarSign, User, Hotel } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

const PropertyListingDialog = ({ open, setOpen }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfo />;
      case 2:
        return <PropertyDetails />;
      case 3:
        return <PricingAvailability />;
      case 4:
        return <PhotosAmenities />;
      case 5:
        return <ReviewSubmit />;
      default:
        return <BasicInfo />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} className="w-4xl bg-amber-300">
      <DialogContent className="w-[1200px] max-w-[95vw] h-[90vh] p-0 overflow-y-auto bg-white rounded-lg">
        <div className="flex flex-col h-full">
          {/* Dialog Header with Progress Bar */}
          <DialogHeader className="px-6 pt-4 pb-2 border-b">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold text-blue-800">
                List Your Property
              </DialogTitle>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between mb-1 text-xs text-gray-500">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} className={`${i === step - 1 ? 'text-blue-600 font-medium' : ''}`}>
                    Step {i + 1}
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </DialogHeader>

          {/* Dialog Content (Scrollable) */}
          <div className="flex-grow overflow-y-auto p-6">
            {renderStep()}
          </div>

          {/* Dialog Footer */}
          <DialogFooter className="border-t p-4 bg-gray-50">
            <div className="flex justify-between w-full">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
              >
                {step === totalSteps ? 'Submit Listing' : 'Continue'}
                {step !== totalSteps && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Step 1: Basic Information Component
const BasicInfo = () => {
  return (
    <div className="space-y-6" >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <Home className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Let's start with basic information</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="property-type" className="text-sm font-medium text-gray-700 block mb-2">What type of property are you listing?</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {['Hotel', 'Apartment', 'Guest House', 'Villa', 'Resort', 'Hostel'].map((type) => (
              <div key={type} className="border rounded-md p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Hotel className="h-5 w-5 text-blue-600" />
                  <span>{type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div>
            <Label htmlFor="property-name" className="text-sm font-medium text-gray-700 block mb-2">Property Name</Label>
            <Input id="property-name" placeholder="e.g. Seaside Villa" className="border border-gray-300 rounded-md" />
            <p className="text-xs text-gray-500 mt-1">This is the name guests will see when they search for places to stay.</p>
          </div>

          <div>
            <Label htmlFor="property-location" className="text-sm font-medium text-gray-700 block mb-2">Where is your property located?</Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input id="property-country" placeholder="Country" className="border border-gray-300 rounded-md" />
              </div>
              <div className="flex-1">
                <Input id="property-city" placeholder="City" className="border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="property-address" className="text-sm font-medium text-gray-700 block mb-2">Full Address</Label>
            <Textarea id="property-address" placeholder="Street, Building Number, Postal Code" className="border border-gray-300 rounded-md h-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 2: Property Details Component
const PropertyDetails = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <BedDouble className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Tell us about your property</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700 block mb-2">How many guests can stay?</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bedrooms" className="text-sm text-gray-600 block mb-1">Bedrooms</Label>
              <Input id="bedrooms" type="number" min="1" className="border border-gray-300 rounded-md" placeholder="0" />
            </div>
            <div>
              <Label htmlFor="bathrooms" className="text-sm text-gray-600 block mb-1">Bathrooms</Label>
              <Input id="bathrooms" type="number" min="1" className="border border-gray-300 rounded-md" placeholder="0" />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Label className="text-sm font-medium text-gray-700 block mb-3">What type of beds are available?</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {['Single Bed', 'Double Bed', 'Queen Bed', 'King Bed', 'Sofa Bed', 'Bunk Bed'].map((bedType) => (
              <div key={bedType} className="flex items-center space-x-2">
                <Checkbox id={`bed-${bedType}`} />
                <Label htmlFor={`bed-${bedType}`} className="text-sm">{bedType}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Label className="text-sm font-medium text-gray-700 block mb-2">Property Size</Label>
          <div className="flex gap-3 items-center">
            <Input id="property-size" type="number" min="1" className="border border-gray-300 rounded-md" placeholder="0" />
            <span className="text-sm text-gray-600">m²</span>
          </div>
        </div>

        <div className="pt-4">
          <Label className="text-sm font-medium text-gray-700 block mb-2">Property Description</Label>
          <Textarea id="property-description" placeholder="Tell potential guests about your property, location, and what makes it special..." className="border border-gray-300 rounded-md h-32" />
          <p className="text-xs text-gray-500 mt-1">Minimum 100 characters recommended</p>
        </div>
      </div>
    </div>
  );
};

// Step 3: Pricing & Availability Component
const PricingAvailability = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <DollarSign className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Set your price and availability</h2>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="base-price" className="text-sm font-medium text-gray-700 block mb-2">Base Price (per night)</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
              $
            </span>
            <Input id="base-price" type="number" min="1" placeholder="0" className="rounded-none rounded-r-md" />
          </div>
          <p className="text-xs text-gray-500 mt-1">This will be your default price, you can set seasonal pricing later</p>
        </div>

        <div className="pt-2">
          <Label className="text-sm font-medium text-gray-700 block mb-2">Availability</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="min-stay" className="text-sm text-gray-600 block mb-1">Minimum stay (nights)</Label>
              <Input id="min-stay" type="number" min="1" className="border border-gray-300 rounded-md" placeholder="1" />
            </div>
            <div>
              <Label htmlFor="max-stay" className="text-sm text-gray-600 block mb-1">Maximum stay (nights)</Label>
              <Input id="max-stay" type="number" min="1" className="border border-gray-300 rounded-md" placeholder="30" />
            </div>
            <div>
              <Label htmlFor="notice-period" className="text-sm text-gray-600 block mb-1">Notice period (hours)</Label>
              <Input id="notice-period" type="number" min="0" className="border border-gray-300 rounded-md" placeholder="24" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Label className="text-sm font-medium text-gray-700 block mb-2">Check-in/Check-out times</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="check-in" className="text-sm text-gray-600 block mb-1">Check-in from</Label>
              <Input id="check-in" type="time" className="border border-gray-300 rounded-md" defaultValue="14:00" />
            </div>
            <div>
              <Label htmlFor="check-out" className="text-sm text-gray-600 block mb-1">Check-out before</Label>
              <Input id="check-out" type="time" className="border border-gray-300 rounded-md" defaultValue="11:00" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Label className="text-sm font-medium text-gray-700 block mb-2">Instantly bookable?</Label>
          <RadioGroup defaultValue="yes" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="instant-yes" value="yes" />
              <Label htmlFor="instant-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="instant-no" value="no" />
              <Label htmlFor="instant-no">Only upon approval</Label>
            </div>
          </RadioGroup>
          <p className="text-xs text-gray-500 mt-1">Instant booking allows guests to book immediately without waiting for your approval</p>
        </div>
      </div>
    </div>
  );
};

// Step 4: Photos & Amenities Component
const PhotosAmenities = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <Camera className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Add photos and amenities</h2>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 block mb-3">Upload Photos</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
            <Camera className="h-12 w-12 mx-auto text-gray-400" />
            <div className="mt-2">
              <p className="text-sm text-gray-600">Drag and drop your photos here, or</p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
                Browse Files
              </button>
              <p className="mt-1 text-xs text-gray-500">Maximum 20 photos. Must be JPG or PNG and at least 1024x768px</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Label className="text-sm font-medium text-gray-700 block mb-3">What amenities do you offer?</Label>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Popular amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3">
              {[
                'Wi-Fi', 'Air conditioning', 'Kitchen', 'Washing machine',
                'Free parking', 'Pool', 'TV', 'Heating',
                'Hot tub', 'Workspace'
              ].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox id={`amenity-${amenity}`} />
                  <Label htmlFor={`amenity-${amenity}`} className="text-sm">{amenity}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="font-medium text-gray-700">Safety amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3">
              {[
                'Smoke alarm', 'Carbon monoxide alarm', 'Fire extinguisher',
                'First aid kit', 'Security cameras'
              ].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox id={`safety-${amenity}`} />
                  <Label htmlFor={`safety-${amenity}`} className="text-sm">{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Label className="text-sm font-medium text-gray-700 block mb-2">House Rules</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pets" className="text-sm text-gray-600 block mb-1">Pets allowed?</Label>
              <RadioGroup defaultValue="no" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="pets-yes" value="yes" />
                  <Label htmlFor="pets-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="pets-no" value="no" />
                  <Label htmlFor="pets-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="smoking" className="text-sm text-gray-600 block mb-1">Smoking allowed?</Label>
              <RadioGroup defaultValue="no" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="smoking-yes" value="yes" />
                  <Label htmlFor="smoking-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="smoking-no" value="no" />
                  <Label htmlFor="smoking-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 5: Review & Submit Component
const ReviewSubmit = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <CheckCircle className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Review and submit your listing</h2>
      </div>

      <div className="space-y-5">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">Your property is almost ready to be listed on Booking.com! Please review all the information below to make sure everything is correct.</p>
        </div>

        {/* Basic Information Review */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Basic Information</h3>
              <Button variant="ghost" className="text-blue-600 text-sm h-auto p-1">Edit</Button>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <p className="text-sm text-gray-500">Property Type:</p>
              <p className="text-sm text-gray-700 col-span-2">Apartment</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <p className="text-sm text-gray-500">Property Name:</p>
              <p className="text-sm text-gray-700 col-span-2">Modern Downtown Apartment</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <p className="text-sm text-gray-500">Location:</p>
              <p className="text-sm text-gray-700 col-span-2">123 Main St, New York, NY 10001, USA</p>
            </div>
          </div>
        </div>

        {/* Property Details Review */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Property Details</h3>
              <Button variant="ghost" className="text-blue-600 text-sm h-auto p-1">Edit</Button>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <p className="text-sm text-gray-500">Bedrooms:</p>
              <p className="text-sm text-gray-700 col-span-2">2</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <p className="text-sm text-gray-500">Bathrooms:</p>
              <p className="text-sm text-gray-700 col-span-2">1</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <p className="text-sm text-gray-500">Size:</p>
              <p className="text-sm text-gray-700 col-span-2">75 m²</p>
            </div>
          </div>
        </div>

        {/* Pricing & Availability Review */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Pricing & Availability</h3>
              <Button variant="ghost" className="text-blue-600 text-sm h-auto p-1">Edit</Button>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <p className="text-sm text-gray-500">Base Price:</p>
              <p className="text-sm text-gray-700 col-span-2">$120 per night</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <p className="text-sm text-gray-500">Check-in/out:</p>
              <p className="text-sm text-gray-700 col-span-2">From 14:00 / Before 11:00</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <p className="text-sm text-gray-500">Instant Booking:</p>
              <p className="text-sm text-gray-700 col-span-2">Yes</p>
            </div>
          </div>
        </div>

        {/* Agreement Checkboxes */}
        <div className="space-y-3 pt-3">
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" className="mt-1" />
            <Label htmlFor="terms" className="text-sm">
              I confirm that I have read, understood and accept the <span className="text-blue-600">Terms & Conditions</span> and <span className="text-blue-600">Privacy Policy</span>.
            </Label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="info-correct" className="mt-1" />
            <Label htmlFor="info-correct" className="text-sm">
              I confirm that all the information provided is accurate and complete.
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingDialog;