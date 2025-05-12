"use client"
import { Button } from "@/components/ui/button";
import BookingModal from "./registration/Property-listing-model";
import { useState } from "react";



export default function Home() {
    const [open, setopen] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            List your property on Booking.com and start welcoming guests in no time!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            To get started, select the type of property you want to list on Booking.com
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Quick start</h2>
              <div className="text-left">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <HomeIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Apartment</h3>
                    <p className="text-sm text-gray-500">
                      Furnished and self-catering accommodations where guests rent the entire place.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">List your property</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium">Homes</h3>
                  <p className="text-sm text-gray-500">
                    Properties like apartments, vacation homes, villas, etc.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Hotel, B&Bs & More</h3>
                  <p className="text-sm text-gray-500">
                    Properties like hotels, B&Bs, guest houses, hostels, condo hotels, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={()=> setopen(true)}>
            List your Property
          </Button>

         <BookingModal open={open} setOpen={setopen} />

          <div className="mt-12">
            <h3 className="text-lg font-medium mb-4">Alternative Places</h3>
            <p className="text-gray-600">
              Properties like boats, campgrounds, luxury tents, etc.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}