import React, { useCallback, useState, useMemo } from "react";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { liveMapApi } from "./mapApiData";


/**
 * MAP STYLE
 */
const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2c5f72" }] },
];

/**
 * MAP CONFIG
 */
const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 23.780887,
  lng: 90.279237,
};

const GoogleMapComponent: React.FC = () => {
  /**
   * API DATA
   */
  const { data } = useQuery({
    queryKey: ["live_map_data"],
    queryFn: liveMapApi,
  });

  /**
   * DRIVERS (API SOURCE OF TRUTH)
   */
  const drivers = useMemo(() => {
    return data?.onlineDrivers ?? [];
  }, [data]);

  /**
   * MAP INSTANCE
   */
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
        }}
      >
        {/* 🚗 DRIVERS */}
        {drivers?.map((driver) => {
          const isActive = !!driver.activeRideId;

          return (
            <OverlayView
              key={driver.driverId}
              position={{ lat: driver.lat, lng: driver.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="flex flex-col items-center gap-1.5 -translate-x-1/2 -translate-y-full cursor-pointer hover:scale-110 transition-transform">

                {/* AVATAR */}
                <div
                  className={`w-12 h-12 rounded-full border-4 shadow-lg overflow-hidden p-0.5 ${driver?.status == 'free' ? "border-emerald-500" : "border-white"
                    }`}
                >
                  {driver.profilePhoto ? (
                    <img
                      src={driver.profilePhoto}
                      alt={driver.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center  text-white text-xl font-semibold">
                      {driver?.name?.charAt(0)?.toUpperCase() || "D"}
                    </div>
                  )}
                </div>

                {/* LABEL CARD */}
                <div
                  className={`px-3 py-2 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-1 whitespace-nowrap ${isActive ? "bg-emerald-50/90" : "bg-white"
                    }`}
                >
                  {/* NAME + DOT */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-500" : "bg-blue-500"
                        }`}
                    />

                    <span className="text-[12px] font-bold text-slate-800">
                      {driver.name}
                    </span>
                  </div>


                  {/* ADDRESS */}
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 truncate max-w-45">
                    📍 {driver.address || "No address available"}
                  </span>

                  {/* STATUS */}
                  <span className="text-[9px] text-slate-400">
                    {isActive ? "Ride active now" : "Available"}
                  </span>


                </div>
              </div>
            </OverlayView>
          );
        })}
      </GoogleMap>

      {/* LEGEND */}
      <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl flex flex-col gap-3 min-w-52">
        <h3 className="text-white text-[10px] uppercase tracking-widest font-bold opacity-60">
          Driver Status
        </h3>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 bg-white" />
          <span className="text-xs text-white">Active Ride</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-white bg-white" />
          <span className="text-xs text-white">Available Driver</span>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapComponent;