import axiosInstance from "../lib/axiosInstance";

const UsersModel=class {

    constructor(){
        this.baseUrl="/user";
    }

    async profile() {
        //axiosInstance.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("access_token");
        return (await axiosInstance.get(`${this.baseUrl}/profile`)).data?.data || null;
    }

    async updateProfile(data=[])
    {
        return await axiosInstance.put(`${this.baseUrl}/update_profile`,data);
    }

    async updatePass(data=[])
    {
        return await axiosInstance.put(`${this.baseUrl}/update_pass`,data);
    }

    async list(query=[])
    {
        return (await axiosInstance.get(`${this.baseUrl}?${new URLSearchParams(query)}`)).data;
    }
    async driverlist(query=[])
    {
        return (await axiosInstance.get(`${this.baseUrl}/drivers?${new URLSearchParams(query)}`)).data;
    }
    async driverDoclist(query=[])
    {
        return (await axiosInstance.get(`${this.baseUrl}/drivers/documents?${new URLSearchParams(query)}`)).data;
    }

    async approveDriverDoc(id, data=[]) {
        return (await axiosInstance.patch(`${this.baseUrl}/drivers/documents/verify/${id}`, data)).data;
    }
    async rejectDriverDoc(id, data=[]) {
        return (await axiosInstance.patch(`${this.baseUrl}/drivers/documents/reject/${id}`, data)).data;
    }
    async createAdmin(data=[])
    {
        return await axiosInstance.post(`${this.baseUrl}/add_admin_user`,data);
    }
    async create(data=[])
    {
        return await axiosInstance.post(this.baseUrl,data);
    }
    async detail(id)
    {
        return (await axiosInstance.get(`${this.baseUrl}/${id}`)).data;
    }
    async update(id,data=[])
    {
        return await axiosInstance.put(`${this.baseUrl}/${id}`,data);
    }
    
    async delete(id)
    {
        return await axiosInstance.delete(`${this.baseUrl}/${id}`);
    }

    async activeDeactivate(id,data=[])
    {
        return await axiosInstance.put(`${this.baseUrl}/drivers/status/${id}`,data);
    }

    async activeDeactivateUser(id,data=[])
    {
        return await axiosInstance.put(`${this.baseUrl}/status/${id}`,data);
    }
    async transactionHistory(query=[])
    {
        return (await axiosInstance.get(`${this.baseUrl}/transactionHistory?${new URLSearchParams(query)}`)).data;
    }
}

export default new UsersModel();