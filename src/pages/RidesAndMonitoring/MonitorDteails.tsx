import { useParams } from "react-router";
import DetailsCard from "./DetailsCard";
import MonitorMap from "./MonitorMap";
import { useQuery } from "@tanstack/react-query";
import { monitoringDetails } from "./monitoringApi";
import GlobalLoading from "../../Loading/Loading";

export default function MonitorDteails() {

    const {id} = useParams()

    const {data , isLoading} = useQuery({
        queryKey : ['deatils_of_ride'],
        queryFn : ()=> monitoringDetails(id as string)
    })


    if(isLoading){

        return <div>
            <GlobalLoading message="Monitoring Details Loading..."></GlobalLoading>
        </div>
    }


    return (
        <div className="sm:p-3">


            <MonitorMap route={data?.route} rider={data?.rider} driver={data?.driver}></MonitorMap>

            <DetailsCard route={data?.route} rider={data?.rider} driver={data?.driver}></DetailsCard>
        </div>
    )
}
