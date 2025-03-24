import axios from 'axios';
import { helper } from './helper';
const baseUrl = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    //headers: { 'X-Requested-With': 'XMLHttpRequest' },
    // withCredentials: true,
    transformRequest: function (data, headers) {
        const access_token = sessionStorage.getItem('access_token');
        if (access_token) {
            headers.Authorization = "Bearer " + access_token;
        }
        return data;
    },
    validateStatus: function (status) {
        //console.log("loc = ", window.location.pathname);
        if(window.location.pathname != "/auth/login")
        {
            if (status == 401) {
                //helper.sweetalert.toast("Please Login");
                window.location.assign("/auth/login");
            }
            if (status == 404) {
                //window.location.assign("/dashboard");
            }
        }
        return (status >= 200 && status <= 204);
    }
});

export default axiosInstance;
