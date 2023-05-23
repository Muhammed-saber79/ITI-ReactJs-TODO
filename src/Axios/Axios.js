import Axios from "axios";

const axiosInstance = Axios.create({
    baseURL: "https://json-server-vercel-theta-ten.vercel.app/api/",
})

export default axiosInstance;  