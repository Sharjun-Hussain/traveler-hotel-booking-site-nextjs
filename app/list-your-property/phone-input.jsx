"use client";

import { Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { countries } from "@/lib/countries";




export default function PhoneInput({ control, name, className, ...props }) {
  return (
    <div className={cn("flex gap-2", className)} {...props}>
      <Select
        onValueChange={(value) => {
          control.setValue(`${name}.countryCode`, value);
        }}
        defaultValue="+1"
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.phone}>
              {country.flag} {country.name} ({country.phone})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Phone number"
        onChange={(e) => {
          control.setValue(`${name}.number`, e.target.value);
        }}
      />
    </div>
  );
}