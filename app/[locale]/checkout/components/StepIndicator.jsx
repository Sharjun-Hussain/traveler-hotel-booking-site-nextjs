"use client";
import React from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for classNames

const StepIndicator = ({ steps, currentStep, onChange }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div
            key={index}
            className={cn(
              "flex items-center flex-1 transition-all duration-300",
              index < steps.length - 1 ? "mr-2" : ""
            )}
          >
            {/* Step Circle */}
            <button
              type="button"
              onClick={() => onChange(index)}
              disabled={!isCompleted && !isCurrent}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                isCompleted
                  ? "bg-blue-600 border-blue-600 text-white"
                  : isCurrent
                  ? "border-blue-600 bg-white text-blue-600"
                  : "border-gray-300 bg-white text-gray-400",
                isCompleted || isCurrent
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              )}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </button>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-1 transition-all duration-300",
                  isCompleted ? "bg-blue-600" : "bg-gray-300"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
