// components/HeroSection.js
"use client";

import { useTheme } from "next-themes";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import SecNav from "./SecNav";
import Image from "next/image";

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <div className="relative h-screen w-full ">
      <div className="absolute z-20 left-0 right-0">
        <Navbar />
        <SecNav />
      </div>
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* <video
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/tourism.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

        <img src="/beach.jpg" className="w-full h-full object-cover" />
      </div>

      {/* Content - Centered vertically and horizontally */}
      <div className="relative h-full flex flex-col items-center justify-center px-4  mx-auto container">
        <div className="max-w-2xl text-center ">
          <h1 className="lg:text-3xl text-lg md:text-4xl font-bold  text-white">
            Discover the Beauty of Sri Lanka
          </h1>
          <p className="text-base hidden lg:flex md:text-lg text-white ">
            Explore ancient temples, pristine beaches, and lush tea plantations
          </p>
        </div>

        {/* SearchBar Component */}
        <SearchBar />
      </div>
    </div>
  );
}
