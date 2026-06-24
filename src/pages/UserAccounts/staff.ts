import axiosInstance from "../../baseUrl/baseurl"


type TPagination = {
    hasNextPage: boolean,
    hasPrevPage: boolean,
    limit: number,
    page: number,
    total: number,
    totalPages: number
}


type Params = {
    search?: string
    status? : string
}

export const staffApi = async (search?: string , status? : string) => {

    try {
        const params: Params = {}
        if (search) {
            params.search = search
        }
        if(status){
            params.status = status
        }

    

        const res = await axiosInstance.get(`/admin/staffs`,{params})
        return {
            data: res?.data || [],
            pagination: res?.data?.pagination as TPagination,
        }
    } catch (err) {
        console.log(err)
    }
}




export const createStaff = async (fullName: string, email: string, password: string) => {

    try {
        const result = await axiosInstance.post(`/admin/staffs/create`, { fullName, email, password })
        return result
    } catch (err: any) {
        const msg = err?.response?.data?.message ??
            err?.message ??
            "Something went wrong";

        throw new Error(String(msg));
    }
}


// export const updateStaffProfile = async (fullName:string)=>{

// }