"use client"
import { useState } from 'react';
import { 
  Home, 
  MapPin, 
  Bed, 
  Bath, 
  Users, 
  Ruler, 
  DollarSign, 
  Image, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Wifi,
  Tv,
  AirVent,
  KeyIcon,
  ParkingCircle,
  Dumbbell,
  Snowflake,
  Coffee,
  Waves
} from 'lucide-react';

const PropertyListingWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    propertyType: '',
    title: '',
    description: '',

    // Step 2: Location
    address: '',
    city: '',
    country: '',
    postalCode: '',

    // Step 3: Property Details
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    squareMeters: 50,

    // Step 4: Pricing
    pricePerNight: '',
    cleaningFee: '',
    minimumStay: 1,

    // Step 5: Amenities
    amenities: [],

    // Step 6: Photos
    images: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Property Types
  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'villa', label: 'Villa' },
    { value: 'cabin', label: 'Cabin' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'cottage', label: 'Cottage' },
    { value: 'beach-house', label: 'Beach House' },
  ];

  // Amenities
  const amenitiesList = [
    { id: 'wifi', label: 'Wi-Fi', icon: <Wifi className="h-5 w-5" /> },
    { id: 'tv', label: 'TV', icon: <Tv className="h-5 w-5" /> },
    { id: 'ac', label: 'Air Conditioning', icon: <AirVent className="h-5 w-5" /> },
    { id: 'kitchen', label: 'Kitchen', icon: <KeyIcon className="h-5 w-5" /> },
    { id: 'parking', label: 'Free Parking', icon: <ParkingCircle className="h-5 w-5" /> },
    { id: 'gym', label: 'Gym', icon: <Dumbbell className="h-5 w-5" /> },
    { id: 'pool', label: 'Swimming Pool', icon: <Waves className="h-5 w-5" /> },
    { id: 'coffee', label: 'Coffee Maker', icon: <Coffee className="h-5 w-5" /> },
  ];

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle Amenity Selection
  const handleAmenityChange = (amenityId) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenityId)
        ? formData.amenities.filter(id => id !== amenityId)
        : [...formData.amenities, amenityId]
    });
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    });
  };

  // Validate Current Step
  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
      if (!formData.title) newErrors.title = 'Title is required';
      if (!formData.description) newErrors.description = 'Description is required';
    }

    if (step === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.country) newErrors.country = 'Country is required';
    }

    if (step === 4 && !formData.pricePerNight) {
      newErrors.pricePerNight = 'Price per night is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Next Step
  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  // Previous Step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    }
  };

  // Progress Bar
  const progressPercentage = (step / 6) * 100;

  // If submitted, show success message
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Property is Listed!</h1>
          <p className="text-gray-600 mb-6">
            Your property has been successfully submitted for review. You'll receive a confirmation email shortly.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition"
          >
            List Another Property
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Form Wizard */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Home className="h-6 w-6 text-blue-600" />
                Basic Information
              </h2>
              
              <div>
                <label className="block text-gray-700 mb-2">Property Type*</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.propertyType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Property Type</option>
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Beautiful Beachfront Villa"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your property in detail..."
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                Location Details
              </h2>
              
              <div>
                <label className="block text-gray-700 mb-2">Address*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street and number"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">City*</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Country*</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal/ZIP Code"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 3: Property Details */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Home className="h-6 w-6 text-blue-600" />
                Property Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Bed className="h-6 w-6 text-blue-600" />
                  <div>
                    <label className="block text-gray-700 mb-1">Bedrooms</label>
                    <input
                      type="number"
                      name="bedrooms"
                      min="1"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Bath className="h-6 w-6 text-blue-600" />
                  <div>
                    <label className="block text-gray-700 mb-1">Bathrooms</label>
                    <input
                      type="number"
                      name="bathrooms"
                      min="1"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                  <div>
                    <label className="block text-gray-700 mb-1">Max Guests</label>
                    <input
                      type="number"
                      name="guests"
                      min="1"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Ruler className="h-6 w-6 text-blue-600" />
                  <div>
                    <label className="block text-gray-700 mb-1">Area (m²)</label>
                    <input
                      type="number"
                      name="squareMeters"
                      min="10"
                      value={formData.squareMeters}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Pricing */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-blue-600" />
                Pricing
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Price per night ($)*</label>
                  <input
                    type="number"
                    name="pricePerNight"
                    min="1"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    placeholder="e.g., 100"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.pricePerNight ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.pricePerNight && <p className="text-red-500 text-sm mt-1">{errors.pricePerNight}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Cleaning fee ($)</label>
                  <input
                    type="number"
                    name="cleaningFee"
                    min="0"
                    value={formData.cleaningFee}
                    onChange={handleChange}
                    placeholder="e.g., 30"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Minimum stay (nights)</label>
                <input
                  type="number"
                  name="minimumStay"
                  min="1"
                  value={formData.minimumStay}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 5: Amenities */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                Amenities
              </h2>
              
              <p className="text-gray-600">Select the amenities your property offers:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesList.map((amenity) => (
                  <div
                    key={amenity.id}
                    onClick={() => handleAmenityChange(amenity.id)}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${formData.amenities.includes(amenity.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                  >
                    {amenity.icon}
                    <span>{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Photos */}
          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Image className="h-6 w-6 text-blue-600" />
                Photos
              </h2>
              
              <p className="text-gray-600">Upload high-quality photos of your property (min. 5 photos).</p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="property-images"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="property-images"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <Image className="h-10 w-10 text-gray-400" />
                  <p className="text-gray-600">Click to upload or drag & drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG, JPEG (max 10MB each)</p>
                </label>
              </div>

              {/* Preview Uploaded Images */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Property ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Next
                <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                Submit Listing
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyListingWizard;