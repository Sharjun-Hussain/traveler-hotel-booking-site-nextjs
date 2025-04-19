import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle } from "lucide-react";

export default function ReviewsTab({ reviews }) {
  const [visibleReviews, setVisibleReviews] = useState(3);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Guest reviews</h2>
          <div className="flex items-center mt-1">
            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full mr-3">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-bold">Review</span>
              <span className="mx-1">/</span>
              <span>5</span>
            </div>
            <span className="text-gray-600">{reviews.length ?? 3} reviews</span>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Write a review
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-3">Cleanliness</h3>
          <div className="flex items-center mb-1">
            <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-3">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "90%" }}
              ></div>
            </div>
            <span className="font-bold">4.8</span>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-3">Comfort</h3>
          <div className="flex items-center mb-1">
            <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-3">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "94%" }}
              ></div>
            </div>
            <span className="font-bold">4.9</span>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-3">Location</h3>
          <div className="flex items-center mb-1">
            <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-3">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "96%" }}
              ></div>
            </div>
            <span className="font-bold">4.9</span>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-3">Facilities</h3>
          <div className="flex items-center mb-1">
            <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-3">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "88%" }}
              ></div>
            </div>
            <span className="font-bold">4.6</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.slice(0, visibleReviews).map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-0">
            <div className="flex items-start mb-3">
              <div className="relative w-12 h-12 mr-4">
                <Image
                  src={review.avatar}
                  alt={review.user}
                  layout="fill"
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold">{review.user}</div>
                    <div className="text-sm text-gray-600">
                      {review.travelerType} • {review.stayDuration}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h4 className="font-medium mt-2 mb-1">Great stay!</h4>
                <p className="text-gray-700">{review.comment}</p>
                <div className="flex mt-3">
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    Helpful
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleReviews < reviews.length && (
        <div className="text-center mt-6">
          <Button
            onClick={() => setVisibleReviews((prev) => prev + 3)}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Show more reviews
          </Button>
        </div>
      )}
    </div>
  );
}
