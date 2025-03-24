import axiosInstance from "../lib/axiosInstance";

const Vehiclemodel = class {
    constructor() {
        this.baseUrl = "/user/drivers/vehicle"
    }
    
    async list(query = []) {
        return (await axiosInstance.get(`${this.baseUrl}?${new URLSearchParams(query)}`)).data;
    }

    async create(data = []) {
        return await axiosInstance.post(this.baseUrl, data);
    }

    async detail(id) {
        return (await axiosInstance.get(`${this.baseUrl}/${id}`)).data;
    }

    async update(id, data = []) {
        return await axiosInstance.put(`${this.baseUrl}/${id}`, data);
    }

    async delete(id) {
        return await axiosInstance.delete(`${this.baseUrl}/${id}`);
    }
}

export default new Vehiclemodel();