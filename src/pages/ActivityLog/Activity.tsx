import DashboardHeading from "../../components/DashboardHeading"
import { useDashboardTitle } from "../../Config/sendLocation"
import AuditLogTable from "./AuditLogTable"

export default function Activity() {

  const { title, subtitle } = useDashboardTitle()


  return (
    <div className="sm:p-3 space-y-2">

      <DashboardHeading title={title} subtitle={subtitle}></DashboardHeading>

      <AuditLogTable></AuditLogTable>

    </div>
  )
}
