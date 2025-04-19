import { Clock } from "lucide-react";

export default function PoliciesTab({ policies }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Policies</h2>

      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-3">Check-in / Check-out</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Check-in</p>
                <p className="text-gray-600">{policies.checkIn}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Check-out</p>
                <p className="text-gray-600">{policies.checkOut}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-3">Cancellation policy</h3>
          <p className="text-gray-700">{policies.cancellation}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-3">Children and extra beds</h3>
          <p className="text-gray-700 mb-2">{policies.children}</p>
          <p className="text-gray-700">{policies.extraBed}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-3">Pets</h3>
          <p className="text-gray-700">{policies.pets}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-3">Payments</h3>
          <p className="text-gray-700 mb-2">{policies.payment}</p>
          <p className="text-gray-700">{policies.taxes}</p>
        </div>
      </div>
    </div>
  );
}
