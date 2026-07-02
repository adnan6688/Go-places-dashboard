import { DirectionsRenderer, GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '450px',
  borderRadius: '12px',
};

const center = {
  lat: 23.8103,
  lng: 90.4125
};

const mapDarkTheme = [
  { "elementType": "geometry", "stylers": [{ "color": "#1d1d1d" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#1d1d1d" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#8ec3b9" }] },
  { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "color": "#4b4b4b" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#303030" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#3c3c3c" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }
];

export default function MonitorMap() {

  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP
  });

  

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);


  const origin = useMemo(() => ({ lat: 23.7771, lng: 90.3994 }), []);
  const destination = useMemo(() => ({ lat: 23.8103, lng: 90.4125 }), []);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
    console.log(map)
  }, []);


  console.log(map)

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          }
        }
      );
    }
  }, [isLoaded, origin, destination]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border border-white/10 rounded-3xl overflow-hidden"
    >
      <div className="relative border border-white/5 rounded-2xl overflow-hidden shadow-inner">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              styles: mapDarkTheme,
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            {directions && (
              <>
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    suppressMarkers: true,
                    polylineOptions: {
                      strokeColor: "#6366f1",
                      strokeWeight: 6,
                      strokeOpacity: 0.8
                    },
                  }}
                />

                <MarkerF
                  position={origin}
                  label={{
                    text: "Driver",
                    color: "white",
                    className: "bg-blue-600 px-3 py-1 rounded-lg font-bold mb-10"
                  }}
                />

                <MarkerF
                  position={destination}
                  label={{
                    text: "Rider",
                    color: "white",
                    className: "bg-purple-600 px-3 py-1 rounded-lg font-bold mb-10"
                  }}
                />
              </>
            )}
          </GoogleMap>
        ) : (
          <div className="h-112.5 flex items-center justify-center text-gray-400 bg-white/5">
            <span className="animate-pulse">Loading Navigation Maps...</span>
          </div>
        )}
      </div>


    </motion.div>
  );
}