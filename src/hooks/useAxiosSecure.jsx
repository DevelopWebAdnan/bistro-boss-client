import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signOutUser } = useAuth();

    // request interceptor to add an authorization header for all secure calls to the api
    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem('access-token');
            console.log('Stopped by the request interceptor', token);
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(
        function (response) {
            return response;
        },
        async (error) => {
            const status = error.response.status
            console.log('Error status in the response interceptor', status);
            // for 401 and 403 logout the user and send to the login page
            if (status === 401 || status === 403) {
                await signOutUser()
                navigate('/login')
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;