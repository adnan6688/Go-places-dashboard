import { useParams } from "react-router";
import DetailsCard from "./DetailsCard";
import MonitorMap from "./MonitorMap";
import { useQuery } from "@tanstack/react-query";
import { monitoringDetails } from "./monitoringApi";

export default function MonitorDteails() {

    const {id} = useParams()

    const {data} = useQuery({
        queryKey : ['deatils_of_ride'],
        queryFn : ()=> monitoringDetails(id as string)
    })

    console.log(data)

    return (
        <div className="sm:p-3">


            <MonitorMap></MonitorMap>

            <DetailsCard driver={data?.driver}></DetailsCard>
        </div>
    )
}
