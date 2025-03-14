import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Globe, Search } from "lucide-react";

const CurrencyLanguageDialog = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [searchQuery, setSearchQuery] = useState("");

  const currencies = [
    { code: "USD", name: "US Dollar ($)", symbol: "$" },
    { code: "LKR", name: "Sri Lankan Rupees (Rs.)", symbol: "Rs." },
    { code: "EUR", name: "Euro (€)", symbol: "€" },
    { code: "GBP", name: "British Pound (£)", symbol: "£" },
    { code: "INR", name: "Indian Rupee (₹)", symbol: "₹" },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "ta", name: "Tamil" },
    { code: "si", name: "Sinhala" },
  ];

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-8 w-8 hover:bg-gray-200 hover:text-gray-600 cursor-pointer rounded-full flex justify-center items-center">
          <Globe size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Language and currency
          </DialogTitle>
        </DialogHeader>

        <div className="relative mt-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10 pr-4 py-2 rounded-full"
            placeholder="Search language or currency"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="language" className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="language" className="w-1/2">
              Language
            </TabsTrigger>
            <TabsTrigger value="currency" className="w-1/2">
              Currency
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="language"
            className="mt-4 max-h-64 overflow-y-auto"
          >
            <div className="grid grid-cols-1 gap-2">
              {filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  className={`flex items-center justify-between px-4 py-2 text-left rounded-lg hover:bg-gray-100 ${
                    selectedLanguage === language.name ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setSelectedLanguage(language.name)}
                >
                  <span>{language.name}</span>
                  {selectedLanguage === language.name && (
                    <Check className="h-4 w-4 text-black" />
                  )}
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="currency"
            className="mt-4 max-h-64 overflow-y-auto"
          >
            <div className="grid grid-cols-1 gap-2">
              {filteredCurrencies.map((currency) => (
                <button
                  key={currency.code}
                  className={`flex items-center justify-between px-4 py-2 text-left rounded-lg hover:bg-gray-100 ${
                    selectedCurrency === currency.code ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setSelectedCurrency(currency.code)}
                >
                  <span>{currency.name}</span>
                  {selectedCurrency === currency.code && (
                    <Check className="h-4 w-4 text-black" />
                  )}
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CurrencyLanguageDialog;
