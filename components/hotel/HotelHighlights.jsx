import { Award, ThumbsUp, DollarSign } from "lucide-react";

export default function HotelHighlights() {
  return (
    <div className=" border border-blue-100 bg-j-primary/10  rounded-lg p-4 mb-6">
      {/* <h2 className="font-bold text-lg mb-3">Property highlights</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start">
          <div className="bg-j-secondary/20 p-2 rounded-full mr-3">
            <Award className="w-5 h-5 text-j-secondary" />
          </div>
          <div>
            <h3 className="font-medium">Top location</h3>
            <p className="text-sm text-gray-600">
              Rated highly by recent guests
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-j-secondary/20 p-2 rounded-full mr-3">
            <ThumbsUp className="w-5 h-5 text-j-secondary" />
          </div>
          <div>
            <h3 className="font-medium">Free cancellation</h3>
            <p className="text-sm text-gray-600">Available on most rooms</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-j-secondary/20 p-2 rounded-full mr-3">
            <DollarSign className="w-5 h-5 text-j-secondary" />
          </div>
          <div>
            <h3 className="font-medium">Great value</h3>
            <p className="text-sm text-gray-600">
              Recent guests loved the price
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
