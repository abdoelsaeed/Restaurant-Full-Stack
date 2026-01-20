// frontend/app/_components/Map.tsx

"use client";

import { Suspense, useEffect, useState } from "react";

// Loading component
function MapLoading() {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-xl sm:rounded-2xl border-2 border-primary overflow-hidden bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  );
}

// Actual Map Component
function MapContent() {
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(
    null
  );

  useEffect(() => {
    // Dynamic import بس في browser
    import("./MapComponent").then((module) => {
      setMapComponent(() => module.default);
    });
  }, []);

  if (!MapComponent) {
    return <MapLoading />;
  }

  return <MapComponent />;
}

// Main Map component
export default function Map() {
  return (
    <Suspense fallback={<MapLoading />}>
      <MapContent />
    </Suspense>
  );
}
