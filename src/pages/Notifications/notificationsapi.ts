import axiosInstance from "../../baseUrl/baseurl"



export type TNotifictions = {
    body: string,
    createdAt: string,
    pushSent: number,
    target: string,
    title: string,
    totalSent: number,
    type: string,
    updatedAt: string,
    _id: string
}

type Tprams = {
    page?: number
}
export const allNotifications = async (page?: number) => {




    try {
        const params: Tprams = {}
        if (page) {
            params.page = page
        }
        const res = await axiosInstance.get(`/admin/global-notification`, { params })
        return res?.data?.data || {}
    }
    catch (err) {
        console.log(err)
    }
}




export const sentNotification = async (payload: { title: string, body: string, target: "all" | "driver" | "rider" | "", type: "announcement" | "alert" | "update" | '' }) => {

    try {
        const res = await axiosInstance.post('/admin/global-notification', payload)

        return res
    } catch {
        //
    }
}


export const deleteNotifications = async (id: string) => {

    try {
        const res = await axiosInstance.delete(`/admin/global-notification/${id}`)
        return res
    } catch (e) {
        console.log(e)
    }
}