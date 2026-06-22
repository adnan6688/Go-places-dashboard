// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: 'https://come-nanny-theme.ngrok-free.dev/api/v1',
//   headers: {
//     'ngrok-skip-browser-warning': 'true'
//   },
//   withCredentials: true
// });

// export default axiosInstance;






import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://come-nanny-theme.ngrok-free.dev/api/v1',
  headers: {
    'ngrok-skip-browser-warning': 'true'
  },
  withCredentials: true
});


// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const status = error.response?.status;
//     const message = error.response?.data?.message;

//     console.log( message, "axios inceptor errors")


//     const isJwtExpired =
//       status === 401 &&
//       (
//         message === "jwt expired" ||
//         message === "Token expired" ||
//         message?.toLowerCase().includes("jwt expired")
//       );
//       console.log("isJwtExpired",isJwtExpired)

//     if (isJwtExpired) {
//       console.log("JWT expired detected");

//       try {
//         // safe refresh call
//         const res = await axiosInstance.post("/auth/refresh-token");

//         // const newToken = res.data.accessToken;
//         console.log(res)

//         // localStorage.setItem("token", newToken);

//         // attach new token to retry request
//         // error.config.headers.Authorization = `Bearer ${newToken}`;

//         return axiosInstance(error.config);

//       } catch (refreshError) {
//         // console.log("Refresh token failed");
//         // window.location.href = "/";
//       }
//     }

//     return Promise.reject(error);
//   }
// );
export default axiosInstance;