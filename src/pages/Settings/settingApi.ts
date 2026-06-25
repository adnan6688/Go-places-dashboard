import axiosInstance from "../../baseUrl/baseurl"




export const updateProfileInformationApi = async (fullName: string, phone: string) => {

    try {
        const body: { fullName?: string, phone?: string } = {}
        if (fullName) {
            body.fullName = fullName
        }
        if (phone) {
            body.phone = phone
        }
        const res = await axiosInstance.patch('/admin/update-profile', { ...body })
        return res
    }
    catch (err: any) {
        const message = err?.response?.message
        throw new Error(message)
    }
}