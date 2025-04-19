import { lazy, Suspense } from "react";

// Map icon names to their dynamic imports
const iconComponents = {
  wifi: lazy(() =>
    import("lucide-react").then((mod) => ({ default: mod.Wifi }))
  ),
  waves: lazy(() =>
    import("lucide-react").then((mod) => ({ default: mod.Waves }))
  ),
  utensils: lazy(() =>
    import("lucide-react").then((mod) => ({ default: mod.Utensils }))
  ),
  conciergebell: lazy(() =>
    import("lucide-react").then((mod) => ({ default: mod.ConciergeBell }))
  ),
  car: lazy(() => import("lucide-react").then((mod) => ({ default: mod.Car }))),
  dumbbell: lazy(() =>
    import("lucide-react").then((mod) => ({ default: mod.Dumbbell }))
  ),
  briefcase: lazy(() =>
    import("lucide-react").then((mod) => ({ default: mod.Briefcase }))
  ),
  parkingcircle: lazy(() =>
    import("lucide-react").then((mod) => ({ default: mod.ParkingCircle }))
  ),
  airvent: lazy(() =>
    import("lucide-react").then((mod) => ({ default: mod.AirVent }))
  ),
  tv: lazy(() => import("lucide-react").then((mod) => ({ default: mod.Tv }))),
  showerhead: lazy(() =>
    import("lucide-react").then((mod) => ({ default: mod.ShowerHead }))
  ),
  mountain: lazy(() =>
    import("lucide-react").then((mod) => ({ default: mod.Mountain }))
  ),
  leaf: lazy(() =>
    import("lucide-react").then((mod) => ({ default: mod.Leaf }))
  ),
  pawprint: lazy(() =>
    import("lucide-react").then((mod) => ({ default: mod.PawPrint }))
  ),
};

export default function DynamicIcon({
  name,
  className = "w-4 h-4",
  fallback = null,
}) {
  // Normalize the icon name (lowercase, remove special chars)
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const IconComponent = iconComponents[normalizedName];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <IconComponent className={className} />
    </Suspense>
  );
}
