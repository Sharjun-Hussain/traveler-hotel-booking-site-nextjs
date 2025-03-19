// components/PaymentMethodCard.jsx
import React from "react";

export default function PaymentMethodCard({ icon, formContent }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center mb-4">
        {icon}
        <div className="ml-auto flex gap-2">
          <img src="/api/placeholder/36/24" alt="visa" className="h-6" />
          <img src="/api/placeholder/36/24" alt="mastercard" className="h-6" />
          <img src="/api/placeholder/36/24" alt="amex" className="h-6" />
        </div>
      </div>
      {formContent}
    </div>
  );
}
