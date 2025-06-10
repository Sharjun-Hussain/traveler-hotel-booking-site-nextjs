"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { isAppleDevice } from "./AppleDetector";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "./page-transisiton";

// Schema for form validation
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export function LoginForm({ className, ...props }) {
  const [isApple, setIsApple] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check for Apple device
  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsApple(isAppleDevice(userAgent));
  }, []);

  // Form submission handler
  async function onSubmit(values) {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // On successful login
      toast.success("Welcome back!", {
        description: "You're now being redirected to your dashboard",
      });
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login failed", {
        description: "Please check your credentials and try again",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Social login handlers
  const handleGoogleLogin = () => {
    toast.info("Redirecting to Google login...");
    // Implement actual Google OAuth here
  };

  const handleAppleLogin = () => {
    toast.info("Redirecting to Apple login...");
    // Implement actual Apple OAuth here
  };

  return (
    <PageTransition>
      <div className={cn("grid md:grid-cols-2 min-h-screen", className)} {...props}>
        {/* Left side - Visuals */}
        <div className="hidden md:flex bg-gradient-to-br from-blue-600 to-indigo-900 p-12 flex-col justify-between text-white">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-indigo-600"
              >
                <path d="M12 1.5a5.25 5.25 0 0 1 5.25 5.25v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3v-3A5.25 5.25 0 0 1 12 1.5Zm1.5 8.25v3a3 3 0 0 1-3 3H8.25v.75a3 3 0 0 0 3 3h6.75a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3h-1.5v3a3.75 3.75 0 1 1-7.5 0v-3a3.75 3.75 0 1 1 7.5 0Z" />
              </svg>
            </div>
            <span className="font-bold text-xl">SL Vista</span>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Welcome back traveler!
            </h2>
            <p className="text-blue-100 text-lg">
              Access your personalized travel dashboard and continue your journey.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm">
              <Image
                src="/placeholder-dashboard.jpg"
                alt="Travel dashboard"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm">
              <Image
                src="/placeholder-trip.jpg"
                alt="Upcoming trip"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm">
              <Image
                src="/placeholder-deals.jpg"
                alt="Exclusive deals"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 space-y-2">
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground">
                Log in to access your bookings and personalized recommendations
              </p>
            </div>

            <Card className="border-none shadow-none">
              <CardContent className="p-0">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Social Login Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        {isApple && (
                          <Button
                            onClick={handleAppleLogin}
                            variant="outline"
                            className="w-full"
                            type="button"
                            disabled={isLoading}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="w-4 h-4 mr-2"
                            >
                              <path
                                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                fill="currentColor"
                              />
                            </svg>
                            Apple
                          </Button>
                        )}
                        <Button
                          onClick={handleGoogleLogin}
                          variant="outline"
                          className="w-full"
                          type="button"
                          disabled={isLoading}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 mr-2"
                          >
                            <path
                              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                              fill="currentColor"
                            />
                          </svg>
                          Google
                        </Button>
                      </div>

                      {/* Divider */}
                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or login with email
                          </span>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="elizabeth@example.com"
                                  type="email"
                                  {...field}
                                  disabled={isLoading}
                                  className="h-12"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center justify-between">
                                <FormLabel>Password</FormLabel>
                                <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">  Forgot password?</Link>
                                {/* <button
                                type="button"
                                className="text-sm text-muted-foreground hover:text-primary"
                                onClick={() => {
                                  toast.info(
                                    "Forgot your password?",
                                    {
                                      description: "We'll send you a reset link to your email",
                                      action: {
                                        label: "Reset",
                                        onClick: () => router.push("/forgot-password"),
                                      },
                                    }
                                  );
                                }}
                              >
                                Forgot password?
                              </button> */}
                              </div>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="••••••••"
                                  {...field}
                                  disabled={isLoading}
                                  className="h-12"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full h-12"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Signing in...
                            </>
                          ) : (
                            "Sign In"
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="text-center text-sm">
                      Don't have an account?{" "}
                      <a
                        href="/signup"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          router.push("/signup");
                        }}
                      >
                        Sign up
                      </a>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="mt-8 text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}