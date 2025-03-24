import axiosInstance from "../lib/axiosInstance";



const authModel = class {

    async login(data = []) {
        console.log("checkkkkk",data);
        return await axiosInstance.post("/auth/admin_login", data);
    }

}

export default new authModel();
