
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
import { useState } from "react";

// Schema for form validation
const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

function ForgotPasswordForm({ className, ...props }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Initialize the form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    // Form submission handler
    async function onSubmit(values) {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // On successful submission
            toast.success("Reset link sent!", {
                description: "Check your email for password reset instructions",
            });
            router.push("/login");
        } catch (error) {
            toast.error("Failed to send reset link", {
                description: "Please try again later",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={cn("grid md:grid-cols-2 min-h-screen", className)} {...props}>
            {/* Left side - Visuals with ocean blue gradient */}
            <div className="hidden md:flex bg-gradient-to-br from-[#06708c] via-[#0ca6d9] to-[#06707d] p-12 flex-col justify-between text-white">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 text-[#06708c]"
                        >
                            <path d="M12 1.5a5.25 5.25 0 0 1 5.25 5.25v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3v-3A5.25 5.25 0 0 1 12 1.5Zm1.5 8.25v3a3 3 0 0 1-3 3H8.25v.75a3 3 0 0 0 3 3h6.75a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3h-1.5v3a3.75 3.75 0 1 1-7.5 0v-3a3.75 3.75 0 1 1 7.5 0Z" />
                        </svg>
                    </div>
                    <span className="font-bold text-xl">SL VIsta</span>
                </div>

                <div className="space-y-6">
                    <h2 className="text-4xl font-bold leading-tight">
                        Reset your password
                    </h2>
                    <p className="text-blue-100 text-lg">
                        We'll help you get back to your travel planning in no time.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm">
                        <Image
                            src="/placeholder-key.jpg"
                            alt="Security key"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm">
                        <Image
                            src="/placeholder-email.jpg"
                            alt="Email illustration"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm">
                        <Image
                            src="/placeholder-lock.jpg"
                            alt="Padlock"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex items-center justify-center p-6 md:p-12 bg-white">
                <div className="w-full max-w-md">
                    <div className="mb-8 space-y-2">
                        <h1 className="text-3xl font-bold text-[#06708c]">Forgot Password?</h1>
                        <p className="text-[#06707d]">
                            Enter your email to receive a password reset link
                        </p>
                    </div>

                    <Card className="border-none shadow-none bg-transparent">
                        <CardContent className="p-0">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-6"
                                >
                                    <div className="flex flex-col gap-4">
                                        {/* Form Field */}
                                        <div className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#06708c]">Email</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="elizabeth@example.com"
                                                                type="email"
                                                                {...field}
                                                                disabled={isLoading}
                                                                className="h-12 border-[#0ca6d9]/50 focus:border-[#06708c] focus-visible:ring-[#06707d]"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button
                                                type="submit"
                                                className="w-full h-12 bg-[#06708c] hover:bg-[#06707d]"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Sending link...
                                                    </>
                                                ) : (
                                                    "Send Reset Link"
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="text-center text-sm text-[#06707d]">
                                        Remember your password?{" "}
                                        <a
                                            href="/login"
                                            className="font-medium text-[#0ca6d9] underline-offset-4 hover:underline"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.push("/login");
                                            }}
                                        >
                                            Log in
                                        </a>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    <div className="mt-8 text-center text-xs text-[#06707d]/80">
                        Need help?{" "}
                        <a
                            href="/contact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium underline underline-offset-4 hover:text-[#0ca6d9]"
                        >
                            Contact our support team
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default ForgotPasswordForm