import { useJsApiLoader } from "@react-google-maps/api";
import DashboardHeading from "../../components/DashboardHeading"
import { useDashboardTitle } from "../../Config/sendLocation"
import DispatchForm from "./DispatchForm"
import GlobalLoading from "../../Loading/Loading";
const libraries: ("places")[] = ["places"];


export default function ManualDispatch() {

  const { title, subtitle } = useDashboardTitle()



  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP,
    libraries,
  });



  if (!isLoaded) return <div className=" w-full flex items-center justify-center  text-white text-xl">

    <GlobalLoading></GlobalLoading>
  </div>;

  return (
    <div className="sm:p-3 space-y-2">
      <DashboardHeading title={title} subtitle={subtitle}></DashboardHeading>

      <DispatchForm></DispatchForm>
    </div>
  )
}
