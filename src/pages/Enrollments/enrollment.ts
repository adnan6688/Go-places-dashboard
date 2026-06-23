import axiosInstance from "../../baseUrl/baseurl";

export const enrollmentRider = async (data: any) => {
  try {
    console.log("sending data:", data);

    const res = await axiosInstance.post(`/admin/riders/create`, data);

    console.log("response:", res.data);
    return res.data;

  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong";

    const errorSource = err?.response?.data?.errorSources

    console.log(errorSource, message);

    // important: rethrow so caller can handle it
    throw new Error(message);
  }
};



export const driverEnrollMent = async (data: any) => {
  try {
    const res = await axiosInstance.post(
      "/admin/drivers/create",
      data
    );

    return res.data;
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong";

    console.log(message);

    throw new Error(message);
  }
};