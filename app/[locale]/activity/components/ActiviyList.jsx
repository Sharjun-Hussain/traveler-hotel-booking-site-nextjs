// components/ActivitiesList.jsx
"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bus, Car, Ship, Train, Plane, Filter } from "lucide-react";

export function ActivitiesList({
    activities,
    filters,
    onFilterChange,
    onClearFilters,
}) {
    const [filteredActivities, setFilteredActivities] = useState(activities);

    // Apply filters whenever they change
    useEffect(() => {
        let results = [...activities];

        // Search filter
        if (filters.searchQuery) {
            results = results.filter(
                (activity) =>
                    activity.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                    activity.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                    activity.location.toLowerCase().includes(filters.searchQuery.toLowerCase())
            );
        }

        // Price range filter
        results = results.filter(
            (activity) =>
                activity.price >= filters.priceRange[0] &&
                activity.price <= filters.priceRange[1]
        );

        // Location filter
        if (filters.selectedLocations.length > 0) {
            results = results.filter((activity) =>
                filters.selectedLocations.includes(activity.location)
            );
        }

        // Transport filter
        if (filters.selectedTransport.length > 0) {
            results = results.filter((activity) =>
                activity.transport.some((t) => filters.selectedTransport.includes(t))
            );
        }

        // Category filter
        if (filters.selectedCategories.length > 0) {
            results = results.filter((activity) =>
                activity.tags.some((tag) => filters.selectedCategories.includes(tag))
            );
        }

        // Difficulty filter
        if (filters.selectedDifficulties.length > 0) {
            results = results.filter((activity) =>
                filters.selectedDifficulties.includes(activity.difficulty)
            );
        }

        // Featured filter
        if (filters.showFeatured) {
            results = results.filter((activity) => activity.featured);
        }

        // Apply sorting
        switch (filters.sortBy) {
            case "price_low":
                results.sort((a, b) => a.price - b.price);
                break;
            case "price_high":
                results.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                results.sort((a, b) => b.rating - a.rating);
                break;
            case "duration":
                results.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
                break;
            case "popularity":
                results.sort((a, b) => b.reviews - a.reviews);
                break;
            case "featured":
                results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
            default:
                break;
        }

        setFilteredActivities(results);
    }, [activities, filters]);

    return (
        <div className="flex-1">
            {/* Results count and applied filters summary */}
            <div className="flex flex-wrap items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                    {filteredActivities.length} Activities Found
                </h2>

                {/* Applied filters display */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {filters.selectedLocations.length > 0 && (
                        <Badge variant="outline">
                            {filters.selectedLocations.length} Locations
                        </Badge>
                    )}
                    {filters.selectedTransport.length > 0 && (
                        <Badge variant="outline">
                            {filters.selectedTransport.length} Transport
                        </Badge>
                    )}
                    {filters.selectedCategories.length > 0 && (
                        <Badge variant="outline">
                            {filters.selectedCategories.length} Categories
                        </Badge>
                    )}
                    {filters.selectedDifficulties.length > 0 && (
                        <Badge variant="outline">
                            {filters.selectedDifficulties.length} Difficulties
                        </Badge>
                    )}
                    {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
                        <Badge variant="outline">
                            ${filters.priceRange[0]}-${filters.priceRange[1]}
                        </Badge>
                    )}
                </div>
            </div>

            {/* No results message */}
            {filteredActivities.length === 0 && (
                <div className="p-12 text-center">
                    <div className="mb-4 text-gray-400">
                        <Filter size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                        No activities match your filters
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button onClick={onClearFilters}>Clear All Filters</Button>
                </div>
            )}

            {/* Activity cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map((activity) => (
                    <Card
                        key={activity.id}
                        className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow"
                    >
                        <div className="relative">
                            <img
                                src={activity.image}
                                alt={activity.title}
                                className="w-full h-48 object-cover"
                            />
                            {activity.featured && (
                                <Badge className="absolute top-2 right-2 bg-blue-800 dark:bg-blue-500">
                                    Featured
                                </Badge>
                            )}
                            <div className="absolute bottom-2 right-2">
                                <Badge variant="secondary" className="font-bold">
                                    ${activity.price}
                                </Badge>
                            </div>
                        </div>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">
                                    {activity.title}
                                </CardTitle>
                                <div className="flex items-center space-x-1">
                                    <span className="text-yellow-500">★</span>
                                    <span className="font-medium">{activity.rating}</span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                                        ({activity.reviews})
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                <MapPin size={14} className="mr-1" />
                                {activity.location}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                                {activity.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-3">
                                {activity.tags.map((tag) => (
                                    <Badge
                                        variant="outline"
                                        key={`${activity.id}-${tag}`}
                                        className="text-xs"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex flex-col items-start justify-between text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                    <span className="mr-2">Duration:</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                        {activity.duration}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">Difficulty:</span>
                                    <span
                                        className={`font-medium ${activity.difficulty === "Easy"
                                            ? "text-green-600 dark:text-green-400"
                                            : activity.difficulty === "Moderate"
                                                ? "text-yellow-600 dark:text-yellow-400"
                                                : "text-red-600 dark:text-red-400"
                                            }`}
                                    >
                                        {activity.difficulty}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                            <div className="flex gap-1">
                                {activity.transport.map((t, i) => (
                                    <div
                                        key={`${activity.id}-transport-${i}`}
                                        className="text-gray-500 dark:text-gray-400"
                                        title={t}
                                    >
                                        {t === "Bus" && <Bus size={18} />}
                                        {t === "Car" && <Car size={18} />}
                                        {t === "Train" && <Train size={18} />}
                                        {t === "Ship" && <Ship size={18} />}
                                        {t === "Boat" && <Ship size={18} />}
                                        {t === "Plane" && <Plane size={18} />}
                                    </div>
                                ))}
                            </div>
                            <Button>View Details</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}