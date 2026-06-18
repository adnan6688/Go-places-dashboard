import DashboardHeading from "../../components/DashboardHeading";
import { useDashboardTitle } from "../../Config/sendLocation";
import DriverTable from "./DriverTable";


export default function Driver() {

  const { title, subtitle } = useDashboardTitle();





  return (
    <div className="sm:p-3 space-y-2">

      <div>
        <DashboardHeading title={title} subtitle={subtitle}></DashboardHeading>


      </div>
      <DriverTable></DriverTable>
    </div>
  )
}
