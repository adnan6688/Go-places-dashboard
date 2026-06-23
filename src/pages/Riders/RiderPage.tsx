import DashboardHeading from "../../components/DashboardHeading";
import { useDashboardTitle } from "../../Config/sendLocation";
import RiderMannagement from "./RiderMannagement";

export default function RiderPage() {

  const { title, subtitle } = useDashboardTitle();



  return (
    <div className=" sm:p-2">
      <DashboardHeading title={title} subtitle={subtitle}></DashboardHeading>


      <div className="my-3">
        <RiderMannagement></RiderMannagement>
      </div>
    </div>
  )
}
