import React, { useCallback, useState } from 'react';
import { GoogleMap, OverlayView } from '@react-google-maps/api';


const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2c5f72" }] },
];

const riders = [
  {
    id: 1,
    name: "James Wilson",
    destination: "City Hospital",
    lat: 40.7128,
    lng: -74.0060,
    isActive: true,

    profilePic: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Linda Martinez",
    destination: "Physical Therapy Center",
    lat: 40.7050,
    lng: -73.9960,
    isActive: true,
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Maria Garcia",
    lat: 40.7180,
    lng: -73.9850,
    isActive: false, // অনলাইন ড্রাইভার
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 4,
    name: "Robert Fox",
    lat: 40.7028,
    lng: -74.0120,
    isActive: false,
    profilePic: "https://randomuser.me/api/portraits/men/78.jpg"
  }
];

const containerStyle = { width: '100%', height: '100%' }; 
const center = { lat: 40.7128, lng: -74.0060 };

const GoogleMapComponent: React.FC = () => {



  const [map, setMap] = useState<google.maps.Map | null>(null);



  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);


  return (
    <div className="relative h-full  overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
        }}
      >
        {riders?.map((rider) => (
          <OverlayView
            key={rider.id}
            position={{ lat: rider.lat, lng: rider.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >

            <div className="flex flex-col items-center gap-1.5 -translate-x-1/2 -translate-y-full cursor-pointer hover:scale-110 transition-transform">


              <div className={`w-12 h-12 rounded-full border-4 shadow-xl overflow-hidden p-0.5 ${rider.isActive ? 'border-[#10b981]' : 'border-white'}`}>
                <img
                  src={rider.profilePic}
                  alt={rider.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <div className={`px-3 py-1 rounded-full shadow-lg ${rider.isActive ? 'bg-[#e8efef]/90 backdrop-blur-sm' : 'bg-white'} border border-gray-100 flex items-center gap-2 whitespace-nowrap`}>

                <div className={`w-2 h-2 rounded-full ${rider.isActive ? 'bg-[#10b981]' : 'bg-[#1e40af]'}`}></div>

                <div className="flex flex-col leading-tight">
                  <span className="text-[12px] font-bold text-[#1f2937]">
                    {rider.name}
                  </span>
                  {rider.isActive && rider.destination && (
                    <span className="text-[10px] text-[#64748b]">
                      → {rider.destination}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </OverlayView>
        ))}
      </GoogleMap>


      <div className="absolute bottom-10 left-6 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl flex flex-col gap-3 min-w-45">
        <h3 className="text-white text-[10px] uppercase tracking-widest font-bold opacity-50">Status</h3>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#10b981] p-0.5 overflow-hidden">
            <img src={riders[0].profilePic} alt="active" className="w-full h-full rounded-full object-cover" />
          </div>
          <span className="text-xs font-medium text-white">Active Trip (Green Border)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-white p-0.5 overflow-hidden">
            <img src={riders[2].profilePic} alt="online" className="w-full h-full rounded-full object-cover" />
          </div>
          <span className="text-xs font-medium text-white">Online Driver (White Border)</span>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapComponent;