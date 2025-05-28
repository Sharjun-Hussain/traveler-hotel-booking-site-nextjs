// HostRegistrationWizard.jsx
import { useState } from "react";
import {
  Building,
  User,
  Mail,
  MapPin,
  Home,
  Camera,
  DollarSign,
  Check,
  ChevronRight,
  ChevronLeft,
  Phone,
  ShieldCheck,
  AlertCircle,
  Clock,
  Loader2
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function HostRegistrationWizard() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [isSendingEmailCode, setIsSendingEmailCode] = useState(false);
  const [isSendingPhoneCode, setIsSendingPhoneCode] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Verification
    email: '',
    phoneNumber: '',
    password: undefined,
    identityDocument: 'nic',
    nicFront: null,
    nicBack: null,
    nicNumber: undefined,
    passportNumber: undefined,
    passportImage: null,
    selfieImage: null,

    // Business Info
    businessName: '',
    businessType: '',
    businessRegistrationNumber: '',
    businessRegistrationDoc: null,

    // Property Info
    // propertyName: '',
    // propertyType: '',
    // propertyDescription: '',
    // propertyPhotos: [],

    // Address
    address: '',
    city: '',
    district: '',
    postalCode: '',
    country: 'Sri Lanka',

    // Pricing
    // basePricePerNight: '',
    // currency: 'LKR',
    // cancellationPolicy: '',

    // Terms
    acceptTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (fieldName, file) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const handlePropertyPhotosUpload = (files) => {
    setFormData(prev => ({
      ...prev,
      propertyPhotos: [...prev.propertyPhotos, ...files]
    }));
  };

  const removePropertyPhoto = (index) => {
    const updatedPhotos = [...formData.propertyPhotos];
    updatedPhotos.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      propertyPhotos: updatedPhotos
    }));
  };

  const sendEmailVerificationCode = async () => {
    setIsSendingEmailCode(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Verification code sent to your email");
    } catch (error) {
      toast.error("Failed to send verification code");
    } finally {
      setIsSendingEmailCode(false);
    }
  };

  const sendPhoneVerificationCode = async () => {
    setIsSendingPhoneCode(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Verification code sent to your phone");
    } catch (error) {
      toast.error("Failed to send verification code");
    } finally {
      setIsSendingPhoneCode(false);
    }
  };

  const verifyEmailCode = async () => {
    setIsVerifyingEmail(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setEmailVerified(true);
      toast.success("Email verified successfully!");
    } catch (error) {
      toast.error("Invalid verification code");
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const verifyPhoneCode = async () => {
    setIsVerifyingPhone(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setPhoneVerified(true);
      toast.success("Phone number verified successfully!");
    } catch (error) {
      toast.error("Invalid verification code");
    } finally {
      setIsVerifyingPhone(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!emailVerified || !phoneVerified)) {
      toast.warning("Please verify your email and phone number first");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // // Append all form data
      // for (const key in formData) {
      //   if (formData[key] !== null && formData[key] !== undefined) {
      //     if (Array.isArray(formData[key])) {
      //       formData[key].forEach((file, index) => {
      //         formDataToSend.append(`${key}[${index}]`, file);
      //       });
      //     } else if (formData[key] instanceof File) {
      //       formDataToSend.append(key, formData[key]);
      //     } else {
      //       formDataToSend.append(key, formData[key]);
      //     }
      //   }
      // }

      // const response = await fetch('https://api.slvista.softxpertz.lk/api/v1/merchants/register', {
      //   method: 'POST',
      //   credentials: "include",
      //   body: formDataToSend,
      //   headers: {
      //     'Accept': 'application/json',
      //   },
      // });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/merchants/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName: formData.businessName,
          businessRegistrationNumber: formData.businessRegistrationNumber,
          businessType: formData.businessType,
          email: formData.email,
          password: formData.password,
          isSriLankan: true,
          nicNumber: formData.nicNumber,
          passportNumber: formData.passportNumber ?? Math.floor(100000000 + Math.random() * 900000000),
          address: formData.address,
          city: formData.city,
          country: formData.country,
          phoneNumber: formData.phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      console.log("API Response:", result);

      setStep(step + 1); // Move to success step
      toast.success("Registration submitted successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 py-4 px-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                Identity Verification
              </h3>
              <p className="text-sm text-gray-600">
                For security purposes, we need to verify your identity before you can list your property.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email Verification */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-base">Email Verification</CardTitle>
                    </div>
                    {emailVerified ? (
                      <Badge variant="success" className="flex items-center gap-1">
                        <Check className="h-3 w-3" /> Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      disabled={emailVerified}
                    />
                  </div>

                  {!emailVerified && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Verification code"
                          value={emailCode}
                          onChange={(e) => setEmailCode(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={sendEmailVerificationCode}
                          disabled={isSendingEmailCode}
                        >
                          {isSendingEmailCode ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Send Code"
                          )}
                        </Button>
                      </div>
                      <Button
                        type="button"
                        onClick={verifyEmailCode}
                        disabled={!emailCode || isVerifyingEmail}
                        className="w-full"
                      >
                        {isVerifyingEmail ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Verify Email"
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Phone Verification */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-base">Phone Verification</CardTitle>
                    </div>
                    {phoneVerified ? (
                      <Badge variant="success" className="flex items-center gap-1">
                        <Check className="h-3 w-3" /> Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+94712345678"
                      disabled={phoneVerified}
                    />
                  </div>

                  {!phoneVerified && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Verification code"
                          value={phoneCode}
                          onChange={(e) => setPhoneCode(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={sendPhoneVerificationCode}
                          disabled={isSendingPhoneCode}
                        >
                          {isSendingPhoneCode ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Send Code"
                          )}
                        </Button>
                      </div>
                      <Button
                        type="button"
                        onClick={verifyPhoneCode}
                        disabled={!phoneCode || isVerifyingPhone}
                        className="w-full"
                      >
                        {isVerifyingPhone ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Verify Phone"
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="businessName">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">
                  NIC <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nicNumber"
                  name="nicNumber"
                  value={formData.nicNumber}
                  onChange={handleInputChange}
                  placeholder="Your NIC"
                />
              </div>



              {/* Document Upload */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-base">Identity Verification</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    defaultValue="nic"
                    className="flex gap-4"
                    onValueChange={(value) => handleSelectChange("identityDocument", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nic" id="nic" />
                      <Label htmlFor="nic">NIC</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="passport" id="passport" />
                      <Label htmlFor="passport">Passport</Label>
                    </div>
                  </RadioGroup>

                  {formData.identityDocument === "nic" ? (
                    <>
                      <div className="space-y-2">
                        <Label>NIC Front Image</Label>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16 border">
                            {formData.nicFront ? (
                              <AvatarImage src={URL.createObjectURL(formData.nicFront)} />
                            ) : (
                              <AvatarFallback className="bg-gray-100">Front</AvatarFallback>
                            )}
                          </Avatar>
                          <Input
                            type="file"
                            id="nicFront"
                            accept="image/*"
                            onChange={(e) => handleFileUpload("nicFront", e.target.files[0])}
                            className="hidden"
                          />
                          <Label htmlFor="nicFront" className="cursor-pointer">
                            <Button variant="outline" size="sm" asChild>
                              <span>Upload</span>
                            </Button>
                          </Label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>NIC Back Image</Label>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16 border">
                            {formData.nicBack ? (
                              <AvatarImage src={URL.createObjectURL(formData.nicBack)} />
                            ) : (
                              <AvatarFallback className="bg-gray-100">Back</AvatarFallback>
                            )}
                          </Avatar>
                          <Input
                            type="file"
                            id="nicBack"
                            accept="image/*"
                            onChange={(e) => handleFileUpload("nicBack", e.target.files[0])}
                            className="hidden"
                          />
                          <Label htmlFor="nicBack" className="cursor-pointer">
                            <Button variant="outline" size="sm" asChild>
                              <span>Upload</span>
                            </Button>
                          </Label>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Label>Passport Image</Label>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border">
                          {formData.passportImage ? (
                            <AvatarImage src={URL.createObjectURL(formData.passportImage)} />
                          ) : (
                            <AvatarFallback className="bg-gray-100">Passport</AvatarFallback>
                          )}
                        </Avatar>
                        <Input
                          type="file"
                          id="passportImage"
                          accept="image/*"
                          onChange={(e) => handleFileUpload("passportImage", e.target.files[0])}
                          className="hidden"
                        />
                        <Label htmlFor="passportImage" className="cursor-pointer">
                          <Button variant="outline" size="sm" asChild>
                            <span>Upload</span>
                          </Button>
                        </Label>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Selfie with Document</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border">
                        {formData.selfieImage ? (
                          <AvatarImage src={URL.createObjectURL(formData.selfieImage)} />
                        ) : (
                          <AvatarFallback className="bg-gray-100">Selfie</AvatarFallback>
                        )}
                      </Avatar>
                      <Input
                        type="file"
                        id="selfieImage"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("selfieImage", e.target.files[0])}
                        className="hidden"
                      />
                      <Label htmlFor="selfieImage" className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>Upload</span>
                        </Button>
                      </Label>
                    </div>
                    <p className="text-xs text-gray-500">
                      Take a selfie while holding your ID document
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-md bg-blue-50 p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Verification Process</h4>
                  <p className="text-sm text-blue-600 mt-1">
                    Your documents will be reviewed within 24-48 hours. You'll receive a notification once your identity is verified.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 py-4 px-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Business Information</h3>
              <p className="text-sm text-gray-600">
                Tell us about your business
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">
                  Business Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Your business name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">
                  Business Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("businessType", value)}
                  value={formData.businessType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="homestay">Apartment</SelectItem>

                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessRegistrationNumber">
                  Business Registration Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="businessRegistrationNumber"
                  name="businessRegistrationNumber"
                  value={formData.businessRegistrationNumber}
                  onChange={handleInputChange}
                  placeholder="REG123456"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Business Registration Document <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border">
                    {formData.businessRegistrationDoc ? (
                      <AvatarImage src={URL.createObjectURL(formData.businessRegistrationDoc)} />
                    ) : (
                      <AvatarFallback className="bg-gray-100">Doc</AvatarFallback>
                    )}
                  </Avatar>
                  <Input
                    type="file"
                    id="businessRegistrationDoc"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload("businessRegistrationDoc", e.target.files[0])}
                    className="hidden"
                  />
                  <Label htmlFor="businessRegistrationDoc" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>Upload</span>
                    </Button>
                  </Label>
                </div>
                <p className="text-xs text-gray-500">
                  Upload a clear scan of your business registration document (JPG, PNG or PDF)
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 py-4 px-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Location</h3>
              <p className="text-sm text-gray-600">
                Where is you located?
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">
                  Street Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Beach Road"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Colombo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">
                    District <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("district", value)}
                    value={formData.district}
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
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="00100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cancellationPolicy">
                  Cancellation Policy <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("cancellationPolicy", value)}
                  value={formData.cancellationPolicy}
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
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 py-4 px-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Review & Submit</h3>
              <p className="text-sm text-gray-600">
                Please verify all details before submitting
              </p>
            </div>

            <div className="rounded-md bg-blue-50 p-4 flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800">Verification Process</h4>
                <p className="text-sm text-blue-600 mt-1">
                  Your property listing will be reviewed within 24-48 hours. You'll receive a notification once it's approved.
                </p>
              </div>
            </div>

            <div className="space-y-4">
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
                  <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="font-medium">Address:</p>
                    <p>
                      {formData.address}, {formData.city}, {formData.district},{" "}
                      {formData.country}
                    </p>
                    <p className="font-medium">Postal Code:</p>
                    <p>{formData.postalCode || "-"}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2 pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleSelectChange("acceptTerms", checked)}
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
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-center justify-center py-12 px-4 space-y-6">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Registration Successful!</h2>
              <p className="text-gray-600">
                Thank you for registering your property with us. Our team
                will review your submission and contact you within 48 hours.
              </p>
            </div>
            <div className="rounded-md bg-blue-50 p-4 w-full max-w-md">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">What's Next?</h4>
                  <ul className="text-sm text-blue-600 mt-1 list-disc pl-5 space-y-1">
                    <li>Verification of your documents (24-48 hours)</li>
                    <li>Property quality check</li>
                    <li>Onboarding call if needed</li>
                  </ul>
                </div>
              </div>
            </div>
            <Button className="mt-4 w-full max-w-md">Go to Dashboard</Button>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Identity Verification",
    "Business Information",
    "Location",
    "Review & Submit",
    "Success",
  ];

  const stepIcons = [
    <ShieldCheck key="verification" size={18} />,
    <Building key="business" size={18} />,
    <MapPin key="location" size={18} />,
    <Check key="review" size={18} />,
    <Check key="success" size={18} />,
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="px-6 py-2 rounded-lg font-medium flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md">
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
            {step < 5 && `Step ${step} of ${totalSteps}`}
          </SheetDescription>
        </SheetHeader>

        {step < 5 && (
          <div className="container w-2/3 mx-auto">
            <Progress value={progress} className="h-2 mt-2" />
          </div>
        )}

        <form onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()}>
          <div className="mt-4">{renderStep()}</div>

          {step < 5 && (
            <SheetFooter className="flex flex-row justify-between gap-2 pt-4 border-t mt-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft size={16} /> Previous
                </Button>
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  className="ml-auto"
                  onClick={nextStep}
                  disabled={step === 1 && (!emailVerified || !phoneVerified)}
                >
                  Next <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={isSubmitting || !formData.acceptTerms}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </Button>
              )}
            </SheetFooter>
          )}
        </form>
      </SheetContent>
    </Sheet>
  );
}