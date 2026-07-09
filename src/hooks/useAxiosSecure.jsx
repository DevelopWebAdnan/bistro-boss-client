import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    // request interceptor to add a headers for all valid calls to the api
    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem('access-token');
            console.log('Stopped by the interceptor', token);
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
        function(response) {
            return response;
        },
        (error) => {
            const status = error.response.status
            console.log('Error status in the response interceptor', status);
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;