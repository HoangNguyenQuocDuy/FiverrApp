import axios from "axios";
import jwt_decode from "jwt-decode";
import newRequest from "./newRequest";

const axiosJWT = axios.create({
    baseURL: "http://localhost:3030/api/",
    withCredentials: true
})

const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:3030/api/auth/refresh-token', {
            withCredentials: true
        })
        return res
    } catch (err) {console.log(err)}
}

axiosJWT.interceptors.request.use(async (config) => {
    let date = new Date()
    const accessToken = localStorage.getItem('accessToken')
    const decodedToken = jwt_decode(accessToken)
    if (decodedToken.exp < date.getTime() / 1000) {
        console.log(1)
        const res = await newRequest.post('/auth/refresh-token')
        const newAccessToken = res.data
        console.log(newAccessToken)
        localStorage.setItem("accessToken", newAccessToken)

        config.headers["token"] = 'Bearer ' + newAccessToken
    } else {
        console.log(2)
        config.headers["token"] = 'Bearer ' + accessToken
    }    

    return config
}, (err) => Promise.reject('err: ', err))

export default axiosJWT