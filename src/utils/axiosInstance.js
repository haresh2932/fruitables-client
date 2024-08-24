import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL } from "./utilis";
import { logout } from "../redux/Slice/auth.slice";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials:true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token =  Cookies.get('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(BASE_URL + 'users/getNewToken', {}, { withCredentials: true })
                
                console.log("axiosInstance generateNewTokens", response);
                
                if (response.status === 200) {
                    const { accessToken } = response.data;
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                const { store } = require('../redux/store').configStore();
                const _id = localStorage.getItem("_id");
                store.dispatch(logout(_id));
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);


export default axiosInstance;