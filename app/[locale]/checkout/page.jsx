"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CheckCheck,
  CreditCard,
  Currency,
  Globe,
  Lock,
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  Star,
  User,
  Clock,
  AlertCircle,
} from "lucide-react";
import StepIndicator from "./components/StepIndicator";
import SuccessModal from "./components/SuccesModel";

// Import the stepIndicator component

export default function CheckoutWizard({ hotelData, bookingParams }) {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // We'll assume these values would come from URL params or props
  // For this example, using hardcoded values based on the shared data
  const bookingDetails = {
    hotelName: hotelData?.name || "Serene Bay Resort & Spa",
    location: hotelData?.location || "Galle, Sri Lanka",
    checkIn: bookingParams?.checkIn || "2025-03-21",
    checkOut: bookingParams?.checkOut || "2025-03-28",
    guests: bookingParams?.guests || 2,
    roomType: bookingParams?.roomType || "Deluxe Ocean View",
    price: bookingParams?.price || 175,
    nights: bookingParams?.nights || 7,
  };

  // Calculate derived values
  const subtotal = bookingDetails.price * bookingDetails.nights;
  const tax = subtotal * 0.12; // Assuming 12% tax
  const totalPrice = subtotal + tax;

  // Form steps
  const steps = [
    { title: "Guest Information", icon: <User size={20} /> },
    { title: "Booking Details", icon: <Calendar size={20} /> },
    { title: "Payment", icon: <CreditCard size={20} /> },
    { title: "Review & Confirm", icon: <CheckCheck size={20} /> },
  ];

  // Set up React Hook Form
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      specialRequests: "",
      notifyPromotions: false,
      terms: false,
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: "",
      billingAddress: "",
      city: "",
      zipCode: "",
      country: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
      console.log("Form data submitted:", data);
    }, 2000);
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const fieldsToValidate = getFieldsForStep(currentStep);

      form.trigger(fieldsToValidate).then((isValid) => {
        if (isValid) {
          setCurrentStep(currentStep + 1);
          window.scrollTo(0, 0);
        }
      });
    } else {
      onSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Determine which fields to validate for each step
  const getFieldsForStep = (step) => {
    switch (step) {
      case 0:
        return ["firstName", "lastName", "email", "phoneNumber"];
      case 1:
        return ["specialRequests"];
      case 2:
        switch (paymentMethod) {
          case "credit-card":
            return ["cardNumber", "expiryDate", "cvv", "nameOnCard"];
          default:
            return [];
        }
      case 3:
        return ["terms"];
      default:
        return [];
    }
  };

  // Format dates for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {bookingDetails.hotelName} • {bookingDetails.location}
        </p>

        {/* Step Indicator */}
        <div className="mb-8 px-4">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            onChange={(step) => {
              // Only allow going back or to completed steps
              if (step < currentStep) {
                setCurrentStep(step);
              }
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Form Wizard */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form>
                {/* Step 1: Guest Information */}
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <User className="mr-2 h-5 w-5" />
                          Guest Information
                        </CardTitle>
                        <CardDescription>
                          Please enter the lead guest's details for this
                          reservation
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            rules={{ required: "First name is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter first name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="lastName"
                            rules={{ required: "Last name is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter last name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            rules={{
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                              },
                            }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="email@example.com"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Booking confirmation will be sent here
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phoneNumber"
                            rules={{ required: "Phone number is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input
                                    type="tel"
                                    placeholder="+1 (123) 456-7890"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="notifyPromotions"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  id="notifications"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor="notifications"
                                className="font-normal"
                              >
                                Keep me updated on special offers and promotions
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 2: Booking Details */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5" />
                          Booking Details
                        </CardTitle>
                        <CardDescription>
                          Review and confirm your stay details
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Check-in
                              </p>
                              <p className="font-medium">
                                {formatDate(bookingDetails.checkIn)}
                              </p>
                              <p className="text-sm text-gray-500">
                                After 2:00 PM
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Check-out
                              </p>
                              <p className="font-medium">
                                {formatDate(bookingDetails.checkOut)}
                              </p>
                              <p className="text-sm text-gray-500">
                                Before 11:00 AM
                              </p>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Room Type
                            </p>
                            <p className="font-medium">
                              {bookingDetails.roomType}
                            </p>
                            <p className="text-sm text-gray-500">
                              {bookingDetails.guests} Guest
                              {bookingDetails.guests > 1 ? "s" : ""} •{" "}
                              {bookingDetails.nights} Night
                              {bookingDetails.nights > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="specialRequests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Special Requests (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please let us know if you have any special requests or requirements"
                                  className="min-h-24"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                We'll do our best to accommodate your requests
                                but cannot guarantee them
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CreditCard className="mr-2 h-5 w-5" />
                          Payment Method
                        </CardTitle>
                        <CardDescription>
                          Choose your preferred payment method
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Tabs
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-3 mb-6">
                            <TabsTrigger value="credit-card">
                              Credit Card
                            </TabsTrigger>
                            <TabsTrigger value="paypal">PayPal</TabsTrigger>
                            <TabsTrigger value="bank">
                              Bank Transfer
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="credit-card">
                            <div className="space-y-4">
                              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6 flex items-center">
                                <Shield className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                  Your payment information is encrypted and
                                  secure
                                </p>
                              </div>

                              <FormField
                                control={form.control}
                                name="cardNumber"
                                rules={{ required: "Card number is required" }}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="1234 5678 9012 3456"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="expiryDate"
                                  rules={{
                                    required: "Expiry date is required",
                                  }}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Expiry Date</FormLabel>
                                      <FormControl>
                                        <Input placeholder="MM/YY" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="cvv"
                                  rules={{ required: "CVV is required" }}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>CVV</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="123"
                                          type="password"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <FormField
                                control={form.control}
                                name="nameOnCard"
                                rules={{ required: "Name on card is required" }}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Name on Card</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="John Doe"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <Separator className="my-6" />

                              <div className="space-y-4">
                                <h3 className="font-medium">Billing Address</h3>
                                <FormField
                                  control={form.control}
                                  name="billingAddress"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Address</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="123 Main St"
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                  <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="New York"
                                            {...field}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="zipCode"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>ZIP Code</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="10001"
                                            {...field}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <FormField
                                  control={form.control}
                                  name="country"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Country</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="United States"
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="paypal">
                            <div className="text-center py-8">
                              <Currency className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                              <h3 className="font-medium text-lg mb-2">
                                Pay with PayPal
                              </h3>
                              <p className="text-gray-500 dark:text-gray-400 mb-6">
                                You will be redirected to PayPal to complete
                                your payment securely.
                              </p>
                              <Button
                                type="button"
                                className="w-full md:w-auto px-8"
                              >
                                Continue with PayPal
                              </Button>
                            </div>
                          </TabsContent>

                          <TabsContent value="bank">
                            <div className="py-2">
                              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                                <h3 className="font-medium text-lg mb-4">
                                  Bank Transfer Details
                                </h3>
                                <div className="space-y-3">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <p className="text-gray-500 dark:text-gray-400">
                                      Bank Name
                                    </p>
                                    <p>International Bank of Sri Lanka</p>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <p className="text-gray-500 dark:text-gray-400">
                                      Account Name
                                    </p>
                                    <p>Serene Bay Resort & Spa</p>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <p className="text-gray-500 dark:text-gray-400">
                                      Account Number
                                    </p>
                                    <p>1234567890</p>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <p className="text-gray-500 dark:text-gray-400">
                                      SWIFT/BIC
                                    </p>
                                    <p>IBSLKL123</p>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <p className="text-gray-500 dark:text-gray-400">
                                      Reference
                                    </p>
                                    <p className="font-medium">
                                      BOOK-{Math.floor(Math.random() * 100000)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-amber-700 dark:text-amber-300">
                                  Please note that your booking will only be
                                  confirmed once payment is received. This may
                                  take 1-3 business days depending on your bank.
                                </p>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 4: Review & Confirm */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CheckCheck className="mr-2 h-5 w-5" />
                          Review & Confirm
                        </CardTitle>
                        <CardDescription>
                          Please review your booking details before confirming
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Guest Information */}
                          <div>
                            <h3 className="font-medium text-lg mb-3 flex items-center">
                              <User className="mr-2 h-4 w-4" />
                              Guest Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Name
                                </p>
                                <p className="font-medium">
                                  {form.getValues("firstName")}{" "}
                                  {form.getValues("lastName")}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Email
                                </p>
                                <p className="font-medium">
                                  {form.getValues("email")}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Phone
                                </p>
                                <p className="font-medium">
                                  {form.getValues("phoneNumber")}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Booking Details */}
                          <div>
                            <h3 className="font-medium text-lg mb-3 flex items-center">
                              <Calendar className="mr-2 h-4 w-4" />
                              Booking Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Check-in
                                </p>
                                <p className="font-medium">
                                  {formatDate(bookingDetails.checkIn)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  After 2:00 PM
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Check-out
                                </p>
                                <p className="font-medium">
                                  {formatDate(bookingDetails.checkOut)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Before 11:00 AM
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Room Type
                                </p>
                                <p className="font-medium">
                                  {bookingDetails.roomType}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Guests
                                </p>
                                <p className="font-medium">
                                  {bookingDetails.guests} Guest
                                  {bookingDetails.guests > 1 ? "s" : ""}
                                </p>
                              </div>
                            </div>

                            {form.getValues("specialRequests") && (
                              <div className="mt-4">
                                <p className="text-gray-500 dark:text-gray-400">
                                  Special Requests
                                </p>
                                <p className="text-sm mt-1">
                                  {form.getValues("specialRequests")}
                                </p>
                              </div>
                            )}
                          </div>

                          <Separator />

                          {/* Payment Details */}
                          <div>
                            <h3 className="font-medium text-lg mb-3 flex items-center">
                              <CreditCard className="mr-2 h-4 w-4" />
                              Payment Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Payment Method
                                </p>
                                <p className="font-medium capitalize">
                                  {paymentMethod.replace("-", " ")}
                                </p>
                              </div>
                              {paymentMethod === "credit-card" && (
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">
                                    Card Number
                                  </p>
                                  <p className="font-medium">
                                    •••• •••• ••••{" "}
                                    {form.getValues("cardNumber").slice(-4)}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-6">
                            <FormField
                              control={form.control}
                              name="terms"
                              rules={{
                                required:
                                  "You must agree to the terms and conditions",
                              }}
                              render={({ field }) => (
                                <FormItem className="flex items-start space-x-3">
                                  <FormControl>
                                    <Checkbox
                                      id="terms"
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div>
                                    <FormLabel
                                      htmlFor="terms"
                                      className="font-normal"
                                    >
                                      I agree to the{" "}
                                      <a
                                        href="/terms"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                      >
                                        Terms & Conditions
                                      </a>{" "}
                                      and{" "}
                                      <a
                                        href="/privacy"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                      >
                                        Privacy Policy
                                      </a>
                                    </FormLabel>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="w-32"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={isLoading}
                    className="w-32"
                  >
                    {isLoading ? (
                      "Processing..."
                    ) : currentStep === steps.length - 1 ? (
                      "Confirm"
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Right side - Booking Summary */}
          <div>
            <div className="sticky top-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="text-gray-500 dark:text-gray-400">
                        Room Type
                      </p>
                      <p className="font-medium">{bookingDetails.roomType}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-500 dark:text-gray-400">
                        Check-in
                      </p>
                      <p className="font-medium">
                        {formatDate(bookingDetails.checkIn)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-500 dark:text-gray-400">
                        Check-out
                      </p>
                      <p className="font-medium">
                        {formatDate(bookingDetails.checkOut)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-500 dark:text-gray-400">Guests</p>
                      <p className="font-medium">
                        {bookingDetails.guests} Guest
                        {bookingDetails.guests > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-500 dark:text-gray-400">Nights</p>
                      <p className="font-medium">
                        {bookingDetails.nights} Night
                        {bookingDetails.nights > 1 ? "s" : ""}
                      </p>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <p className="text-gray-500 dark:text-gray-400">
                        Subtotal
                      </p>
                      <p className="font-medium">${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-500 dark:text-gray-400">
                        Tax (12%)
                      </p>
                      <p className="font-medium">${tax.toFixed(2)}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <p className="text-gray-500 dark:text-gray-400">Total</p>
                      <p className="font-medium">${totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal
        onClose={setShowSuccessModal}
        isOpen={showSuccessModal}
        bookingDetails={bookingDetails}
      />
    </>
  );
}
