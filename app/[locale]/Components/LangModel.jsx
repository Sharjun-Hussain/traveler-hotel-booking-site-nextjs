import React, { useState } from "react";
import { IN, LK, US } from "country-flag-icons/react/3x2";
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

const LanguageDialog = ({ onselect }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currencies = [
    { code: "USD", name: "US Dollar ($)", symbol: "$" },
    { code: "LKR", name: "Sri Lankan Rupees (Rs.)", symbol: "Rs." },
    { code: "EUR", name: "Euro (€)", symbol: "€" },
    { code: "GBP", name: "British Pound (£)", symbol: "£" },
    { code: "INR", name: "Indian Rupee (₹)", symbol: "₹" },
  ];

  const languages = [
    {
      code: "en",
      name: "English",
      contryflag: <US title="United States" className="h-3" />,
    },
    {
      code: "ta",
      name: "Tamil",
      contryflag: <IN title="United States" className="h-3" />,
    },
    {
      code: "si",
      name: "Sinhala",
      contryflag: <LK title="United States" className="h-3" />,
    },
  ];

  // const filteredCurrencies = currencies.filter(
  //   (currency) =>
  //     currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     currency.code.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="h-8 w-8 hover:bg-gray-200 hover:text-gray-600 cursor-pointer rounded-full flex justify-center items-center">
          {selectedLanguage && (
            <>
              {
                languages.find((item) => item.name == selectedLanguage)
                  ?.contryflag
              }
            </>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">Language</DialogTitle>
        </DialogHeader>

        {/* <div className="relative mt-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10 pr-4 py-2 rounded-full"
            placeholder="Search language or currency"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}

        <div>
          <div className="mb-4 font-bold">Suggested for you</div>
          <div className="grid grid-cols-3 gap-3">
            {filteredLanguages.map((language) => (
              <button
                key={language.code}
                className={`flex items-center justify-between px-4 py-2 text-left rounded-lg hover:bg-j-primary/10 transition-colors ${
                  selectedLanguage === language.name
                    ? "bg-j-primary-hover/25"
                    : ""
                }`}
                onClick={() => {
                  setSelectedLanguage(language.name);
                  setIsOpen(false);
                }}
              >
                <span className="flex items-center gap-3">
                  {language.contryflag} {language.name}
                </span>
                {selectedLanguage === language.name && (
                  <Check className="h-4 w-4 text-j-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageDialog;
