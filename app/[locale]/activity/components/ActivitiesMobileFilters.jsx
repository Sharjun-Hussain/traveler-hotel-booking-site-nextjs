// components/ActivitiesMobileFilters.jsx
"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ActivitiesFilterSidebar } from "./ActivitiesFilterSidebar";

export function ActivitiesMobileFilters({
    open,
    onOpenChange,
    filters,
    onFilterChange,
    onClearFilters,
    locations,
    transportOptions,
    categories,
    difficulties,
}) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-md overflow-y-auto"
            >
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <ActivitiesFilterSidebar
                    filters={filters}
                    onFilterChange={onFilterChange}
                    onClearFilters={onClearFilters}
                    locations={locations}
                    transportOptions={transportOptions}
                    categories={categories}
                    difficulties={difficulties}
                />
            </SheetContent>
        </Sheet>
    );
}