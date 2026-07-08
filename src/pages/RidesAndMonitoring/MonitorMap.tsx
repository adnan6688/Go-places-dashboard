import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { TDetailsData } from "./monitoringApi";

const containerStyle = {
  width: "100%",
  height: "450px",
  borderRadius: "12px",
};


const mapDarkTheme = [
  { elementType: "geometry", stylers: [{ color: "#1d1d1d" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1d1d1d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#303030" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
];


export default function MonitorMap(data: TDetailsData) {


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP,
  });



  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);



  // Driver realtime location
  const [driverLocation, setDriverLocation] = useState({
    lat: data?.driver?.currentLocation?.lat || 23.8103,
    lng: data?.driver?.currentLocation?.lng || 90.4125,
  });



  // যখন socket আসবে তখন এখানে update হবে
  /*
  
  socket.on("driver-location-update",(location)=>{

      setDriverLocation({
          lat: location.lat,
          lng: location.lng
      })

  })

  */


  useEffect(() => {

    if (data?.driver?.currentLocation) {

      setDriverLocation({
        lat: data.driver.currentLocation.lat,
        lng: data.driver.currentLocation.lng
      })

    }

  }, [data]);




  const pickupLocation = useMemo(() => {

    return {
      lat: data?.route?.pickupLocation.coordinates.lat || 23.8103,
      lng: data?.route?.pickupLocation.coordinates.lng || 90.4125
    }

  }, [data]);




  const dropoffLocation = useMemo(() => {

    return {
      lat: data?.route?.dropoffLocation.coordinates.lat || 23.8103,
      lng: data?.route?.dropoffLocation.coordinates.lng || 90.4125
    }

  }, [data]);




  const stops = useMemo(() => {

    return data?.route?.stops?.map(item => ({
      lat: item.coordinates.lat,
      lng: item.coordinates.lng
    })) || []

  }, [data]);





  const onLoad = useCallback((map: google.maps.Map) => {

    setMap(map);

  }, []);



  const onUnmount = useCallback(() => {

    setMap(null);

  }, []);






  // Route generate
  useEffect(() => {


    if (!isLoaded) return;


    const service =
      new window.google.maps.DirectionsService();



    service.route(
      {

        origin: driverLocation,

        destination: dropoffLocation,


        waypoints: stops.map(stop => ({
          location: stop,
          stopover: true
        })),


        travelMode:
          window.google.maps.TravelMode.DRIVING,

      },


      (result, status) => {


        if (
          status ===
          window.google.maps.DirectionsStatus.OK
        ) {

          setDirections(result);

        }

      }

    )


  }, [
    isLoaded,
    driverLocation,
    dropoffLocation,
    stops
  ]);







  // auto center driver
  useEffect(() => {

    if (map) {

      map.panTo(driverLocation);

    }

  }, [
    driverLocation,
    map
  ]);






  return (

    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1 }}
      className="border border-white/10  rounded-3xl overflow-hidden"
    >


      <div className="relative">


        {
          isLoaded ?

            <GoogleMap

              mapContainerStyle={containerStyle}

              center={driverLocation}

              zoom={14}

              onLoad={onLoad}

              onUnmount={onUnmount}

              options={{
                styles: mapDarkTheme,
                disableDefaultUI: true,
                zoomControl: true
              }}



            >


              {
                directions &&

                <DirectionsRenderer

                  directions={directions}

                  options={{

                    suppressMarkers: true,

                    polylineOptions: {
                      strokeColor: "#6366f1",
                      strokeWeight: 6
                    }

                  }}

                />

              }





              {/* Driver */}

              <MarkerF

                position={driverLocation}

                label={{
                  text: "Driver",
                  color: "white"
                }}


              />






              {/* Pickup */}

              <MarkerF

                position={pickupLocation}

                label={{
                  text: "Pickup",
                  color: "white"
                }}

              />







              {/* Dropoff */}

              <MarkerF

                position={dropoffLocation}

                label={{
                  text: "Dropoff",
                  color: "white"
                }}

              />






              {/* Stops */}

              {

                stops.map((stop, index) => (


                  <MarkerF

                    key={index}

                    position={stop}

                    label={{
                      text: `Stop ${index + 1}`,
                      color: "white"
                    }}

                  />


                ))


              }




            </GoogleMap>


            :

            <div className="h-[450px] flex items-center justify-center">
              Loading Map...
            </div>


        }



      </div>


    </motion.div>


  );

}