import { useJsApiLoader } from "@react-google-maps/api"
import DashboardHeading from "../../components/DashboardHeading"
import { useDashboardTitle } from "../../Config/sendLocation"
import ActiveAndOnlineDrivers from "./ActiveAndOnlineDrivers"
import GoogleMapComponent from "./GoogleMapComponent"


const libraries: ("places")[] = ["places"];



export default function Livemap() {

  const { title, subtitle } = useDashboardTitle()


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP,
    libraries,
  });



  if (!isLoaded) return <div className=" w-full flex items-center justify-center bg-[#1a1a1a] text-white text-xl">Loading Maps...</div>;

  return (
    <div className="p-0 sm:p-3">

      <div>
        <DashboardHeading title={title} subtitle={subtitle}></DashboardHeading>

      </div>



      <div className="h-150 my-4 w-full relative mb-10 overflow-hidden rounded-2xl ">
        <GoogleMapComponent />
      </div>

      <div>
        <ActiveAndOnlineDrivers></ActiveAndOnlineDrivers>
      </div>



    </div>
  )
}
