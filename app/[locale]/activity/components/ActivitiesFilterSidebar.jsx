// components/ActivitiesFilterSidebar.jsx
"use client";

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MapPin, Bus, Car, Ship, Train, Plane } from "lucide-react";

export function ActivitiesFilterSidebar({
    filters,
    onFilterChange,
    onClearFilters,
    locations,
    transportOptions,
    categories,
    difficulties,
}) {
    const toggleFilter = (filterType, value) => {
        const currentFilters = [...filters[filterType]];
        const newFilters = currentFilters.includes(value)
            ? currentFilters.filter((item) => item !== value)
            : [...currentFilters, value];

        onFilterChange({
            ...filters,
            [filterType]: newFilters,
        });
    };

    return (
        <div className="w-72 space-y-6 sticky top-24">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                    variant="ghost"
                    className="text-sm px-2 h-8"
                    onClick={onClearFilters}
                >
                    Clear all
                </Button>
            </div>

            {/* Price range filter */}
            <div className="space-y-4 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                <h3 className="font-medium">Price range (USD)</h3>
                <div className="px-2">
                    <Slider
                        defaultValue={[0, 100]}
                        max={100}
                        step={1}
                        value={filters.priceRange}
                        onValueChange={(value) =>
                            onFilterChange({ ...filters, priceRange: value })
                        }
                        className="my-4"
                    />
                    <div className="flex justify-between text-sm">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Locations filter */}
            <div className="space-y-4 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                <h3 className="font-medium">Locations</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {locations.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                            <Checkbox
                                id={`location-${location}`}
                                checked={filters.selectedLocations.includes(location)}
                                onCheckedChange={() =>
                                    toggleFilter("selectedLocations", location)
                                }
                            />
                            <Label htmlFor={`location-${location}`} className="text-sm">
                                {location}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transport filter */}
            <div className="space-y-4 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                <h3 className="font-medium">Transport options</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {transportOptions.map((transport) => (
                        <div key={transport} className="flex items-center space-x-2">
                            <Checkbox
                                id={`transport-${transport}`}
                                checked={filters.selectedTransport.includes(transport)}
                                onCheckedChange={() =>
                                    toggleFilter("selectedTransport", transport)
                                }
                            />
                            <Label htmlFor={`transport-${transport}`} className="text-sm flex items-center gap-2">
                                {transport === "Bus" && <Bus size={14} />}
                                {transport === "Car" && <Car size={14} />}
                                {transport === "Train" && <Train size={14} />}
                                {transport === "Ship" && <Ship size={14} />}
                                {transport === "Plane" && <Plane size={14} />}
                                {transport}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories filter */}
            <div className="space-y-4 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                <h3 className="font-medium">Activity types</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                                id={`category-${category}`}
                                checked={filters.selectedCategories.includes(category)}
                                onCheckedChange={() =>
                                    toggleFilter("selectedCategories", category)
                                }
                            />
                            <Label htmlFor={`category-${category}`} className="text-sm">
                                {category}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Difficulty filter */}
            <div className="space-y-4 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                <h3 className="font-medium">Difficulty level</h3>
                <div className="space-y-2">
                    {difficulties.map((difficulty) => (
                        <div key={difficulty} className="flex items-center space-x-2">
                            <Checkbox
                                id={`difficulty-${difficulty}`}
                                checked={filters.selectedDifficulties.includes(difficulty)}
                                onCheckedChange={() =>
                                    toggleFilter("selectedDifficulties", difficulty)
                                }
                            />
                            <Label
                                htmlFor={`difficulty-${difficulty}`}
                                className="text-sm"
                            >
                                {difficulty}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured filter */}
            <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                <Label htmlFor="featured-toggle" className="font-medium">
                    Featured only
                </Label>
                <Switch
                    id="featured-toggle"
                    checked={filters.showFeatured}
                    onCheckedChange={(checked) =>
                        onFilterChange({ ...filters, showFeatured: checked })
                    }
                />
            </div>

            {/* Applied filters chips */}
            {(filters.selectedLocations.length > 0 ||
                filters.selectedTransport.length > 0 ||
                filters.selectedCategories.length > 0 ||
                filters.selectedDifficulties.length > 0 ||
                filters.priceRange[0] > 0 ||
                filters.priceRange[1] < 100) && (
                    <div className="space-y-4 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                        <h3 className="font-medium">Applied filters</h3>
                        <div className="flex flex-wrap gap-2">
                            {filters.selectedLocations.map((loc) => (
                                <Badge
                                    variant="secondary"
                                    key={`badge-${loc}`}
                                    className="flex items-center gap-1"
                                >
                                    <MapPin size={12} />
                                    {loc}
                                    <button
                                        className="ml-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 p-0.5"
                                        onClick={() => toggleFilter("selectedLocations", loc)}
                                    >
                                        ✕
                                    </button>
                                </Badge>
                            ))}
                            {filters.selectedTransport.map((transport) => (
                                <Badge
                                    variant="secondary"
                                    key={`badge-${transport}`}
                                    className="flex items-center gap-1"
                                >
                                    {transport === "Bus" && <Bus size={12} />}
                                    {transport === "Car" && <Car size={12} />}
                                    {transport === "Train" && <Train size={12} />}
                                    {transport === "Plane" && <Plane size={12} />}
                                    {transport === "Ship" && <Ship size={12} />}
                                    {transport}
                                    <button
                                        className="ml-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 p-0.5"
                                        onClick={() => toggleFilter("selectedTransport", transport)}
                                    >
                                        ✕
                                    </button>
                                </Badge>
                            ))}
                            {filters.selectedCategories.map((category) => (
                                <Badge
                                    variant="secondary"
                                    key={`badge-${category}`}
                                    className="flex items-center gap-1"
                                >
                                    {category}
                                    <button
                                        className="ml-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 p-0.5"
                                        onClick={() => toggleFilter("selectedCategories", category)}
                                    >
                                        ✕
                                    </button>
                                </Badge>
                            ))}
                            {filters.selectedDifficulties.map((difficulty) => (
                                <Badge
                                    variant="secondary"
                                    key={`badge-${difficulty}`}
                                    className="flex items-center gap-1"
                                >
                                    {difficulty}
                                    <button
                                        className="ml-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 p-0.5"
                                        onClick={() => toggleFilter("selectedDifficulties", difficulty)}
                                    >
                                        ✕
                                    </button>
                                </Badge>
                            ))}
                            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
                                <Badge
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                >
                                    ${filters.priceRange[0]}-${filters.priceRange[1]}
                                    <button
                                        className="ml-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 p-0.5"
                                        onClick={() => onFilterChange({ ...filters, priceRange: [0, 100] })}
                                    >
                                        ✕
                                    </button>
                                </Badge>
                            )}
                        </div>
                    </div>
                )}
        </div>
    );
}