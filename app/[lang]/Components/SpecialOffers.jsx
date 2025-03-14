import { Button } from "@/components/ui/button";

// components/SpecialOffers.js
export default function SpecialOffers() {
  const offers = [
    {
      id: 1,
      title: "Last Minute Beach Getaway",
      discount: "30% OFF",
      description: "Book within 72 hours for special rates",
      image: "/images/beach-getaway.jpg",
    },
    {
      id: 2,
      title: "Cultural Heritage Tour",
      discount: "Save $150",
      description: "Explore Sri Lanka's UNESCO World Heritage sites",
      image: "/images/heritage-tour.jpg",
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Special Offers
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Special offers in srilanka{" "}
          </p>
        </div>
        {/* <Button
            variant="outline"
            className="mt-4 md:mt-0"
            onClick={onViewAll}
          >
            View All Events
          </Button> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row"
          >
            <div className="md:w-2/5 h-48 md:h-auto">
              <img
                src="/api/placeholder/400/320"
                alt={offer.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-3/5 p-6 flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full mb-3 font-medium">
                  {offer.discount}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
              </div>
              <Button>View Offer</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
