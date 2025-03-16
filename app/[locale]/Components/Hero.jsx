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
      <div className="hidden md:block md:absolute z-[6] bg-gradient-to-b from-white via-transparent to-transparent h-[40%] from-0% via-100% to-100% top-0 left-0 right-0 pointer-events-none"></div>
      <div className="hidden md:block md:absolute z-[6] bg-gradient-to-b from-trasparent to-white h-[20%] bottom-0 left-0 right-0 pointer-events-none"></div>
      <div className="absolute z-20 left-0 right-0">
        {/* <Navbar /> */}
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
        <div className="max-w-2xl mmb-6 text-center ">
          <h1 className="lg:text-3xl text-lg md:text-4xl font-bold j-text-title">
            Discover the Beauty of Sri Lanka
          </h1>
          <p className="text-base hidden lg:flex md:text-lg j-text-small-text ">
            Explore ancient temples, pristine beaches, and lush tea plantations
          </p>
        </div>

        {/* SearchBar Component */}
        <SearchBar />
      </div>
    </div>
  );
}
