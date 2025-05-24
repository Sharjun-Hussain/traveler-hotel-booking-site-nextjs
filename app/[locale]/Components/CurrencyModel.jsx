import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Globe, Search } from "lucide-react";
import { useCurrencyStore } from "@/stores/useCurrencyStore";

const CurrencyDialog = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isOpen, setIsOpen] = useState(false); // State to control dialog visibility
  const [searchQuery, setSearchQuery] = useState("");

  const { currency, setCurrency } = useCurrencyStore()


  const currencies = [
    { code: "USD", name: "US Dollar ($)", symbol: "$" },
    { code: "LKR", name: "Sri Lankan Rupees (Rs.)", symbol: "Rs." },
    { code: "EUR", name: "Euro (€)", symbol: "€" },
    { code: "GBP", name: "British Pound (£)", symbol: "£" },
    { code: "INR", name: "Indian Rupee (₹)", symbol: "₹" },
  ];

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCurrencySelect = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    setCurrency(currencyCode)
    setIsOpen(false); // Close the dialog after selection
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="h-8 w-8 hover:bg-gray-200 hover:text-gray-600 cursor-pointer rounded-full flex justify-center items-center">
          {selectedCurrency &&
            currencies.find((item) => item.code === selectedCurrency)?.code}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Language and currency
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-2">
          {filteredCurrencies.map((currency) => (
            <button
              key={currency.code}
              className={`flex items-center justify-between px-4 py-2 text-left rounded-lg hover:bg-gray-100 ${selectedCurrency === currency.code ? "bg-gray-100" : ""
                }`}
              onClick={() => handleCurrencySelect(currency.code)}
            >
              <span>{currency.name}</span>
              {selectedCurrency === currency.code && (
                <Check className="h-4 w-4 text-black" />
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CurrencyDialog;
