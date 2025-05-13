// components/ActivitiesSearchHeader.jsx
"use client";

import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ActivitiesSearchHeader({
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
    onFilterOpen,
}) {
    return (
        <div className="sticky top-14 z-10 px-4 mt-14   bg-white dark:bg-zinc-900">
            <div className="container  mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex mt-24">
                        <div className="relative ">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <Input
                                type="text"
                                placeholder="Search activities, locations or experiences..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-zinc-800"
                            />
                        </div>
                    </div>

                    {/* Mobile filters button */}
                    <div className="md:hidden flex justify-end">
                        <Button variant="outline" className="gap-2" onClick={onFilterOpen}>
                            <Filter size={18} /> Filters
                        </Button>
                    </div>

                    {/* Sorting dropdown */}
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <ArrowUpDown size={18} /> Sort by:
                                    {sortBy === "price_low" && " Price (Low to High)"}
                                    {sortBy === "price_high" && " Price (High to Low)"}
                                    {sortBy === "rating" && " Rating"}
                                    {sortBy === "duration" && " Duration"}
                                    {sortBy === "popularity" && " Popularity"}
                                    {sortBy === "featured" && " Featured"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => onSortChange("featured")}>
                                    Featured
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onSortChange("price_low")}>
                                    Price: Low to High
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onSortChange("price_high")}>
                                    Price: High to Low
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onSortChange("rating")}>
                                    Rating
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onSortChange("duration")}>
                                    Duration
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onSortChange("popularity")}>
                                    Popularity
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
}