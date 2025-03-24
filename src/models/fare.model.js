import axiosInstance from "../lib/axiosInstance";

const FareModel = class {
    constructor() {
        this.baseUrl = "/fare";
        this.stateBaseURL = "/state";
        this.cityBaseURL = "/city"
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

    async getStates(query = []) {
        return (await axiosInstance.get(`${this.stateBaseURL}?${new URLSearchParams(query)}`)).data;
    }

    async getCity(query = []) {
        return (await axiosInstance.get(`${this.cityBaseURL}?${new URLSearchParams(query)}`)).data;
    }
}

export default new FareModel();