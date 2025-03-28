// components/Testimonials.js (continued)
export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      country: "Australia",
      text: "Our trip to Sri Lanka was absolutely amazing! From the beautiful beaches to the incredible wildlife, everything was perfect.",
      image: "/images/testimonial-1.jpg",
    },
    {
      id: 2,
      name: "David Chen",
      country: "Canada",
      text: "The tea plantation tour was the highlight of our trip. The scenery was breathtaking and our guide was very knowledgeable.",
      image: "/images/testimonial-2.jpg",
    },
    {
      id: 3,
      name: "Emma Williams",
      country: "UK",
      text: "The service provided by Sri Lanka Travels was exceptional. They took care of every detail and made our family trip stress-free.",
      image: "/images/testimonial-3.jpg",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
        What our app user community say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img
                  src="/api/placeholder/100/100"
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.country}</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"{testimonial.text}"</p>
            <div className="flex text-yellow-400 mt-3">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
