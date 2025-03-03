// components/HeroSection.js
"use client";

import { useTheme } from "next-themes";
import SearchBar from "./SearchBar";

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/tourism.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay - slightly different opacity for light/dark modes */}
        {/* <div
          className={`absolute inset-0 bg-black ${
            theme === "dark" ? "bg-opacity-60" : "bg-opacity-40"
          }`}
        ></div> */}
      </div>

      {/* Content - Centered vertically and horizontally */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 mx-auto container">
        <div className="max-w-2xl text-center mb-4">
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
