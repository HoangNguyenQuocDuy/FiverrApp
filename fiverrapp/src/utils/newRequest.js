import axios from "axios";

const newRequest = axios.create({
    baseURL: "http://localhost:3030/api/",
    withCredentials: true
})

newRequest.interceptors.request.use(async (config) => {
    config.headers["token"] = localStorage.getItem("accessToken")
    return config
})

export default newRequest;