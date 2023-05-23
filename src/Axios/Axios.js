import Axios from "axios";

const axiosInstance = Axios.create({
    baseURL: "https://json-server-five-beryl.vercel.app",
})

export default axiosInstance;  