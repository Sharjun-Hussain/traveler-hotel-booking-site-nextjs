// HostRegistrationWizard.jsx
import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Building,
  User,
  Key,
  MapPin,
  Phone,
  Mail,
  Home,
  Camera,
  DollarSign,
  Calendar,
  Star,
  Check,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

export default function HostRegistrationWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Business Info
    businessName: "",
    businessType: "",
    businessRegistrationNumber: "",

    // Personal Info
    isSriLankan: true,
    nicNumber: "",
    passportNumber: "",

    // Contact Info
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",

    // Property Details
    propertyName: "",
    propertyType: "",
    propertyDescription: "",

    // Address
    address: "",
    city: "",
    district: "",
    postalCode: "",
    country: "Sri Lanka",

    // Amenities
    amenities: {
      wifi: false,
      parking: false,
      pool: false,
      airConditioning: false,
      restaurant: false,
      spa: false,
      gym: false,
      beachAccess: false,
    },

    // Photos
    photos: [],

    // Pricing
    basePricePerNight: "",
    currency: "LKR",

    // Policies
    cancellationPolicy: "",
    checkInTime: "",
    checkOutTime: "",

    // Bank Info
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    branchCode: "",

    // Terms
    acceptTerms: false,
  });

  const totalSteps = 8;
  const progress = (step / totalSteps) * 100;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAmenityChange = (amenity) => {
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [amenity]: !formData.amenities[amenity],
      },
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - API call would go here
    console.log("Form submitted:", formData);
    // You would typically send this data to your backend
    setStep(step + 1); // Go to success screen
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 py-4 mx-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">
                Business Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Your business name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">
                Business Type <span className="text-red-500">*</span>
              </Label>
              <Select
                name="businessType"
                value={formData.businessType}
                onValueChange={(value) =>
                  handleSelectChange("businessType", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="guesthouse">Guesthouse</SelectItem>
                  <SelectItem value="bungalow">Bungalow</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="resort">Resort</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessRegistrationNumber">
                Business Registration Number{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="businessRegistrationNumber"
                name="businessRegistrationNumber"
                value={formData.businessRegistrationNumber}
                onChange={handleChange}
                placeholder="REG123456"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 py-4 mx-4">
            <div className="space-y-2">
              <Label>Nationality</Label>
              <RadioGroup
                value={formData.isSriLankan ? "sriLankan" : "foreigner"}
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    isSriLankan: value === "sriLankan",
                  });
                }}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sriLankan" id="sriLankan" />
                  <Label htmlFor="sriLankan">Sri Lankan Citizen</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="foreigner" id="foreigner" />
                  <Label htmlFor="foreigner">Foreign National</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.isSriLankan ? (
              <div className="space-y-2">
                <Label htmlFor="nicNumber">
                  NIC Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nicNumber"
                  name="nicNumber"
                  value={formData.nicNumber}
                  onChange={handleChange}
                  placeholder="123456789V"
                  required
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="passportNumber">
                  Passport Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="passportNumber"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  placeholder="AB1234567"
                  required
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 py-4 mx-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+94712345678"
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 py-4 mx-4">
            <div className="space-y-2">
              <Label htmlFor="propertyName">
                Property Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="propertyName"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
                placeholder="Dream Villa Resort"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">
                Property Type <span className="text-red-500">*</span>
              </Label>
              <Select
                name="propertyType"
                value={formData.propertyType}
                onValueChange={(value) =>
                  handleSelectChange("propertyType", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="bungalow">Bungalow</SelectItem>
                  <SelectItem value="cottage">Cottage</SelectItem>
                  <SelectItem value="guesthouse">Guesthouse</SelectItem>
                  <SelectItem value="boutique">Boutique Hotel</SelectItem>
                  <SelectItem value="resort">Resort</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyDescription">
                Property Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="propertyDescription"
                name="propertyDescription"
                value={formData.propertyDescription}
                onChange={handleChange}
                placeholder="Describe your property, its unique features, and what guests can expect..."
                required
                className="min-h-32"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4 py-4 mx-4">
            <div className="space-y-2">
              <Label htmlFor="address">
                Street Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Beach Road"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Colombo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">
                District <span className="text-red-500">*</span>
              </Label>
              <Select
                name="district"
                value={formData.district}
                onValueChange={(value) => handleSelectChange("district", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="colombo">Colombo</SelectItem>
                  <SelectItem value="galle">Galle</SelectItem>
                  <SelectItem value="kandy">Kandy</SelectItem>
                  <SelectItem value="matara">Matara</SelectItem>
                  <SelectItem value="jaffna">Jaffna</SelectItem>
                  <SelectItem value="batticaloa">Batticaloa</SelectItem>
                  <SelectItem value="ampara">Ampara</SelectItem>
                  <SelectItem value="trincomalee">Trincomalee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="00100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4 py-4 mx-4">
            <Label>Available Amenities</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wifi"
                  checked={formData.amenities.wifi}
                  onCheckedChange={() => handleAmenityChange("wifi")}
                />
                <Label htmlFor="wifi" className="font-normal">
                  Free WiFi
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="parking"
                  checked={formData.amenities.parking}
                  onCheckedChange={() => handleAmenityChange("parking")}
                />
                <Label htmlFor="parking" className="font-normal">
                  Parking
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pool"
                  checked={formData.amenities.pool}
                  onCheckedChange={() => handleAmenityChange("pool")}
                />
                <Label htmlFor="pool" className="font-normal">
                  Swimming Pool
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="airConditioning"
                  checked={formData.amenities.airConditioning}
                  onCheckedChange={() => handleAmenityChange("airConditioning")}
                />
                <Label htmlFor="airConditioning" className="font-normal">
                  Air Conditioning
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="restaurant"
                  checked={formData.amenities.restaurant}
                  onCheckedChange={() => handleAmenityChange("restaurant")}
                />
                <Label htmlFor="restaurant" className="font-normal">
                  Restaurant
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="spa"
                  checked={formData.amenities.spa}
                  onCheckedChange={() => handleAmenityChange("spa")}
                />
                <Label htmlFor="spa" className="font-normal">
                  Spa
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gym"
                  checked={formData.amenities.gym}
                  onCheckedChange={() => handleAmenityChange("gym")}
                />
                <Label htmlFor="gym" className="font-normal">
                  Gym/Fitness Center
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="beachAccess"
                  checked={formData.amenities.beachAccess}
                  onCheckedChange={() => handleAmenityChange("beachAccess")}
                />
                <Label htmlFor="beachAccess" className="font-normal">
                  Beach Access
                </Label>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Label>
                Property Photos <span className="text-red-500">*</span>
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                <Camera className="h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Drag and drop photos here or click to upload
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Add at least 5 photos (max 20)
                </p>
                <button onClick={() => alert()} size="sm" className="mt-4">
                  Upload Photos
                </button>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4 py-4 mx-4">
            <div className="space-y-2">
              <Label htmlFor="basePricePerNight">
                Base Price Per Night <span className="text-red-500">*</span>
              </Label>
              <div className="flex">
                <Select
                  name="currency"
                  value={formData.currency}
                  onValueChange={(value) =>
                    handleSelectChange("currency", value)
                  }
                  required
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="LKR" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LKR">LKR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="basePricePerNight"
                  name="basePricePerNight"
                  type="number"
                  value={formData.basePricePerNight}
                  onChange={handleChange}
                  placeholder="5000"
                  required
                  className="flex-1 ml-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cancellationPolicy">
                Cancellation Policy <span className="text-red-500">*</span>
              </Label>
              <Select
                name="cancellationPolicy"
                value={formData.cancellationPolicy}
                onValueChange={(value) =>
                  handleSelectChange("cancellationPolicy", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flexible">
                    Flexible - Full refund 1 day prior to arrival
                  </SelectItem>
                  <SelectItem value="moderate">
                    Moderate - Full refund 5 days prior to arrival
                  </SelectItem>
                  <SelectItem value="strict">
                    Strict - 50% refund 7 days prior to arrival
                  </SelectItem>
                  <SelectItem value="nonRefundable">Non-refundable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkInTime">
                  Check-in Time <span className="text-red-500">*</span>
                </Label>
                <Select
                  name="checkInTime"
                  value={formData.checkInTime}
                  onValueChange={(value) =>
                    handleSelectChange("checkInTime", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkOutTime">
                  Check-out Time <span className="text-red-500">*</span>
                </Label>
                <Select
                  name="checkOutTime"
                  value={formData.checkOutTime}
                  onValueChange={(value) =>
                    handleSelectChange("checkOutTime", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Label>Bank Details for Payments</Label>
              <div className="space-y-2">
                <Label htmlFor="bankName">
                  Bank Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Bank of Ceylon"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">
                  Account Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="1234567890"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountHolderName">
                  Account Holder Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="accountHolderName"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branchCode">Branch Code</Label>
                <Input
                  id="branchCode"
                  name="branchCode"
                  value={formData.branchCode}
                  onChange={handleChange}
                  placeholder="001"
                />
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4 py-4 mx-4">
            <div className="p-4 border border-blue-100 bg-blue-50 rounded-md">
              <h3 className="font-medium text-blue-800">
                Review your information
              </h3>
              <p className="text-sm text-blue-600">
                Please verify all details before submitting
              </p>
            </div>

            <Card>
              <CardHeader className="bg-slate-50">
                <CardTitle className="text-lg">Business Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="font-medium">Business Name:</p>
                  <p>{formData.businessName || "-"}</p>
                  <p className="font-medium">Business Type:</p>
                  <p>{formData.businessType || "-"}</p>
                  <p className="font-medium">Registration Number:</p>
                  <p>{formData.businessRegistrationNumber || "-"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-slate-50">
                <CardTitle className="text-lg">Property Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="font-medium">Property Name:</p>
                  <p>{formData.propertyName || "-"}</p>
                  <p className="font-medium">Property Type:</p>
                  <p>{formData.propertyType || "-"}</p>
                  <p className="font-medium">Address:</p>
                  <p>
                    {formData.address}, {formData.city}, {formData.district},{" "}
                    {formData.country}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-slate-50">
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="font-medium">Email:</p>
                  <p>{formData.email || "-"}</p>
                  <p className="font-medium">Phone:</p>
                  <p>{formData.phoneNumber || "-"}</p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => {
                    setFormData({
                      ...formData,
                      acceptTerms: checked === true,
                    });
                  }}
                  required
                />
                <Label htmlFor="acceptTerms" className="font-normal text-sm">
                  I agree to the{" "}
                  <span className="text-blue-600 underline">
                    Terms and Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 underline">
                    Privacy Policy
                  </span>
                </Label>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-center">
              Registration Successful!
            </h2>
            <p className="text-center text-gray-600">
              Thank you for registering your property with Dream Homes. Our team
              will review your submission and contact you within 48 hours.
            </p>
            <Button className="mt-6">Go to Dashboard</Button>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Business Information",
    "Personal Information",
    "Contact Information",
    "Property Details",
    "Location",
    "Amenities & Photos",
    "Pricing & Policies",
    "Review & Submit",
    "Success",
  ];

  const stepIcons = [
    <Building key="business" size={18} />,
    <User key="personal" size={18} />,
    <Mail key="contact" size={18} />,
    <Home key="property" size={18} />,
    <MapPin key="location" size={18} />,
    <Camera key="amenities" size={18} />,
    <DollarSign key="pricing" size={18} />,
    <Star key="review" size={18} />,
    <Check key="success" size={18} />,
  ];

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-gradient-to-r from-j-primary to-j-secondary  text-white px-6 py-2 rounded-md font-medium flex items-center gap-2">
            <Building size={18} />
            List Your Property
          </Button>
        </SheetTrigger>
        <SheetContent
          className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto"
          side="right"
        >
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              {stepIcons[step - 1]}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {stepTitles[step - 1]}
              </span>
            </SheetTitle>
            <SheetDescription className="text-center">
              {step < 9 && `Step ${step} of ${totalSteps}`}
            </SheetDescription>
          </SheetHeader>

          {step < 9 && (
            <div className="container w-2/3 mx-auto">
              <Progress value={progress} className="h-2 mt-2" />
            </div>
          )}

          <form onSubmit={step === 8 ? handleSubmit : undefined}>
            <div className="mt-4">{renderStep()}</div>
            <SheetFooter className="flex flex-row  justify-between gap-2 pt-4 border-t mt-4">
              {step > 1 && step < 9 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft size={16} /> Previous
                </Button>
              )}
              {step < 8 && (
                <Button type="button" className="ml-auto" onClick={nextStep}>
                  Next <ChevronRight size={16} />
                </Button>
              )}
              {step === 8 && (
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-j-primary to-emerald-700 hover:from-green-700 hover:to-emerald-800 ml-auto"
                  disabled={!formData.acceptTerms}
                >
                  Submit Registration
                </Button>
              )}
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
